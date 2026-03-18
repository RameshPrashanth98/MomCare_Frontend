export default function IllustrationMothers() {
  return (
    <svg width="280" height="220" viewBox="0 0 280 220" fill="none" xmlns="http://www.w3.org/2000/svg">

      {/* ── Background glow ── */}
      <ellipse cx="140" cy="118" rx="120" ry="90" fill="#FFE8F0" fillOpacity="0.5" />

      {/* ══════════════════════════════════════════
          BACKGROUND RECORDS SCREEN (top-center)
         ══════════════════════════════════════════ */}
      <rect x="64" y="10" width="154" height="96" rx="8" fill="white" stroke="#E8527A" strokeWidth="1.5" strokeOpacity="0.4" />
      {/* Screen header */}
      <rect x="64" y="10" width="154" height="18" rx="8" fill="#F9A8C0" fillOpacity="0.4" />
      <rect x="71" y="15" width="44" height="7" rx="3" fill="#E8527A" fillOpacity="0.35" />
      {/* Screen top-right dots */}
      <circle cx="207" cy="19" r="2.5" fill="#C93A62" fillOpacity="0.4" />
      <circle cx="199" cy="19" r="2.5" fill="#C93A62" fillOpacity="0.25" />

      {/* Patient profile in screen */}
      <circle cx="86" cy="45" r="10" fill="#FFE0EB" stroke="#F9A8C0" strokeWidth="1.5" />
      <circle cx="86" cy="42" r="4" fill="#F9A8C0" />
      <path d="M78 54 Q86 50 94 54" fill="#F9A8C0" />
      <rect x="100" y="39" width="52" height="6" rx="3" fill="#C93A62" fillOpacity="0.4" />
      <rect x="100" y="49" width="38" height="5" rx="2.5" fill="#FFB8D0" />
      <rect x="100" y="57" width="44" height="5" rx="2.5" fill="#FFB8D0" />

      {/* Divider */}
      <line x1="69" y1="68" x2="212" y2="68" stroke="#FFB8D0" strokeWidth="1" strokeOpacity="0.7" />

      {/* Data rows */}
      <rect x="69" y="74" width="10" height="8" rx="2" fill="#F9A8C0" />
      <rect x="83" y="74" width="52" height="8" rx="3" fill="#FFE0EB" />
      <rect x="140" y="74" width="30" height="8" rx="3" fill="#FFE0EB" />

      <rect x="69" y="87" width="10" height="8" rx="2" fill="#F9A8C0" />
      <rect x="83" y="87" width="40" height="8" rx="3" fill="#FFE0EB" />
      <rect x="128" y="87" width="42" height="8" rx="3" fill="#FFE0EB" />

      {/* Floating heart */}
      <path d="M232 38 C232 34 228 31 224 34 C220 31 216 34 216 38 C216 44 224 50 224 50 C224 50 232 44 232 38 Z" fill="#E8527A" fillOpacity="0.75" />
      {/* Small sparkle near heart */}
      <path d="M238 26 L239 23 L240 26 L243 27 L240 28 L239 31 L238 28 L235 27 Z" fill="#E8527A" fillOpacity="0.4" />

      {/* ══════════════════════════════════════
          GROUND LINE
         ══════════════════════════════════════ */}
      <line x1="30" y1="196" x2="250" y2="196" stroke="#FFB8D0" strokeWidth="1" strokeOpacity="0.5" strokeLinecap="round" />

      {/* ══════════════════════════════════════
          PREGNANT PATIENT (seated, right side)
         ══════════════════════════════════════ */}
      {/* Chair */}
      <rect x="176" y="152" width="52" height="10" rx="5" fill="#FFEDE8" stroke="#E8527A" strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="222" y="124" width="8" height="38" rx="4" fill="#FFEDE8" stroke="#E8527A" strokeWidth="1.5" strokeOpacity="0.6" />
      <rect x="178" y="162" width="8" height="34" rx="4" fill="#FFEDE8" stroke="#E8527A" strokeWidth="1" strokeOpacity="0.5" />
      <rect x="218" y="162" width="8" height="34" rx="4" fill="#FFEDE8" stroke="#E8527A" strokeWidth="1" strokeOpacity="0.5" />

      {/* Patient head */}
      <circle cx="198" cy="118" r="14" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Patient hair */}
      <path d="M184 114 Q184 102 198 102 Q212 102 212 114" fill="#C93A62" fillOpacity="0.65" />
      <path d="M184 114 Q182 120 183 130" stroke="#C93A62" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.65" fill="none" />
      <path d="M212 114 Q214 120 213 130" stroke="#C93A62" strokeWidth="5" strokeLinecap="round" strokeOpacity="0.65" fill="none" />
      {/* Patient face */}
      <ellipse cx="193" cy="118" rx="2.2" ry="1.8" fill="#C93A62" fillOpacity="0.6" />
      <ellipse cx="203" cy="118" rx="2.2" ry="1.8" fill="#C93A62" fillOpacity="0.6" />
      <path d="M194 124 Q198 128 202 124" stroke="#C93A62" strokeWidth="1.5" fill="none" strokeLinecap="round" />

      {/* Patient torso / body — pregnant belly shape */}
      <path d="M183 132 Q180 142 180 152 Q184 158 198 158 Q212 158 218 152 Q218 142 215 132 Q208 128 198 128 Q188 128 183 132 Z" fill="#FFE0EB" stroke="#C93A62" strokeWidth="1.5" />
      {/* Pregnant belly bump */}
      <ellipse cx="200" cy="148" rx="18" ry="15" fill="#F9A8C0" fillOpacity="0.55" stroke="#C93A62" strokeWidth="1" />

      {/* Patient legs */}
      <rect x="184" y="160" width="12" height="32" rx="6" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      <rect x="200" y="160" width="12" height="32" rx="6" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Feet */}
      <ellipse cx="190" cy="193" rx="9" ry="5" fill="#C93A62" fillOpacity="0.45" />
      <ellipse cx="206" cy="193" rx="9" ry="5" fill="#C93A62" fillOpacity="0.45" />

      {/* Patient right arm (resting on belly) */}
      <path d="M183 140 Q178 148 182 155" stroke="#FFEDE8" strokeWidth="10" strokeLinecap="round" fill="none" />
      <path d="M215 140 Q220 148 216 155" stroke="#FFEDE8" strokeWidth="10" strokeLinecap="round" fill="none" />

      {/* ══════════════════════════════════════
          NURSE (standing, left side, with tablet)
         ══════════════════════════════════════ */}
      {/* Shoes */}
      <path d="M48 190 Q47 196 54 196 Q60 196 61 190" fill="#C93A62" fillOpacity="0.55" />
      <path d="M64 190 Q63 196 70 196 Q76 196 77 190" fill="#C93A62" fillOpacity="0.55" />

      {/* Scrubs trousers */}
      <path d="M50 162 Q48 172 48 182 Q48 189 53 192 Q58 188 60 180 L60 162 Z" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1" />
      <path d="M74 162 Q76 172 76 182 Q76 189 71 192 Q66 188 64 180 L64 162 Z" fill="#F9A8C0" stroke="#C93A62" strokeWidth="1" />

      {/* Scrubs top */}
      <path d="M48 110 Q44 122 43 136 Q42 150 45 160 Q51 165 62 165 Q73 165 79 160 Q82 150 81 136 Q80 122 76 110 Q70 106 62 106 Q54 106 48 110 Z" fill="#E8527A" fillOpacity="0.82" stroke="#C93A62" strokeWidth="1.5" />
      {/* V-collar */}
      <path d="M56 110 L62 122 L68 110" stroke="white" strokeWidth="2" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Left arm (by side) */}
      <path d="M48 120 Q42 130 40 144 Q39 153 40 162" stroke="#FFEDE8" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M48 120 Q42 130 40 144 Q39 153 40 162" stroke="#E8527A" strokeWidth="10" strokeLinecap="round" fill="none" fillOpacity="0.8" />

      {/* Right arm (holding tablet, extending toward patient) */}
      <path d="M76 120 Q84 128 88 140 Q90 150 88 160" stroke="#FFEDE8" strokeWidth="12" strokeLinecap="round" fill="none" />
      <path d="M76 120 Q84 128 88 140 Q90 150 88 160" stroke="#E8527A" strokeWidth="10" strokeLinecap="round" fill="none" fillOpacity="0.8" />

      {/* Tablet in extended hand */}
      <rect x="88" y="136" width="28" height="38" rx="4" fill="white" stroke="#E8527A" strokeWidth="2" />
      {/* Tablet screen content */}
      <rect x="92" y="141" width="20" height="5" rx="2.5" fill="#F9A8C0" />
      <rect x="92" y="149" width="16" height="4" rx="2" fill="#FFE0EB" />
      <rect x="92" y="156" width="20" height="4" rx="2" fill="#FFE0EB" />
      <rect x="92" y="163" width="14" height="4" rx="2" fill="#FFE0EB" />
      {/* ECG line on tablet */}
      <path d="M92 170 L96 170 L98 166 L100 174 L102 168 L104 170 L112 170" stroke="#E8527A" strokeWidth="1.5" fill="none" strokeLinecap="round" strokeLinejoin="round" />

      {/* Nurse head */}
      <circle cx="62" cy="92" r="16" fill="#FFEDE8" stroke="#C93A62" strokeWidth="1.5" />
      {/* Hair */}
      <path d="M46 88 Q46 72 62 72 Q78 72 78 88" fill="#C93A62" fillOpacity="0.7" />
      <path d="M46 88 Q43 100 44 112" stroke="#C93A62" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
      <path d="M78 88 Q81 100 80 112" stroke="#C93A62" strokeWidth="6" strokeLinecap="round" strokeOpacity="0.7" fill="none" />
      {/* Bun */}
      <circle cx="62" cy="73" r="7" fill="#C93A62" fillOpacity="0.7" />
      {/* Face features */}
      <ellipse cx="57" cy="92" rx="2.5" ry="2" fill="#C93A62" fillOpacity="0.65" />
      <ellipse cx="67" cy="92" rx="2.5" ry="2" fill="#C93A62" fillOpacity="0.65" />
      <path d="M58 99 Q62 103 66 99" stroke="#C93A62" strokeWidth="1.5" fill="none" strokeLinecap="round" />
      {/* Nurse cap */}
      <path d="M50 87 Q62 81 74 87 Q71 83 62 81 Q53 83 50 87 Z" fill="white" stroke="#C93A62" strokeWidth="0.8" />
      <rect x="60" y="82" width="4" height="8" rx="1.5" fill="#E8527A" />
      <rect x="57" y="85" width="8" height="4" rx="1.5" fill="#E8527A" />

      {/* ══════════════════════════════════════
          DECORATIVE
         ══════════════════════════════════════ */}
      <path d="M24 48 L25.5 44 L27 48 L31 49.5 L27 51 L25.5 55 L24 51 L20 49.5 Z" fill="#E8527A" fillOpacity="0.38" />
      <circle cx="254" cy="168" r="5" fill="#FFB8D0" />
      <circle cx="20" cy="168" r="4" fill="#FFB8D0" />
      <circle cx="262" cy="60" r="3" fill="#E8527A" fillOpacity="0.3" />
    </svg>
  )
}
