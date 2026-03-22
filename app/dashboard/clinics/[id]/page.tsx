'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Search,
  Calendar,
  Clock,
  MapPin,
  AlertTriangle,
  User,
  Users,
  Building2,
  FileText,
  UserCircle,
  Home,
  Play,
  Square,
  UserPlus,
} from 'lucide-react'

// ─── Mock data ────────────────────────────────────────────────────────────────

interface RegisteredMother {
  initials: string
  avatarBg: string
  name: string
  subtitle: string
  isHighRisk: boolean
  status: 'Active' | 'Waiting'
  date: string
  timeRange: string
  assignedMidwife: string
  expectedMothers: number
  actions: ('Record Visit' | 'View Profile' | 'Medical History' | 'Check In')[]
}

const REGISTERED_MOTHERS: RegisteredMother[] = [
  {
    initials: 'NS',
    avatarBg: '#1B6B4A',
    name: 'Nadeesha Silva',
    subtitle: 'NIC: 199812345V',
    isHighRisk: true,
    status: 'Active',
    date: 'Wed 12',
    timeRange: '9:00 AM – 12:00 PM',
    assignedMidwife: 'Malani',
    expectedMothers: 18,
    actions: ['Record Visit', 'View Profile', 'Medical History'],
  },
  {
    initials: 'SP',
    avatarBg: '#1B6B4A',
    name: 'Samanthi Perera',
    subtitle: 'Meowathura MOH Area',
    isHighRisk: false,
    status: 'Waiting',
    date: 'Thur, Apr 25',
    timeRange: '9:00 AM – 12:00 PM',
    assignedMidwife: 'Nirmala',
    expectedMothers: 24,
    actions: ['Record Visit', 'View Profile', 'Check In'],
  },
]

