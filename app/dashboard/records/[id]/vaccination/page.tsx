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
  Syringe,
  Calendar,
  Clock,
  User,
  Plus,
} from 'lucide-react'
import { db } from '@/lib/mock/db'
import type { RiskLevel, VaccinationStatus } from '@/lib/types/entities'

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

function getRiskLabel(risk: RiskLevel): string {
  return risk === 'high' ? 'High Risk' : 'Normal'
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

function getStatusConfig(status: VaccinationStatus): { label: string; color: string; bg: string } {
  switch (status) {
    case 'given':
      return { label: 'Completed', color: 'var(--color-success)', bg: 'var(--color-risk-low-bg)' }
    case 'due':
      return { label: 'Due', color: 'var(--color-warning)', bg: 'var(--color-risk-medium-bg)' }
    case 'overdue':
      return { label: 'Overdue', color: 'var(--color-error)', bg: 'var(--color-risk-high-bg)' }
    case 'not-applicable':
      return { label: 'N/A', color: 'var(--color-on-surface-secondary)', bg: 'var(--color-surface-secondary)' }
  }
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function VaccinationRecordsPage() {
  const params = useParams()
  const motherId = params.id as string

  const mother = useMemo(() => db.mothers.find((m) => m.id === motherId), [motherId])

  const vaccinations = useMemo(() => {
    return db.vaccinations
      .filter((v) => v.motherId === motherId)
      .sort((a, b) => a.doseNumber - b.doseNumber)
  }, [motherId])

  const historyVaccinations = useMemo(
    () => vaccinations.filter((v) => v.status === 'given' || v.status === 'due' || v.status === 'overdue'),
    [vaccinations]
  )

  const upcomingVaccinations = useMemo(
    () => vaccinations.filter((v) => v.status === 'due' || v.status === 'overdue'),
    [vaccinations]
  )

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
              color:          'var(--color-primary)',
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
            Vaccination Records
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

        {/* Mother Info Card */}
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
          {/* Row 1: Avatar + Name + Risk badge */}
          <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
            <div
              className="flex items-center justify-center rounded-full flex-shrink-0"
              style={{
                width:      '44px',
                height:     '44px',
                background: '#1B6B4A',
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
                  fontSize:   '16px',
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
                background:    mother.riskLevel === 'high' ? 'var(--color-risk-high-bg)' : 'var(--color-risk-low-bg)',
                color:         mother.riskLevel === 'high' ? 'var(--color-risk-high)' : 'var(--color-risk-low)',
                flexShrink:    0,
                whiteSpace:    'nowrap',
              }}
            >
              {mother.riskLevel === 'high' ? <AlertTriangle size={12} /> : <CheckCircle size={12} />}
              {getRiskLabel(mother.riskLevel)}
            </span>
          </div>

          {/* Info rows */}
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
              <span>Risk: {getRiskLabel(mother.riskLevel)}</span>
            </div>
            <div className="flex items-center" style={{ gap: '6px' }}>
              <User size={13} style={{ flexShrink: 0 }} />
              <span>Midwife: {getAssignedMidwifeName(mother.assignedStaffId)}</span>
            </div>
          </div>
        </div>

        {/* ── Vaccination History Section ────────────────────────────────────── */}
        <div
          style={{
            fontSize:      '14px',
            fontWeight:    600,
            color:         'var(--color-brand-pink)',
            marginTop:     'var(--spacing-lg)',
            paddingLeft:   'var(--spacing-md)',
            paddingRight:  'var(--spacing-md)',
            marginBottom:  'var(--spacing-sm)',
          }}
        >
          Vaccination History
        </div>

        {historyVaccinations.length === 0 ? (
          <div
            style={{
              textAlign:    'center',
              padding:      'var(--spacing-lg)',
              color:        'var(--color-on-surface-secondary)',
              fontSize:     '13px',
            }}
          >
            No vaccination history available.
          </div>
        ) : (
          historyVaccinations.map((vax) => {
            const statusCfg = getStatusConfig(vax.status)
            return (
              <div
                key={vax.id}
                style={{
                  marginLeft:   'var(--spacing-md)',
                  marginRight:  'var(--spacing-md)',
                  marginBottom: 'var(--spacing-sm)',
                  padding:      'var(--spacing-md)',
                  background:   'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border:       '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontSize:   '14px',
                      fontWeight: 600,
                      color:      'var(--color-on-surface)',
                    }}
                  >
                    {vax.vaccineName}
                  </span>
                  <span
                    style={{
                      fontSize:      '12px',
                      fontWeight:    500,
                      color:         statusCfg.color,
                      paddingLeft:   'var(--spacing-sm)',
                      paddingRight:  'var(--spacing-sm)',
                      paddingTop:    '2px',
                      paddingBottom: '2px',
                      borderRadius:  'var(--radius-full)',
                      border:        `1px solid ${statusCfg.color}`,
                      background:    statusCfg.bg,
                    }}
                  >
                    {statusCfg.label}
                  </span>
                </div>

                <div
                  style={{
                    marginTop:     'var(--spacing-xs)',
                    fontSize:      '13px',
                    color:         'var(--color-on-surface-secondary)',
                    display:       'flex',
                    flexDirection: 'column',
                    gap:           '2px',
                  }}
                >
                  <div className="flex items-center" style={{ gap: '6px' }}>
                    <Syringe size={12} style={{ flexShrink: 0 }} />
                    <span>Dose: {vax.doseNumber}</span>
                  </div>
                  {vax.status === 'given' && vax.dateGiven ? (
                    <div className="flex items-center" style={{ gap: '6px' }}>
                      <Calendar size={12} style={{ flexShrink: 0 }} />
                      <span>Date: {formatDate(vax.dateGiven)}</span>
                    </div>
                  ) : (
                    <div className="flex items-center" style={{ gap: '6px' }}>
                      <Clock size={12} style={{ flexShrink: 0 }} />
                      <span>Status: Pending</span>
                    </div>
                  )}
                </div>
              </div>
            )
          })
        )}

        {/* ── Upcoming Vaccinations Section ──────────────────────────────────── */}
        <div
          style={{
            fontSize:      '14px',
            fontWeight:    600,
            color:         'var(--color-brand-pink)',
            marginTop:     'var(--spacing-lg)',
            paddingLeft:   'var(--spacing-md)',
            paddingRight:  'var(--spacing-md)',
            marginBottom:  'var(--spacing-sm)',
          }}
        >
          Upcoming Vaccinations
        </div>

        {upcomingVaccinations.length === 0 ? (
          <div
            style={{
              textAlign:    'center',
              padding:      'var(--spacing-lg)',
              color:        'var(--color-on-surface-secondary)',
              fontSize:     '13px',
            }}
          >
            No upcoming vaccinations.
          </div>
        ) : (
          upcomingVaccinations.map((vax) => {
            const statusCfg = getStatusConfig(vax.status)
            return (
              <div
                key={`upcoming-${vax.id}`}
                style={{
                  marginLeft:   'var(--spacing-md)',
                  marginRight:  'var(--spacing-md)',
                  marginBottom: 'var(--spacing-sm)',
                  padding:      'var(--spacing-md)',
                  background:   'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border:       '1px solid var(--color-border)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span
                    style={{
                      fontSize:   '14px',
                      fontWeight: 600,
                      color:      'var(--color-on-surface)',
                    }}
                  >
                    {vax.vaccineName}
                  </span>
                  <span
                    style={{
                      fontSize:      '12px',
                      fontWeight:    500,
                      color:         statusCfg.color,
                      paddingLeft:   'var(--spacing-sm)',
                      paddingRight:  'var(--spacing-sm)',
                      paddingTop:    '2px',
                      paddingBottom: '2px',
                      borderRadius:  'var(--radius-full)',
                      border:        `1px solid ${statusCfg.color}`,
                      background:    statusCfg.bg,
                    }}
                  >
                    Upcoming
                  </span>
                </div>

                <div
                  className="flex items-center"
                  style={{
                    marginTop: 'var(--spacing-xs)',
                    fontSize:  '13px',
                    color:     'var(--color-on-surface-secondary)',
                    gap:       '6px',
                  }}
                >
                  <Calendar size={12} style={{ flexShrink: 0 }} />
                  <span>Scheduled Date: {formatDate(vax.scheduledDate)}</span>
                </div>
              </div>
            )
          })
        )}

        {/* ── Add Vaccination Record Button ──────────────────────────────────── */}
        <div
          style={{
            marginLeft:   'var(--spacing-md)',
            marginRight:  'var(--spacing-md)',
            marginTop:    'var(--spacing-sm)',
            marginBottom: 'var(--spacing-lg)',
          }}
        >
          <button
            type="button"
            className="flex items-center justify-center"
            style={{
              width:        '100%',
              gap:          '6px',
              background:   'transparent',
              color:         'var(--color-brand-pink)',
              border:       '1.5px dashed var(--color-brand-pink)',
              borderRadius: 'var(--radius-xl)',
              fontSize:     '14px',
              fontWeight:   500,
              paddingTop:    'var(--spacing-sm)',
              paddingBottom: 'var(--spacing-sm)',
              cursor:       'pointer',
            }}
          >
            <Plus size={16} />
            Add Vaccination Record
          </button>
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
