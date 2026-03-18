# Requirements: MomCare Frontend

**Defined:** 2026-03-18
**Core Value:** Healthcare staff can find any mother's record instantly and take action — register, assess risk, log a visit, or follow up — without friction.

---

## v1 Requirements

### Foundation & Infrastructure

- [ ] **FOUND-01**: Next.js 15 project scaffolded with App Router, TypeScript, Tailwind CSS, ESLint, and Prettier
- [ ] **FOUND-02**: MomCare Design System tokens bridged into Tailwind config via CSS custom properties — zero hardcoded color, spacing, radius, or shadow values in any component
- [ ] **FOUND-03**: Tailwind arbitrary value usage blocked in CI (lint rule or Stylelint check) to prevent token bypass
- [ ] **FOUND-04**: MSW 2.x mock data layer configured with a `lib/api/` abstraction so all mock calls are swappable for a real API without touching component code
- [ ] **FOUND-05**: Realistic mock data seeded for all entities: mothers, visits, vaccinations, weight records, clinic sessions, staff members
- [ ] **FOUND-06**: TanStack Query configured as the sole owner of server/entity state; Zustand stores UI state only (drawers, filters, wizard steps, session)
- [ ] **FOUND-07**: Vitest + React Testing Library + axe-core configured; accessibility audit runs in CI on every component
- [ ] **FOUND-08**: Route groups established: `(onboarding)`, `(auth)`, `(app)` each with isolated layout shells
- [ ] **FOUND-09**: `proxy.ts` auth guard (Next.js 15) protecting all `(app)` routes; unauthenticated users redirected to login

### Authentication & Onboarding

- [ ] **AUTH-01**: Staff member can view onboarding flow (3–5 screens) on first app launch introducing core workflows
- [ ] **AUTH-02**: Onboarding has a skip option visible from screen 1 and a progress indicator throughout
- [ ] **AUTH-03**: Staff member can log in with username and password
- [ ] **AUTH-04**: Login screen displays facility/clinic name for multi-site orientation
- [ ] **AUTH-05**: Staff member session persists across browser refresh (cookie-based, not localStorage)
- [ ] **AUTH-06**: Login shows clear, specific error messages (e.g., "Incorrect password" not "Authentication failed")
- [ ] **AUTH-07**: Staff member can log out from any screen via the user profile or navigation

### Dashboard & Home

- [ ] **DASH-01**: Home screen displays count cards: total registered mothers, high-risk mothers, overdue follow-ups, today's clinic sessions
- [ ] **DASH-02**: Overdue follow-ups are surfaced above the fold as the highest-urgency item
- [ ] **DASH-03**: Home screen provides quick actions: "Register New Mother", "Find Mother", "Today's Clinic" (maximum 3 actions)
- [ ] **DASH-04**: Dashboard navigates directly to the relevant list/screen from each card or quick action

### Notifications

- [ ] **NOTIF-01**: Staff member can view in-app notification feed grouped by type (clinical alerts, scheduling, system)
- [ ] **NOTIF-02**: Notification bell in navigation shows unread count badge
- [ ] **NOTIF-03**: Staff member can mark individual notifications as read and mark all as read
- [ ] **NOTIF-04**: Tapping a notification navigates directly to the relevant record (mother profile, session) — not a notification detail page
- [ ] **NOTIF-05**: Notifications distinguish: overdue follow-up, upcoming appointment, session starting soon, system alert

### Mothers — List & Search

- [ ] **MOTH-01**: Staff member can view paginated/infinite-scroll list of all registered mothers
- [ ] **MOTH-02**: Mothers list default sort is by last visit date ascending (most overdue first)
- [ ] **MOTH-03**: Each list row shows: mother name, risk badge (high/medium/low), gestational age (weeks+days), last visit date, assigned staff initials
- [ ] **MOTH-04**: Mothers list has filter chips: All / High Risk / Overdue / My Patients
- [ ] **MOTH-05**: Each filter state has a specific empty state message (e.g., "No high-risk mothers currently registered")
- [ ] **MOTH-06**: Staff member can search mothers globally by name, ID number, phone number, and community/village
- [ ] **MOTH-07**: Search shows recent searches (last 5) when field is focused and empty
- [ ] **MOTH-08**: Search no-result state shows "Register as new mother" call to action
- [ ] **MOTH-09**: Search results highlight the matched substring in each result row

### Mother Profile

