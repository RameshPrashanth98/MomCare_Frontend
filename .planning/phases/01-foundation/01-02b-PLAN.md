---
phase: 01-foundation
plan: 02b
type: execute
wave: 2
depends_on: [01-01, 01-02]
files_modified:
  - lib/api/mothers.ts
  - lib/api/visits.ts
  - lib/api/vaccinations.ts
  - lib/api/weight.ts
  - lib/api/sessions.ts
  - lib/api/staff.ts
  - mocks/handlers/mothers.ts
  - mocks/handlers/visits.ts
  - mocks/handlers/vaccinations.ts
  - mocks/handlers/weight.ts
  - mocks/handlers/sessions.ts
  - mocks/handlers/staff.ts
  - mocks/handlers/index.ts
  - mocks/browser.ts
  - mocks/server.ts
  - lib/query/client.ts
  - store/ui.ts
  - app/providers.tsx
  - app/layout.tsx
autonomous: true
requirements: [FOUND-04, FOUND-06, QUAL-04, QUAL-05]

must_haves:
  truths:
    - "Calling listMothers() returns an array of typed Mother objects with realistic data"
    - "TanStack Query is configured as the sole server state cache — Zustand has no entity data"
    - "Zustand store holds only UI state: drawers, filters, session presence"
    - "MSW intercepts all /api/* routes in development and test environments"
  artifacts:
    - path: "lib/api/mothers.ts"
      provides: "REST-shaped API abstraction for mother entities"
      exports: ["listMothers", "getMother", "createMother"]
    - path: "lib/query/client.ts"
      provides: "TanStack Query client configuration"
      exports: ["queryClient"]
    - path: "store/ui.ts"
      provides: "Zustand UI-only store"
      exports: ["useUIStore"]
    - path: "mocks/server.ts"
      provides: "MSW server for Node.js test environment"
      exports: ["server"]
    - path: "mocks/browser.ts"
      provides: "MSW service worker for browser dev environment"
      exports: ["worker"]
    - path: "app/providers.tsx"
      provides: "Client component wrapping QueryClientProvider and MSW init"
      exports: ["Providers"]
  key_links:
    - from: "lib/api/mothers.ts"
      to: "mocks/handlers/mothers.ts"
      via: "MSW intercepts fetch('/api/mothers') in dev and test"
      pattern: "fetch.*api/mothers"
    - from: "mocks/handlers/mothers.ts"
      to: "lib/mock/db.ts"
      via: "Handlers import db and serve data from it"
      pattern: "import.*db"
    - from: "app/layout.tsx"
      to: "app/providers.tsx"
      via: "Root layout wraps children in Providers component"
      pattern: "Providers"
---

