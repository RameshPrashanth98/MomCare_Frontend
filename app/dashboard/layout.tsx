import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-dvh w-full flex items-center justify-center"
      style={{ background: 'var(--color-surface-secondary)' }}
    >
      <div
        className="w-full min-h-dvh relative flex flex-col"
        style={{ maxWidth: '430px', background: 'var(--color-surface-secondary)' }}
      >
        {children}
      </div>
    </div>
  )
}