- [ ] **MOTH-10**: Staff member can view a mother's full profile with a persistent header: name, age, risk badge, gestational age, EDD
- [ ] **MOTH-11**: Profile organizes content into sections: Overview, Visits, Vaccinations, Weight, Timeline
- [ ] **MOTH-12**: Profile has a sticky mobile action bar with: "Log Visit", "Add Note", "Assign / Reassign"
- [ ] **MOTH-13**: Profile fields are not inline-editable — an explicit Edit button activates edit mode to prevent accidental changes
- [ ] **MOTH-14**: Assigned staff is displayed with full name (not ID only)
- [ ] **MOTH-15**: Visit history within profile is shown in reverse-chronological order; each row shows: date, visit type, attending staff, brief outcome
- [ ] **MOTH-16**: Staff member can register a new mother by entering: name, contact details, date of birth, LMP/EDD, risk level, assigned clinic and midwife

### Medical History

- [ ] **MED-01**: Staff member can view a mother's medical history in structured sections: obstetric history, medical conditions, allergies, current medications, surgical history
- [ ] **MED-02**: Previous pregnancies list shows: outcome (live birth, stillbirth, miscarriage), complications, year
- [ ] **MED-03**: Each section explicitly shows "No known [conditions/allergies/etc.]" when empty — blank is not acceptable
- [ ] **MED-04**: Staff member can add and edit records within each medical history section

### Clinical Data — Vaccinations

- [ ] **VACC-01**: Staff member can view a mother's vaccination records in a table: vaccine name, recommended GA/trimester, date given, clinician
- [ ] **VACC-02**: Vaccination status is color-coded: given (green), due (amber), overdue (red), not yet applicable (grey)
- [ ] **VACC-03**: Staff member can log a vaccination: date, vaccine name, dose number, administering clinician
- [ ] **VACC-04**: Deviations from schedule can be recorded with a reason field

### Clinical Data — Weight & Health Tracking

- [ ] **WGHT-01**: Staff member can view a weight chart with gestational age on the x-axis and actual weight plotted over time
- [ ] **WGHT-02**: Weight chart overlays recommended weight gain range (IOM reference bands by pre-pregnancy BMI category)
- [ ] **WGHT-03**: Weight chart x-axis is scrollable on mobile (9 months of data does not fit a phone screen without scroll)
- [ ] **WGHT-04**: Data table below chart shows: date, weight (kg), BP (systolic/diastolic), fundal height
- [ ] **WGHT-05**: Staff member can log a measurement: weight, BP, fundal height, gestational age at measurement

### Clinical Data — Pregnancy Timeline

- [ ] **TIME-01**: Staff member can view a scrollable pregnancy timeline with key markers: LMP, confirmed pregnancy, trimester starts, WHO ANC contact points (8), EDD
- [ ] **TIME-02**: Completed visits, vaccinations given, and key clinical findings are plotted as events on the timeline
- [ ] **TIME-03**: Timeline events are color-coded by category: visits (blue), vaccinations (green), clinical alerts (red)
- [ ] **TIME-04**: A "you are here" indicator shows current gestational age on the timeline
- [ ] **TIME-05**: Upcoming recommended contacts are shown as future markers on the timeline

### Clinic Scheduling

- [ ] **SCHED-01**: Staff member can view the clinic schedule in a list or calendar view; mobile default is day/list view
- [ ] **SCHED-02**: Each schedule row shows: date, time, session name/type, confirmed attendee count and capacity, status (upcoming/in-progress/completed/cancelled)
- [ ] **SCHED-03**: Staff member can navigate to a specific date and quick-jump back to today
- [ ] **SCHED-04**: Staff member can add a new clinic session with: name/type, date, start/end time, location, lead clinician, capacity
- [ ] **SCHED-05**: Add session form uses a touch-friendly date picker (no text input for dates on mobile)
- [ ] **SCHED-06**: Staff member can view session detail: metadata, attendee roster with each mother's risk badge and last-visit date, per-attendee status (Registered/Attended/Did Not Attend/Rescheduled), session notes

### Visit Registration

- [ ] **VISIT-01**: Staff member can register a clinic visit with: mother (pre-filled when accessed from profile/session), visit date (defaults to today), visit type, attending clinician
- [ ] **VISIT-02**: Visit form captures structured clinical findings: BP (systolic/diastolic), weight, fundal height, fetal heart rate, presenting complaints (multi-select)
- [ ] **VISIT-03**: Visit form validates clinical field ranges (BP, weight) and flags impossible values with clinically meaningful error messages; allows override with a recorded reason
- [ ] **VISIT-04**: Visit form provides a "Save and log another" shortcut for high-volume clinic days

### User Profile

- [ ] **UPROF-01**: Staff member can view their profile: name, role/title, facility, last login
- [ ] **UPROF-02**: Staff member can edit: display name, contact number, notification preferences
- [ ] **UPROF-03**: Staff member can log out from the user profile screen

