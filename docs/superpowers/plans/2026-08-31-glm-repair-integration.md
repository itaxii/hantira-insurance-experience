# GLM Repair Integration Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Safely integrate GLM's visual/story repair into the GitHub/Supabase-connected Hantira presentation without regressing realtime audience behavior.

**Architecture:** Keep the existing React/Vite/Supabase architecture as the baseline. Accept GLM's visual registry, story-completion, CSS, and character polish where tests and review show no business-logic regression; preserve the existing Supabase schema, RLS, room-code routing, and audience/presenter contracts.

**Tech Stack:** React, TypeScript, Vite, Motion for React, Supabase, Supabase Realtime, Vitest, GitHub Pages.

**Spec:** `C:\Users\mOHAMED.tOLBA\.codex\attachments\fdaf0fbd-48fc-4aa4-bbc5-f70876fb79ba\pasted-text.txt`

## Global Constraints

- Do not redesign the project again.
- Treat `origin/main` as the GitHub/Supabase-connected baseline.
- Treat GLM changes as a patch to review, not a replacement.
- Do not apply Supabase schema or RLS changes blindly.
- Preserve `/present`, `/join/:roomCode`, `/control`, one-time QR, nickname persistence, voting, personal results, presenter controls, and realtime.
- Never commit secrets, service-role keys, `.env`, or presenter credentials.
- Push only after lint, tests, build, Supabase smoke, and deployment checks pass.

---

### Task 1: Safety Branch And Diff Classification

**Files:**
- Read: Git working tree
- Create: `docs/INTEGRATION_REPORT.md`

**Interfaces:**
- Consumes: `origin/main` as baseline.
- Produces: integration branch `codex/integrate-glm-repair` and a categorized diff record.

- [x] **Step 1: Create integration branch**

```bash
git switch -c codex/integrate-glm-repair
```

- [x] **Step 2: Inspect changed files**

```bash
git status --short --branch
git diff --stat
git diff --name-status
```

- [x] **Step 3: Classify changes**

Classify GLM changes as visual/story/docs/functional/Supabase-sensitive in `docs/INTEGRATION_REPORT.md`.

### Task 2: Preserve Supabase And Interaction Contracts

**Files:**
- Read: `supabase/migrations/*`
- Read: `src/lib/experienceStore.ts`
- Read: `src/routes/JoinRoute.tsx`
- Read: `src/routes/PresentRoute.tsx`
- Read: `src/components/ResultsView.tsx`
- Test: `src/lib/votes.test.ts`

**Interfaces:**
- Consumes: current Supabase schema in project `ozfzamayabyskuymbugo`.
- Produces: verified no-destructive-schema integration plus copy/logic regression fixes.

- [x] **Step 1: Inspect live schema/policies/realtime**

Use Supabase SQL to inspect `rooms`, `participants`, `votes`, `presenters`, RLS policies, and `supabase_realtime` publication tables.

- [x] **Step 2: Write regression tests for changed user-facing contracts**

Add tests for invalid visual separators and respectful personal-result feedback.

- [x] **Step 3: Fix only confirmed regressions**

Patch the SVG flow separator and restore the requested incorrect-answer joke.

### Task 3: Verify Story And Visual Registry

**Files:**
- Read: `src/data/scenes.ts`
- Read: `src/components/visuals/SceneVisual.tsx`
- Test: `src/data/scenes.test.ts`
- Test: `src/components/visuals/SceneVisual.test.tsx`

**Interfaces:**
- Consumes: scene ids, beat ids, interaction ids, visual ids.
- Produces: verified complete story and no unregistered visual placeholders.

- [x] **Step 1: Verify required scene order**

Run `npm test -- src/data/scenes.test.ts`.

- [x] **Step 2: Verify every visual id renders real content**

Run `npm test -- src/components/visuals/SceneVisual.test.tsx`.

### Task 4: Full Verification And Deployment

**Files:**
- Read: `.github/workflows/*`
- Read: `vite.config.ts`

**Interfaces:**
- Consumes: local integrated branch.
- Produces: pushed branch and verified deployment path.

- [x] **Step 1: Run full checks**

```bash
npm run lint
npm test
npm run build
```

- [x] **Step 2: Run Supabase public-client smoke**

Verify anonymous join, duplicate nicknames, vote insert, duplicate-vote prevention, vote-name relation, and realtime participant insert delivery.

- [ ] **Step 3: Push verified integration**

```bash
git push origin codex/integrate-glm-repair
```

- [ ] **Step 4: Merge or fast-forward to main only after verification**

Use a normal merge/fast-forward path; do not force-push.
