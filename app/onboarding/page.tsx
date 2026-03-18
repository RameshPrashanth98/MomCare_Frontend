'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import IllustrationWelcome from '@/components/onboarding/illustrations/IllustrationWelcome'
import IllustrationMothers from '@/components/onboarding/illustrations/IllustrationMothers'
import IllustrationSessions from '@/components/onboarding/illustrations/IllustrationSessions'
import IllustrationHealth from '@/components/onboarding/illustrations/IllustrationHealth'

const SCREENS = [
  {
    title: 'Maternal Health Clinic Management',
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

export default function OnboardingPage() {
  const [step, setStep] = useState(0)
  const router = useRouter()

  const current = SCREENS[step]
  const IllustrationComponent = current.illustration

  const handleNext = () => {
    if (step < 3) {
      setStep(step + 1)
    } else {
      router.push('/login')
    }
  }

  const handleBack = () => {
    setStep(step - 1)
  }

  const handleSkip = () => {
    router.push('/login')
  }

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center"
      style={{
        background:
          'radial-gradient(ellipse at center, var(--color-splash-bg-center) 0%, var(--color-splash-bg-mid) 45%, var(--color-splash-bg-edge) 100%)',
      }}
    >
      <div className="w-full max-w-[393px] flex flex-col items-center px-6 py-10 min-h-screen">

        {/* Medical cross icon */}
        <div
          className="w-12 h-12 rounded-full flex items-center justify-center"
          style={{ backgroundColor: 'var(--color-brand-pink)' }}
        >
          <span className="text-2xl font-bold text-white leading-none select-none">+</span>
        </div>

        {/* Title */}
        <h1
          className="text-xl font-bold text-center mt-4"
          style={{ color: 'var(--color-brand-pink)' }}
        >
          {current.title}
        </h1>

        {/* Illustration */}
        <div className="flex items-center justify-center my-6">
          <IllustrationComponent />
        </div>

        {/* Description */}
        <p
          className="text-sm text-center leading-relaxed px-2"
          style={{ color: 'var(--color-on-surface-secondary)' }}
        >
          {current.description}
        </p>

        {/* Get Started CTA button */}
        <button
          onClick={handleNext}
          className="w-full py-4 rounded-full font-semibold text-white mt-6"
          style={{ backgroundColor: 'var(--color-brand-pink)' }}
        >
          Get Started
        </button>

        {/* Pagination dots */}
        <div className="flex gap-2 justify-center mt-4">
          {SCREENS.map((_, i) => (
            <div
              key={i}
              className="h-2 rounded-full transition-all duration-300"
              style={{
                width: i === step ? '16px' : '8px',
                backgroundColor: 'var(--color-brand-pink)',
                opacity: i === step ? 1 : 0.3,
              }}
            />
          ))}
        </div>

        {/* Navigation row */}
        <div className="flex justify-between items-center mt-4 w-full">
          {/* Left: nothing on step 0, Skip on steps 1-2, Back on step 3 */}
          {step === 0 && <span />}
          {(step === 1 || step === 2) && (
            <button
              onClick={handleSkip}
              className="text-sm font-medium bg-transparent border-0 cursor-pointer"
              style={{ color: 'var(--color-brand-pink)' }}
            >
              Skip
            </button>
          )}
          {step === 3 && (
            <button
              onClick={handleBack}
              className="text-sm font-medium bg-transparent border-0 cursor-pointer"
              style={{ color: 'var(--color-brand-pink)' }}
            >
              &lt; Back
            </button>
          )}

          {/* Right: Next on steps 0-2, nothing on step 3 */}
          {step < 3 ? (
            <button
              onClick={handleNext}
              className="text-sm font-medium bg-transparent border-0 cursor-pointer"
              style={{ color: 'var(--color-brand-pink)' }}
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
