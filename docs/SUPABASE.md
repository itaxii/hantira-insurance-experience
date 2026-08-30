# Supabase

## Setup

1. Create or open a Supabase project.
2. Run `supabase/migrations/20260830160000_hantira_rooms.sql` in the SQL editor or through the Supabase CLI.
3. Enable Anonymous Sign-Ins in Supabase Auth settings. Audience users will not see a login, but RLS needs an authenticated anonymous user id.
4. Enable Realtime for `rooms`, `participants`, and `votes` if it is not already enabled by the migration.
4. Add the public values to `.env` locally or deployment environment:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Never add a service-role key to the frontend.

## Schema

`rooms` stores current presentation state, voting flags, result visibility, late-join status, and the authenticated presenter owner.

`participants` stores `room_id`, browser `session_id`, Supabase `auth_user_id`, display name, and timestamps. `display_name` is not unique.

`votes` stores `room_id`, `question_id`, `participant_session_id`, and `option_id`. Multi-select votes are represented as multiple rows.

## RLS

Rooms are readable by anonymous and authenticated clients so audience screens can follow state. Only authenticated presenters can create/update rooms they own. Audience participants use Supabase anonymous auth, can update only their own participant row, and can vote only while the current room has voting open for the active interaction.

## Security Assumptions

Presenter access depends on Supabase Auth and RLS, not a shipped frontend password. Audience identity is lightweight and suitable for live presentation participation, not legal identity.
