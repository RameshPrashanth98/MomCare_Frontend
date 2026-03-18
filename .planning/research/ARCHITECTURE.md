# Architecture Patterns

**Domain:** Mobile-first maternal health case management frontend
**Project:** MomCare Frontend
**Researched:** 2026-03-18
**Next.js version context:** v16 (App Router, proxy.ts replaces middleware.ts)

---

## Recommended Architecture

The MomCare frontend is a **client-heavy, read-mostly SPA shell** built on Next.js App Router. Because there is no real backend in v1, the architecture is deliberately shaped around three axes:

1. **Route hierarchy** — clear separation of auth, onboarding, and main-app shells via route groups
2. **State ownership** — strict boundary between mock server state (TanStack Query) and ephemeral UI state (Zustand)
3. **Design system boundary** — a hard wall between the external MomCare Design System and app-level composition code

---

## Folder and File Structure

The project uses a `src/` root with feature-split colocation. The `app/` directory is routing-only; shared code lives in `src/` siblings.

```
momcare-frontend/
├── src/
│   ├── app/                          # Next.js App Router — routing only
│   │   ├── layout.tsx                # Root HTML shell (fonts, providers)
│   │   ├── (onboarding)/             # Route group — no auth required, no app chrome
│   │   │   ├── layout.tsx            # Splash/onboarding layout (full-bleed)
│   │   │   └── onboarding/
│   │   │       └── page.tsx
│   │   ├── (auth)/                   # Route group — unauthenticated users
│   │   │   ├── layout.tsx            # Minimal centered layout
│   │   │   └── login/
│   │   │       └── page.tsx
│   │   ├── (app)/                    # Route group — authenticated, main shell
│   │   │   ├── layout.tsx            # App shell: bottom nav + top bar
│   │   │   ├── @modal/               # Parallel slot for modal overlays
│   │   │   │   ├── default.tsx       # Returns null (modal inactive)
│   │   │   │   └── [...catchAll]/
│   │   │   │       └── page.tsx      # Returns null (closes modal on nav)
│   │   │   ├── (overview)/
│   │   │   │   ├── loading.tsx       # Dashboard-specific skeleton
│   │   │   │   └── page.tsx          # /  → Dashboard
│   │   │   ├── notifications/
│   │   │   │   └── page.tsx          # /notifications
│   │   │   ├── mothers/
│   │   │   │   ├── page.tsx          # /mothers — mothers list
│   │   │   │   └── [id]/
│   │   │   │       ├── page.tsx      # /mothers/[id] — mother profile
│   │   │   │       ├── medical-history/
│   │   │   │       │   └── page.tsx  # /mothers/[id]/medical-history
│   │   │   │       ├── vaccinations/
│   │   │   │       │   └── page.tsx  # /mothers/[id]/vaccinations
│   │   │   │       ├── weight/
│   │   │   │       │   └── page.tsx  # /mothers/[id]/weight
│   │   │   │       └── timeline/
│   │   │   │           └── page.tsx  # /mothers/[id]/timeline
│   │   │   ├── schedule/
│   │   │   │   ├── page.tsx          # /schedule — clinic schedule
│   │   │   │   └── [sessionId]/
│   │   │   │       └── page.tsx      # /schedule/[sessionId] — session detail
│   │   │   ├── search/
│   │   │   │   └── page.tsx          # /search — global search
│   │   │   └── profile/
│   │   │       └── page.tsx          # /profile — staff profile
│   │   └── not-found.tsx
│   │
│   ├── components/                   # App-level composition components
│   │   ├── layout/                   # App chrome (BottomNav, TopBar, AppShell)
│   │   ├── mothers/                  # Mother-domain UI: MomCard, RiskBadge, etc.
│   │   ├── schedule/                 # Schedule-domain UI: SessionCard, etc.
│   │   ├── forms/                    # Form compositions: RegisterVisitForm, etc.
│   │   ├── charts/                   # Data viz: WeightChart, TimelineChart
│   │   └── shared/                   # Cross-domain: EmptyState, LoadingSkeleton, etc.
│   │
│   ├── lib/                          # Pure logic, no JSX
│   │   ├── mock/                     # Mock data layer (see Mock Data section)
│   │   │   ├── seed.ts               # Master seed — all entities
│   │   │   ├── factories/
│   │   │   │   ├── mother.factory.ts
│   │   │   │   ├── visit.factory.ts
│   │   │   │   ├── clinic.factory.ts
│   │   │   │   └── schedule.factory.ts
│   │   │   └── db.ts                 # In-memory "database" (Map-based store)
│   │   ├── query/                    # TanStack Query infrastructure
│   │   │   ├── keys.ts               # All query key factories
│   │   │   ├── client.ts             # QueryClient singleton config
│   │   │   └── hooks/                # Per-domain hooks
│   │   │       ├── useMothers.ts
│   │   │       ├── useVisits.ts
│   │   │       └── useSchedule.ts
│   │   ├── store/                    # Zustand stores (slices pattern)
│   │   │   ├── index.ts              # Combined store export
│   │   │   ├── slices/
│   │   │   │   ├── auth.slice.ts     # Session: current staff user
│   │   │   │   ├── ui.slice.ts       # UI state: active nav, sheet open/closed
│   │   │   │   └── search.slice.ts   # Search: query string, filters
│   │   ├── schemas/                  # Zod schemas (shared with forms + mock data)
│   │   │   ├── mother.schema.ts
│   │   │   ├── visit.schema.ts
│   │   │   ├── clinic.schema.ts
│   │   │   └── schedule.schema.ts
│   │   └── utils/                    # Pure helpers: formatDate, riskLevel, etc.
│   │
│   ├── types/                        # TypeScript interfaces (domain types)
│   │   ├── mother.types.ts
│   │   ├── visit.types.ts
│   │   ├── clinic.types.ts
│   │   └── ui.types.ts
│   │
│   └── styles/
│       └── globals.css               # Tailwind base + design token CSS vars import
│
├── public/
├── proxy.ts                          # Auth guard: redirects to /login (Next.js v16)
├── tailwind.config.ts                # Token bridge: maps design system CSS vars
├── next.config.ts
└── tsconfig.json
```

