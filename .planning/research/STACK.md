# Technology Stack

**Project:** MomCare Frontend
**Researched:** 2026-03-18
**Domain:** Mobile-first, design-system-driven, healthcare case management frontend
**Research basis:** Training data (cutoff August 2025). External verification tools unavailable in this session — all version numbers and patterns reflect the state of the ecosystem as of mid-2025. Verify pinned versions against npmjs.com before installing.

---

## Recommended Stack

### Core Framework (Pre-decided)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Next.js | 15.x (App Router) | Full application framework | Vercel-native, server components, file-system routing at scale, strong RSC support for data-fetching patterns |
| React | 19.x | UI component model | Paired with Next.js 15; concurrent features and `use()` hook available |
| TypeScript | 5.x | Type safety throughout | Enforces data-contract fidelity between mock layer and UI — critical when no real backend exists |
| Tailwind CSS | 3.4.x | Utility-first styling | Pairs with design token system; JIT compiler eliminates dead CSS |
| Vercel | — | Hosting and deployment | Zero-config for Next.js; preview deployments per branch for design review |

**Confidence:** HIGH — these are the project's pre-decided choices and represent the mainstream Next.js production stack as of 2025.

---

### Data Fetching & State (Pre-decided)

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| TanStack Query (React Query) | 5.x | Server-state management | Caching, loading/error states, background refetch — still correct even with mock data; replaces manual useEffect fetching |
| Zustand | 4.x | Client-state management | Minimal boilerplate, no Provider wrapping required, excellent TypeScript inference |
| React Hook Form | 7.x | Form state management | Uncontrolled inputs by default = high performance on low-powered clinic devices; best-in-class DX |
| Zod | 3.x | Schema validation | Paired with RHF via `@hookform/resolvers`; single schema doubles as TypeScript type and runtime validator |

**Confidence:** HIGH — all pre-decided; versions align with major stable releases as of mid-2025.

---

### Design System Integration

**Decision: Storybook as the design system host, consuming MomCare Design System tokens via Tailwind config.**

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Storybook | 8.x | Component development environment | Native `@storybook/nextjs` framework adapter removes Next.js–Storybook config friction; Tailwind works out of the box via `.storybook/preview.js` global CSS import |
| `@storybook/nextjs` | 8.x | Storybook framework adapter | Single adapter replaces older `@storybook/react` + webpack config; handles Next.js Image, Link, font mocking automatically |
| `@storybook/addon-a11y` | 8.x | Accessibility checking in stories | axe-core runs against every story in the Storybook canvas — catch WCAG violations before they reach the app |
| `@storybook/addon-interactions` | 8.x | Play functions for interactive stories | Simulates user interactions in stories so MSW handlers can be exercised without a running app |
| `@storybook/test` | 8.x | Vitest-backed story testing | Stories as component tests — avoids maintaining two separate test suites |

**How to integrate with MomCare Design System tokens:**

The existing design system at `momcaredesignsystemwithcodexnew.vercel.app` uses design tokens. The integration pattern is:

1. Export tokens from the design system package as a Tailwind preset or CSS custom properties.
2. In the app's `tailwind.config.ts`, extend (not replace) the default config with `presets: [momcarePreset]` — this ensures all utility classes use design-system values only.
3. Import the design system's global CSS (custom properties) in both `app/globals.css` AND `.storybook/preview.ts` so token values are available in both environments identically.
4. Never define colors, spacing, typography, radius, or shadows in `tailwind.config.ts` directly — only through the preset.

**What NOT to use:**
- `@storybook/react` (legacy adapter — replaced by `@storybook/nextjs` in Storybook 7+)
- CSS Modules for component styles — the design system uses Tailwind utilities; mixing module scoping creates token leakage
- Styled-components or Emotion — conflicts with Tailwind's utility model; not used by MomCare Design System

**Confidence:** HIGH for Storybook 8 + `@storybook/nextjs`. MEDIUM for specific token integration pattern — depends on how the MomCare Design System exports tokens (inspect the package before implementing).

---

### Mock Data Layer

**Decision: MSW 2.x for network-level mocking + Faker.js for factory functions + JSON fixtures for stable reference data.**

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| MSW (Mock Service Worker) | 2.x | Network-level request interception | Intercepts fetch at the Service Worker level — TanStack Query, form submissions, and any fetch call are automatically mocked without modifying application code; same handlers reused in Storybook and tests |
| `@faker-js/faker` | 8.x | Realistic fake data generation | Generates realistic names, dates, medical-adjacent strings; locale support for non-English contexts |
| `msw-storybook-addon` | 2.x | MSW integration for Storybook | Activates MSW inside Storybook canvas so stories render with realistic API data |

