# REPAIR AUDIT — حنتيرة في عالم التأمين

Date: 2026-08-31
Scope: full repository inspection before repair work.

---

## 1. What currently works (verified by reading code + existing tests)

- **Routing** — `src/routes/App.tsx` maps `/join/:roomCode`, `/control`, and the default `/present` route through `normalizeAppPath` which handles the GitHub Pages base path `/hantira-insurance-experience`.
- **Story engine** — `src/lib/story.ts` (clamp/move beat-by-beat) and `src/lib/roomState.ts` (`applyPosition` resets voting flags per position).
- **Supabase integration** — `experienceStore.ts` loads rooms/participants/votes, subscribes to postgres_changes + presence on one channel, and exposes createRoom/updateRoom/join/submitVote/resetVotes. Anonymous auth for the audience (`supabaseAuth.ts`), presenter allow-list auth (`presenterAuth.ts` + `public.presenters` table).
- **Security / RLS** — migration `supabase/migrations/20260830160000_hantira_rooms.sql` enables RLS on all four tables, gates room writes to allow-listed presenters, gates votes to open-voting + active-interaction + matching participant, sanitizes nicknames at DB level (2–24 chars). No service-role key anywhere in the frontend; only `VITE_SUPABASE_URL` / `VITE_SUPABASE_ANON_KEY`.
- **One-time QR** — `join-once` scene (`onceOnlyQr: true`, `kind: "join"`) renders QR only when that scene is active; presenter explicitly navigates to it. Never auto-reappears.
- **Nickname flow** — sanitized (`sanitizeNickname`), persisted in `localStorage`, upserted on mount, session-scoped participant id.
- **Voting** — single + multi select, `allowChange` handling, vote-locked feedback, personal correct/incorrect result card on reveal, aggregate results with name sample/all honoring the `names_visible` state and the ≤30 / 31–100 / >100 rules.
- **Presenter controls** — `/control` (auth-gated) and keyboard shortcuts on `/present` (←/→/space beats, R reveal, V voting, M mute, F fullscreen).
- **Local rehearsal mode** — when Supabase env vars are absent, a localStorage-backed store mirrors the same API.
- **Tests** — vitest suites exist for story, votes, nickname, session, roomState, routing, activeRoom, presenter auth.

## 2. What is broken

### B1 — The "square box" defect (root cause found)
`PresentRoute.tsx` renders every beat visual through a tiny hard-coded chain:

```
assets/business/logistics → BusinessAssets
three-offers → OfferCards, term-cloud → TermCloud, broker-slider → BrokerSlider
body contains "→" → SimpleFlow
everything else → <div className="scene-object">{beat.visual}</div>
```

`.scene-object` is styled in `global.css` as a **dashed-border empty square** showing the raw visual id as text. Because the scenes data references ~35 distinct visual ids and only 4 were implemented, almost every scene — `sunny-road`, `driving`, `crash`, `invoice`, `broken-car`, `impact`, `formula`, `without-insurance`, `with-insurance`, `covered-loss`, `insurance-market`, `offer-storm`, `paper-pile`, `freeze`, `faheem-entry`, `broker-flow`, `shield-build`, `shield`, `quiet-warehouse`, `stylized-fire`, `claim-form`, `claim-journey`, `claims-chaos`, `organized-lines`, `quiet`, `remove-words`, `final-question`, `company-flow`, `protected-business`, `dark-center`, `logo`, `peek`, `dark` — rendered as a dashed placeholder box. That is exactly the reported "empty square boxes" symptom. It is not a font/icon/asset loading issue — the components simply never existed.

### B2 — Encoding corruption (mojibake) in source files
`src/lib/nickname.ts` returns garbled strings from `nicknameErrorMessage`. `src/lib/story.test.ts`, `src/lib/nickname.test.ts`, `src/lib/votes.test.ts` contain corrupted Arabic fixtures. The app also showed mojibake anywhere those messages surfaced (nickname join errors).

### B3 — Emoji as functional UI
`✓` glyph in vote buttons (JoinRoute) and `😄` in the personal result copy (`votes.ts`, `JoinRoute.tsx`) violate the "no fragile glyphs/emoji as core visuals" rule.

### B4 — Beat effects are dead data
`effects: ["footsteps" | "car-engine" | "crash" | "alarm" | "paper-drop" | "invoice-reveal" | "shake"]` are declared in scene data but never wired: `soundManager.play()` is never called anywhere. The crash/alarm moments are silent.

### B5 — Fragile flow rendering
`beat.body.includes("→")` decides between a flow diagram and text — brittle and produced inconsistent layouts (some flows rendered as chips, others as raw text or squares).

### B6 — Layout/visual weaknesses
- `.stage` combines `aspect-ratio: 16/9` with `min-height: 100vh` — contradictory sizing, causes overflow on non-16:9 screens.
- No design tokens; ad-hoc colors/sizes per selector; scene backgrounds never change mood (dark opening/ending use the same paper background, killing the cinematic contrast).
- Dialogues embed speaker prefixes (`حنتيرة: ...`) as raw text with `\n` — not attributed, no bubble hierarchy.
- Interaction scenes never display the options on the big screen (audience sees them on phones only; the room cannot follow).
- Characters only anchor bottom-center; no ground shadow consistent placement; Hantira/Faheem poses limited (celebrate/panic arms missing).
- Mobile audience UI is functional but generic; the waiting screen is static.

