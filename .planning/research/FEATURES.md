# Feature Landscape

**Domain:** Maternal health case management — frontend used by midwives, clinic staff, doctors
**Researched:** 2026-03-18
**Confidence note:** Web search and external tool access were restricted during this research session. All findings are derived from training data on clinical health information systems, WHO antenatal care guidelines, mHealth UX research, and known patterns from systems such as OpenMRS, CommCare, Medic Mobile, and similar community health worker apps. Confidence levels are assigned conservatively.

---

## Table Stakes

Features where absence makes the product unusable or untrustworthy for clinical staff.

| Feature | Why Expected | Complexity | Notes |
|---------|--------------|------------|-------|
| **Instant mother record retrieval** | Staff cannot safely deliver care without fast record access; any delay erodes trust | Low-Med | Search must handle partial name, ID number, phone. Sub-second feedback is critical |
| **Risk level indicator on every mother record** | High-risk mothers require different care protocols; missing this = clinical safety risk | Low | Color-coded badge (e.g., high/medium/low/none) must be visible on list rows AND profile header |
| **Pregnancy gestational age always current** | EDD and GA drive every clinical decision — wrong GA = wrong advice | Med | Auto-calculated from LMP or ultrasound date; must show weeks + days, not just weeks |
| **Visit history in reverse-chronological order** | Staff verify last visit date/type before acting; oldest-first ordering is a usability failure | Low | Each row: date, visit type, attending staff, brief outcome |
| **Vaccination status at a glance** | Missed vaccinations are a key antenatal quality metric; buried data = missed doses | Med | Show schedule vs actual; clearly distinguish given / due / overdue |
| **Weight trend visible without navigation** | Weight gain trajectory is the most frequently checked metric during a visit; extra taps = staff skip it | Med | Sparkline or mini-chart on profile; not just last value |
| **Upcoming / overdue appointment flag** | Staff triage their daily list by who is overdue; without this, high-risk mothers get lost | Med | Dashboard and list must both surface overdue follow-ups |
| **Form validation that prevents bad data entry** | Clinical records with impossible values (e.g., BP 0/0) erode record reliability | Med | Inline validation with clinically-meaningful error messages, not generic "invalid" |
| **Session date + attendee list on clinic schedule** | Scheduling without attendance context forces staff to navigate away to count capacity | Low | Show confirmed attendee count and capacity on schedule list row |
| **Staff identity on all authored records** | Audit trail for every entry is a clinical and regulatory requirement | Low | Every visit log, note, and record must store and display the creating staff member |
| **Notifications for overdue follow-ups** | Proactive alerts prevent at-risk mothers falling through the cracks | Med | Must distinguish: overdue follow-up vs upcoming appointment vs system alert |
| **Search with no-result guidance** | Clinical staff search under time pressure; dead ends with no guidance cause abandonment | Low | "No results for X — register as new mother?" pattern |
| **Accessible forms on mobile** | Clinic staff frequently enter data on phones/tablets; desktop-only forms = data entry errors | High | Touch targets 44px+, label visibility, keyboard does not cover active input |
| **Offline-tolerant read access (graceful degradation)** | Clinics in low-resource settings often have poor connectivity; crashing blocks care | Med | Note: PROJECT.md scopes out PWA/offline for v1, but UI must show connectivity state and not silently fail |

---

## Differentiators

Features users do not expect but that meaningfully improve clinical workflow or outcomes.

