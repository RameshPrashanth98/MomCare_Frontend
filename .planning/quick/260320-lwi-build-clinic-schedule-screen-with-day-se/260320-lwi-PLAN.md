---
phase: quick
plan: 260320-lwi
type: execute
wave: 1
depends_on: []
files_modified:
  - app/dashboard/clinics/page.tsx
  - app/dashboard/page.tsx
  - app/dashboard/mothers/page.tsx
autonomous: true
must_haves:
  truths:
    - "User sees Clinic Schedule header with back arrow, EN badge, bell icon, and avatar"
    - "User sees Today's Clinics section with pink dot and calendar icon"
    - "User sees horizontal day selector strip with Mon-Fri, current day highlighted pink"
    - "User sees 3 session cards (Active/Upcoming/Completed) with location, time, midwife, expected count, type, and 3 action buttons"
    - "User sees + Add Clinic Session outlined pink button at bottom of content"
    - "Bottom nav shows CLINICS as active (pink filled) and all 5 nav items link correctly"
  artifacts:
    - path: "app/dashboard/clinics/page.tsx"
      provides: "Clinic Schedule screen"
      min_lines: 200
  key_links:
    - from: "app/dashboard/page.tsx"
      to: "/dashboard/clinics"
      via: "Bottom nav CLINICS link"
    - from: "app/dashboard/mothers/page.tsx"
      to: "/dashboard/clinics"
      via: "Bottom nav CLINICS link"
---

<objective>
Build the Clinic Schedule screen at /dashboard/clinics matching the wireframe spec: header with nav icons, "Today's Clinics" section, horizontal day selector, 3 session cards with status badges and action buttons, "+ Add Clinic Session" button, and bottom nav with CLINICS active.

Purpose: Add the clinics section to the dashboard navigation flow, making all 3 main screens (Home, Mothers, Clinics) navigable.
Output: Fully styled Clinic Schedule page with mock data, plus bottom nav wiring across all dashboard screens.
</objective>

<execution_context>
@.planning/quick/260320-lwi-build-clinic-schedule-screen-with-day-se/260320-lwi-PLAN.md
</execution_context>

<context>
@app/dashboard/page.tsx (Home screen — reference for bottom nav pattern, card styling, design token usage)
@app/dashboard/mothers/page.tsx (Mothers screen — reference for header pattern, bottom nav)
@app/globals.css (Design tokens — all colors, spacing, radii, shadows)
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create Clinic Schedule page with all sections</name>
  <files>app/dashboard/clinics/page.tsx</files>
  <action>
Create `app/dashboard/clinics/page.tsx` as a 'use client' component. Follow the exact same patterns as `app/dashboard/page.tsx` and `app/dashboard/mothers/page.tsx` — inline styles using CSS variables, Tailwind flex utilities, lucide-react icons.

**Header** (sticky top, white background):
- Back arrow (ArrowLeft icon, 20px) on left — `router.back()` on click
- "Clinic Schedule" title centered, fontSize 17px, fontWeight 600, color var(--color-on-surface)
- Right side: "EN" badge (small rounded pill, border var(--color-border), fontSize 11px), Bell icon (20px, links to /dashboard/notifications), pink circle avatar (28px diameter, bg var(--color-brand-pink), white letter "M" inside, fontSize 12px fontWeight 600)
- Height ~56px, borderBottom 1px solid var(--color-border), paddingLeft/Right var(--spacing-md)

**"Today's Clinics" section** (below header):
- paddingLeft/Right var(--spacing-md), paddingTop var(--spacing-md)
- Left: pink dot (8px circle, bg var(--color-brand-pink), display inline-block, marginRight var(--spacing-xs)), then "Today's Clinics" text (fontSize 16px, fontWeight 600, color var(--color-on-surface))
- Right: Calendar icon (20px, color var(--color-on-surface-secondary))

