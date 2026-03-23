import { describe, it, expect } from 'vitest'
import { readFileSync } from 'fs'
import { resolve } from 'path'

describe('Token bridge', () => {
  const globalsCss = readFileSync(resolve(__dirname, '../../app/globals.css'), 'utf-8')

  it('globals.css contains @theme block', () => {
    expect(globalsCss).toContain('@theme')
  })

  it('declares primary color token', () => {
    expect(globalsCss).toContain('--color-primary:')
  })

  it('declares risk level color tokens', () => {
    expect(globalsCss).toContain('--color-risk-high:')
    expect(globalsCss).toContain('--color-risk-medium:')
    expect(globalsCss).toContain('--color-risk-low:')
  })

  it('declares spacing tokens', () => {
    expect(globalsCss).toContain('--spacing-xs:')
    expect(globalsCss).toContain('--spacing-md:')
    expect(globalsCss).toContain('--spacing-xl:')
  })

  it('declares radius tokens', () => {
    expect(globalsCss).toContain('--radius-sm:')
    expect(globalsCss).toContain('--radius-md:')
  })

  it('declares shadow tokens', () => {
    expect(globalsCss).toContain('--shadow-sm:')
    expect(globalsCss).toContain('--shadow-md:')
  })

  it('declares responsive breakpoints', () => {
    expect(globalsCss).toContain('--breakpoint-mobile: 360px')
    expect(globalsCss).toContain('--breakpoint-tablet: 768px')
    expect(globalsCss).toContain('--breakpoint-desktop: 1280px')
  })
})