---

## Component Boundaries

Each boundary has a single owner and a defined direction of communication.

| Component Layer | Responsibility | Receives From | Sends To |
|-----------------|----------------|---------------|----------|
| **Page** (`app/.../page.tsx`) | Route entry point. Composes feature sections. Server component unless interactive. | Route params, search params | Screen-level components via props |
| **Screen component** (`components/[domain]/`) | Orchestrates a screen's data needs and layout. Calls query hooks. Client component. | TanStack Query hooks, Zustand selectors | Presentational components via props |
| **Form component** (`components/forms/`) | Owns a complete form: schema, validation, submission handler. Uses React Hook Form + Zod. | Props (initial data, onSuccess callback) | Mutation hook, parent via callback |
| **Presentational component** | Renders data. No data fetching. No global state. | Props only | Parent via callback props |
| **Design system component** (external import) | UI primitives: Button, Input, Card, Badge. Consumes design tokens. | Props only | Nothing (terminal) |
| **Query hook** (`lib/query/hooks/`) | Wraps TanStack Query `useQuery`/`useMutation`. Owns fetch logic and cache key. | Mock data layer via `lib/mock/db.ts` | Screen components |
| **Zustand slice** (`lib/store/slices/`) | Holds ephemeral client state (session, UI flags, search). | `proxy.ts` (auth), user interaction | Any component via `useStore` |
| **Mock DB** (`lib/mock/db.ts`) | In-memory data store. Simulates latency. Returns typed domain objects. | Factories at boot | Query hooks (replaces API client) |
| **Proxy** (`proxy.ts`) | Guards routes. Redirects unauthenticated users to `/login`. | Cookie/session token | NextResponse redirect |

### Communication Rules

