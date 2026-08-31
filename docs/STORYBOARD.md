# Storyboard — حنتيرة في عالم التأمين

Implemented in `src/data/scenes.ts`. Every scene contains presenter-controlled beats; Space / → advances one beat, ← goes back, and the `/control` panel mirrors the same controls. Visual ids map 1:1 to components in `src/components/visuals/SceneVisual.tsx` (guarded by `src/data/scenes.test.ts`).

## Scene-by-scene (26 scenes / 32 story steps)

| # | Scene id | Kind | Beats | Visuals | Notes |
|---|---|---|---|---|---|
| 1 | `meet-hantira` | story | dark → company → assets → cost → insurance | `dark` (spotlight + footsteps), `business-assets`, `assets-lineup`, centered dialogue, `dark-center` | Dark cinematic opening. Office / vehicles / employees / warehouse / cargo revealed one-by-one via stagger. Ends on the big "التأمين" reveal (dark mood). |
| 2 | `join-once` | join | qr | QR card (bundled `qrcode.react`) | One-time QR: rendered only while this scene is active; presenter navigates to it explicitly. Shows room code + live participant count. |
| 3 | `hantira-opinion` | interaction | ask → react | — | Interaction 1 — "حنتيرة عنده حق؟" (single, allowChange). Options shown on the big screen; personal feedback on `/join`. |
| 4 | `nice-morning` | story | time → drive → crash → invoice | `sunny-road`, `driving`, `crash`, `invoice` | Monday 8:30 AM. Parallax drive → BAAAAM (screen shake + sound cue, detached wheel, smoke) → invoice count-up 0 → 350,000 EGP with the "decimal" line. |
| 5 | `who-pays` | interaction | ask | `invoice` | Interaction 2 — correct answer D (coverage-dependent). Explanation revealed by presenter. |
| 6 | `what-is-risk` | story | risk → cost → formula → ready → ready-2 | `broken-car`, `impact`, `formula` | Risk = "حاجة ممكن تحصل". Impact board: 10K → 100K → 1M escalation. Probability × Impact = Risk gauge with the "teaching simplification, not a law" disclaimer. Hantira's two-line problem statement split across beats. |
| 7 | `insurance-30` | story | without → with → covered → takeaway | `without-insurance`, `with-insurance`, `covered-loss` | Motion-graphic flows: Incident → Hantira → Financial Loss; Hantira → Premium → Insurance Company; Insurer → policy compensation → Hantira. |
| 8 | `shopping` | story | market → offers → pile | `insurance-market`, `offer-storm`, `paper-pile` | Fictional Company A–F kiosks; documents orbit Hantira; paper pile grows. No real insurer logos. |
| 9 | `choose-offer` | story | offers → cheap | `three-offers` | Offer A 20K / B 27K / C 35K. A is tagged "الأرخص" — the visual explains why an inexperienced buyer picks on price. |
| 10 | `broker-challenge-1` | interaction | ask → reveal | `three-offers`, `offer-details` | Interaction 3 — correct "محتاج معلومات أكتر". Reveal adds Deductible / Coverage / Support rows per offer and stamps B as "Right Fit". "Cheapest ≠ Best." |
| 11 | `complexity` | story | terms → freeze | `term-cloud`, `freeze` | Typographic chaos (Premium, Deductible, Limits, Exclusions, Conditions, Claims, Add-ons, Coverage) then frozen frame. |
| 12 | `meet-faheem` | story | enter → hantira-asks → faheem-reply → broker | `faheem-entry` | Door opens with light; "إنت مندوب شركة أنهي واحدة؟" / "ولا واحدة." beat-by-beat; INSURANCE BROKER reveal. |
| 13 | `broker-does` | story | flow → flow2 → role → role-2 | `broker-flow` (1–6), `broker-flow-2` (7–12) | 12-step broker journey revealed beat-by-beat. |
| 14 | `hantira-logistics` | story | business → risks | `logistics` | 30 Trucks / 1 Warehouse / 120 Employees / International Shipments. Sets up Interaction 4. |
| 15 | `build-protection` | interaction | ask → shield → shield-2 → shield-3 | `shield-build`, `shield` | Interaction 4 — multi-select (Motor, Property, Medical, Marine Cargo, Liability, Fire). Shield segments light around Hantira Logistics. |
| 16 | `six-months` | story | later → alarm → call | `quiet-warehouse`, `stylized-fire` | Night warehouse → stylized SVG fire + beacon + shake + alarm cue → "فهيم!!!". No emoji flames. |
| 17 | `claim-challenge` | interaction | ask | `claim-form` | Interaction 5 — correct B (report first, follow procedure/documents). |
| 18 | `claims-journey` | story | journey → settlement → role | `claim-journey` (1–4), `claim-journey-2` (5–6) | Incident → Notification → Documentation → Survey → Insurer Review → Settlement per policy. |
| 19 | `claims-chaos` | story | chaos → organized | `claims-chaos`, `organized-lines` | Tangled lines around Hantira → clean ring around فهيم: "One Point of Coordination" (with the does-not-replace-insurer/surveyor/client caveat). |
| 20 | `insurance-value` | story | before → after | `quiet` | Quiet typographic scene: "You buy insurance before the problem." → "But you understand its value after the problem." |
| 21 | `broker-value` | story | remove → reveal → role → role-2 | `remove-words`, `broker-value` | Price? / Policy? / Paperwork? struck out → Advice, Comparison, Negotiation, Coordination, Support. |
| 22 | `with-without` | story | slider | `broker-slider` | Real interactive comparison slider: chaos-without ↔ organized-with (clip-path reveal, accessible range input). |
| 23 | `final-understanding` | interaction | ask | `final-question` | Interaction 6 — correct "الاتنين": insurer carries the risk, broker helps choose/negotiate/manage. |
| 24 | `our-company` | story | config | `company-flow` | Config-driven (`src/config.ts`): company name, logo text, tagline, service line + 8-step service flow. No invented company facts. |
| 25 | `final-hantira` | story | protected → learned → learned-2 → goal | `protected-business` | Opening composition returns, now shielded; "أنا كنت فاكر التأمين مصروف..." → "وده هو الهدف." |
| 26 | `ending` | ending | question → prepare → tagline → peek → joke | `dark-center`, `logo`, `peek` | Dark close: "طب لو بكرة حصل حاجة؟" → "You can't predict every risk. But you can prepare for it." → config logo/tagline → post-credit peek: "بس سؤال أخير..." / "الـ Premium ينفع يتقسط؟" |

## Interaction map

| Interaction id | Type | Correct | Personal feedback |
|---|---|---|---|
| `hantira-opinion` | single, changeable | — (opinion) | recorded choice |
| `who-pays` | single | `d` | right/wrong card |
| `broker-challenge-1` | single | `more-info` | right/wrong card |
| `build-protection` | multi, changeable | — (aggregate) | recorded choices |
| `claim-challenge` | single | `b` | right/wrong card |
| `final-understanding` | single | `both` | right/wrong card |

Name visualization rules are enforced in `ResultsView` (`hidden` / `sample` / `all`, sample capped at 5 names publicly, full names only ≤30 participants when the presenter chooses "All"). No participant is ever singled out for a wrong answer — personal results are shown only on that participant's own phone.
