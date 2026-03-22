# Quick Task: Responsive Design Across Devices

**ID:** 260322-vhp
**Date:** 2026-03-22
**Goal:** Make the app responsive across all mobile devices, using iPhone 16 Pro (393px) as reference baseline, not a fixed size.

## Problem

All layouts hard-coded `max-width: 393px` (iPhone 16 Pro exact width), which:
- Crops content on wider phones (iPhone 16 Pro Max at 430px)
- Prevents the app from using full screen width on any device
- Treats iPhone 16 Pro as a fixed constraint instead of a baseline

## Solution

1. **Dashboard layout** (`app/dashboard/layout.tsx`): Changed `max-w-[393px]` to `max-w-[430px]`
2. **Auth layout** (`app/(auth)/layout.tsx`): Changed `max-w-[393px]` to `max-w-[430px]`
3. **Onboarding page** (`app/onboarding/page.tsx`): Changed `maxWidth: 393` to `maxWidth: 430` (2 occurrences)
4. **globals.css**: Added CSS custom properties for safe area insets

### Why 430px max-width?
- Covers all current iPhone models (SE 375px → Pro Max 430px)
- On mobile: app fills full width naturally (all phones < 430px)
- On tablet/desktop: caps at 430px to maintain mobile app feel
- iPhone 16 Pro (393px) remains the design reference — content is designed for 393px but allowed to breathe wider

### What was NOT changed
- Small element sizes in px (avatars, badges, icons) — these are correct as fixed sizes
- Horizontally scrollable cards with `minWidth` — intentionally scrollable
- `var()` spacing tokens — already responsive (rem-based)
