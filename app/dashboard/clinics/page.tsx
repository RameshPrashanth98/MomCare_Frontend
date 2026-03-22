'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Bell,
  Calendar,
  MapPin,
  User,
  Users,
  Stethoscope,
  Building2,
  Home,
  FileText,
  UserCircle,
  Plus,
  Eye,
  Play,
  List,
  ChevronRight,
} from 'lucide-react'

// ─── Mock data ────────────────────────────────────────────────────────────────

const DAYS = [
  { abbr: 'Mon', date: 10 },
  { abbr: 'Tue', date: 11 },
  { abbr: 'Wed', date: 12 },
  { abbr: 'Thu', date: 13 },
  { abbr: 'Fri', date: 14 },
]

interface ClinicSession {
  name: string
  status: string
  statusColor: string
  statusBg: string
  location: string
  day: string
  time: string
  midwife: string
  expected: number
  type: string
}

const CLINIC_SESSIONS: ClinicSession[] = [
  {
    name: 'Antenatal Clinic A',
    status: 'Active',
    statusColor: 'var(--color-success)',
    statusBg: 'var(--color-risk-low-bg)',
    location: 'Village Health Center',
    day: 'Wed 12',
    time: '8:30 AM',
    midwife: 'Malani',
    expected: 25,
    type: 'Antenatal',
  },
  {
    name: 'Antenatal Clinic B',
    status: 'Upcoming',
    statusColor: 'var(--color-warning)',
    statusBg: 'var(--color-risk-medium-bg)',
    location: 'Lakewood MOH Office',
    day: 'Wed 12',
    time: '9:00 AM',
    midwife: 'Sunita',
    expected: 18,
    type: 'Antenatal',
  },
  {
    name: 'Antenatal Clinic C',
    status: 'Completed',
    statusColor: 'var(--color-on-surface-secondary)',
    statusBg: 'var(--color-surface-secondary)',
    location: 'Riverside PHM Area',
    day: 'Tue 11',
    time: '8:00 AM',
    midwife: 'Lakshmi',
    expected: 22,
    type: 'Antenatal',
  },
]

