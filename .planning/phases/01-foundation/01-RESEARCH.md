# Phase 1: Foundation - Research

**Researched:** 2026-03-18
**Domain:** Next.js 16 infrastructure, Tailwind CSS v4 token bridge, MSW 2.x mock layer, TanStack Query v5 / Zustand v5 state model, axe-core accessibility CI, Storybook 10
**Confidence:** HIGH (core decisions verified against official docs and npm registry)

---

<user_constraints>
## User Constraints (from CONTEXT.md)

### Locked Decisions

**A. Design System Token Bridge**
- No hardcoded token values in any component; Tailwind config must map to CSS custom properties bridged from the design system
- Priority order: (1) NPM package → (2) CSS `@import` or PostCSS fetch → (3) Manual copy is **explicitly rejected**
- Researcher must verify whether an NPM package exists for the MomCare Design System and what token export format it uses

**B. Mock Data Shape and Volume**
- Faker.js factory functions with consistent relational IDs; REST-shaped `lib/api/` functions
- Volume: ~50–100 mothers, proportional visits, vaccinations, weight records, clinic sessions, staff members
- All relationship references must resolve to existing entities in seed data
- Seeded with a fixed seed value for deterministic output
- MSW 2.x handlers intercept calls in test and development environments
- Same `lib/api/` call signature works when swapped for real fetch

**C. Accessibility CI Integration**
- Storybook (already in use) set up in Phase 1 with placeholder smoke stories
- axe-core runs in two places: Storybook via `@storybook/addon-a11y` AND directly in Vitest unit tests
- CI provider: GitHub Actions — lint, Vitest + axe-core, Storybook build + accessibility audit all run on every push
- `vitest-axe` maintenance status must be verified; fall back to direct `axe-core` import if abandoned

**D. Auth Guard Phase 1 Behavior**
- `middleware.ts` checks session cookie on all `(app)` routes; if no cookie → redirect `/login`
- `AUTH_BYPASS=true` env var in `.env.local` passes all requests through (only when `NODE_ENV !== 'production'`)
- Route group layout shells: `(onboarding)`, `(auth)`, `(app)` — not empty, establish layout geometry

### Claude's Discretion
*(None specified — all decisions are locked)*

### Deferred Ideas (OUT OF SCOPE)
*(None raised during this discussion)*
</user_constraints>

---

<phase_requirements>
## Phase Requirements

| ID | Description | Research Support |
|----|-------------|-----------------|
| FOUND-01 | Next.js 15/16 project scaffolded with App Router, TypeScript, Tailwind CSS, ESLint, Prettier | Scaffold command, version decision, and config structure documented below |
| FOUND-02 | MomCare Design System tokens bridged into Tailwind config via CSS custom properties — zero hardcoded values | Design system inspection findings; Tailwind v4 @theme bridge pattern documented |
| FOUND-03 | Tailwind arbitrary value usage blocked in CI | ESLint plugin options for v3 vs v4 documented; regex fallback approach for v4 |
| FOUND-04 | MSW 2.x mock data layer with `lib/api/` abstraction swappable for real API | MSW 2.x Next.js setup pattern documented |
| FOUND-05 | Realistic mock data seeded for all entities | @faker-js/faker factory pattern documented; entity volume spec locked |
| FOUND-06 | TanStack Query v5 owns server/entity state; Zustand v5 owns UI state only | State ownership pattern verified from official sources |
| FOUND-07 | Vitest + React Testing Library + axe-core configured; accessibility audit runs in CI | vitest-axe abandoned; @chialab/vitest-axe v0.19.x or direct axe-core pattern documented |
| FOUND-08 | Route groups `(onboarding)`, `(auth)`, `(app)` with isolated layout shells | Next.js App Router route group pattern documented |
| FOUND-09 | Auth guard protecting all `(app)` routes; unauthenticated users redirected to login | CRITICAL: middleware.ts vs proxy.ts decision resolved — see Architecture section |
| QUAL-01 | All screens meet WCAG 2.1 AA — 4.5:1 contrast on body text, 3:1 on large text and UI components | axe-core CI integration covers this; token bridge from design system is the baseline |
| QUAL-02 | All interactive touch targets are minimum 44×44px on mobile | Design system component baseline; enforced by axe-core audit |
| QUAL-03 | All screens mobile-first and fully responsive; breakpoints 360px, 768px, 1280px | Tailwind responsive utilities; @theme breakpoint tokens document below |
| QUAL-04 | Keyboard does not obscure active input fields on mobile | React Hook Form scroll-into-view behavior; Phase 1 infrastructure only |
| QUAL-05 | All forms use React Hook Form with Zod schemas; no uncontrolled inputs | RHF 7.71 + Zod 4 setup pattern documented |
| QUAL-06 | Risk level badge visible on every mother list row AND profile header | Mock data must include `riskLevel` field on all mother entities |
| QUAL-07 | Gestational age displayed as weeks+days throughout | Mock data must include `lmpDate` or `gestationalAgeWeeks` + `gestationalAgeDays` fields |
| QUAL-08 | Every authored record stores and displays creating staff member's name | Mock data must include `createdByStaffId` on visits, vaccinations, notes |
</phase_requirements>

---

## Summary

Phase 1 builds the project from scratch — no existing files exist outside `.planning/`. The core tension in this phase is between two Next.js major versions: the project requirements reference `proxy.ts` (Next.js 16 convention) while CONTEXT.md and FOUND-09 use `middleware.ts` language (Next.js 15 convention). Research confirms that **Next.js 16.1.7 is the current latest stable**, that `middleware.ts` is deprecated in 16 (not yet removed), and that `proxy.ts` is the canonical auth guard file going forward. Since the project starts from scratch, adopting Next.js 16 is correct.