- Pages do NOT call query hooks directly — they delegate to screen-level client components.
- Screen components do NOT directly import `lib/mock/db.ts` — they go through query hooks only.
- Query hooks do NOT touch Zustand — they are stateless except for TanStack Query cache.
- Presentational components never call `useStore` — all data arrives via props.
- Design system components are never extended or subclassed — they are composed.

---

## Route Grouping and Layout Hierarchy

Three route groups create three distinct layout shells. Navigation between groups triggers a full-page reload (this is expected and desirable for auth transitions).

```
Root layout (app/layout.tsx)
  Providers: QueryClientProvider, ZustandProvider, ThemeProvider
  Fonts, global CSS

  ├── (onboarding)/layout.tsx
  │     Full-bleed splash layout, no navigation
  │     └── /onboarding → onboarding screens
  │
  ├── (auth)/layout.tsx
  │     Centered card layout, no app chrome
  │     └── /login → login screen
  │
  └── (app)/layout.tsx
        App shell: TopBar + BottomNav + main content area
        @modal slot: parallel route for modal overlays
        │
        ├── / (dashboard — wrapped in (overview) sub-group for scoped loading.tsx)
        ├── /notifications
        ├── /mothers
        ├── /mothers/[id]
        ├── /mothers/[id]/medical-history
        ├── /mothers/[id]/vaccinations
        ├── /mothers/[id]/weight
        ├── /mothers/[id]/timeline
        ├── /schedule
        ├── /schedule/[sessionId]
        ├── /search
        └── /profile
```

### Modal Overlays (Register Visit, Add Session)

Form flows that feel like modals (Register Visit, Add Clinic Session) use parallel routes + intercepting routes. This preserves the background page in the URL and supports back navigation.

```
(app)/
├── @modal/
│   ├── default.tsx                          # null — modal slot inactive
│   ├── [...catchAll]/page.tsx               # null — clears slot on navigation away
│   └── (.)mothers/[id]/register-visit/
│       └── page.tsx                         # Renders <Modal><RegisterVisitForm /></Modal>
├── mothers/
│   └── [id]/
│       └── register-visit/
│           └── page.tsx                     # Full-page fallback (direct URL / refresh)
```

When staff taps "Register Visit" from `/mothers/123`, the `@modal` slot intercepts and shows the form as a sheet modal. Back navigation closes the modal without losing the mother profile. Refreshing `/mothers/123/register-visit` renders the standalone page.

---

## Data Flow

```
Mock DB (lib/mock/db.ts)
  └── seeded at app boot from factories (mother.factory.ts, etc.)
  └── simulates async latency (50-200ms delay)
  └── returns typed entities

TanStack Query hooks (lib/query/hooks/)
  └── useQuery: reads from mock DB, caches in QueryClient
  └── useMutation: writes to mock DB, invalidates relevant cache keys
  └── loading/error states propagated to screen components

Screen components (components/[domain]/)
  └── read from query hooks and Zustand (UI state)
  └── render presentational trees
  └── pass handlers down to forms and actions

Forms (components/forms/)
  └── React Hook Form + zodResolver
  └── on submit → useMutation hook → mock DB write → cache invalidation
  └── success callback → navigate or close modal

Zustand store (lib/store/)
  └── auth.slice: current staff user (set after "login" mock)
  └── ui.slice: bottom nav active tab, sheet/modal open states, toast queue
  └── search.slice: global search query string and active filters

proxy.ts
  └── reads session cookie
  └── redirects /app/* to /login if no session
  └── redirects /login to / if session exists
```

### Data Directional Rule

Mock DB → Query hooks → Screen components → Presentational components (downward only).
Forms mutate back up through query mutation hooks, never directly writing to Zustand.
Zustand is for client-only concerns that are NOT domain data.

---

## Mock Data Layer Architecture

The mock layer is structured to be a drop-in swap point: when a real API ships, only `lib/mock/db.ts` and query hook fetch functions change. Schemas, types, and hooks stay the same.

### Entity Model