| Feature | Value Proposition | Complexity | Notes |
|---------|-------------------|------------|-------|
| **Risk score breakdown on profile** | Staff understand WHY a mother is high-risk, not just that she is; enables targeted counseling | High | Show contributing factors (age, parity, comorbidity, missed visits) as a list or badge cluster |
| **Pregnancy timeline with milestone markers** | Visual context of where a mother is in her pregnancy reduces cognitive load during consultations | Med | WHO ANC contact points (8 contacts), trimesters, key screening windows as markers on a timeline |
| **Quick-action bar on mother profile** | One-tap access to "Log Visit", "Add Note", "Flag for Follow-up" without scrolling to a form | Low | Sticky bottom bar on mobile; eliminates most common navigation paths |
| **Clinic session prep view** | Showing registered attendees for today's session with their risk levels helps staff triage clinic flow | Med | Session detail enriched with attendee risk badges and last-visit date |
| **Aggregate dashboard metrics** | Supervisor-level view: how many high-risk mothers, overdue follow-ups, sessions this week | Med | Counts and simple bar charts; does not require full analytics infrastructure |
| **Weight chart with expected-gain overlay** | IOM/WHO recommended gain range overlaid on actual weight trend gives instant deviation signal | High | Requires gestational-age-aware reference ranges; non-trivial data mapping |
| **Vaccination due-date countdown** | "Tetanus dose 2 due in 3 weeks" is more actionable than "not yet given" | Low | Derive from schedule logic already implied by vaccination records screen |
| **Mother notes / free-text narrative field** | Qualitative context (e.g., "anxious, husband unaware of pregnancy") aids continuity of care | Med | Rich-text is overkill; plain textarea with timestamp and author is sufficient |
| **Filter by risk level + assigned staff on mothers list** | Caseload management for supervisors and midwives with multiple assigned mothers | Med | Multi-select filter chips, not a dropdown; must be dismissible quickly |
| **Search shortcut on every screen** | Global search accessible via persistent header icon; clinical staff frequently jump between records mid-workflow | Low | Avoid making search a destination; surface it everywhere |
| **Onboarding walkthrough that shows real data patterns** | First-time clinical staff app adoption is notoriously poor; a walkthrough with a realistic dummy mother dramatically improves activation | Med | Interactive overlay vs static slides; show the actual screens |
| **Inline gestational age annotation on all dates** | Dates mean more to staff when paired with GA, e.g., "Visit on 14 Jan (28+3 weeks GA)" | Low | Computed display; no new data required |

---

## Anti-Features

Features to deliberately NOT build in v1 — they add scope, cost, or complexity without proportionate v1 value.

| Anti-Feature | Why Avoid | What to Do Instead |
|--------------|-----------|-------------------|
| **Real-time collaborative editing of records** | Requires conflict resolution, presence indicators, and locking logic; overkill for v1 | Single-editor model with last-updated timestamp |
| **Messaging / in-app chat between staff** | Separate communication channel is a product in itself; integration with WhatsApp/existing tools is more realistic | Notification + comment on record is sufficient for care coordination |
| **Patient-facing features (mother portal)** | Different user mental model, security requirements, language/literacy concerns — separate product surface | Scope strictly to staff-facing screens |
| **Document / image attachment upload** | File storage, viewing pipeline, and mobile compression are non-trivial; ultrasound images especially so | Record findings as structured fields, not attachments, for v1 |
| **Reporting / analytics dashboard with date ranges** | Full analytics requires a query layer, date pickers, export, and chart variety; high scope | Summary counts on the home dashboard are sufficient |
| **Role-based access control (RBAC)** | Explicitly out of scope in PROJECT.md; single staff role assumed | Design data model to support roles later without RBAC enforcement in v1 |
| **Bulk record operations (bulk assign, bulk flag)** | Useful for administrators but requires multi-select UX, confirmation flows, and undo — high complexity | Individual actions on records are sufficient |
| **Push notifications / SMS reminders** | Out of scope per PROJECT.md; native push requires service workers and platform permissions | In-app notification feed only |
| **Offline / PWA capability** | Out of scope per PROJECT.md; complex sync conflict resolution | Show connectivity state indicator; fail gracefully |
| **Duplicate detection / merge records** | Important long-term but requires fuzzy matching logic and a resolution workflow | Data entry validation to prevent obvious duplicates |
| **Audit log viewer screen** | Every record having author+timestamp is sufficient for v1; a dedicated audit trail UI is compliance scope | Ensure data layer captures author+timestamp; surface it inline only |
| **Multi-language / localization** | High translation maintenance burden; design system and copy should externalize strings for later | Use a single language; ensure string externalization pattern is in place |

---

## Feature Dependencies

These dependency relationships inform phase ordering:

```
Authentication (Login)
  → Home/Dashboard (requires staff identity for personalized view)
  → All protected screens

Mothers List
  → Mother Profile (navigate from list row)
  → Search Records (shares search logic and results presentation)

Mother Profile
  → Medical History (tab or linked section of profile)
  → Vaccination Records (tab or linked section)
  → Weight & Health Tracking (tab or linked section)
  → Pregnancy Timeline (derived from profile LMP/EDD data)
  → Register Clinic Visit (action off profile)

Pregnancy Timeline
  → depends on: LMP date from Mother Profile

Weight & Health Tracking (chart)
  → depends on: gestational age from Mother Profile (for expected-gain overlay)

Vaccination Records
  → depends on: gestational age + parity from Mother Profile (for schedule)

Clinic Schedule
  → Clinic Session Detail (navigate from schedule row)
  → Add Clinic Session (action off schedule)

Clinic Session Detail
  → Register Clinic Visit (log visit for attendee from session context)
  → depends on: Mothers List (attendee roster uses mother records)

Notifications
  → depends on: Mother Profile data (overdue follow-ups)
  → depends on: Clinic Schedule data (upcoming sessions)

Register Clinic Visit (form)
  → depends on: Mother Profile (context for which mother)
  → depends on: Clinic Session (optional session linkage)

Onboarding
  → depends on nothing; should precede Login on first run only
```

