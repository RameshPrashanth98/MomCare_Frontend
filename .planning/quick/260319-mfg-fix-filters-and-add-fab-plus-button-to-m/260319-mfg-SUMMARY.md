---
quick_id: 260319-mfg
title: "Fix filters and add FAB plus button to Mothers screen"
status: complete
commits: ["51d6045"]
files_changed: 1
---

# Summary: 260319-mfg

## What Changed

### Filter Dropdowns Fixed
**Root cause:** The FilterChip dropdown panels were rendered with `position: absolute` inside the scrollable content container (`overflow-y: auto`). The overflow clipping made dropdowns invisible — they existed in the DOM but were hidden behind the scroll boundary.

**Fix:** Render dropdown panels via `createPortal(...)` to `document.body` with `position: fixed`. The dropdown position is calculated from the chip button's `getBoundingClientRect()`, so it appears directly below the chip regardless of scroll position. Click-outside detection updated to check both the chip ref and the portal dropdown ref.

### FAB Added
Added a pink floating action button (+) in the bottom-right corner matching the wireframe:
- 52×52px circle, `background: var(--color-brand-pink)`, white Plus icon
- Positioned `absolute`, `bottom: 80px`, `right: var(--spacing-md)` (above bottom nav)
- `box-shadow: var(--shadow-lg)` for elevation
- Parent container given `position: relative`
