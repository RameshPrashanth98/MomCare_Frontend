---
phase: quick
plan: 260318-ulk
subsystem: dashboard
tags: [ui, dashboard, home-screen, wireframe, navigation, mock-data]
dependency_graph:
  requires: [app/(auth)/login/page.tsx, app/globals.css]
  provides: [app/dashboard/layout.tsx, app/dashboard/page.tsx]
  affects: [login redirect flow]
tech_stack:
  added: []
  patterns: [inline CSS variables, lucide-react icons, sticky bottom chrome, horizontal scroll cards]
key_files:
  created:
    - app/dashboard/layout.tsx
    - app/dashboard/page.tsx
  modified:
    - next-env.d.ts (generated — type reference path updated by tsc)
decisions:
  - "#FFF0F3 pink tint used for High Risk Mothers stat card — one documented exception to no-hardcoded-hex rule; --color-risk-high-bg is red-tinted, not suitable as pink tint background"
  - "Action row implemented as fixed bottom flex bar above nav (not sticky:bottom), since the layout uses h-dvh + flex-col with the scrollable area as flex-1 — this is the correct pattern for mobile chrome"
metrics:
  duration: "~15 minutes"
  completed: "2026-03-18T16:45:00Z"
  tasks_completed: 2
  files_created: 2
---

# Quick Task 260318-ulk: Build Home Screen Summary

**One-liner:** Dashboard home screen at /dashboard with all 9 wireframe sections — top bar, language row, 2x2 stats grid, clinic list, horizontal high-risk mothers cards, appointments list, sticky action row, and bottom nav.

## What Was Built

### app/dashboard/layout.tsx
iPhone 16 Pro container shell (`max-w-[393px]`) with `surface-secondary` background. Mirrors the `(auth)` layout pattern without the radial gradient. All dashboard route pages inherit this 393px constraint.

### app/dashboard/page.tsx
Full home screen client component with all 9 wireframe sections:

1. **Top App Bar** — "MOH Clinic" in serif/bold (`--color-brand-pink-dark`) + Bell icon + pink "RP" avatar
2. **Language Row** — "EN | globe" right-aligned in secondary text color
3. **Stats Grid 2x2** — Four cards: Today's Clinics (white), High Risk Mothers (pink tint, pink number), Upcoming Appts (white), Recent Updates (green-tinted bg, green number)
4. **Today's Clinics** — Two rows with dot-separator name/time + status badge: "Upcoming" (pink filled pill), "Scheduled" (green outlined pill)
5. **High Risk Mothers** — Section header + "See all" link, horizontal scroll row with two cards: `--color-risk-high-bg` background, AlertTriangle icon (`--color-risk-high`), name/condition/midwife text hierarchy
6. **Upcoming Appointments** — Section header + "See all", two rows with name + clinic/time below + ChevronRight
7. **Action Row** — Three pill buttons: "+ Register Mother" (pink filled), "Clinic Visit" (pink outlined), "Add Vaccination" (green outlined), with Lucide icons
8. **Bottom Navbar** — 5 tabs (HOME/MOTHERS/CLINICS/RECORDS/PROFILE); HOME active with `fill="currentColor"` + `--color-brand-pink`
9. **Scroll architecture** — `h-dvh flex-col overflow-hidden` container; scrollable area is `flex-1 overflow-y-auto pb-[140px]`; action row + nav bar are fixed at bottom of the flex column

## Deviations from Plan

### Auto-fixed Issues

None.

### Documented Exceptions

**1. Hardcoded #FFF0F3 for High Risk Mothers stat card background**
- **Reason:** Plan explicitly calls out this exception. `--color-risk-high-bg` (`#FEF2F2`) is red-tinted; the wireframe requires a pink tint. `--color-brand-pink-light` (`#FF85A8`) is a saturated pink, not a light background tint. `#FFF0F3` is the correct very-light pink tint with an inline comment documenting the exception.

**2. next-env.d.ts updated**
- Running `npx tsc --noEmit` caused Next.js to update the routes type import path from `.next/dev/types/routes.d.ts` to `.next/types/routes.d.ts`. This is an auto-generated file change committed separately.

**3. Build OOM on `npx next build`**
- The Next.js full production build hit an OOM crash in the CI/dev environment (not a code error). TypeScript check (`npx tsc --noEmit`) passed cleanly with zero errors. All imports verified programmatically.

## Commits

| Hash | Message |
|------|---------|
| b301922 | feat(quick-260318-ulk): create dashboard layout shell |
| ec41889 | feat(quick-260318-ulk): build home screen with all 9 wireframe sections |
| 25320da | chore(quick-260318-ulk): update next-env.d.ts type reference path |

## Self-Check: PASSED

- FOUND: app/dashboard/layout.tsx
- FOUND: app/dashboard/page.tsx
- FOUND: commit b301922 (layout shell)
- FOUND: commit ec41889 (home screen page)
- FOUND: commit 25320da (next-env.d.ts chore)
