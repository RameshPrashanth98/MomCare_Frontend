---
phase: 01-foundation
plan: 02
subsystem: data-layer
tags: [faker, mock-data, typescript, entities, factories, referential-integrity]

# Dependency graph
requires: [01-01]
provides:
  - All entity type definitions (Mother, Visit, Vaccination, WeightRecord, ClinicSession, Staff)
  - RiskLevel and VaccinationStatus union types
  - Faker.js factories with fixed seed 12345 for deterministic output
  - In-memory mock database with referential integrity (75 mothers, 10 staff, proportional entities)
affects: [01-02b, 01-03, 02-onboarding, 03-patient-list, 04-visit-recording, 05-vaccinations]

# Tech tracking
tech-stack:
  added: []
  patterns:
    - Seeded faker at module level (seed.ts) — all factories import from ../seed never from @faker-js/faker directly
    - Factory functions accept Partial<EntityType> overrides for test customization
    - db.ts back-fills lastVisitDate on mothers after visits are generated, then sorts ascending for MOTH-02

key-files:
  created:
    - lib/types/entities.ts
    - lib/mock/seed.ts
    - lib/mock/factories/staff.factory.ts
    - lib/mock/factories/mother.factory.ts
    - lib/mock/factories/visit.factory.ts
    - lib/mock/factories/vaccination.factory.ts
    - lib/mock/factories/weight.factory.ts
    - lib/mock/factories/session.factory.ts
    - lib/mock/db.ts
  modified: []

key-decisions:
  - "Fixed seed 12345 in seed.ts — single import point prevents re-seeding on multiple imports"
  - "RiskLevel distribution: 20% high / 30% medium / 50% low via faker.helpers.weightedArrayElement"
  - "lastVisitDate back-filled in db.ts after visit generation — avoids two-phase factory dependency"
  - "Mothers sorted ascending by lastVisitDate (null first) so most-overdue appear first per MOTH-02"

# Metrics
duration: 12min
completed: 2026-03-18
---

# Phase 1 Plan 02: Entity Types, Faker Factories, and Mock Database Summary

**TypeScript entity contracts for all 6 clinical entities plus Faker.js factories with seed 12345 and an in-memory database with 75 mothers, 10 staff, and referentially-intact visits, vaccinations, weight records, and clinic sessions.**

## Performance

- **Duration:** ~12 min
- **Started:** 2026-03-18
- **Completed:** 2026-03-18
- **Tasks completed:** 2 of 2
- **Files created:** 9

## Accomplishments

- `lib/types/entities.ts` — all 6 entity interfaces and 2 union types exported; QUAL-06 (riskLevel), QUAL-07 (lmpDate), QUAL-08 (createdByStaffId) all satisfied
- `lib/mock/seed.ts` — single seeded faker export; all factories import from here, never from `@faker-js/faker` directly
- 6 factory files — each accepts `Partial<EntityType>` overrides for test customization
- `lib/mock/db.ts` — 10 staff, 75 mothers (lmpDate 2–40 weeks ago), 1–6 visits per mother, 3–7 vaccinations per mother, 2–8 weight records per mother, 20 clinic sessions; all foreign key references resolve; mothers sorted ascending by `lastVisitDate` (most overdue first, MOTH-02)
- `npx tsc --noEmit` passes with zero errors

## Task Commits

Each task was committed atomically:

1. **Task 1: Entity type definitions** — `6e43c4b` (feat)
2. **Task 2: Faker factories + in-memory database** — `83388b4` (feat)

## Files Created

| File | Purpose |
|------|---------|
| `lib/types/entities.ts` | All entity interfaces and union types |
| `lib/mock/seed.ts` | Seeded faker instance (seed 12345) |
| `lib/mock/factories/staff.factory.ts` | Staff factory — roles, facilities |
| `lib/mock/factories/mother.factory.ts` | Mother factory — risk distribution, lmpDate, EDD |
| `lib/mock/factories/visit.factory.ts` | Visit factory — clinical vitals ranges |
| `lib/mock/factories/vaccination.factory.ts` | Vaccination factory — TT + IPTp schedules |
| `lib/mock/factories/weight.factory.ts` | Weight record factory — GA weeks+days |
| `lib/mock/factories/session.factory.ts` | Clinic session factory — capacity 10–30 |
| `lib/mock/db.ts` | In-memory DB with referential integrity |

## Decisions Made

- **Fixed seed 12345 in seed.ts:** Single import point prevents re-seeding when multiple files import faker. All factories must import from `../seed`, never from `@faker-js/faker` directly — this constraint is enforced by the `key_links` contract in the plan frontmatter.
- **RiskLevel distribution:** `weightedArrayElement` with weights 20/30/50 (high/medium/low) gives clinically realistic data without magic index math.
- **lastVisitDate back-filled post-generation:** `db.ts` generates all visits first, then maps max date back onto each mother object. This avoids a circular factory dependency (visit needs motherId, mother needs lastVisitDate from visits).
- **Ascending sort for mothers:** `null` lastVisitDate sorts first (these mothers have never been seen — most urgent), then oldest visit date. Matches MOTH-02 "sort by lastVisitDate" requirement.

## Deviations from Plan

None — plan executed exactly as written. All must_haves verified:

- Every `visit.motherId` resolves to a real mother in `db.mothers`
- Every `visit.staffId` resolves to a real staff member in `db.staff`
- Every `vaccination.createdByStaffId` is a real staff ID
- Every `weightRecord.createdByStaffId` is a real staff ID
- Every mother has `riskLevel` (QUAL-06)
- Every mother has `lmpDate` (QUAL-07)
- All authored records have `createdByStaffId` (QUAL-08)

## Next Phase Readiness

- Plan 01-02b (API abstraction layer with MSW handlers) is unblocked — it can now import `db` from `lib/mock/db.ts` and `entity types` from `lib/types/entities.ts`
- The data contract is stable — `lib/api/` functions in 01-02b will type-check against these interfaces

---
*Phase: 01-foundation*
*Completed: 2026-03-18*