**Mock layer architecture (recommended pattern):**

```
src/
  mocks/
    handlers/          # MSW request handlers, one file per domain
      mothers.ts       # GET /api/mothers, GET /api/mothers/:id, etc.
      visits.ts
      sessions.ts
      notifications.ts
    factories/         # Faker-based entity factories
      motherFactory.ts
      visitFactory.ts
    fixtures/          # Static JSON for stable reference data
      riskLevels.json
      vaccineSchedule.json
    browser.ts         # MSW browser worker setup (used in app + Storybook)
    server.ts          # MSW server setup (used in tests via @testing-library)
    db.ts              # In-memory "database" using msw-data or plain Map
```

**MSW 2.x vs 1.x — key difference:** MSW 2.x uses `http.get()` / `http.post()` instead of `rest.get()`. All handlers must be updated to MSW 2 API. Do not mix MSW 1 and 2 patterns — they are incompatible.

**Next.js App Router + MSW caveat:** MSW's browser worker cannot intercept requests made in React Server Components (RSC) because RSC runs on the server at build/request time, not in the browser. Mitigation: keep data-fetching for mock data in Client Components with TanStack Query. Route Handlers (`app/api/*/route.ts`) can also be used as a thin mock API layer for RSC if needed — these are simple `Response` returns and do not need MSW.

**What NOT to use:**
- `json-server` — adds a running process requirement; MSW is zero-infrastructure
- `axios-mock-adapter` — ties mocking to Axios, not the network layer; won't work with native `fetch`
- Hardcoded mock data directly in components — couples UI to fake data, making the swap to a real API messy

**Confidence:** HIGH for MSW 2.x pattern. MEDIUM for the RSC caveat mitigation — verify the specific Next.js version's RSC behavior before implementation.

---

### Routing Patterns (Next.js App Router)

**Decision: Route groups for logical screen groupings + parallel routes for modals.**

Recommended file structure for 15+ screens:

```
app/
  (auth)/
    login/
      page.tsx
  (onboarding)/
    page.tsx
  (app)/
    layout.tsx          # Shell with nav, bottom tab bar
    dashboard/
      page.tsx
    mothers/
      page.tsx           # Mothers list
      [id]/
        page.tsx         # Mother profile
        medical-history/
          page.tsx
        vaccinations/
          page.tsx
        weight/
          page.tsx
        timeline/
          page.tsx
    schedule/
      page.tsx           # Clinic schedule
      [sessionId]/
        page.tsx         # Session detail
    search/
      page.tsx
    notifications/
      page.tsx
    profile/
      page.tsx
    visits/
      new/
        page.tsx         # Register clinic visit form
    sessions/
      new/
        page.tsx         # Add clinic session form
  @modal/               # Parallel route for confirmation dialogs / quick actions
    (.)mothers/[id]/    # Intercepting route — opens profile as modal from list
```

**Key patterns:**

1. **Route groups `(name)`** — group screens by user flow without affecting the URL. `(auth)` and `(app)` share no layout; `(app)` has the persistent shell layout.
2. **Nested layouts** — the `(app)/layout.tsx` renders once; nested pages inherit it. Avoids remounting the bottom tab bar on every navigation.
3. **Parallel + intercepting routes** — for opening a mother's profile as an overlay from the list without losing list scroll position. This is a mobile UX pattern (sheet/drawer over list).
4. **`loading.tsx` at every level** — App Router's built-in skeleton loading. With TanStack Query + MSW, queries resolve quickly, but adding `loading.tsx` ensures graceful behavior and is trivial to implement.
5. **`error.tsx` at `(app)` level** — single error boundary for the authenticated shell.

**What NOT to use:**
- Pages Router (`pages/` directory) — Do not mix with App Router
- Client-side routing libraries (react-router, tanstack-router) — redundant with App Router; adds bundle weight
- Deep nesting beyond 4 levels — creates maintenance overhead; flatten with parallel routes instead

**Confidence:** HIGH — App Router routing patterns are stable and well-documented as of Next.js 14/15.

---

### Testing Setup

**Decision: Vitest + Testing Library + axe-core + Playwright for E2E.**