The MomCare Design System at `momcaredesignsystemwithcodexnew.vercel.app` is a Storybook instance. No NPM package was found in any public registry search. The design system uses **hardcoded values in its Storybook UI layer** (not CSS custom properties). This means the token bridge strategy must be the **CSS `@import` approach** — importing the design system's own CSS, or manually extracting token values into a `@theme {}` block in `globals.css`. The latter is the practical path since no CDN URL for raw tokens was found.

Tailwind CSS v4 (4.2.1) changes how tokens work fundamentally — `tailwind.config.ts` is replaced by `@theme {}` in CSS. ESLint arbitrary value blocking has a gap: `eslint-plugin-tailwindcss` v3.18.2 only supports Tailwind v3. For v4, a regex-based ESLint custom rule or `@poupe/eslint-plugin-tailwindcss` is the path forward.

`vitest-axe` (chaance/vitest-axe) is abandoned — last published 3 years ago. The replacement is `@chialab/vitest-axe` v0.19.1, which supports Vitest 3.x and 4.x and axe-core 4.x. This is the recommended path.

**Primary recommendation:** Scaffold with Next.js 16, use `proxy.ts` (not `middleware.ts`), bridge design system tokens via a `@theme {}` block in `globals.css`, use `@chialab/vitest-axe` for Vitest accessibility tests, and block arbitrary values with a custom ESLint regex rule.

---

## Standard Stack

### Core

| Library | Version | Purpose | Why Standard |
|---------|---------|---------|--------------|
| next | 16.1.7 | Full-stack React framework, App Router, proxy.ts auth guard | Current stable; proxy.ts convention live; breaking changes from 15→16 are manageable at project start |
| react / react-dom | 19.x (bundled with Next.js 16) | UI rendering | Next.js 16 ships React 19.2 |
| typescript | 5.x | Type safety | Required by Next.js 16 (TypeScript 5+) |
| tailwindcss | 4.2.1 | Utility-first CSS; CSS-first config via @theme | v4 is current stable; @theme replaces tailwind.config.ts |
| @tailwindcss/postcss | 4.x | PostCSS plugin for Tailwind v4 | Required by Tailwind v4 |

### State Management and Data Fetching

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| @tanstack/react-query | 5.90.21 | Server/entity state ownership: mothers, visits, vaccinations | All server data — the sole cache owner |
| zustand | 5.0.12 | UI-only state: drawers, filter selections, wizard steps, session cookie presence | Never for server entity data |

### Mock Data Layer

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| msw | 2.12.13 | Service worker API interception in browser + Node.js server handler for tests | Every `lib/api/` call in dev and test |
| @faker-js/faker | 10.3.0 | Realistic fake data generation with fixed seed | All factory functions in `lib/mock/` |

### Testing and Accessibility

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| vitest | 4.1.0 | Test runner | All unit and component tests |
| @testing-library/react | 16.3.2 | Component rendering in tests | All component tests |
| @testing-library/user-event | 14.x | Simulated user interactions | Interactive component tests |
| axe-core | 4.11.1 | Accessibility rule engine | Consumed by @chialab/vitest-axe |
| @chialab/vitest-axe | 0.19.1 | Vitest matchers for axe-core | **Use this instead of abandoned vitest-axe** |
| @storybook/nextjs | 10.2.19 | Storybook framework adapter for Next.js | Smoke stories and visual CI |
| @storybook/addon-a11y | 10.x | axe-core integration in Storybook | CI accessibility audit on stories |

### Forms (QUAL-05)

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| react-hook-form | 7.71.2 | Form state management, controlled inputs | Every form in the app |
| zod | 4.3.6 | Schema validation paired with RHF | Every form schema |
| @hookform/resolvers | 3.x | Bridges Zod schemas into RHF | Required for RHF + Zod integration |

### Linting and Code Quality

| Library | Version | Purpose | When to Use |
|---------|---------|---------|-------------|
| eslint | 9.x | Linting (flat config format in Next.js 16) | All source files |
| prettier | 3.x | Code formatting | All source files |
| eslint-plugin-tailwindcss | 3.18.2 | Arbitrary value ban — BUT supports Tailwind v3 only | See pitfall note below |

### Alternatives Considered

| Instead of | Could Use | Tradeoff |
|------------|-----------|----------|
| Next.js 16 | Next.js 15.x | 15.x avoids proxy.ts rename but is behind stable; since project starts fresh, 16 is correct |
| @chialab/vitest-axe | Direct axe-core import in each test | @chialab/vitest-axe gives cleaner `expect(el).toHaveNoViolations()` matcher; direct import is more verbose but always works |
| Tailwind v4 @theme | Tailwind v3 tailwind.config.ts | v3 has better ESLint plugin support for arbitrary value banning but is behind stable |
| @poupe/eslint-plugin-tailwindcss | Custom ESLint regex rule | @poupe is newer and less battle-tested; regex rule is simpler and guaranteed |

**Installation:**

```bash
# Project scaffold
npx create-next-app@latest . --typescript --tailwind --eslint --app --no-src-dir --import-alias "@/*"

# Upgrade to Next.js 16
npm install next@latest react@latest react-dom@latest

# State management and data
npm install @tanstack/react-query zustand

# Mock data
npm install --save-dev msw @faker-js/faker

# MSW service worker init
npx msw init ./public

# Testing
npm install --save-dev vitest @testing-library/react @testing-library/user-event @chialab/vitest-axe axe-core jsdom

# Storybook (interactive setup)
npx storybook@latest init

# Forms
npm install react-hook-form zod @hookform/resolvers
```

