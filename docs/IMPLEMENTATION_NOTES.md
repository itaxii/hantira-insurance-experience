# Implementation Notes — Repair Pass (2026-08-31)

Companion to `docs/REPAIR_AUDIT.md`. Records what was changed, why, and what was deliberately left alone.

## Root causes fixed

1. **Square placeholder boxes** — `PresentRoute` rendered any visual id not in a 4-item hard-coded chain as `<div class="scene-object">{id}</div>`, styled as a dashed empty square. ~30 scene visuals hit that path. Fixed by building the `SceneVisual` registry (`src/components/visuals/`) that implements every id; a test now guarantees every beat visual resolves.
2. **Mojibake** — `nicknameErrorMessage` returned corrupted byte sequences (as did three test fixtures). Rewritten with correct UTF-8 Arabic; a regression test asserts readable messages.
3. **Emoji/glyph dependence** — `✓` in vote buttons replaced by an inline SVG `CheckMark`; `😄` removed from personal-result copy.
4. **Dead beat effects** — `effects` arrays were data-only. Now mapped to `SoundManager` cues (footsteps/engine/crash/alarm/thud/paper) with per-cue oscillator envelopes, respecting room mute + browser autoplay unlock.
5. **Fragile flow rendering** — `body.includes("→")` heuristic removed; flows are proper components (FlowVisual, BrokerJourney, ClaimJourney, CompanyFlow).

## What changed (files)

- **New** `src/components/visuals/` — `primitives.tsx` (shared SVG atoms), `SceneVisual.tsx` (36-id registry + Impact/Risk model, count-up invoice, crash, fire, claims coordination, slider, logo, peek), `useCountUp.ts`, render smoke test.
- **Deleted** `src/components/LineAssets.tsx` (folded into the registry; no other importer).
- **Rewritten** `src/styles/global.css` — token system, dark/light moods, editorial stage layouts, scene component styles, audience/control polish, responsive breakpoints (1100/900/520), reduced-motion hardening (`animation-delay: 0ms !important` so staggers don't trap content invisible).
- **Upgraded** `StickCharacter` — richer arm/pose map, body-motion map, lid-droop expressions, transform wrapper so `facing` no longer fights framer-motion transforms.
- **Completed** `scenes.ts` — speaker attribution on every dialogue, dark moods, beat splits for two-character exchanges, `offer-details` / `broker-flow-2` / `claim-journey-2` ids, post-credit peek split into two beats, exact script lines from the storyboard.
- **Rewired** `PresentRoute` — registry-driven visuals, dialogue bubbles with speaker chips, interaction options shown on the big screen before results, `MotionConfig reducedMotion="user"`, effect→sound wiring, hint strip, `stage--center`/`stage--ask` layout logic.
- **Polished** `JoinRoute` — SVG checkmarks, no emoji, waiting screen with rotating Hantira states, multi-select submit count, offline/missing-room states with character acting.
- **`ResultsView`** — shows `percent · count` per option (multi-select measures % of participants).
- **`SoundManager`** — typed cue table (kept the `play(name)` API and `soundManager` singleton).
- **Tests** — fixed corrupted fixtures (`story`, `votes`, `nickname`); added `scenes.test.ts` (story completeness + registry guard) and `SceneVisual.test.tsx` (renders every visual, unknown ids don't produce placeholder squares).

## What deliberately did NOT change

- Supabase client, realtime channel wiring, RLS migration, presenter allow-list auth, anonymous audience auth, session/participant persistence, local rehearsal store, room state machine, story engine math, routing/base-path handling, deploy workflow.
- `/control` structure and shortcuts (←/→/Space beats, R reveal, V voting, M mute, F fullscreen) — verified working; only shared styling changed via tokens.

## Verified behavior

- `npm run typecheck` — clean.
- `npm test` — 35/35 passing (11 files).
- `npm run build` — clean; 5 chunks emitted; all chunk files served with correct content-type from `dist` (verified over HTTP; `assets/index-*.js` = 109,726 bytes).
- Deployment base path: built `index.html` references `/hantira-insurance-experience/assets/*`; GitHub Pages + `public/404.html` SPA redirect handle `/join/:code` and `/control` deep links. Note: `npx vite preview` serves at root because the config's `base` is conditional on `command === "build"` (preview reports `command = "serve"`) — rehearse the production bundle locally from the server root, or via Pages.

## Remaining limitations

- Sound is synthesized (WebAudio) — no audio assets shipped, by design (`appConfig.sound.placeholderOnly`).
- `/control` is functional-utility styled (tokenized) but intentionally not redesigned.
- Realtime behavior is verified by code review + unit tests of the store contract; a live two-browser session against a Supabase project requires `VITE_SUPABASE_URL`/`VITE_SUPABASE_ANON_KEY` env and is listed under manual actions.
- Fonts are a web-safe system stack (no bundled woff2); if a specific display font is later licensed, add it via `@font-face` in `global.css` — all tokens already route through `--font`.
