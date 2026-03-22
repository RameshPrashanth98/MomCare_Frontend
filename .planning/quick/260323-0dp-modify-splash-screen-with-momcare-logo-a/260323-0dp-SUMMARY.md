# Quick Task 260323-0dp: Modify splash screen with MomCare logo animation

## Result: COMPLETE

## What Was Done

1. **Replaced logo** — copied the MomCare logo (mother + baby heart shape) to `public/logo.png`

2. **Redesigned splash screen** (`app/splash/page.tsx`):
   - White background (clean, minimal)
   - Multi-stage logo animation: scales from 0.3 with blur, overshoots to 1.08, settles at 1.0
   - Two pulsing ring effects behind logo (staggered by 0.5s)
   - Tagline "Caring for every mother" slides up with letter-spacing animation
   - Smooth fade-out exit transition at 2.0s before navigating at 2.5s
   - Pink drop-shadow on logo for depth

3. **Enhanced CSS keyframes** (`app/globals.css`):
   - `splash-logo-enter` — scale + blur + bounce entrance
   - `splash-text-slide` — translateY + letter-spacing reveal
   - `splash-pulse-ring` — expanding ring ripple effect
   - `splash-fade-out` — scale-up exit transition

## Files Modified
- `public/logo.png` — replaced with MomCare branded logo
- `app/splash/page.tsx` — complete rewrite with new animation
- `app/globals.css` — new keyframe animations

## Commit
- `4b4bf11`