---

## Architecture Patterns

### Recommended Project Structure

```
project root/
├── proxy.ts                    # Auth guard (Next.js 16) — protects (app) routes
├── middleware.ts               # DO NOT create — deprecated in Next.js 16
├── .env.local                  # AUTH_BYPASS=true for dev-mode bypass
├── .env.local.example          # Documents AUTH_BYPASS=true variable
├── .github/
│   └── workflows/
│       └── ci.yml              # GitHub Actions: lint + test + storybook a11y
├── app/
│   ├── globals.css             # @import "tailwindcss" + @theme { tokens } + design system import
│   ├── layout.tsx              # Root layout (html/body only)
│   ├── (onboarding)/
│   │   ├── layout.tsx          # Centered single-column placeholder
│   │   └── welcome/page.tsx    # Placeholder page for smoke story
│   ├── (auth)/
│   │   ├── layout.tsx          # Centered card layout placeholder
│   │   └── login/page.tsx      # Placeholder (Phase 2 implements)
│   └── (app)/
│       ├── layout.tsx          # Nav comment slots placeholder (header + bottom nav marked)
│       └── dashboard/page.tsx  # Placeholder (Phase 3 implements)
├── lib/
│   ├── api/                    # Public API abstraction — same signature for mock + real
│   │   ├── mothers.ts          # listMothers(), getMother(), createMother()
│   │   ├── visits.ts           # listVisits(), getVisit(), createVisit()
│   │   ├── vaccinations.ts     # listVaccinations(), logVaccination()
│   │   ├── weight.ts           # listWeightRecords(), logWeight()
│   │   ├── sessions.ts         # listSessions(), getSession()
│   │   └── staff.ts            # listStaff(), getStaffMember()
│   ├── mock/
│   │   ├── seed.ts             # Fixed seed value (e.g., 12345); all factories use this
│   │   ├── factories/
│   │   │   ├── mother.factory.ts
│   │   │   ├── visit.factory.ts
│   │   │   ├── vaccination.factory.ts
│   │   │   ├── weight.factory.ts
│   │   │   ├── session.factory.ts
│   │   │   └── staff.factory.ts
│   │   └── db.ts               # In-memory "database" — generated entities with referential integrity
│   └── query/
│       └── client.ts           # TanStack Query QueryClient configuration
├── store/
│   └── ui.ts                   # Zustand store — UI state only (drawers, filters, session presence)
├── mocks/
│   ├── browser.ts              # MSW setupWorker() for browser dev
│   ├── server.ts               # MSW setupServer() for Node.js tests
│   └── handlers/
│       ├── mothers.ts          # REST handlers for /api/mothers
│       ├── visits.ts
│       ├── vaccinations.ts
│       ├── weight.ts
│       ├── sessions.ts
│       └── staff.ts
├── .storybook/
│   ├── main.ts                 # @storybook/nextjs framework config
│   └── preview.ts              # Global a11y config: parameters.a11y.test = 'error'
└── stories/
    └── foundation/
        ├── TokenDemo.stories.ts   # Smoke story: renders token swatches, verifies CSS vars
        └── LayoutShells.stories.ts
```

### Pattern 1: Next.js 16 Auth Guard with proxy.ts

**What:** `proxy.ts` in project root replaces `middleware.ts`. Reads session cookie; redirects unauthenticated users on `(app)` routes to `/login`. Dev-mode bypass via `AUTH_BYPASS=true`.

**When to use:** Phase 1 establishes this so Phase 2 only needs to set the cookie correctly.

**Example:**

```typescript
// Source: https://nextjs.org/blog/next-16 + https://nextjs.org/docs/15/app/api-reference/file-conventions/middleware
// proxy.ts (project root)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl
  const isAppRoute = pathname.startsWith('/dashboard') ||
    pathname.startsWith('/mothers') ||
    pathname.startsWith('/sessions') ||
    pathname.startsWith('/profile')

  if (!isAppRoute) {
    return NextResponse.next()
  }

  // Dev-mode bypass
  const isDev = process.env.NODE_ENV !== 'production'
  const bypassEnabled = process.env.AUTH_BYPASS === 'true'
  if (isDev && bypassEnabled) {
    return NextResponse.next()
  }

  const session = request.cookies.get('session')
  if (!session) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
}
```

**Note on FOUND-09 wording:** REQUIREMENTS.md says `proxy.ts` and CONTEXT.md says `middleware.ts`. Both refer to the same concept. Since we are starting fresh with Next.js 16, use `proxy.ts` with exported function name `proxy`. The cookie-check logic is identical.

### Pattern 2: Tailwind v4 Token Bridge via @theme

**What:** Tailwind v4 replaces `tailwind.config.ts` with a `@theme {}` block in CSS. All tokens defined in `@theme` are automatically exposed as CSS custom properties on `:root`. The MomCare Design System has no published NPM package and no CDN URL for raw tokens was found. Therefore, tokens must be extracted from the Storybook design reference and declared in `@theme`.

**Token extraction approach:**
1. Visit `momcaredesignsystemwithcodexnew.vercel.app` Design Tokens and Color Reference stories
2. Extract color palette, spacing scale, border radius, elevation/shadow values
3. Declare in `globals.css` under `@theme` using the `--color-*`, `--spacing-*`, `--radius-*`, `--shadow-*` naming convention Tailwind v4 expects

