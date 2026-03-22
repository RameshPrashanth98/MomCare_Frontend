'use client'

import { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation'
import Image from 'next/image'

export default function SplashScreen() {
  const router = useRouter()
  const [exiting, setExiting] = useState(false)

  useEffect(() => {
    const exitTimer = setTimeout(() => setExiting(true), 9000)
    const navTimer = setTimeout(() => router.push('/onboarding'), 9600)
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
          ? { animation: 'splash-exit 0.6s ease-in forwards' }
          : {}),
      }}
    >
      {/* Soft radial glow behind logo — breathes continuously */}
      <div
        style={{
          position: 'absolute',
          width: '320px',
          height: '320px',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,100,136,0.06) 0%, transparent 70%)',
          animation: 'splash-glow 4s ease-in-out 1.5s infinite',
          opacity: 0,
        }}
      />

      {/* Pulse ring 1 */}
      <div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '1px solid rgba(232,100,136,0.15)',
          animation: 'splash-ring 3s ease-out 2s infinite',
          opacity: 0,
        }}
      />

      {/* Pulse ring 2 — offset */}
      <div
        style={{
          position: 'absolute',
          width: '200px',
          height: '200px',
          borderRadius: '50%',
          border: '1px solid rgba(232,100,136,0.10)',
          animation: 'splash-ring 3s ease-out 3.5s infinite',
          opacity: 0,
        }}
      />

      {/* Main content — logo + tagline */}
      <div
        className="flex flex-col items-center"
        style={{ gap: '0px', marginTop: '40px' }}
      >
        {/* Logo — scale + fade entrance, then gentle float */}
        <div
          style={{
            animation: 'splash-logo-in 1.8s cubic-bezier(0.25, 1, 0.5, 1) forwards',
            opacity: 0,
          }}
        >
          <div
            style={{
              animation: 'splash-float 5s ease-in-out 2s infinite',
            }}
          >
            <Image
              src="/logo.png"
              alt="MomCare"
              width={160}
              height={160}
              priority
              className="select-none"
              style={{
                objectFit: 'contain',
              }}
            />
          </div>
        </div>

        {/* Tagline — matches design exactly */}
        <p
          style={{
            animation: 'splash-tagline-in 1s ease-out 1.6s forwards',
            opacity: 0,
            fontSize: '14px',
            fontWeight: 400,
            color: '#9CA3AF',
            letterSpacing: '0.02em',
            marginTop: '32px',
          }}
        >
          Maternal Health Clinic Management
        </p>
      </div>
    </div>
  )
}
