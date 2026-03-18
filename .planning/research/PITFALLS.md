# Domain Pitfalls

**Domain:** Mobile-first healthcare case management frontend
**Project:** MomCare Frontend
**Researched:** 2026-03-18
**Confidence:** HIGH (Next.js and Tailwind from official docs, March 2026; design system and state management from deep domain knowledge)

---

## Critical Pitfalls

Mistakes that cause rewrites, cascading rework, or break the entire constraint model of the project.

---

### Pitfall 1: Design Token Bypass via Tailwind Arbitrary Values

**What goes wrong:** Developers use Tailwind's square-bracket arbitrary value syntax (`text-[14px]`, `bg-[#e8f4f8]`, `p-[12px]`) to work around the MomCare Design System's token set. This happens most often when a wireframe calls for a value that isn't obviously in the token set, or when a developer is moving fast and can't quickly find the correct token name. Over time, arbitrary values accumulate — the design system constraint erodes silently, visual inconsistency grows, and there is no single source of truth for any color or spacing value.

**Why it happens:** Tailwind's arbitrary value escape hatch is always available. There is no build-time enforcement unless you explicitly configure it. Developers new to the project assume "close enough" pixel values are fine. Without a linter rule blocking arbitrary values, drift is invisible until you do a visual audit.

**Consequences:** By screen 8 of 16, the app has ~40 hardcoded values scattered across components. Retheme is impossible. WCAG contrast ratios become unpredictable because colors were chosen by eye not from the accessible token palette. Token migration effort exceeds original implementation cost.

**Prevention:**
- Configure `tailwindcss-plugin-no-arbitrary-values` or write an ESLint rule that errors on `class` attributes matching `\[.*\]` patterns that don't map to CSS variables
- In `tailwind.config.ts`, set `theme.extend` only — never override the default palette directly — and map all MomCare design tokens to Tailwind theme values explicitly so every token has a class name equivalent
- Add a CI check: grep the build output for inline hex values or pixel sizes as a smoke test
- Treat any arbitrary value in a PR as a blocking review comment unless there is a written justification that the token does not exist in the system

**Warning signs:** `[#`, `px]`, `[0.` appearing in `className` strings; a developer asks "what's the token for X?" and then uses an arbitrary value when they can't find it in 30 seconds.

**Phase that must address it:** Phase 1 (project scaffolding / design system integration). If this is not locked in before the first screen, it cannot be retrofitted without touching every component.

---

### Pitfall 2: WCAG Color Contrast Failures Discovered Late

**What goes wrong:** The design system's token set is used correctly, but certain token combinations — particularly secondary text on light backgrounds, placeholder text in form fields, disabled state labels, status badge text on tinted backgrounds (e.g. "High Risk" badge), and chart axis labels — fail WCAG 2.1 AA's 4.5:1 ratio for normal text or 3:1 for large text/UI components. These are discovered during an accessibility audit in a late phase, requiring systematic color changes across already-built screens.

**Why it happens:** Designers specify tokens by semantic meaning ("use the muted foreground color") without verifying the computed contrast ratio in every context where that token is used. The design system documents tokens individually but not every combination. Placeholder text is the most common failure: CSS `::placeholder` has a separate color from input text and is not always audited.

**Consequences:** Late-phase color changes cascade across 16 screens. If tokens are used correctly (not arbitrary values), the fix is a token update plus testing, not a rewrite — but only if the token model is clean. If arbitrary values were used, each instance must be hunted individually.

**Prevention:**
- During the design system integration phase, build a contrast matrix: for every foreground token and every background token that will be used in combination, compute and document the ratio. Flag any combination below 4.5:1 before a single screen is built
- For healthcare forms specifically: audit placeholder text (`color-mix` or explicit placeholder token), disabled field text, and error message text on colored backgrounds
- Use `eslint-plugin-jsx-a11y` from day one — it catches a subset of issues at the component level
- Add axe-core (via `@axe-core/react` in development) to surface runtime contrast violations during development, not at audit time

**Warning signs:** Relying on "the design system is accessible" without personally verifying each token combination; building status badges (High/Medium/Low risk) without checking badge background + text ratio; using the same disabled text token in dark and light contexts.

**Phase that must address it:** Phase 1 for token matrix. Each screen phase should include a `axe-core` pass before marking the screen complete.

---

### Pitfall 3: Mock Data Architecture That Blocks Real API Integration

**What goes wrong:** Mock data is implemented as static JSON files imported directly into components (`import mothers from '../data/mothers.json'`). Each screen imports its own subset of data. Some screens derive computed values (e.g. risk level from raw health metrics) directly in the component. When a real API is integrated, every import site must be found and replaced, computed logic must be moved to the API layer, and there is no consistent contract to swap against.