const NAV_ITEMS = [
  { icon: Home,       label: 'HOME',    href: '/dashboard',         active: false },
  { icon: Users,      label: 'MOTHERS', href: '/dashboard/mothers', active: false },
  { icon: Building2,  label: 'CLINICS', href: '/dashboard/clinics', active: true  },
  { icon: FileText,   label: 'RECORDS', href: null,                 active: false },
  { icon: UserCircle, label: 'PROFILE', href: null,                 active: false },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ClinicsPage() {
  const router = useRouter()
  const [selectedDay, setSelectedDay] = useState(2) // Wed index

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
        {/* Back arrow */}
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

        {/* Title */}
        <span
          style={{
            fontSize:   '17px',
            fontWeight: 600,
            color:      'var(--color-on-surface)',
          }}
        >
          Clinic Schedule
        </span>

        {/* Right: EN badge + Bell + Avatar */}
        <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
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
            EN
          </span>
          <Link href="/dashboard/notifications" style={{ display: 'flex', alignItems: 'center', color: 'var(--color-on-surface)' }}>
            <Bell size={20} strokeWidth={1.5} />
          </Link>
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
      <div className="flex-1 overflow-y-auto">

        {/* Today's Clinics section header */}
        <div
          className="flex items-center justify-between"
          style={{
            paddingLeft:  'var(--spacing-md)',
            paddingRight: 'var(--spacing-md)',
            paddingTop:   'var(--spacing-md)',
          }}
        >
          <div className="flex items-center" style={{ gap: 'var(--spacing-xs)' }}>
            {/* Pink dot */}
            <span
              style={{
                display:      'inline-block',
                width:        '8px',
                height:       '8px',
                borderRadius: 'var(--radius-full)',
                background:   'var(--color-brand-pink)',
                flexShrink:   0,
              }}
            />
            <span
              style={{
                fontSize:   '16px',
                fontWeight: 600,
                color:      'var(--color-on-surface)',
              }}
            >
              Today&apos;s Clinics
            </span>
          </div>
          <Calendar size={20} style={{ color: 'var(--color-on-surface-secondary)' }} />
        </div>

        {/* Day selector strip */}
        <div
          className="flex [&::-webkit-scrollbar]:hidden"
          style={{
            overflowX:       'auto',
            gap:             'var(--spacing-sm)',
            paddingLeft:     'var(--spacing-md)',
            paddingRight:    'var(--spacing-md)',
            marginTop:       'var(--spacing-md)',
            paddingBottom:   'var(--spacing-xs)',
            msOverflowStyle: 'none',
            scrollbarWidth:  'none',
            alignItems:      'center',
          } as React.CSSProperties}
        >
          {DAYS.map((day, index) => {
            const isActive = index === selectedDay
            return (
              <button
                key={day.abbr}
                type="button"
                onClick={() => setSelectedDay(index)}
                className="flex flex-col items-center"
                style={{
                  gap:        '4px',
                  minWidth:   '56px',
                  background: 'none',
                  border:     'none',
                  cursor:     'pointer',
                  padding:    '4px 0',
                  flexShrink: 0,
                }}
              >
                <span
                  style={{
                    fontSize:   '12px',
                    color:      isActive ? 'var(--color-brand-pink)' : 'var(--color-on-surface-secondary)',
                    fontWeight: isActive ? 500 : 400,
                  }}
                >
                  {day.abbr}
                </span>
                <div
                  style={{
                    width:          '36px',
                    height:         '36px',
                    display:        'flex',
                    alignItems:     'center',
                    justifyContent: 'center',
                    borderRadius:   isActive ? 'var(--radius-full)' : undefined,
                    background:     isActive ? 'var(--color-brand-pink)' : 'transparent',
                  }}
                >
                  <span
                    style={{
                      fontSize:   '14px',
                      fontWeight: 500,
                      color:      isActive ? 'white' : 'var(--color-on-surface)',
                    }}
                  >
                    {day.date}
                  </span>
                </div>
              </button>
            )
          })}
          <ChevronRight size={18} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0, marginLeft: 'auto' }} />
        </div>

        {/* Session cards */}
        {CLINIC_SESSIONS.map((session) => (
          <div
            key={session.name}
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
            {/* Row 1: Name + Status badge */}
            <div className="flex items-center justify-between">
              <span
                style={{
                  fontSize:   '15px',
                  fontWeight: 600,
                  color:      'var(--color-on-surface)',
                }}
              >
                {session.name}
              </span>
              <span
                style={{
                  fontSize:      '11px',
                  fontWeight:    500,
                  paddingLeft:   'var(--spacing-sm)',
                  paddingRight:  'var(--spacing-sm)',
                  paddingTop:    '2px',
                  paddingBottom: '2px',
                  borderRadius:  'var(--radius-full)',
                  background:    session.statusBg,
                  color:         session.statusColor,
                  flexShrink:    0,
                  whiteSpace:    'nowrap',
                }}
              >
                {session.status}
              </span>
            </div>

            {/* Row 2: Location */}
            <div
              className="flex items-center"
              style={{
                marginTop: 'var(--spacing-xs)',
                gap:       '4px',
              }}
            >
              <MapPin size={14} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)' }}>
                {session.location}
              </span>
            </div>

            {/* Row 3: Details grid (2 columns × 2 rows) */}
            <div
              className="grid grid-cols-2"
              style={{
                marginTop: 'var(--spacing-sm)',
                gap:       'var(--spacing-xs)',
              }}
            >
              {/* Date/time */}
              <div className="flex items-center" style={{ gap: '4px' }}>
                <Calendar size={12} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)' }}>
                  {session.day}, {session.time}
                </span>
              </div>
              {/* Midwife */}
              <div className="flex items-center" style={{ gap: '4px' }}>
                <User size={12} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)' }}>
                  Midwife: {session.midwife}
                </span>
              </div>
              {/* Expected count */}
              <div className="flex items-center" style={{ gap: '4px' }}>
                <Users size={12} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)' }}>
                  Expected: {session.expected}
                </span>
              </div>
              {/* Type */}
              <div className="flex items-center" style={{ gap: '4px' }}>
                <Stethoscope size={12} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
                <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)' }}>
                  Type: {session.type}
                </span>
              </div>
            </div>

            {/* Row 4: Action buttons */}
            <div
              className="flex"
              style={{
                marginTop: 'var(--spacing-md)',
                gap:       'var(--spacing-sm)',
              }}
            >
              {/* View Session — outlined */}
              <button
                type="button"
                className="flex items-center justify-center"
                style={{
                  flex:          1,
                  gap:           '4px',
                  height:        '34px',
                  background:    'transparent',
                  color:         'var(--color-brand-pink)',
                  border:        '1.5px solid var(--color-brand-pink)',
                  borderRadius:  'var(--radius-full)',
                  fontSize:      '12px',
                  fontWeight:    500,
                  cursor:        'pointer',
                  whiteSpace:    'nowrap',
                }}
              >
                <Eye size={13} />
                View Session
              </button>

              {/* Start Clinic — filled pink */}
              <button
                type="button"
                className="flex items-center justify-center"
                style={{
                  flex:          1,
                  gap:           '4px',
                  height:        '34px',
                  background:    'var(--color-brand-pink)',
                  color:         'white',
                  border:        'none',
                  borderRadius:  'var(--radius-full)',
                  fontSize:      '12px',
                  fontWeight:    500,
                  cursor:        'pointer',
                  whiteSpace:    'nowrap',
                }}
              >
                <Play size={13} />
                Start Clinic
              </button>

              {/* Mothers List — outlined */}
              <button
                type="button"
                className="flex items-center justify-center"
                style={{
                  flex:          1,
                  gap:           '4px',
                  height:        '34px',
                  background:    'transparent',
                  color:         'var(--color-brand-pink)',
                  border:        '1.5px solid var(--color-brand-pink)',
                  borderRadius:  'var(--radius-full)',
                  fontSize:      '12px',
                  fontWeight:    500,
                  cursor:        'pointer',
                  whiteSpace:    'nowrap',
                }}
              >
                <List size={13} />
                Mothers List
              </button>
            </div>
          </div>
        ))}

        {/* + Add Clinic Session button */}
        <Link
          href="/dashboard/clinics/add"
          className="flex items-center justify-center"
          style={{
            width:          'calc(100% - 2 * var(--spacing-md))',
            marginLeft:     'var(--spacing-md)',
            marginRight:    'var(--spacing-md)',
            marginTop:      'var(--spacing-md)',
            marginBottom:   'var(--spacing-md)',
            height:         '44px',
            border:         '1.5px dashed var(--color-brand-pink)',
            color:          'var(--color-brand-pink)',
            background:     'transparent',
            borderRadius:   'var(--radius-xl)',
            fontSize:       '14px',
            fontWeight:     500,
            cursor:         'pointer',
            gap:            'var(--spacing-xs)',
            textDecoration: 'none',
          }}
        >
          <Plus size={16} />
          Add Clinic Session
        </Link>

      </div>
      {/* ── End scrollable content ──────────────────────────────────────────── */}

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
