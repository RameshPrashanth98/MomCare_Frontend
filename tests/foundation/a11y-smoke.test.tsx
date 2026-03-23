import { describe, it, expect } from 'vitest'
import { render } from '@testing-library/react'
import axeCore from 'axe-core'

function TokenDemoForTest() {
  return (
    <main>
      <h1>MomCare Token Demo</h1>
      <p>This component uses design tokens only.</p>
      <div role="status" aria-label="Risk level indicator">
        <span>High Risk</span>
      </div>
    </main>
  )
}

describe('Accessibility smoke test', () => {
  it('token demo component has no axe violations', async () => {
    const { container } = render(<TokenDemoForTest />)
    const results = await axeCore.run(container)
    expect(results).toHaveNoViolations()
  })
})
