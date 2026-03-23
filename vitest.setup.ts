import { expect, beforeAll, afterEach, afterAll } from 'vitest'
import matchers from '@chialab/vitest-axe'
import { server } from './mocks/server'

// Extend Vitest with axe-core matchers (toHaveNoViolations)
expect.extend(matchers)

// MSW server lifecycle
beforeAll(() => server.listen({ onUnhandledRequest: 'error' }))
afterEach(() => server.resetHandlers())
afterAll(() => server.close())
