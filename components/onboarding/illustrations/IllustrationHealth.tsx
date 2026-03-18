export default function IllustrationHealth() {
  return (
    <svg width="280" height="220" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── Background glow ── */}
      <ellipse cx="140" cy="114" rx="118" ry="90" fill="#FFE8F0" fillOpacity="0.52" />

      {/* ══════════════════════════════════════════
          CARD 1: BLOOD PRESSURE (top-left)
         ══════════════════════════════════════════ */}
      <rect x="14" y="22" width="84" height="56" rx="10" fill="white" stroke="#E8527A" strokeWidth="1.5" />
      {/* Card label */}
      <rect x="20" y="28" width="48" height="6" rx="3" fill="#E8527A" fillOpacity="0.35" />
      {/* Heart icon */}
      <path d="M26 52 C26 48 22 45 19 48 C16 45 12 48 12 52" fill="none" />
      <path d="M36 52 C36 48 32 45 29 48 C26 45 22 48 22 52 C22 57 29 62 29 62 C29 62 36 57 36 52 Z" fill="#E8527A" fillOpacity="0.85" />
      {/* ECG line */}
      <path d="M42 52 L48 52 L50 46 L53 58 L56 50 L58 52 L70 52" stroke="#E8527A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Value text bars */}
      <rect x="20" y="62" width="38" height="5" rx="2.5" fill="#C93A62" fillOpacity="0.45" />
      <rect x="20" y="70" width="26" height="4" rx="2" fill="#FFB8D0" />

      {/* Dashed connector card1 → figure */}
      <line x1="98" y1="50" x2="122" y2="90" stroke="#FFB8D0" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" />

      {/* ══════════════════════════════════════════
          CARD 2: WEIGHT (top-right)
         ══════════════════════════════════════════ */}
      <rect x="182" y="18" width="84" height="56" rx="10" fill="white" stroke="#E8527A" strokeWidth="1.5" />
      {/* Card label */}
      <rect x="188" y="24" width="42" height="6" rx="3" fill="#E8527A" fillOpacity="0.35" />
      {/* Scale dial icon */}
      <circle cx="210" cy="50" r="16" fill="#FFE0EB" stroke="#C93A62" strokeWidth="1.5" />
      <circle cx="210" cy="50" r="11" fill="white" stroke="#FFB8D0" strokeWidth="1" />
      {/* Scale tick marks */}
      <line x1="210" y1="40" x2="210" y2="43" stroke="#E8527A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="218" y1="43" x2="216" y2="45" stroke="#E8527A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="202" y1="43" x2="204" y2="45" stroke="#E8527A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="220" y1="50" x2="217" y2="50" stroke="#E8527A" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="200" y1="50" x2="203" y2="50" stroke="#E8527A" strokeWidth="1.5" strokeLinecap="round" />
      {/* Needle */}
      <line x1="210" y1="50" x2="216" y2="44" stroke="#C93A62" strokeWidth="2" strokeLinecap="round" />
      <circle cx="210" cy="50" r="2.5" fill="#C93A62" />
      {/* Value bars */}
      <rect x="230" y="38" width="28" height="5" rx="2.5" fill="#C93A62" fillOpacity="0.4" />
      <rect x="230" y="46" width="22" height="4" rx="2" fill="#FFB8D0" />
      <rect x="230" y="54" width="26" height="4" rx="2" fill="#FFB8D0" />

      {/* Dashed connector card2 → figure */}
      <line x1="182" y1="50" x2="158" y2="90" stroke="#FFB8D0" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" />

      {/* ══════════════════════════════════════════
          CARD 3: VITALS CHART (bottom-left)
         ══════════════════════════════════════════ */}
      <rect x="14" y="152" width="84" height="56" rx="10" fill="white" stroke="#E8527A" strokeWidth="1.5" />
      {/* Card label */}
      <rect x="20" y="158" width="40" height="6" rx="3" fill="#E8527A" fillOpacity="0.35" />
      {/* Chart area bg */}
      <rect x="20" y="168" width="72" height="28" rx="3" fill="#FFE0EB" fillOpacity="0.4" />
      {/* Chart bars */}
      <rect x="24" y="180" width="8" height="16" rx="2" fill="#E8527A" fillOpacity="0.6" />
      <rect x="36" y="174" width="8" height="22" rx="2" fill="#E8527A" fillOpacity="0.8" />
      <rect x="48" y="178" width="8" height="18" rx="2" fill="#E8527A" fillOpacity="0.65" />
      <rect x="60" y="170" width="8" height="26" rx="2" fill="#C93A62" fillOpacity="0.75" />
      <rect x="72" y="176" width="8" height="20" rx="2" fill="#E8527A" fillOpacity="0.55" />
      {/* Chart baseline */}
      <line x1="20" y1="196" x2="92" y2="196" stroke="#C93A62" strokeWidth="1" strokeOpacity="0.4" />

      {/* Dashed connector card3 → figure */}
      <line x1="98" y1="170" x2="122" y2="148" stroke="#FFB8D0" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" />

      {/* ══════════════════════════════════════════
          CARD 4: VACCINATION (bottom-right)
         ══════════════════════════════════════════ */}
      <rect x="182" y="152" width="84" height="56" rx="10" fill="white" stroke="#E8527A" strokeWidth="1.5" />
      {/* Card label */}
      <rect x="188" y="158" width="50" height="6" rx="3" fill="#E8527A" fillOpacity="0.35" />
      {/* Syringe icon */}
      <rect x="196" y="172" width="32" height="8" rx="4" fill="#FFE0EB" stroke="#C93A62" strokeWidth="1.2" />
      <rect x="228" y="174" width="14" height="4" rx="2" fill="#F9A8C0" />
      <rect x="194" y="174" width="4" height="4" rx="2" fill="#C93A62" fillOpacity="0.5" />
      {/* Syringe plunger line */}
      <line x1="210" y1="168" x2="210" y2="172" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" />
      <rect x="207" y="164" width="6" height="6" rx="1.5" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1" />
      {/* Check circle */}
      <circle cx="230" cy="190" r="10" fill="#E8527A" fillOpacity="0.15" stroke="#E8527A" strokeWidth="1.5" />
      <path d="M225 190 L228 193 L235 186" stroke="#E8527A" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Status bars */}
      <rect x="188" y="186" width="30" height="5" rx="2.5" fill="#C93A62" fillOpacity="0.4" />
      <rect x="188" y="194" width="22" height="4" rx="2" fill="#FFB8D0" />

      {/* Dashed connector card4 → figure */}
      <line x1="182" y1="170" x2="158" y2="148" stroke="#FFB8D0" strokeWidth="1.5" strokeDasharray="5 4" strokeLinecap="round" />

      {/* ══════════════════════════════════════
          HEALTHCARE WORKER (center figure)
         ══════════════════════════════════════ */}
      {/* Shoes */}
      <path d="M122 188 Q121 194 128 194 Q134 194 135 188" fill="#C93A62" fillOpacity="0.55" />
      <path d="M145 188 Q144 194 150 194 Q157 194 158 188" fill="#C93A62" fillOpacity="0.55" />

      {/* Trousers */}
      <path d="M123 162 Q121 172 121 182 Q121 188 126 191 Q131 187 133 180 L134 162 Z" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1" />
      <path d="M157 162 Q159 172 159 182 Q159 188 154 191 Q149 187 147 180 L146 162 Z" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1" />

      {/* Scrubs top */}
      <path d="M120 108 Q116 120 115 134 Q114 148 117 160 Q123 165 140 165 Q157 165 163 160 Q166 148 165 134 Q164 120 160 108 Q154 104 140 104 Q126 104 120 108 Z" fill="#E8527A" fillOpacity="0.82" stroke="#C93A62" strokeWidth="1.5" />
      {/* V-collar */}
      <path d="M133 108 L140 120 L147 108" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Pocket */}
      <rect x="118" y="134" width="14" height="12" rx="2.5" fill="white" fillOpacity="0.22" stroke="white" strokeWidth="0.8" />

      {/* Left arm (out to side) */}
      <path d="M120 118 Q110 128 106 142 Q104 152 106 162" stroke="#FFEDE8" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M120 118 Q110 128 106 142 Q104 152 106 162" stroke="#E8527A" strokeWidth="11" strokeLinecap="round" fill="none" fillOpacity="0.8" />

      {/* Right arm (holding tablet, front) */}
      <path d="M160 118 Q170 128 174 142 Q176 152 174 162" stroke="#FFEDE8" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M160 118 Q170 128 174 142 Q176 152 174 162" stroke="#E8527A" strokeWidth="11" strokeLinecap="round" fill="none" fillOpacity="0.8" />

      {/* Tablet (held front/center) */}
      <rect x="128" y="124" width="26" height="36" rx="4" fill="white" stroke="#E8527A" strokeWidth="2" />
      {/* Tablet content: mini ECG */}
      <path d="M132 136 L135 136 L137 130 L140 142 L142 134 L144 136 L150 136" stroke="#E8527A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      <rect x="132" y="144" width="20" height="4" rx="2" fill="#FFE0EB" />
      <rect x="132" y="151" width="16" height="4" rx="2" fill="#FFE0EB" />
      {/* Tablet home button */}
      <circle cx="141" cy="158" r="2.5" fill="#FFB8D0" stroke="#E8527A" strokeWidth="1" />

      {/* Head */}
      <circle cx="140" cy="88" r="17" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Hair */}
      <path d="M123 84 Q123 68 140 68 Q157 68 157 84" fill="#C93A62" fillOpacity="0.7" />
      <path d="M123 84 Q120 96 121 108" stroke="#C93A62" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
      <path d="M157 84 Q160 96 159 108" stroke="#C93A62" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
      <circle cx="140" cy="70" r="8" fill="#C93A62" fillOpacity="0.7" />
      {/* Face */}
      <ellipse cx="135" cy="88" rx="2.8" ry="2.2" fill="#C93A62" fillOpacity="0.65" />
      <ellipse cx="145" cy="88" rx="2.8" ry="2.2" fill="#C93A62" fillOpacity="0.65" />
      <circle cx="140" cy="93" r="1.5" fill="#C93A62" fillOpacity="0.28" />
      <path d="M135 98 Q140 102 145 98" stroke="#C93A62" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="132" cy="92" r="4.5" fill="#E8527A" fillOpacity="0.1" />
      <circle cx="148" cy="92" r="4.5" fill="#E8527A" fillOpacity="0.1" />
      {/* Cap */}
      <path d="M128 83 Q140 77 152 83 Q149 79 140 77 Q131 79 128 83 Z" fill="white" stroke="#C93A62" strokeWidth="0.8" />
      <rect x="138" y="78" width="4" height="8" rx="1.5" fill="#E8527A" />
      <rect x="135" y="81" width="8" height="4" rx="1.5" fill="#E8527A" />

      {/* Stethoscope */}
      <path d="M133 104 Q127 110 126 118 Q126 125 130 127" stroke="#C93A62" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="130" cy="129" r="4" fill="none" stroke="#C93A62" strokeWidth="1.5" />

      {/* ══════════════════════════════════════
          DECORATIVE
         ══════════════════════════════════════ */}
      {/* Star top-left area */}
      <path d="M10 108 L11.5 104 L13 108 L17 109.5 L13 111 L11.5 115 L10 111 L6 109.5 Z" fill="#E8527A" fillOpacity="0.35" />
      {/* Star top-right */}
      <path d="M272 108 L273 105 L274 108 L277 109 L274 110 L273 113 L272 110 L269 109 Z" fill="#E8527A" fillOpacity="0.35" />
      {/* Dots */}
      <circle cx="10" cy="58" r="4.5" fill="#FFB8D0" />
      <circle cx="270" cy="58" r="4.5" fill="#FFB8D0" />
      <circle cx="10" cy="188" r="3.5" fill="#FFB8D0" />
      <circle cx="270" cy="188" r="3.5" fill="#FFB8D0" />
    </svg>
  )
}