<objective>
Create the API abstraction layer (lib/api/*), MSW request handlers, TanStack Query client, Zustand UI store, and wire providers into the root layout.

Purpose: This plan wires up the data serving layer on top of the entity types and mock database created in Plan 01-02. After this plan, components can call lib/api/ functions and receive typed mock data through MSW interception, with TanStack Query managing server state and Zustand holding UI-only state.
Output: Working mock data pipeline: lib/api/ -> MSW handlers -> mock db. TanStack Query + Zustand configured. Providers wired into root layout.
</objective>

<execution_context>
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/PROJECT.md
@.planning/ROADMAP.md
@.planning/STATE.md
@.planning/phases/01-foundation/01-CONTEXT.md
@.planning/phases/01-foundation/01-RESEARCH.md
@.planning/phases/01-foundation/01-01-SUMMARY.md
@.planning/phases/01-foundation/01-02-SUMMARY.md

<interfaces>
<!-- Key types and contracts from Plan 01-02. Executor should use these directly. -->

From lib/types/entities.ts:
```typescript
export type RiskLevel = 'high' | 'medium' | 'low'
export type VaccinationStatus = 'given' | 'due' | 'overdue' | 'not-applicable'
export interface Staff { id: string; name: string; role: 'midwife' | 'doctor' | 'nurse' | 'supervisor'; facility: string; email: string; phone: string; lastLogin: string }
export interface Mother { id: string; name: string; dateOfBirth: string; phone: string; community: string; nationalId: string; riskLevel: RiskLevel; lmpDate: string; edd: string; assignedStaffId: string; assignedClinicId: string; createdAt: string; lastVisitDate: string | null }
export interface Visit { id: string; motherId: string; staffId: string; createdByStaffId: string; date: string; type: 'antenatal' | 'postnatal' | 'emergency' | 'routine'; bloodPressureSystolic: number | null; bloodPressureDiastolic: number | null; weight: number | null; fundalHeight: number | null; fetalHeartRate: number | null; presentingComplaints: string[]; notes: string; outcome: string }
export interface Vaccination { id: string; motherId: string; vaccineId: string; vaccineName: string; doseNumber: number; status: VaccinationStatus; dateGiven: string | null; scheduledDate: string; administeredByStaffId: string | null; createdByStaffId: string; deviationReason: string | null }
export interface WeightRecord { id: string; motherId: string; date: string; weight: number; bloodPressureSystolic: number; bloodPressureDiastolic: number; fundalHeight: number | null; gestationalAgeWeeks: number; gestationalAgeDays: number; createdByStaffId: string }
export interface ClinicSession { id: string; name: string; type: 'antenatal' | 'postnatal' | 'immunization' | 'general'; date: string; startTime: string; endTime: string; location: string; leadClinicianId: string; capacity: number; status: 'upcoming' | 'in-progress' | 'completed' | 'cancelled'; attendeeMotherIds: string[]; notes: string }
```

From lib/mock/db.ts:
```typescript
export const db: { staff: Staff[]; mothers: Mother[]; visits: Visit[]; vaccinations: Vaccination[]; weightRecords: WeightRecord[]; sessions: ClinicSession[] }
```
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Create lib/api/ abstraction functions and MSW handlers</name>
  <files>
    lib/api/mothers.ts, lib/api/visits.ts, lib/api/vaccinations.ts, lib/api/weight.ts,
    lib/api/sessions.ts, lib/api/staff.ts,
    mocks/handlers/mothers.ts, mocks/handlers/visits.ts, mocks/handlers/vaccinations.ts,
    mocks/handlers/weight.ts, mocks/handlers/sessions.ts, mocks/handlers/staff.ts,
    mocks/handlers/index.ts, mocks/browser.ts, mocks/server.ts
  </files>
  <read_first>
    lib/types/entities.ts (entity interfaces — use these types)
    lib/mock/db.ts (in-memory database — handlers serve from this)
    .planning/phases/01-foundation/01-RESEARCH.md (Pattern 4: MSW lib/api, MSW browser init)
  </read_first>
  <action>
    **Part A: Create lib/api/ functions (6 files)**

    Each file exports pure async functions that call `fetch()`. These are the public API contract — components call these, never MSW directly.

    `lib/api/mothers.ts`:
    ```typescript
    import type { Mother } from '@/lib/types/entities'

    export interface ListMothersParams {
      page?: number
      pageSize?: number
      filters?: {
        riskLevel?: 'high' | 'medium' | 'low'
        overdue?: boolean
        assignedStaffId?: string
      }
      search?: string
    }

    export interface ListMothersResponse {
      data: Mother[]
      total: number
      page: number
      pageSize: number
    }

    export async function listMothers(params: ListMothersParams = {}): Promise<ListMothersResponse> {
      const url = new URL('/api/mothers', window.location.origin)
      if (params.page) url.searchParams.set('page', String(params.page))
      if (params.pageSize) url.searchParams.set('pageSize', String(params.pageSize))
      if (params.search) url.searchParams.set('search', params.search)
      if (params.filters?.riskLevel) url.searchParams.set('riskLevel', params.filters.riskLevel)
      if (params.filters?.overdue) url.searchParams.set('overdue', 'true')
      if (params.filters?.assignedStaffId) url.searchParams.set('assignedStaffId', params.filters.assignedStaffId)
      const res = await fetch(url.toString())
      if (!res.ok) throw new Error('Failed to fetch mothers')
      return res.json()
    }

    export async function getMother(id: string): Promise<Mother> {
      const res = await fetch(`/api/mothers/${id}`)
      if (!res.ok) throw new Error(`Failed to fetch mother ${id}`)
      return res.json()
    }

    export async function createMother(data: Omit<Mother, 'id' | 'createdAt' | 'lastVisitDate'>): Promise<Mother> {
      const res = await fetch('/api/mothers', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) })
      if (!res.ok) throw new Error('Failed to create mother')
      return res.json()
    }
    ```

    Follow the same pattern for:
    - `lib/api/visits.ts`: `listVisits({ motherId })`, `getVisit(id)`, `createVisit(data)`
    - `lib/api/vaccinations.ts`: `listVaccinations({ motherId })`, `logVaccination(data)`
    - `lib/api/weight.ts`: `listWeightRecords({ motherId })`, `logWeight(data)`
    - `lib/api/sessions.ts`: `listSessions({ date?, status? })`, `getSession(id)`, `createSession(data)`
    - `lib/api/staff.ts`: `listStaff()`, `getStaffMember(id)`

    **Part B: Create MSW handlers (6 handler files + index)**

    Each handler file in `mocks/handlers/` imports from `@/lib/mock/db` and serves data using MSW v2 `http.get`, `http.post`, and `HttpResponse.json()`.

    `mocks/handlers/mothers.ts`:
    ```typescript
    import { http, HttpResponse } from 'msw'
    import { db } from '@/lib/mock/db'

    export const mothersHandlers = [
      http.get('/api/mothers', ({ request }) => {
        const url = new URL(request.url)
        const page = Number(url.searchParams.get('page') || 1)
        const pageSize = Number(url.searchParams.get('pageSize') || 20)
        const search = url.searchParams.get('search')?.toLowerCase()
        const riskLevel = url.searchParams.get('riskLevel')

        let filtered = [...db.mothers]
        if (search) {
          filtered = filtered.filter(m =>
            m.name.toLowerCase().includes(search) ||
            m.nationalId.toLowerCase().includes(search) ||
            m.phone.includes(search) ||
            m.community.toLowerCase().includes(search)
          )
        }
        if (riskLevel) filtered = filtered.filter(m => m.riskLevel === riskLevel)

        const total = filtered.length
        const data = filtered.slice((page - 1) * pageSize, page * pageSize)
        return HttpResponse.json({ data, total, page, pageSize })
      }),
      http.get('/api/mothers/:id', ({ params }) => {
        const mother = db.mothers.find(m => m.id === params.id)
        if (!mother) return new HttpResponse(null, { status: 404 })
        return HttpResponse.json(mother)
      }),
      http.post('/api/mothers', async ({ request }) => {
        const body = await request.json()
        const newMother = { ...body, id: crypto.randomUUID(), createdAt: new Date().toISOString(), lastVisitDate: null }
        return HttpResponse.json(newMother, { status: 201 })
      }),
    ]
    ```

    Follow the same pattern for visits, vaccinations, weight, sessions, staff.

    `mocks/handlers/index.ts`: Re-export all handlers as a flat array:
    ```typescript
    import { mothersHandlers } from './mothers'
    import { visitsHandlers } from './visits'
    // ... all others
    export const handlers = [...mothersHandlers, ...visitsHandlers, /* ... */]
    ```

    **Part C: Create MSW browser and server entry points**

    `mocks/browser.ts`:
    ```typescript
    import { setupWorker } from 'msw/browser'
    import { handlers } from './handlers'
    export const worker = setupWorker(...handlers)
    ```

    `mocks/server.ts`:
    ```typescript
    import { setupServer } from 'msw/node'
    import { handlers } from './handlers'
    export const server = setupServer(...handlers)
    ```

    Run `npx msw init ./public` to create the service worker file.
  </action>
  <verify>
    <automated>cd "D:/UX projects/MomCare frontend" && npx tsc --noEmit</automated>
  </verify>
  <done>All lib/api/ functions typed and calling fetch(). MSW handlers serve data from lib/mock/db. MSW browser and server entry points created. TypeScript compiles cleanly.</done>
</task>

<task type="auto">
  <name>Task 2: Create TanStack Query client, Zustand UI store, providers component, and wire into root layout</name>
  <files>
    lib/query/client.ts, store/ui.ts, app/providers.tsx, app/layout.tsx
  </files>
  <read_first>
    app/layout.tsx (current state — will be updated to include providers)
    .planning/phases/01-foundation/01-RESEARCH.md (Pattern 6: TanStack+Zustand)
  </read_first>
  <action>
    **Step 1: Create TanStack Query client**

    `lib/query/client.ts`:
    ```typescript
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

    **Step 2: Create Zustand UI store**

    `store/ui.ts` — UI state ONLY, no entity data:
    ```typescript
    import { create } from 'zustand'

    interface UIStore {
      isRegisterMotherOpen: boolean
      isLogVisitOpen: boolean
      activeMotherFilter: 'all' | 'high-risk' | 'overdue' | 'my-patients'
      isAuthenticated: boolean
      setAuthenticated: (v: boolean) => void
      openRegisterMother: () => void
      closeRegisterMother: () => void
      openLogVisit: () => void
      closeLogVisit: () => void
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
      openLogVisit: () => set({ isLogVisitOpen: true }),
      closeLogVisit: () => set({ isLogVisitOpen: false }),
      setMotherFilter: (f) => set({ activeMotherFilter: f }),
    }))
    ```

    **Step 3: Create providers and wire into root layout**

    `app/providers.tsx` (client component):
    ```typescript
    'use client'
    import { QueryClientProvider } from '@tanstack/react-query'
    import { queryClient } from '@/lib/query/client'
    import { useEffect, useState } from 'react'

    export function Providers({ children }: { children: React.ReactNode }) {
      const [ready, setReady] = useState(false)

      useEffect(() => {
        async function init() {
          if (process.env.NODE_ENV === 'development') {
            const { worker } = await import('@/mocks/browser')
            await worker.start({ onUnhandledRequest: 'bypass' })
          }
          setReady(true)
        }
        init()
      }, [])

      if (!ready && process.env.NODE_ENV === 'development') {
        return null // Wait for MSW to start before rendering
      }

      return (
        <QueryClientProvider client={queryClient}>
          {children}
        </QueryClientProvider>
      )
    }
    ```

    Update `app/layout.tsx` to wrap children with `<Providers>`:
    ```typescript
    import { Providers } from './providers'
    // In the body:
    <Providers>{children}</Providers>
    ```

    Keep layout.tsx as a server component. The `Providers` component is the client boundary.
  </action>
  <verify>
    <automated>cd "D:/UX projects/MomCare frontend" && npx tsc --noEmit && npm run build</automated>
  </verify>
  <done>TanStack Query client configured with 5-min staleTime. Zustand store holds UI-only state (no entity data). Providers component wraps QueryClientProvider and initializes MSW in dev mode. Root layout updated to use Providers. Build passes.</done>
</task>

</tasks>

<verification>
1. `npx tsc --noEmit` passes — all types are correct
2. `npm run build` passes — Next.js can build the full app
3. `npm run lint` passes — no ESLint violations
4. lib/api/ functions are typed and call fetch()
5. MSW handlers intercept all /api/* routes with data from lib/mock/db
6. store/ui.ts contains NO entity data (no "mothers", "visits", or "Mother[]")
7. app/layout.tsx wraps children in Providers
</verification>

<success_criteria>
- All lib/api/ functions are typed and call fetch() — same signature works for mock and real API
- MSW handlers intercept all /api/* routes with data from lib/mock/db
- TanStack Query owns server state; Zustand owns UI state only
- Providers wired into root layout; MSW starts automatically in dev mode
- npm run build passes
</success_criteria>

<output>
After completion, create `.planning/phases/01-foundation/01-02b-SUMMARY.md`
</output>
