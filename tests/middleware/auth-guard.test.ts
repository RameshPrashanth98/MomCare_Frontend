import { describe, it, expect } from 'vitest'

describe('Auth guard route matching', () => {
  const PROTECTED_ROUTES = ['/dashboard']

  function isProtectedRoute(pathname: string): boolean {
    return PROTECTED_ROUTES.some((route) => pathname.startsWith(route))
  }

  it('identifies /dashboard as a protected route', () => {
    expect(isProtectedRoute('/dashboard')).toBe(true)
  })

  it('identifies /dashboard/mothers as a protected route', () => {
    expect(isProtectedRoute('/dashboard/mothers')).toBe(true)
  })

  it('does not protect /login', () => {
    expect(isProtectedRoute('/login')).toBe(false)
  })

  it('does not protect /onboarding', () => {
    expect(isProtectedRoute('/onboarding')).toBe(false)
  })

  it('does not protect /splash', () => {
    expect(isProtectedRoute('/splash')).toBe(false)
  })
})
