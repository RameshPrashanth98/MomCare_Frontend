---
phase: 1
slug: foundation
status: draft
nyquist_compliant: true
wave_0_complete: true
created: 2026-03-18
---

# Phase 1 — Validation Strategy

> Per-phase validation contract for feedback sampling during execution.

---

## Test Infrastructure

| Property | Value |
|----------|-------|
| **Framework** | Vitest 3.x + React Testing Library + @chialab/vitest-axe |
| **Config file** | `vitest.config.ts` (Wave 0 installs) |
| **Quick run command** | `npm run test -- --run` |
| **Full suite command** | `npm run test -- --run && npm run lint && npm run build` |
| **Estimated runtime** | ~30 seconds |

---

## Sampling Rate

- **After every task commit:** Run `npm run test -- --run`
- **After every plan wave:** Run `npm run test -- --run && npm run lint && npm run build`
- **Before `/gsd:verify-work`:** Full suite must be green
- **Max feedback latency:** 30 seconds

---

## Per-Task Verification Map

| Task ID | Plan | Wave | Requirement | Test Type | Automated Command | File Exists | Status |
|---------|------|------|-------------|-----------|-------------------|-------------|--------|
| 1-01-01 | 01-01 | 1 | FOUND-01 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 1-01-02 | 01-01 | 1 | FOUND-02 | lint + build | `npm run lint && npm run build` | ❌ W0 | ⬜ pending |
| 1-01-03 | 01-01 | 1 | FOUND-03 | lint | `npm run lint` | ❌ W0 | ⬜ pending |
| 1-02-01 | 01-02 | 2 | FOUND-04 | unit | `npm run test -- --run` | ❌ W0 | ⬜ pending |
| 1-02-02 | 01-02 | 2 | FOUND-05 | unit | `npm run test -- --run` | ❌ W0 | ⬜ pending |
| 1-02-03 | 01-02 | 2 | FOUND-06 | unit | `npm run test -- --run` | ❌ W0 | ⬜ pending |
| 1-03-01 | 01-03 | 3 | FOUND-07 | axe | `npm run test -- --run` | ❌ W0 | ⬜ pending |
| 1-03-02 | 01-03 | 3 | FOUND-08 | build | `npm run build` | ❌ W0 | ⬜ pending |
| 1-03-03 | 01-03 | 3 | FOUND-09 | e2e-manual | manual | ❌ W0 | ⬜ pending |

*Status: ⬜ pending · ✅ green · ❌ red · ⚠️ flaky*

---

## Wave 0 Requirements

- [x] `vitest.config.ts` — Vitest config with jsdom environment and @chialab/vitest-axe setup
- [x] `src/__tests__/setup.ts` — global test setup (axe config, RTL config)
- [x] `src/__tests__/smoke/token-bridge.test.ts` — stub: verifies CSS custom properties present
- [x] `src/__tests__/smoke/api-layer.test.ts` — stub: verifies getMothers() returns typed data
- [x] `src/__tests__/smoke/a11y.test.tsx` — stub: axe smoke test on layout shell

*Wave 0 installs all testing infrastructure before plan execution begins.*

---

## Manual-Only Verifications

| Behavior | Requirement | Why Manual | Test Instructions |
|----------|-------------|------------|-------------------|
| CSS custom properties visible in DevTools | FOUND-02 | Requires browser DevTools inspection | Run `npm run dev`, open DevTools → Elements → Computed, verify `--color-*`, `--spacing-*` etc. present on `:root` |
| Auth guard redirects unauthenticated users | FOUND-09 | Requires browser navigation test | Run `npm run dev`, navigate to `/` (app route) without session cookie, verify redirect to `/login` |
| Token extraction from MomCare Design System | FOUND-02 | Design system has no programmatic token export | Open Storybook at deployed URL, manually read color/spacing/radius/shadow values from reference stories |

---

## Validation Sign-Off

- [x] All tasks have `<automated>` verify or Wave 0 dependencies
- [x] Sampling continuity: no 3 consecutive tasks without automated verify
- [x] Wave 0 covers all MISSING references
- [x] No watch-mode flags
- [x] Feedback latency < 30s
- [x] `nyquist_compliant: true` set in frontmatter

**Approval:** signed
