# MomCare — Maternal Health Clinic Management

A mobile-first web application for healthcare providers (midwives, clinic staff, doctors) to manage maternal health records, track risk, schedule clinic visits, and monitor antenatal care — built for the Ministry of Health, Sri Lanka.

---

## Overview

MomCare gives clinic staff instant access to every mother's record and lets them take action — register, assess risk, log a visit, or follow up — without friction. The entire UI is built from the [MomCare Design System](https://momcaredesignsystemwithcodexnew.vercel.app/?path=/docs/momcare-design-system-foundations-overview--docs), ensuring visual consistency across all screens.

> **v1 uses mock data throughout.** No real backend is required to run the app.

---

## Screens

| Screen | Status |
|--------|--------|
| Splash (animated logo, 9s duration) | ✅ Built |
| Onboarding (4 screens, animated illustrations) | ✅ Built |
| Login | ✅ Built |
| Home / Dashboard | ✅ Built |
| Notifications | ✅ Built |
| Mothers List | ✅ Built |
| Register Mother | ✅ Built |
| Mother Profile | ✅ Built |
| Medical History | ✅ Built |
| Clinic Schedule | ✅ Built |
| Add Clinic Session | ✅ Built |
| Clinic Session Detail | ✅ Built |
| User Profile | ✅ Built |
| Search Records | ✅ Built |
| Vaccination Records | ✅ Built |
| Weight & Health Tracking | ✅ Built |
| Lab Reports | ✅ Built |
| Pregnancy Timeline | ✅ Built |
| Register Clinic Visit | 🔜 Planned |

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| Framework | [Next.js 16](https://nextjs.org) (App Router) |
| Language | TypeScript |
| Styling | Tailwind CSS v4 + MomCare Design Tokens |
| State | [Zustand](https://zustand-demo.pmnd.rs) |
| Data fetching | [TanStack Query v5](https://tanstack.com/query) |
| Forms | [React Hook Form](https://react-hook-form.com) + [Zod](https://zod.dev) |
| Icons | [Lucide React](https://lucide.dev) |
| Testing | [Vitest](https://vitest.dev) + Testing Library + axe-core |
| Mocking | [MSW v2](https://mswjs.io) + [@faker-js/faker](https://fakerjs.dev) |
| CI | GitHub Actions (lint, test, build) |
| Deployment | [Vercel](https://vercel.com) |

---

## Design System

All UI components are built exclusively from the **MomCare Design System** tokens — no hardcoded color, spacing, radius, or shadow values.

- **Design System Docs**: https://momcaredesignsystemwithcodexnew.vercel.app
- **Tokens live in**: `app/globals.css` (`@theme` block, Tailwind v4)
- **Rule**: Every `color`, `spacing`, `radius`, and `shadow` value must reference a CSS variable from the token set

---

## Project Structure

```
momcare/
├── app/
│   ├── (auth)/           # Auth route group (login)
│   │   ├── layout.tsx    # Phone shell wrapper
│   │   └── login/        # Login screen
│   ├── dashboard/        # Home / Dashboard screen
│   │   ├── clinics/      # Clinic Schedule (day selector, session cards)
│   │   │   ├── add/      # Add Clinic Session form
│   │   │   └── [id]/     # Clinic Session Detail (mothers, actions)
│   │   ├── mothers/      # Mothers list (search, filters, cards)
│   │   │   ├── [id]/     # Mother Profile (health, history, visits)
│   │   │   │   └── medical-history/  # Medical History (pregnancies, conditions, attachments)
│   │   │   └── register/ # Register Mother form
│   │   ├── notifications/# Notifications feed (4 card types)
│   │   ├── records/       # Search Records (NIC search)
│   │   │   └── [id]/
│   │   │       ├── vaccination/ # Vaccination Records
│   │   │       ├── weight/      # Weight & Health Tracking
│   │   │       ├── lab-reports/ # Lab Reports
│   │   │       └── timeline/    # Pregnancy Timeline
│   │   └── profile/      # User Profile (account, preferences, quick access)
│   ├── onboarding/       # Onboarding flow (4 steps)
│   ├── splash/           # Splash screen with auto-redirect
│   ├── globals.css       # Design tokens (@theme block)
│   ├── layout.tsx        # Root layout
│   └── providers.tsx     # App-level providers
├── components/
│   └── onboarding/       # Onboarding SVG illustrations
├── store/
│   └── ui.ts             # Zustand UI store (auth state, modals)
├── tests/                # Vitest test suite
│   ├── api/              # API layer tests (MSW interception)
│   ├── foundation/       # Token bridge + a11y smoke tests
│   ├── middleware/        # Auth guard logic tests
│   └── mock/             # Mock DB referential integrity tests
├── .github/workflows/    # GitHub Actions CI pipeline
├── middleware.ts          # Auth guard (protects /dashboard routes)
├── .planning/            # GSD planning artifacts (roadmap, state, phase plans)
└── public/               # Static assets
```

---

## Getting Started

### Prerequisites

- Node.js 20+
- npm 10+

### Install & Run

```bash
# Clone the repository
git clone https://github.com/RameshPrashanth98/MomCare_Frontend.git
cd MomCare_Frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) — the app starts at the splash screen and flows through onboarding → login → home dashboard.

### Other Commands

```bash
npm run build           # Production build
npm run lint            # ESLint
npm run format          # Prettier format
npm run test            # Vitest (watch mode)
npm run test:run        # Vitest (single run)
```

---

## Screen Flow

```
/ (root)
 └─► /splash              Animated logo, auto-redirects after 3s
      └─► /onboarding      4-step intro, "Get Started" or "Skip"
           └─► /login       Staff ID + password form
                └─► /dashboard          Home screen (authenticated)
                     ├─► /notifications  Notifications feed (bell icon)
                     ├─► /clinics        Clinic Schedule (bottom nav)
                     │    ├─► /clinics/add       Add Clinic Session form
                     │    └─► /clinics/[id]      Clinic Session Detail (View Session)
                     ├─► /mothers        Mothers list (bottom nav)
                     │    ├─► /mothers/register   Register new mother
                     │    └─► /mothers/[id]       Mother Profile (from card or high-risk)
                     │         └─► /mothers/[id]/medical-history  Medical History
                     ├─► /records        Search Records (bottom nav)
                     │    └─► /records/[id]/vaccination   Vaccination Records
                     │    └─► /records/[id]/weight        Weight & Health Tracking
                     │    └─► /records/[id]/lab-reports   Lab Reports
                     │    └─► /records/[id]/timeline      Pregnancy Timeline
                     └─► /profile        User Profile (bottom nav)
```

---

## Infrastructure

### Testing (28 tests)
- **Mock DB integrity** — verifies referential integrity across all entities (mothers, visits, vaccinations, sessions)
- **API layer** — MSW intercepts fetch calls and returns typed mock data
- **Token bridge** — validates design tokens exist in `globals.css` `@theme` block
- **Accessibility** — axe-core smoke test reports zero WCAG violations

### Auth Middleware
- `middleware.ts` protects all `/dashboard` routes
- Redirects unauthenticated users to `/login`
- Set `AUTH_BYPASS=true` in `.env.local` to skip auth in development

### CI Pipeline (GitHub Actions)
Runs on every push/PR to `main`:
1. **Lint** — ESLint + Prettier check
2. **Test** — Vitest (28 tests)
3. **Build** — Next.js production build

---

## Design Principles

- **Mobile-first & responsive**: Designed with iPhone 16 Pro (393×852pt) as the reference baseline; fully responsive across all mobile devices (320px–430px), capped at 430px on tablet/desktop
- **Design token only**: Zero hardcoded style values — all from `--color-*`, `--spacing-*`, `--radius-*`, `--shadow-*` CSS variables
- **Mock data**: All entities (mothers, clinics, appointments) use realistic fake data; `lib/api/` abstraction enables future real-API swap without touching components
- **Wireframe-driven**: Each screen is implemented from a provided wireframe — no screen is built without one

---

## Contributing

1. Screens are built one at a time, each from a provided wireframe
2. All styles must use design system tokens only — no hardcoded hex values
3. Components are built inline per screen (no external component library)
4. Commits follow Conventional Commits (`feat:`, `fix:`, `docs:`, etc.)

---

*Built with the [GSD workflow](https://github.com/anthropics/claude-code) · 