**Example:**

```css
/* Source: https://tailwindcss.com/blog/tailwindcss-v4 */
/* app/globals.css */
@import "tailwindcss";

@theme {
  /* Colors extracted from MomCare Design System */
  --color-primary: /* value from design system */;
  --color-primary-hover: /* value from design system */;
  --color-surface: /* value from design system */;
  --color-on-surface: /* value from design system */;
  --color-risk-high: /* value from design system */;
  --color-risk-medium: /* value from design system */;
  --color-risk-low: /* value from design system */;
  /* ...complete palette */

  /* Spacing */
  --spacing-xs: /* value */;
  --spacing-sm: /* value */;
  --spacing-md: /* value */;
  --spacing-lg: /* value */;
  --spacing-xl: /* value */;

  /* Radius */
  --radius-sm: /* value */;
  --radius-md: /* value */;
  --radius-lg: /* value */;
  --radius-full: 9999px;

  /* Shadows */
  --shadow-sm: /* value */;
  --shadow-md: /* value */;

  /* Breakpoints (QUAL-03) */
  --breakpoint-mobile: 360px;
  --breakpoint-tablet: 768px;
  --breakpoint-desktop: 1280px;
}
```

**What Tailwind generates automatically:**
- `bg-primary` → `background-color: var(--color-primary)`
- `text-on-surface` → `color: var(--color-on-surface)`
- `rounded-md` → `border-radius: var(--radius-md)`
- All tokens visible in DevTools as CSS custom properties on `:root`

### Pattern 3: Blocking Arbitrary Tailwind Values in CI (FOUND-03)

**The problem:** `eslint-plugin-tailwindcss` v3.18.2 supports only Tailwind v3. With Tailwind v4, the plugin's config detection breaks.

**Solution: Custom ESLint rule with regex** — write a local ESLint rule that flags any JSX class attribute containing `[` followed by values other than CSS variables. This is simpler and more reliable than a half-supported v4 plugin.

```javascript
// eslint-local-rules/no-tailwind-arbitrary.js
// Flags: bg-[#ff0000], p-[20px], w-[100px] etc.
// Allows: bg-[var(--color-primary)] since that's a token reference
module.exports = {
  create(context) {
    return {
      JSXAttribute(node) {
        if (node.name.name !== 'className') return
        const value = node.value?.value || node.value?.expression?.value || ''
        const arbitraryNonVar = /\[(?!var\()[^\]]+\]/g
        if (arbitraryNonVar.test(value)) {
          context.report({ node, message: 'Arbitrary Tailwind values are banned. Use a design token instead.' })
        }
      }
    }
  }
}
```

Alternative: If `@poupe/eslint-plugin-tailwindcss` proves stable, it has explicit v4 support and a `no-arbitrary-value` rule. Assess at scaffold time.

### Pattern 4: MSW 2.x with lib/api/ Abstraction (FOUND-04)

**What:** `lib/api/` exports pure functions that call `fetch()`. In test/dev, MSW intercepts those fetch calls. In production, the same functions call the real API. No component ever calls MSW directly.

```typescript
// Source: https://mswjs.io/docs/integrations/browser/
// lib/api/mothers.ts
export interface ListMothersParams {
  page?: number
  filters?: { riskLevel?: 'high' | 'medium' | 'low'; overdue?: boolean }
}

export interface Mother {
  id: string
  name: string
  riskLevel: 'high' | 'medium' | 'low'
  lmpDate: string
  edd: string
  assignedStaffId: string
  clinicId: string
  // ...
}

export async function listMothers(params: ListMothersParams = {}): Promise<Mother[]> {
  const url = new URL('/api/mothers', window.location.origin)
  if (params.page) url.searchParams.set('page', String(params.page))
  const res = await fetch(url.toString())
  if (!res.ok) throw new Error('Failed to fetch mothers')
  return res.json()
}

export async function getMother(id: string): Promise<Mother> {
  const res = await fetch(`/api/mothers/${id}`)
  if (!res.ok) throw new Error(`Failed to fetch mother ${id}`)
  return res.json()
}
```

```typescript
// mocks/handlers/mothers.ts
import { http, HttpResponse } from 'msw'
import { db } from '@/lib/mock/db'

export const mothersHandlers = [
  http.get('/api/mothers', ({ request }) => {
    const url = new URL(request.url)
    const page = Number(url.searchParams.get('page') || 1)
    return HttpResponse.json(db.mothers.slice((page - 1) * 20, page * 20))
  }),
  http.get('/api/mothers/:id', ({ params }) => {
    const mother = db.mothers.find(m => m.id === params.id)
    if (!mother) return new HttpResponse(null, { status: 404 })
    return HttpResponse.json(mother)
  }),
]
```

### Pattern 5: Faker.js Deterministic Seed with Referential Integrity (FOUND-05)

```typescript
// lib/mock/seed.ts
import { faker } from '@faker-js/faker'

// Fixed seed — deterministic data across all runs
faker.seed(12345)
export { faker }
```

```typescript
// lib/mock/factories/mother.factory.ts
import { faker } from '../seed'

export function createMother(overrides?: Partial<Mother>): Mother {
  return {
    id: faker.string.uuid(),
    name: faker.person.fullName(),
    riskLevel: faker.helpers.arrayElement(['high', 'medium', 'low']),
    lmpDate: faker.date.past({ years: 1 }).toISOString(),
    edd: faker.date.future({ years: 0.5 }).toISOString(),
    phone: faker.phone.number(),
    // ...
    ...overrides,
  }
}
```

