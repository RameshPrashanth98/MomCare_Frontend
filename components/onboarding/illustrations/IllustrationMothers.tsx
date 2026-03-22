import Image from 'next/image'

export default function IllustrationMothers() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'visible' }}>
      {/* Base image */}
      <Image
        src="/images/onboarding-2.png"
        alt="Healthcare worker consulting with pregnant mother"
        width={400}
        height={320}
        priority
        style={{
          width: '100%',
          height: 'auto',
          objectFit: 'contain',
          borderRadius: 12,
          display: 'block',
        }}
      />

      {/* Shimmer across patient profile monitor */}
      <div
        style={{
          position: 'absolute',
          top: '8%',
          right: '3%',
          width: '30%',
          height: '55%',
          borderRadius: 6,
          overflow: 'hidden',
          pointerEvents: 'none',
        }}
      >
        <div
          style={{
            position: 'absolute',
            top: 0,
            left: '-100%',
            width: '70%',
            height: '100%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)',
            animation: 'onb-shimmer-sweep 3.5s ease-in-out 2s infinite',
          }}
        />
      </div>

      {/* Floating heart — near the nurse */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '5%',
          left: '20%',
          animation: 'onb-heart-float 2.8s ease-in-out 0.5s infinite',
          opacity: 0,
          filter: 'drop-shadow(0 2px 4px rgba(232,82,122,0.25))',
        }}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#E8527A"
        />
      </svg>

      {/* Second heart — near the mother */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '15%',
          left: '55%',
          animation: 'onb-heart-float 3.2s ease-in-out 1.2s infinite',
          opacity: 0,
          filter: 'drop-shadow(0 1px 3px rgba(232,82,122,0.2))',
        }}
      >
        <path
          d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z"
          fill="#F9A8C0"
        />
      </svg>

      {/* Sparkle on clipboard */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '25%',
          left: '28%',
          animation: 'onb-sparkle 2.2s ease-in-out 0.8s infinite',
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

      {/* Pulse dot on the monitor screen */}
      <div
        style={{
          position: 'absolute',
          top: '12%',
          right: '8%',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#16A34A',
          animation: 'onb-pulse-dot 2s ease-in-out 1.5s infinite',
          boxShadow: '0 0 0 0 rgba(22,163,74,0.5)',
        }}
      />

      {/* Checkmark pop — near patient record */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '35%',
          right: '12%',
          animation: 'onb-check-pop 3.5s ease-in-out 2.5s infinite',
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

      {/* Gentle glow behind nurse */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '35%',
          height: '65%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(232,82,122,0.06) 0%, transparent 70%)',
          animation: 'onb-glow-pulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Floating medical cross */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 20 20"
        fill="none"
        style={{
          position: 'absolute',
          top: '3%',
          left: '38%',
          animation: 'onb-cross-float 4s ease-in-out 0.6s infinite',
          opacity: 0,
        }}
      >
        <rect x="8" y="2" width="4" height="16" rx="2" fill="#E8527A" fillOpacity="0.5" />
        <rect x="2" y="8" width="16" height="4" rx="2" fill="#E8527A" fillOpacity="0.5" />
      </svg>
    </div>
  )
}
