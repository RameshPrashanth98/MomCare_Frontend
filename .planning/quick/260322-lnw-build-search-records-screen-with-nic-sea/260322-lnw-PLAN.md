---
phase: quick
plan: 260322-lnw
type: execute
wave: 1
depends_on: []
files_modified:
  - app/dashboard/records/page.tsx
  - app/dashboard/page.tsx
  - app/dashboard/mothers/page.tsx
  - app/dashboard/clinics/page.tsx
  - app/dashboard/clinics/add/page.tsx
  - app/dashboard/clinics/[id]/page.tsx
  - app/dashboard/mothers/register/page.tsx
  - app/dashboard/mothers/[id]/page.tsx
  - app/dashboard/mothers/[id]/medical-history/page.tsx
  - app/dashboard/profile/page.tsx
autonomous: true
requirements: []
must_haves:
  truths:
    - "User can navigate to /dashboard/records via bottom nav from any screen"
    - "User can see a scrollable list of pregnant mother record cards"
    - "User can search mothers by NIC number and see results filter in real-time"
    - "Each record card shows avatar initials, name, risk badge, NIC, clinic no, trimester, midwife, and 4 action buttons"
  artifacts:
    - path: "app/dashboard/records/page.tsx"
      provides: "Search Records screen with NIC search and mother record cards"
      min_lines: 120
  key_links:
    - from: "app/dashboard/*/page.tsx"
      to: "/dashboard/records"
      via: "NAV_ITEMS RECORDS href"
      pattern: "RECORDS.*href.*records"
---

<objective>
Build the Search Records screen at /dashboard/records showing a "Pregnant Mothers List" with record cards. Each card displays avatar, name, risk badge, NIC, clinic no, trimester, assigned midwife, and 4 action buttons (Vaccination, Health Tracking, Lab Reports, Timeline). The screen includes NIC search filtering and the standard bottom navigation. Also update ALL existing screens' bottom nav to wire the RECORDS item to /dashboard/records.

Purpose: Enable healthcare staff to search and browse mother records by NIC number from a dedicated records screen.
Output: New records page + updated bottom nav across all dashboard screens.
</objective>

<execution_context>
@.claude/get-shit-done/workflows/execute-plan.md
@.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@app/dashboard/mothers/page.tsx (reference for card layout, bottom nav pattern, helpers, design tokens usage)
@lib/mock/db.ts (data source — db.mothers with 75 mothers)
@lib/types/entities.ts (Mother interface — name, nationalId, riskLevel, lmpDate, assignedStaffId, assignedClinicId)
@app/globals.css (design tokens)

<interfaces>
From lib/types/entities.ts:
```typescript
export interface Mother {
  id: string
  name: string
  nationalId: string
  riskLevel: RiskLevel // 'high' | 'medium' | 'low'
  lmpDate: string
  assignedStaffId: string
  assignedClinicId: string // clinic name string directly
  // ... other fields
}
```