```typescript
// lib/mock/db.ts — build relational data with integrity
import { createMother } from './factories/mother.factory'
import { createStaff } from './factories/staff.factory'
import { createVisit } from './factories/visit.factory'

const staff = Array.from({ length: 10 }, () => createStaff())
const mothers = Array.from({ length: 75 }, () => {
  const assignedStaff = faker.helpers.arrayElement(staff)
  return createMother({ assignedStaffId: assignedStaff.id })
})
const visits = mothers.flatMap(mother =>
  Array.from({ length: faker.number.int({ min: 1, max: 6 }) }, () =>
    createVisit({
      motherId: mother.id,
      staffId: faker.helpers.arrayElement(staff).id,
    })
  )
)
// Repeat for vaccinations, weightRecords, sessions

export const db = { staff, mothers, visits /* ... */ }
```

### Pattern 6: TanStack Query + Zustand State Ownership (FOUND-06)

```typescript
// lib/query/client.ts
import { QueryClient } from '@tanstack/react-query'

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 5 * 60 * 1000, // 5 minutes
      retry: 1,
    },
  },
})
```

```typescript
// store/ui.ts — Zustand owns ONLY UI state
import { create } from 'zustand'

interface UIStore {
  // Drawers and sheets
  isRegisterMotherOpen: boolean
  isLogVisitOpen: boolean
  activeMotherFilter: 'all' | 'high-risk' | 'overdue' | 'my-patients'
  // Session presence (not session data — that lives server-side)
  isAuthenticated: boolean
  setAuthenticated: (v: boolean) => void
  openRegisterMother: () => void
  closeRegisterMother: () => void
  setMotherFilter: (f: UIStore['activeMotherFilter']) => void
}

export const useUIStore = create<UIStore>((set) => ({
  isRegisterMotherOpen: false,
  isLogVisitOpen: false,
  activeMotherFilter: 'all',
  isAuthenticated: false,
  setAuthenticated: (v) => set({ isAuthenticated: v }),
  openRegisterMother: () => set({ isRegisterMotherOpen: true }),
  closeRegisterMother: () => set({ isRegisterMotherOpen: false }),
  setMotherFilter: (f) => set({ activeMotherFilter: f }),
}))
```

**Rule:** Never put mother records, visit data, or any entity list in Zustand. TanStack Query caches that. Never put drawer open/close state in TanStack Query.

### Pattern 7: axe-core in Vitest with @chialab/vitest-axe (FOUND-07)

**Important:** Use `jsdom` environment, NOT `happy-dom`. A known bug in happy-dom's `Node.prototype.isConnected` breaks axe-core.

```typescript
// vitest.config.ts
import { defineConfig } from 'vitest/config'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  test: {
    environment: 'jsdom',
    setupFiles: ['./vitest.setup.ts'],
    globals: true,
  },
})
```

```typescript
// vitest.setup.ts
import { expect } from 'vitest'
import * as matchers from '@chialab/vitest-axe/matchers'

expect.extend(matchers)
```

```typescript
// Example smoke test: stories/foundation/TokenDemo.test.tsx
import { render } from '@testing-library/react'
import { axe } from '@chialab/vitest-axe'

test('Token demo component has no accessibility violations', async () => {
  const { container } = render(<TokenDemoComponent />)
  const results = await axe(container)
  expect(results).toHaveNoViolations()
})
```

### Pattern 8: Storybook Accessibility CI (FOUND-07, success criterion 4)

```typescript
// .storybook/preview.ts
import type { Preview } from '@storybook/react'

const preview: Preview = {
  parameters: {
    a11y: {
      test: 'error', // violations = CI failure
    },
  },
}

export default preview
```

```yaml
# .github/workflows/ci.yml (relevant storybook job)
- name: Build Storybook
  run: npm run build-storybook

- name: Run Storybook accessibility tests
  run: npx storybook test --ci
```

### Anti-Patterns to Avoid

- **Using `middleware.ts` filename in Next.js 16:** It is deprecated; use `proxy.ts` with exported function named `proxy`.
- **Storing entity data (mothers, visits) in Zustand:** This creates stale-data bugs. TanStack Query must be the sole cache owner.
- **Importing MSW in components:** MSW handlers must only be imported by `mocks/browser.ts` or `mocks/server.ts`, never from component or page files.
- **Hardcoding `faker.seed()` in test files:** The seed lives in `lib/mock/seed.ts` only. Every factory imports the seeded `faker` instance.
- **Using happy-dom environment:** axe-core breaks in happy-dom. Always use `jsdom`.
- **Arbitrary Tailwind values like `bg-[#ff0000]`:** Banned by CI rule. Use `bg-primary` or `bg-[var(--color-primary)]`.
- **Creating a `tailwind.config.ts` with Tailwind v4:** Configuration is now CSS-first via `@theme {}`. The JS config file is only needed for legacy plugin compatibility.

---

## Don't Hand-Roll

