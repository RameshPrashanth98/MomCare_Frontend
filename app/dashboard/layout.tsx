import React from 'react'

export default function DashboardLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-dvh w-full flex items-center justify-center"
      style={{ background: 'var(--color-surface-secondary)' }}
    >
      <div
        className="w-full max-w-[393px] min-h-dvh relative flex flex-col"
        style={{ background: 'var(--color-surface-secondary)' }}
      >
        {children}
      </div>
    </div>
  )
}
