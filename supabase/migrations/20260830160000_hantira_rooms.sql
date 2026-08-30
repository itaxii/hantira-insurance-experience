create extension if not exists pgcrypto;

create table if not exists public.rooms (
  id uuid primary key default gen_random_uuid(),
  code text not null unique check (code ~ '^[0-9]{4,6}$'),
  status text not null default 'join' check (status in ('draft', 'join', 'live', 'ended')),
  current_scene integer not null default 1 check (current_scene >= 0),
  current_beat integer not null default 0 check (current_beat >= 0),
  voting_open boolean not null default false,
  answer_revealed boolean not null default false,
  results_visible boolean not null default false,
  names_visible text not null default 'hidden' check (names_visible in ('hidden', 'sample', 'all')),
  active_interaction text,
  joins_allowed boolean not null default true,
  muted boolean not null default false,
  presenter_user_id uuid references auth.users(id) on delete set null,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create table if not exists public.participants (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  session_id text not null,
  display_name text not null check (char_length(display_name) between 2 and 24),
  joined_at timestamptz not null default now(),
  last_seen_at timestamptz not null default now(),
  unique (room_id, session_id)
);

create table if not exists public.votes (
  id uuid primary key default gen_random_uuid(),
  room_id uuid not null references public.rooms(id) on delete cascade,
  question_id text not null,
  participant_session_id text not null,
  option_id text not null,
  created_at timestamptz not null default now(),
  unique (room_id, question_id, participant_session_id, option_id),
  foreign key (room_id, participant_session_id) references public.participants(room_id, session_id) on delete cascade
);

create index if not exists rooms_code_idx on public.rooms(code);
create index if not exists participants_room_idx on public.participants(room_id);
create index if not exists participants_last_seen_idx on public.participants(room_id, last_seen_at desc);
create index if not exists votes_room_question_idx on public.votes(room_id, question_id);
create index if not exists votes_participant_idx on public.votes(room_id, participant_session_id);

create or replace function public.touch_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists rooms_touch_updated_at on public.rooms;
create trigger rooms_touch_updated_at
before update on public.rooms
for each row execute function public.touch_updated_at();

alter table public.rooms enable row level security;
alter table public.participants enable row level security;
alter table public.votes enable row level security;

drop policy if exists "rooms are readable by anon" on public.rooms;
create policy "rooms are readable by anon"
on public.rooms for select
to anon, authenticated
using (true);

drop policy if exists "authenticated presenters create rooms" on public.rooms;
create policy "authenticated presenters create rooms"
on public.rooms for insert
to authenticated
with check (presenter_user_id = auth.uid());

drop policy if exists "presenters update own rooms" on public.rooms;
create policy "presenters update own rooms"
on public.rooms for update
to authenticated
using (presenter_user_id = auth.uid())
with check (presenter_user_id = auth.uid());

drop policy if exists "participants readable for room experience" on public.participants;
create policy "participants readable for room experience"
on public.participants for select
to anon, authenticated
using (true);

drop policy if exists "anon can join open rooms" on public.participants;
create policy "anon can join open rooms"
on public.participants for insert
to anon, authenticated
with check (
  exists (
    select 1 from public.rooms
    where rooms.id = participants.room_id
      and rooms.joins_allowed = true
      and rooms.status <> 'ended'
  )
);

drop policy if exists "participants can refresh their session row" on public.participants;
create policy "participants can refresh their session row"
on public.participants for update
to anon, authenticated
using (
  exists (
    select 1 from public.rooms
    where rooms.id = participants.room_id
      and rooms.status <> 'ended'
  )
)
with check (
  exists (
    select 1 from public.rooms
    where rooms.id = participants.room_id
      and rooms.status <> 'ended'
  )
);

drop policy if exists "votes readable for room results" on public.votes;
create policy "votes readable for room results"
on public.votes for select
to anon, authenticated
using (true);

drop policy if exists "anon can vote only while voting is open" on public.votes;
create policy "anon can vote only while voting is open"
on public.votes for insert
to anon, authenticated
with check (
  exists (
    select 1 from public.rooms
    where rooms.id = votes.room_id
      and rooms.voting_open = true
      and rooms.active_interaction = votes.question_id
      and rooms.status = 'live'
  )
);

drop policy if exists "presenters can reset room votes" on public.votes;
create policy "presenters can reset room votes"
on public.votes for delete
to authenticated
using (
  exists (
    select 1 from public.rooms
    where rooms.id = votes.room_id
      and rooms.presenter_user_id = auth.uid()
  )
);

alter publication supabase_realtime add table public.rooms;
alter publication supabase_realtime add table public.participants;
alter publication supabase_realtime add table public.votes;
