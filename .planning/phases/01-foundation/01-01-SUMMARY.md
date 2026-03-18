---
phase: 01-foundation
plan: 01
subsystem: infra
tags: [nextjs, tailwind, typescript, eslint, prettier, vitest, msw, design-tokens]

# Dependency graph
requires: []
provides:
  - Next.js 16.1.7 project scaffold with App Router, TypeScript, Tailwind v4
  - MomCare Design System token bridge via Tailwind v4 @theme in globals.css
  - Custom ESLint rule blocking arbitrary Tailwind values (bg-[#ff0000] style)
  - Dev toolchain: Prettier, Vitest, MSW, @testing-library, axe-core, @faker-js/faker
  - AUTH_BYPASS env var pattern for dev-mode auth bypass
affects: [all-phases, 01-02, 01-03, 02-onboarding, 03-patient-list]

# Tech tracking
tech-stack:
  added:
    - next@16.1.7
    - react@19.2.3
    - tailwindcss@^4
    - @tanstack/react-query@^5
    - zustand@^5
    - react-hook-form@^7
    - zod@^4
    - @hookform/resolvers@^5
    - msw@^2
    - @faker-js/faker@^10
    - vitest@^4
    - @testing-library/react@^16
    - @chialab/vitest-axe@^0.19
    - axe-core@^4
    - prettier@^3
  patterns:
    - Tailwind v4 @theme block as single source of design token truth
    - Custom ESLint local plugin pattern for project-specific rules
    - AUTH_BYPASS env var for development bypass of auth middleware

key-files:
  created:
    - app/globals.css
    - app/layout.tsx
    - app/page.tsx
    - eslint-local-rules/no-tailwind-arbitrary.cjs
    - eslint.config.mjs
    - package.json
    - tsconfig.json
    - postcss.config.mjs
    - next.config.ts
    - .prettierrc
    - .prettierignore
    - .env.local.example
    - .gitignore
  modified: []

key-decisions:
  - "Used scaffold-then-copy approach for create-next-app because project directory name has spaces/capitals incompatible with npm naming"
  - "Used fallback MomCare Design System token palette (hex values) — checkpoint Task 3 exists for user to verify/correct exact values before downstream plans consume them"
  - "Tailwind v4 uses @theme block in CSS instead of tailwind.config.ts for token bridge — no config file needed"
  - "ESLint local plugin registered inline in eslint.config.mjs with no separate package — zero overhead"

patterns-established:
  - "Token-only styling: all component styles must reference @theme tokens, no hardcoded hex/px values"
  - "ESLint enforces token contract at lint time — blocked in CI before any arbitrary value reaches production"
  - "Vitest + @testing-library + axe-core for accessibility-first testing from day one"

requirements-completed: [FOUND-01, FOUND-02, FOUND-03, QUAL-01, QUAL-02, QUAL-03]

# Metrics
duration: 15min
completed: 2026-03-18
---

# Phase 1 Plan 01: Next.js 16 Scaffold with MomCare Design Token Bridge Summary

**Next.js 16.1.7 scaffold with Tailwind v4 @theme token bridge, ESLint arbitrary-value guard, and full testing toolchain — ready for component development pending token verification checkpoint.**

## Performance

- **Duration:** ~15 min
- **Started:** 2026-03-18T10:13:03Z
- **Completed:** 2026-03-18T10:28:00Z (paused at Task 3 checkpoint)
- **Tasks completed:** 3 of 3 (Task 3 checkpoint resolved — tokens approved by user 2026-03-18)
- **Files modified:** 14

## Accomplishments

- Next.js 16.1.7 with React 19, App Router, TypeScript, Tailwind v4 fully scaffolded
- MomCare Design System token bridge in `app/globals.css` @theme block — all token categories (colors, risk levels, vaccination status, spacing, radius, shadows, breakpoints)
- Custom ESLint rule `local/no-tailwind-arbitrary` blocks arbitrary values like `bg-[#ff0000]` while allowing `bg-[var(--token)]` — verified working
- Full dev/test toolchain: Vitest, MSW 2.x, @testing-library/react, @chialab/vitest-axe, @faker-js/faker, Prettier
- `npm run build` and `npm run lint` both pass with zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Scaffold Next.js 16 project** - `c5102c6` (feat)
2. **Task 2: Design token bridge + ESLint rule** - `95ef1be` (feat)
3. **Task 3: Token verification checkpoint** - `chore` (tokens approved by user — fallback palette accepted)

## Files Created/Modified

- `app/globals.css` - Tailwind v4 @theme block with all MomCare Design System tokens
- `app/layout.tsx` - Minimal root layout with lang="en", MomCare metadata, no providers
- `app/page.tsx` - Placeholder page, no hardcoded styles
- `eslint-local-rules/no-tailwind-arbitrary.cjs` - Custom ESLint rule blocking arbitrary Tailwind values
- `eslint.config.mjs` - ESLint flat config with local plugin registered
- `package.json` - All production and dev dependencies, additional scripts
- `.prettierrc` - Prettier configuration
- `.prettierignore` - Prettier ignore patterns
- `.env.local.example` - AUTH_BYPASS=true documented
- `.gitignore` - Standard Next.js gitignore

## Decisions Made

- Used scaffold-then-copy approach: `create-next-app` cannot accept directory names with spaces or capitals, so scaffolded in `momcare-tmp`, then copied to `MomCare frontend`.
- Used fallback token palette for `@theme` block since the MomCare Design System Storybook tokens couldn't be verified programmatically. These approximate the visual design system and are flagged for user verification in Task 3 checkpoint.
- Tailwind v4 uses `@theme` in CSS (not `tailwind.config.ts`) — no config file is needed or generated.

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] create-next-app rejected directory name with spaces/capitals**
- **Found during:** Task 1 (scaffold step)
- **Issue:** `create-next-app` rejects names with spaces or capital letters (npm naming restrictions). The target directory `MomCare frontend` triggered this error.
- **Fix:** Scaffolded into a temporary directory `momcare-tmp`, then copied all files to the target directory. Cleaned up temp directory afterwards.
- **Files modified:** All scaffold files
- **Verification:** `npm run build` passed after copy
- **Committed in:** c5102c6 (Task 1 commit)

---

**Total deviations:** 1 auto-fixed (1 blocking)
**Impact on plan:** Workaround was transparent — all planned files created, all acceptance criteria met.

## Issues Encountered

- `next-env.d.ts` and `.env.local.example` are excluded by the generated `.gitignore` patterns (`next-env.d.ts` explicitly, `.env*` matching the example). Force-added both with `git add -f` since `next-env.d.ts` is referenced by `tsconfig.json` and `.env.local.example` is intentionally public documentation.

## User Setup Required

None for this plan. Task 3 checkpoint requires user to verify token values against the MomCare Design System Storybook before Plan 01-02 proceeds.

## Next Phase Readiness

- **Task 3 (checkpoint):** User verified token hex values against the MomCare Design System Storybook and approved the fallback palette in `app/globals.css` on 2026-03-18.
- Plan 01-02 is unblocked and can proceed (route shells, middleware, mock layer).
- All tooling infrastructure is in place — zero blockers for downstream plans.

---
*Phase: 01-foundation*
*Completed: 2026-03-18*
