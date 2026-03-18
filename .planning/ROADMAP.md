# Roadmap: MomCare Frontend

## Overview

MomCare is built in six phases that move from infrastructure to screens in strict dependency order. Phase 1 locks in the design system token bridge, mock data layer, testing infrastructure, and state ownership model before any UI exists — this prevents five critical pitfalls from cascading across all 15 screens. Phase 2 delivers the authentication shell and onboarding flow, establishing the three route groups that every subsequent screen lives inside. Phases 3 through 6 build screens in clinical dependency order: core mother record first (the app's primary entity), then clinical data entry, then scheduling, then supporting screens. Every screen phase is gated on wireframe delivery from the user before implementation begins.

## Phases

**Phase Numbering:**
- Integer phases (1, 2, 3): Planned milestone work
- Decimal phases (2.1, 2.2): Urgent insertions (marked with INSERTED)

Decimal phases appear between their surrounding integers in numeric order.

- [ ] **Phase 1: Foundation** - Scaffold the project, bridge design tokens, configure mock data layer, testing infrastructure, and CI lint rules — no screens, only infrastructure
- [ ] **Phase 2: Auth & Onboarding** - Login screen, cookie-based session, onboarding flow, and the three route group shells that all subsequent screens live inside
- [ ] **Phase 3: Dashboard, Mothers & Search** - Dashboard home screen, mothers list with filters, mother profile, mother registration, and global search
- [ ] **Phase 4: Clinical Data Entry** - Visit registration form, vaccination records, and weight & health tracking screens
- [ ] **Phase 5: Clinic Scheduling** - Clinic schedule list, session detail view, and add clinic session form
- [ ] **Phase 6: Supporting Screens** - Medical history, pregnancy timeline, notifications feed, and user profile

## Phase Details

### Phase 1: Foundation
**Goal**: Every cross-cutting infrastructure concern is solved before the first screen is built — design token enforcement, mock data contract, state ownership boundaries, accessibility CI, and route group shells
**Depends on**: Nothing (first phase)
**Requirements**: FOUND-01, FOUND-02, FOUND-03, FOUND-04, FOUND-05, FOUND-06, FOUND-07, FOUND-08, FOUND-09, QUAL-01, QUAL-02, QUAL-03, QUAL-04, QUAL-05, QUAL-06, QUAL-07, QUAL-08
**Success Criteria** (what must be TRUE):
  1. Running `npm run dev` serves the app with no errors and the design system tokens (colors, spacing, radius, shadow) are visible as CSS custom properties in DevTools — no raw hex or px values appear in component styles
  2. A lint or CI check blocks any `[...]` Tailwind arbitrary value from being committed — a test arbitrary class on a component causes the check to fail
  3. Calling any `lib/api/` function (e.g., `getMothers()`) returns typed mock data seeded with realistic entities; the same call signature works unchanged when the mock handler is swapped for a real fetch
  4. axe-core runs in CI against a Storybook smoke-story and reports zero violations
  5. The three route groups (`(onboarding)`, `(auth)`, `(app)`) exist with isolated layout shells; navigating to an `(app)` route while unauthenticated redirects to `/login`
**Plans**: 3 plans

Plans:
- [ ] 01-01: Project scaffold, design token bridge, and Tailwind config
- [ ] 01-02: Mock data layer, TanStack Query client, and Zustand store slices
- [ ] 01-03: Testing infrastructure (Vitest, Testing Library, axe-core, Storybook + MSW), CI lint rule for arbitrary values, and route group shells

### Phase 2: Auth & Onboarding
**Goal**: Staff members can log in, maintain sessions across refreshes, and new users can complete or skip the onboarding flow — wireframes required before implementation begins
**Depends on**: Phase 1
**Requirements**: AUTH-01, AUTH-02, AUTH-03, AUTH-04, AUTH-05, AUTH-06, AUTH-07
**Success Criteria** (what must be TRUE):
  1. Staff member can log in with username and password; the login screen shows the facility name and specific error messages (e.g., "Incorrect password") on failure — not a generic error
  2. After logging in and refreshing the browser, the staff member is still authenticated and lands on the dashboard — session is cookie-based, not localStorage
  3. Staff member can log out from the navigation on any screen and is immediately redirected to login
  4. A first-time user sees the onboarding flow (3-5 screens) with a visible skip option on screen 1 and a progress indicator; completing or skipping lands on the dashboard
**Plans**: 3 plans

Plans:
- [ ] 02-01: Login screen and mock authentication with Zustand session slice (wireframes required)
- [ ] 02-02: Onboarding flow screens with skip and progress indicator (wireframes required)

### Phase 3: Dashboard, Mothers & Search
**Goal**: Staff members can see the clinical summary at a glance, find any mother by browsing or searching, view a mother's full profile, and register new mothers — wireframes required before implementation begins
**Depends on**: Phase 2
**Requirements**: DASH-01, DASH-02, DASH-03, DASH-04, MOTH-01, MOTH-02, MOTH-03, MOTH-04, MOTH-05, MOTH-06, MOTH-07, MOTH-08, MOTH-09, MOTH-10, MOTH-11, MOTH-12, MOTH-13, MOTH-14, MOTH-15, MOTH-16
**Success Criteria** (what must be TRUE):
  1. Dashboard home screen shows count cards (total mothers, high-risk, overdue follow-ups, today's sessions); overdue follow-ups appear above the fold; each card or quick action navigates to the relevant screen
  2. Mothers list shows all registered mothers sorted by last visit date ascending with risk badges, gestational age as weeks+days, and filter chips (All / High Risk / Overdue / My Patients); each filter state has a specific empty state message
  3. Staff member can search by name, ID, phone, and community; recent searches appear when the field is focused and empty; no-result state shows "Register as new mother" CTA; matched substrings are highlighted in results
  4. Mother profile shows full header (name, age, risk badge, gestational age as weeks+days, EDD), tabbed content sections (Overview, Visits, Vaccinations, Weight, Timeline), sticky quick-action bar (Log Visit, Add Note, Assign), and visit history in reverse-chronological order
  5. Staff member can register a new mother by entering name, contact, date of birth, LMP/EDD, risk level, assigned clinic and midwife; the record appears in the mothers list immediately
**Plans**: 3 plans

Plans:
- [ ] 03-01: Dashboard home screen (wireframes required)
- [ ] 03-02: Mothers list, filter chips, and search screen (wireframes required)
- [ ] 03-03: Mother profile, mother registration form, and profile tab shell (wireframes required)

### Phase 4: Clinical Data Entry
**Goal**: Staff members can register clinic visits with structured clinical findings and validation, view and log vaccination records, and view and log weight and health measurements — wireframes required before implementation begins
**Depends on**: Phase 3
**Requirements**: VISIT-01, VISIT-02, VISIT-03, VISIT-04, VACC-01, VACC-02, VACC-03, VACC-04, WGHT-01, WGHT-02, WGHT-03, WGHT-04, WGHT-05
**Success Criteria** (what must be TRUE):
  1. Visit registration form pre-fills the mother context when opened from a profile or session; captures BP, weight, fundal height, fetal heart rate, and presenting complaints; flags impossible values with clinically meaningful error messages; allows override with a recorded reason; "Save and log another" shortcut works
  2. Vaccination records table shows each vaccine with color-coded status (given/due/overdue/not yet applicable); staff member can log a vaccination with date, vaccine name, dose, and administering clinician; deviations from schedule can be recorded with a reason
  3. Weight chart displays actual weight plotted against gestational age with IOM recommended gain range bands overlaid; x-axis is horizontally scrollable on mobile; data table below chart shows date, weight, BP, and fundal height
  4. Staff member can log a new weight/health measurement from the weight screen; the new data point appears immediately on the chart and in the table
**Plans**: 3 plans

Plans:
- [ ] 04-01: Visit registration form as modal sheet with clinical field validation (wireframes required)
- [ ] 04-02: Vaccination records screen and log vaccination form (wireframes required)
- [ ] 04-03: Weight and health tracking screen with Recharts chart and log measurement form (wireframes required)

### Phase 5: Clinic Scheduling
**Goal**: Staff members can view the clinic schedule, inspect session details with the attendee roster, and create new sessions — wireframes required before implementation begins
**Depends on**: Phase 3
**Requirements**: SCHED-01, SCHED-02, SCHED-03, SCHED-04, SCHED-05, SCHED-06
**Success Criteria** (what must be TRUE):
  1. Clinic schedule shows sessions in day/list view (mobile default) and calendar view; each row shows date, time, session name, confirmed attendee count and capacity, and status; staff member can navigate to a specific date and jump back to today
  2. Staff member can tap a session row to view session detail: session metadata, attendee roster with each mother's risk badge and last-visit date, per-attendee status (Registered / Attended / Did Not Attend / Rescheduled), and session notes
  3. Staff member can add a new clinic session with name/type, date, start/end time, location, lead clinician, and capacity; date is entered via a touch-friendly date picker (no text input for dates on mobile); the new session appears on the schedule immediately
**Plans**: 3 plans

Plans:
- [ ] 05-01: Clinic schedule list and calendar view (wireframes required)
- [ ] 05-02: Session detail screen and add session form as modal sheet (wireframes required)

### Phase 6: Supporting Screens
**Goal**: Staff members can view and edit a mother's medical history and pregnancy timeline, receive and act on clinical notifications, and manage their own profile — wireframes required before implementation begins
**Depends on**: Phase 4
**Requirements**: MED-01, MED-02, MED-03, MED-04, TIME-01, TIME-02, TIME-03, TIME-04, TIME-05, NOTIF-01, NOTIF-02, NOTIF-03, NOTIF-04, NOTIF-05, UPROF-01, UPROF-02, UPROF-03
**Success Criteria** (what must be TRUE):
  1. Medical history screen shows structured sections (obstetric history, conditions, allergies, medications, surgical history); previous pregnancies list shows outcome, complications, and year; empty sections explicitly state "No known [x]" — blank sections do not appear; staff member can add and edit records within each section
  2. Pregnancy timeline is a scrollable vertical timeline with WHO ANC contact point markers (8 contacts), a "you are here" indicator at current gestational age, completed visits and vaccinations plotted as color-coded events (blue/green/red), and upcoming recommended contacts shown as future markers
  3. Notification bell in navigation shows unread count badge; notification feed groups alerts by type (clinical, scheduling, system); tapping a notification navigates directly to the relevant record (mother profile or session) — not a notification detail page; staff member can mark individual or all notifications as read
  4. Staff member can view their profile (name, role, facility, last login), edit display name, contact number, and notification preferences, and log out from the profile screen
**Plans**: 3 plans

Plans:
- [ ] 06-01: Medical history screen with add/edit per section (wireframes required)
- [ ] 06-02: Pregnancy timeline screen (wireframes required)
- [ ] 06-03: Notifications feed and user profile screen (wireframes required)

## Progress

**Execution Order:**
Phases execute in numeric order: 1 → 2 → 3 → 4 → 5 → 6

| Phase | Plans Complete | Status | Completed |
|-------|----------------|--------|-----------|
| 1. Foundation | 0/3 | Not started | - |
| 2. Auth & Onboarding | 0/2 | Not started | - |
| 3. Dashboard, Mothers & Search | 0/3 | Not started | - |
| 4. Clinical Data Entry | 0/3 | Not started | - |
| 5. Clinic Scheduling | 0/2 | Not started | - |
| 6. Supporting Screens | 0/3 | Not started | - |