const NAV_ITEMS = [
  { icon: Home,       label: 'HOME',    href: '/dashboard',         active: false },
  { icon: Users,      label: 'MOTHERS', href: '/dashboard/mothers', active: false },
  { icon: Building2,  label: 'CLINICS', href: '/dashboard/clinics', active: true  },
  { icon: FileText,   label: 'RECORDS', href: null,                 active: false },
  { icon: UserCircle, label: 'PROFILE', href: '/dashboard/profile',                 active: false },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function StatusBadge({ status }: { status: 'Active' | 'Waiting' }) {
  const isActive = status === 'Active'
  return (
    <span
      style={{
        fontSize:      '11px',
        fontWeight:    500,
        paddingLeft:   'var(--spacing-sm)',
        paddingRight:  'var(--spacing-sm)',
        paddingTop:    '2px',
        paddingBottom: '2px',
        borderRadius:  'var(--radius-full)',
        background:    isActive ? 'var(--color-risk-low-bg)' : 'transparent',
        color:         isActive ? 'var(--color-success)' : 'var(--color-warning)',
        border:        isActive ? 'none' : '1px solid var(--color-warning)',
        flexShrink:    0,
        whiteSpace:    'nowrap',
      }}
    >
      {status}
    </span>
  )
}

function ActionButton({
  label,
  icon,
  variant = 'outlined',
}: {
  label: string
  icon: React.ReactNode
  variant?: 'pink-outlined' | 'outlined'
}) {
  const isPink = variant === 'pink-outlined'
  return (
    <button
      type="button"
      className="flex items-center"
      style={{
        gap:           '4px',
        height:        '30px',
        paddingLeft:   'var(--spacing-sm)',
        paddingRight:  'var(--spacing-sm)',
        background:    isPink ? 'var(--color-risk-high-bg)' : 'transparent',
        color:         isPink ? 'var(--color-brand-pink)' : 'var(--color-on-surface)',
        border:        `1px solid ${isPink ? 'var(--color-brand-pink)' : 'var(--color-border-strong)'}`,
        borderRadius:  'var(--radius-full)',
        fontSize:      '11px',
        fontWeight:    500,
        cursor:        'pointer',
        whiteSpace:    'nowrap',
        flexShrink:    0,
      }}
    >
      {icon}
      {label}
    </button>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClinicSessionPage() {
  const router = useRouter()

  return (
    <div className="flex flex-col h-dvh overflow-hidden">

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between flex-shrink-0"
        style={{
          height:       '56px',
          paddingLeft:  'var(--spacing-md)',
          paddingRight: 'var(--spacing-md)',
          background:   'var(--color-surface)',
          borderBottom: '1px solid var(--color-border)',
        }}
      >
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            display:    'flex',
            alignItems: 'center',
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            padding:    '4px',
            color:      'var(--color-on-surface)',
          }}
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>

        <span
          style={{
            fontSize:   '17px',
            fontWeight: 600,
            color:      'var(--color-on-surface)',
          }}
        >
          Clinic Session
        </span>

        <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
          <button
            type="button"
            style={{
              display:    'flex',
              alignItems: 'center',
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              padding:    '4px',
              color:      'var(--color-on-surface)',
            }}
          >
            <Search size={20} strokeWidth={1.5} />
          </button>
          <span
            style={{
              fontSize:      '11px',
              fontWeight:    500,
              color:         'var(--color-on-surface-secondary)',
              border:        '1px solid var(--color-border)',
              paddingLeft:   'var(--spacing-sm)',
              paddingRight:  'var(--spacing-sm)',
              paddingTop:    '2px',
              paddingBottom: '2px',
              borderRadius:  'var(--radius-full)',
            }}
          >
            8 /EN
          </span>
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width:      '28px',
              height:     '28px',
              background: 'var(--color-brand-pink)',
              fontSize:   '12px',
              fontWeight: 600,
              color:      'white',
              flexShrink: 0,
            }}
          >
            M
          </div>
        </div>
      </div>

      {/* ── Scrollable content ───────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          background:    'var(--color-surface-secondary)',
          paddingBottom: '16px',
        }}
      >

        {/* ── Pink banner section ────────────────────────────────────────────── */}
        <div
          style={{
            background:    'var(--color-risk-high-bg)',
            paddingLeft:   'var(--spacing-md)',
            paddingRight:  'var(--spacing-md)',
            paddingTop:    'var(--spacing-md)',
            paddingBottom: 'var(--spacing-md)',
          }}
        >
          <span
            style={{
              fontSize:      '12px',
              fontWeight:    600,
              color:         'var(--color-brand-pink)',
              textTransform: 'uppercase',
              letterSpacing: '0.5px',
            }}
          >
            Clinic Session
          </span>
          <h1
            style={{
              fontSize:   '18px',
              fontWeight: 700,
              color:      'var(--color-on-surface)',
              margin:     0,
              marginTop:  '4px',
              lineHeight: 1.3,
            }}
          >
            Antenatal Clinic – Village Health Center
          </h1>
          <div
            className="flex items-center"
            style={{
              gap:       '6px',
              marginTop: '6px',
            }}
          >
            <Calendar size={14} style={{ color: 'var(--color-on-surface-secondary)' }} />
            <span style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)' }}>
              Wed 12 | 8:30 AM
            </span>
          </div>
        </div>

        {/* ── Clinic Info Card ───────────────────────────────────────────────── */}
        <div
          style={{
            background:   'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border:       '1px solid var(--color-border)',
            padding:      'var(--spacing-md)',
            marginLeft:   'var(--spacing-md)',
            marginRight:  'var(--spacing-md)',
            marginTop:    'var(--spacing-md)',
          }}
        >
          {/* Name + Status */}
          <div className="flex items-center justify-between">
            <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
              Antenatal Clinic A
            </span>
            <StatusBadge status="Active" />
          </div>

          {/* Location */}
          <div className="flex items-center" style={{ marginTop: '6px', gap: '4px' }}>
            <MapPin size={14} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
            <span style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)' }}>
              Location: Village Health Center
            </span>
          </div>

          {/* Date/time + Active dot */}
          <div className="flex items-center justify-between" style={{ marginTop: '6px' }}>
            <div className="flex items-center" style={{ gap: '4px' }}>
              <Calendar size={13} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
              <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)' }}>
                Wed 12 | 8:30 AM
              </span>
            </div>
            <div className="flex items-center" style={{ gap: '4px' }}>
              <span
                style={{
                  display:      'inline-block',
                  width:        '8px',
                  height:       '8px',
                  borderRadius: 'var(--radius-full)',
                  background:   'var(--color-success)',
                }}
              />
              <span style={{ fontSize: '12px', color: 'var(--color-success)', fontWeight: 500 }}>
                Active
              </span>
            </div>
          </div>

          {/* Assigned Midwife */}
          <div className="flex items-center" style={{ marginTop: '6px', gap: '4px' }}>
            <User size={13} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
            <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)' }}>
              Assigned Midwife: Malani
            </span>
          </div>
        </div>

        {/* ── Registered Mothers Header ──────────────────────────────────────── */}
        <div
          style={{
            paddingLeft:  'var(--spacing-md)',
            paddingRight: 'var(--spacing-md)',
            marginTop:    'var(--spacing-lg)',
            marginBottom: 'var(--spacing-sm)',
          }}
        >
          <span style={{ fontSize: '16px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
            Registered Mothers
          </span>
        </div>

        {/* ── Mother Cards ──────────────────────────────────────────────────── */}
        {REGISTERED_MOTHERS.map((mother) => (
          <div
            key={mother.name}
            style={{
              background:   'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              border:       '1px solid var(--color-border)',
              padding:      'var(--spacing-md)',
              marginLeft:   'var(--spacing-md)',
              marginRight:  'var(--spacing-md)',
              marginTop:    'var(--spacing-sm)',
            }}
          >
            {/* Row 1: Avatar + Name/subtitle + Status */}
            <div className="flex items-start" style={{ gap: 'var(--spacing-sm)' }}>
              {/* Avatar */}
              <div
                className="flex items-center justify-center rounded-full"
                style={{
                  width:      '40px',
                  height:     '40px',
                  background: mother.avatarBg,
                  fontSize:   '14px',
                  fontWeight: 600,
                  color:      'white',
                  flexShrink: 0,
                }}
              >
                {mother.initials}
              </div>

              {/* Name block */}
              <div className="flex-1" style={{ minWidth: 0 }}>
                <div className="flex items-center" style={{ gap: '4px' }}>
                  <span style={{ fontSize: '15px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
                    {mother.name}
                  </span>
                  {mother.isHighRisk && (
                    <AlertTriangle size={14} style={{ color: 'var(--color-warning)', flexShrink: 0 }} />
                  )}
                </div>
                <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)', marginTop: '1px', display: 'block' }}>
                  {mother.subtitle}
                </span>
              </div>

              {/* Status badge */}
              <StatusBadge status={mother.status} />
            </div>

            {/* Row 2: Date + Time range */}
            <div
              className="flex items-center justify-between"
              style={{ marginTop: 'var(--spacing-sm)' }}
            >
              <div className="flex items-center" style={{ gap: '4px' }}>
                <Calendar size={13} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)' }}>
                  {mother.date}
                </span>
              </div>
              <div className="flex items-center" style={{ gap: '4px' }}>
                <Clock size={13} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)' }}>
                  {mother.timeRange}
                </span>
              </div>
            </div>

            {/* Row 3: Assigned midwife + Expected */}
            <div
              className="flex items-center justify-between"
              style={{ marginTop: 'var(--spacing-xs)' }}
            >
              <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)' }}>
                Assigned {mother.assignedMidwife}
              </span>
              <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)' }}>
                Exp: {mother.expectedMothers} mothers
              </span>
            </div>

            {/* Row 4: Action buttons */}
            <div
              className="flex flex-wrap"
              style={{
                marginTop: 'var(--spacing-sm)',
                gap:       'var(--spacing-xs)',
              }}
            >
              {mother.actions.map((action) => {
                if (action === 'Record Visit') {
                  return (
                    <ActionButton
                      key={action}
                      label={action}
                      icon={<FileText size={12} />}
                      variant="pink-outlined"
                    />
                  )
                }
                if (action === 'View Profile') {
                  return (
                    <ActionButton
                      key={action}
                      label={action}
                      icon={<User size={12} />}
                      variant="outlined"
                    />
                  )
                }
                if (action === 'Medical History') {
                  return (
                    <ActionButton
                      key={action}
                      label={action}
                      icon={<FileText size={12} />}
                      variant="outlined"
                    />
                  )
                }
                if (action === 'Check In') {
                  return (
                    <ActionButton
                      key={action}
                      label={action}
                      icon={<UserPlus size={12} />}
                      variant="pink-outlined"
                    />
                  )
                }
                return null
              })}
            </div>
          </div>
        ))}

      </div>
      {/* ── End scrollable content ──────────────────────────────────────────── */}

      {/* ── Bottom Action Bar ───────────────────────────────────────────────── */}
      <div
        className="flex items-center flex-shrink-0"
        style={{
          height:       '60px',
          background:   'var(--color-surface)',
          borderTop:    '1px solid var(--color-border)',
          paddingLeft:  'var(--spacing-md)',
          paddingRight: 'var(--spacing-md)',
          gap:          'var(--spacing-sm)',
        }}
      >
        {/* Start Clinic */}
        <button
          type="button"
          className="flex items-center justify-center"
          style={{
            gap:          '4px',
            height:       '36px',
            paddingLeft:  'var(--spacing-md)',
            paddingRight: 'var(--spacing-md)',
            background:   'var(--color-brand-pink)',
            color:        'white',
            border:       'none',
            borderRadius: 'var(--radius-full)',
            fontSize:     '12px',
            fontWeight:   600,
            cursor:       'pointer',
            whiteSpace:   'nowrap',
          }}
        >
          <Play size={14} />
          Start Clinic
        </button>

        {/* End Clinic */}
        <button
          type="button"
          className="flex items-center justify-center"
          style={{
            gap:          '4px',
            height:       '36px',
            paddingLeft:  'var(--spacing-md)',
            paddingRight: 'var(--spacing-md)',
            background:   'transparent',
            color:        'var(--color-on-surface)',
            border:       '1.5px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-full)',
            fontSize:     '12px',
            fontWeight:   500,
            cursor:       'pointer',
            whiteSpace:   'nowrap',
          }}
        >
          <Square size={13} />
          End Clinic
        </button>

        {/* Add Walk-in Mother */}
        <button
          type="button"
          className="flex items-center justify-center"
          style={{
            gap:          '4px',
            height:       '36px',
            paddingLeft:  'var(--spacing-md)',
            paddingRight: 'var(--spacing-md)',
            background:   'transparent',
            color:        'var(--color-on-surface)',
            border:       '1.5px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-full)',
            fontSize:     '12px',
            fontWeight:   500,
            cursor:       'pointer',
            whiteSpace:   'nowrap',
          }}
        >
          <UserPlus size={13} />
          Add Walk-in Mother
        </button>
      </div>

      {/* ── Bottom Navigation Bar ───────────────────────────────────────────── */}
      <div
        className="flex items-center justify-around flex-shrink-0"
        style={{
          height:       '64px',
          background:   'var(--color-surface)',
          borderTop:    '1px solid var(--color-border)',
          paddingLeft:  'var(--spacing-sm)',
          paddingRight: 'var(--spacing-sm)',
        }}
      >
        {NAV_ITEMS.map((item) => {
          const Icon          = item.icon
          const activeColor   = 'var(--color-brand-pink)'
          const inactiveColor = 'var(--color-on-surface-secondary)'
          const innerContent = (
            <>
              <Icon
                size={22}
                fill={item.active ? 'currentColor' : 'none'}
              />
              <span style={{ fontSize: '10px', fontWeight: 500 }}>{item.label}</span>
            </>
          )

          if (item.href) {
            return (
              <Link
                key={item.label}
                href={item.href}
                className="flex flex-col items-center"
                style={{
                  gap:            '2px',
                  color:          item.active ? activeColor : inactiveColor,
                  textDecoration: 'none',
                  padding:        '4px 8px',
                }}
              >
                {innerContent}
              </Link>
            )
          }

          return (
            <button
              key={item.label}
              type="button"
              className="flex flex-col items-center"
              style={{
                gap:        '2px',
                color:      inactiveColor,
                background: 'none',
                border:     'none',
                cursor:     'pointer',
                padding:    '4px 8px',
              }}
            >
              {innerContent}
            </button>
          )
        })}
      </div>

    </div>
  )
}
