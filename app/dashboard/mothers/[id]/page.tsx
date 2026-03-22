'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Search,
  Home,
  Users,
  Building2,
  FileText,
  UserCircle,
  User,
  ClipboardList,
  FolderOpen,
  Calendar,
  Activity,
  Droplets,
  AlertTriangle,
  FileWarning,
  StickyNote,
  ChevronRight,
} from 'lucide-react'
import { db } from '@/lib/mock/db'
import type { RiskLevel, Mother, Visit, WeightRecord } from '@/lib/types/entities'

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: Home,       label: 'HOME',    href: '/dashboard',         active: false },
  { icon: Users,      label: 'MOTHERS', href: '/dashboard/mothers', active: true  },
  { icon: Building2,  label: 'CLINICS', href: '/dashboard/clinics', active: false },
  { icon: FileText,   label: 'RECORDS', href: '/dashboard/records', active: false },
  { icon: UserCircle, label: 'PROFILE', href: '/dashboard/profile',                 active: false },
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

function getTrimesterLabel(t: 1 | 2 | 3): string {
  if (t === 1) return '1st Trimester'
  if (t === 2) return '2nd Trimester'
  return '3rd Trimester'
}

function getPregnancyNumber(index: number): string {
  if (index === 0) return 'First Pregnancy'
  if (index === 1) return 'Second Pregnancy'
  if (index === 2) return 'Third Pregnancy'
  return `Pregnancy #${index + 1}`
}

function getRiskBadgeStyles(risk: RiskLevel): { bg: string; color: string; label: string } {
  switch (risk) {
    case 'high':
      return { bg: 'var(--color-risk-high-bg)', color: 'var(--color-risk-high)', label: 'High Risk' }
    case 'medium':
      return { bg: 'var(--color-risk-medium-bg)', color: 'var(--color-risk-medium)', label: 'Medium Risk' }
    case 'low':
      return { bg: 'var(--color-risk-low-bg)', color: 'var(--color-risk-low)', label: 'Low Risk' }
  }
}

function getAssignedMidwifeName(staffId: string): string {
  const staff = db.staff.find((s) => s.id === staffId)
  if (!staff) return 'Unknown'
  return staff.name.split(' ')[0]
}

function formatDate(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function formatDateShort(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { day: 'numeric', month: 'short', year: 'numeric' })
}

function getBPColor(systolic: number, diastolic: number): string {
  if (systolic >= 140 || diastolic >= 90) return 'var(--color-risk-high)'
  if (systolic >= 130 || diastolic >= 85) return 'var(--color-risk-medium)'
  return 'var(--color-on-surface)'
}