| Problem | Don't Build | Use Instead | Why |
|---------|-------------|-------------|-----|
| API mocking in dev and test | Custom fetch interceptor or local Express server | MSW 2.x | MSW handles browser service worker AND Node.js interceptor; same handlers work in both environments |
| Accessibility audit in tests | Manual ARIA attribute checkers | @chialab/vitest-axe + axe-core | axe-core covers 57% of WCAG issues automatically; hand-rolled checks miss dozens of rules |
| Fake data generation | Static JSON files | @faker-js/faker with fixed seed | Static JSON goes stale, is hard to extend, and can't generate referential integrity dynamically |
| Form validation | Manual state + regex | React Hook Form + Zod | RHF handles uncontrolled input pitfalls, dirty state, validation timing; Zod gives typed schemas |
| Session detection in middleware | JWT parsing library | Simple cookie presence check in proxy.ts | Phase 1 only needs to know "cookie exists"; Phase 2 sets the real cookie |
| Server state caching | Zustand with manual refetch | TanStack Query | Cache invalidation, background refetching, loading/error states, and deduplication are non-trivial |

**Key insight:** Every item in this list represents 3–10x more code and edge cases than the library solution. The risk in a healthcare app is that hand-rolled solutions silently miss edge cases (stale data, race conditions, WCAG violations).

---

## Common Pitfalls

### Pitfall 1: Next.js Version Confusion (middleware.ts vs proxy.ts)

**What goes wrong:** Developer creates `middleware.ts` in Next.js 16, which works but triggers deprecation warnings. In a future version it will break.

**Why it happens:** The CONTEXT.md and REQUIREMENTS.md use both terms; legacy search results describe `middleware.ts`.

**How to avoid:** Create `proxy.ts` at project root with `export default function proxy(...)`. Do not create `middleware.ts` at all.

**Warning signs:** Console warns "middleware.ts is deprecated, rename to proxy.ts".

### Pitfall 2: Tailwind v4 @theme Token Values Not Visible in DevTools

**What goes wrong:** Tokens are declared in `@theme` but components use hardcoded values because the extraction from the design system was incomplete.

**Why it happens:** The MomCare Design System Storybook does not export tokens as CSS custom properties or a JS object — values must be read from the Storybook UI and transcribed.

**How to avoid:** Before writing any component, open the Design Tokens and Color Reference stories, note every value, and declare them in `@theme`. Run the success criterion check: open DevTools and confirm `--color-primary` etc. appear on `:root`.

**Warning signs:** `var(--color-xyz)` resolves to empty string in computed styles.

### Pitfall 3: vitest-axe (chaance) vs @chialab/vitest-axe Confusion

**What goes wrong:** Developer installs `vitest-axe` (chaance package, last updated 3 years ago), gets no errors but also potentially gets no coverage because the package's matchers may not work with current Vitest 4.x.

**How to avoid:** Install `@chialab/vitest-axe` (the maintained fork). Verify by checking `npm ls @chialab/vitest-axe` shows 0.19.x.

**Warning signs:** `expect(...).toHaveNoViolations` is `undefined` or throws `TypeError`.

### Pitfall 4: MSW Not Initialized Before Tests Run

**What goes wrong:** Tests call `lib/api/` functions which make `fetch()` calls; MSW server is not started, fetch falls through to real network (fails) or returns undefined.

**Why it happens:** MSW `setupServer()` and `.listen()` must run before test files. This requires a Vitest setup file.

**How to avoid:**

```typescript
// vitest.setup.ts
import { server } from './mocks/server'
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
```

**Warning signs:** Tests pass in isolation but fail when API functions are called; `fetch is not defined` or network errors in test output.

### Pitfall 5: Faker Seed Not Applied Before Factory Calls

**What goes wrong:** Different test runs produce different data; tests are non-deterministic.

**Why it happens:** `faker.seed()` must be called before any `faker.*` method is used. If each factory file imports `faker` directly from `@faker-js/faker`, the seed is not set.

**How to avoid:** Create a single `lib/mock/seed.ts` that calls `faker.seed(12345)` and re-exports the `faker` instance. Every factory imports from `../seed`, never from `@faker-js/faker` directly.

### Pitfall 6: Tailwind Arbitrary Value ESLint Rule Not Blocking Template Literals

**What goes wrong:** The regex ESLint rule catches `className="bg-[#ff0000]"` but misses `className={`bg-[${color}]`}`.

**How to avoid:** The rule must also check JSX expression containers. For Phase 1 the simpler approach is banning all `[` bracket usage in className strings and reviewing template literal cases in code review. Dynamic className construction should use `clsx` or `cva` with pre-defined token-based classes.

### Pitfall 7: Route Group Layouts Not Isolated

**What goes wrong:** A style or state from `(app)/layout.tsx` bleeds into `(auth)/layout.tsx` because they share the root `app/layout.tsx` providers.

**How to avoid:** Root `app/layout.tsx` contains ONLY html/body/QueryClientProvider/ZustandProvider. Each route group layout adds its own layout geometry independently. No cross-group style dependencies.

---

## Code Examples

### Next.js 16 proxy.ts Auth Guard

```typescript
// Source: https://nextjs.org/blog/next-16 — proxy.ts section
// proxy.ts (project root)
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const APP_ROUTES = ['/dashboard', '/mothers', '/sessions', '/notifications', '/profile']

function isAppRoute(pathname: string): boolean {
  return APP_ROUTES.some(route => pathname.startsWith(route))
}

export default function proxy(request: NextRequest) {
  const { pathname } = request.nextUrl

  if (!isAppRoute(pathname)) {
    return NextResponse.next()
  }

  // Dev-mode bypass: AUTH_BYPASS=true in .env.local
  if (process.env.NODE_ENV !== 'production' && process.env.AUTH_BYPASS === 'true') {
    return NextResponse.next()
  }

  const session = request.cookies.get('session')
  if (!session?.value) {
    const loginUrl = new URL('/login', request.url)
    return NextResponse.redirect(loginUrl)
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico|sitemap.xml|robots.txt).*)'],
}
```

