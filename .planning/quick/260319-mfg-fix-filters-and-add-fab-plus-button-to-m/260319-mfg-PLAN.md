---
quick_id: 260319-mfg
title: "Fix filters and add FAB plus button to Mothers screen"
tasks: 1
---

# Quick Task 260319-mfg

## Objective

Fix non-functional filter dropdowns and add the missing pink floating action button (+) from the wireframe.

## Task 1: Fix filters and add FAB

**Files:** `app/dashboard/mothers/page.tsx`

**Action:**
1. Diagnose filter issue: dropdown panels were rendered inside `overflow-y: auto` container, getting clipped
2. Fix by rendering dropdowns via `createPortal` to `document.body` with `position: fixed`
3. Calculate dropdown position from chip's `getBoundingClientRect()`
4. Update click-outside handler to check both chip and portal dropdown refs
5. Add pink FAB (+) button positioned absolute bottom-right, above bottom nav
6. Use design tokens: brand-pink, shadow-lg, radius-full