function getLatestWeightRecord(motherId: string): WeightRecord | null {
  const records = db.weightRecords
    .filter((w) => w.motherId === motherId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return records[0] ?? null
}

function getLatestVisitWithVitals(motherId: string): Visit | null {
  const visits = db.visits
    .filter((v) => v.motherId === motherId && v.bloodPressureSystolic !== null)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
  return visits[0] ?? null
}

function getMotherVisits(motherId: string): Visit[] {
  return db.visits
    .filter((v) => v.motherId === motherId)
    .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
}

// ─── Section header style ─────────────────────────────────────────────────────

const sectionHeaderStyle: React.CSSProperties = {
  fontSize:      '11px',
  fontWeight:    700,
  textTransform: 'uppercase',
  letterSpacing: '0.1em',
  color:         'var(--color-brand-pink)',
  marginBottom:  'var(--spacing-sm)',
}

const cardStyle: React.CSSProperties = {
  background:    'var(--color-surface)',
  borderRadius:  'var(--radius-xl)',
  padding:       'var(--spacing-md)',
  marginBottom:  'var(--spacing-sm)',
  border:        '1px solid var(--color-border)',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MotherProfilePage() {
  const params = useParams()
  const router = useRouter()
  const motherId = params.id as string

  const mother = useMemo(() => db.mothers.find((m) => m.id === motherId), [motherId])

  const latestWeight = useMemo(
    () => mother ? getLatestWeightRecord(mother.id) : null,
    [mother]
  )

  const latestVitals = useMemo(
    () => mother ? getLatestVisitWithVitals(mother.id) : null,
    [mother]
  )

  const recentVisits = useMemo(
    () => mother ? getMotherVisits(mother.id).slice(0, 3) : [],
    [mother]
  )

  if (!mother) {
    return (
      <div className="flex flex-col h-dvh items-center justify-center" style={{ padding: 'var(--spacing-xl)' }}>
        <p style={{ color: 'var(--color-on-surface-secondary)', fontSize: '14px' }}>Mother not found.</p>
        <button
          type="button"
          onClick={() => router.push('/dashboard/mothers')}
          style={{
            marginTop:    'var(--spacing-md)',
            padding:      'var(--spacing-sm) var(--spacing-md)',
            background:   'var(--color-primary)',
            color:        'white',
            border:       'none',
            borderRadius: 'var(--radius-full)',
            fontSize:     '14px',
            cursor:       'pointer',
          }}
        >
          Back to Mothers
        </button>
      </div>
    )
  }

  const badge = getRiskBadgeStyles(mother.riskLevel)
  const initials = getInitials(mother.name)
  const { weeks, days } = getGestationalAge(mother.lmpDate)
  const trimester = getTrimester(mother.lmpDate)
  const midwifeName = getAssignedMidwifeName(mother.assignedStaffId)

  // Derive pregnancy number from mother index (deterministic mock)
  const motherIndex = db.mothers.indexOf(mother)
  const pregnancyNumber = getPregnancyNumber(motherIndex % 4)

  // Get hemoglobin from latest weight record (simulated from gestational data)
  const hemoglobin = latestWeight
    ? (10.5 + (latestWeight.gestationalAgeWeeks % 5) * 0.3).toFixed(1)
    : '12.0'

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
            color:      'var(--color-on-surface)',
            padding:    0,
          }}
        >
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>

        <span
          style={{
            fontSize:   '18px',
            fontWeight: 700,
            color:      'var(--color-on-surface)',
          }}
        >
          Mother Profile
        </span>

        <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
          <Search size={20} style={{ color: 'var(--color-on-surface-secondary)', cursor: 'pointer' }} />
          <span
            style={{
              fontSize:      '12px',
              fontWeight:    500,
              color:         'var(--color-on-surface-secondary)',
              background:    'var(--color-primary-light)',
              paddingLeft:   'var(--spacing-sm)',
              paddingRight:  'var(--spacing-sm)',
              paddingTop:    '2px',
              paddingBottom: '2px',
              borderRadius:  'var(--radius-full)',
            }}
          >
            EN
          </span>
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
        <div style={{ padding: 'var(--spacing-md)', paddingBottom: 'var(--spacing-xl)' }}>

          {/* ── Mother Info Card ──────────────────────────────────────────────── */}
          <div style={cardStyle}>
            <div className="flex items-start" style={{ gap: 'var(--spacing-sm)' }}>
              {/* Avatar */}
              <div
                className="flex items-center justify-center rounded-full flex-shrink-0"
                style={{
                  width:      '48px',
                  height:     '48px',
                  background: 'var(--color-brand-pink)',
                  opacity:    0.3,
                  fontSize:   '16px',
                  fontWeight: 600,
                  color:      'white',
                }}
              >
                {initials}
              </div>

              {/* Name + NIC + Details */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center flex-wrap" style={{ gap: 'var(--spacing-sm)' }}>
                  <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                    {mother.name}
                  </span>
                  <span
                    style={{
                      paddingLeft:   'var(--spacing-sm)',
                      paddingRight:  'var(--spacing-sm)',
                      paddingTop:    '2px',
                      paddingBottom: '2px',
                      borderRadius:  'var(--radius-full)',
                      fontSize:      '11px',
                      fontWeight:    600,
                      background:    badge.bg,
                      color:         badge.color,
                    }}
                  >
                    {badge.label}
                  </span>
                </div>
                <div style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)', marginTop: '2px' }}>
                  NIC: {mother.nationalId}
                </div>
                <div
                  style={{
                    fontSize:  '12px',
                    color:     'var(--color-on-surface-secondary)',
                    marginTop: '2px',
                    display:   'flex',
                    gap:       'var(--spacing-xs)',
                  }}
                >
                  <span>{getTrimesterLabel(trimester)}</span>
                  <span>·</span>
                  <span>Midwife: {midwifeName}</span>
                </div>
              </div>
            </div>

            {/* Action buttons */}
            <div
              className="flex"
              style={{
                marginTop: 'var(--spacing-md)',
                gap:       'var(--spacing-sm)',
              }}
            >
              {/* View Profile — outlined (current page) */}
              <button
                type="button"
                className="flex items-center justify-center"
                style={{
                  flex:          1,
                  gap:           '4px',
                  background:    'transparent',
                  color:         'var(--color-on-surface-secondary)',
                  border:        '1px solid var(--color-border)',
                  borderRadius:  'var(--radius-full)',
                  fontSize:      '12px',
                  fontWeight:    500,
                  paddingTop:    '8px',
                  paddingBottom: '8px',
                  cursor:        'default',
                }}
              >
                <User size={13} />
                View Profile
              </button>

              {/* Record Visit — filled pink */}
              <button
                type="button"
                className="flex items-center justify-center"
                style={{
                  flex:          1,
                  gap:           '4px',
                  background:    'var(--color-brand-pink)',
                  color:         'white',
                  border:        'none',
                  borderRadius:  'var(--radius-full)',
                  fontSize:      '12px',
                  fontWeight:    500,
                  paddingTop:    '8px',
                  paddingBottom: '8px',
                  cursor:        'pointer',
                }}
              >
                <ClipboardList size={13} />
                Record Visit
              </button>

              {/* Records — outlined */}
              <button
                type="button"
                className="flex items-center justify-center"
                style={{
                  flex:          1,
                  gap:           '4px',
                  background:    'transparent',
                  color:         'var(--color-on-surface-secondary)',
                  border:        '1px solid var(--color-border)',
                  borderRadius:  'var(--radius-full)',
                  fontSize:      '12px',
                  fontWeight:    500,
                  paddingTop:    '8px',
                  paddingBottom: '8px',
                  cursor:        'pointer',
                }}
              >
                <FolderOpen size={13} />
                Records
              </button>
            </div>
          </div>

          {/* ── Pregnancy Overview ───────────────────────────────────────────── */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>Pregnancy Overview</div>

            {/* EDD */}
            <div className="flex items-center" style={{ gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
              <Calendar size={16} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)', width: '80px' }}>EDD</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-on-surface)' }}>
                {formatDate(mother.edd)}
              </span>
            </div>

            {/* Registered */}
            <div className="flex items-center" style={{ gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
              <Calendar size={16} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)', width: '80px' }}>Registered</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-on-surface)' }}>
                {formatDateShort(mother.createdAt)}
                <span style={{ color: 'var(--color-on-surface-secondary)', marginLeft: '4px' }}>
                  · {weeks}+{days} wks
                </span>
              </span>
            </div>

            {/* Type */}
            <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
              <Calendar size={16} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
              <span style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)', width: '80px' }}>Type</span>
              <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-on-surface)' }}>
                {pregnancyNumber}
                <span style={{ color: 'var(--color-on-surface-secondary)', marginLeft: '4px' }}>
                  · {getTrimesterLabel(trimester)}
                </span>
              </span>
            </div>
          </div>

          {/* ── Health Tracking ───────────────────────────────────────────────── */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>Health Tracking</div>

            {/* Current Weight */}
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
              <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                <Activity size={16} style={{ color: 'var(--color-on-surface-secondary)' }} />
                <span style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)' }}>Current Weight</span>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
                {latestWeight ? `${latestWeight.weight} kg` : '-- kg'}
              </span>
            </div>

            {/* Blood Pressure */}
            <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-sm)' }}>
              <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                <Droplets size={16} style={{ color: 'var(--color-on-surface-secondary)' }} />
                <span style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)' }}>Blood Pressure</span>
              </div>
              <span
                style={{
                  fontSize:   '13px',
                  fontWeight: 600,
                  color:      latestVitals?.bloodPressureSystolic && latestVitals?.bloodPressureDiastolic
                    ? getBPColor(latestVitals.bloodPressureSystolic, latestVitals.bloodPressureDiastolic)
                    : 'var(--color-on-surface)',
                }}
              >
                {latestVitals?.bloodPressureSystolic && latestVitals?.bloodPressureDiastolic
                  ? `${latestVitals.bloodPressureSystolic}/${latestVitals.bloodPressureDiastolic} mmHg`
                  : '-- mmHg'}
              </span>
            </div>

            {/* Hemoglobin */}
            <div className="flex items-center justify-between">
              <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                <Droplets size={16} style={{ color: 'var(--color-on-surface-secondary)' }} />
                <span style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)' }}>Hemoglobin</span>
              </div>
              <span style={{ fontSize: '13px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
                {hemoglobin} g/dL
              </span>
            </div>
          </div>

          {/* ── Medical History ───────────────────────────────────────────────── */}
          <div
            style={cardStyle}
            onClick={() => router.push(`/dashboard/mothers/${motherId}/medical-history`)}
            role="button"
            tabIndex={0}
            onKeyDown={(e) => { if (e.key === 'Enter') router.push(`/dashboard/mothers/${motherId}/medical-history`) }}
          >
            <div style={sectionHeaderStyle}>Medical History</div>

            {/* Previous Pregnancies */}
            <div
              className="flex items-center justify-between w-full"
              style={{
                padding:       'var(--spacing-sm) 0',
                cursor:        'pointer',
                borderBottom:  '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                <Calendar size={16} style={{ color: 'var(--color-on-surface-secondary)' }} />
                <span style={{ fontSize: '13px', color: 'var(--color-on-surface)' }}>Previous Pregnancies</span>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--color-on-surface-secondary)' }} />
            </div>

            {/* Known Complications */}
            <div
              className="flex items-center justify-between w-full"
              style={{
                padding:       'var(--spacing-sm) 0',
                cursor:        'pointer',
                borderBottom:  '1px solid var(--color-border)',
              }}
            >
              <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                <AlertTriangle size={16} style={{ color: 'var(--color-on-surface-secondary)' }} />
                <span style={{ fontSize: '13px', color: 'var(--color-on-surface)' }}>Known Complications</span>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--color-on-surface-secondary)' }} />
            </div>

            {/* Risk Notes */}
            <div
              className="flex items-center justify-between w-full"
              style={{
                padding:    'var(--spacing-sm) 0',
                cursor:     'pointer',
              }}
            >
              <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                <StickyNote size={16} style={{ color: 'var(--color-on-surface-secondary)' }} />
                <span style={{ fontSize: '13px', color: 'var(--color-on-surface)' }}>Risk Notes</span>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--color-on-surface-secondary)' }} />
            </div>
          </div>

          {/* ── Clinic Visit History ──────────────────────────────────────────── */}
          <div style={cardStyle}>
            <div style={sectionHeaderStyle}>Clinic Visit History</div>

            {recentVisits.length === 0 ? (
              <div style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)', padding: 'var(--spacing-sm) 0' }}>
                No visits recorded yet.
              </div>
            ) : (
              recentVisits.map((visit, i) => {
                const isLast = i === recentVisits.length - 1
                const clinicName = `Clinic ${String.fromCharCode(65 + (i % 3))}`
                const hasElevatedBP = visit.bloodPressureSystolic !== null && visit.bloodPressureSystolic >= 140

                return (
                  <button
                    key={visit.id}
                    type="button"
                    className="flex items-center justify-between w-full"
                    style={{
                      padding:      'var(--spacing-sm) 0',
                      background:   'none',
                      border:       'none',
                      cursor:       'pointer',
                      borderBottom: isLast ? 'none' : '1px solid var(--color-border)',
                      textAlign:    'left',
                    }}
                  >
                    <div className="flex-1 min-w-0">
                      <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                        <span style={{ fontSize: '13px', fontWeight: 500, color: 'var(--color-on-surface)' }}>
                          {formatDateShort(visit.date)}
                        </span>
                        {i === 0 && (
                          <span
                            style={{
                              fontSize:      '10px',
                              fontWeight:    500,
                              color:         'var(--color-primary)',
                              background:    'var(--color-primary-light)',
                              paddingLeft:   '6px',
                              paddingRight:  '6px',
                              paddingTop:    '1px',
                              paddingBottom: '1px',
                              borderRadius:  'var(--radius-full)',
                            }}
                          >
                            {clinicName}
                          </span>
                        )}
                      </div>
                      {i > 0 && (
                        <div
                          style={{
                            fontSize:  '12px',
                            color:     hasElevatedBP ? 'var(--color-risk-high)' : 'var(--color-on-surface-secondary)',
                            marginTop: '2px',
                          }}
                        >
                          {hasElevatedBP
                            ? 'BP elevated, rest & follow-up.'
                            : visit.outcome || 'Routine check-up. All normal.'}
                        </div>
                      )}
                    </div>
                    <ChevronRight size={18} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
                  </button>
                )
              })
            )}
          </div>

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
              <Icon size={22} fill={item.active ? 'currentColor' : 'none'} />
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
