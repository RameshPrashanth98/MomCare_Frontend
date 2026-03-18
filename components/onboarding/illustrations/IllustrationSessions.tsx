export default function IllustrationSessions() {
  return (
    <svg
      width="280"
      height="220"
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background */}
      <ellipse cx="140" cy="130" rx="108" ry="72" fill="#FFB8D0" fillOpacity="0.13" />

      {/* === Clinic building (right side) === */}
      {/* Building body */}
      <rect x="162" y="78" width="80" height="100" rx="4" fill="#FFEDE8" stroke="#C93A62" strokeWidth="2" />
      {/* Roof */}
      <path d="M158 82 L202 54 L246 82" fill="#FFB8D0" stroke="#C93A62" strokeWidth="2" strokeLinejoin="round" />
      {/* Door */}
      <rect x="190" y="142" width="22" height="36" rx="3" fill="#FFFFFF" stroke="#C93A62" strokeWidth="1.5" />
      {/* Door knob */}
      <circle cx="207" cy="162" r="2.5" fill="#C93A62" />
      {/* Windows */}
      <rect x="170" y="100" width="20" height="18" rx="2" fill="#FFFFFF" stroke="#C93A62" strokeWidth="1.5" />
      <rect x="214" y="100" width="20" height="18" rx="2" fill="#FFFFFF" stroke="#C93A62" strokeWidth="1.5" />
      {/* Healthcare cross on building */}
      <rect x="198" y="88" width="8" height="24" rx="2" fill="#E8527A" />
      <rect x="190" y="96" width="24" height="8" rx="2" fill="#E8527A" />

      {/* === Queue of 3 patient silhouettes === */}
      {/* Patient 3 (back, smallest) */}
      <circle cx="136" cy="118" r="8" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />
      <rect x="128" y="128" width="16" height="22" rx="6" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />

      {/* Patient 2 (middle) */}
      <circle cx="118" cy="114" r="9" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />
      <rect x="109" y="125" width="18" height="25" rx="7" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />

      {/* Patient 1 (front, largest) */}
      <circle cx="98" cy="110" r="11" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />
      <rect x="87" y="122" width="22" height="30" rx="8" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />

      {/* Directional arrow toward clinic */}
      <path
        d="M148 152 L158 152"
        stroke="#E8527A"
        strokeWidth="2.5"
        strokeLinecap="round"
      />
      <path
        d="M154 146 L162 152 L154 158"
        fill="#E8527A"
        stroke="#E8527A"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />

      {/* === Foreground nurse with tablet === */}
      {/* Nurse body */}
      <rect x="36" y="100" width="28" height="50" rx="10" fill="#E8527A" stroke="#C93A62" strokeWidth="1.5" />
      {/* Nurse lower */}
      <rect x="34" y="134" width="32" height="32" rx="8" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />
      {/* Nurse head */}
      <circle cx="50" cy="86" r="14" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Hair */}
      <path d="M36 82 Q50 70 64 82" stroke="#C93A62" strokeWidth="2" fill="#FFB8D0" />
      {/* Nurse cap cross */}
      <rect x="47" y="74" width="6" height="14" rx="2" fill="#E8527A" />
      <rect x="43" y="78" width="14" height="6" rx="2" fill="#E8527A" />
      {/* Tablet in hand */}
      <rect x="64" y="110" width="26" height="36" rx="4" fill="#FFFFFF" stroke="#E8527A" strokeWidth="2" />
      {/* Tablet screen content */}
      <line x1="69" y1="120" x2="85" y2="120" stroke="#E8527A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="69" y1="128" x2="82" y2="128" stroke="#FFB8D0" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="69" y1="136" x2="85" y2="136" stroke="#E8527A" strokeWidth="1" strokeLinecap="round" />
      {/* Arm holding tablet */}
      <path d="M64 118 Q62 114 62 110 Q64 104 66 102" stroke="#C93A62" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Nurse feet */}
      <ellipse cx="43" cy="168" rx="7" ry="4" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />
      <ellipse cx="58" cy="168" rx="7" ry="4" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />

      {/* Ground line */}
      <line x1="30" y1="170" x2="250" y2="170" stroke="#C93A62" strokeWidth="1" strokeOpacity="0.3" strokeLinecap="round" />

      {/* Decorative dots */}
      <circle cx="26" cy="50" r="5" fill="#FFB8D0" />
      <circle cx="254" cy="44" r="6" fill="#FFB8D0" />
      <circle cx="22" cy="130" r="3" fill="#E8527A" fillOpacity="0.35" />
    </svg>
  )
}
