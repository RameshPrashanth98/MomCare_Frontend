'use client'

import Link from 'next/link'
import { Bell, Globe, AlertTriangle, Home, Users, Building2, FileText, UserCircle, Plus, Stethoscope, Syringe, ChevronRight } from 'lucide-react'

// ─── Mock data ────────────────────────────────────────────────────────────────

const STATS = [
  { label: "Today's Clinics",  value: 3,  color: 'var(--color-on-surface)',   bg: 'var(--color-surface)' },
  {
    label: 'High Risk Mothers', value: 5,  color: 'var(--color-brand-pink)',
    // Exception: #FFF0F3 is a pink-tinted tint not present in the token set.
    // --color-risk-high-bg (#FEF2F2) is red-tinted; --color-brand-pink-light is the
    // hex colour, not the right lightness for a background. This one-off tint is
    // intentional per design spec. All other colours use design tokens.
    bg: '#FFF0F3',
  },
  { label: 'Upcoming Appts',   value: 12, color: 'var(--color-on-surface)',   bg: 'var(--color-surface)' },
  { label: 'Recent Updates',   value: 4,  color: 'var(--color-primary)',      bg: 'var(--color-primary-light)' },
]

const TODAYS_CLINICS = [
  { name: 'Clinic A', time: '8:30 AM',  badge: 'Upcoming',  badgeType: 'pink'  as const },
  { name: 'Clinic B', time: '11:00 AM', badge: 'Scheduled', badgeType: 'green' as const },
]

const HIGH_RISK_MOTHERS = [
  { name: 'Nadeesha Silva', condition: 'High Blood Pressure',  midwife: 'Midwife: Malani'  },
  { name: 'Kavitha Perera', condition: 'Gestational Diabetes', midwife: 'Midwife: Nirmala' },
]

const UPCOMING_APPOINTMENTS = [
  { name: 'Samanthi Perera', clinic: 'Clinic A', time: '9:15 AM'  },
  { name: 'Kavitha Silva',   clinic: 'Clinic B', time: '10:00 AM' },
]

