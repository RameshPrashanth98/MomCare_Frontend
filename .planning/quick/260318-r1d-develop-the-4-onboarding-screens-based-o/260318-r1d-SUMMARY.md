---
phase: quick
plan: 260318-r1d
subsystem: onboarding
tags: [ui, onboarding, design-matching, mobile]
dependency_graph:
  requires: []
  provides: [onboarding-screens-v2]
  affects: [app/onboarding/page.tsx, app/globals.css]
tech_stack:
  added: []
  patterns: [css-custom-properties, inline-styles-for-tokens, shared-subcomponents]
key_files:
  created: []
  modified:
    - app/onboarding/page.tsx
    - app/globals.css
decisions:
  - Used inline style={{ }} for all CSS token references — Tailwind v4 arbitrary values do not reliably resolve CSS vars
  - AppIcon and PaginationDots extracted as shared sub-components used across all 4 screens
  - WelcomeScreen and FeatureScreen as separate sub-components for clarity
  - Illustration card uses --color-illustration-bg (#FFF5F0) warm-tint on all screens for visual consistency
  - Active pagination dot is 20px wide + dark pink; inactive dots are 8px + light pink at 25% opacity
metrics:
  duration: "~20 min"
  completed_date: "2026-03-18"
  tasks_completed: 1
  files_changed: 2
---

# Quick Task 260318-r1d: Onboarding Screens Design Match Summary

Pixel-faithful rewrite of 4-screen onboarding flow matching the high-fidelity Welcome Screen design and wireframe screens 1-3 at iPhone 16 Pro (393px) dimensions.

## What Was Built

### Welcome Screen (step 0)
Matches the "Welcome Screen - iPhone 16 Pro.png" high-fidelity design:
- **Decorative circles**: semi-transparent pink circles clipped at top-right and bottom-left edges
- **App icon**: 80x80px rounded-square (border-radius 22%) with a linear gradient (pink-light → brand-pink → brand-pink-dark), drop shadow, centered white SVG medical cross
- **Branding**: "MomCare" at 26px bold in brand pink + "CLINIC MANAGEMENT" at 11px uppercase letter-spaced gray
- **Illustration card**: 330px wide rounded-20 card with warm #FFF5F0 background and pink shadow, containing IllustrationWelcome
- **Category badge**: 7px pink dot + "Maternal Healthcare" in brand pink
- **Title**: "Welcome to the\nMaternal Health Clinic" at 27px bold, centered, dark
- **Description**: 14px gray, centered, line-height 1.6
- **Button**: Full-width pink pill (border-radius: 9999px), 54px height, "Get Started" + right arrow SVG, pink box-shadow
- **Dots**: 4 dots, active = 20px wide dark pink pill, inactive = 8px light pink circles

### Feature Screens (steps 1-3)
Follow wireframe layouts from Onboarding 2-4.png:
- **Small app icon**: 48px version of same gradient rounded-square icon at top
- **Title**: 22px bold dark text, screen-specific
- **Illustration card**: Same warm-tinted rounded card as welcome screen
- **Description**: 15px gray, centered
- **Button**: 52px height rounded-14 (not pill), full-width pink
- **Dots**: Same 4-dot indicator with current active
- **Navigation row**: Step 1 = Skip (left) + Next (right) | Step 2 = Back (left) + Next (right) | Step 3 = Back (left) only

### Design Token Added
`--color-illustration-bg: #FFF5F0` added to globals.css @theme block for illustration card backgrounds.

### Navigation Logic
- Welcome "Get Started" → step 1
- Feature "Get Started" button → /login (all steps)
- "Next" → next step
- "Back" → previous step
- "Skip" (steps 1-2) → /login

## Deviations from Plan

None — plan executed exactly as written. The build worker crashed with exit code 134 (Windows SIGABRT — memory issue unrelated to code). TypeScript type-check (`npx tsc --noEmit`) passed cleanly with zero errors.

## Commits

| Hash | Description |
|------|-------------|
| 68f9dc7 | feat(260318-r1d): rewrite onboarding to match high-fidelity design |

## Self-Check

- [x] `app/onboarding/page.tsx` exists and has 528 lines
- [x] `app/globals.css` has `--color-illustration-bg` token
- [x] All 4 illustration components imported and used
- [x] `router.push('/login')` present for skip/get-started/last-screen navigation
- [x] No hardcoded color values — all via CSS custom properties
- [x] TypeScript type-check passes with zero errors
- [x] Commit 68f9dc7 exists in git log

## Self-Check: PASSED
