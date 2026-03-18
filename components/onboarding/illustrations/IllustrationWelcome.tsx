export default function IllustrationWelcome() {
  return (
    <svg width="280" height="220" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── Background glow ── */}
      <ellipse cx="145" cy="118" rx="118" ry="92" fill="#FFE8F0" fillOpacity="0.55" />

      {/* ══════════════════════════════════════════
          RECORDS SCREEN (center-right, background)
         ══════════════════════════════════════════ */}
      {/* Outer frame */}
      <rect x="106" y="14" width="152" height="124" rx="10" fill="white" stroke="#E8527A" strokeWidth="1.5" strokeOpacity="0.45" />
      {/* Header bar */}
      <rect x="106" y="14" width="152" height="20" rx="10" fill="#F9A8C0" fillOpacity="0.4" />
      {/* Header title bar */}
      <rect x="113" y="20" width="56" height="8" rx="4" fill="#E8527A" fillOpacity="0.35" />
      {/* Three action dots */}
      <circle cx="242" cy="24" r="3" fill="#C93A62" fillOpacity="0.4" />
      <circle cx="232" cy="24" r="3" fill="#C93A62" fillOpacity="0.25" />
      <circle cx="222" cy="24" r="3" fill="#C93A62" fillOpacity="0.15" />

      {/* Patient card row */}
      <rect x="110" y="40" width="144" height="38" rx="5" fill="#FFE0EB" fillOpacity="0.35" />
      {/* Avatar circle */}
      <circle cx="127" cy="59" r="12" fill="#FFE0EB" stroke="#F9A8C0" strokeWidth="1.5" />
      {/* Avatar person head */}
      <circle cx="127" cy="55" r="5" fill="#F9A8C0" />
      {/* Avatar person shoulders */}
      <path d="M118 68 Q127 63 136 68" fill="#F9A8C0" />
      {/* Patient name line */}
      <rect x="145" y="50" width="66" height="7" rx="3.5" fill="#C93A62" fillOpacity="0.45" />
      {/* Patient sub-info lines */}
      <rect x="145" y="62" width="48" height="5" rx="2.5" fill="#FFB8D0" />
      <rect x="145" y="71" width="36" height="5" rx="2.5" fill="#E8527A" fillOpacity="0.3" />

      {/* Divider */}
      <line x1="113" y1="83" x2="252" y2="83" stroke="#FFB8D0" strokeWidth="1" strokeOpacity="0.7" />

      {/* Data row 1 */}
      <rect x="113" y="90" width="12" height="9" rx="2.5" fill="#F9A8C0" />
      <rect x="130" y="90" width="58" height="9" rx="3" fill="#FFE0EB" />
      <rect x="193" y="90" width="32" height="9" rx="3" fill="#FFE0EB" />
      {/* Data row 2 */}
      <rect x="113" y="104" width="12" height="9" rx="2.5" fill="#F9A8C0" />
      <rect x="130" y="104" width="44" height="9" rx="3" fill="#FFE0EB" />
      <rect x="179" y="104" width="46" height="9" rx="3" fill="#FFE0EB" />
      {/* Data row 3 */}
      <rect x="113" y="118" width="12" height="9" rx="2.5" fill="#F9A8C0" />
      <rect x="130" y="118" width="52" height="9" rx="3" fill="#FFE0EB" />
      <rect x="187" y="118" width="28" height="9" rx="3" fill="#E8527A" fillOpacity="0.25" />

      {/* Monitor stand stem */}
      <rect x="178" y="138" width="8" height="20" rx="3" fill="#F9A8C0" />
      {/* Monitor base */}
      <rect x="162" y="157" width="40" height="7" rx="3.5" fill="#F9A8C0" stroke="#FFB8D0" strokeWidth="1" />

      {/* ══════════════════════════════════════
          PLANT (back-left corner)
         ══════════════════════════════════════ */}
      {/* Pot */}
      <path d="M30 178 L34 163 L62 163 L66 178 Z" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1" />
      <rect x="31" y="161" width="34" height="6" rx="2" fill="#FFB8D0" />
      {/* Main stem */}
      <path d="M48 161 C48 151 48 141 48 128" stroke="#C93A62" strokeWidth="2" strokeLinecap="round" fill="none" />
      {/* Leaf cluster left */}
      <path d="M48 150 C40 146 33 138 35 128 C43 130 49 144 48 150 Z" fill="#E8527A" fillOpacity="0.45" />
      <path d="M48 138 C56 132 63 122 61 112 C53 116 47 132 48 138 Z" fill="#E8527A" fillOpacity="0.55" />
      <path d="M48 157 C41 154 34 157 35 164 C42 161 48 157 48 157 Z" fill="#E8527A" fillOpacity="0.35" />

      {/* ══════════════════════════════════════
          DESK
         ══════════════════════════════════════ */}
      <rect x="26" y="163" width="222" height="14" rx="5" fill="#FFEDE8" stroke="#E8527A" strokeWidth="1.5" strokeOpacity="0.5" />
      <rect x="42" y="177" width="9" height="28" rx="3" fill="#FFE0EB" stroke="#E8527A" strokeWidth="1" strokeOpacity="0.4" />
      <rect x="229" y="177" width="9" height="28" rx="3" fill="#FFE0EB" stroke="#E8527A" strokeWidth="1" strokeOpacity="0.4" />

      {/* ══════════════════════════════════════
          NURSE FIGURE (standing, left-center)
         ══════════════════════════════════════ */}

      {/* — Shoes — */}
      <path d="M68 160 Q67 166 74 166 Q80 166 81 161" fill="#C93A62" fillOpacity="0.55" />
      <path d="M88 160 Q87 166 93 166 Q100 166 101 161" fill="#C93A62" fillOpacity="0.55" />

      {/* — Scrubs trousers — */}
      <path d="M70 134 Q68 142 68 152 Q68 159 73 162 Q78 157 80 150 L80 134 Z" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1" />
      <path d="M98 134 Q100 142 100 152 Q100 159 95 162 Q90 157 88 150 L88 134 Z" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1" />

      {/* — Scrubs tunic/top — */}
      <path d="M67 84 Q62 96 61 110 Q60 124 63 134 Q69 138 84 138 Q99 138 105 134 Q108 124 107 110 Q106 96 101 84 Q94 80 84 80 Q74 80 67 84 Z" fill="#E8527A" fillOpacity="0.82" stroke="#C93A62" strokeWidth="1.5" />
      {/* V-collar */}
      <path d="M76 84 L84 96 L92 84" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />
      {/* Pocket */}
      <rect x="66" y="110" width="14" height="12" rx="2.5" fill="white" fillOpacity="0.22" stroke="white" strokeWidth="0.8" />

      {/* — Left arm (bent, holding clipboard) — */}
      <path d="M67 94 Q58 102 54 116 Q52 125 52 136" stroke="#FFEDE8" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M67 94 Q58 102 54 116 Q52 125 52 136" stroke="#E8527A" strokeWidth="11" strokeLinecap="round" fill="none" fillOpacity="0.8" />
      <ellipse cx="52" cy="139" rx="6" ry="5" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1" />

      {/* — Right arm (extended toward screen) — */}
      <path d="M101 94 Q110 102 114 116 Q116 126 114 136" stroke="#FFEDE8" strokeWidth="13" strokeLinecap="round" fill="none" />
      <path d="M101 94 Q110 102 114 116 Q116 126 114 136" stroke="#E8527A" strokeWidth="11" strokeLinecap="round" fill="none" fillOpacity="0.8" />
      <ellipse cx="114" cy="139" rx="6" ry="5" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1" />

      {/* — Clipboard (in left hand) — */}
      <rect x="36" y="134" width="24" height="32" rx="3" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      <rect x="43" y="130" width="10" height="8" rx="3" fill="#E8527A" />
      <line x1="41" y1="146" x2="56" y2="146" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="41" y1="153" x2="56" y2="153" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" />
      <line x1="41" y1="160" x2="51" y2="160" stroke="#C93A62" strokeWidth="1.5" strokeLinecap="round" />

      {/* — Head — */}
      <circle cx="84" cy="64" r="17" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />

      {/* — Hair (dark, pulled into bun) — */}
      <path d="M67 59 Q67 44 84 44 Q101 44 101 59" fill="#C93A62" fillOpacity="0.72" />
      <path d="M67 59 Q64 72 65 85" stroke="#C93A62" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.72" fill="none" />
      <path d="M101 59 Q104 72 103 85" stroke="#C93A62" strokeWidth="7" strokeLinecap="round" strokeOpacity="0.72" fill="none" />
      {/* Bun */}
      <circle cx="84" cy="46" r="8" fill="#C93A62" fillOpacity="0.72" />
      <circle cx="84" cy="46" r="4" fill="#C93A62" fillOpacity="0.4" />

      {/* — Face features — */}
      <ellipse cx="78" cy="64" rx="2.8" ry="2.2" fill="#C93A62" fillOpacity="0.65" />
      <ellipse cx="90" cy="64" rx="2.8" ry="2.2" fill="#C93A62" fillOpacity="0.65" />
      <circle cx="84" cy="69" r="1.5" fill="#C93A62" fillOpacity="0.3" />
      <path d="M79 74 Q84 78 89 74" stroke="#C93A62" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      <circle cx="76" cy="68" r="4.5" fill="#E8527A" fillOpacity="0.1" />
      <circle cx="92" cy="68" r="4.5" fill="#E8527A" fillOpacity="0.1" />

      {/* — Nurse cap (white strip) — */}
      <path d="M71 59 Q84 53 97 59 Q94 55 84 53 Q74 55 71 59 Z" fill="white" stroke="#C93A62" strokeWidth="0.8" />
      {/* Cap medical cross */}
      <rect x="82" y="55" width="4" height="9" rx="1.5" fill="#E8527A" />
      <rect x="79" y="58" width="9" height="4" rx="1.5" fill="#E8527A" />

      {/* Stethoscope hint */}
      <path d="M77 86 Q71 92 70 100 Q70 107 74 109" stroke="#C93A62" strokeWidth="2" fill="none" strokeLinecap="round" />
      <circle cx="74" cy="111" r="3.5" fill="none" stroke="#C93A62" strokeWidth="1.5" />

      {/* ══════════════════════════════════════
          DECORATIVE ELEMENTS
         ══════════════════════════════════════ */}
      {/* 4-pointed star top-left */}
      <path d="M26 34 L27.5 30 L29 34 L33 35.5 L29 37 L27.5 41 L26 37 L22 35.5 Z" fill="#E8527A" fillOpacity="0.4" />
      {/* 4-pointed star top-right */}
      <path d="M257 22 L258 19 L259 22 L262 23 L259 24 L258 27 L257 24 L254 23 Z" fill="#E8527A" fillOpacity="0.45" />
      {/* Dots */}
      <circle cx="22" cy="136" r="4.5" fill="#FFB8D0" />
      <circle cx="260" cy="168" r="5" fill="#FFB8D0" />
      <circle cx="270" cy="88" r="3" fill="#E8527A" fillOpacity="0.3" />
      <circle cx="16" cy="176" r="3" fill="#E8527A" fillOpacity="0.2" />
    </svg>
  )
}
