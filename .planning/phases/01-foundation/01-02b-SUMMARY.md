---
phase: 01-foundation
plan: 02b
subsystem: api-layer
tags: [msw, tanstack-query, zustand, providers, fetch-abstraction]

# Dependency graph
requires: [01-01, 01-02]
provides:
  - REST-shaped lib/api/ fetch functions for all 6 entities
  - MSW v2 handlers serving data from lib/mock/db
  - TanStack Query client (5-min staleTime, retry: 1)
  - Zustand UI store (drawers, filters, auth presence — no entity data)
  - Providers client component with MSW dev-mode init
  - Root layout wired with Providers as server/client boundary
affects: [01-03, 02-onboarding, 03-patient-list, 04-visit-recording]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - lib/api/ functions call fetch() — same signature works for mock and real API
    - MSW handlers import from lib/mock/db and serve typed responses
    - Providers component is the only 'use client' boundary in the root layout
    - Zustand store holds UI state only — no Mother[], Visit[] arrays

key-files:
  created:
    - lib/api/mothers.ts
    - lib/api/visits.ts
    - lib/api/vaccinations.ts
    - lib/api/weight.ts
    - lib/api/sessions.ts
    - lib/api/staff.ts
    - mocks/handlers/mothers.ts
    - mocks/handlers/visits.ts
    - mocks/handlers/vaccinations.ts
    - mocks/handlers/weight.ts
    - mocks/handlers/sessions.ts
    - mocks/handlers/staff.ts
    - mocks/handlers/index.ts
    - mocks/browser.ts
    - mocks/server.ts
    - lib/query/client.ts
    - store/ui.ts
    - app/providers.tsx
    - public/mockServiceWorker.js
  modified:
    - app/layout.tsx (wraps children in Providers)
    - package.json (msw.workerDirectory added)

key-decisions:
  - "lib/api/ functions use window.location.origin for URL construction — same pattern works in browser and test with MSW interception"
  - "Providers returns null in dev until MSW worker.start() resolves — prevents fetch calls before MSW is ready"
  - "Zustand store has zero entity data — TanStack Query is the sole server state cache"

# Metrics
duration: 20min
completed: 2026-03-18
---

# Phase 1 Plan 02b: API Abstraction Layer, MSW Handlers, TanStack Query, Zustand, Providers Summary

**Mock data pipeline wired end-to-end: lib/api/ fetch functions → MSW intercepts → lib/mock/db. TanStack Query manages server state. Zustand holds UI-only state. Providers component wired into root layout.**

## Performance

- **Duration:** ~20 min
- **Started:** 2026-03-18
- **Completed:** 2026-03-18
- **Tasks completed:** 2 of 2
- **Files created:** 19 (+ 1 modified)

## Accomplishments

- `lib/api/` — 6 typed fetch wrappers; same signature works against mock and real API
- `mocks/handlers/` — 6 handler files + index serving all entity data from `lib/mock/db`
- `mocks/browser.ts` / `mocks/server.ts` — MSW entry points for browser dev and Node test
- `public/mockServiceWorker.js` — MSW service worker initialized via `npx msw init`
- `lib/query/client.ts` — QueryClient with 5-min staleTime and retry: 1
- `store/ui.ts` — Zustand store with UI state only (drawers, filters, isAuthenticated)
- `app/providers.tsx` — client boundary; starts MSW worker in dev before first render
- `app/layout.tsx` — updated to wrap children in `<Providers>`
- `npx tsc --noEmit` passes with zero errors
- `npm run build` passes (clean Next.js 16 production build)
- `npm run lint` passes with 0 errors (2 pre-existing warnings)

## Task Commits

1. **Task 1: lib/api + MSW handlers** — `df6c66c` (feat)
2. **Task 2: TanStack Query + Zustand + Providers** — `0425845` (feat)

## Files Created

| File | Purpose |
|------|---------|
| `lib/api/mothers.ts` | List, get, create mothers |
| `lib/api/visits.ts` | List, get, create visits |
| `lib/api/vaccinations.ts` | List, log vaccinations |
| `lib/api/weight.ts` | List, log weight records |
| `lib/api/sessions.ts` | List, get, create clinic sessions |
| `lib/api/staff.ts` | List, get staff members |
| `mocks/handlers/mothers.ts` | GET /api/mothers (filter+paginate), GET /api/mothers/:id, POST |
| `mocks/handlers/visits.ts` | GET /api/visits (motherId filter+paginate), GET /:id, POST |
| `mocks/handlers/vaccinations.ts` | GET /api/vaccinations (motherId filter), POST |
| `mocks/handlers/weight.ts` | GET /api/weight (motherId filter), POST |
| `mocks/handlers/sessions.ts` | GET /api/sessions (date/status filter+paginate), GET /:id, POST |
| `mocks/handlers/staff.ts` | GET /api/staff, GET /api/staff/:id |
| `mocks/handlers/index.ts` | Flat export of all handlers |
| `mocks/browser.ts` | MSW setupWorker for browser dev |
| `mocks/server.ts` | MSW setupServer for Node.js test |
| `lib/query/client.ts` | QueryClient configuration |
| `store/ui.ts` | Zustand UI store |
| `app/providers.tsx` | Client boundary + MSW init + QueryClientProvider |
| `public/mockServiceWorker.js` | MSW service worker |

## Verification

All must_haves from plan verified:
- ✅ `lib/api/mothers.ts` exports `listMothers`, `getMother`, `createMother`
- ✅ `lib/query/client.ts` exports `queryClient`
- ✅ `store/ui.ts` exports `useUIStore` with NO entity data
- ✅ `mocks/server.ts` exports `server` (Node.js MSW)
- ✅ `mocks/browser.ts` exports `worker` (browser MSW)
- ✅ `app/providers.tsx` exports `Providers` wrapping QueryClientProvider
- ✅ `app/layout.tsx` wraps children in `<Providers>`
- ✅ MSW intercepts all /api/* routes with data from lib/mock/db
- ✅ TypeScript: zero errors
- ✅ Build: passes
- ✅ Lint: 0 errors

## Next Phase Readiness

- Plan 01-03 (Vitest tests, route group layout shells, proxy.ts auth guard, CI pipeline) is unblocked
- Components in Phase 2+ can call `lib/api/` functions and receive typed mock data via TanStack Query

---
*Phase: 01-foundation*
*Completed: 2026-03-18*