```typescript
// Core entities — all linked by ID
Mother           — id, name, age, riskLevel, assignedClinicId, pregnancyStage
Visit            — id, motherId, clinicId, sessionId, date, notes, vitalSigns
ClinicSession    — id, clinicId, date, slots, attendees[]
Clinic           — id, name, location, staffIds[]
VaccinationRecord — id, motherId, vaccineType, date, dueDate, status
WeightRecord     — id, motherId, date, weightKg, notes
StaffUser        — id, name, role, clinicId, avatarUrl
```

### Factory Pattern

Each factory generates realistic data using deterministic seeds so test runs are reproducible.

```typescript
// lib/mock/factories/mother.factory.ts
export function createMother(overrides?: Partial<Mother>): Mother {
  return {
    id: uuid(),
    name: faker.person.fullName(),
    age: faker.number.int({ min: 18, max: 42 }),
    riskLevel: weightedRisk(),        // low: 60%, medium: 30%, high: 10%
    pregnancyStage: randomStage(),    // trimester-aware
    assignedClinicId: '...',
    ...overrides,
  }
}
```

### In-Memory DB

```typescript
// lib/mock/db.ts
const db = {
  mothers: new Map<string, Mother>(),
  visits: new Map<string, Visit>(),
  sessions: new Map<string, ClinicSession>(),
  clinics: new Map<string, Clinic>(),
  // ...
}

// Simulated async read
export async function getMother(id: string): Promise<Mother | null> {
  await delay(80)
  return db.mothers.get(id) ?? null
}
```

### Query Key Factory

All cache keys are centralized to prevent stale-data bugs from key typos.

```typescript
// lib/query/keys.ts
export const queryKeys = {
  mothers: {
    all: () => ['mothers'] as const,
    list: (filters?: MotherFilters) => ['mothers', 'list', filters] as const,
    detail: (id: string) => ['mothers', 'detail', id] as const,
  },
  visits: {
    all: () => ['visits'] as const,
    byMother: (motherId: string) => ['visits', 'byMother', motherId] as const,
  },
  schedule: {
    all: () => ['schedule'] as const,
    session: (id: string) => ['schedule', 'session', id] as const,
  },
}
```

---

## Zustand Store Structure

The store uses the slices pattern. Each slice is a pure function that receives `set` and `get` and returns its state + actions. Slices are merged at `lib/store/index.ts`.

### What Goes in Zustand vs TanStack Query

| Concern | Owner | Rationale |
|---------|-------|-----------|
| Mother list data | TanStack Query | Server-origin data, should be cached and invalidated |
| Visit records | TanStack Query | Domain data, needs cache invalidation on mutation |
| Current staff session (user ID, name) | Zustand | Set once at login, persists for app session |
| Active bottom nav tab | Zustand | Pure UI state, no server equivalent |
| Sheet/modal open state | Zustand | Ephemeral UI flag |
| Search query string | Zustand | Typed by user, drives query params into TanStack Query |
| Toast/notification queue | Zustand | Client-only feedback mechanism |
| Form draft state | React Hook Form local state | Never needs to be global |
| Loading states for fetches | TanStack Query | Built-in — do not duplicate in Zustand |

### Slices

```typescript
// auth.slice.ts
interface AuthSlice {
  currentUser: StaffUser | null
  setCurrentUser: (user: StaffUser) => void
  clearSession: () => void
}

// ui.slice.ts
interface UISlice {
  activeNavTab: NavTab
  setActiveNavTab: (tab: NavTab) => void
  toastQueue: Toast[]
  addToast: (toast: Toast) => void
  dismissToast: (id: string) => void
}

// search.slice.ts
interface SearchSlice {
  searchQuery: string
  setSearchQuery: (q: string) => void
  activeFilters: MotherFilters
  setFilters: (f: MotherFilters) => void
  clearSearch: () => void
}
```

---

## Design Token Consumption Pattern

The MomCare Design System exposes tokens as CSS custom properties (CSS variables). Tailwind is configured to consume those variables, creating a single source of truth that prevents style drift.

### Bridge Pattern