---

## Screen-by-Screen UX Patterns

What clinical staff expect on each scoped screen, based on established EHR and mHealth patterns.

### Onboarding
- 3-5 screens maximum; more than 5 = abandonment
- Show actual app screens, not illustrations — staff are pragmatic, not general consumers
- Each screen answers: "what does this do for me on shift?"
- Skip option visible from screen 1 — clinical staff resist being forced through setup
- Progress indicator (dots or step count) is required; uncertainty about length causes frustration
- Final screen should land directly on login, not add an extra tap

### Login
- Username + password minimum (no magic link for clinical staff; they need reliable access)
- "Remember me" / persistent session on trusted devices — staff log in multiple times per shift
- Clear error messages: "Incorrect password" not "Authentication failed"
- No CAPTCHA or secondary auth in v1 (mock data only; add when real auth is implemented)
- Facility/clinic name visible on login screen — staff in multi-site deployments need confirmation of which system they are accessing

### Home / Dashboard
- Prioritized by urgency: overdue follow-ups first, then today's clinic, then recent activity
- Key metric cards (high-risk count, overdue count, today's sessions) above the fold
- Quick actions: "Register New Mother", "Find Mother", "Today's Clinic" — not more than 3
- No data tables on dashboard — cards and counts only; detail is one tap away
- Last-sync timestamp if system has any real-time component

### Notifications
- Grouped by type: clinical alerts (overdue high-risk), scheduling (upcoming sessions), system
- Unread badge count on nav icon
- Mark as read on tap; mark all read action
- Notification row: mother name (if applicable), what triggered it, how long ago
- Tapping a notification navigates directly to the relevant record — not to a notification detail page

### Mothers List
- Default sort: by last visit date ascending (oldest follow-up first = clinical urgency order)
- Filter chips visible above list: All / High Risk / Overdue / My Patients
- Each row: mother name, risk badge, gestational age, last visit date, assigned staff initials
- Swipe-to-action is a differentiator, not table stakes; tapping row navigates to profile
- Search bar persistent at top of list; filters do not replace search
- Empty state for each filter: "No high-risk mothers currently registered" — not a generic empty state
- Infinite scroll preferred over pagination on mobile; pagination acceptable on desktop

### Mother Profile
- Header section always visible: name, age, risk badge, GA weeks, EDD
- Tabbed or section-based content: Overview / Visits / Vaccinations / Weight / Timeline
- Sticky action bar at bottom on mobile: "Log Visit", "Add Note", "Assign / Reassign"
- Edit mode must be explicit (tap Edit button); not inline editable fields — prevents accidental edits during scrolling
- Assigned staff displayed with name, not just ID

### Medical History
- Structured sections: obstetric history, medical conditions, allergies, current medications, surgical history
- Previous pregnancies list: outcomes (live birth, stillbirth, miscarriage), complications
- "No known conditions" explicit state — blank is ambiguous; staff need to know if it was reviewed
- Add/edit within section, not a single giant form

### Clinic Schedule
- Weekly view default on desktop; day view default on mobile
- Each session row: date, time, session name/type, confirmed attendee count / capacity
- Status indicators: upcoming / in-progress / completed / cancelled
- FAB (floating action button) "Add Session" anchored bottom-right
- Quick-jump to today from any date view

### Clinic Session Detail
- Session metadata at top: date, time, location, lead clinician
- Attendee roster list with each mother's risk badge and last-visit date
- Status per attendee: Registered / Attended / Did Not Attend / Rescheduled
- Notes field for session-level observations (not per-mother)
- "Register Visit" action available from attendee row — reduces navigation back to mother profile

### Register Clinic Visit
- Short form: mother (pre-filled from context), visit date, visit type, clinician, key findings
- Key findings as structured fields, not free text: BP (systolic/diastolic), weight, fundal height, fetal heart rate, presenting complaints (multi-select)
- Validation: BP ranges, weight plausibility (flag but allow override with reason)
- "Save and log another" shortcut for high-volume clinic days
- Pre-fill visit date as today; staff should not have to set date for a current visit

### Add Clinic Session
- Fields: session name/type, date, start/end time, location, lead clinician, capacity
- Calendar date picker with touch-friendly target — no text input for dates on mobile
- Prevent past dates by default (configurable override for backdating with a reason)
- Session type as a dropdown / chip selector: ANC Group, Individual ANC, Postnatal, Education

### Search Records
- Global search: searches across mother name, ID, phone number, village/community
- Results grouped by type if cross-entity search is in scope
- Recent searches (last 5) shown when search field is focused and empty
- No results state with "Register new mother" CTA
- Highlighting of matched substring in results

### Vaccination Records
- Table view: vaccine name | recommended GA/trimester | date given | batch/lot (optional) | given by
- Color coding: green = given, amber = due, red = overdue, grey = not yet applicable
- Printable / shareable view (nice to have, not v1 requirement)
- Add vaccination: date, vaccine, dose number, clinician — simple form
- WHO / national schedule as default; support for deviations with a reason field

### Weight & Health Tracking
- Primary chart: weight over time with gestational age on x-axis
- Reference band: recommended weight gain range by pre-pregnancy BMI category (IOM guidelines)
- Data table below chart: date, weight, BP, fundal height — for staff who prefer tabular review
- Add measurement: weight (kg), BP, fundal height, GA at measurement
- Chart must work on mobile: pinch-zoom or scrollable x-axis; small screens cannot show 9 months of weekly data without scroll

### Pregnancy Timeline
- Horizontal or vertical scrollable timeline; vertical is more readable on mobile
- Markers: LMP, confirmed pregnancy, each trimester start, WHO ANC contact points, EDD
- Events plotted on timeline: completed visits, vaccinations given, key findings
- Color-coded by category: visits (blue), vaccinations (green), alerts (red)
- "You are here" indicator at current gestational age
- Upcoming recommended contacts shown as future markers — not just historical

### User Profile
- Display: name, role/title, facility, profile photo (optional)
- Editable: display name, contact number, notification preferences
- Session: last login, active sessions, log out
- No password change in v1 (mock auth); design placeholder that can be activated later

---

## MVP Recommendation

Prioritize in this order to reach a clinically useful product:

1. **Login + Authentication shell** — everything else is behind it
2. **Mothers List + Mother Profile** — the core record-access workflow
3. **Search Records** — clinical staff find mothers by name/ID more than by browsing
4. **Register Clinic Visit** — the most common data-entry action
5. **Vaccination Records + Weight & Health Tracking** — the most frequently referenced clinical data
6. **Home / Dashboard** — makes the app feel like a coherent tool, not a list of screens
7. **Clinic Schedule + Session Detail + Add Session** — scheduling workflow
8. **Medical History + Pregnancy Timeline** — enriches profile; less time-critical on first use
9. **Notifications** — requires background logic; higher complexity, lower day-one value
10. **Onboarding** — built last once flows are stable; content depends on final UX

**Defer post-v1:**
- Analytics / reporting beyond dashboard counts
- Bulk operations on mothers list
- Document attachments
- Role-based access control enforcement

---

## Sources

- WHO Antenatal Care recommendations (2016, updated contacts model): https://www.who.int/reproductivehealth/publications/maternal_perinatal_health/anc-positive-pregnancy-experience/en/
- IOM weight gain guidelines referenced via ACOG: https://www.acog.org/clinical/clinical-guidance/committee-opinion/articles/2013/01/weight-gain-during-pregnancy
- Medic Mobile / CHT Framework community health worker UX patterns (open source, widely documented): https://communityhealthtoolkit.org/
- CommCare maternal health form design guides: https://confluence.dimagi.com/display/commcarepublic/CommCare+HQ
- Nielsen Norman Group — healthcare UX heuristics (training data, not live-verified)
- OpenMRS maternal module field structures (training data; verify against current OpenMRS 3.x docs before implementation)
- WCAG 2.1 AA: https://www.w3.org/TR/WCAG21/

**Confidence levels:**
- Screen-level UX patterns: MEDIUM (derived from training data on clinical systems; no live verification possible in this session)
- WHO ANC contact model (8 contacts): HIGH (stable, well-documented guideline)
- IOM weight gain reference bands: HIGH (established clinical standard)
- Mobile UX pattern recommendations: MEDIUM (standard patterns; verify against current React/mobile component libraries at implementation time)
- Anti-feature rationale: HIGH (based on clear scope statements in PROJECT.md)
