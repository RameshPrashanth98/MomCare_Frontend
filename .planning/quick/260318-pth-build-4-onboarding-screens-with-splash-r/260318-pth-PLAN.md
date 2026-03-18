---
phase: quick-260318-pth
plan: 01
type: execute
wave: 1
depends_on: []
files_modified:
  - app/splash/page.tsx
  - app/onboarding/page.tsx
  - components/onboarding/illustrations/IllustrationWelcome.tsx
  - components/onboarding/illustrations/IllustrationMothers.tsx
  - components/onboarding/illustrations/IllustrationSessions.tsx
  - components/onboarding/illustrations/IllustrationHealth.tsx
autonomous: true
requirements: []

must_haves:
  truths:
    - "Splash screen auto-redirects to /onboarding after 2.5 seconds"
    - "Splash fade-in animation is preserved"
    - "Onboarding shows 4 steps on a single /onboarding page"
    - "Each step shows its illustration, title, description, and navigation controls"
    - "Pagination dots reflect the active step"
    - "Screen 1 has no Skip or Back link"
    - "Screens 2-3 have Skip (left) and Next > (right)"
    - "Screen 4 has Back (left) and Next > / Get Started (right) that navigates to /"
    - "Get Started CTA button is visible on every screen and goes to / on screen 4"
    - "All colors use --color-brand-pink and splash-bg tokens — no hardcoded hex in JSX"
  artifacts:
    - path: "app/splash/page.tsx"
      provides: "Client component with useEffect redirect to /onboarding after 2500ms"
    - path: "app/onboarding/page.tsx"
      provides: "4-step onboarding flow with useState step management"
    - path: "components/onboarding/illustrations/IllustrationWelcome.tsx"
      provides: "SVG nurse-at-desk illustration"
    - path: "components/onboarding/illustrations/IllustrationMothers.tsx"
      provides: "SVG nurse-consulting-patient illustration"
    - path: "components/onboarding/illustrations/IllustrationSessions.tsx"
      provides: "SVG clinic-queue illustration"
    - path: "components/onboarding/illustrations/IllustrationHealth.tsx"
      provides: "SVG health-metrics illustration"
  key_links:
    - from: "app/splash/page.tsx"
      to: "/onboarding"
      via: "useRouter().push in useEffect with 2500ms timeout"
    - from: "app/onboarding/page.tsx"
      to: "components/onboarding/illustrations/*"
      via: "import and render per SCREENS[step].illustration"
    - from: "Get Started button on screen 4"
      to: "/"
      via: "router.push('/')"
---

<objective>
Build the splash-to-onboarding flow: update the splash screen to auto-redirect after 2.5s, then implement 4 onboarding screens on a single /onboarding page with inline SVG illustrations, pagination dots, and per-screen navigation controls.

Purpose: Provide new users a branded entry experience that explains MomCare's core capabilities before they reach the login screen.
Output: Updated splash page, new onboarding page, 4 SVG illustration components.
</objective>

<execution_context>
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/workflows/execute-plan.md
@C:/Users/Ramesh Prashanth/.claude/get-shit-done/templates/summary.md
</execution_context>

<context>
@.planning/STATE.md
@app/globals.css
@app/splash/page.tsx
@app/layout.tsx

<interfaces>
<!-- Design tokens available as CSS custom properties and Tailwind v4 utility classes -->
<!-- Tailwind v4 auto-generates classes from @theme — use these directly -->

Brand pink:
  CSS var: var(--color-brand-pink)          → #E8527A
  CSS var: var(--color-brand-pink-dark)     → #C93A62
  CSS var: var(--color-brand-pink-light)    → #FF85A8

Splash background (use same radial-gradient as splash screen):
  CSS var: var(--color-splash-bg-center)    → #FFFFFF (center)
  CSS var: var(--color-splash-bg-mid)       → #FFE8F0 (mid)
  CSS var: var(--color-splash-bg-edge)      → #FFCDE0 (edge)

Text:
  CSS var: var(--color-on-surface-secondary) → #6B7280

Radius:
  --radius-full: 9999px  (rounded-full)