### Quality — Cross-Cutting

- [ ] **QUAL-01**: All screens meet WCAG 2.1 AA — minimum 4.5:1 contrast on body text, 3:1 on large text and UI components
- [ ] **QUAL-02**: All interactive touch targets are minimum 44×44px on mobile
- [ ] **QUAL-03**: All screens are mobile-first and fully responsive; primary breakpoints: 360px (mobile), 768px (tablet), 1280px (desktop)
- [ ] **QUAL-04**: Keyboard does not obscure active input fields on mobile (scroll into view behavior)
- [ ] **QUAL-05**: All forms use React Hook Form with Zod schemas for validation; no uncontrolled inputs
- [ ] **QUAL-06**: Risk level badge is visible on every mother list row AND every mother profile header
- [ ] **QUAL-07**: Gestational age is displayed as weeks+days (e.g., "28+3") throughout all screens, not just weeks
- [ ] **QUAL-08**: Every authored record (visit, note, vaccination) stores and displays the creating staff member's name

---

## v2 Requirements

### Analytics & Reporting

- **ANLT-01**: Supervisor can view aggregate reports with date range filters
- **ANLT-02**: Export mothers list or visit records to CSV
- **ANLT-03**: Trend charts on dashboard (registrations over time, visits per week)

### Enhanced Clinical Features

- **CLIN-01**: Risk score breakdown on mother profile showing contributing factors
- **CLIN-02**: Vaccination due-date countdown ("Tetanus dose 2 due in 3 weeks")
- **CLIN-03**: Mother notes / free-text narrative field with author + timestamp
- **CLIN-04**: Inline gestational age annotation on all dates across the app

### Advanced UX

- **UX-01**: Swipe-to-action on mothers list rows (quick flag, quick assign)
- **UX-02**: Clinic session prep view: enriched attendee list with risk badges for triage
- **UX-03**: Duplicate mother detection on registration form
- **UX-04**: Multi-language / localization support (strings externalized in v1 ready for this)

### Real API Integration

- **API-01**: Replace MSW mock layer with real API endpoints — all `lib/api/` calls point to backend
- **API-02**: Authentication against real auth service
- **API-03**: Role-based access control enforcement (midwife vs supervisor vs admin)

---

## Out of Scope

| Feature | Reason |
|---------|--------|
| Real API / backend integration | No backend available for v1; mock data only |
| Role-based access control enforcement | Single staff role assumed; RBAC deferred to real-API phase |
| Push / SMS notifications | Out of scope per PROJECT.md; native push requires service workers |
| Offline / PWA support | Complex sync conflict resolution; out of scope for v1 |
| Patient-facing features (mother portal) | Separate product surface; different UX, security, and literacy requirements |
| Document / image attachments | File storage pipeline is non-trivial; record findings as structured fields |
| Real-time collaborative editing | Overkill for v1; single-editor model with last-updated timestamp is sufficient |
| Bulk record operations | High UX complexity (multi-select, undo); individual actions sufficient for v1 |
| In-app messaging / staff chat | Separate product scope; coordinate via existing tools |
| Audit log viewer screen | Author + timestamp on every record is sufficient; dedicated screen is compliance scope |
| Password change / reset UI | Mock auth only; placeholder designed, not wired |
| Analytics beyond dashboard counts | Requires query layer + export; deferred to v2 |

---

## Traceability

*Populated by roadmap creation — see ROADMAP.md*

| Requirement | Phase | Status |
|-------------|-------|--------|
| FOUND-01 through FOUND-09 | Phase 1 | Pending |
| AUTH-01 through AUTH-07 | Phase 2 | Pending |
| DASH-01 through DASH-04 | TBD | Pending |
| NOTIF-01 through NOTIF-05 | TBD | Pending |
| MOTH-01 through MOTH-09 | TBD | Pending |
| MOTH-10 through MOTH-16 | TBD | Pending |
| MED-01 through MED-04 | TBD | Pending |
| VACC-01 through VACC-04 | TBD | Pending |
| WGHT-01 through WGHT-05 | TBD | Pending |
| TIME-01 through TIME-05 | TBD | Pending |
| SCHED-01 through SCHED-06 | TBD | Pending |
| VISIT-01 through VISIT-04 | TBD | Pending |
| UPROF-01 through UPROF-03 | TBD | Pending |
| QUAL-01 through QUAL-08 | All phases | Pending |

**Coverage:**
- v1 requirements: 72 total
- Mapped to phases: TBD (roadmapper will assign)
- Unmapped: TBD ⚠️

---
*Requirements defined: 2026-03-18*
*Last updated: 2026-03-18 after initial definition*
