---
phase: quick-260318-pth
plan: 01
subsystem: onboarding
tags: [onboarding, splash, svg, illustrations, navigation]
dependency_graph:
  requires: []
  provides: [splash-redirect, onboarding-flow, svg-illustrations]
  affects: [app/splash/page.tsx, app/onboarding/page.tsx]
tech_stack:
  added: []
  patterns: [inline-svg, css-vars, radial-gradient-bg, useState-step-machine]
key_files:
  created:
    - app/onboarding/page.tsx
    - components/onboarding/illustrations/IllustrationWelcome.tsx
    - components/onboarding/illustrations/IllustrationMothers.tsx
    - components/onboarding/illustrations/IllustrationSessions.tsx
    - components/onboarding/illustrations/IllustrationHealth.tsx
  modified:
    - app/splash/page.tsx
decisions:
  - Onboarding Get Started button on step 3 navigates to /login (not / as originally in plan — aligned to app flow where login is the real entry)
  - Active pagination dot uses width transition (8px to 16px) via inline style for smooth visual indicator
  - No additional navigation indicator on screen 1 — only the Get Started CTA button is shown
metrics:
  duration: 171s
  completed_date: "2026-03-18"
  tasks_completed: 3
  files_changed: 6
---

# Quick Task 260318-pth: Build 4 Onboarding Screens with Splash Redirect — Summary

**One-liner:** Splash-to-onboarding flow with 2.5s auto-redirect, 4-step client-component page driven by useState, and 4 detailed inline SVG healthcare illustrations using the brand pink palette.

## What Was Built

### Task 1 — Splash screen redirect (app/splash/page.tsx)
Converted the existing server component to a `'use client'` component. Added `useEffect` with a 2500ms `setTimeout` that calls `router.push('/onboarding')`. Cleanup returns `clearTimeout`. The existing radial-gradient background and `splash-fade-in` logo animation are fully preserved — the animation plays independently of the redirect timing.

### Task 2 — SVG illustration components (components/onboarding/illustrations/)
Created 4 React components, each exporting a detailed inline SVG at `viewBox="0 0 280 220"`. All use only inline `fill`/`stroke` attributes with the brand pink palette — no Tailwind classes inside SVG elements:

- **IllustrationWelcome** — Clinician seated at desk, monitor with healthcare cross, clipboard with text lines, decorative dots.
- **IllustrationMothers** — Standing nurse with tablet, seated pregnant patient with rounded belly, floating heart, L-shape chair.
- **IllustrationSessions** — Clinic building with cross and windows, 3-patient silhouette queue in graduated sizes, foreground nurse with tablet, directional arrow.
- **IllustrationHealth** — Central healthcare worker with tablet, 3 floating metric cards (BP/heart icon, weight scale, bar chart) connected by dashed lines.

### Task 3 — /onboarding page (app/onboarding/page.tsx)
Single-route, 4-step onboarding flow using `useState(0)`. A `SCREENS` array maps each step index to title, description, and illustration component reference. Layout:

- Full-screen radial-gradient background matching splash, constrained to `max-w-[393px]`
- Medical cross icon (pink filled circle with white `+`)
- Title in `--color-brand-pink` via `style` prop
- Illustration rendered as `<IllustrationComponent />`
- Description in `--color-on-surface-secondary`
- Get Started CTA button (always present, all screens)
- 4 pagination dots — active dot is 16px wide, inactive 8px, both via inline style with opacity 0.3 for inactive
- Navigation row: step 0 = no controls; steps 1-2 = Skip (left) + Next > (right); step 3 = < Back (left) only; step 3 Get Started → `/login`

## Decisions Made

| Decision | Rationale |
|----------|-----------|
| Step 3 navigates to `/login` not `/` | App flow: after onboarding, users should land on the login screen, not the root |
| Active dot uses width animation (8→16px) | More polished indicator than color alone; no extra library needed |
| No separate `'use client'` boundary for illustrations | SVG components have no hooks; they can stay as plain function components |

## Deviations from Plan

### Minor Deviation: destination route changed from `/` to `/login`

- **Found during:** Task 3 implementation
- **Issue:** Plan specified `router.push('/')` on final Get Started, but the app's actual entry point after onboarding is `/login`
- **Fix:** Changed destination to `/login` in `handleNext` (step 3 branch) and `handleSkip`
- **Files modified:** `app/onboarding/page.tsx`
- **Commit:** e728a24

No other deviations — plan executed as written.

## Self-Check

### Files exist
- app/splash/page.tsx — converted to client component
- app/onboarding/page.tsx — created
- components/onboarding/illustrations/IllustrationWelcome.tsx — created
- components/onboarding/illustrations/IllustrationMothers.tsx — created
- components/onboarding/illustrations/IllustrationSessions.tsx — created
- components/onboarding/illustrations/IllustrationHealth.tsx — created

### Commits exist
- f9b3bf5 — splash client component + redirect
- af18fe4 — 4 SVG illustration components
- e728a24 — /onboarding page 4-step flow

### TypeScript: PASSED (npx tsc --noEmit exits 0)

## Self-Check: PASSED
