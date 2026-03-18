export default function IllustrationSessions() {
  return (
    <svg width="280" height="220" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── Background glow ── */}
      <ellipse cx="145" cy="120" rx="120" ry="88" fill="#FFE8F0" fillOpacity="0.5" />

      {/* ══════════════════════════════════════════
          CLINIC BUILDING (right side)
         ══════════════════════════════════════════ */}
      {/* Building main body */}
      <rect x="162" y="80" width="96" height="110" rx="4" fill="#FFEDE8" stroke="#E8527A" strokeWidth="2" strokeOpacity="0.6" />
      {/* Roof / pediment */}
      <path d="M156 84 L210 52 L264 84" fill="#F9A8C0" fillOpacity="0.7" stroke="#C93A62" strokeWidth="1.5" strokeLinejoin="round" />
      {/* Roof ridge line */}
      <line x1="156" y1="84" x2="264" y2="84" stroke="#C93A62" strokeWidth="1" strokeOpacity="0.4" />

      {/* Door (arched) */}
      <rect x="192" y="152" width="24" height="38" rx="2" fill="white" stroke="#C93A62" strokeWidth="1.5" strokeOpacity="0.6" />
      {/* Door arch */}
      <path d="M192 154 Q192 148 204 148 Q216 148 216 154" fill="#FFB8D0" fillOpacity="0.4" stroke="#C93A62" strokeWidth="1.2" strokeOpacity="0.5" />
      {/* Door knob */}
      <circle cx="213" cy="175" r="2.5" fill="#C93A62" fillOpacity="0.6" />
      {/* Door center line */}
      <line x1="204" y1="152" x2="204" y2="190" stroke="#C93A62" strokeWidth="0.8" strokeOpacity="0.3" />

      {/* Window top-left */}
      <rect x="167" y="96" width="22" height="20" rx="3" fill="white" stroke="#C93A62" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="178" y1="96" x2="178" y2="116" stroke="#C93A62" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="167" y1="106" x2="189" y2="106" stroke="#C93A62" strokeWidth="0.8" strokeOpacity="0.4" />

      {/* Window top-right */}
      <rect x="229" y="96" width="22" height="20" rx="3" fill="white" stroke="#C93A62" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="240" y1="96" x2="240" y2="116" stroke="#C93A62" strokeWidth="0.8" strokeOpacity="0.4" />
      <line x1="229" y1="106" x2="251" y2="106" stroke="#C93A62" strokeWidth="0.8" strokeOpacity="0.4" />

      {/* Window mid-left */}
      <rect x="167" y="124" width="22" height="18" rx="3" fill="white" stroke="#C93A62" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="178" y1="124" x2="178" y2="142" stroke="#C93A62" strokeWidth="0.8" strokeOpacity="0.4" />

      {/* Window mid-right */}
      <rect x="229" y="124" width="22" height="18" rx="3" fill="white" stroke="#C93A62" strokeWidth="1.5" strokeOpacity="0.55" />
      <line x1="240" y1="124" x2="240" y2="142" stroke="#C93A62" strokeWidth="0.8" strokeOpacity="0.4" />

      {/* Healthcare cross sign on building */}
      <rect x="205" y="88" width="10" height="28" rx="3" fill="#E8527A" />
      <rect x="196" y="97" width="28" height="10" rx="3" fill="#E8527A" />

      {/* Building base / steps */}
      <rect x="158" y="188" width="104" height="8" rx="2" fill="#F9A8C0" fillOpacity="0.5" />
      <rect x="162" y="184" width="96" height="5" rx="2" fill="#FFB8D0" fillOpacity="0.5" />

      {/* Ground line */}
      <line x1="26" y1="196" x2="254" y2="196" stroke="#FFB8D0" strokeWidth="1.5" strokeOpacity="0.5" strokeLinecap="round" />

      {/* ══════════════════════════════════════
          PATIENT QUEUE (perspective, back to front)
          4 figures getting larger toward front
         ══════════════════════════════════════ */}

      {/* Patient 4 (farthest back, smallest) */}
      <circle cx="154" cy="136" r="7" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1" />
      <path d="M147 143 Q154 140 161 143 Q160 152 161 162 Q157 164 154 162 Q151 164 147 162 Q147 152 147 143 Z" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1" />

      {/* Patient 3 */}
      <circle cx="138" cy="130" r="9" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1.2" />
      <path d="M129 138 Q138 134 147 138 Q147 150 147 162 Q143 165 138 162 Q133 165 129 162 Q129 150 129 138 Z" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1.2" />

      {/* Patient 2 */}
      <circle cx="120" cy="124" r="11" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.3" />
      <path d="M109 134 Q120 130 131 134 Q131 148 131 162 Q127 166 120 162 Q113 166 109 162 Q109 148 109 134 Z" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.3" />
      {/* Hair on patient 2 */}
      <path d="M109 120 Q120 112 131 120" fill="#C93A62" fillOpacity="0.55" />

      {/* Patient 1 (closest, largest) */}
      <circle cx="100" cy="116" r="13" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />
      {/* Hair */}
      <path d="M87 112 Q100 102 113 112" fill="#C93A62" fillOpacity="0.55" />
      {/* Face */}
      <ellipse cx="96" cy="116" rx="2" ry="1.6" fill="#C93A62" fillOpacity="0.6" />
      <ellipse cx="104" cy="116" rx="2" ry="1.6" fill="#C93A62" fillOpacity="0.6" />
      {/* Body */}
      <path d="M87 130 Q84 142 84 155 Q84 162 90 164 Q100 168 110 164 Q116 162 116 155 Q116 142 113 130 Q107 126 100 126 Q93 126 87 130 Z" fill="#FFB8D0" stroke="#C93A62" strokeWidth="1.5" />
      {/* Arms */}
      <path d="M87 136 Q80 144 80 154" stroke="#FFB8D0" strokeWidth="9" strokeLinecap="round" fill="none" />
      <path d="M113 136 Q120 144 120 154" stroke="#FFB8D0" strokeWidth="9" strokeLinecap="round" fill="none" />
      {/* Legs */}
      <rect x="88" y="164" width="10" height="28" rx="5" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      <rect x="102" y="164" width="10" height="28" rx="5" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      <ellipse cx="93" cy="193" rx="8" ry="4.5" fill="#C93A62" fillOpacity="0.45" />
      <ellipse cx="107" cy="193" rx="8" ry="4.5" fill="#C93A62" fillOpacity="0.45" />

      {/* ══════════════════════════════════════
          NURSE WITH TABLET (foreground left)
         ══════════════════════════════════════ */}
      {/* Shoes */}
      <path d="M28 190 Q27 196 34 196 Q40 196 41 190" fill="#C93A62" fillOpacity="0.55" />
      <path d="M44 190 Q43 196 50 196 Q56 196 57 190" fill="#C93A62" fillOpacity="0.55" />

      {/* Trousers */}
      <path d="M30 158 Q28 168 28 178 Q28 186 33 190 Q38 186 40 178 L40 158 Z" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1" />
      <path d="M54 158 Q56 168 56 178 Q56 186 51 190 Q46 186 44 178 L44 158 Z" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1" />

      {/* Scrubs top */}
      <path d="M28 106 Q24 118 23 132 Q22 146 25 158 Q31 163 42 163 Q53 163 59 158 Q62 146 61 132 Q60 118 56 106 Q50 102 42 102 Q34 102 28 106 Z" fill="#E8527A" fillOpacity="0.82" stroke="#C93A62" strokeWidth="1.5" />
      <path d="M36 106 L42 118 L48 106" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Left arm (by side) */}
      <path d="M28 116 Q22 128 20 142 Q19 154 20 164" stroke="#FFEDE8" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M28 116 Q22 128 20 142 Q19 154 20 164" stroke="#E8527A" strokeWidth="10" strokeLinecap="round" fill="none" fillOpacity="0.8" />

      {/* Right arm holding tablet */}
      <path d="M56 116 Q64 126 68 140 Q70 150 68 162" stroke="#FFEDE8" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M56 116 Q64 126 68 140 Q70 150 68 162" stroke="#E8527A" strokeWidth="10" strokeLinecap="round" fill="none" fillOpacity="0.8" />

      {/* Tablet */}
      <rect x="66" y="134" width="30" height="40" rx="4" fill="white" stroke="#E8527A" strokeWidth="2" />
      <rect x="70" y="139" width="22" height="5" rx="2.5" fill="#F9A8C0" />
      <rect x="70" y="147" width="18" height="4" rx="2" fill="#FFE0EB" />
      <rect x="70" y="154" width="22" height="4" rx="2" fill="#FFE0EB" />
      {/* Calendar grid on tablet */}
      <rect x="70" y="161" width="6" height="6" rx="1" fill="#E8527A" fillOpacity="0.5" />
      <rect x="78" y="161" width="6" height="6" rx="1" fill="#E8527A" fillOpacity="0.25" />
      <rect x="86" y="161" width="6" height="6" rx="1" fill="#E8527A" fillOpacity="0.5" />

      {/* Nurse head */}
      <circle cx="42" cy="88" r="16" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Hair */}
      <path d="M26 84 Q26 68 42 68 Q58 68 58 84" fill="#C93A62" fillOpacity="0.7" />
      <path d="M26 84 Q23 96 24 108" stroke="#C93A62" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
      <path d="M58 84 Q61 96 60 108" stroke="#C93A62" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
      <circle cx="42" cy="70" r="7" fill="#C93A62" fillOpacity="0.7" />
      {/* Face */}
      <ellipse cx="37" cy="88" rx="2.5" ry="2" fill="#C93A62" fillOpacity="0.65" />
      <ellipse cx="47" cy="88" rx="2.5" ry="2" fill="#C93A62" fillOpacity="0.65" />
      <path d="M38 95 Q42 99 46 95" stroke="#C93A62" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Cap */}
      <path d="M30 83 Q42 77 54 83 Q51 79 42 77 Q33 79 30 83 Z" fill="white" stroke="#C93A62" strokeWidth="0.8" />
      <rect x="40" y="78" width="4" height="8" rx="1.5" fill="#E8527A" />
      <rect x="37" y="81" width="8" height="4" rx="1.5" fill="#E8527A" />

      {/* ══════════════════════════════════════
          DECORATIVE
         ══════════════════════════════════════ */}
      {/* Floating heart above building */}
      <path d="M218 56 C218 53 215 51 212 53 C209 51 206 53 206 56 C206 60 212 65 212 65 C212 65 218 60 218 56 Z" fill="#E8527A" fillOpacity="0.55" />
      {/* Sparkle */}
      <path d="M234 42 L235 39 L236 42 L239 43 L236 44 L235 47 L234 44 L231 43 Z" fill="#E8527A" fillOpacity="0.4" />
      <circle cx="20" cy="120" r="4" fill="#FFB8D0" />
      <circle cx="264" cy="90" r="4" fill="#FFB8D0" />
      <circle cx="270" cy="155" r="3" fill="#E8527A" fillOpacity="0.25" />
    </svg>
  )
}
