'use client'

import { useState, useCallback } from 'react'
import { useRouter } from 'next/navigation'
import IllustrationWelcome from '@/components/onboarding/illustrations/IllustrationWelcome'
import IllustrationMothers from '@/components/onboarding/illustrations/IllustrationMothers'
import IllustrationSessions from '@/components/onboarding/illustrations/IllustrationSessions'
import IllustrationHealth from '@/components/onboarding/illustrations/IllustrationHealth'

const SCREENS = [
  {
    title: 'Welcome to the\nMaternal Health Clinic System',
    description:
      'Helping healthcare workers manage maternal clinics, patient records, and antenatal care efficiently.',
    illustration: IllustrationWelcome,
  },
  {
    title: 'Manage Pregnant Mothers',
    description:
      'Register new mothers, track pregnancy progress, and manage maternal health records in one place.',
    illustration: IllustrationMothers,
  },
  {
    title: 'Manage Clinic Sessions',
    description:
      'Schedule clinics, track attendance, and manage clinic sessions efficiently.',
    illustration: IllustrationSessions,
  },
  {
    title: 'Monitor Maternal Health',
    description:
      'Track weight, blood pressure, lab reports, and vaccinations throughout pregnancy.',
    illustration: IllustrationHealth,
  },
]

/* ── Medical cross icon ── */
function AppIcon({ size = 80 }: { size?: number }) {
  const radius = size * 0.22
  return (
    <div
      style={{
        width: size,
        height: size,
        borderRadius: radius,
        background: `linear-gradient(145deg, var(--color-brand-pink-light), var(--color-brand-pink), var(--color-brand-pink-dark))`,
        boxShadow: '0 8px 24px rgba(232,82,122,0.35)',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        flexShrink: 0,
      }}
    >
      <svg
        width={size * 0.46}
        height={size * 0.46}
        viewBox="0 0 40 40"
        fill="none"
      >
        <rect x="15" y="4" width="10" height="32" rx="4" fill="white" />
        <rect x="4" y="15" width="32" height="10" rx="4" fill="white" />
      </svg>
    </div>
  )
}

