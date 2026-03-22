'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SplashScreen() {
  const router = useRouter()
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 2000)
    const navTimer = setTimeout(() => router.push('/onboarding'), 2500)
    return () => {
      clearTimeout(exitTimer)
      clearTimeout(navTimer)
    }
  }, [router])

  return (
    <div
      className="relative flex min-h-screen w-full items-center justify-center overflow-hidden"
      style={{
        background: '#FFFFFF',
        ...(exiting
          ? {
              animation: 'splash-fade-out 0.5s ease-in forwards',
            }
          : {}),
      }}
    >
      {/* Pulse ring behind logo */}
      <div
        style={{
          position: 'absolute',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          border: '2px solid var(--color-brand-pink)',
          animation: 'splash-pulse-ring 1.6s ease-out 0.3s infinite',
          opacity: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '260px',
          height: '260px',
          borderRadius: '50%',
          border: '2px solid var(--color-brand-pink)',
          animation: 'splash-pulse-ring 1.6s ease-out 0.8s infinite',
          opacity: 0,
        }}
      />

      {/* Logo + Text lockup */}
      <div className="flex flex-col items-center" style={{ gap: '4px' }}>
        {/* Logo */}
        <div
          style={{
            animation: 'splash-logo-enter 1s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            opacity: 0,
          }}
        >
          <Image
            src="/logo.png"
            alt="MomCare"
            width={200}
            height={200}
            priority
            className="select-none"
            style={{
              objectFit: 'contain',
              filter: 'drop-shadow(0 4px 24px rgba(232, 100, 136, 0.25))',
            }}
          />
        </div>

        {/* Tagline */}
        <p
          style={{
            animation: 'splash-text-slide 0.7s ease-out 0.6s forwards',
            opacity: 0,
            fontSize: '12px',
            fontWeight: 500,
            color: 'var(--color-brand-pink)',
            textTransform: 'uppercase',
            letterSpacing: '0.12em',
            marginTop: '4px',
          }}
        >
          Caring for every mother
        </p>
      </div>
    </div>
  )
}