**Why it happens:** Static imports are the path of least resistance. It works immediately and requires no infrastructure. The cost only becomes visible when API integration begins.

**Consequences:** API integration is not a "replace the mock" operation but a partial rewrite of data access logic across 16 screens. Type mismatches emerge because the mock schema was never formally defined. Computed fields that the real API returns as server-side values were being computed in the frontend, creating duplicate logic.

**Prevention:**
- Define a `lib/api/` layer on day one that all screens call through, even if the implementation is just `return mockData`. The signature of every function should match what a real API endpoint would expose: `getMothers(filters, pagination)`, `getMother(id)`, `getVisitsByMother(motherId)` etc.
- Define TypeScript interfaces for every entity (Mother, Visit, ClinicSession, VaccinationRecord, WeightEntry) in a `types/` directory before building any screen. These interfaces are the integration contract. Mock data must satisfy these types.
- Use TanStack Query even against mock data, with a mock fetcher function. When the real API arrives, only the fetcher changes — the query keys, caching config, and component consumption patterns stay identical
- Never compute derived fields (e.g. risk category from health metrics) in components or mock data factories — put them in `lib/transforms/` so both mock and real API paths run through the same derivation logic

**Warning signs:** `import data from '../../mock/mothers.json'` directly in a page component; mock data has `riskLevel: "High"` as a string literal computed nowhere, meaning the API will need to match this exact string or the component breaks; different screens have different shapes for the same entity.

**Phase that must address it:** Phase 1 (mock data layer design). The structure must be established before any screen is built.

---

### Pitfall 4: "use client" Overuse Destroying Server Component Benefits

**What goes wrong:** Developers mark entire page-level components or large layout sections as `'use client'` to use a hook (e.g. TanStack Query's `useQuery`, Zustand's `useStore`, or a simple `useState`). This pulls the entire component tree into the client bundle, eliminating server rendering benefits for the entire route. In a 16-screen app, this pattern applied consistently produces a SPA bundled as if it were Pages Router — large initial bundle, no streaming, no server-side data proximity.

**Why it happens:** The mental model from Pages Router (`getServerSideProps` / `getStaticProps`) doesn't translate to App Router. Developers default to making every component a Client Component because it "just works" and avoids the constraint of thinking about server/client boundaries.

**Consequences:** Bundle size grows 30–60% compared to a correctly partitioned app. Initial load performance on mobile (the primary platform for this app) degrades. For healthcare staff on clinic networks with inconsistent connectivity, this is meaningful.

**Prevention:**
- Establish a rule: a page's outer shell (`page.tsx`) is a Server Component by default. It fetches data and passes it as props. Only leaf components that need interactivity get `'use client'`
- For TanStack Query in this project: since data is mock (no real network request), consider loading data in Server Components and passing it as props rather than using client-side queries for the mock phase. This preserves the correct architecture for when real APIs arrive
- For Zustand stores: access them only in components that are already Client Components. Never import Zustand in a Server Component
- Add a comment policy: every `'use client'` directive must be accompanied by a comment explaining why (e.g. `// uses useSearchParams for filter state`)

**Warning signs:** `'use client'` at the top of `app/mothers/page.tsx`; a layout file with `'use client'` because one child component needed `onClick`; TanStack Query `useQuery` called in a component that does no rendering of its own.

**Phase that must address it:** Phase 1 (architecture decisions). Must be documented in a component authoring guide before screen implementation begins.

---

### Pitfall 5: TanStack Query + Zustand State Duplication

**What goes wrong:** The same data exists in two places simultaneously: TanStack Query's cache (the server-state truth) and a Zustand store (a client-state copy). For example, the selected mother's record is fetched via `useQuery('mother', fetchMother)` and also stored in `useMotherStore().currentMother`. Components read from different sources and show different values. When data updates, one cache invalidates but the other doesn't.

**Why it happens:** TanStack Query and Zustand have different intended jobs, but the boundary is blurry. Developers reach for Zustand when they need to "share data between components" — even when that data came from the server and TanStack Query already manages it.

**Consequences:** Stale data visible to users in adjacent components. Debugging is extremely difficult because the same entity has two representations with different update lifecycles. Forms that pre-fill from Zustand state show stale data after the server updates.