const NAV_ITEMS = [
  { icon: Home,       label: 'HOME',    active: true  },
  { icon: Users,      label: 'MOTHERS', active: false },
  { icon: Building2,  label: 'CLINICS', active: false },
  { icon: FileText,   label: 'RECORDS', active: false },
  { icon: UserCircle, label: 'PROFILE', active: false },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function DashboardPage() {
  return (
    <div className="flex flex-col h-dvh overflow-hidden">

      {/* ── Scrollable content ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto pb-[140px]">

        {/* 1. Top App Bar */}
        <div
          className="flex items-center justify-between"
          style={{
            height: '56px',
            paddingLeft:  'var(--spacing-md)',
            paddingRight: 'var(--spacing-md)',
          }}
        >
          <span
            style={{
              fontFamily: 'serif',
              fontWeight: 700,
              fontSize:   '18px',
              color:      'var(--color-brand-pink-dark)',
            }}
          >
            MOH Clinic
          </span>

          <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
            <Link href="/dashboard/notifications">
              <Bell size={22} strokeWidth={1.5} style={{ color: 'var(--color-brand-pink)' }} />
            </Link>
            {/* Pink avatar */}
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width:      '32px',
                height:     '32px',
                background: 'var(--color-brand-pink)',
                fontSize:   '12px',
                fontWeight: 600,
                color:      'white',
              }}
            >
              RP
            </div>
          </div>
        </div>

        {/* 2. Language Row */}
        <div
          className="flex justify-end items-center"
          style={{
            paddingLeft:  'var(--spacing-md)',
            paddingRight: 'var(--spacing-md)',
            paddingTop:   'var(--spacing-xs)',
            paddingBottom:'var(--spacing-xs)',
            gap:          '4px',
            color:        'var(--color-on-surface-secondary)',
            fontSize:     '12px',
          }}
        >
          <span>EN |</span>
          <Globe size={14} />
        </div>

        {/* 3. Stats Grid 2×2 */}
        <div
          className="grid grid-cols-2"
          style={{
            paddingLeft:  'var(--spacing-md)',
            paddingRight: 'var(--spacing-md)',
            gap:          'var(--spacing-sm)',
          }}
        >
          {STATS.map((stat) => (
            <div
              key={stat.label}
              style={{
                background:   stat.bg,
                borderRadius: 'var(--radius-xl)',
                padding:      'var(--spacing-md)',
                boxShadow:    'var(--shadow-sm)',
              }}
            >
              <div
                style={{
                  fontSize:     '12px',
                  color:        'var(--color-on-surface-secondary)',
                  marginBottom: 'var(--spacing-xs)',
                }}
              >
                {stat.label}
              </div>
              <div
                style={{
                  fontSize:   '28px',
                  fontWeight: 700,
                  color:      stat.color,
                  lineHeight: 1.1,
                }}
              >
                {stat.value}
              </div>
            </div>
          ))}
        </div>

        {/* 4. TODAY'S CLINICS */}
        <div
          style={{
            marginTop:    'var(--spacing-lg)',
            paddingLeft:  'var(--spacing-md)',
            paddingRight: 'var(--spacing-md)',
          }}
        >
          <div
            style={{
              fontSize:      '12px',
              fontWeight:    600,
              textTransform: 'uppercase',
              letterSpacing: '0.08em',
              color:         'var(--color-on-surface-secondary)',
              marginBottom:  'var(--spacing-sm)',
            }}
          >
            Today&apos;s Clinics
          </div>

          {TODAYS_CLINICS.map((clinic, i) => (
            <div
              key={clinic.name}
              className="flex items-center justify-between"
              style={{
                paddingTop:    'var(--spacing-sm)',
                paddingBottom: 'var(--spacing-sm)',
                borderBottom:  i < TODAYS_CLINICS.length - 1
                  ? '1px solid var(--color-border)'
                  : 'none',
              }}
            >
              {/* Name · Time */}
              <span style={{ fontSize: '14px', color: 'var(--color-on-surface)' }}>
                {clinic.name}
                <span style={{ color: 'var(--color-on-surface-secondary)', margin: '0 6px' }}>·</span>
                {clinic.time}
              </span>

              {/* Badge */}
              {clinic.badgeType === 'pink' ? (
                <span
                  style={{
                    background:   'var(--color-brand-pink)',
                    color:        'white',
                    fontSize:     '11px',
                    paddingLeft:  'var(--spacing-sm)',
                    paddingRight: 'var(--spacing-sm)',
                    paddingTop:   '2px',
                    paddingBottom:'2px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {clinic.badge}
                </span>
              ) : (
                <span
                  style={{
                    background:   'transparent',
                    border:       '1px solid var(--color-primary)',
                    color:        'var(--color-primary)',
                    fontSize:     '11px',
                    paddingLeft:  'var(--spacing-sm)',
                    paddingRight: 'var(--spacing-sm)',
                    paddingTop:   '2px',
                    paddingBottom:'2px',
                    borderRadius: 'var(--radius-full)',
                  }}
                >
                  {clinic.badge}
                </span>
              )}
            </div>
          ))}
        </div>

        {/* 5. HIGH RISK MOTHERS */}
        <div
          style={{
            marginTop:    'var(--spacing-lg)',
            paddingLeft:  'var(--spacing-md)',
            paddingRight: 'var(--spacing-md)',
          }}
        >
          {/* Section header row */}
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
            <span
              style={{
                fontSize:      '12px',
                fontWeight:    600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color:         'var(--color-on-surface-secondary)',
              }}
            >
              High Risk Mothers
            </span>
            <span
              style={{
                fontSize: '12px',
                color:    'var(--color-brand-pink)',
                cursor:   'pointer',
              }}
            >
              See all
            </span>
          </div>

          {/* Horizontal scroll — hide scrollbar via inline + Tailwind */}
          <div
            className="flex [&::-webkit-scrollbar]:hidden"
            style={{
              overflowX:          'auto',
              gap:                'var(--spacing-sm)',
              paddingBottom:      'var(--spacing-xs)',
              msOverflowStyle:    'none',
              scrollbarWidth:     'none',
            } as React.CSSProperties}
          >
            {HIGH_RISK_MOTHERS.map((mother) => (
              <div
                key={mother.name}
                style={{
                  minWidth:     '260px',
                  borderRadius: 'var(--radius-xl)',
                  padding:      'var(--spacing-md)',
                  background:   'var(--color-risk-high-bg)',
                  flexShrink:   0,
                }}
              >
                {/* Row 1: icon + name */}
                <div className="flex items-center" style={{ gap: 'var(--spacing-xs)' }}>
                  <AlertTriangle size={16} style={{ color: 'var(--color-risk-high)', flexShrink: 0 }} />
                  <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
                    {mother.name}
                  </span>
                </div>
                {/* Row 2: condition */}
                <div
                  style={{
                    fontSize:  '13px',
                    color:     'var(--color-on-surface-secondary)',
                    marginTop: 'var(--spacing-xs)',
                  }}
                >
                  {mother.condition}
                </div>
                {/* Row 3: midwife */}
                <div
                  style={{
                    fontSize:  '12px',
                    color:     'var(--color-on-surface-secondary)',
                    marginTop: 'var(--spacing-xs)',
                  }}
                >
                  {mother.midwife}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* 6. UPCOMING APPOINTMENTS */}
        <div
          style={{
            marginTop:    'var(--spacing-lg)',
            paddingLeft:  'var(--spacing-md)',
            paddingRight: 'var(--spacing-md)',
          }}
        >
          {/* Section header row */}
          <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
            <span
              style={{
                fontSize:      '12px',
                fontWeight:    600,
                textTransform: 'uppercase',
                letterSpacing: '0.08em',
                color:         'var(--color-on-surface-secondary)',
              }}
            >
              Upcoming Appointments
            </span>
            <span
              style={{
                fontSize: '12px',
                color:    'var(--color-brand-pink)',
                cursor:   'pointer',
              }}
            >
              See all
            </span>
          </div>

          {UPCOMING_APPOINTMENTS.map((appt, i) => (
            <div
              key={appt.name}
              className="flex items-center justify-between"
              style={{
                paddingTop:    'var(--spacing-sm)',
                paddingBottom: 'var(--spacing-sm)',
                borderBottom:  i < UPCOMING_APPOINTMENTS.length - 1
                  ? '1px solid var(--color-border)'
                  : 'none',
              }}
            >
              {/* Left: name + clinic · time */}
              <div className="flex flex-col">
                <span
                  style={{
                    fontSize:   '14px',
                    fontWeight: 500,
                    color:      'var(--color-on-surface)',
                  }}
                >
                  {appt.name}
                </span>
                <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)' }}>
                  {appt.clinic}
                  <span style={{ margin: '0 6px' }}>·</span>
                  {appt.time}
                </span>
              </div>
              {/* Right: chevron */}
              <ChevronRight size={18} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
            </div>
          ))}
        </div>

      </div>
      {/* ── End scrollable content ──────────────────────────────────────────── */}

      {/* 7. Sticky Action Row (above bottom nav) */}
      <div
        className="flex items-center w-full"
        style={{
          paddingLeft:  'var(--spacing-md)',
          paddingRight: 'var(--spacing-md)',
          paddingTop:   'var(--spacing-sm)',
          paddingBottom:'var(--spacing-sm)',
          gap:          'var(--spacing-sm)',
          background:   'var(--color-surface-secondary)',
        }}
      >
        {/* + Register Mother */}
        <button
          type="button"
          className="flex items-center justify-center"
          style={{
            flex:         1,
            gap:          'var(--spacing-xs)',
            background:   'var(--color-brand-pink)',
            color:        'white',
            border:       'none',
            borderRadius: 'var(--radius-full)',
            fontSize:     '13px',
            fontWeight:   500,
            paddingLeft:  'var(--spacing-sm)',
            paddingRight: 'var(--spacing-sm)',
            height:       '40px',
            cursor:       'pointer',
            whiteSpace:   'nowrap',
            minWidth:     0,
          }}
        >
          <Plus size={14} />
          Register Mother
        </button>

        {/* Clinic Visit */}
        <button
          type="button"
          className="flex items-center justify-center"
          style={{
            flex:         1,
            gap:          'var(--spacing-xs)',
            background:   'transparent',
            color:        'var(--color-brand-pink)',
            border:       '1.5px solid var(--color-brand-pink)',
            borderRadius: 'var(--radius-full)',
            fontSize:     '13px',
            fontWeight:   500,
            paddingLeft:  'var(--spacing-sm)',
            paddingRight: 'var(--spacing-sm)',
            height:       '40px',
            cursor:       'pointer',
            whiteSpace:   'nowrap',
            minWidth:     0,
          }}
        >
          <Stethoscope size={14} />
          Clinic Visit
        </button>

        {/* Add Vaccination */}
        <button
          type="button"
          className="flex items-center justify-center"
          style={{
            flex:         1,
            gap:          'var(--spacing-xs)',
            background:   'transparent',
            color:        'var(--color-primary)',
            border:       '1.5px solid var(--color-primary)',
            borderRadius: 'var(--radius-full)',
            fontSize:     '13px',
            fontWeight:   500,
            paddingLeft:  'var(--spacing-sm)',
            paddingRight: 'var(--spacing-sm)',
            height:       '40px',
            cursor:       'pointer',
            whiteSpace:   'nowrap',
            minWidth:     0,
          }}
        >
          <Syringe size={14} />
          Add Vaccination
        </button>
      </div>

      {/* 8. Bottom Navigation Bar */}
      <div
        className="flex items-center justify-around"
        style={{
          height:      '64px',
          background:  'var(--color-surface)',
          borderTop:   '1px solid var(--color-border)',
          paddingLeft: 'var(--spacing-sm)',
          paddingRight:'var(--spacing-sm)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon = item.icon
          const activeColor   = 'var(--color-brand-pink)'
          const inactiveColor = 'var(--color-on-surface-secondary)'
          return (
            <button
              key={item.label}
              type="button"
              className="flex flex-col items-center"
              style={{
                gap:        '2px',
                color:      item.active ? activeColor : inactiveColor,
                background: 'none',
                border:     'none',
                cursor:     'pointer',
                padding:    '4px 8px',
              }}
            >
              <Icon
                size={22}
                // Only the active HOME icon gets a filled appearance
                fill={item.active ? 'currentColor' : 'none'}
              />
              <span style={{ fontSize: '10px', fontWeight: 500 }}>{item.label}</span>
            </button>
          )
        })}
      </div>

    </div>
  )
}
