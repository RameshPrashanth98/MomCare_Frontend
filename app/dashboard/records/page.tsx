'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Search,
  Home,
  Users,
  Building2,
  FileText,
  UserCircle,
  Syringe,
  Activity,
  Clock,
  Globe,
  AlertTriangle,
  CheckCircle,
} from 'lucide-react'
import { db } from '@/lib/mock/db'
import type { RiskLevel } from '@/lib/types/entities'

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: Home,       label: 'HOME',    href: '/dashboard',         active: false },
  { icon: Users,      label: 'MOTHERS', href: '/dashboard/mothers', active: false },
  { icon: Building2,  label: 'CLINICS', href: '/dashboard/clinics', active: false },
  { icon: FileText,   label: 'RECORDS', href: '/dashboard/records', active: true  },
  { icon: UserCircle, label: 'PROFILE', href: '/dashboard/profile', active: false },
]

const AVATAR_COLORS = [
  '#1B6B4A', '#E8527A', '#2563EB', '#F59E0B', '#7C3AED',
  '#DC2626', '#0891B2', '#65A30D', '#C026D3', '#EA580C',
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function getGestationalAge(lmpDate: string): { weeks: number; days: number } {
  const diffMs = Date.now() - new Date(lmpDate).getTime()
  const totalDays = Math.floor(diffMs / 86400000)
  return { weeks: Math.floor(totalDays / 7), days: totalDays % 7 }
}

function getTrimester(lmpDate: string): 1 | 2 | 3 {
  const { weeks } = getGestationalAge(lmpDate)
  if (weeks <= 13) return 1
  if (weeks <= 27) return 2
  return 3
}

function getTrimesterOrdinal(t: 1 | 2 | 3): string {
  if (t === 1) return '1st'
  if (t === 2) return '2nd'
  return '3rd'
}

function getRiskBadgeStyles(risk: RiskLevel): { bg: string; color: string; label: string; icon: typeof AlertTriangle } {
  if (risk === 'high') {
    return { bg: 'var(--color-risk-high-bg)', color: 'var(--color-risk-high)', label: 'High Risk', icon: AlertTriangle }
  }
  return { bg: 'var(--color-risk-low-bg)', color: 'var(--color-risk-low)', label: 'Normal', icon: CheckCircle }
}

function getAssignedMidwifeName(staffId: string): string {
  const staff = db.staff.find((s) => s.id === staffId)
  if (!staff) return 'Unknown'
  return staff.name.split(' ')[0]
}

// ─── Action button config ─────────────────────────────────────────────────────

const ACTION_BUTTONS = [
  { label: 'Vaccination',     icon: Syringe,  isPrimary: true  },
  { label: 'Health Tracking', icon: Activity,  isPrimary: false },
  { label: 'Lab Reports',     icon: FileText,  isPrimary: false },
  { label: 'Timeline',        icon: Clock,     isPrimary: false },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function SearchRecordsPage() {
  const router = useRouter()
  const [searchQuery, setSearchQuery] = useState('')

  const filteredMothers = useMemo(() => {
    if (!searchQuery) return db.mothers
    const q = searchQuery.toLowerCase()
    return db.mothers.filter((m) => m.nationalId.toLowerCase().includes(q))
  }, [searchQuery])

  return (
    <div className="flex flex-col h-dvh overflow-hidden" style={{ position: 'relative' }}>

      {/* ── Header ──────────────────────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between flex-shrink-0"
        style={{
          height:       '56px',
          paddingLeft:  'var(--spacing-md)',
          paddingRight: 'var(--spacing-md)',
          background:   'var(--color-surface)',
        }}
      >
        <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
          <Link
            href="/dashboard"
            style={{
              display:        'flex',
              alignItems:     'center',
              justifyContent: 'center',
              color:          'var(--color-on-surface)',
              textDecoration: 'none',
            }}
          >
            <ArrowLeft size={22} strokeWidth={1.5} />
          </Link>
          <span
            style={{
              fontSize:   '18px',
              fontWeight: 700,
              color:      'var(--color-on-surface)',
            }}
          >
            Search Records
          </span>
        </div>

        <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
          <span
            style={{
              fontSize:      '12px',
              fontWeight:    600,
              color:         'white',
              background:    'var(--color-brand-pink)',
              paddingLeft:   'var(--spacing-sm)',
              paddingRight:  'var(--spacing-sm)',
              paddingTop:    '2px',
              paddingBottom: '2px',
              borderRadius:  'var(--radius-full)',
            }}
          >
            EN
          </span>
          <Globe size={18} style={{ color: 'var(--color-on-surface-secondary)' }} />
          <div
            className="flex items-center justify-center rounded-full"
            style={{
              width:      '32px',
              height:     '32px',
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

        {/* Search bar */}
        <div
          style={{
            position:    'relative',
            marginLeft:  'var(--spacing-md)',
            marginRight: 'var(--spacing-md)',
            marginTop:   'var(--spacing-sm)',
          }}
        >
          <Search
            size={18}
            style={{
              position:      'absolute',
              left:          '12px',
              top:           '50%',
              transform:     'translateY(-50%)',
              color:         'var(--color-on-surface-secondary)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search by NIC"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width:        '100%',
              height:       '44px',
              paddingLeft:  '40px',
              paddingRight: '40px',
              background:   'var(--color-surface-secondary)',
              borderRadius: 'var(--radius-xl)',
              border:       '1px solid var(--color-border)',
              fontSize:     '14px',
              color:        'var(--color-on-surface)',
              outline:      'none',
              boxSizing:    'border-box',
            }}
          />
          {/* Right search icon */}
          <Search
            size={18}
            style={{
              position:      'absolute',
              right:         '12px',
              top:           '50%',
              transform:     'translateY(-50%)',
              color:         'var(--color-on-surface-secondary)',
              pointerEvents: 'none',
            }}
          />
        </div>

        {/* Section label */}
        <div
          style={{
            fontSize:      '14px',
            fontWeight:    600,
            color:         'var(--color-on-surface)',
            marginTop:     'var(--spacing-md)',
            paddingLeft:   'var(--spacing-md)',
            paddingRight:  'var(--spacing-md)',
            marginBottom:  'var(--spacing-sm)',
          }}
        >
          Pregnant Mothers List
        </div>

        {/* Mother record cards list */}
        <div style={{ paddingBottom: 'var(--spacing-lg)' }}>
          {filteredMothers.length === 0 && (
            <div
              style={{
                textAlign: 'center',
                padding:   'var(--spacing-xl)',
                color:     'var(--color-on-surface-secondary)',
                fontSize:  '14px',
              }}
            >
              No records found matching your search.
            </div>
          )}

          {filteredMothers.map((mother, index) => {
            const trimester = getTrimester(mother.lmpDate)
            const badge = getRiskBadgeStyles(mother.riskLevel)
            const initials = getInitials(mother.name)
            const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length]
            const midwifeName = getAssignedMidwifeName(mother.assignedStaffId)
            const BadgeIcon = badge.icon

            return (
              <div
                key={mother.id}
                style={{
                  marginLeft:   'var(--spacing-md)',
                  marginRight:  'var(--spacing-md)',
                  marginBottom: 'var(--spacing-sm)',
                  padding:      'var(--spacing-md)',
                  background:   'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border:       '1px solid var(--color-border)',
                  boxShadow:    'var(--shadow-sm)',
                }}
              >
                {/* Row 1: Avatar + Name + Risk badge */}
                <div className="flex items-start" style={{ gap: 'var(--spacing-sm)' }}>
                  <div
                    className="flex items-center justify-center rounded-full flex-shrink-0"
                    style={{
                      width:      '44px',
                      height:     '44px',
                      background: avatarColor,
                      fontSize:   '14px',
                      fontWeight: 600,
                      color:      'white',
                    }}
                  >
                    {initials}
                  </div>

                  <div className="flex-1 min-w-0">
                    <span
                      style={{
                        fontSize:   '15px',
                        fontWeight: 600,
                        color:      'var(--color-on-surface)',
                      }}
                    >
                      {mother.name}
                    </span>
                  </div>

                  <span
                    className="flex items-center"
                    style={{
                      gap:           '3px',
                      paddingLeft:   'var(--spacing-sm)',
                      paddingRight:  'var(--spacing-sm)',
                      paddingTop:    '2px',
                      paddingBottom: '2px',
                      borderRadius:  'var(--radius-full)',
                      fontSize:      '11px',
                      fontWeight:    500,
                      background:    badge.bg,
                      color:         badge.color,
                      flexShrink:    0,
                      whiteSpace:    'nowrap',
                    }}
                  >
                    <BadgeIcon size={12} />
                    {badge.label}
                  </span>
                </div>

                {/* Row 2: Info details */}
                <div
                  style={{
                    marginTop:  'var(--spacing-sm)',
                    fontSize:   '13px',
                    color:      'var(--color-on-surface-secondary)',
                    display:    'flex',
                    flexDirection: 'column',
                    gap:        '2px',
                  }}
                >
                  <span>NIC: {mother.nationalId}</span>
                  <span>Clinic No: {mother.assignedClinicId}</span>
                  <span>Trimester: {getTrimesterOrdinal(trimester)}</span>
                  <span>Midwife: {midwifeName}</span>
                </div>

                {/* Row 3: Action buttons - 2x2 grid */}
                <div
                  className="grid grid-cols-2"
                  style={{
                    marginTop: 'var(--spacing-sm)',
                    gap:       'var(--spacing-sm)',
                  }}
                >
                  {ACTION_BUTTONS.map((btn) => {
                    const BtnIcon = btn.icon
                    return (
                      <button
                        key={btn.label}
                        type="button"
                        onClick={
                          btn.label === 'Vaccination' ? () => router.push(`/dashboard/records/${mother.id}/vaccination`) :
                          btn.label === 'Health Tracking' ? () => router.push(`/dashboard/records/${mother.id}/health-tracking`) :
                          btn.label === 'Lab Reports' ? () => router.push(`/dashboard/records/${mother.id}/lab-reports`) :
                          undefined
                        }
                        className="flex items-center justify-center"
                        style={{
                          gap:           '4px',
                          background:    btn.isPrimary ? 'var(--color-risk-high-bg)' : 'var(--color-surface-secondary)',
                          color:         btn.isPrimary ? 'var(--color-brand-pink)' : 'var(--color-on-surface-secondary)',
                          border:        '1px solid var(--color-border)',
                          borderRadius:  'var(--radius-full)',
                          fontSize:      '12px',
                          fontWeight:    500,
                          paddingTop:    '7px',
                          paddingBottom: '7px',
                          paddingLeft:   'var(--spacing-sm)',
                          paddingRight:  'var(--spacing-md)',
                          cursor:        'pointer',
                          whiteSpace:    'nowrap',
                        }}
                      >
                        <BtnIcon size={13} />
                        {btn.label}
                      </button>
                    )
                  })}
                </div>
              </div>
            )
          })}
        </div>

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
        })}
      </div>

    </div>
  )
}
