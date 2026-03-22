import Image from 'next/image'

export default function IllustrationHealth() {
  return (
    <div style={{ position: 'relative', width: '100%', overflow: 'visible' }}>
      {/* Base image */}
      <Image
        src="/images/onboarding-4.png"
        alt="Doctor monitoring maternal health dashboard with charts and records"
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

      {/* Shimmer across dashboard monitor */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          right: '3%',
          width: '55%',
          height: '75%',
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
            width: '60%',
            height: '100%',
            background:
              'linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.25) 50%, transparent 100%)',
            animation: 'onb-shimmer-sweep 3.5s ease-in-out 2s infinite',
          }}
        />
      </div>

      {/* Heart rate pulse — near the heart rate display */}
      <div
        style={{
          position: 'absolute',
          top: '18%',
          left: '8%',
          width: 10,
          height: 10,
          borderRadius: '50%',
          backgroundColor: '#DC2626',
          animation: 'onb-heartbeat 1.2s ease-in-out infinite',
          boxShadow: '0 0 0 0 rgba(220,38,38,0.5)',
        }}
      />

      {/* Floating DNA helix sparkle */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '28%',
          left: '42%',
          animation: 'onb-sparkle 2.5s ease-in-out 1s infinite',
          opacity: 0,
        }}
      >
        <path
          d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z"
          fill="#2563EB"
          fillOpacity="0.7"
        />
      </svg>

      {/* Chart trend arrow — upward */}
      <svg
        width="16"
        height="16"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '12%',
          right: '15%',
          animation: 'onb-trend-up 2s ease-in-out 1.5s infinite',
          opacity: 0,
        }}
      >
        <path
          d="M7 17l4.5-4.5L14 15l5-5"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M15 10h4v4"
          stroke="#16A34A"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
      </svg>

      {/* Floating heart — near doctor */}
      <svg
        width="14"
        height="14"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '5%',
          left: '25%',
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

      {/* Checkmark — vaccination records area */}
      <svg
        width="12"
        height="12"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '45%',
          right: '10%',
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

      {/* BP pulse dot */}
      <div
        style={{
          position: 'absolute',
          top: '38%',
          left: '5%',
          width: 8,
          height: 8,
          borderRadius: '50%',
          backgroundColor: '#F59E0B',
          animation: 'onb-pulse-dot 2s ease-in-out 1.8s infinite',
          boxShadow: '0 0 0 0 rgba(245,158,11,0.4)',
        }}
      />

      {/* Floating medical cross */}
      <svg
        width="11"
        height="11"
        viewBox="0 0 20 20"
        fill="none"
        style={{
          position: 'absolute',
          top: '3%',
          right: '35%',
          animation: 'onb-cross-float 4s ease-in-out 0.3s infinite',
          opacity: 0,
        }}
      >
        <rect x="8" y="2" width="4" height="16" rx="2" fill="#E8527A" fillOpacity="0.5" />
        <rect x="2" y="8" width="16" height="4" rx="2" fill="#E8527A" fillOpacity="0.5" />
      </svg>

      {/* Glow behind doctor */}
      <div
        style={{
          position: 'absolute',
          top: '10%',
          left: '5%',
          width: '40%',
          height: '70%',
          borderRadius: '50%',
          background: 'radial-gradient(circle, rgba(37,99,235,0.05) 0%, transparent 70%)',
          animation: 'onb-glow-pulse 3s ease-in-out infinite',
          pointerEvents: 'none',
        }}
      />

      {/* Data point sparkle on chart */}
      <svg
        width="10"
        height="10"
        viewBox="0 0 24 24"
        fill="none"
        style={{
          position: 'absolute',
          top: '35%',
          right: '30%',
          animation: 'onb-sparkle 2s ease-in-out 2s infinite',
          opacity: 0,
        }}
      >
        <path
          d="M12 2l1.5 5.5L19 9l-5.5 1.5L12 16l-1.5-5.5L5 9l5.5-1.5L12 2z"
          fill="#FFD700"
        />
      </svg>
    </div>
  )
}
