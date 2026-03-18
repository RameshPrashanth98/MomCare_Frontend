export default function IllustrationHealth() {
  return (
    <svg
      width="280"
      height="220"
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="140" cy="115" r="88" fill="#FFB8D0" fillOpacity="0.14" />

      {/* === Central healthcare worker === */}
      {/* Body */}
      <rect x="114" y="112" width="30" height="50" rx="10" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />
      {/* Lower / scrubs */}
      <rect x="112" y="146" width="34" height="30" rx="8" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Head */}
      <circle cx="129" cy="96" r="15" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Hair */}
      <path d="M114 91 Q129 79 144 91" stroke="#C93A62" strokeWidth="2" fill="#FFB8D0" />
      {/* Cap cross */}
      <rect x="126" y="82" width="6" height="14" rx="2" fill="#E8527A" />
      <rect x="122" y="86" width="14" height="6" rx="2" fill="#E8527A" />
      {/* Tablet held centrally */}
      <rect x="118" y="122" width="24" height="32" rx="4" fill="#FFFFFF" stroke="#E8527A" strokeWidth="2" />
      {/* Tablet screen sparkle lines */}
      <line x1="123" y1="131" x2="137" y2="131" stroke="#E8527A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="123" y1="138" x2="134" y2="138" stroke="#FFB8D0" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="123" y1="145" x2="137" y2="145" stroke="#E8527A" strokeWidth="1" strokeLinecap="round" />
      {/* Feet */}
      <ellipse cx="122" cy="178" rx="7" ry="4" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />
      <ellipse cx="137" cy="178" rx="7" ry="4" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />

      {/* === Card 1: Blood Pressure (top-left) === */}
      {/* Dashed connector */}
      <line x1="118" y1="122" x2="84" y2="80" stroke="#FFB8D0" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" />
      {/* Card */}
      <rect x="36" y="46" width="72" height="42" rx="8" fill="#FFEDE8" stroke="#E8527A" strokeWidth="1.5" />
      {/* Heart icon */}
      <path
        d="M58 65 C58 62 54 59 51 62 C48 59 44 62 44 65 C44 70 51 75 51 75 C51 75 58 70 58 65 Z"
        fill="#E8527A"
      />
      {/* BP label lines */}
      <line x1="64" y1="62" x2="100" y2="62" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="64" y1="69" x2="94" y2="69" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="64" y1="76" x2="98" y2="76" stroke="#FFB8D0" strokeWidth="1.5" strokeLinecap="round" />

      {/* === Card 2: Weight Scale (top-right) === */}
      {/* Dashed connector */}
      <line x1="142" y1="122" x2="180" y2="78" stroke="#FFB8D0" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" />
      {/* Card */}
      <rect x="172" y="44" width="72" height="42" rx="8" fill="#FFEDE8" stroke="#E8527A" strokeWidth="1.5" />
      {/* Scale circle */}
      <circle cx="196" cy="66" r="14" fill="#FFFFFF" stroke="#C93A62" strokeWidth="1.5" />
      {/* Scale lines */}
      <line x1="196" y1="55" x2="196" y2="58" stroke="#E8527A" strokeWidth="2" strokeLinecap="round" />
      <line x1="205" y1="58" x2="203" y2="60" stroke="#E8527A" strokeWidth="2" strokeLinecap="round" />
      <line x1="187" y1="58" x2="189" y2="60" stroke="#E8527A" strokeWidth="2" strokeLinecap="round" />
      {/* Scale needle */}
      <line x1="196" y1="66" x2="202" y2="60" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" />
      <circle cx="196" cy="66" r="2" fill="#C93A62" />
      {/* Weight label lines */}
      <line x1="216" y1="58" x2="236" y2="58" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="216" y1="65" x2="232" y2="65" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="216" y1="72" x2="236" y2="72" stroke="#FFB8D0" strokeWidth="1.5" strokeLinecap="round" />

      {/* === Card 3: Bar Chart (bottom-right) === */}
      {/* Dashed connector */}
      <line x1="142" y1="148" x2="184" y2="160" stroke="#FFB8D0" strokeWidth="1.5" strokeDasharray="4 3" strokeLinecap="round" />
      {/* Card */}
      <rect x="186" y="148" width="72" height="44" rx="8" fill="#FFEDE8" stroke="#E8527A" strokeWidth="1.5" />
      {/* Bar chart — 4 bars of varying heights */}
      <rect x="196" y="170" width="8" height="14" rx="2" fill="#E8527A" />
      <rect x="210" y="163" width="8" height="21" rx="2" fill="#E8527A" />
      <rect x="224" y="167" width="8" height="17" rx="2" fill="#E8527A" />
      <rect x="238" y="158" width="8" height="26" rx="2" fill="#C93A62" />
      {/* Chart baseline */}
      <line x1="193" y1="184" x2="250" y2="184" stroke="#C93A62" strokeWidth="1" strokeLinecap="round" />

      {/* Decorative dots */}
      <circle cx="26" cy="52" r="5" fill="#FFB8D0" />
      <circle cx="256" cy="188" r="5" fill="#FFB8D0" />
      <circle cx="24" cy="185" r="4" fill="#E8527A" fillOpacity="0.3" />
      <circle cx="258" cy="32" r="4" fill="#FFB8D0" />
    </svg>
  )
}