| Technology | Version | Purpose | Why |
|------------|---------|---------|-----|
| Vitest | 2.x | Test runner | ESM-native, fast, compatible with Vite-based tooling; `@storybook/test` uses it under the hood |
| `@testing-library/react` | 15.x | Component testing utilities | Queries mimic real user behavior (by role, label, text); forces accessible markup by design |
| `@testing-library/user-event` | 14.x | User interaction simulation | Simulates real browser events (type, click, tab) rather than synthetic fire events |
| `@testing-library/jest-dom` | 6.x | Custom DOM matchers | `toBeInTheDocument()`, `toBeVisible()`, `toHaveRole()` — readable assertions |
| `axe-core` / `jest-axe` | 4.x | Automated accessibility testing | Runs WCAG rules against rendered component output; catches missing labels, contrast issues, ARIA errors |
| `vitest-axe` | latest | axe integration for Vitest | Adapts `jest-axe` matchers for Vitest's expect API |
| Playwright | 1.4x | End-to-end testing | Real browser tests; use for critical flows (login → register visit) and accessibility audits at page level |
| `@axe-core/playwright` | 4.x | axe in Playwright | Full-page accessibility audit during E2E runs — catches issues component tests miss |

**Testing strategy for healthcare UI:**

Healthcare UIs carry an implicit accessibility obligation — WCAG 2.1 AA is a stated requirement. The testing pyramid for this project should be:

1. **Storybook stories as component tests** (majority) — every component has a story; `@storybook/test` runs play functions as tests. MSW handlers active via `msw-storybook-addon`. Covers rendering, interaction, and visual states.

2. **axe-core at component level** — every component story runs `checkA11y` in the `play` function or via a dedicated `Accessibility` story. This catches ARIA issues, missing labels, and color contrast at the source.

3. **Integration tests with Vitest + Testing Library** — for complex form flows (register visit, add session), test the full form lifecycle: fill → validate → submit → success state. MSW `server.ts` provides handlers.

4. **Playwright E2E** — only for critical cross-screen flows and full-page axe audits. Not exhaustive — too slow for a mock-data app with no real backend.

**What NOT to use:**
- Jest — Vitest is the 2025 standard for Next.js/Vite projects; Jest requires additional transform config for ESM and is slower
- Enzyme — Deprecated; not compatible with React 18+
- Cypress for component testing — Playwright supersedes Cypress for E2E; Cypress component testing adds a second testing framework unnecessarily
- Snapshot tests — Brittle for UI components; design system updates break all snapshots without meaningful signal

**Confidence:** HIGH for Testing Library + axe approach. MEDIUM for `vitest-axe` specifically — verify it is actively maintained before adopting; `jest-axe` adapted for Vitest is an alternative.

---

### Zustand State Management Patterns

**Decision: Domain slices with explicit actions, no implicit mutation.**

For a case management app, Zustand should manage only true client state — UI state that does not belong in the server-state layer (TanStack Query).

**Recommended slice structure:**

```typescript
// Store boundary: what Zustand owns vs TanStack Query
// TanStack Query owns: mother records, visit data, session data (server state)
// Zustand owns: UI state — active mother selection, drawer open/close,
//               filter/sort preferences, notification read state,
//               multi-step form wizard state, session search input
```

```typescript
// src/stores/uiStore.ts
interface UIState {
  activeDrawer: 'mother-detail' | 'visit-form' | null;
  drawerMotherID: string | null;
  // Actions as methods on the same object — Zustand 4 pattern
  openMotherDrawer: (id: string) => void;
  closeDrawer: () => void;
}
```

```typescript
// src/stores/filterStore.ts
interface FilterState {
  motherListSearch: string;
  motherListRiskFilter: RiskLevel | 'all';
  setSearch: (q: string) => void;
  setRiskFilter: (r: RiskLevel | 'all') => void;
  reset: () => void;
}
```

**Pattern rules:**
1. One store file per domain concern — never a single mega-store
2. State is flat — no nested objects unless the shape exactly matches the UI
3. Actions are co-located in the same `create()` call — `set` is called only inside actions, never from components directly
4. Use Zustand's `subscribeWithSelector` middleware only if a component needs to subscribe to a specific slice — avoids unnecessary re-renders
5. Persist filter state with `persist` middleware (localStorage) — returning staff should find their last filter intact

**What NOT to use:**
- Redux / Redux Toolkit — massively over-engineered for this use case; Zustand covers it with 1/10th the code
- Jotai / Recoil — atomic model works for fine-grained state but adds complexity without benefit here
- React Context for mutable shared state — causes full subtree re-renders on every state change; only use Context for truly static values (theme token, locale)

**Confidence:** HIGH — Zustand 4 patterns are stable and well-established.

---

### Healthcare and Clinical UI Supporting Libraries

