---
phase: quick
plan: 260322-x8y
subsystem: records/timeline
tags: [timeline, pregnancy, vertical-timeline, milestones, records]
dependency_graph:
  requires: [entities.ts, db.ts, visit.factory.ts]
  provides: [TimelineEvent-type, timeline-factory, pregnancy-timeline-screen]
  affects: [search-records-page]
tech_stack:
  added: []
  patterns: [vertical-timeline-with-dots, milestone-cards, timeline-factory]
key_files:
  created:
    - lib/mock/factories/timeline.factory.ts
    - app/dashboard/records/[id]/timeline/page.tsx
  modified:
    - lib/types/entities.ts
    - lib/mock/db.ts
    - app/dashboard/records/page.tsx
decisions:
  - Pink avatar circle for mother info card on timeline (matches wireframe pink circle)
  - Separate factory function for upcoming milestones vs past events
metrics:
  duration: 3m 20s
  completed: 2026-03-22
---

# Quick Task 260322-x8y: Pregnancy Timeline Screen Summary

Vertical timeline screen with connected coral dots, mother info card, and upcoming milestone cards at `/dashboard/records/[id]/timeline`.

## What Was Built

### Task 1: TimelineEvent type, factory, and db collection (8ab3eb7)
- Added `TimelineEvent` and `TimelineEventType` types to `entities.ts`
- Created `timeline.factory.ts` with `createTimelineEvent` (past events) and `createUpcomingMilestone` (future milestones)
- Generated 4-8 timeline events per mother (3-6 past + 1-2 upcoming) in `db.ts`

### Task 2: Pregnancy Timeline screen and navigation wiring (bd86d54)
- Created full timeline page matching wireframe layout:
  - Header with back arrow, "Pregnancy Timeline" title, EN/globe/bell/avatar
  - Mother info card with pink avatar, name, risk badge, NIC, trimester, EDD, midwife
  - Vertical timeline with coral dots connected by a semi-transparent line, showing date/title/detail per event
  - Upcoming milestones section with icon-based cards (Calendar for clinic visits, Syringe for vaccinations)
  - Bottom nav bar with RECORDS active
- Wired Timeline button on Search Records page to navigate to `/dashboard/records/{motherId}/timeline`

## Deviations from Plan

None - plan executed exactly as written.

## Verification Results

- TypeScript compilation: PASSED (no errors)
- Next.js build: PASSED (compiled successfully)
- Route exists: `/dashboard/records/[id]/timeline` resolves correctly
- Timeline button navigation: wired in Search Records page
