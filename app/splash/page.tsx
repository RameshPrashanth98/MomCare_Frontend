'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SplashScreen() {
  const router = useRouter()
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 2800)
    const navTimer = setTimeout(() => router.push('/onboarding'), 3300)
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
          ? { animation: 'splash-fade-out 0.5s ease-in forwards' }
          : {}),
      }}
    >
      {/* Floating particles */}
      {[...Array(6)].map((_, i) => (
        <div
          key={i}
          style={{
            position: 'absolute',
            width: `${6 + i * 3}px`,
            height: `${6 + i * 3}px`,
            borderRadius: '50%',
            background: `rgba(232, 100, 136, ${0.12 + i * 0.03})`,
            animation: `splash-float-${i % 3} ${3 + i * 0.5}s ease-in-out ${i * 0.3}s infinite`,
            top: `${15 + i * 12}%`,
            left: `${10 + i * 14}%`,
          }}
        />
      ))}

      {/* Outer glow ring */}
      <div
        style={{
          position: 'absolute',
          width: '300px',
          height: '300px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,100,136,0.08) 0%, transparent 70%)',
          animation: 'splash-glow-breathe 2s ease-in-out 0.5s infinite',
          opacity: 0,
        }}
      />

      {/* Pulse rings */}
      <div
        style={{
          position: 'absolute',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          border: '1.5px solid rgba(232, 100, 136, 0.3)',
          animation: 'splash-pulse-ring 2s ease-out 0.8s infinite',
          opacity: 0,
        }}
      />
      <div
        style={{
          position: 'absolute',
          width: '220px',
          height: '220px',
          borderRadius: '50%',
          border: '1.5px solid rgba(232, 100, 136, 0.2)',
          animation: 'splash-pulse-ring 2s ease-out 1.4s infinite',
          opacity: 0,
        }}
      />

      {/* Logo + Text lockup */}
      <div className="flex flex-col items-center" style={{ gap: '8px' }}>
        {/* Logo with entrance animation */}
        <div
          style={{
            animation: 'splash-logo-enter 1.2s cubic-bezier(0.34, 1.56, 0.64, 1) forwards',
            opacity: 0,
          }}
        >
          <div
            style={{
              animation: 'splash-logo-float 3s ease-in-out 1.2s infinite',
            }}
          >
            <Image
              src="/logo.png"
              alt="MomCare"
              width={180}
              height={180}
              priority
              className="select-none"
              style={{
                objectFit: 'contain',
                filter: 'drop-shadow(0 8px 32px rgba(232, 100, 136, 0.3))',
              }}
            />
          </div>
        </div>

        {/* Decorative line */}
        <div
          style={{
            width: '40px',
            height: '2px',
            borderRadius: '1px',
            background: 'linear-gradient(90deg, transparent, rgba(232,100,136,0.5), transparent)',
            animation: 'splash-line-expand 0.8s ease-out 0.9s forwards',
            opacity: 0,
            transform: 'scaleX(0)',
          }}
        />

        {/* Tagline */}
        <p
          style={{
            animation: 'splash-text-slide 0.7s ease-out 1.1s forwards',
            opacity: 0,
            fontSize: '11px',
            fontWeight: 500,
            color: 'var(--color-brand-pink)',
            textTransform: 'uppercase',
            letterSpacing: '0.15em',
          }}
        >
          Caring for every mother
        </p>
      </div>
    </div>
  )
}