**Prevention:**
- Enforce a strict mental model: TanStack Query owns all server-derived data. Zustand owns only pure client-side UI state that has no server representation: sidebar open/closed state, active filter selections, multi-step form wizard step number, notification panel open state
- Never copy a TanStack Query result into a Zustand store. If two components need the same server data, both should call `useQuery` with the same query key — TanStack Query deduplicates the request automatically
- For the mother profile and case management screens: the mother record, visit history, and health metrics all live in TanStack Query. The "currently active tab" on the profile screen lives in Zustand (or local component state)
- Write a one-page "state ownership" document at project start that explicitly lists which data belongs to which layer

**Warning signs:** `useEffect(() => { setCurrentMother(data) }, [data])` where `data` comes from `useQuery`; a Zustand store with fields that look like API response shapes (e.g. `motherStore.medicalHistory`); form default values read from `store.mother` instead of `query.data`.

**Phase that must address it:** Phase 1 (state architecture). The state ownership model must be established before TanStack Query and Zustand are first used together.

---

## Moderate Pitfalls

Mistakes that cause visible problems and require non-trivial rework but do not require full rewrites.

---

### Pitfall 6: Mobile Overflow and Horizontal Scroll on Healthcare Forms

**What goes wrong:** Multi-column form layouts, wide data tables (e.g. vaccination records grid, weight tracking history), and fixed-width elements cause horizontal scrolling on 360px–390px viewports. This is the most common mobile layout bug in forms that were designed on desktop-width viewports first.

**Why it happens:** Tailwind's responsive prefixes (`md:grid-cols-2`) are used correctly but the base (mobile) layout is never tested at 360px. Tables are the worst offender — a `<table>` with 5 columns will overflow at any mobile width without an explicit wrapping strategy.