## 3. What is incomplete

- **Risk/Impact scene**: `impact` and `formula` visuals were placeholders. The Probability × Impact teaching model was never drawn.
- **Insurance in 30 seconds**: flows rendered as plain text chips (or squares); no incident→loss / premium→company motion graphic.
- **Complexity explosion**: term cloud exists but `freeze` beat was a square.
- **Claims chaos → One Point of Coordination**: both beats were squares.
- **With/Without broker**: the "slider" was a static range input between two text cards — not a comparison slider.
- **Final scenes** (`final-question`, `dark-center`, `logo`, `peek`, `protected-business`, `company-flow`): all squares.
- **Meet Hantira assets lineup**: labels/one-at-a-time reveal missing (single static SVG).

## 4. Scene-by-scene weakness rating (before repair)

| Scene | State |
|---|---|
| meet-hantira | weak (2 of 5 visuals implemented) |
| join-once | working (QR real) |
| hantira-opinion | working, options hidden on big screen |
| nice-morning | broken (all 4 visuals squares) |
| who-pays | working, options hidden |
| what-is-risk | broken (impact/formula squares) |
| insurance-30 | weak (text-only flows) |
| shopping | broken (2 of 3 squares) |
| choose-offer | weak (cards OK, no cheap-highlight cue) |
| broker-challenge-1 | weak (reveal details were a text blob) |
| complexity | weak (cloud OK, freeze square) |
| meet-faheem | broken (entry square) |
| broker-does | weak (flow as text chips / squares) |
| hantira-logistics | partial (one generic lineup SVG for everything) |
| build-protection | broken (shield squares) |
| six-months | broken (fire square, no alarm cue) |
| claim-challenge | broken (claim-form square) |
| claims-journey | broken (journey square) |
| claims-chaos | broken (both squares) |
| insurance-value | weak (quiet square) |
| broker-value | broken (remove-words square) |
| with-without | weak (fake slider) |
| final-understanding | working, options hidden |
| our-company | broken (company-flow square) |
| final-hantira | broken (protected-business square) |
| ending | broken (3 of 4 squares) |

## 5. Which assets were missing

No image/font assets were actually missing — the app ships zero binary assets. The missing pieces were **React SVG scene components** (see B1). `lucide-react` icons used in `/control` are bundled locally (fine). QR comes from bundled `qrcode.react` (fine). Fonts are a system stack (acceptable; no CDN dependency to remove).

## 6. What causes square/placeholder rendering

`<div className="scene-object">{beat.visual}</div>` + the `.scene-object` dashed-box CSS. Nothing else. No bundling, base-path, or `<use>` reference issues were found.

## 7. Components to repair

- `PresentRoute.tsx` — registry-driven visuals, mood system, dialogue bubbles, interaction prompt, sound cues.
- `global.css` — token system, mood (dark/light) stages, scene layouts, audience/control polish.
- `StickCharacter.tsx` — richer poses, consistent proportions (shared system already correct in principle).
- `scenes.ts` / `types.ts` — add `speaker` + `mood` beat fields, split dual-speaker dialogues into beats, align visual ids, complete required script lines.
- `nickname.ts`, `votes.ts`, `JoinRoute.tsx`, `ResultsView.tsx` — mojibake + emoji fixes, counts, waiting states.
- `SoundManager.ts` — richer cue mapping (still local WebAudio, no assets).

## 8. Components to remain untouched

- `experienceStore.ts`, `supabaseClient.ts`, `supabaseAuth.ts`, `presenterAuth.ts`, `localStore.ts`, `session.ts`, `activeRoom.ts`, `routing.ts`, `roomState.ts`, `story.ts` logic — realtime/auth/routing engine is correct.
- Supabase migration/RLS — verified correct, no changes.
- `ControlRoute.tsx` — keep structure; only cosmetic-safe tweaks if a regression is proven (none found beyond styling).
- `vite.config.ts` / deploy workflow — base path handling verified.

## 9. Repair plan (executed in this order)

1. **Visual library** — `src/components/visuals/`: shared SVG primitives + a `SceneVisual` registry covering every visual id used by scene data; unknown ids fall back to a typographic caption, never a dashed box.
2. **Special visuals** — Impact/Probability × Impact model, count-up invoice, crash scene, stylized fire, claims chaos→organized, interactive With/Without Broker comparison slider, term cloud (chaos/freeze), shield build, broker journey, claim journey, company flow, logo badge (config-driven), peek finale.
3. **Design system** — tokenized CSS, dark/light scene moods, editorial typography, consistent spacing/radius/motion, responsive QA at 1920/1366 and 360/390/430.
4. **Character system** — single `StickCharacter` source with expanded poses; scenes never draw characters independently.
5. **Story data** — complete every required beat/speaker line; beat-level speaker attribution; wire sounds.
6. **Audience/presenter polish** — options on the big screen, result counts, SVG checkmarks, no emoji, better waiting/nickname screens.
7. **Regression guard** — tests asserting every scene visual id resolves in the registry and every required story beat exists (so the placeholder class of bug cannot silently return).
8. **Verification** — lint/typecheck/tests/production build + route smoke checks.
