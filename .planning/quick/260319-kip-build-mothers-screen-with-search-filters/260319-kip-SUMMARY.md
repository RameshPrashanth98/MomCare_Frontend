---
phase: quick
plan: 260319-kip
subsystem: mothers-screen
tags: [mothers, search, filters, navigation, mock-data]
dependency_graph:
  requires: [dashboard-page, mock-db, design-tokens]
  provides: [mothers-list-screen, mothers-nav-link]
  affects: [dashboard-bottom-nav]
tech_stack:
  added: []
  patterns: [client-component, useMemo-filtering, design-token-only-styling]
key_files:
  created:
    - app/dashboard/mothers/page.tsx
  modified:
    - app/dashboard/page.tsx
decisions:
  - "COMMUNITIES constant duplicated in page.tsx (not imported from factory) to avoid coupling to seeding infrastructure"
  - "Filter chips use styled <select> with inline SVG chevron-down background-image — no extra dependency"
  - "Bottom nav items with href render as Link, others remain button — pattern applied to both dashboard and mothers page"
metrics:
  duration_minutes: 15
  completed_date: "2026-03-19"
  tasks_completed: 3
  tasks_total: 3
  files_created: 1
  files_modified: 1
---

# Phase quick Plan 260319-kip: Mothers Screen with Search and Filters Summary

**One-liner:** Client-side mothers list screen at /dashboard/mothers with reactive search (name/NIC) and AND-combined filter chips (Area, Trimester, Risk Level) over 75 mock mothers from db.

## Tasks Completed

| # | Task | Commit | Status |
|---|------|--------|--------|
| 1 | Build Mothers screen with search, filters, and mother cards | 89bbd80 | Complete |
| 2 | Update dashboard bottom nav to link to Mothers page | 8bc0f0d | Complete |
| 3 | Human verification checkpoint | — | Complete (approved) |

## What Was Built

### Task 1 — app/dashboard/mothers/page.tsx

A fully functional `'use client'` React component at the `/dashboard/mothers` route:

- **Header:** Back arrow (Link to /dashboard), "Mothers" title (centered), SlidersHorizontal icon, EN badge, pink avatar "M" — matches notifications page pattern exactly.
- **Search bar:** Full-width input (44px height) with absolutely-positioned Search icon, `var(--color-surface-secondary)` background, filters reactively via `useState`.
- **Filter chips row:** Horizontal scrollable row (scrollbar hidden). Three `<select>` elements styled as pill chips with inline SVG chevron-down as background-image indicator:
  - Area: 13 community options from COMMUNITIES constant
  - Trimester: 1st/2nd/3rd (maps to weeks 0-13, 14-27, 28+)
  - Risk Level: High/Medium/Low
  - Active chip: `var(--color-primary)` fill, white text. Inactive: transparent, border, secondary text.
  - Clear button (red border/text) appears when any filter is active; resets all three.
- **Results count:** "N mothers" line in secondary text below filters.
- **Mother cards:** Each card shows:
  - Name (bold) + age in years (calculated from dateOfBirth)
  - Risk badge pill: color/bg from `--color-risk-{level}` and `--color-risk-{level}-bg` tokens
  - Gestational age "Xw Yd · Trimester N" (calculated from lmpDate)
  - Community | Phone
  - "Last visit: DD Mon YYYY" or "No visits yet"
- **Filtering logic:** `useMemo` over `db.mothers` with AND logic — search (name case-insensitive OR NIC contains), then area exact match, trimester calculated, risk level exact match.
- **Bottom nav:** MOTHERS active (brand-pink, fill currentColor), HOME and MOTHERS rendered as Links, CLINICS/RECORDS/PROFILE as buttons.

### Task 2 — app/dashboard/page.tsx

- HOME nav item now renders as `<Link href="/dashboard">` instead of `<button>`.
- MOTHERS nav item now renders as `<Link href="/dashboard/mothers">` instead of `<button>`.
- All styling preserved; active HOME color unchanged.

## Deviations from Plan

None — plan executed exactly as written.

## Self-Check

### Files exist:
- app/dashboard/mothers/page.tsx — FOUND
- app/dashboard/page.tsx — FOUND (modified)

### Commits exist:
- 89bbd80 — FOUND (feat: build Mothers screen)
- 8bc0f0d — FOUND (feat: update dashboard bottom nav)

## Self-Check: PASSED

## Human Verification

Checkpoint: `checkpoint:human-verify` — Approved by user on 2026-03-19.

All verification steps confirmed. Mothers screen functions correctly on iPhone 16 Pro viewport.