**Prevention:**
- Never use `<table>` for data display on mobile. Use card-based list layouts for mobile, with the table pattern only appearing at `md:` and above via responsive Tailwind classes
- Set `overflow-x: hidden` on the root layout body as a guard rail, then test at 360px width on every screen before marking it complete
- For the vaccination records and weight tracking screens specifically: design the mobile layout as a vertical card list with swipe-to-see-more as a last resort, not a horizontal scroll
- Touch targets: all interactive elements must be at least 44×44px (WCAG 2.5.5 advisory, but de facto standard). Use `min-h-11 min-w-11` (44px in Tailwind's default scale) on all buttons and tap targets

**Warning signs:** Using `grid-cols-3` without a `grid-cols-1` base; `<table>` elements on any screen that might have more than 3 columns; buttons with only `px-2 py-1` padding that produce sub-44px tap targets.

**Phase that must address it:** Each screen phase. Mobile layout must be verified at 360px before each screen is considered done.

---

### Pitfall 7: React Hook Form + Zod Schema Mismatch on Complex Healthcare Forms

**What goes wrong:** The Zod schema and the React Hook Form field registration drift out of sync. This happens most often in multi-step forms (e.g. Register Clinic Visit, Add Clinic Session) where different steps have different validation requirements. Common failure modes: optional fields in Zod that RHF treats as required, nested object schemas that don't match nested field name paths (`visitData.mother.id` vs `visitData.motherId`), and conditional validation rules that are in the Zod schema but not reflected in the UI (the form submits successfully with data that fails server validation).

**Why it happens:** Complex healthcare forms have many conditional fields (e.g. "complications" field only required if "high risk" is checked). The `zodResolver` from `@hookform/resolvers/zod` handles Zod validation but conditional schema branching requires `z.discriminatedUnion` or `z.refine` which are easy to write incorrectly.

**Consequences:** Forms that appear to submit but fail API validation. Or forms that block submission on fields the user cannot see (a Zod error on a hidden/conditional field with no UI feedback). Both create serious UX problems in a healthcare context where staff are trying to record clinical data quickly.

**Prevention:**
- For every form, write the Zod schema first, derive TypeScript types from it with `z.infer<typeof schema>`, and use those types as the RHF `useForm<T>()` generic — never define form types separately from the Zod schema
- For conditional fields: use `z.discriminatedUnion` for known conditional branches (e.g. risk level determines required fields) and test each branch explicitly with unit tests
- Validate that every field registered with `register()` or `<Controller>` has a corresponding path in the Zod schema. A helper function that logs schema vs registered field mismatches in development catches this early
- For multi-step forms: validate only the current step's fields on next-step navigation (use `trigger(['field1', 'field2'])` for partial validation), not the full schema

**Warning signs:** `register('visitDate')` but Zod schema has `visitDate: z.date()` while RHF sends it as a string; a conditional field showing an error for a user who never saw the field; `z.any()` used to "fix" a type mismatch instead of correcting the schema.

**Phase that must address it:** Register Clinic Visit phase and Add Clinic Session phase. These are the most complex forms in the application.

---

### Pitfall 8: Missing Suspense Boundaries Causing Flash-of-Unloaded-Content

**What goes wrong:** Data-dependent components render without Suspense boundaries. On initial load (or when mock fetchers introduce artificial delays for realistic simulation), the page renders an empty or broken state briefly before data loads. In a mock-only phase this seems acceptable, but when real API latency arrives, the problem becomes a hard user-experience bug.

**Why it happens:** Suspense boundaries require deliberate placement. Components that use `useQuery` in their current loading state return null or an empty array, producing a flash of blank UI rather than a designed skeleton state. `loading.tsx` files at the route segment level handle the full-page case but not granular component-level loading.

**Prevention:**
- Every component that consumes a TanStack Query result should have an explicit loading state (skeleton or spinner) and be wrapped in a `<Suspense>` boundary if the parent is a Server Component streaming data down
- For the mock phase, introduce a configurable artificial delay in the mock fetcher (`await delay(300)`) so loading states are exercised during development and not discovered in production
- The Mothers List, Dashboard activity feed, and Mother Profile screens are the highest-risk screens for this — they display aggregate data from multiple data sources and should each have granular Suspense wrapping

**Warning signs:** `if (isLoading) return null` in any component that renders visible UI; no `loading.tsx` files in the route tree; mock fetchers that resolve synchronously making loading states appear to work.

**Phase that must address it:** Each screen phase. Loading states must be built in tandem with the data-connected component, not deferred.

---

### Pitfall 9: Authentication Session State Causing Hydration Mismatches

**What goes wrong:** Session state (user is logged in / logged out) is read from localStorage or a cookie on the client. If the server renders a logged-in state and the client hydrates with a logged-out state (or vice versa), React logs a hydration mismatch warning that can escalate to a visible UI flicker or a broken component tree. This is particularly common in the App Router because layouts run on the server.

**Why it happens:** Auth state stored in localStorage is not available on the server. If any Server Component or layout renders conditional UI based on auth state it reads from a source that doesn't exist on the server, the HTML and the hydrated DOM will differ.

**Prevention:**
- For v1 (mock auth): keep auth state in a cookie that is readable server-side, not localStorage. A simple `httpOnly: false` cookie with a session token is sufficient for mock auth. Next.js middleware can read this cookie and redirect unauthenticated users before the page renders
- Never render auth-conditional UI in a Server Component that reads from a source unavailable to the server. Use middleware for auth routing, not conditional rendering in layouts
- Use `suppressHydrationWarning` only as a deliberate, documented last resort for elements where client/server mismatch is intentional (e.g. a timestamp showing "just now")

**Warning signs:** `localStorage.getItem('token')` in any component that isn't explicitly client-side and wrapped in `useEffect`; layout components rendering `{isLoggedIn ? <Dashboard/> : <Login/>}` without the isLoggedIn value coming from a server-readable source.

**Phase that must address it:** Authentication phase. Must be architected correctly from the start before any protected routes are built.

---

## Minor Pitfalls

Mistakes that cause friction, inconsistency, or individual-screen bugs but do not cascade.

---

### Pitfall 10: Scroll Position Not Restored on Back Navigation

**What goes wrong:** The Mothers List screen shows a long list. A staff member scrolls down, taps a mother's card to view her profile, presses back — and the list is scrolled back to the top. This is a standard UX expectation that Next.js App Router does not handle automatically in all cases. The Router Cache preserves page state only for a short window and only under certain conditions.

**Prevention:**
- Use the Next.js `scroll={false}` prop on `<Link>` components where scroll preservation is desired, and implement scroll restoration manually using `sessionStorage` to save and restore list scroll positions
- Alternatively, use a URL search param to encode the active item (`?focus=motherId`) so the page can scroll to the correct position on mount

**Phase that must address it:** Mothers List screen phase.

---

### Pitfall 11: Pregnancy Timeline Rendering at Small Viewports

**What goes wrong:** Timeline UI components (weeks of pregnancy, milestones, appointment markers) are inherently wide. Building them as horizontal scrolling containers on mobile creates accessibility problems (keyboard navigation fails, touch scrubbing is imprecise) and WCAG 1.4.10 (Reflow) failures when the browser zoom level is increased.

**Prevention:**
- Build the pregnancy timeline as a vertical scrolling list on mobile, with milestone cards stacked. Reserve horizontal scroll for explicit "chart" zones that are clearly labeled as requiring landscape orientation
- Test at 320px width and 400% browser zoom as WCAG 1.4.10 requires — content must not require two-dimensional scrolling except for "parts of the content which require two-dimensional layout for usage or meaning"

**Phase that must address it:** Pregnancy Timeline screen phase.

---

### Pitfall 12: `params` Must Be Awaited in Next.js 15 App Router

**What goes wrong:** In Next.js 15, `params` and `searchParams` in Server Components are now Promises and must be awaited before accessing their values. Code written with synchronous `params.id` access (the pre-15 pattern) causes a runtime error or returns undefined.

**Example of the broken pattern:**
```tsx
// WRONG in Next.js 15+
export default function Page({ params }: { params: { id: string } }) {
  const id = params.id // undefined or type error
}

// CORRECT
export default async function Page({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
}
```

**Prevention:**
- Treat `params` and `searchParams` as `Promise<T>` from the first line of every dynamic route page component. The TypeScript types will enforce this if configured correctly
- Run `next lint` in CI — Next.js 15's built-in lint rules flag synchronous `params` access

**Phase that must address it:** Any phase that implements dynamic routes (Mother Profile, Clinic Session Detail, Medical History, Vaccination Records).

---

### Pitfall 13: Design System Component Override Anti-Patterns

**What goes wrong:** A MomCare Design System component (e.g. a Card or Badge component) almost fits the wireframe but needs a slight modification — an extra margin, a different border radius on one side. Rather than composing with wrapper elements or using the component's documented variant props, a developer wraps it in a div with conflicting Tailwind classes, or worse, applies `!important`-equivalent `!` Tailwind utilities to override the component's own styles.

**Consequences:** The component's internal state styles (hover, focus, disabled) may be partially overridden, creating inaccessible focus rings or broken hover states. The override is fragile — a design system update could break it silently.

**Prevention:**
- Only use override utilities when the design system component exposes a documented `className` prop intended for extension
- If a component needs a modification that isn't covered by its variants, prefer wrapping it in a layout element that provides the additional spacing/structure, rather than overriding internal styles
- Any use of `!` (Tailwind important modifier) is a code review flag — document why and verify it doesn't break focus/hover states
- Raise a design system issue for missing variants rather than working around them silently

**Phase that must address it:** Each screen phase. Enforce via code review.

---

## Phase-Specific Warnings

| Phase Topic | Likely Pitfall | Mitigation |
|-------------|---------------|------------|
| Project scaffolding | Token bypass via arbitrary values; state architecture not defined | Lock token enforcement in CI and write state ownership doc before any screen work |
| Authentication | Hydration mismatch from localStorage auth; `params` awaiting pattern not established | Use cookie-based session, set up Next.js 15 `params` typing in a shared convention |
| Home / Dashboard | TanStack Query + Zustand duplication for "current user" data; missing Suspense boundaries | Confirm state ownership doc covers user session; add skeleton loading for each data zone |
| Mothers list | Horizontal overflow at 360px; scroll restoration on back navigation | Test at 360px; implement scroll-position sessionStorage before calling screen done |
| Mother profile | Server/Client component boundary confusion (tabbed UI with async data); RHF + Zod on inline edit forms | Profile shell is Server Component; tab panels are Client Components; Zod schema before fields |
| Register clinic visit | RHF + Zod schema mismatch on conditional healthcare fields; multi-step form step-validation | Write full Zod schema with discriminated unions for conditional fields before any UI |
| Add clinic session | Same as above | Same as above |
| Vaccination records | Horizontal table overflow on mobile | Card-list layout mobile, table layout only at md+ |
| Weight & health tracking | Chart libraries needing `'use client'` pulling in large bundles; WCAG reflow at zoom | Wrap chart in isolated Client Component; test at 400% zoom |
| Pregnancy timeline | Horizontal scroll WCAG failure; 320px rendering | Vertical card list on mobile; test at 320px and 400% zoom |

---

## Sources

| Source | Confidence | Notes |
|--------|------------|-------|
| Next.js official docs (nextjs.org/docs, March 2026) | HIGH | Server/Client components, caching, error handling, `params` as Promise |
| Tailwind CSS official docs (tailwindcss.com/docs, March 2026) | HIGH | Arbitrary values anti-patterns, `@theme` directive |
| WCAG 2.1 specification (w3.org/WAI/WCAG21) | HIGH | AA contrast ratios (4.5:1 normal text, 3:1 large text/UI), 1.4.10 Reflow, 2.5.5 Touch Target |
| TanStack Query docs (does-this-replace-client-state guide) | HIGH (training knowledge, confirmed pattern-consistent with official guidance) | Server state vs client state boundary |
| React Hook Form + Zod resolver patterns | MEDIUM (training knowledge, not verified against latest RHF docs due to tool restrictions) | zodResolver behavior, conditional validation patterns |
| Domain knowledge: healthcare frontend failure modes | MEDIUM | Synthesized from common patterns in clinical data entry UI projects |
