import Image from 'next/image'

export default function IllustrationWelcome() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'visible' }}>
      {/* Base image */}
      <Image
        src="/images/onboarding-1.png"
        alt="Healthcare worker managing patient profile"
        width={363}
        height={290}
        priority
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          borderRadius: 12,
          display: 'block',
        }}
      />

      {/* Shimmer sweep across the monitor screen */}
      <div
        style={{
          position: 'absolute',
          top: '5%',
          left: '3%',
          width: '60%',
          height: '85%',
          borderRadius: 8,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '60%',
            height: '100%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
            animation: 'onb-shimmer-sweep 3s ease-in-out 1.5s infinite',
          }}
        />
      </div>

      {/* Floating heart near the nurse — top right */}
      <svg
        width="18"
        height="18"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '8%',
          right: '12%',
          animation: 'onb-heart-float 2.5s ease-in-out infinite',
          opacity: 0,
          filter: 'drop-shadow(0 2px 4px rgba(232,82,122,0.3))',
        }}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#E8527A"
        />
      </svg>

      {/* Second floating heart — smaller, different timing */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '18%',
          right: '6%',
          animation: 'onb-heart-float 3s ease-in-out 0.8s infinite',
          opacity: 0,
          filter: 'drop-shadow(0 1px 3px rgba(232,82,122,0.2))',
        }}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#F9A8C0"
        />
      </svg>

      {/* Sparkle near clipboard — nurse's hand area */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '30%',
          right: '18%',
          animation: 'onb-sparkle 2s ease-in-out 0.5s infinite',
          opacity: 0,
        }}
      >
        <path
          d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z"
          fill="#FFD700"
          stroke="#FFA500"
          strokeWidth="0.5"
        />
      </svg>

      {/* Small sparkle on monitor top-left */}
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '10%',
          left: '8%',
          animation: 'onb-sparkle 2.5s ease-in-out 1.2s infinite',
          opacity: 0,
        }}
      >
        <path
          d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z"
          fill="#FFD700"
        />
      </svg>

      {/* Pulsing notification dot on the monitor */}
      <div
        style={{
          position: 'absolute',
          top: '6%',
          left: '58%',
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: '#E8527A',
          animation: 'onb-pulse-dot 2s ease-in-out infinite',
          boxShadow: '0 0 0 0 rgba(232,82,122,0.5)',
        }}
      />

      {/* Floating medical cross near nurse */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 20 20"
        fill="none"
        style={{
          position: 'absolute',
          top: '5%',
          right: '25%',
          animation: 'onb-cross-float 3.5s ease-in-out 0.3s infinite',
          opacity: 0,
        }}
      >
        <rect x="8" y="2" width="4" height="16" rx="2" fill="#E8527A" fillOpacity="0.6" />
        <rect x="2" y="8" width="16" height="4" rx="2" fill="#E8527A" fillOpacity="0.6" />
      </svg>

      {/* Animated checkmark on monitor — vitals area */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '35%',
          left: '35%',
          animation: 'onb-check-pop 3s ease-in-out 2s infinite',
          opacity: 0,
        }}
      >
        <circle cx="12" cy="12" r="10" fill="#16A34A" fillOpacity="0.9" />
        <path
          d="M8 12.5l2.5 2.5 5-5"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Gentle glow behind the nurse */}
      <div
        style={{
          position: 'absolute',
          top: '15%',
          right: '5%',
          width: '35%',
          height: '60%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,82,122,0.08) 0%, transparent 70%)',
          animation: 'onb-glow-pulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />
    </div>
  )
}