### TanStack Query v5 Provider Setup

```typescript
// Source: https://tanstack.com/query/v5/docs/framework/react/overview
// app/layout.tsx
'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query/client'

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      </body>
    </html>
  )
}
```

### MSW Browser Initialization (Next.js App Router)

```typescript
// mocks/browser.ts
import { setupWorker } from 'msw/browser'
import { handlers } from './handlers'

export const worker = setupWorker(...handlers)
```

```typescript
// app/layout.tsx or a dedicated MSWProvider component
// Only in development — tree-shake in production
async function initMSW() {
  if (typeof window === 'undefined') return
  if (process.env.NODE_ENV !== 'development') return
  const { worker } = await import('@/mocks/browser')
  await worker.start({ onUnhandledRequest: 'bypass' })
}

// Call before first render
```

### GitHub Actions CI Pipeline

```yaml
# .github/workflows/ci.yml
name: CI

on:
  push:
  pull_request:

jobs:
  lint:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run lint
      - run: npm run format:check

  test:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run test

  storybook-a11y:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v4
      - uses: actions/setup-node@v4
        with:
          node-version: '20'
          cache: 'npm'
      - run: npm ci
      - run: npm run build-storybook
      - run: npx storybook test --ci
```

---

## State of the Art

| Old Approach | Current Approach | When Changed | Impact |
|--------------|------------------|--------------|--------|
| `middleware.ts` | `proxy.ts` (Next.js 16) | Oct 2025 (Next.js 16) | Must use proxy.ts for new projects; middleware.ts deprecated |
| `tailwind.config.ts` JS config | `@theme {}` block in CSS | Jan 2025 (Tailwind v4) | No tailwind.config.ts needed; CSS-first configuration |
| `tailwind.config.js extend: { colors: {} }` | `@theme { --color-*: value }` | Jan 2025 (Tailwind v4) | All theme tokens auto-generate utility classes |
| `vitest-axe` (chaance) | `@chialab/vitest-axe` | 2024 (vitest-axe abandoned) | Must use @chialab package; chaance package is stale |
| MSW v1 `rest.get()` | MSW v2 `http.get()` + `HttpResponse` | 2023 (MSW v2) | API changed completely; v2 handlers are the standard |
| TanStack Query v4 `useQuery({ queryKey, queryFn })` | v5 same signature but mandatory queryKey array | 2023 (v5) | Identical for our usage |
| Zustand v4 | Zustand v5 — improved TypeScript inference | 2024 (v5) | `create<StoreType>()` syntax unchanged |

**Deprecated/outdated:**
- `middleware.ts` filename: deprecated in Next.js 16, will be removed in Next.js 17. Do not create it.
- `vitest-axe` (chaance/vitest-axe): Last published 3 years ago. Do not install.
- `eslint-plugin-tailwindcss` for Tailwind v4: Not compatible. Use a custom regex rule instead.
- `tailwind.config.ts` in Tailwind v4 projects: Not needed. Configuration lives in CSS.

---

## Open Questions

1. **MomCare Design System — exact token values**
   - What we know: The design system is a Storybook instance at `momcaredesignsystemwithcodexnew.vercel.app`. It has color, spacing, elevation, radius, border, and typography reference stories. The Storybook UI renders but token stories require browser execution (iframes) — raw values could not be scraped.
   - What's unclear: The exact hex/oklch/px values for every token that must go into `@theme`. No NPM package exists. No static CSS file URL was found.
   - Recommendation: **Plan 01-01 must include a task** to open each reference story in a browser, record all values, and declare them in `globals.css @theme`. This is manual but one-time work. Tokens are locked once declared; future changes are a `@theme` edit, not a component refactor.

2. **Next.js 16 vs 15 for scaffold**
   - What we know: `create-next-app@latest` will scaffold Next.js 16. The project requirements reference `proxy.ts` in FOUND-09, confirming Next.js 16 intent.
   - What's unclear: CONTEXT.md says `middleware.ts` in FOUND-09 description, but the actual REQUIREMENTS.md says `proxy.ts auth guard`. Next.js 16 makes this unambiguous.
   - Recommendation: Use Next.js 16. The planner should note this resolution for the developer.

3. **@poupe/eslint-plugin-tailwindcss maturity**
   - What we know: It claims Tailwind v4 support and a `no-arbitrary-value` rule. Less battle-tested than the custom regex approach.
   - What's unclear: Whether it integrates cleanly with ESLint 9 flat config (which Next.js 16 defaults to).
   - Recommendation: Implement the custom regex ESLint rule first. If it proves insufficient, evaluate `@poupe/eslint-plugin-tailwindcss`.

---

## Validation Architecture

### Test Framework

| Property | Value |
|----------|-------|
| Framework | Vitest 4.1.0 |
| Config file | `vitest.config.ts` — Wave 0 (does not exist yet) |
| Quick run command | `npm run test -- --run` |
| Full suite command | `npm run test` |

### Phase Requirements → Test Map

