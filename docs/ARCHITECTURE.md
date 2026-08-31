# Architecture

## Story Engine

`src/data/scenes.ts` defines the full presentation as typed `Scene` objects. `src/lib/story.ts` handles clamped positions, next/previous beat movement, active beat lookup, beat-level interaction gating, and the one-time QR scene check.

## Beat Engine

Presentation mode reads `room.current_scene` and `room.current_beat`, then renders the matching beat. Keyboard navigation updates room state so connected audience devices receive the active interaction automatically. Scenes can optionally declare `interactionBeatIds` so setup/payoff beats stay story-only while the vote appears on the intended beats.

## Character System

`src/components/characters/StickCharacter.tsx` renders one reusable SVG stick-character system. `Hantira` and `Faheem` are wrappers over the same component. Faheem has glasses and a tie; both support expressions, facing, and animation states.

## Realtime

`src/lib/experienceStore.ts` uses Supabase when `VITE_SUPABASE_URL` and `VITE_SUPABASE_ANON_KEY` exist. It subscribes to room, participant, vote, and presence changes. Without env vars it uses `localStorage` rehearsal mode.

## Audience Identity

Audience users create a browser-local `participant_session_id`. Nicknames are sanitized, persisted with the room code, and restored after refresh. Duplicate nicknames are allowed because votes are keyed by session id.

## Vote System

Single and multi-select votes use one row per selected option. Locked votes reject duplicate submission unless the interaction allows changes. Aggregates are calculated by option and can include sampled participant names.

## Presenter Control

`/control` can create rooms, show the join screen, start the journey, move between beats, jump to scenes, toggle voting/results/answers/names, reset votes, mute, lock late joins, and search participants.

## Name Visualization

`ResultsView` samples names by option and limits display volume. Full name display is only used for small groups; sample mode avoids dumping large audience lists.

## Branding

Contact brand values live in `src/config.ts` and `src/config/contactTheme.ts`. The supplied logo is served from `public/assets/brand/contact-insurance-brokerage.png`; CSS variables expose the Contact yellow, amber, and orange accents without embedding secrets or private assets.
