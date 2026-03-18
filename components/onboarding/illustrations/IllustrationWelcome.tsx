export default function IllustrationWelcome() {
  return (
    <svg
      width="280"
      height="220"
      viewBox="0 0 280 220"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* Background circle */}
      <circle cx="140" cy="110" r="90" fill="#FFB8D0" fillOpacity="0.18" />

      {/* Desk surface */}
      <rect x="40" y="148" width="200" height="20" rx="4" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Desk legs */}
      <rect x="55" y="168" width="8" height="22" rx="2" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      <rect x="217" y="168" width="8" height="22" rx="2" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />

      {/* Monitor stand */}
      <rect x="130" y="122" width="10" height="26" rx="2" fill="#C93A62" />
      <rect x="118" y="144" width="34" height="6" rx="3" fill="#C93A62" />

      {/* Monitor body */}
      <rect x="96" y="68" width="78" height="56" rx="6" fill="#FFFFFF" stroke="#E8527A" strokeWidth="2" />
      {/* Monitor screen */}
      <rect x="102" y="74" width="66" height="44" rx="3" fill="#FFB8D0" fillOpacity="0.3" />

      {/* Healthcare cross on monitor */}
      <rect x="131" y="83" width="8" height="26" rx="2" fill="#E8527A" />
      <rect x="123" y="91" width="24" height="8" rx="2" fill="#E8527A" />

      {/* Seated figure — body */}
      <rect x="52" y="98" width="26" height="38" rx="8" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />
      {/* Figure head */}
      <circle cx="65" cy="88" r="13" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Hair suggestion */}
      <path d="M52 83 Q65 72 78 83" stroke="#C93A62" strokeWidth="2" fill="none" />
      {/* Figure arms */}
      <path d="M78 108 Q100 112 120 108" stroke="#C93A62" strokeWidth="2" fill="none" strokeLinecap="round" />
      <path d="M52 108 Q44 118 42 130" stroke="#C93A62" strokeWidth="2" fill="none" strokeLinecap="round" />
      {/* Chair seat */}
      <rect x="42" y="130" width="40" height="8" rx="4" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Chair back */}
      <rect x="42" y="100" width="6" height="38" rx="3" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />

      {/* Clipboard on desk */}
      <rect x="182" y="120" width="36" height="48" rx="4" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Clipboard clip */}
      <rect x="194" y="116" width="12" height="8" rx="3" fill="#E8527A" />
      {/* Clipboard text lines */}
      <line x1="190" y1="136" x2="210" y2="136" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="190" y1="144" x2="210" y2="144" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="190" y1="152" x2="205" y2="152" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" />

      {/* Decorative background dots */}
      <circle cx="32" cy="60" r="5" fill="#FFB8D0" />
      <circle cx="248" cy="50" r="7" fill="#FFB8D0" />
      <circle cx="22" cy="150" r="4" fill="#FFB8D0" />
      <circle cx="258" cy="165" r="5" fill="#FFB8D0" />
      <circle cx="240" cy="90" r="4" fill="#E8527A" fillOpacity="0.3" />
      <circle cx="50" cy="42" r="3" fill="#E8527A" fillOpacity="0.4" />
    </svg>
  )
}
