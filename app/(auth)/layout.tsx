import React from 'react'

export default function AuthLayout({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="min-h-dvh w-full flex items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse at center, var(--color-splash-bg-center) 0%, var(--color-splash-bg-mid) 50%, var(--color-splash-bg-edge) 100%)',
      }}
    >
      <div className="w-full max-w-[430px] min-h-dvh">
        {children}
      </div>
    </div>
  )
}
