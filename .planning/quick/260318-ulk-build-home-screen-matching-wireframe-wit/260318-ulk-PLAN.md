---
phase: quick
plan: 260318-ulk
type: execute
wave: 1
depends_on: []
files_modified:
  - app/dashboard/page.tsx
  - app/dashboard/layout.tsx
autonomous: true
requirements: []
must_haves:
  truths:
    - "Dashboard page renders at /dashboard with all wireframe sections visible"
    - "Stats grid shows 4 cards in 2x2 layout with correct colors per wireframe"
    - "Today's Clinics, High Risk Mothers, and Upcoming Appointments sections render with mock data"
    - "Action row with 3 pill buttons is sticky above bottom nav"
    - "Bottom nav bar shows 5 tabs with HOME active (pink)"
    - "Page scrolls vertically with sticky bottom elements"
  artifacts:
    - path: "app/dashboard/layout.tsx"
      provides: "Dashboard shell layout with max-width container, no auth gradient"
    - path: "app/dashboard/page.tsx"
      provides: "Full Home screen with all 9 wireframe sections"
  key_links:
    - from: "app/(auth)/login/page.tsx"
      to: "app/dashboard/page.tsx"
      via: "router.push('/dashboard') on login"
      pattern: "router\\.push.*dashboard"
---

<objective>
Build the Home (Dashboard) screen at /dashboard matching the wireframe exactly, using only design tokens from globals.css. All data is inline mock data. The screen includes: top app bar, language row, 2x2 stats grid, today's clinics list, high risk mothers horizontal cards, upcoming appointments list, sticky action row, and bottom navigation bar.

Purpose: This is the primary screen users land on after login -- the operational hub for midwives/PHMs.
Output: Working /dashboard route with all wireframe sections rendered with mock data.
</objective>

<execution_context>
@.claude/get-shit-done/workflows/execute-plan.md
@.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@app/globals.css (design tokens -- ONLY source for colors, spacing, radius, shadows)
@app/(auth)/layout.tsx (reference for max-width container pattern)
@app/(auth)/login/page.tsx (pattern reference for inline styles with design tokens)
@store/ui.ts (auth state -- useUIStore available if needed)

<interfaces>
From app/globals.css @theme (key tokens for this screen):
- --color-brand-pink: #E8527A (active nav, stat card accent, action buttons)
- --color-brand-pink-light: #FF85A8 (pink-tinted card backgrounds)
- --color-primary: #1B6B4A (green accent for "Recent Updates" card, green button outlines)
- --color-primary-light: #E8F5EE (green-tinted card background)
- --color-surface: #FFFFFF (white cards)
- --color-surface-secondary: #F8F9FA (page background)
- --color-on-surface: #1A1A2E (dark text, dark stat numbers)
- --color-on-surface-secondary: #6B7280 (secondary text)
- --color-border: #E5E7EB (card borders, dividers)
- --color-risk-high: #DC2626 (warning icon color)
- --color-risk-high-bg: #FEF2F2 (high risk card bg)
- --spacing-xs/sm/md/lg/xl/2xl
- --radius-sm/md/lg/xl/full
- --shadow-sm/md/lg

From store/ui.ts:
```typescript
export const useUIStore: () => {
  isAuthenticated: boolean;
  setAuthenticated: (v: boolean) => void;
  // ... other fields
}
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create dashboard layout shell</name>
  <files>app/dashboard/layout.tsx</files>
  <action>
Create app/dashboard/layout.tsx as a client component that provides the iPhone 16 Pro container shell for the dashboard route. This layout is OUTSIDE the (auth) group.

Structure:
- Outer wrapper: min-h-dvh, w-full, flex items-center justify-center, background: var(--color-surface-secondary)
- Inner container: w-full, max-w-[393px], min-h-dvh, relative, flex flex-col, background: var(--color-surface-secondary)
- Children rendered inside the inner container

This mirrors the (auth) layout pattern but uses surface-secondary background instead of the radial gradient, appropriate for the app's main chrome.

Do NOT include any navigation or chrome here -- all screen content including the bottom nav lives in page.tsx so it can manage scroll and sticky positioning together.
  </action>
  <verify>
    <automated>cd "D:/UX projects/MomCare frontend" && npx next lint --file app/dashboard/layout.tsx 2>&1 | head -20</automated>
  </verify>
  <done>app/dashboard/layout.tsx exists, exports default layout component, provides 393px max-width container with surface-secondary background</done>
</task>

<task type="auto">
  <name>Task 2: Build full Home screen page with all wireframe sections</name>
  <files>app/dashboard/page.tsx</files>
  <action>
Create app/dashboard/page.tsx as a 'use client' component. Use ONLY design token CSS variables from globals.css -- no hardcoded hex values. Use lucide-react for all icons. Import from 'lucide-react': Bell, Globe, AlertTriangle, Home, Users, Building2, FileText, UserCircle, Plus, Stethoscope, Syringe, ChevronRight.

All data is inline mock -- define at top of file:

```typescript
const STATS = [
  { label: "Today's Clinics", value: 3, color: 'var(--color-on-surface)', bg: 'var(--color-surface)' },
  { label: 'High Risk Mothers', value: 5, color: 'var(--color-brand-pink)', bg: '#FFF0F3' },
  { label: 'Upcoming Appts', value: 12, color: 'var(--color-on-surface)', bg: 'var(--color-surface)' },
  { label: 'Recent Updates', value: 4, color: 'var(--color-primary)', bg: 'var(--color-primary-light)' },
]