```typescript
// tailwind.config.ts
export default {
  theme: {
    extend: {
      colors: {
        // Map design system CSS vars to Tailwind utilities
        primary:    'var(--color-primary)',
        secondary:  'var(--color-secondary)',
        surface:    'var(--color-surface)',
        'on-surface': 'var(--color-on-surface)',
        error:      'var(--color-error)',
        success:    'var(--color-success)',
        warning:    'var(--color-warning)',
        // Risk levels
        'risk-high':   'var(--color-risk-high)',
        'risk-medium': 'var(--color-risk-medium)',
        'risk-low':    'var(--color-risk-low)',
      },
      spacing: {
        // Map design system spacing scale
        'ds-1': 'var(--spacing-1)',
        'ds-2': 'var(--spacing-2)',
        // ...
      },
      borderRadius: {
        'ds-sm': 'var(--radius-sm)',
        'ds-md': 'var(--radius-md)',
        'ds-lg': 'var(--radius-lg)',
        'ds-full': 'var(--radius-full)',
      },
    },
  },
}
```

### Rule: No Hardcoded Values

App-level components MUST NOT use raw Tailwind color classes (`bg-blue-500`, `text-red-600`). They MUST use design-token-mapped classes (`bg-primary`, `text-error`). This is enforced by code review; a lint rule can be added later.

Design system components are used as-is from the import — they carry their own token-aware styles.

---

## Navigation Patterns (Mobile-First)

### Bottom Navigation

The `(app)` layout renders a persistent `BottomNav` component with 4-5 tabs (Dashboard, Mothers, Schedule, Search, Profile). Built using design system primitives. Active state from `ui.slice.ts`.

### Stack Navigation (within a domain)

Standard Next.js `<Link>` navigation. Mother profile → Medical History → individual record forms a stack. Back navigation via browser native back or an explicit "back" button using `useRouter().back()`.

### Sheet Modal Pattern

Heavy form flows (Register Visit, Add Clinic Session) render as bottom sheets on mobile — a design system Sheet component triggered by navigation to a parallel route. The `@modal` parallel slot handles this. On desktop the same route renders as a centered dialog.

### Screen Transition Strategy

No custom animation library in v1. CSS transitions via design system components are sufficient. Do not add Framer Motion unless wireframes explicitly require animated transitions.

---

## Scalability Considerations

| Concern | At Current Scope (mock) | At Real API Integration | At Scale |
|---------|------------------------|------------------------|----------|
| Data fetching | Mock DB with simulated delay | Swap `db.ts` fetch functions for real API calls — hooks unchanged | Add pagination, cursor-based infinite scroll in query hooks |
| Auth | Cookie checked in proxy.ts; mock session set in Zustand | Replace mock session with real JWT/session cookie | No structural change — proxy guards remain |
| State | Zustand slices sufficient | Add persist middleware for session slice | Consider per-route store subscriptions to avoid re-renders |
| Forms | RHF + Zod local to forms | Add server validation error mapping | No structural change |
| Design system | Token CSS vars | No change | No change unless design system versions change |

---

## Suggested Build Order

This order minimizes blocking dependencies. Each phase can begin as soon as its prerequisite is complete.

### Dependency Graph

```
Foundation (tokens, mock DB, query client, store)
  → App shell (root layout, route groups, bottom nav, proxy)
    → Auth screens (login page, session mock)
      → Home/Dashboard
        → Mothers list
          → Mother profile
            → Sub-screens (medical, vaccinations, weight, timeline) [can parallelize]
            → Register visit form (modal pattern)
      → Notifications
      → Search
      → Schedule
        → Session detail
        → Add session form (modal pattern)
      → User profile
```

### Phase Implications for Roadmap

