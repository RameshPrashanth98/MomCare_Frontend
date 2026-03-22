---
phase: quick
plan: 260319-kip
type: execute
wave: 1
depends_on: []
files_modified:
  - app/dashboard/mothers/page.tsx
  - app/dashboard/page.tsx
autonomous: false
requirements: [MOTH-screen]

must_haves:
  truths:
    - "User can navigate to Mothers screen from bottom nav MOTHERS icon"
    - "User sees a scrollable list of mother cards with name, age, risk badge, gestational age, community, phone, last visit"
    - "User can search by name (case-insensitive) or NIC (contains match) and list filters reactively"
    - "User can filter by Area, Trimester, Risk Level using dropdown chips — filters combine with AND logic"
    - "User can clear all active filters"
    - "Back button navigates to dashboard"
  artifacts:
    - path: "app/dashboard/mothers/page.tsx"
      provides: "Mothers list screen with search, filters, cards, bottom nav"
      min_lines: 150
    - path: "app/dashboard/page.tsx"
      provides: "Updated dashboard with MOTHERS nav linking to /dashboard/mothers"
  key_links:
    - from: "app/dashboard/mothers/page.tsx"
      to: "lib/mock/db"
      via: "direct import of db.mothers"
      pattern: "import.*db.*from.*lib/mock/db"
    - from: "app/dashboard/page.tsx"
      to: "/dashboard/mothers"
      via: "Link on MOTHERS nav item"
      pattern: "href.*dashboard/mothers"
---

<objective>
Build the Mothers screen at /dashboard/mothers with working search bar (name/NIC), working filter chips (Area, Trimester, Risk Level), mother cards showing key info, and bottom nav with MOTHERS active. Also update dashboard bottom nav to link to the mothers page.

Purpose: Core navigation screen for healthcare staff to find and browse mothers.
Output: Fully functional Mothers list screen with client-side filtering of 75 mock mothers.
</objective>

<execution_context>
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@lib/types/entities.ts (Mother interface — id, name, dateOfBirth, phone, community, nationalId, riskLevel, lmpDate, edd, lastVisitDate)
@lib/mock/db.ts (db.mothers — 75 Mother objects, sorted by lastVisitDate ascending)
@lib/mock/factories/mother.factory.ts (COMMUNITIES list for Area filter options)
@app/globals.css (design tokens — colors, spacing, radius, shadows)
@app/dashboard/page.tsx (dashboard with bottom nav pattern — NAV_ITEMS, layout structure)
@app/dashboard/notifications/page.tsx (header pattern — back arrow, title, filter icon, EN badge, avatar)

<interfaces>
<!-- From lib/types/entities.ts -->
```typescript
export type RiskLevel = 'high' | 'medium' | 'low'

export interface Mother {
  id: string
  name: string
  dateOfBirth: string   // ISO date
  phone: string
  community: string
  nationalId: string
  riskLevel: RiskLevel
  lmpDate: string       // ISO date
  edd: string           // ISO date
  assignedStaffId: string
  assignedClinicId: string
  createdAt: string
  lastVisitDate: string | null
}
```

<!-- From lib/mock/db.ts -->
```typescript
export const db = {
  mothers: Mother[],  // 75 items
  // ...other collections
}
```

