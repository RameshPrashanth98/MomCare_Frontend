'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'
import {
  ArrowLeft,
  Home,
  Users,
  Building2,
  FileText,
  UserCircle,
  Globe,
  Bell,
  AlertTriangle,
  CheckCircle,
  Calendar,
  Clock,
  User,
  Syringe,
  Stethoscope,
} from 'lucide-react'
import { db } from '@/lib/mock/db'
import type { RiskLevel, TimelineEventType } from '@/lib/types/entities'

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: Home,       label: 'HOME',    href: '/dashboard',         active: false },
  { icon: Users,      label: 'MOTHERS', href: '/dashboard/mothers', active: false },
  { icon: Building2,  label: 'CLINICS', href: '/dashboard/clinics', active: false },
  { icon: FileText,   label: 'RECORDS', href: '/dashboard/records', active: true  },
  { icon: UserCircle, label: 'PROFILE', href: '/dashboard/profile', active: false },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getInitials(name: string): string {
  const parts = name.split(' ')
  if (parts.length >= 2) return (parts[0][0] + parts[parts.length - 1][0]).toUpperCase()
  return name.slice(0, 2).toUpperCase()
}

function getTrimester(lmpDate: string): 1 | 2 | 3 {
  const diffMs = Date.now() - new Date(lmpDate).getTime()
  const weeks = Math.floor(diffMs / 86400000 / 7)
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

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: '2-digit', month: 'short', year: 'numeric' })
}

