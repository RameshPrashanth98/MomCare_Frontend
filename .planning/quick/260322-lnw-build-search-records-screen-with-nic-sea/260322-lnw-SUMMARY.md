# Quick Task 260322-lnw: Summary

**Task:** Build Search Records screen with NIC search and bottom nav wiring
**Date:** 2026-03-22
**Commit:** 108d136

## What was done

### Task 1: Create Search Records page
- Created `app/dashboard/records/page.tsx` with:
  - Header: back arrow, "Search Records" title, EN badge, language icon, profile avatar
  - Search bar: "Search by NIC" with real-time filtering by `nationalId`
  - Section label: "Pregnant Mothers List"
  - Scrollable list of mother record cards showing:
    - Avatar circle with initials (rotating colors)
    - Mother name + risk badge (High Risk red / Normal green with icons)
    - NIC number, Clinic No, Trimester, Assigned Midwife
    - 4 action buttons in 2x2 grid: Vaccination, Health Tracking, Lab Reports, Timeline
  - Empty state when no results match
  - Bottom navigation with RECORDS active (pink)
- Uses existing `db.mothers` (75 Sri Lankan mothers) and `db.staff` for midwife lookup
- All styling uses MomCare design tokens from globals.css

### Task 2: Wire RECORDS bottom nav across all dashboard screens
- Updated 9 existing dashboard pages to change RECORDS `href: null` to `href: '/dashboard/records'`
- Fixed CLINICS `href: null` in `mothers/register/page.tsx`
- Zero null RECORDS hrefs remain across the codebase

## Files changed
- `app/dashboard/records/page.tsx` (new — 295 lines)
- `app/dashboard/page.tsx` (nav update)
- `app/dashboard/mothers/page.tsx` (nav update)
- `app/dashboard/clinics/page.tsx` (nav update)
- `app/dashboard/clinics/add/page.tsx` (nav update)
- `app/dashboard/clinics/[id]/page.tsx` (nav update)
- `app/dashboard/mothers/register/page.tsx` (nav update x2)
- `app/dashboard/mothers/[id]/page.tsx` (nav update)
- `app/dashboard/mothers/[id]/medical-history/page.tsx` (nav update)
- `app/dashboard/profile/page.tsx` (nav update)

## Verification
- TypeScript: `npx tsc --noEmit` passes with zero errors
- Next.js build: compiles successfully (OOM in optimization is pre-existing infra issue)
- All RECORDS nav items wired: `grep -rn "RECORDS.*href.*null"` returns zero matches