Splash animation (already in globals.css):
  @keyframes splash-fade-in — opacity 0→1, scale 0.9→1 over 0.8s

SVG illustration palette (inline in SVG elements):
  Primary fill:  #E8527A
  Light fill:    #FFB8D0
  Softer bg:     #FFEDE8
  White:         #FFFFFF
  All 280×220px viewBox
</interfaces>
</context>

<tasks>

<task type="auto">
  <name>Task 1: Update splash screen to client component with redirect</name>
  <files>app/splash/page.tsx</files>
  <action>
Rewrite app/splash/page.tsx as a client component. The current file is a server component — convert it fully.

Requirements:
- Add "use client" directive at top
- Import useEffect from react, useRouter from next/navigation
- Keep the existing radial-gradient background (inline style with splash-bg CSS vars)
- Keep the existing logo Image component and splash-fade-in animation (opacity:0 initial, animation style on the wrapper div)
- Add useEffect that calls router.push('/onboarding') after a 2500ms setTimeout
- Clear the timeout on cleanup (return () => clearTimeout(timer))
- Do NOT add any visible loading indicator or text — just the existing logo lockup

The redirect must fire once on mount. The animation plays independently of the redirect timing (it starts immediately, redirect fires at 2.5s).

Example structure:
```tsx
'use client'
import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SplashScreen() {
  const router = useRouter()
  useEffect(() => {
    const timer = setTimeout(() => router.push('/onboarding'), 2500)
    return () => clearTimeout(timer)
  }, [router])
  // ...existing JSX unchanged...
}
```
  </action>
  <verify>
    <automated>npx tsc --noEmit 2>&1 | head -20</automated>
  </verify>
  <done>Splash page compiles as client component; useEffect with 2500ms redirect present; animation style preserved.</done>
</task>

<task type="auto">
  <name>Task 2: Create 4 SVG illustration components</name>
  <files>
    components/onboarding/illustrations/IllustrationWelcome.tsx
    components/onboarding/illustrations/IllustrationMothers.tsx
    components/onboarding/illustrations/IllustrationSessions.tsx
    components/onboarding/illustrations/IllustrationHealth.tsx
  </files>
  <action>
Create the directory components/onboarding/illustrations/ and write 4 React SVG components. Each is a named default export returning a single inline SVG. No external dependencies, no image files.

All SVGs share these attributes: width="280" height="220" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg"

Color palette to use inline (do NOT use Tailwind classes inside SVG — use fill/stroke attributes):
- Primary pink:  #E8527A
- Light pink:    #FFB8D0
- Soft bg:       #FFEDE8
- White:         #FFFFFF
- Dark outline:  #C93A62 (for strokes and fine lines)

Line-art style: use strokeWidth="1.5" to "2.5" for outlines, fill areas with the soft colors.

