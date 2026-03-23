---
phase: quick
plan: 260323-jms
subsystem: ui
tags: [bugfix, date-input, register-mother]
key_files:
  modified:
    - app/dashboard/mothers/register/page.tsx
    - app/globals.css
metrics:
  completed: 2026-03-23
---

# Quick Task 260323-jms: Fix overlapping placeholder text in Register Mother date fields — Summary

Fixed overlapping text in 3 date input fields (Date of Birth, Pregnancy Registration Date, Estimated Delivery Date).

## One-liner

Set date input color to transparent when empty and added CSS to hide native WebKit date picker indicators, eliminating placeholder text overlap.

## Root Cause

Browser `type="date"` inputs always render native placeholder text (e.g., "dd/mm/yyyy"). The code overlaid custom placeholder `<span>` elements, but the native text was still visible underneath, causing double text.

## Changes

1. **`dateInputStyle`** — Changed empty-state color from `var(--color-on-surface-secondary)` to `transparent` so native text is invisible
2. **`globals.css`** — Added `::‑webkit-datetime-edit` and `::-webkit-calendar-picker-indicator` rules to inherit the transparent color and make the entire input area clickable