| Library | Version | Purpose | When to Use | Confidence |
|---------|---------|---------|-------------|------------|
| `recharts` | 2.x | Health metrics charts (weight trend, timeline) | Weight & health tracking screen, pregnancy timeline visualization | HIGH |
| `date-fns` | 3.x | Date manipulation | Gestational age calculation, appointment scheduling, timeline display | HIGH |
| `@internationalized/date` | 1.x | Calendar-aware date types | If clinic schedule uses a calendar component from React Aria / shadcn | MEDIUM |
| `react-aria-components` | 1.x | Accessible UI primitives | For any custom interactive widget (datepicker, combobox) not covered by design system | MEDIUM |
| `cmdk` | 1.x | Command palette / search | Global search records screen — keyboard-first search UX | MEDIUM |
| `@tanstack/react-virtual` | 3.x | Virtualized lists | Mothers list if it grows beyond ~200 records; prevents DOM bloat on mobile | MEDIUM |
| `lucide-react` | 0.4x | Icon set | Consistent icon library; tree-shakeable; verify MomCare Design System doesn't prescribe its own icons first | MEDIUM |

**Note on `recharts`:** For a mobile-first healthcare app, charts must be responsive and touch-friendly. Recharts handles `ResponsiveContainer` well. Victory and Nivo are alternatives but heavier. D3 directly is too low-level for this project's scope.

**Confidence:** MEDIUM overall — these are well-supported libraries but adoption depends on what MomCare Design System already provides. Audit the design system package exports before adding any of these.

---

## Alternatives Considered

| Category | Recommended | Alternative | Why Not |
|----------|-------------|-------------|---------|
| Mock layer | MSW 2.x | json-server | Requires running a separate process; MSW is zero-infrastructure |
| Mock layer | MSW 2.x | Hardcoded mock imports | Couples data to components; cannot be reused in Storybook and tests simultaneously |
| Test runner | Vitest | Jest | ESM transform complexity with Next.js 15; slower; Vitest is the 2025 standard |
| E2E testing | Playwright | Cypress | Playwright has better multi-browser support and built-in axe integration |
| Component testing | Storybook + `@storybook/test` | RTL only | Storybook stories serve as living documentation AND tests; avoiding duplication |
| Charts | Recharts | Victory / Nivo | Victory and Nivo are heavier; Recharts is simpler for the chart types needed here |
| State | Zustand | Redux Toolkit | Extreme over-engineering for a UI-state-only use case |
| Date handling | date-fns | dayjs | date-fns v3 is tree-shakeable and TypeScript-first; dayjs requires plugin chaining |
| Routing | Next.js App Router | TanStack Router | TanStack Router is excellent but redundant when App Router already solves the problem |

---

## Installation

```bash
# Core (pre-decided)
npm install next@latest react@latest react-dom@latest typescript tailwindcss
npm install @tanstack/react-query zustand react-hook-form zod @hookform/resolvers

# Design system / Storybook
npm install -D @storybook/nextjs @storybook/addon-a11y @storybook/addon-interactions @storybook/test storybook msw-storybook-addon

# Mock data layer
npm install -D msw @faker-js/faker

# Testing
npm install -D vitest @testing-library/react @testing-library/user-event @testing-library/jest-dom
npm install -D vitest-axe axe-core
npm install -D @playwright/test @axe-core/playwright

# Supporting libraries (add as needed per screen)
npm install recharts date-fns lucide-react @tanstack/react-virtual cmdk
```

**Important:** Run `npx msw init public/` to generate the Service Worker file after installing MSW. This file must be committed to the repository and deployed to the `/public` directory.

---

## Version Verification Note

All versions listed here reflect the ecosystem state as of mid-2025 (training data cutoff). Before installing:

1. Confirm latest stable versions on npmjs.com for: `msw`, `@storybook/nextjs`, `vitest`, `recharts`
2. Check the MSW 2.x migration guide if any existing code uses MSW 1.x patterns (`rest.get` → `http.get`)
3. Verify `@storybook/nextjs` supports the exact Next.js version in `package.json` — major version bumps sometimes lag by 1-2 weeks

---

## Sources

- Training data (August 2025 cutoff) — MSW 2.x API, Storybook 8 `@storybook/nextjs` adapter, Next.js 15 App Router patterns, Zustand 4 slice patterns, TanStack Query 5 conventions
- **External sources could not be accessed in this session** — all claims are MEDIUM confidence unless corroborated by multiple consistent training-data signals, in which case HIGH
- Confidence levels are conservative to reflect inability to verify against live documentation