| Phase | What It Unlocks | Prerequisite |
|-------|-----------------|--------------|
| 1. Foundation | Mock DB + query infrastructure + store + token bridge | None |
| 2. App Shell | Navigation chrome, route groups, proxy auth guard | Foundation |
| 3. Auth + Onboarding | Login screen, onboarding flow, session in Zustand | App Shell |
| 4. Dashboard | First main screen, establishes screen component pattern | Auth |
| 5. Mothers List + Profile | Core data entity pattern, query hooks for mothers | Dashboard |
| 6. Mother Sub-screens | Reuse mother query hooks; can parallelize 4 screens | Mother Profile |
| 7. Schedule | Separate entity domain; parallelize with Mother Sub-screens | App Shell |
| 8. Forms (Register Visit, Add Session) | Modal pattern; requires mother + schedule screens to be meaningful | Mother Profile + Schedule |
| 9. Search | Cross-domain; requires mothers + schedule data in mock DB | Mothers + Schedule |
| 10. Notifications + Profile | Low-dependency; can deliver any time after Dashboard | Auth |

---

## Anti-Patterns to Avoid

### Anti-Pattern 1: Fetching in page.tsx Server Components
**What:** Calling `db.ts` directly in a `page.tsx` server component for mock data.
**Why bad:** Creates a server-client coupling that breaks when migrating to real API. Also bypasses TanStack Query cache, making optimistic updates impossible.
**Instead:** Pages are thin — they render a client screen component. The screen component calls the query hook.

### Anti-Pattern 2: Storing Domain Data in Zustand
**What:** Putting mother records or visit lists in Zustand store.
**Why bad:** Duplicates TanStack Query cache; creates stale data bugs; manual invalidation is error-prone.
**Instead:** Domain data lives exclusively in TanStack Query cache. Zustand holds only session + UI state.

### Anti-Pattern 3: One Root Layout for All Experiences
**What:** A single `app/layout.tsx` that conditionally renders app chrome based on route.
**Why bad:** Leads to conditional rendering spaghetti; auth screens inherit app chrome styles; harder to test independently.
**Instead:** Route groups with separate layout files — `(auth)/layout.tsx`, `(app)/layout.tsx`.

### Anti-Pattern 4: Hardcoding Tailwind Color Classes
**What:** Using `bg-purple-600` or `text-gray-700` in app components.
**Why bad:** Bypasses design system tokens; creates visual inconsistency and makes design system updates non-propagating.
**Instead:** Use only design-token-mapped utilities (`bg-primary`, `text-on-surface`).

### Anti-Pattern 5: Prop-Drilling Query Results Through Multiple Component Layers
**What:** Fetching in a parent and passing deeply through children as props.
**Why bad:** Tight coupling, unnecessary re-renders, hard to maintain as screens grow.
**Instead:** Screen-level components are client components that call query hooks directly. Pass only the data each child needs.

### Anti-Pattern 6: Using middleware.ts (deprecated in Next.js v16)
**What:** Creating a `middleware.ts` file for the auth proxy.
**Why bad:** Next.js v16 has renamed `middleware` to `proxy`. The old file convention is deprecated.
**Instead:** Use `proxy.ts` at the project root with a `proxy()` named export.

---

## Sources

- Next.js App Router project structure (official docs, v16.1.7, 2026-03-16): https://nextjs.org/docs/app/getting-started/project-structure
- Next.js Route Groups (official docs, v16.1.7, 2026-03-16): https://nextjs.org/docs/app/api-reference/file-conventions/route-groups
- Next.js Intercepting Routes (official docs, v16.1.7, 2026-03-16): https://nextjs.org/docs/app/api-reference/file-conventions/intercepting-routes
- Next.js Parallel Routes (official docs, v16.1.7, 2026-03-16): https://nextjs.org/docs/app/api-reference/file-conventions/parallel-routes
- Next.js Proxy (formerly middleware, official docs, v16.1.7, 2026-03-16): https://nextjs.org/docs/app/api-reference/file-conventions/proxy
- MomCare Design System: https://momcaredesignsystemwithcodexnew.vercel.app/?path=/docs/momcare-design-system-foundations-overview--docs
- TanStack Query v5 query keys — MEDIUM confidence (verified via training knowledge; official doc access restricted during research session)
- Zustand slices pattern — MEDIUM confidence (verified via training knowledge; official doc access restricted during research session)
