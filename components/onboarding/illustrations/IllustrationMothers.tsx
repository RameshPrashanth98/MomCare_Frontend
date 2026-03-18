export default function IllustrationMothers() {
  return (
    <svg
      width="280"
      height="220"
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background blob */}
      <ellipse cx="140" cy="120" rx="105" ry="80" fill="#FFB8D0" fillOpacity="0.15" />

      {/* Floor line */}
      <line x1="40" y1="192" x2="240" y2="192" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" strokeOpacity="0.4" />

      {/* === Seated pregnant patient (right) === */}
      {/* Chair */}
      <rect x="160" y="145" width="56" height="10" rx="5" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      <rect x="210" y="120" width="8" height="35" rx="4" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      <rect x="160" y="155" width="8" height="37" rx="4" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      <rect x="208" y="155" width="8" height="37" rx="4" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />

      {/* Patient body — torso with rounded belly */}
      <ellipse cx="188" cy="132" rx="22" ry="26" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Pregnant belly overlay */}
      <ellipse cx="193" cy="140" rx="16" ry="14" fill="#FFB8D0" fillOpacity="0.5" stroke="#C93A62" strokeWidth="1" />

      {/* Patient head */}
      <circle cx="188" cy="100" r="14" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Hair */}
      <path d="M174 96 Q188 84 202 96" stroke="#C93A62" strokeWidth="2" fill="none" />

      {/* Patient legs */}
      <rect x="172" y="156" width="12" height="36" rx="6" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      <rect x="190" y="156" width="12" height="36" rx="6" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />

      {/* Floating heart near patient */}
      <path
        d="M218 90 C218 87 214 84 210 87 C206 84 202 87 202 90 C202 96 210 102 210 102 C210 102 218 96 218 90 Z"
        fill="#E8527A"
      />

      {/* === Standing nurse (left) === */}
      {/* Nurse body */}
      <rect x="82" y="112" width="30" height="52" rx="10" fill="#E8527A" stroke="#C93A62" strokeWidth="1.5" />
      {/* Nurse skirt/lower */}
      <rect x="80" y="148" width="34" height="30" rx="8" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />
      {/* Nurse head */}
      <circle cx="97" cy="96" r="15" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Nurse hair / cap */}
      <path d="M82 90 Q97 78 112 90" stroke="#C93A62" strokeWidth="2" fill="#FFB8D0" />
      {/* Nurse cap cross */}
      <rect x="94" y="83" width="6" height="14" rx="2" fill="#E8527A" />
      <rect x="90" y="87" width="14" height="6" rx="2" fill="#E8527A" />

      {/* Tablet in nurse hand */}
      <rect x="112" y="128" width="30" height="22" rx="4" fill="#FFFFFF" stroke="#E8527A" strokeWidth="2" />
      {/* Tablet screen content */}
      <line x1="117" y1="135" x2="137" y2="135" stroke="#E8527A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="117" y1="141" x2="133" y2="141" stroke="#FFB8D0" strokeWidth="1.5" strokeLinecap="round" />
      {/* Nurse arm holding tablet */}
      <path d="M112 130 Q108 128 110 122 Q112 116 114 114" stroke="#C93A62" strokeWidth="2" fill="none" strokeLinecap="round" />

      {/* Nurse feet */}
      <ellipse cx="88" cy="180" rx="8" ry="5" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />
      <ellipse cx="106" cy="180" rx="8" ry="5" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />

      {/* Decorative dots */}
      <circle cx="40" cy="55" r="5" fill="#FFB8D0" />
      <circle cx="246" cy="70" r="6" fill="#FFB8D0" />
      <circle cx="34" cy="165" r="4" fill="#E8527A" fillOpacity="0.3" />
      <circle cx="250" cy="175" r="4" fill="#FFB8D0" />
    </svg>
  )
}
