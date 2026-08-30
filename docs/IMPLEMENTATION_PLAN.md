# Hantira Insurance Experience Implementation Plan

## Architecture

Build a Vite React TypeScript SPA with three first-class routes: `/present`, `/join/:roomCode`, and `/control`. The app uses a typed story engine for scene/beat progression, reusable SVG character components for Hantira and Faheem, and a Supabase realtime adapter for rooms, participants, presence, and votes.

## Database

Supabase stores durable collaborative state in `rooms`, `participants`, and `votes`. Questions are configuration-driven in `src/data/scenes.ts` so presentation wording and story timing are versioned with the app. Votes use `room_id`, `question_id`, and `participant_session_id`; nicknames stay in `participants`.

## Realtime

The presentation and presenter subscribe to room updates, vote changes, participant changes, and presence. Audience clients subscribe to room changes and their own vote state. A local in-browser demo store is used only when Supabase public env vars are missing.

## Security

The frontend only accepts public Supabase variables. Presenter control is designed for Supabase Auth: room mutations are allowed only to the authenticated `presenter_user_id` by RLS. No service-role key or presenter secret is committed or exposed.

## Story

All 18 core scenes plus final ending and post-credit joke are represented as typed scenes with beats. Interactions are attached to selected scenes, and the QR scene is marked once-only.

## Audience

Audience users scan one QR, enter a nickname, persist `participant_session_id`, and then receive active questions automatically. Their selected answer remains visible, result feedback is personal, and multi-select questions preserve chosen items.

## Presenter Control

Presenter can create a room, start the journey, move by beat, jump scenes, toggle voting/results/answers/names, reset votes, lock late joins, reopen join overlay, mute, and search participants.

## Deployment

The app is deployable as a static Vite SPA. GitHub Pages is configured with a workflow and SPA fallback. Sites deployment can also be used when runtime Supabase environment values are configured.

## Tests

Vitest covers story navigation, nickname validation/persistence, vote submission and aggregation, room state updates, late join behavior, presenter authorization logic, and personal result feedback.