const TODAYS_CLINICS = [
  { name: 'Clinic A', time: '8:30 AM', badge: 'Upcoming', badgeType: 'pink' as const },
  { name: 'Clinic B', time: '11:00 AM', badge: 'Scheduled', badgeType: 'green' as const },
]

const HIGH_RISK_MOTHERS = [
  { name: 'Nadeesha Silva', condition: 'High Blood Pressure', midwife: 'Midwife: Malani' },
  { name: 'Kavitha Perera', condition: 'Gestational Diabetes', midwife: 'Midwife: Nirmala' },
]

const UPCOMING_APPOINTMENTS = [
  { name: 'Samanthi Perera', clinic: 'Clinic A', time: '9:15 AM' },
  { name: 'Kavitha Silva', clinic: 'Clinic B', time: '10:00 AM' },
]

const NAV_ITEMS = [
  { icon: Home, label: 'HOME', active: true },
  { icon: Users, label: 'MOTHERS', active: false },
  { icon: Building2, label: 'CLINICS', active: false },
  { icon: FileText, label: 'RECORDS', active: false },
  { icon: UserCircle, label: 'PROFILE', active: false },
]
```

NOTE on the pink-tinted stat card: Use inline style `background: '#FFF0F3'` for the "High Risk Mothers" card -- this is a one-off tint not in the token set (the closest token --color-risk-high-bg is red-tinted, not pink-tinted). This is the ONLY exception to the no-hardcoded-values rule, and it must have a comment explaining why.

Page structure (top to bottom, all using inline styles with CSS variables):

1. **Scrollable area** (flex-1, overflow-y-auto, pb large enough to clear sticky bottom):

   a. **Top App Bar** -- height ~56px, px spacing-md, flex row, items-center, justify-between:
      - Left: "MOH Clinic" text, font-family serif, font-bold, text ~18px, color var(--color-brand-pink-dark)
      - Right: flex row, gap spacing-sm, items-center:
        - Bell icon (size 22, color var(--color-brand-pink), strokeWidth 1.5)
        - Pink circle avatar (32x32, rounded-full, bg var(--color-brand-pink), centered text "RP" in white, font-size 12px, font-semibold)

   b. **Language Row** -- flex justify-end, px spacing-md, py spacing-xs:
      - "EN | " + Globe icon (size 14), color var(--color-on-surface-secondary), font-size 12px

   c. **Stats Grid** -- px spacing-md, grid grid-cols-2, gap spacing-sm:
      - Each card: rounded-xl (var(--radius-xl)), p spacing-md, shadow-sm, background from STATS data
      - Label: text 12px, color var(--color-on-surface-secondary), mb spacing-xs
      - Value: text 28px, font-bold, color from STATS data

   d. **TODAY'S CLINICS section** -- mt spacing-lg, px spacing-md:
      - Section header: uppercase, font-semibold, text 12px, tracking-wide, color var(--color-on-surface-secondary), mb spacing-sm
      - Each clinic row: flex row, items-center, justify-between, py spacing-sm, border-bottom 1px var(--color-border) (except last):
        - Left: "Clinic A . 8:30 AM" -- text 14px, color var(--color-on-surface), dot separator in secondary color
        - Right: badge pill:
          - "Upcoming": bg var(--color-brand-pink), color white, text 11px, px spacing-sm, py 2px, rounded-full
          - "Scheduled": border 1px var(--color-primary), color var(--color-primary), text 11px, px spacing-sm, py 2px, rounded-full, bg transparent

   e. **HIGH RISK MOTHERS section** -- mt spacing-lg, px spacing-md:
      - Section header row: flex justify-between, items-center, mb spacing-sm:
        - Left: uppercase label same style as above
        - Right: "See all" text, color var(--color-brand-pink), text 12px, cursor-pointer
      - Horizontal scroll container: flex row, gap spacing-sm, overflow-x-auto, pb spacing-xs (hide scrollbar with CSS):
        - Each card: min-w-[260px], rounded-xl, p spacing-md, bg var(--color-risk-high-bg):
          - Row 1: AlertTriangle icon (size 16, color var(--color-risk-high)) + name (font-semibold, text 14px, color var(--color-on-surface))
          - Row 2: condition text, text 13px, color var(--color-on-surface-secondary), mt spacing-xs
          - Row 3: midwife text, text 12px, color var(--color-on-surface-secondary), mt spacing-xs

   f. **UPCOMING APPOINTMENTS section** -- mt spacing-lg, px spacing-md:
      - Section header with "See all" link (same pattern as high risk)
      - Each appointment row: flex row, items-center, justify-between, py spacing-sm, border-bottom:
        - Left column: name (text 14px, font-medium, color var(--color-on-surface)) + "Clinic A . 9:15 AM" below (text 12px, color var(--color-on-surface-secondary))
        - Right: ChevronRight icon (size 18, color var(--color-on-surface-secondary))

2. **Sticky Action Row** (sticky bottom, just above nav):
   - Position: sticky, bottom ~64px (nav bar height), w-full, px spacing-md, py spacing-sm, flex row, justify-center, gap spacing-sm, bg var(--color-surface-secondary)
   - Buttons (all rounded-full, text 13px, font-medium, px spacing-md, py spacing-sm, h ~40px, flex items-center gap spacing-xs):
     - "+ Register Mother": bg var(--color-brand-pink), color white, border none. Icon: Plus size 14.
     - "Clinic Visit": bg transparent, border 1.5px var(--color-brand-pink), color var(--color-brand-pink). Icon: Stethoscope size 14.
     - "Add Vaccination": bg transparent, border 1.5px var(--color-primary), color var(--color-primary). Icon: Syringe size 14.

3. **Bottom Navigation Bar** (sticky bottom 0):
   - Position: sticky, bottom 0, w-full, h 64px, bg var(--color-surface), border-top 1px var(--color-border), flex row, justify-around, items-center, px spacing-sm
   - Each nav item: flex flex-col, items-center, gap 2px, cursor-pointer:
     - Icon: size 22
     - Label: text 10px, font-medium
     - Active (HOME): color var(--color-brand-pink), icon filled appearance (use fill="currentColor" prop on Home icon)
     - Inactive: color var(--color-on-surface-secondary)

Add a style tag or className to hide horizontal scrollbar on the high risk mothers section:
```css
.hide-scrollbar::-webkit-scrollbar { display: none; }
.hide-scrollbar { -ms-overflow-style: none; scrollbar-width: none; }
```
Use Tailwind's `[&::-webkit-scrollbar]:hidden` or add the hide-scrollbar class and a small style block.

IMPORTANT: The scrollable area needs enough bottom padding to not be hidden behind the sticky action row + bottom nav. Use pb-[140px] or similar to ensure content clears both sticky elements.

The overall page container should be: flex flex-col, h-dvh (fills the layout container height), overflow hidden. The scrollable area is flex-1 overflow-y-auto.
  </action>
  <verify>
    <automated>cd "D:/UX projects/MomCare frontend" && npx next lint --file app/dashboard/page.tsx 2>&1 | head -20 && npx next build 2>&1 | tail -20</automated>
  </verify>
  <done>
- /dashboard renders all 9 wireframe sections with correct visual hierarchy
- Stats grid shows 2x2 cards with correct colors (pink for high risk, green for recent updates, white for others)
- Today's Clinics shows 2 items with Upcoming (pink filled) and Scheduled (green outlined) badges
- High Risk Mothers shows 2 horizontal scrollable cards with warning icons
- Upcoming Appointments shows 2 rows with chevron arrows
- Action row with 3 styled pill buttons is sticky above bottom nav
- Bottom nav shows 5 tabs with HOME highlighted in pink
- Page scrolls vertically; action row and bottom nav remain fixed at bottom
- All colors use CSS variables from globals.css (one documented exception for pink tint)
  </done>
</task>

</tasks>

<verification>
1. Run `npx next build` -- no build errors
2. Run `npx next dev` and navigate to /dashboard -- all sections visible
3. Login flow: /login -> submit -> redirects to /dashboard (existing behavior)
4. Visual check: stats grid 2x2, clinic list, high risk cards scroll horizontally, appointments list, sticky action row, bottom nav
</verification>

<success_criteria>
- /dashboard route exists and renders without errors
- All 9 wireframe sections are present and visually match the wireframe description
- Login redirect from /login lands on /dashboard (already wired)
- Only design tokens from globals.css used (one documented exception)
- Page scrolls with sticky bottom elements
</success_criteria>

<output>
After completion, create `.planning/quick/260318-ulk-build-home-screen-matching-wireframe-wit/260318-ulk-SUMMARY.md`
</output>