function formatEDD(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getMilestoneIcon(type: TimelineEventType) {
  switch (type) {
    case 'clinic-visit':
      return Calendar
    case 'vaccination':
      return Syringe
    case 'ultrasound':
      return Stethoscope
    case 'lab-report':
      return FileText
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function PregnancyTimelinePage() {
  const params = useParams()
  const motherId = params.id as string

  const mother = useMemo(() => db.mothers.find((m) => m.id === motherId), [motherId])

  const pastEvents = useMemo(() => {
    return db.timelineEvents
      .filter((e) => e.motherId === motherId && !e.isUpcoming)
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [motherId])

  const upcomingMilestones = useMemo(() => {
    return db.timelineEvents
      .filter((e) => e.motherId === motherId && e.isUpcoming)
      .sort((a, b) => a.date.localeCompare(b.date))
  }, [motherId])

  if (!mother) {
    return (
      <div className="flex flex-col h-dvh items-center justify-center" style={{ color: 'var(--color-on-surface-secondary)' }}>
        <p>Mother not found.</p>
        <Link href="/dashboard/records" style={{ color: 'var(--color-primary)', marginTop: 'var(--spacing-md)' }}>
          Back to Records
        </Link>
      </div>
    )
  }

  const initials = getInitials(mother.name)
  const trimester = getTrimester(mother.lmpDate)
  const badge = getRiskBadgeStyles(mother.riskLevel)
  const BadgeIcon = badge.icon
  const midwifeName = getAssignedMidwifeName(mother.assignedStaffId)

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
            href="/dashboard/records"
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
            Pregnancy Timeline
          </span>
        </div>

        <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
          <span
            style={{
              fontSize:      '12px',
              fontWeight:    600,
              color:         'var(--color-on-surface-secondary)',
            }}
          >
            EN
          </span>
          <span style={{ color: 'var(--color-on-surface-secondary)', fontSize: '12px' }}>|</span>
          <Globe size={18} style={{ color: 'var(--color-on-surface-secondary)' }} />
          <Bell size={18} style={{ color: 'var(--color-on-surface-secondary)' }} />
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

        {/* ── Mother Info Card ──────────────────────────────────────────────── */}
        <div
          style={{
            marginLeft:   'var(--spacing-md)',
            marginRight:  'var(--spacing-md)',
            marginTop:    'var(--spacing-md)',
            padding:      'var(--spacing-md)',
            background:   'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border:       '1px solid var(--color-border)',
            boxShadow:    'var(--shadow-sm)',
          }}
        >
          {/* Avatar + Name + Risk badge */}
          <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width:      '44px',
                height:     '44px',
                background: 'var(--color-brand-pink)',
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

          {/* Detail rows with icons */}
          <div
            style={{
              marginTop:     'var(--spacing-sm)',
              fontSize:      '13px',
              color:         'var(--color-on-surface-secondary)',
              display:       'flex',
              flexDirection: 'column',
              gap:           '4px',
              paddingLeft:   '4px',
            }}
          >
            <div className="flex items-center" style={{ gap: '6px' }}>
              <FileText size={13} style={{ flexShrink: 0 }} />
              <span>NIC: {mother.nationalId}</span>
            </div>
            <div className="flex items-center" style={{ gap: '6px' }}>
              <Calendar size={13} style={{ flexShrink: 0 }} />
              <span>Trimester: {getTrimesterOrdinal(trimester)}</span>
            </div>
            <div className="flex items-center" style={{ gap: '6px' }}>
              <Clock size={13} style={{ flexShrink: 0 }} />
              <span>EDD: {formatEDD(mother.edd)}</span>
            </div>
            <div className="flex items-center" style={{ gap: '6px' }}>
              <User size={13} style={{ flexShrink: 0 }} />
              <span>Midwife: {midwifeName}</span>
            </div>
          </div>
        </div>

        {/* ── Pregnancy Timeline Section ────────────────────────────────────── */}
        <div
          style={{
            fontSize:      '15px',
            fontWeight:    600,
            color:         'var(--color-brand-pink)',
            marginTop:     'var(--spacing-lg)',
            paddingLeft:   'var(--spacing-md)',
            paddingRight:  'var(--spacing-md)',
            marginBottom:  'var(--spacing-sm)',
          }}
        >
          Pregnancy Timeline
        </div>

        {pastEvents.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding:   'var(--spacing-lg)',
              color:     'var(--color-on-surface-secondary)',
              fontSize:  '13px',
            }}
          >
            No timeline events recorded yet.
          </div>
        ) : (
          <div
            style={{
              position:    'relative',
              marginLeft:  'var(--spacing-md)',
              marginRight: 'var(--spacing-md)',
              paddingLeft: '32px',
            }}
          >
            {/* Vertical connecting line */}
            <div
              style={{
                position:    'absolute',
                left:        'calc(var(--spacing-md) + 10px)',
                top:         '7px',
                bottom:      '7px',
                width:       '2px',
                background:  'var(--color-brand-pink)',
                opacity:     0.3,
                borderRadius: '1px',
              }}
            />

            {pastEvents.map((event) => (
              <div
                key={event.id}
                style={{
                  position:     'relative',
                  marginBottom: 'var(--spacing-md)',
                }}
              >
                {/* Timeline dot */}
                <div
                  style={{
                    position:     'absolute',
                    left:         '-28px',
                    top:          '2px',
                    width:        '14px',
                    height:       '14px',
                    borderRadius: '50%',
                    background:   'var(--color-brand-pink)',
                    border:       '2px solid white',
                    boxShadow:    '0 0 0 1px var(--color-brand-pink)',
                    flexShrink:   0,
                  }}
                />

                {/* Event content */}
                <div>
                  <div
                    style={{
                      fontSize:   '13px',
                      fontWeight: 600,
                      color:      'var(--color-on-surface)',
                    }}
                  >
                    {formatDate(event.date)}
                  </div>
                  <div
                    style={{
                      fontSize:   '14px',
                      fontWeight: 600,
                      color:      'var(--color-on-surface)',
                      marginTop:  '2px',
                    }}
                  >
                    {event.title}
                  </div>
                  <div
                    style={{
                      fontSize:  '13px',
                      color:     'var(--color-on-surface-secondary)',
                      marginTop: '1px',
                    }}
                  >
                    {event.detail}
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* ── Upcoming Milestones Section ──────────────────────────────────── */}
        <div
          style={{
            fontSize:      '15px',
            fontWeight:    600,
            color:         'var(--color-brand-pink)',
            marginTop:     'var(--spacing-lg)',
            paddingLeft:   'var(--spacing-md)',
            paddingRight:  'var(--spacing-md)',
            marginBottom:  'var(--spacing-sm)',
          }}
        >
          Upcoming Milestones
        </div>

        {upcomingMilestones.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding:   'var(--spacing-lg)',
              color:     'var(--color-on-surface-secondary)',
              fontSize:  '13px',
            }}
          >
            No upcoming milestones.
          </div>
        ) : (
          upcomingMilestones.map((milestone) => {
            const MilestoneIcon = getMilestoneIcon(milestone.type)
            return (
              <div
                key={milestone.id}
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
                <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width:        '36px',
                      height:       '36px',
                      borderRadius: 'var(--radius-lg)',
                      background:   'var(--color-risk-high-bg)',
                      color:        'var(--color-brand-pink)',
                    }}
                  >
                    <MilestoneIcon size={18} />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div
                      style={{
                        fontSize:   '14px',
                        fontWeight: 600,
                        color:      'var(--color-on-surface)',
                      }}
                    >
                      {milestone.title}
                    </div>
                    <div
                      style={{
                        fontSize:  '13px',
                        color:     'var(--color-on-surface-secondary)',
                        marginTop: '1px',
                      }}
                    >
                      {milestone.detail}
                    </div>
                  </div>
                </div>
              </div>
            )
          })
        )}

        {/* Bottom spacer */}
        <div style={{ height: 'var(--spacing-lg)' }} />

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
