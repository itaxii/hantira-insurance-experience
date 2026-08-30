# حنتيرة في عالم التأمين

Interactive Arabic web presentation for explaining insurance and the role of an Insurance Broker through story, SVG stick-man animation, game-show voting, and mobile audience participation.

## Routes

- `/present`: projector presentation mode.
- `/join/:roomCode`: audience mobile mode.
- `/control`: presenter control.

## Stack

React, TypeScript, Vite, Motion via Framer Motion, Supabase, Supabase Realtime, SVG animation, CSS variables.

## Local Development

```bash
npm install
npm run dev
```

Without Supabase env vars, the app runs in local rehearsal mode using browser storage.

## Environment

Copy `.env.example` to `.env` and fill only public-safe values:

```bash
VITE_SUPABASE_URL=
VITE_SUPABASE_ANON_KEY=
```

Do not put service-role keys, private credentials, or presenter passwords in frontend env vars.

## Supabase

Run `supabase/migrations/20260830160000_hantira_rooms.sql` in Supabase. See `docs/SUPABASE.md` for schema, RLS, realtime, and security notes.

## Presentation Flow

Open `/control`, create/show a room, open `/present`, show the QR once, wait for nicknames, then start the journey. Audience phones stay connected and receive questions automatically.

## Testing

```bash
npm test
npm run lint
npm run typecheck
npm run build
```

## Deployment

The included GitHub Actions workflow builds and deploys the static app to GitHub Pages. SPA refresh support is handled by copying `index.html` to `404.html` in the deploy workflow.