/* ── Pagination dots ── */
function PaginationDots({ total, current }: { total: number; current: number }) {
  return (
    <div style={{ display: 'flex', gap: 6, alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 8,
            width: i === current ? 22 : 8,
            borderRadius: 9999,
            backgroundColor:
              i === current
                ? 'var(--color-brand-pink-dark)'
                : 'rgba(232,82,122,0.25)',
            transition: 'width 0.3s ease, background-color 0.3s ease',
          }}
        />
      ))}
    </div>
  )
}

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const [animKey, setAnimKey] = useState(0)
  const router = useRouter()

  const goToLogin = () => router.push('/login')

  const goToStep = useCallback((next: number) => {
    setAnimKey((k) => k + 1)
    setStep(next)
  }, [])

  const screen = SCREENS[step]
  const Illustration = screen.illustration
  const isLast = step === SCREENS.length - 1

  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: '#FFFFFF',
      }}
    >
      <div
        style={{
          position: 'relative',
          width: '100%',
          maxWidth: 430,
          minHeight: '100dvh',
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
          background: '#FFFFFF',
        }}
      >
        {/* Decorative circle — top right */}
        <div
          style={{
            position: 'absolute',
            top: -50,
            right: -50,
            width: 170,
            height: 170,
            borderRadius: '50%',
            backgroundColor: 'rgba(232,82,122,0.10)',
            pointerEvents: 'none',
          }}
        />

        {/* Content */}
        <div
          key={animKey}
          style={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            width: '100%',
            padding: '56px 24px 0',
            flex: 1,
            position: 'relative',
            zIndex: 1,
          }}
        >
          {/* App icon — animated entrance */}
          <div
            style={{
              animation: 'onb-icon-pop 0.5s cubic-bezier(0.34,1.56,0.64,1) forwards',
              opacity: 0,
            }}
          >
            <AppIcon size={72} />
          </div>

          {/* Illustration card — animated */}
          <div
            style={{
              width: '100%',
              maxWidth: 340,
              borderRadius: 20,
              backgroundColor: 'var(--color-illustration-bg)',
              boxShadow: '0 4px 24px rgba(232,82,122,0.08)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              padding: '16px 8px',
              overflow: 'hidden',
              marginTop: 20,
              animation: 'onb-illus-enter 0.7s cubic-bezier(0.22,1,0.36,1) 0.15s forwards',
              opacity: 0,
            }}
          >
            <div
              style={{
                animation: 'onb-illus-float 4s ease-in-out 1s infinite',
              }}
            >
              <Illustration />
            </div>
          </div>

          {/* Title — animated */}
          <h1
            style={{
              fontSize: 26,
              fontWeight: 700,
              color: 'var(--color-on-surface)',
              textAlign: 'center',
              lineHeight: 1.3,
              letterSpacing: '-0.4px',
              marginTop: 28,
              marginBottom: 12,
              whiteSpace: 'pre-line',
              animation: 'onb-text-up 0.6s ease-out 0.35s forwards',
              opacity: 0,
            }}
          >
            {screen.title}
          </h1>

          {/* Description — animated */}
          <p
            style={{
              fontSize: 14,
              color: 'var(--color-on-surface-secondary)',
              textAlign: 'center',
              lineHeight: 1.7,
              paddingLeft: 8,
              paddingRight: 8,
              animation: 'onb-text-up 0.6s ease-out 0.5s forwards',
              opacity: 0,
            }}
          >
            {screen.description}
          </p>

          {/* Spacer */}
          <div style={{ flex: 1, minHeight: 24 }} />

          {/* Get Started button — animated */}
          <button
            onClick={goToLogin}
            style={{
              width: '100%',
              height: 54,
              borderRadius: 16,
              backgroundColor: 'var(--color-brand-pink)',
              color: 'white',
              fontWeight: 600,
              fontSize: 16,
              border: 'none',
              cursor: 'pointer',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: 8,
              boxShadow: '0 4px 16px rgba(232,82,122,0.30)',
              animation: 'onb-btn-up 0.5s ease-out 0.6s forwards',
              opacity: 0,
            }}
          >
            Get Started
            <svg width="18" height="18" viewBox="0 0 18 18" fill="none">
              <path
                d="M3.75 9H14.25M14.25 9L10.5 5.25M14.25 9L10.5 12.75"
                stroke="white"
                strokeWidth="1.8"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
          </button>

          {/* Bottom nav row */}
          <div
            style={{
              display: 'flex',
              justifyContent: 'space-between',
              alignItems: 'center',
              width: '100%',
              marginTop: 24,
              paddingBottom: 32,
              animation: 'onb-fade-in 0.4s ease-out 0.7s forwards',
              opacity: 0,
            }}
          >
            {/* Skip / Back */}
            <button
              onClick={step === 0 ? goToLogin : () => goToStep(step - 1)}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--color-on-surface-secondary)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
                minWidth: 50,
                textAlign: 'left',
              }}
            >
              {step === 0 ? 'Skip' : 'Back'}
            </button>

            {/* Dots */}
            <PaginationDots total={SCREENS.length} current={step} />

            {/* Next */}
            {!isLast ? (
              <button
                onClick={() => goToStep(step + 1)}
                style={{
                  fontSize: 14,
                  fontWeight: 600,
                  color: 'var(--color-brand-pink)',
                  background: 'transparent',
                  border: 'none',
                  cursor: 'pointer',
                  padding: '4px 0',
                  minWidth: 50,
                  textAlign: 'right',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'flex-end',
                  gap: 4,
                }}
              >
                Next
                <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                  <path
                    d="M5.25 3.5L8.75 7L5.25 10.5"
                    stroke="var(--color-brand-pink)"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </button>
            ) : (
              <span style={{ minWidth: 50 }} />
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
