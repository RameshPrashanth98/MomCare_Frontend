# Project Research Summary

**Project:** MomCare Frontend
**Domain:** Mobile-first maternal health case management frontend (staff-facing)
**Researched:** 2026-03-18
**Confidence:** HIGH (stack pre-decided; architecture and pitfall patterns corroborated by official Next.js docs and WCAG spec)

## Executive Summary

MomCare is a staff-facing maternal health case management app used by midwives, clinic staff, and doctors in low-resource clinic settings. The product is a read-mostly, data-entry-supplemented SPA built on a pre-decided Next.js 15 (App Router) + React 19 + TypeScript + Tailwind CSS + Vercel stack. Because there is no real backend in v1, the entire architecture is oriented around a structured mock data layer that can be swapped for a real API without touching component code. The MomCare Design System — consumed via CSS custom properties bridged into Tailwind — is a hard constraint: every visual decision flows through it, not around it.

The recommended approach is to build in strict layers: a foundation phase locks in the design token bridge, mock data infrastructure, TanStack Query client, and Zustand state ownership model before any screen work begins. Screens are then built in dependency order — auth shell first, then the mothers domain (the app's core entity), then scheduling, then cross-domain features like search and notifications. Storybook serves as both the component development environment and the primary test surface, with MSW providing network-level mock interception that is shared across the app, Storybook stories, and integration tests.

The three highest risks are: (1) design token bypass via Tailwind arbitrary values, which silently erodes the design system constraint if not enforced from day one; (2) a mock data architecture that creates tight coupling to static JSON imports rather than a typed API-contract-shaped layer, making real API integration a rewrite instead of a swap; and (3) TanStack Query and Zustand state duplication, which creates stale data bugs that are extremely difficult to debug. All three risks are front-loaded to Phase 1 — if the foundation phase establishes correct boundaries, screens build cleanly on top.

---

## Key Findings

### Recommended Stack

The core stack is fully pre-decided: Next.js 15 App Router, React 19, TypeScript 5, Tailwind CSS 3.4, and Vercel hosting. The data layer is TanStack Query 5 (server/async state) paired with Zustand 4 (client/UI state), with React Hook Form 7 + Zod 3 handling forms. This combination is well-established and correctly partitioned — TanStack Query owns all server-derived data; Zustand owns only session, UI flags, and search state.

The design system integration uses Storybook 8 with `@storybook/nextjs` as the component environment. MSW 2.x intercepts all network requests at the Service Worker level and the same handlers run in the app, in Storybook stories, and in Vitest-based integration tests — no separate mock infrastructure per environment. Testing uses Vitest + Testing Library + axe-core for component-level checks, with Playwright reserved for critical cross-screen flows and full-page accessibility audits.

**Core technologies:**
- **Next.js 15 (App Router):** Full framework — route groups, parallel routes, intercepting routes for modal sheets, `proxy.ts` for auth guarding
- **React 19 + TypeScript 5:** Component model and type safety; strict types enforce the mock-to-real-API contract
- **Tailwind CSS 3.4 + MomCare Design System:** Token bridge via CSS custom properties; no raw color/spacing values in app code
- **TanStack Query 5:** All server state — mothers, visits, sessions, vaccinations, weight records
- **Zustand 4:** UI state only — session user, active nav tab, modal open states, search query, toast queue
- **React Hook Form 7 + Zod 3:** Form state and validation; Zod schemas are the single source of truth for both TypeScript types and runtime validation
- **MSW 2.x + Faker.js:** Network-level mock layer; zero-infrastructure, reused across app + Storybook + tests
- **Storybook 8 (`@storybook/nextjs`):** Component environment and primary test surface; `@storybook/addon-a11y` catches WCAG violations per story
- **Vitest 2 + Testing Library + Playwright:** Test pyramid — component, integration, and E2E with axe-core at every level

See `.planning/research/STACK.md` for version details, installation commands, and alternatives considered.

---

### Expected Features

MomCare covers 15 screens. The feature set is defined by clinical staff needs — speed of record access, risk visibility, and data entry accuracy under time pressure. See `.planning/research/FEATURES.md` for screen-by-screen UX patterns.

**Must have (table stakes):**
- Instant mother record retrieval — search by name, ID, phone; sub-second feedback
- Risk level indicator (High/Medium/Low) on every list row and profile header
- Gestational age always current — auto-calculated from LMP, shown as weeks+days
- Visit history in reverse-chronological order with date, type, staff, outcome
- Vaccination status at a glance — color-coded (given/due/overdue) against schedule
- Weight trend visible without additional navigation — sparkline on profile
- Overdue appointment flags on both dashboard and mothers list
- Form validation with clinically-meaningful error messages (not generic)
- Session date + attendee count on clinic schedule rows
- Staff identity on all authored records (audit trail)
- In-app notification feed for overdue follow-ups
- Search no-result state with "Register new mother" guidance
- Mobile-accessible forms — 44px+ touch targets, label visibility, keyboard behavior

**Should have (differentiators):**
- Risk score breakdown showing contributing factors (not just the risk label)
- Pregnancy timeline with WHO ANC contact points and "you are here" indicator
- Quick-action bar on mother profile (Log Visit, Add Note, Flag for Follow-up)
- Clinic session prep view with attendee risk badges and last-visit dates
- Aggregate dashboard metrics (high-risk count, overdue count, sessions this week)
- Weight chart with IOM/WHO recommended gain range overlaid on actual trend
- Vaccination due-date countdown ("Tetanus dose 2 due in 3 weeks")
- Filter by risk level and assigned staff on mothers list
- Persistent global search icon on every screen header
- Onboarding walkthrough using real app screens (not illustrations)

**Defer (v2+):**
- Real-time collaborative editing, messaging, patient-facing portal
- Document/image attachment upload
- Full analytics with date ranges and exports
- Role-based access control enforcement
- Bulk record operations
- Push/SMS notifications
- Offline/PWA capability
- Multi-language localization
- Duplicate detection and record merge

**MVP build order (clinically justified):**
1. Login + auth shell → 2. Mothers List + Profile → 3. Search → 4. Register Clinic Visit → 5. Vaccination + Weight screens → 6. Dashboard → 7. Clinic Schedule + Session → 8. Medical History + Timeline → 9. Notifications → 10. Onboarding

---

### Architecture Approach

The app is a client-heavy SPA shell on Next.js App Router. Three route groups — `(onboarding)`, `(auth)`, `(app)` — create three isolated layout shells. The `(app)` shell hosts the persistent bottom nav and top bar; all 13 main screens live inside it. Heavy form flows (Register Visit, Add Session) use parallel + intercepting routes to render as bottom sheets on mobile while preserving the background page in the URL. All data flows downward: Mock DB → Query hooks → Screen components → Presentational components. Forms mutate upward only through query mutation hooks. Zustand is strictly for client-only concerns that have no server representation.

**Major components and their responsibilities:**
1. **`proxy.ts` (auth guard):** Reads session cookie, redirects unauthenticated users to `/login` before the page renders — no conditional rendering in layouts
2. **`lib/mock/db.ts` (in-memory database):** Seeded at boot from typed factories; simulates async latency; single swap point for real API integration
3. **`lib/query/` (TanStack Query layer):** Query key factory, QueryClient config, per-domain hooks (`useMothers`, `useVisits`, `useSchedule`) — the only interface between data and screens
4. **`lib/store/` (Zustand slices):** `auth.slice` (session user), `ui.slice` (nav, modals, toasts), `search.slice` (query string, filters)
5. **`lib/schemas/` (Zod schemas):** Single source of truth for TypeScript types and runtime validation; shared between forms and mock factories
6. **`components/[domain]/` (screen components):** Client components that call query hooks and Zustand; render presentational trees; pass handlers to forms
7. **`@modal/` parallel slot:** Intercepts navigation to form routes and renders them as bottom sheets; falls back to full-page on direct URL access

**State ownership rule (critical):** TanStack Query owns all domain data (mothers, visits, sessions). Zustand owns only ephemeral UI state. Never copy a query result into Zustand. Never derive domain data inside components — derive it in `lib/utils/` so both mock and real API paths use identical logic.

See `.planning/research/ARCHITECTURE.md` for the complete folder structure, component boundary rules, data flow diagram, and Zustand slice interfaces.

---

### Critical Pitfalls

The five critical pitfalls all cascade across multiple screens if not addressed in Phase 1. Moderate and minor pitfalls are screen-specific and addressed per phase.

1. **Design token bypass via Tailwind arbitrary values** — Use `tailwindcss-plugin-no-arbitrary-values` or an ESLint rule blocking `[...]` class syntax from day one. Map every MomCare Design System token to a named Tailwind utility in `tailwind.config.ts`. Make any arbitrary value in a PR a blocking review comment. This must be in CI before the first screen is built — retrofitting is cost-prohibitive.

2. **Mock data architecture blocking real API integration** — Never import static JSON directly in components. Define a `lib/api/` (or `lib/mock/db.ts`) layer on day one with function signatures matching what a real API would expose (`getMother(id)`, `getVisitsByMother(motherId)`). Define TypeScript interfaces for every entity before building any screen. Use TanStack Query even against mock data so only the fetcher function changes at API integration time.

3. **TanStack Query + Zustand state duplication** — Write a one-page state ownership document before TanStack Query and Zustand are first used together. If two components need the same server data, both call `useQuery` with the same key — TanStack Query deduplicates. Never use `useEffect` to copy query data into a Zustand store. The warning sign is `useEffect(() => { setCurrentMother(data) }, [data])`.

4. **`'use client'` overuse destroying server component benefits** — Every `'use client'` directive must have a comment explaining why. Pages (`page.tsx`) are Server Components by default. Only leaf interactive components get `'use client'`. This is especially important for the mobile-first target where initial bundle size directly affects load performance on clinic networks.

5. **WCAG color contrast failures discovered late** — During design system integration (Phase 1), build a contrast matrix for every foreground/background token combination that will be used. Flag any combination below 4.5:1 before any screen is built. Add `@axe-core/react` in development and run `checkA11y` in every Storybook story's `play` function — healthcare UIs have an implicit WCAG 2.1 AA obligation.

See `.planning/research/PITFALLS.md` for moderate pitfalls (mobile overflow, RHF+Zod schema mismatch, Suspense boundaries, hydration mismatch) and minor pitfalls (scroll restoration, timeline reflow, Next.js 15 `params` as Promise).

---

## Implications for Roadmap

All four research files converge on the same dependency graph. The ordering below is derived from ARCHITECTURE.md's build order, FEATURES.md's MVP priority list, and PITFALLS.md's phase-specific warnings.

---

### Phase 1: Foundation and Design System Integration

**Rationale:** Five of the five critical pitfalls must be resolved before any screen is built. This phase is a force multiplier — getting it right means every subsequent phase is clean; getting it wrong means rework cascades across 15 screens.
**Delivers:** Project scaffold, design token bridge, mock data layer, TanStack Query client, Zustand store slices, state ownership document, axe-core in CI, arbitrary-value lint rule, Storybook + MSW configured.
**Addresses:** Design system integration (table stakes baseline), testing infrastructure, accessibility baseline.
**Avoids:** Pitfall 1 (token bypass), Pitfall 2 (mock data coupling), Pitfall 3 (state duplication), Pitfall 4 (`use client` overuse), Pitfall 5 (contrast audit).
**Research flag:** SKIP — Next.js App Router scaffolding, Storybook 8 + MSW integration, and Zustand/TanStack Query setup are all well-documented standard patterns.

---

### Phase 2: App Shell and Authentication

**Rationale:** All 13 main screens live inside the `(app)` shell. Nothing is buildable without the route groups, bottom nav, and `proxy.ts` auth guard. Auth must be cookie-based from the start to prevent hydration mismatch (Pitfall 9).
**Delivers:** Root layout, three route group shells (`(onboarding)`, `(auth)`, `(app)`), bottom nav, `proxy.ts` auth guard, login screen, mock session in Zustand auth slice.
**Uses:** Next.js route groups, `proxy.ts` (v16 convention), Zustand `auth.slice`, cookie-based session.
**Avoids:** Pitfall 9 (hydration mismatch from localStorage auth), Anti-Pattern 3 (one root layout for all experiences).
**Research flag:** SKIP — App Router route groups and proxy auth guard are well-documented; mock login with Zustand session is a standard pattern.

---

### Phase 3: Dashboard (Home)

**Rationale:** The dashboard establishes the screen component pattern that all subsequent screens follow. It is low-complexity data-display (counts and cards, no forms) making it the right first screen to validate the query hook → screen component → presentational component boundary.
**Delivers:** Home/Dashboard screen with aggregate metric cards (high-risk count, overdue count, today's sessions), quick-action buttons, overdue follow-up list.
**Uses:** TanStack Query hooks for aggregate data, Zustand `ui.slice` for active nav tab, design system Card and Badge components.
**Avoids:** Pitfall 3 (don't store aggregate counts in Zustand), Pitfall 4 (Dashboard shell stays Server Component; data sections are Client Components), Pitfall 8 (Suspense boundaries per data zone).
**Research flag:** SKIP — dashboard aggregation over mock data is a straightforward pattern.

---

### Phase 4: Mothers List and Mother Profile

**Rationale:** The mother record is the core entity. Every other domain (visits, vaccinations, weight, timeline) hangs off it. Building the list + profile establishes the `useMothers` query hook, the `Mother` type, the `RiskBadge` component, and the gestational age utility — all reused across 8+ subsequent screens.
**Delivers:** Mothers list (with filter chips, risk badges, GA display, last-visit sort), Mother Profile header (name, age, risk, GA, EDD), tabbed profile shell, sticky quick-action bar.
**Uses:** `useMothers`, `useMother(id)` query hooks, `filterStore` Zustand slice, `date-fns` for GA calculation, parallel + intercepting route setup for modal pattern (Register Visit will slot in later).
**Avoids:** Pitfall 6 (mobile overflow at 360px — card list, not table), Pitfall 10 (scroll restoration via sessionStorage), Pitfall 12 (async `params` in dynamic route page).
**Research flag:** SKIP — list + detail pattern with TanStack Query is well-established. GA calculation with `date-fns` is straightforward.

---

### Phase 5: Search Records

**Rationale:** Clinical staff find mothers by name/ID more often than by browsing. Search is a cross-domain feature but depends only on mothers data being in the mock DB (established in Phase 4). Delivering it here means the app is immediately clinically useful — staff can find any record.
**Delivers:** Global search page with name/ID/phone search, result highlighting, recent searches (sessionStorage), no-result "Register new mother" CTA, persistent search icon in top bar.
**Uses:** TanStack Query with search query params, Zustand `search.slice`, `cmdk` or custom input.
**Avoids:** Pitfall 3 (search query in Zustand, search results in TanStack Query — not duplicated), Pitfall 6 (result list is card-based, not a table).
**Research flag:** SKIP — search over mock data with Zustand-managed query string is standard.

---

### Phase 6: Core Clinical Data — Vaccination Records and Weight and Health Tracking

**Rationale:** These are the most frequently referenced clinical data screens after the profile itself. Both depend on the `Mother` entity and gestational age utility from Phase 4. Delivering both together is efficient because they share the same data access pattern (`useMother(id)` + sub-entity hooks) and the same mobile layout challenge (tabular data on narrow viewports).
**Delivers:** Vaccination Records screen (color-coded schedule vs actual table, add-vaccination form), Weight and Health Tracking screen (Recharts weight chart with IOM reference band, data table below, add-measurement form).
**Uses:** `recharts` with `ResponsiveContainer`, `date-fns` for schedule logic, React Hook Form + Zod for add-measurement form, `@storybook/addon-a11y` for chart accessibility.
**Avoids:** Pitfall 6 (vaccination table → card list on mobile, table at `md:`+), Pitfall 7 (Zod schema written before form fields), Pitfall 11 (weight chart tested at 400% zoom for WCAG 1.4.10 reflow).
**Research flag:** SKIP for chart pattern. NEEDS RESEARCH for IOM gestational-age-aware weight gain reference band calculation — non-trivial data mapping that should be validated against clinical guidelines before implementation.

---

### Phase 7: Clinic Schedule, Session Detail, and Add Session

**Rationale:** The scheduling domain is independent of the mothers domain (except session detail which references mothers as attendees). It can be parallelized with Phase 6 if capacity allows. Grouping all three schedule screens together keeps the `useSchedule` query hook domain isolated.
**Delivers:** Clinic Schedule (day/week view, session cards with status and attendee count, FAB "Add Session"), Session Detail (attendee roster with risk badges, last-visit dates, per-attendee status), Add Clinic Session form (modal sheet).
**Uses:** `useSchedule`, `useSession(id)` query hooks, parallel route for Add Session modal, date picker (touch-friendly), `@tanstack/react-virtual` if attendee list is long.
**Avoids:** Pitfall 6 (attendee roster as card list on mobile), Pitfall 7 (Add Session Zod schema with `z.discriminatedUnion` for session type conditional fields), Pitfall 8 (Suspense on session detail data zones).
**Research flag:** SKIP — schedule list + detail + modal form is a well-established pattern.

---

### Phase 8: Register Clinic Visit Form

**Rationale:** This is the most common data-entry action in the app and the most complex form — conditional clinical fields (BP, weight, fundal height, fetal heart rate, presenting complaints). It is built after the mother profile and schedule screens exist so the form has meaningful context (pre-filled mother and optional session linkage).
**Delivers:** Register Clinic Visit modal sheet (triggered from mother profile quick-action or session attendee row), pre-filled mother context, structured clinical fields, BP/weight validation with override, "Save and log another" shortcut.
**Uses:** React Hook Form + Zod with `z.discriminatedUnion` for conditional fields, parallel + intercepting route modal pattern, `useMutation` hook to write visit to mock DB and invalidate cache.
**Avoids:** Pitfall 7 (Zod schema with discriminated unions for all conditional clinical fields written before any UI; partial validation per step via `trigger()`), Pitfall 4 (form is a Client Component; the surrounding profile page stays Server Component).
**Research flag:** NEEDS RESEARCH — clinical field validation ranges (BP plausibility, weight ranges by GA) should be specified against WHO/clinical guidelines before implementation. Conditional field logic for the visit form may warrant a phase-level research pass.

---

### Phase 9: Mother Sub-screens — Medical History and Pregnancy Timeline

**Rationale:** These screens enrich the mother profile but are lower clinical priority than visits and vaccinations. Medical History is structured data entry (low form complexity). Pregnancy Timeline is the most UI-complex screen due to mobile reflow requirements.
**Delivers:** Medical History (obstetric history, conditions, allergies, previous pregnancies with outcomes), Pregnancy Timeline (vertical scrollable timeline on mobile, WHO ANC contact markers, completed visits and vaccinations plotted, "you are here" indicator, upcoming contacts).
**Uses:** Same `useMother(id)` hook, `date-fns` for milestone calculation, custom timeline component or lightweight library.
**Avoids:** Pitfall 11 (Pregnancy Timeline as vertical card list on mobile; tested at 320px and 400% zoom for WCAG 1.4.10), Pitfall 6 (Medical History add/edit within sections, not a single giant form).
**Research flag:** NEEDS RESEARCH — Pregnancy Timeline is the most visually unique screen in the app. The mobile-first vertical timeline with WHO ANC contact points plotted alongside visit history has no single canonical component library solution. A phase-level research pass on timeline component options (custom SVG, Recharts, or a specialized library) is recommended.

---

### Phase 10: Notifications, User Profile, and Onboarding

**Rationale:** Notifications and User Profile are low-dependency — they can be delivered any time after Phase 2. Onboarding is built last because its content depends on final screen UX being stable. Grouping them here clears all remaining screens before handoff.
**Delivers:** Notification feed (grouped by type, unread badge, tap-to-navigate-to-record), User Profile screen (name, role, facility, notification preferences, session log out), Onboarding walkthrough (3-5 screens using real app screens, skip option, progress indicator).
**Uses:** Zustand `ui.slice` for notification read state and toast queue, mock notification data seeded from overdue follow-up logic.
**Avoids:** Pitfall 8 (notification list with Suspense boundary), Pitfall 3 (notification data in TanStack Query, read-state in Zustand — not duplicated).
**Research flag:** SKIP — notification feed and user profile are standard patterns. Onboarding is content-dependent but technically straightforward.

---

### Phase Ordering Rationale

- **Foundation before screens:** All five critical pitfalls are Phase 1 concerns. No screen work starts until the token bridge, mock layer, and state ownership model are locked.
- **Auth before content:** `proxy.ts` must exist before any protected route is built. Cookie-based session must be established before hydration bugs can emerge.
- **Core entity before sub-entities:** Mother record, profile, and search establish the data model. All clinical sub-screens (vaccinations, weight, medical history, timeline) reuse the same `useMother(id)` hook.
- **Forms after their context screens:** Register Visit requires the mother profile to be meaningful. Add Session requires the schedule screen to exist.
- **Onboarding last:** Content depends on final UX; technically trivial relative to data-connected screens.

---

### Research Flags

**Phases needing deeper research during planning:**

- **Phase 6 (Weight and Health Tracking):** IOM gestational-age-aware weight gain reference band calculation is non-trivial. Requires mapping pre-pregnancy BMI category to recommended gain range at each GA week. Validate against ACOG/IOM tables before implementation.
- **Phase 8 (Register Clinic Visit):** Clinical field validation ranges (systolic/diastolic BP plausibility, weight gain thresholds, fundal height by GA) need clinical specification. Conditional field logic (e.g., complications field gated on risk level) is complex enough to warrant a Zod schema design pass before UI work.
- **Phase 9 (Pregnancy Timeline):** No canonical mobile-first vertical timeline component exists in the React ecosystem for this exact use case. A short research pass on component options (custom SVG path, Recharts composed chart, or a specialized timeline library) will prevent mid-implementation pivots.

**Phases with standard, well-documented patterns (skip research-phase):**

- **Phase 1 (Foundation):** Next.js + Storybook + MSW + Zustand + TanStack Query — all have mature documentation and well-understood integration patterns.
- **Phase 2 (Auth shell):** App Router route groups + `proxy.ts` + cookie session is documented in Next.js official docs.
- **Phase 3 (Dashboard):** Aggregate metric cards over mock data — standard pattern.
- **Phase 4 (Mothers list + profile):** List + detail with TanStack Query is well-established. GA calculation with `date-fns` has clear APIs.
- **Phase 5 (Search):** Cross-entity search over mock data with Zustand query string is standard.
- **Phase 7 (Schedule):** Schedule list + session detail + modal form is a standard CRUD pattern.
- **Phase 10 (Notifications, Profile, Onboarding):** All standard UI patterns with no novel technical challenges.

---

## Confidence Assessment

| Area | Confidence | Notes |
|------|------------|-------|
| Stack | HIGH | Core stack is pre-decided by the project. Supporting libraries (Recharts, date-fns, cmdk) are well-established. Verify `vitest-axe` maintenance status before adopting. |
| Features | MEDIUM | Screen-level UX patterns derived from training data on clinical systems (CommCare, OpenMRS, Medic Mobile). WHO ANC contact model and IOM weight gain bands are HIGH confidence as established clinical standards. Mobile UX patterns should be verified against final wireframes. |
| Architecture | HIGH | Next.js App Router route groups, parallel/intercepting routes, and `proxy.ts` (v16) are from official documentation. Mock DB → Query hooks → Screen components pattern is correct for this project's constraints. |
| Pitfalls | HIGH | Critical pitfalls are grounded in Next.js official docs (v16, March 2026), WCAG 2.1 spec, and TanStack Query official guidance. RHF + Zod conditional validation patterns are MEDIUM (training knowledge, not live-verified). |

**Overall confidence:** HIGH for architecture and foundation decisions. MEDIUM for screen-level UX specifics and clinical validation ranges — both need verification against the actual MomCare Design System exports and clinical requirements during implementation.

### Gaps to Address

- **MomCare Design System token export format:** The token integration pattern assumes CSS custom properties exported from the design system. Before Phase 1 implementation, inspect the actual package at `momcaredesignsystemwithcodexnew.vercel.app` to confirm the export format (CSS vars, Tailwind preset, or JS tokens) and adjust the bridge pattern accordingly.
- **Next.js version confirmation:** ARCHITECTURE.md references Next.js v16 with `proxy.ts` replacing `middleware.ts`. STACK.md references Next.js 15.x. Confirm the exact installed version — if it is 15.x, use `middleware.ts`; if it is 16.x, use `proxy.ts`. Do not mix conventions.
- **Clinical field validation ranges:** BP plausibility ranges, weight gain thresholds, and fundal height norms for the Register Clinic Visit form need clinical specification. These should come from a clinician or WHO/ACOG references before Phase 8 implementation.
- **IOM weight gain reference bands:** The Weight and Health Tracking chart's reference band requires a lookup table of recommended gain ranges by pre-pregnancy BMI category and gestational week. This data needs to be sourced and validated before Phase 6 chart implementation.
- **`vitest-axe` maintenance status:** STACK.md flags this as needing active maintenance verification. Confirm before adopting; `jest-axe` adapted for Vitest is the fallback.

---

## Sources

### Primary (HIGH confidence)
- Next.js official docs v16.1.7 (March 2026) — App Router project structure, route groups, intercepting/parallel routes, `proxy.ts`
- WCAG 2.1 specification (w3.org/WAI/WCAG21) — 4.5:1 contrast ratio (AA), 1.4.10 Reflow, 2.5.5 Touch Target
- MomCare Design System — `momcaredesignsystemwithcodexnew.vercel.app`
- WHO Antenatal Care recommendations (2016, updated contacts model) — 8 ANC contacts, antenatal care standards
- IOM weight gain guidelines (via ACOG) — gestational weight gain reference ranges

### Secondary (MEDIUM confidence)
- TanStack Query v5 server state vs client state guidance — training knowledge, pattern-consistent with official docs
- Zustand 4 slices pattern — training knowledge, corroborated by multiple consistent sources
- React Hook Form 7 + Zod conditional validation — training knowledge, not live-verified against latest RHF docs
- CommCare / CHT Framework community health worker UX patterns — training data, clinical workflow modeling
- OpenMRS maternal module field structures — training data, entity model reference
- Nielsen Norman Group healthcare UX heuristics — training data, UX pattern basis

### Tertiary (LOW confidence — needs validation)
- `vitest-axe` active maintenance status — unverified; check npmjs.com before adopting
- MomCare Design System token export format — assumed CSS custom properties; must inspect package before Phase 1 implementation

---
*Research completed: 2026-03-18*
*Ready for roadmap: yes*
