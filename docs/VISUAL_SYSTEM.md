# Visual System

## Principles

- **Premium editorial presentation + minimalist stick-man animation.** Off-white paper background, near-black ink, one corporate accent (teal `#0e7c66`), generous whitespace, full-screen cinematic scenes, restrained card usage.
- **Everything is local.** All scene art is inline SVG rendered by React components. No emoji, no icon fonts, no CDN images, no remote URLs in any scene visual. The only bundled third-party visuals are `lucide-react` icons in `/control` (tree-shaken, local) and `qrcode.react` for the QR.
- **One registry.** Every scene visual id used in `src/data/scenes.ts` must resolve in `src/components/visuals/SceneVisual.tsx`. `src/data/scenes.test.ts` fails the build if a beat references an unregistered visual — this is the regression guard for the historical "dashed placeholder square" bug. Unknown ids render a typographic wordmark, never a dashed box.

## Design tokens (`src/styles/global.css` :root)

| Group | Tokens |
|---|---|
| Palette | `--paper #f7f4ec`, `--paper-deep`, `--card`, `--card-solid`, `--ink #1a1915`, `--muted`, `--line`, `--accent #0e7c66`, `--accent-ink`, `--accent-soft`, `--danger #c2402a`, `--danger-soft`, `--gold #c99a3c`, `--night #13120e` |
| Typography | `--font`: Segoe UI / Tahoma / Noto Kufi Arabic / Noto Sans Arabic / system stack (web-safe, no download). Headline scale `clamp(2.4rem, 5.2vw, 6rem)`, body `clamp(1.15rem, 1.9vw, 2rem)`, kicker/eyebrow accent uppercase |
| Shape / space | `--radius-sm 10px`, `--radius 16px`, `--radius-lg 26px`, `--space-1..6` (0.35 → 3.6rem) |
| Motion | `--dur-fast 160ms`, `--dur 320ms`, `--dur-slow 640ms`, `--ease cubic-bezier(.22,.61,.21,1)`, `--spring cubic-bezier(.34,1.4,.5,1)` |
| Elevation | `--shadow`, `--shadow-soft` |

Dark scenes (opening, insurance reveal, ending) flip the whole stage via `.presentation.mood-dark`, which re-maps the palette variables — components keep using the same tokens.

## SVG conventions

- Scenes draw on generous viewBoxes (typically 900×520); primitives are `<g>` components composed inside scene `<svg>`s.
- `stroke="currentColor"`, `stroke-width` 6 for primary lines / 4 for detail / 5 for hairlines, `stroke-linecap="round"`, `stroke-linejoin="round"`.
- Fills use tokens (`var(--card)`, `var(--paper)`, `var(--accent)`) so dark mood works for free.
- Accent (teal) marks protection/organization; danger (red) marks loss/crash/fire; gold marks the mid tier.

### Primitive library (`src/components/visuals/primitives.tsx`)

`OfficeBuilding`, `CarSide` (healthy/broken), `TruckSide`, `Warehouse`, `Crate`, `PersonIcon`, `Flame` (animated), `ShieldShape`, `DocSheet`, `SunCloud`, `Cloud`, `ShipSide`, `PhoneIcon`, `MailIcon`, `CrackStar`, `SmokePuff`, `ArrowLeft` (RTL flow arrows), `PauseDots`, `CheckMark`.

### Scene registry (`src/components/visuals/SceneVisual.tsx`)

36 ids covering every beat: opening spotlights, business lineups, morning/drive/crash/invoice (count-up), risk & impact board, Probability × Impact gauge, three 30-second flows, market row, offer storm, paper pile, offer panels (basic + detail), term cloud (chaos/frozen), door entry, broker journey (1–6 / 7–12), logistics stats, shield build/complete, quiet warehouse, stylized fire, claim form, claim journey, claims chaos→organized, quiet scene, broker value (remove/reveal), interactive broker slider, big question, logo badge (config-driven), company flow, peek finale.

## Motion language

Allowed patterns only: fade, slide (`.rise`), pop (`.pop`), stroke draw (`.draw-path`, `.draw-in`), dash motion (road/speed lines), character whole-body motion (bob/walk/run/panic/fall/celebrate in `StickCharacter`), screen shake (`.shake`), count-up (`useCountUp`), controlled stagger (inline `animationDelay`, CSS `!important`-overridden to 0 under reduced motion).

All CSS animation honors `prefers-reduced-motion` (global kill-switch); framer-motion honors it via `<MotionConfig reducedMotion="user">` in the presenter route.

## Layout system

- `.presentation` fills the viewport (`100dvh`); `.stage` is a two-column editorial grid (`copy | visual`) capped at 1760px with fluid padding.
- `.stage--center` collapses to a single centered column for minimal scenes (dark spotlights, quiet, final question, logo, peek, impact/formula boards).
- `.stage--ask` slightly rebalances columns for interaction scenes.
- Characters anchor bottom-center of the visual column via `.characters`; the shared `StickCharacter` sizes through `.character-wrap`.
- Text uses `text-wrap: balance` for headlines and `white-space: pre-line` for multi-line copy; everything is RTL-first with LTR islands (`dir="ltr"`) for numerals like `350,000 EGP`, `10K → 100K → 1M`, room codes.

## Characters

`src/components/characters/StickCharacter.tsx` is the single source for both characters — scenes never redraw them. Identical head (r=36), body span, 7px limbs, 4px face strokes. Hantira: plain stick figure. Faheem: round glasses + accent tie (order & clarity). Expressions: neutral, happy, confused, shocked, worried, proud, suspicious, thinking, angry, relieved (mouth path map + brow tilt + lid droop). Poses: idle, walk, run, wave, point, think, panic, fall, celebrate, look-left, look-right, facepalm (arm path map + body motion map).
