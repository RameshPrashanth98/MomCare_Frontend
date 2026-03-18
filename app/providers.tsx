'use client'
import { QueryClientProvider } from '@tanstack/react-query'
import { queryClient } from '@/lib/query/client'
import { useEffect, useState } from 'react'

export function Providers({ children }: { children: React.ReactNode }) {
  const [ready, setReady] = useState(false)

  useEffect(() => {
    async function init() {
      if (process.env.NODE_ENV === 'development') {
        const { worker } = await import('@/mocks/browser')
        await worker.start({ onUnhandledRequest: 'bypass' })
      }
      setReady(true)
    }
    init()
  }, [])

  if (!ready && process.env.NODE_ENV === 'development') {
    return null
  }

  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  )
}