From lib/mock/db.ts:
```typescript
import { db } from '@/lib/mock/db'
// db.mothers: Mother[] (75 items)
// db.staff: Staff[] (10 items)
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create Search Records page with NIC search and record cards</name>
  <files>app/dashboard/records/page.tsx</files>
  <action>
Create `app/dashboard/records/page.tsx` as a 'use client' component. Follow the exact patterns from `app/dashboard/mothers/page.tsx` for styling, design tokens, and bottom nav structure.

**Header** (same pattern as Mothers page):
- Back arrow (ArrowLeft) linking to /dashboard
- Title: "Search Records"
- Right side: EN badge + language icon (Globe, size 18) + profile avatar circle ("M", pink background)

**Search bar** (below header, same style as Mothers page search):
- Placeholder: "Search by NIC"
- Search icon on left
- Filter `db.mothers` by `mother.nationalId` containing the search query (case-insensitive) as user types
- Use `useState` for search query and `useMemo` for filtered results

**Section label**: "Pregnant Mothers List" (same uppercase style as Mothers page "Mother List")

**Record cards** (scrollable list, one card per mother):
Each card uses the same container styles as Mothers page cards (white surface, border, radius-xl, shadow-sm, spacing-md padding).

Card layout:
- **Row 1**: Avatar circle (44px, initials, rotating AVATAR_COLORS) + Name column + Risk badge
  - Name: bold 14px, mother.name
  - Risk badge: "High Risk" with red bg/color for riskLevel==='high', "Normal" with green bg/color for medium/low
  - Use the same getRiskBadgeStyles helper but adjust labels: high -> "High Risk", medium/low -> "Normal"
- **Row 2**: Info grid with 3 items, each as label:value pairs in secondary color 12-13px:
  - "NIC: {mother.nationalId}"
  - "Clinic No: {mother.assignedClinicId}"
  - "Trimester: {getTrimesterLabel(trimester)}"
- **Row 3**: "Assigned Midwife: {midwifeName}" in secondary color 13px (use getAssignedMidwifeName helper from staff lookup)
- **Row 4**: 4 action buttons in a flex row with gap spacing-sm, all outlined style (transparent bg, border, rounded-full, 12px font):
  - Vaccination (Syringe icon)
  - Health Tracking (Activity icon)
  - Lab Reports (FileText icon)
  - Timeline (Clock icon)
  - All buttons are non-functional placeholders (no onClick handler needed)

**Bottom navigation**: Standard NAV_ITEMS array with RECORDS active (active: true), all others inactive. RECORDS href set to '/dashboard/records'. Use the exact same bottom nav rendering pattern from Mothers page.

Copy these helpers directly from mothers/page.tsx into the records page (keep them local, do not extract to shared module):
- getInitials, getTrimester, getTrimesterLabel, getRiskBadgeStyles, getAssignedMidwifeName
- AVATAR_COLORS array

Import from lucide-react: ArrowLeft, Search, Home, Users, Building2, FileText, UserCircle, Syringe, Activity, Clock, Globe

Import: `db` from '@/lib/mock/db', Link from 'next/link'
  </action>
  <verify>
    <automated>cd "D:/UX projects/MomCare frontend" && npx next build 2>&1 | tail -20</automated>
  </verify>
  <done>Search Records page renders at /dashboard/records with header, NIC search bar filtering mothers in real-time, scrollable list of record cards with avatar/name/risk badge/NIC/clinic/trimester/midwife/4 action buttons, and active bottom nav on RECORDS</done>
</task>

<task type="auto">
  <name>Task 2: Wire RECORDS bottom nav link across all dashboard screens</name>
  <files>
    app/dashboard/page.tsx
    app/dashboard/mothers/page.tsx
    app/dashboard/clinics/page.tsx
    app/dashboard/clinics/add/page.tsx
    app/dashboard/clinics/[id]/page.tsx
    app/dashboard/mothers/register/page.tsx
    app/dashboard/mothers/[id]/page.tsx
    app/dashboard/mothers/[id]/medical-history/page.tsx
    app/dashboard/profile/page.tsx
  </files>
  <action>
In each of the 9 files listed, find the NAV_ITEMS array and update the RECORDS entry from:
```
{ icon: FileText, label: 'RECORDS', href: null, active: false }
```
to:
```
{ icon: FileText, label: 'RECORDS', href: '/dashboard/records', active: false }
```

This is a single-line change per file: replace `href: null` with `href: '/dashboard/records'` on the RECORDS nav item.

Note: In `app/dashboard/mothers/register/page.tsx`, also check if CLINICS has `href: null` — if so, update it to `href: '/dashboard/clinics'` as well (it was noticed during review).
  </action>
  <verify>
    <automated>cd "D:/UX projects/MomCare frontend" && grep -rn "RECORDS.*href.*null" app/dashboard/ | wc -l | xargs -I{} test {} -eq 0 && echo "PASS: No null RECORDS hrefs remain" || echo "FAIL: Some RECORDS hrefs still null"</automated>
  </verify>
  <done>All 9 dashboard screens' bottom nav RECORDS item links to /dashboard/records. No remaining href: null for RECORDS anywhere in app/dashboard/.</done>
</task>

</tasks>

<verification>
1. `npx next build` succeeds with no errors
2. `grep -rn "RECORDS.*href.*null" app/dashboard/` returns zero matches
3. Navigate to /dashboard/records — page renders with search bar and mother cards
4. Type a NIC number in search — list filters in real-time
5. Bottom nav RECORDS tab is active (pink) on this screen
6. Navigate from any other dashboard screen — RECORDS in bottom nav is clickable and goes to /dashboard/records
</verification>

<success_criteria>
- Search Records page exists at /dashboard/records with all specified UI elements
- NIC search filters the mother list in real-time
- Each record card shows: avatar initials, mother name, risk badge (High Risk red / Normal green), NIC, Clinic No, Trimester, Assigned Midwife, and 4 action buttons
- Bottom nav RECORDS item is wired to /dashboard/records across ALL dashboard screens
- Build passes with no TypeScript or Next.js errors
</success_criteria>

<output>
After completion, create `.planning/quick/260322-lnw-build-search-records-screen-with-nic-sea/260322-lnw-SUMMARY.md`
</output>
