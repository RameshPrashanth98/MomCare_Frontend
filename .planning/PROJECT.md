# MomCare Frontend

## What This Is

MomCare is a maternal health case management app used by healthcare providers (midwives, clinic staff, doctors) to register, assess, assign, and follow up with mothers throughout pregnancy. The frontend is a mobile-first, fully responsive web app built on Next.js using an existing MomCare Design System. It is the primary interface through which clinical staff manage mother records, track risk, schedule and record clinic visits, and monitor care progress.

## Core Value

Healthcare staff can find any mother's record instantly and take action — register, assess risk, log a visit, or follow up — without friction.

## Requirements

### Validated

(None yet — ship to validate)

### Active

- [ ] Onboarding flow — app introduction screens for first-time users
- [ ] Authentication — staff login screen with session management
- [ ] Home / Dashboard — summary view of activity, quick actions
- [ ] Notifications — alerts and follow-up reminders for staff
- [ ] Mothers list — browse and search registered mothers
- [ ] Mother profile — full mother record with risk level, assignment, history
- [ ] Medical history — historical health records per mother
- [ ] Clinic schedule — view upcoming clinic sessions and appointments
- [ ] Clinic session detail — individual session view with attendees and notes
- [ ] Register clinic visit — form to log a mother's clinic visit
- [ ] Add clinic session — create a new session on the schedule
- [ ] Search records — global search across mother records
- [ ] Vaccination records — track and view vaccination history per mother
- [ ] Weight & health tracking — log and visualize weight and health metrics
- [ ] Pregnancy timeline — milestone timeline across the pregnancy journey
- [ ] User profile — staff profile settings and preferences
- [ ] All components built from design tokens only (no hardcoded style values)
- [ ] Mobile-first, responsive across supported screen sizes
- [ ] WCAG 2.1 AA accessible throughout
- [ ] Mock data layer — realistic fake data for all entities (no real backend)

### Out of Scope

- Real API / backend integration — frontend uses mock data for v1
- Role-based access control — single staff role assumed for v1
- Offline / PWA support — not required for v1
- Push notifications — in-app notifications only, no native push
- Wireframes provided upfront — wireframes will be delivered per screen before each screen is implemented

## Context

- **Design system**: Existing MomCare Design System hosted at https://momcaredesignsystemwithcodexnew.vercel.app/?path=/docs/momcare-design-system-foundations-overview--docs — all UI must use its tokens and components
- **Stack**: Next.js, React, TypeScript, Tailwind CSS, TanStack Query, Zustand, React Hook Form, Zod, deployed to Vercel
- **Primary users**: Healthcare providers (midwives, clinic staff, doctors) working in maternal health settings
- **Beneficiaries**: Pregnant mothers and postpartum women receiving tracked care
- **Wireframes**: Will be provided by the user before each screen phase is executed — screen implementation should not begin without wireframes
- **Data**: Mock/static data throughout; structure should be realistic enough to swap for a real API later

## Constraints

- **Design tokens**: All color, typography, spacing, radius, shadow values must come from the MomCare Design System — no hardcoded values
- **Accessibility**: WCAG 2.1 AA minimum across all screens
- **Platform**: Mobile-first; desktop is a secondary breakpoint
- **Wireframes dependency**: Screen implementation blocked until wireframes are provided per phase

## Key Decisions

| Decision | Rationale | Outcome |
|----------|-----------|---------|
| Mock data only for v1 | Backend not yet available; build frontend independently | — Pending |
| Next.js App Router | Modern routing, server components, Vercel-native | — Pending |
| MomCare Design System as sole style source | Ensures visual consistency; prevents design drift | — Pending |
| Wireframes per phase before build | Prevents rework; ensures implementation matches intended UX | — Pending |

---
*Last updated: 2026-03-18 after initialization*
