# Phase 1 Context: Foundation

**Phase goal:** Every cross-cutting infrastructure concern is solved before the first screen is built — design token enforcement, mock data contract, state ownership boundaries, accessibility CI, and route group shells.

**Created:** 2026-03-18
**Status:** Complete — ready for research and planning

---

## Decisions

### A. Design System Token Bridge

**Decision:** Researcher must inspect the MomCare Design System at its deployed URL to determine the token export format before choosing the bridge strategy.

**Preferred approach (in priority order):**
1. If an NPM package exists — install it as a dependency; tokens update via version bump
2. If only a CSS URL is available — import via `@import` in the global CSS file or fetch at build time via PostCSS
3. Manual copy is explicitly rejected — tokens must auto-update, not require manual sync

**What the researcher must verify:**
- Whether a published NPM package exists for the MomCare Design System
- The token export format: CSS custom properties, JS/TS object, or design tokens JSON (Style Dictionary)
- Whether a stable CDN URL for the CSS is available

**Locked:** No hardcoded token values in any component. Tailwind config must map to CSS custom properties bridged from the design system.

---

### B. Mock Data Shape and Volume

**Decision:** Faker.js factory functions with consistent relational IDs, REST-shaped `lib/api/` functions.

**Volume:**
- ~50–100 mothers (mid-size facility feel)
- Proportional supporting entities: visits, vaccinations, weight records, clinic sessions, staff members
- All relationship references (e.g., `visit.motherId`, `visit.staffId`) must resolve to existing entities in the seed data

**Data generation:**
- Faker.js for realistic names, phone numbers, dates, and clinical values
- Factory functions (not static JSON) so data can be regenerated or extended
- Seeded with a fixed seed value so output is deterministic across runs

**`lib/api/` contract:**
- REST conventions: `listMothers({ page, filters })`, `getMother(id)`, `listVisits({ motherId })`, etc.
- Functions return typed responses — same call signature works when swapped for a real fetch
- MSW 2.x handlers intercept these calls in test and development environments

---

### C. Accessibility CI Integration

**Decision:** Storybook (already in use) set up in Phase 1 with placeholder smoke stories. axe-core runs in two places: Storybook via `@storybook/addon-a11y` and directly in Vitest unit tests.

**Phase 1 Storybook scope:**
- Placeholder smoke stories for any foundational components created in Phase 1 (e.g., layout shells, token demo component)
- Stories exist primarily to wire up the CI pipeline — visual content comes in Phase 2+

**CI provider:** GitHub Actions
- Lint (ESLint + Prettier + arbitrary value check) runs on every push
- Vitest + axe-core runs on every push
- Storybook build + accessibility audit runs on every push

**`vitest-axe` concern:** Researcher to verify maintenance status; fall back to importing `axe-core` directly in Vitest tests using the standard `axe(container)` pattern if `vitest-axe` is abandoned.

---

### D. Auth Guard Phase 1 Behavior

**Decision:** Middleware reads session cookie from day one; Phase 2 just has to set the cookie correctly.

**Phase 1 middleware behavior:**
- `middleware.ts` (Next.js 15) checks for a session cookie on all `(app)` routes
- If no cookie → redirect to `/login`
- Phase 1 has no login screen, so all `(app)` routes redirect in production-like mode — this is intentional

**Dev-mode bypass:**
- Env var `AUTH_BYPASS=true` in `.env.local` causes middleware to pass all requests through
- This allows developers to inspect route shells during Phase 1 without a live session
- Bypass is only active when `NODE_ENV !== 'production'`

**Route group layout shells:**
- `(onboarding)/layout.tsx` — minimal shell, centered single-column layout placeholder
- `(auth)/layout.tsx` — minimal shell, centered card layout placeholder
- `(app)/layout.tsx` — structural placeholder with nav comment slots (header + bottom nav area marked, not implemented)
- Shells are not empty — they establish the layout geometry that phases 2+ fill in

---

## Code Context

**Codebase state:** Empty — no files exist yet outside `.planning/`. Phase 1 builds from scratch.

**Key file paths the researcher should plan for:**
- `tailwind.config.ts` — token bridge lives here
- `app/globals.css` — CSS custom property imports/declarations
- `lib/api/` — mock API abstraction layer
- `lib/mock/` — Faker.js factories and seed data
- `middleware.ts` — auth guard (Next.js 15, project root)
- `app/(onboarding)/layout.tsx`, `app/(auth)/layout.tsx`, `app/(app)/layout.tsx`
- `.github/workflows/ci.yml` — GitHub Actions pipeline
- `.env.local.example` — documents `AUTH_BYPASS=true`

---

## Deferred Ideas

*(Raised during discussion — not in scope for Phase 1)*

- None raised during this discussion.

---

## Open Items for Researcher

1. Verify MomCare Design System NPM package existence and token format at the deployed URL
2. Verify `vitest-axe` maintenance status on npmjs.com — determine which axe integration pattern to recommend
3. Confirm Next.js 15 middleware API (proxy.ts vs middleware.ts) — STATE.md flags this ambiguity
