'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import IllustrationWelcome from '@/components/onboarding/illustrations/IllustrationWelcome'
import IllustrationMothers from '@/components/onboarding/illustrations/IllustrationMothers'
import IllustrationSessions from '@/components/onboarding/illustrations/IllustrationSessions'
import IllustrationHealth from '@/components/onboarding/illustrations/IllustrationHealth'

const FEATURE_SCREENS = [
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

/* ── Shared: medical cross rounded-square icon ── */
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
      {/* White medical cross */}
      <svg
        width={size * 0.46}
        height={size * 0.46}
        viewBox="0 0 40 40"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <rect x="15" y="4" width="10" height="32" rx="4" fill="white" />
        <rect x="4" y="15" width="32" height="10" rx="4" fill="white" />
      </svg>
    </div>
  )
}

/* ── Shared: pagination dots ── */
function PaginationDots({ total, current }: { total: number; current: number }) {
  return (
    <div style={{ display: 'flex', gap: 6, justifyContent: 'center', alignItems: 'center' }}>
      {Array.from({ length: total }).map((_, i) => (
        <div
          key={i}
          style={{
            height: 8,
            width: i === current ? 20 : 8,
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

/* ── Welcome Screen (step 0) ── */
function WelcomeScreen({ onGetStarted }: { onGetStarted: () => void }) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 393,
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        paddingBottom: 32,
      }}
    >
      {/* Decorative circle — top right (clipped) */}
      <div
        style={{
          position: 'absolute',
          top: -48,
          right: -48,
          width: 160,
          height: 160,
          borderRadius: '50%',
          backgroundColor: 'rgba(232,82,122,0.12)',
          pointerEvents: 'none',
        }}
      />
      {/* Decorative circle — bottom left */}
      <div
        style={{
          position: 'absolute',
          bottom: 60,
          left: -36,
          width: 110,
          height: 110,
          borderRadius: '50%',
          backgroundColor: 'rgba(232,82,122,0.09)',
          pointerEvents: 'none',
        }}
      />

      {/* Content column */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: '56px 24px 0',
          flex: 1,
          gap: 0,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* App icon */}
        <AppIcon size={80} />

        {/* App name */}
        <p
          style={{
            fontSize: 26,
            fontWeight: 700,
            color: 'var(--color-brand-pink)',
            marginTop: 14,
            marginBottom: 2,
            letterSpacing: '-0.3px',
          }}
        >
          MomCare
        </p>
        <p
          style={{
            fontSize: 11,
            fontWeight: 500,
            letterSpacing: '2px',
            textTransform: 'uppercase',
            color: 'var(--color-on-surface-secondary)',
            marginBottom: 24,
          }}
        >
          CLINIC MANAGEMENT
        </p>

        {/* Illustration card */}
        <div
          style={{
            width: '100%',
            maxWidth: 330,
            borderRadius: 20,
            backgroundColor: 'var(--color-illustration-bg)',
            boxShadow: '0 4px 20px rgba(232,82,122,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 8px',
            overflow: 'hidden',
          }}
        >
          <IllustrationWelcome />
        </div>

        {/* Category badge */}
        <div
          style={{
            display: 'flex',
            alignItems: 'center',
            gap: 6,
            marginTop: 20,
            marginBottom: 10,
          }}
        >
          <div
            style={{
              width: 7,
              height: 7,
              borderRadius: '50%',
              backgroundColor: 'var(--color-brand-pink)',
              flexShrink: 0,
            }}
          />
          <span
            style={{
              fontSize: 13,
              fontWeight: 500,
              color: 'var(--color-brand-pink)',
            }}
          >
            Maternal Healthcare
          </span>
        </div>

        {/* Title */}
        <h1
          style={{
            fontSize: 27,
            fontWeight: 700,
            color: 'var(--color-on-surface)',
            textAlign: 'center',
            lineHeight: 1.28,
            marginBottom: 12,
            letterSpacing: '-0.4px',
          }}
        >
          Welcome to the{'\n'}Maternal Health Clinic
        </h1>

        {/* Description */}
        <p
          style={{
            fontSize: 14,
            color: 'var(--color-on-surface-secondary)',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: 28,
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          Helping healthcare workers manage maternal clinics, patient records, and antenatal care efficiently.
        </p>

        {/* Get Started button */}
        <button
          onClick={onGetStarted}
          style={{
            width: '100%',
            height: 54,
            borderRadius: 9999,
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
            boxShadow: '0 4px 16px rgba(232,82,122,0.35)',
            marginBottom: 20,
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

        {/* Pagination dots */}
        <PaginationDots total={4} current={0} />
      </div>
    </div>
  )
}

/* ── Feature Screens (steps 1-3) ── */
function FeatureScreen({
  step,
  title,
  description,
  IllustrationComponent,
  onGetStarted,
  onNext,
  onBack,
  onSkip,
  isLast,
}: {
  step: number
  title: string
  description: string
  IllustrationComponent: React.ComponentType
  onGetStarted: () => void
  onNext: () => void
  onBack: () => void
  onSkip: () => void
  isLast: boolean
}) {
  return (
    <div
      style={{
        position: 'relative',
        width: '100%',
        maxWidth: 393,
        minHeight: '100dvh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        overflow: 'hidden',
        paddingBottom: 32,
      }}
    >
      {/* Content */}
      <div
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          width: '100%',
          padding: '52px 24px 0',
          flex: 1,
          position: 'relative',
          zIndex: 1,
        }}
      >
        {/* Small app icon */}
        <AppIcon size={48} />

        {/* Screen title */}
        <h2
          style={{
            fontSize: 22,
            fontWeight: 700,
            color: 'var(--color-on-surface)',
            textAlign: 'center',
            marginTop: 16,
            marginBottom: 20,
            lineHeight: 1.25,
            letterSpacing: '-0.3px',
          }}
        >
          {title}
        </h2>

        {/* Illustration */}
        <div
          style={{
            width: '100%',
            maxWidth: 330,
            borderRadius: 20,
            backgroundColor: 'var(--color-illustration-bg)',
            boxShadow: '0 4px 20px rgba(232,82,122,0.10)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            padding: '12px 8px',
            overflow: 'hidden',
            marginBottom: 24,
          }}
        >
          <IllustrationComponent />
        </div>

        {/* Description */}
        <p
          style={{
            fontSize: 15,
            color: 'var(--color-on-surface-secondary)',
            textAlign: 'center',
            lineHeight: 1.6,
            marginBottom: 28,
            paddingLeft: 4,
            paddingRight: 4,
          }}
        >
          {description}
        </p>

        {/* Get Started button */}
        <button
          onClick={onGetStarted}
          style={{
            width: '100%',
            height: 52,
            borderRadius: 14,
            backgroundColor: 'var(--color-brand-pink)',
            color: 'white',
            fontWeight: 600,
            fontSize: 16,
            border: 'none',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 4px 16px rgba(232,82,122,0.3)',
            marginBottom: 20,
          }}
        >
          Get Started
        </button>

        {/* Pagination dots */}
        <PaginationDots total={4} current={step} />

        {/* Navigation row */}
        <div
          style={{
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            width: '100%',
            marginTop: 20,
          }}
        >
          {/* Left nav */}
          {step === 1 ? (
            <button
              onClick={onSkip}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--color-on-surface-secondary)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
              }}
            >
              Skip
            </button>
          ) : (
            <button
              onClick={onBack}
              style={{
                fontSize: 14,
                fontWeight: 500,
                color: 'var(--color-on-surface-secondary)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
              }}
            >
              &lt; Back
            </button>
          )}

          {/* Right nav */}
          {!isLast ? (
            <button
              onClick={onNext}
              style={{
                fontSize: 14,
                fontWeight: 600,
                color: 'var(--color-brand-pink)',
                background: 'transparent',
                border: 'none',
                cursor: 'pointer',
                padding: '4px 0',
              }}
            >
              Next &gt;
            </button>
          ) : (
            <span />
          )}
        </div>
      </div>
    </div>
  )
}

/* ── Main Page ── */
export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const router = useRouter()

  const goToLogin = () => router.push('/login')

  const featureIndex = step - 1 // 0-based index into FEATURE_SCREENS
  const featureScreen = step > 0 ? FEATURE_SCREENS[featureIndex] : null

  return (
    <div
      style={{
        minHeight: '100dvh',
        width: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background:
          'radial-gradient(ellipse at center, var(--color-splash-bg-center) 0%, var(--color-splash-bg-mid) 50%, var(--color-splash-bg-edge) 100%)',
      }}
    >
      {step === 0 && (
        <WelcomeScreen onGetStarted={() => setStep(1)} />
      )}

      {step > 0 && featureScreen && (
        <FeatureScreen
          step={step}
          title={featureScreen.title}
          description={featureScreen.description}
          IllustrationComponent={featureScreen.illustration}
          onGetStarted={goToLogin}
          onNext={() => setStep(step + 1)}
          onBack={() => setStep(step - 1)}
          onSkip={goToLogin}
          isLast={step === 3}
        />
      )}
    </div>
  )
}