<!-- COMMUNITIES from mother.factory.ts (for Area filter dropdown) -->
```typescript
const COMMUNITIES = [
  'Nakuru Town', 'Naivasha', 'Gilgil', 'Molo', 'Njoro',
  'Rongai', 'Subukia', 'Bahati', 'Laikipia East',
  'Laikipia North', 'Laikipia West', 'Kuresoi North', 'Kuresoi South',
]
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Build Mothers screen with search, filters, and mother cards</name>
  <files>app/dashboard/mothers/page.tsx</files>
  <action>
Create `app/dashboard/mothers/page.tsx` as a `'use client'` page component. Import `db` from `@/lib/mock/db`, `Mother` and `RiskLevel` from `@/lib/types/entities`. Import lucide-react icons: `ArrowLeft`, `Search`, `SlidersHorizontal`, `ChevronDown`, `X`, `Home`, `Users`, `Building2`, `FileText`, `UserCircle`. Import `Link` from `next/link`.

**State management (useState):**
- `searchQuery: string` (default '')
- `areaFilter: string` (default '' = all)
- `trimesterFilter: string` (default '' = all)
- `riskFilter: string` (default '' = all)

**Helper functions:**
1. `getGestationalAge(lmpDate: string): { weeks: number; days: number }` — Calculate from lmpDate to today. `const diffMs = Date.now() - new Date(lmpDate).getTime(); const totalDays = Math.floor(diffMs / 86400000); return { weeks: Math.floor(totalDays / 7), days: totalDays % 7 };`
2. `getAge(dateOfBirth: string): number` — Calculate years from DOB to today.
3. `getTrimester(lmpDate: string): 1 | 2 | 3` — 0-13 weeks = 1, 14-27 weeks = 2, 28+ weeks = 3.
4. `getRiskBadgeStyles(risk: RiskLevel)` — Returns `{ bg, color, label }`:
   - high: `{ bg: 'var(--color-risk-high-bg)', color: 'var(--color-risk-high)', label: 'High Risk' }`
   - medium: `{ bg: 'var(--color-risk-medium-bg)', color: 'var(--color-risk-medium)', label: 'Medium' }`
   - low: `{ bg: 'var(--color-risk-low-bg)', color: 'var(--color-risk-low)', label: 'Low Risk' }`

**COMMUNITIES constant** (duplicate from factory since factory file is for seeding only):
`['Nakuru Town', 'Naivasha', 'Gilgil', 'Molo', 'Njoro', 'Rongai', 'Subukia', 'Bahati', 'Laikipia East', 'Laikipia North', 'Laikipia West', 'Kuresoi North', 'Kuresoi South']`

**Filtering logic (useMemo):**
```
const filteredMothers = useMemo(() => {
  return db.mothers.filter((m) => {
    // Search: match name (case-insensitive) or nationalId (contains)
    if (searchQuery) {
      const q = searchQuery.toLowerCase()
      const nameMatch = m.name.toLowerCase().includes(q)
      const nicMatch = m.nationalId.includes(searchQuery)
      if (!nameMatch && !nicMatch) return false
    }
    // Area filter
    if (areaFilter && m.community !== areaFilter) return false
    // Trimester filter
    if (trimesterFilter && getTrimester(m.lmpDate) !== Number(trimesterFilter)) return false
    // Risk filter
    if (riskFilter && m.riskLevel !== riskFilter) return false
    return true
  })
}, [searchQuery, areaFilter, trimesterFilter, riskFilter])
```

**Compute `hasActiveFilters`:** `areaFilter || trimesterFilter || riskFilter`

**Layout (follow notifications page pattern, iPhone 16 Pro 393x852):**

1. **Outer container:** `flex flex-col h-dvh overflow-hidden`

2. **Header (56px, flex-shrink-0):** Same pattern as notifications page.
   - Left: `<Link href="/dashboard">` with `<ArrowLeft size={22} strokeWidth={1.5} />`
   - Center: "Mothers" (18px, bold)
   - Right: `<SlidersHorizontal size={20} />`, "EN" text, pink avatar circle "M"
   - Bottom border: `1px solid var(--color-border)`

3. **Scrollable content area:** `flex-1 overflow-y-auto`

   3a. **Search bar:** Full-width input container with search icon. Container: margin `var(--spacing-md)` horizontal, `var(--spacing-sm)` top. Style: `background: var(--color-surface-secondary)`, `borderRadius: var(--radius-xl)`, `border: 1px solid var(--color-border)`, height 44px, padding-left 40px (space for icon), padding-right `var(--spacing-md)`. Search icon (Search, size 18) absolutely positioned left 12px, color `var(--color-on-surface-secondary)`. Input: full width, transparent bg, no border, no outline, fontSize 14px, color `var(--color-on-surface)`, placeholder "Search by name or NIC..." in `var(--color-on-surface-secondary)`.

   3b. **Filter chips row:** Horizontal scrollable row (same scrollbar-hidden pattern as notifications). Gap `var(--spacing-sm)`, padding horizontal `var(--spacing-md)`, marginTop `var(--spacing-sm)`.

   Each filter chip is a `<select>` styled as a chip:
   - **Area:** Options = "" (label "Area") + COMMUNITIES. When active (value !== ''): bg `var(--color-primary)`, color white. When inactive: bg transparent, border `1px solid var(--color-border)`, color `var(--color-on-surface-secondary)`.
   - **Trimester:** Options = "" (label "Trimester"), "1" (1st Trimester), "2" (2nd Trimester), "3" (3rd Trimester). Same active/inactive styling.
   - **Risk Level:** Options = "" (label "Risk Level"), "high" (High), "medium" (Medium), "low" (Low). Same active/inactive styling.

   Style each select: `appearance: none`, fontSize 13px, fontWeight 500, paddingLeft `var(--spacing-md)`, paddingRight `var(--spacing-lg)` (room for dropdown arrow), paddingTop `var(--spacing-xs)`, paddingBottom `var(--spacing-xs)`, borderRadius `var(--radius-full)`, cursor pointer, whiteSpace nowrap. Use `backgroundImage` with an inline SVG chevron-down for the dropdown indicator.

   If `hasActiveFilters`, show a "Clear" chip at the end: bg transparent, color `var(--color-risk-high)`, border `1px solid var(--color-risk-high)`, onClick resets all three filter states to ''.

   3c. **Results count:** Below filters, marginTop `var(--spacing-sm)`, padding horizontal `var(--spacing-md)`. Text: `${filteredMothers.length} mothers`, fontSize 12px, color `var(--color-on-surface-secondary)`.

   3d. **Mother cards list:** paddingBottom `var(--spacing-lg)` for scroll clearance above bottom nav. Each card:
   - Container: marginLeft/Right `var(--spacing-md)`, marginBottom `var(--spacing-sm)`, padding `var(--spacing-md)`, bg `var(--color-surface)`, borderRadius `var(--radius-xl)`, border `1px solid var(--color-border)`, boxShadow `var(--shadow-sm)`.
   - **Row 1:** flex justify-between items-start.
     - Left: Name (14px, fontWeight 600, color on-surface) + Age below (12px, on-surface-secondary, e.g. "28 years old").
     - Right: Risk badge pill — paddingLeft/Right `var(--spacing-sm)`, paddingTop/Bottom 2px, borderRadius `var(--radius-full)`, fontSize 11px, fontWeight 500, bg and color from `getRiskBadgeStyles`.
   - **Row 2:** Gestational age — "24w 3d" (14px, fontWeight 600, color on-surface) + "· Trimester 2" (13px, on-surface-secondary). marginTop `var(--spacing-xs)`.
   - **Row 3:** Community + Phone on same line, separated by " | ". fontSize 12px, color on-surface-secondary. marginTop `var(--spacing-xs)`.
   - **Row 4:** Last visit — "Last visit: 15 Jan 2026" or "No visits yet". fontSize 12px, color on-surface-secondary. marginTop `var(--spacing-xs)`.
   - Format dates using `new Date(dateStr).toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })`.

4. **Bottom Navigation Bar (64px, flex-shrink-0):** Same pattern as dashboard page.
   - NAV_ITEMS array: HOME (Home icon, href /dashboard), MOTHERS (Users icon, active), CLINICS (Building2 icon), RECORDS (FileText icon), PROFILE (UserCircle icon).
   - MOTHERS is active: color `var(--color-brand-pink)`, fill currentColor.
   - Others inactive: color `var(--color-on-surface-secondary)`, fill none.
   - HOME and MOTHERS are Links (href="/dashboard" and href="/dashboard/mothers" respectively). Others remain buttons.
   - Height 64px, bg `var(--color-surface)`, borderTop `1px solid var(--color-border)`.

Use ONLY design system tokens from globals.css. No hardcoded color hex values. All spacing via var(--spacing-*), colors via var(--color-*), radius via var(--radius-*), shadows via var(--shadow-*).
  </action>
  <verify>
    <automated>cd "D:/UX projects/MomCare frontend" && npx next build 2>&1 | tail -20</automated>
  </verify>
  <done>Mothers screen renders at /dashboard/mothers with 75 mother cards. Search filters by name/NIC. Area/Trimester/Risk dropdowns filter list with AND logic. Clear button resets filters. Back button links to dashboard. Bottom nav shows MOTHERS as active.</done>
</task>

<task type="auto">
  <name>Task 2: Update dashboard bottom nav to link to Mothers page</name>
  <files>app/dashboard/page.tsx</files>
  <action>
In `app/dashboard/page.tsx`, update the bottom navigation bar (section 8) so that the MOTHERS nav item is a `Link` to `/dashboard/mothers` instead of a button. Also make HOME a Link to `/dashboard` for consistency.

Specifically:
1. The NAV_ITEMS array already exists. In the `.map()` render, check `item.label`:
   - If `'HOME'` or `'MOTHERS'`: render as `<Link href={item.label === 'HOME' ? '/dashboard' : '/dashboard/mothers'}>` with same flex-col items-center styling.
   - Others remain `<button>` (no destination yet).
2. Keep all existing styling (active color for HOME, inactive for others).
3. `Link` from next/link is already imported.
  </action>
  <verify>
    <automated>cd "D:/UX projects/MomCare frontend" && npx next build 2>&1 | tail -20</automated>
  </verify>
  <done>Dashboard MOTHERS nav item navigates to /dashboard/mothers. HOME nav item navigates to /dashboard. Build succeeds with no errors.</done>
</task>

<task type="checkpoint:human-verify" gate="blocking">
  <what-built>Mothers screen with search bar, filter chips (Area, Trimester, Risk Level), 75 mother cards from mock DB, and bottom nav navigation from dashboard.</what-built>
  <how-to-verify>
    1. Run `npm run dev` and open http://localhost:3000/dashboard
    2. Tap the MOTHERS icon in bottom nav — should navigate to /dashboard/mothers
    3. Verify header shows back arrow, "Mothers" title, filter icon, EN badge, pink avatar
    4. Verify search bar with placeholder "Search by name or NIC..."
    5. Type a name fragment — list should filter reactively
    6. Type a NIC number — list should filter by national ID
    7. Clear search, use Area dropdown — pick a community, list filters
    8. Use Trimester dropdown — pick 2nd Trimester, list filters
    9. Use Risk Level dropdown — pick High, list filters
    10. Verify multiple filters combine (AND logic) — count updates
    11. Tap "Clear" chip — all filters reset, full list shows
    12. Verify each mother card shows: name, age, risk badge (color-coded), gestational age (weeks+days), trimester, community, phone, last visit date
    13. Scroll the list — should scroll smoothly with bottom nav staying fixed
    14. Tap back arrow — should navigate to dashboard
    15. Check on iPhone 16 Pro viewport (393x852) in DevTools — no overflow or layout issues
  </how-to-verify>
  <resume-signal>Type "approved" or describe issues</resume-signal>
</task>

</tasks>

<verification>
- Build succeeds: `npx next build` completes without errors
- Route exists: /dashboard/mothers renders the mothers screen
- Search works: typing name/NIC filters the list
- Filters work: Area, Trimester, Risk Level dropdowns filter with AND logic
- Clear resets all filters
- Navigation: bottom nav MOTHERS links from dashboard, back arrow returns to dashboard
- Design tokens only: no hardcoded hex colors in the new file
</verification>

<success_criteria>
- Mothers screen at /dashboard/mothers with 75 mock mothers displayed in cards
- Working search by name (case-insensitive) and NIC (contains)
- Working filter chips for Area (13 communities), Trimester (1st/2nd/3rd), Risk Level (High/Medium/Low)
- Filters combine with AND logic, Clear button resets all
- Mother cards show name, age, risk badge, gestational age, community, phone, last visit
- Bottom nav with MOTHERS active, HOME and MOTHERS are navigation links
- Back button navigates to /dashboard
- All styling uses design system tokens only
- Fits iPhone 16 Pro (393x852) viewport
</success_criteria>

<output>
After completion, create `.planning/quick/260319-kip-build-mothers-screen-with-search-filters/260319-kip-SUMMARY.md`
</output>
