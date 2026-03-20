---
phase: quick
plan: 260320-lwi
subsystem: clinics-ui
tags: [clinics, bottom-nav, session-cards, day-selector, navigation]
dependency_graph:
  requires: [app/dashboard/page.tsx, app/dashboard/mothers/page.tsx, app/globals.css]
  provides: [app/dashboard/clinics/page.tsx, /dashboard/clinics route]
  affects: [app/dashboard/mothers/[id]/page.tsx, app/dashboard/mothers/[id]/medical-history/page.tsx]
tech_stack:
  added: []
  patterns: [inline-styles-with-css-vars, lucide-react-icons, href-based-nav-items, horizontal-scrollable-strip]
key_files:
  created:
    - app/dashboard/clinics/page.tsx
  modified:
    - app/dashboard/page.tsx
    - app/dashboard/mothers/page.tsx
    - app/dashboard/mothers/[id]/page.tsx
    - app/dashboard/mothers/[id]/medical-history/page.tsx
decisions:
  - Home page nav rendering refactored from label-based if/else to href-based pattern (consistent with Mothers/Profile pages)
metrics:
  duration: ~10 minutes
  completed: 2026-03-20
  tasks_completed: 2
  files_created: 1
  files_modified: 4
---

# Quick Task 260320-lwi: Clinic Schedule Screen Summary

**One-liner:** Clinic Schedule screen at /dashboard/clinics with interactive day selector, 3 mock session cards (Active/Upcoming/Completed), and CLINICS bottom nav wired across all 5 dashboard screens.

## Tasks Completed

| # | Task | Commit | Status |
|---|------|--------|--------|
| 1 | Create Clinic Schedule page | 6d227da | Done |
| 2 | Wire CLINICS bottom nav on Home, Mothers, Profile, Medical History | ec7d69a | Done |

## What Was Built

### Clinic Schedule page (`app/dashboard/clinics/page.tsx`)

Full `'use client'` page at `/dashboard/clinics` matching the wireframe spec:

- **Header:** Back arrow (router.back()), "Clinic Schedule" title (17px/600), EN pill badge, Bell icon linking to /dashboard/notifications, pink circle avatar (28px, letter "M")
- **Today's Clinics section:** Pink 8px dot + "Today's Clinics" heading (16px/600), calendar icon right-aligned
- **Day selector strip:** Horizontal scrollable strip Mon 10 – Fri 14 with chevron right arrow. Active day (Wed 12, index 2) rendered with pink filled 36px circle and pink label. useState-driven interaction updates selectedDay.
- **3 Session cards** with status badges (Active=green bg/text, Upcoming=amber, Completed=gray), location row with MapPin icon, 2x2 details grid (Calendar/date+time, User/midwife, Users/expected, Stethoscope/type), and 3 action buttons: "View Session" (outlined), "Start Clinic" (filled pink with Play icon), "Mothers List" (outlined)
- **+ Add Clinic Session** button with 1.5px dashed pink border at bottom
- **Bottom nav:** CLINICS active (pink filled Building2 icon), all 5 items — HOME/MOTHERS/CLINICS as Links, RECORDS/PROFILE as disabled buttons

### Navigation wiring across all screens

All 4 existing dashboard screens had their CLINICS NAV_ITEMS entry updated from `href: null` to `href: '/dashboard/clinics'`:

- `app/dashboard/page.tsx` — also refactored nav rendering from label-based `if` blocks to unified href-based pattern (same as Mothers/Profile pattern)
- `app/dashboard/mothers/page.tsx` — single href field update
- `app/dashboard/mothers/[id]/page.tsx` — single href field update
- `app/dashboard/mothers/[id]/medical-history/page.tsx` — single href field update

## Deviations from Plan

### Auto-fixed Issues

None.

### Minor refinements

**Home page nav pattern refactored (Plan improvement)**
- **Found during:** Task 2
- **Issue:** Home page used label-based `if (item.label === 'HOME')` / `if (item.label === 'MOTHERS')` blocks — adding CLINICS would have required a third `if` block, inconsistent with the href-based pattern used on all other pages
- **Fix:** Refactored NAV_ITEMS to include `href` field and nav rendering to use `if (item.href)` — identical to the established pattern on Mothers/Profile pages
- **Files modified:** `app/dashboard/page.tsx`
- **Commit:** ec7d69a

## Verification

- `npx next build` — passes cleanly, all 12 routes compiled without errors
- `/dashboard/clinics` included in static route output
- All 5 dashboard screens have consistent href-based CLINICS nav wiring

## Self-Check

- [x] `app/dashboard/clinics/page.tsx` — created (552 lines)
- [x] Task 1 commit 6d227da — exists
- [x] Task 2 commit ec7d69a — exists
- [x] Build passes: all routes compiled

## Self-Check: PASSED
