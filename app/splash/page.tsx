'use client'

import { useEffect } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SplashScreen() {
  const router = useRouter()

  useEffect(() => {
    const timer = setTimeout(() => router.push('/onboarding'), 2500)
    return () => clearTimeout(timer)
  }, [router])

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      style={{
        background:
          'radial-gradient(ellipse at center, var(--color-splash-bg-center) 0%, var(--color-splash-bg-mid) 45%, var(--color-splash-bg-edge) 100%)',
      }}
    >
      {/* Logo lockup */}
      <div
        style={{
          animation: 'splash-fade-in 0.8s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
          opacity: 0,
        }}
        className="flex flex-col items-center"
      >
        <Image
          src="/logo.png"
          alt="MomCare"
          width={220}
          height={220}
          priority
          className="select-none"
          style={{ objectFit: 'contain' }}
        />
      </div>
    </div>
  )
}