--- IllustrationWelcome.tsx ---
Scene: A clinician sitting at a desk, facing a monitor showing a patient record. A clipboard rests on the desk. Healthcare cross on the monitor screen.
Elements to draw:
- Desk rectangle (lower third, #FFEDE8 fill, #C93A62 stroke)
- Monitor (rectangle on a stand, white fill, #E8527A screen edge, small + cross on screen in #E8527A)
- Seated figure (simplified stick-person silhouette: circle head, rectangle torso in #FFB8D0, line arms)
- Clipboard beside the figure (#FFEDE8 fill, lines representing text, #C93A62 border)
- Small decorative dots or pills scattered in background (#FFB8D0, small circles)

--- IllustrationMothers.tsx ---
Scene: A nurse standing beside a seated pregnant patient, nurse holds a tablet.
Elements to draw:
- Two figures: standing nurse (taller, #E8527A top / #FFB8D0 lower, circle head) and seated pregnant patient (rounded belly, #FFEDE8 fill)
- Tablet in nurse's hand (small rectangle, white screen, #E8527A border)
- Chairs (simple L-shapes, #FFEDE8)
- Small heart or pregnancy icon floating near patient (#E8527A)

--- IllustrationSessions.tsx ---
Scene: Nurse with tablet, simple clinic building outline, short queue of 3 patient silhouettes.
Elements to draw:
- Clinic building (rectangle with small cross on it, #FFEDE8 fill, #C93A62 stroke, door cutout)
- Nurse figure (foreground, #E8527A top, tablet in hand)
- 3 small patient silhouettes in a queue (circles for heads, rectangles for bodies, graduated sizes, #FFB8D0 fill)
- Directional arrow pointing toward clinic (#E8527A)

--- IllustrationHealth.tsx ---
Scene: Healthcare worker holding a tablet, with 3-4 floating metric cards around it (BP, weight, chart).
Elements to draw:
- Central figure holding tablet (simplified, #FFB8D0 torso, circle head)
- Tablet (rectangle, white fill, #E8527A border)
- 3 floating rounded-rectangle cards around the figure:
  - Card 1: small heart icon + "BP" text-like lines (#FFEDE8 fill, #E8527A border)
  - Card 2: weight scale icon (circle with lines, #FFEDE8 fill)
  - Card 3: mini bar chart (3 small rectangles of varying heights, #E8527A bars)
- Connecting dashed lines from tablet to cards (#FFB8D0)

Each file exports a default function component, e.g.:
```tsx
export default function IllustrationWelcome() {
  return (
    <svg width="280" height="220" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">
      {/* elements */}
    </svg>
  )
}
```
  </action>
  <verify>
    <automated>npx tsc --noEmit 2>&1 | head -20</automated>
  </verify>
  <done>4 SVG files exist, each exports a valid React component, no import errors, TypeScript compiles clean.</done>
</task>

<task type="auto">
  <name>Task 3: Build /onboarding page with 4-step flow</name>
  <files>app/onboarding/page.tsx</files>
  <action>
Create app/onboarding/page.tsx as a client component. This is the main onboarding screen — single URL, step managed via useState.

"use client" at top. Import: useState, useRouter from next/navigation, and all 4 illustration components.

Data structure — define a SCREENS array of 4 objects at the top of the file:
```ts
const SCREENS = [
  {
    title: 'Maternal Health Clinic Management',
    description: 'Helping healthcare workers manage maternal clinics, patient records, and antenatal care efficiently.',
    illustration: IllustrationWelcome,
  },
  {
    title: 'Manage Pregnant Mothers',
    description: 'Register new mothers, track pregnancy progress, and manage maternal health records in one place.',
    illustration: IllustrationMothers,
  },
  {
    title: 'Manage Clinic Sessions',
    description: 'Schedule clinics, track attendance, and manage clinic sessions efficiently.',
    illustration: IllustrationSessions,
  },
  {
    title: 'Monitor Maternal Health',
    description: 'Track weight, blood pressure, lab reports, and vaccinations throughout pregnancy.',
    illustration: IllustrationHealth,
  },
]
```

Component state: `const [step, setStep] = useState(0)` — index 0–3.
Router: `const router = useRouter()`

Navigation logic:
- handleNext: step < 3 ? setStep(step + 1) : router.push('/')
- handleBack: setStep(step - 1)
- handleSkip: router.push('/')  (used on screens 2 and 3; screen 4 has no Skip)

Layout — full screen container (min-h-screen, same radial-gradient background as splash via inline style):
```tsx
style={{ background: 'radial-gradient(ellipse at center, var(--color-splash-bg-center) 0%, var(--color-splash-bg-mid) 45%, var(--color-splash-bg-edge) 100%)' }}
```

Add className="flex flex-col items-center justify-between px-6 py-10" (or py-8) on the outer div.

Inner layout (top to bottom, all centered):

1. Medical cross icon — circle with + symbol
   - div: w-12 h-12 rounded-full flex items-center justify-center, background: var(--color-brand-pink)
   - Inner: a + symbol in white, text-2xl font-bold text-white, or SVG cross

2. Title — current.title
   - h1: text-xl font-bold text-center, color: var(--color-brand-pink), using style prop since Tailwind v4 may not have text-brand-pink as a class yet
   - Use: className="text-xl font-bold text-center mt-4" style={{ color: 'var(--color-brand-pink)' }}

3. Illustration — render <current.illustration />
   - Wrap in: className="flex items-center justify-center my-6"

4. Description — current.description
   - p: text-sm text-center leading-relaxed px-2, color: var(--color-on-surface-secondary)
   - Use: className="text-sm text-center leading-relaxed px-2" style={{ color: 'var(--color-on-surface-secondary)' }}

5. Get Started CTA button — always visible
   - button onClick={handleNext}
   - className="w-full py-4 rounded-full font-semibold text-white mt-6"
   - style={{ backgroundColor: 'var(--color-brand-pink)' }}
   - Label: step === 3 ? 'Get Started' : 'Get Started'  (always "Get Started")

6. Pagination dots — 4 dots
   - div: flex gap-2 justify-center mt-4
   - Map over [0,1,2,3]: for each index i, render a div with:
     - w-2 h-2 rounded-full
     - if i === step: style={{ backgroundColor: 'var(--color-brand-pink)' }} and w-4 (wider active dot)
     - else: style={{ backgroundColor: 'var(--color-brand-pink)', opacity: 0.3 }}

7. Navigation row — Skip/Back (left) | Next > (right)
   - div: flex justify-between items-center mt-4 w-full
   - Left side (conditional):
     - step === 0: empty span (no skip or back on first screen)
     - step === 1 or step === 2: "Skip" button → onClick={handleSkip}
     - step === 3: "< Back" button → onClick={handleBack}
   - Right side:
     - step < 3: "Next >" button → onClick={handleNext}
     - step === 3: no right button (Get Started CTA button above handles this)
   - Button style: text-sm font-medium, color var(--color-brand-pink), bg-transparent, no border

Note on screen 2 navigation (step===1): left=Skip, right=Next >
Note on screen 3 navigation (step===2): left=Skip, right=Next >
Note on screen 4 navigation (step===3): left=Back, right=nothing (CTA button handles forward)

The full outer wrapper should constrain to mobile width:
```tsx
<div className="min-h-screen w-full flex items-center justify-center" style={{ background: '...' }}>
  <div className="w-full max-w-[393px] flex flex-col items-center px-6 py-10 min-h-screen">
    {/* content */}
  </div>
</div>
```
  </action>
  <verify>
    <automated>npx tsc --noEmit 2>&1 | head -20</automated>
  </verify>
  <done>
    /onboarding page compiles without TypeScript errors. Step 0 renders IllustrationWelcome with title "Maternal Health Clinic Management" and no Skip/Back. Step 3 renders IllustrationHealth with Back on left and no Next on right. Get Started CTA present on all screens. 4 pagination dots with active highlight.
  </done>
</task>

</tasks>

<verification>
After all tasks complete, verify end-to-end:

1. TypeScript: `npx tsc --noEmit` — must exit 0
2. Dev server: `npm run dev` — no compile errors in terminal
3. Manual smoke (visit in browser at http://localhost:3000/splash):
   - Splash logo fades in, after ~2.5s page navigates to /onboarding
   - Screen 1 shows: cross icon, title in pink, Welcome illustration, description, Get Started button, 4 dots (first active), no Skip/Back links
   - Click Next > (or Get Started) → Screen 2 shows Mothers illustration, Skip on left, Next > on right, second dot active
   - Screen 3 shows Sessions illustration, Skip on left, Next > on right, third dot active
   - Screen 4 shows Health illustration, Back on left, no Next link, Get Started button navigates to /
</verification>

<success_criteria>
- Splash redirects to /onboarding automatically after 2.5s with animation intact
- All 4 onboarding steps render correctly with correct illustrations and navigation rules
- TypeScript compiles clean (no errors)
- No hardcoded hex values in JSX — all colors via CSS custom properties
- All 6 files created/updated
</success_criteria>

<output>
After completion, create `.planning/quick/260318-pth-build-4-onboarding-screens-with-splash-r/260318-pth-SUMMARY.md` with a brief summary of what was built, key decisions made, and any deviations from the plan.
</output>
