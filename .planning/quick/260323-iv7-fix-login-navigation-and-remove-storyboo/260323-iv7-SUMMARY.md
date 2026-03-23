---
phase: quick
plan: 260323-iv7
subsystem: auth, build-config
tags: [bugfix, cleanup, storybook-removal, cookie-fix]
dependency_graph:
  requires: []
  provides: [working-login-flow, clean-codebase]
  affects: [middleware.ts, package.json, eslint.config.mjs, ci.yml]
tech_stack:
  added: []
  patterns: [application-specific-cookie-naming]
key_files:
  created: []
  modified:
    - middleware.ts
    - package.json
    - package-lock.json
    - eslint.config.mjs
    - .github/workflows/ci.yml
    - .claude/settings.local.json
  deleted:
    - .storybook/main.ts
    - .storybook/preview.ts
    - stories/ (entire directory, 15+ files)
decisions:
  - "momcare-session is the correct cookie name; middleware was the incorrect side"
metrics:
  duration: 539s
  completed: 2026-03-23
---

# Quick Task 260323-iv7: Fix Login Navigation and Remove Storybook Summary

Fixed login-to-dashboard cookie name mismatch and removed all Storybook traces from the repository.

## One-liner

Auth middleware now checks `momcare-session` cookie (matching login page), and all Storybook code/config/dependencies removed from project.

## Task Results

### Task 1: Fix login cookie name mismatch in middleware

**Commit:** 1455c77

Changed `request.cookies.get('session')` to `request.cookies.get('momcare-session')` in middleware.ts line 22. The login page sets a cookie named `momcare-session` but middleware was checking for `session`, causing authenticated users to be redirected back to /login on Vercel.

**Files modified:** middleware.ts

### Task 2: Remove all Storybook code and configuration

**Commit:** c2b79b5

Removed all Storybook traces:
- Deleted `stories/` directory (15+ files including components, stories, assets)
- Deleted `.storybook/` directory (main.ts, preview.ts)
- Removed 2 scripts from package.json (storybook, build-storybook)
- Removed 8 devDependencies from package.json (storybook, @storybook/*, @chromatic-com/storybook, eslint-plugin-storybook)
- Cleaned eslint.config.mjs (removed storybook import, plugin config, storybook-static ignore)
- Removed storybook CI job from .github/workflows/ci.yml
- Removed storybook tool permissions from .claude/settings.local.json
- Regenerated package-lock.json (96 packages removed)
- Deleted storybook-static/ build output directory (was untracked)

**Files modified:** package.json, package-lock.json, eslint.config.mjs, .github/workflows/ci.yml, .claude/settings.local.json
**Files deleted:** .storybook/, stories/, storybook-static/

## Deviations from Plan

### Auto-fixed Issues

**1. [Rule 3 - Blocking] Deleted storybook-static/ build output directory**
- **Found during:** Task 2 verification
- **Issue:** `storybook-static/` directory (build output) was present on disk, causing ESLint to scan it and report 344 errors + 12,980 warnings
- **Fix:** Deleted the directory (it was untracked and a build artifact)
- **Files modified:** storybook-static/ (deleted from disk, was not in git)

## Verification Results

- `grep -ri "storybook"` across source files: zero matches
- `npm run build`: passes
- `npm run lint`: passes (0 errors, 6 pre-existing warnings)
- middleware.ts contains `momcare-session` cookie check: confirmed

## Self-Check: PASSED

- [x] Commit 1455c77 exists
- [x] Commit c2b79b5 exists
- [x] middleware.ts exists and contains 'momcare-session'
- [x] No storybook references in source files