**Day selector strip**:
- Horizontal scrollable row, hide scrollbar (same pattern as home screen's horizontal scroll: className "flex [&::-webkit-scrollbar]:hidden", msOverflowStyle none, scrollbarWidth none)
- Show Mon 10, Tue 11, Wed 12, Thu 13, Fri 14 (mock current week)
- Each day: flex-col items-center, gap 4px, minWidth 56px. Day abbreviation (fontSize 12px, color var(--color-on-surface-secondary)) on top, date number below (fontSize 14px, fontWeight 500)
- Active day (Wed 12): date number inside a 36px pink filled circle (bg var(--color-brand-pink), color white, borderRadius var(--radius-full)), day text also color var(--color-brand-pink)
- Other days: plain text, no circle
- Use useState for selectedDay, default to 2 (Wed index). Clicking a day updates selection.
- paddingLeft/Right var(--spacing-md), marginTop var(--spacing-md), gap var(--spacing-sm)

**Session cards** (3 cards, scrollable content area):
- Mock data array CLINIC_SESSIONS with 3 items:
  1. { name: "Antenatal Clinic A", status: "Active", statusColor: "var(--color-success)", statusBg: "var(--color-risk-low-bg)", location: "Village Health Center", day: "Wed 12", time: "8:30 AM", midwife: "Malani", expected: 25, type: "Antenatal" }
  2. { name: "Antenatal Clinic B", status: "Upcoming", statusColor: "var(--color-warning)", statusBg: "var(--color-risk-medium-bg)", location: "Lakewood MOH Office", day: "Wed 12", time: "9:00 AM", midwife: "Sunita", expected: 18, type: "Antenatal" }
  3. { name: "Antenatal Clinic C", status: "Completed", statusColor: "var(--color-on-surface-secondary)", statusBg: "var(--color-surface-secondary)", location: "Riverside PHM Area", day: "Tue 11", time: "8:00 AM", midwife: "Lakshmi", expected: 22, type: "Antenatal" }

- Each card: bg var(--color-surface), borderRadius var(--radius-xl), border 1px solid var(--color-border), padding var(--spacing-md), marginLeft/Right var(--spacing-md), marginTop var(--spacing-sm)
  - Row 1: Clinic name (fontSize 15px, fontWeight 600, color var(--color-on-surface)) + status badge on right (pill: fontSize 11px, paddingLeft/Right var(--spacing-sm), paddingTop/Bottom 2px, borderRadius var(--radius-full), bg and color from session data)
  - Row 2: MapPin icon (14px) + location text (fontSize 13px, color var(--color-on-surface-secondary)), marginTop var(--spacing-xs)
  - Row 3: Grid of 4 detail items (2 columns), marginTop var(--spacing-sm), gap var(--spacing-xs):
    - Calendar icon (12px) + day/time
    - User icon (12px) + "Midwife: {name}"
    - Users icon (12px) + "Expected: {count}"
    - Stethoscope icon (12px) + "Type: {type}"
    - Each: fontSize 12px, color var(--color-on-surface-secondary), flex items-center gap 4px
  - Row 4: 3 buttons row, marginTop var(--spacing-md), gap var(--spacing-sm), flex
    - "View Session" — outlined: border 1.5px solid var(--color-brand-pink), color var(--color-brand-pink), bg transparent, fontSize 12px, fontWeight 500, borderRadius var(--radius-full), height 34px, flex 1, cursor pointer
    - "Start Clinic" — filled: bg var(--color-brand-pink), color white, border none, same sizing as above
    - "Mothers List" — outlined: same style as View Session

**"+ Add Clinic Session" button**:
- Below last card, marginLeft/Right var(--spacing-md), marginTop var(--spacing-md), marginBottom var(--spacing-md)
- Full width, height 44px, border 1.5px dashed var(--color-brand-pink), color var(--color-brand-pink), bg transparent, borderRadius var(--radius-xl), fontSize 14px, fontWeight 500, cursor pointer
- Plus icon (16px) + "Add Clinic Session" text, flex items-center justify-center gap var(--spacing-xs)

**Bottom nav bar** — exact same pattern as home page:
- 5 items: HOME (links /dashboard), MOTHERS (links /dashboard/mothers), CLINICS (active, pink, filled icon), RECORDS (button), PROFILE (button)
- CLINICS is active: color var(--color-brand-pink), Building2 icon with fill="currentColor"
- Others inactive: color var(--color-on-surface-secondary), fill="none"
- Height 64px, bg var(--color-surface), borderTop 1px solid var(--color-border)

**Page layout**: Same flex column structure as other dashboard pages. Scrollable content area between header and bottom nav using flex-1 overflow-y-auto.

Icons to import from lucide-react: ArrowLeft, Bell, Calendar, MapPin, User, Users, Stethoscope, Building2, Home, FileText, UserCircle, Plus
  </action>
  <verify>
    <automated>cd "D:/UX projects/MomCare frontend" && npx next build 2>&1 | tail -5</automated>
  </verify>
  <done>Clinic Schedule page renders at /dashboard/clinics with header, day selector, 3 session cards, add button, and bottom nav. Build succeeds with no errors.</done>
</task>

<task type="auto">
  <name>Task 2: Wire CLINICS bottom nav link on Home and Mothers screens</name>
  <files>app/dashboard/page.tsx, app/dashboard/mothers/page.tsx</files>
  <action>
Update the bottom nav in both Home and Mothers screens so the CLINICS item navigates to /dashboard/clinics instead of being a dead button.

**In app/dashboard/page.tsx:**
- The NAV_ITEMS array at line ~35 has CLINICS with no href equivalent — it renders as a button
- In the bottom nav rendering section (line ~510-578), add a condition for item.label === 'CLINICS' similar to the existing HOME and MOTHERS Link blocks
- Wrap CLINICS in `<Link href="/dashboard/clinics">` with same styling as other nav links

**In app/dashboard/mothers/page.tsx:**
- The NAV_ITEMS array at line ~29-35 has CLINICS with `href: null`
- Update to `href: '/dashboard/clinics'`
- In the bottom nav rendering section, the existing code already handles href-based Links vs buttons — if it uses the href field to decide, just setting href is sufficient. If it uses label-based conditions like the home page, add a CLINICS condition with Link.

Both files already import Link from 'next/link'. No new imports needed.
  </action>
  <verify>
    <automated>cd "D:/UX projects/MomCare frontend" && npx next build 2>&1 | tail -5</automated>
  </verify>
  <done>CLINICS nav item on Home and Mothers screens navigates to /dashboard/clinics. All 3 main screens (Home, Mothers, Clinics) are cross-navigable via bottom nav.</done>
</task>

</tasks>

<verification>
- `npx next build` succeeds with no errors
- /dashboard/clinics renders all sections matching wireframe spec
- Bottom nav on Home, Mothers, and Clinics screens all cross-link correctly
- CLINICS tab is visually active (pink) only on the Clinics screen
</verification>

<success_criteria>
- Clinic Schedule screen at /dashboard/clinics with header, day selector (interactive), 3 session cards with status badges and action buttons, + Add Clinic Session button, and bottom nav
- All design tokens from globals.css used (no hardcoded colors/spacing)
- Bottom nav CLINICS link works on all 3 dashboard screens
- Build passes cleanly
</success_criteria>

<output>
After completion, create `.planning/quick/260320-lwi-build-clinic-schedule-screen-with-day-se/260320-lwi-SUMMARY.md`
</output>
