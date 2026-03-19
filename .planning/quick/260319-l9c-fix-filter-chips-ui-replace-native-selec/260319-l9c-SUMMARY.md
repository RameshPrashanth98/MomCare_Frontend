---
quick_id: 260319-l9c
title: "Fix filter chips UI — replace native selects with custom dropdown chips"
status: complete
commits: ["b856d83"]
files_changed: 1
---

# Summary: 260319-l9c

## What Changed

### Mothers Page (`app/dashboard/mothers/page.tsx`)

**Problem:** Native `<select>` elements rendered with OS-level chrome (dark/ugly dropdown styling) that broke the MomCare design system consistency.

**Solution:** Created a custom `FilterChip` component:

- **Inactive state:** White surface background, gray border, label text + ChevronDown icon
- **Active state:** Primary-light (#E8F5EE) background, primary (#1B6B4A) border, selected value label + X button (primary circle with white X) to clear
- **Dropdown panel:** White surface, rounded-lg corners, shadow-md elevation, max 220px height with scroll, z-index 50
- **Selected option:** Highlighted with primary-light bg and bold primary text
- **Click-outside-to-close:** useRef + useEffect pattern

All 4 filters (Clinic, Area, Trimester, Risk Level) now use FilterChip.
Clear All button updated with X icon and risk-high-bg background for visual consistency.

## Design Tokens Used

- `--color-surface`, `--color-primary`, `--color-primary-light`
- `--color-border`, `--color-on-surface`, `--color-on-surface-secondary`
- `--color-risk-high`, `--color-risk-high-bg`
- `--radius-full`, `--radius-lg`
- `--shadow-md`
- `--spacing-xs`, `--spacing-sm`, `--spacing-md`