| Req ID | Behavior | Test Type | Automated Command | File Exists? |
|--------|----------|-----------|-------------------|-------------|
| FOUND-01 | Project scaffolds and `npm run dev` starts without errors | smoke | `npm run build` (CI) | ❌ Wave 0 |
| FOUND-02 | CSS custom property tokens visible in rendered output; no raw hex in component styles | unit | `npm run test -- --run stories/foundation/TokenDemo.test.tsx` | ❌ Wave 0 |
| FOUND-03 | Arbitrary Tailwind value `bg-[#ff0000]` causes ESLint error | lint | `npm run lint` (expects error on test fixture) | ❌ Wave 0 |
| FOUND-04 | `listMothers()` returns typed data; swap MSW handler — same call works | unit | `npm run test -- --run lib/api/mothers.test.ts` | ❌ Wave 0 |
| FOUND-05 | All entities seeded; relationships resolve (visit.motherId exists in mothers) | unit | `npm run test -- --run lib/mock/db.test.ts` | ❌ Wave 0 |
| FOUND-06 | TanStack Query client configured; Zustand store has no entity data keys | unit | `npm run test -- --run lib/query/client.test.ts` | ❌ Wave 0 |
| FOUND-07 | axe-core runs; `TokenDemo` story has zero violations | unit + storybook | `npm run test` + `npx storybook test --ci` | ❌ Wave 0 |
| FOUND-08 | Three route groups exist with layout files; navigating renders correct shell | smoke | `npm run build` verifies file existence | ❌ Wave 0 |
| FOUND-09 | Unauthenticated request to `/dashboard` redirects to `/login`; `AUTH_BYPASS=true` passes through | unit | `npm run test -- --run proxy.test.ts` (uses `unstable_doesMiddlewareMatch`) | ❌ Wave 0 |
| QUAL-01 | Token Demo component passes axe WCAG 2.1 AA check | unit | `npm run test -- --run stories/foundation/TokenDemo.test.tsx` | ❌ Wave 0 |
| QUAL-05 | React Hook Form + Zod validation blocks invalid input | unit | `npm run test -- --run lib/forms/schema.test.ts` | ❌ Wave 0 |

### Sampling Rate

- **Per task commit:** `npm run lint && npm run test -- --run`
- **Per wave merge:** `npm run test`
- **Phase gate:** Full suite green (`npm run test`) + Storybook a11y audit (`npx storybook test --ci`) before `/gsd:verify-work`

### Wave 0 Gaps

- [ ] `vitest.config.ts` — Vitest configuration with jsdom environment
- [ ] `vitest.setup.ts` — MSW server setup (beforeAll/afterEach/afterAll) + @chialab/vitest-axe matchers
- [ ] `tests/foundation/TokenDemo.test.tsx` — REQ FOUND-02, FOUND-07, QUAL-01
- [ ] `tests/api/mothers.test.ts` — REQ FOUND-04
- [ ] `tests/mock/db.test.ts` — REQ FOUND-05
- [ ] `tests/proxy.test.ts` — REQ FOUND-09; uses `unstable_doesMiddlewareMatch` from `next/experimental/testing/server`
- [ ] `package.json` test scripts: `"test": "vitest"`, `"test:run": "vitest run"`, `"format:check": "prettier --check ."`
- [ ] Framework install: Already included in install commands above

---

## Sources

### Primary (HIGH confidence)

- Next.js 15 official docs (`https://nextjs.org/docs/15/app/api-reference/file-conventions/middleware`) — middleware.ts API, cookie access, redirect pattern
- Next.js 16 blog post (`https://nextjs.org/blog/next-16`) — proxy.ts deprecation, breaking changes table
- Tailwind CSS v4 blog (`https://tailwindcss.com/blog/tailwindcss-v4`) — @theme syntax, CSS custom properties generation
- npm registry — verified versions: next@16.1.7, tailwindcss@4.2.1, msw@2.12.13, @tanstack/react-query@5.90.21, zustand@5.0.12, @faker-js/faker@10.3.0, axe-core@4.11.1, vitest@4.1.0, @storybook/nextjs@10.2.19, @testing-library/react@16.3.2, react-hook-form@7.71.2, zod@4.3.6, @chialab/vitest-axe@0.19.1
- Storybook docs (`https://storybook.js.org/docs/writing-tests/accessibility-testing`) — a11y addon configuration, parameters.a11y.test

### Secondary (MEDIUM confidence)

- Snyk/npmjs.com for vitest-axe maintenance status — "Inactive" classification, last published 3 years ago, verified from npm search results showing @chialab/vitest-axe 0.19.1 as active alternative
- TanStack Query documentation (verified via WebSearch from official source) — v5 state ownership pattern
- MomCare Design System Storybook index.json — components and token story inventory confirmed; no NPM package or CDN token URL found

### Tertiary (LOW confidence)

- WebSearch results on eslint-plugin-tailwindcss v4 incompatibility — multiple sources agree but official ESLint plugin docs not directly read
- @poupe/eslint-plugin-tailwindcss — npm page returned 403; claims verified only via WebSearch

---

## Metadata

**Confidence breakdown:**
- Standard stack: HIGH — all versions verified against npm registry 2026-03-18
- Next.js 16 proxy.ts: HIGH — verified from official Next.js 16 blog and docs
- Tailwind v4 @theme: HIGH — verified from official Tailwind blog
- Architecture: HIGH — patterns derived from official docs
- vitest-axe abandonment: HIGH — npm metadata confirmed (3 years since last publish)
- MomCare Design System tokens: LOW — Storybook stories require browser execution; values not scrapeable; must be manually extracted
- ESLint v4 arbitrary value blocking: MEDIUM — primary plugin incompatible; custom rule approach is documented pattern

**Research date:** 2026-03-18
**Valid until:** 2026-04-18 (30 days — Next.js and Storybook release frequently; verify versions before scaffold)
