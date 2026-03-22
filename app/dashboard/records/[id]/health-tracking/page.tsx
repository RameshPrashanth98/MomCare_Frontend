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
  Plus,
  Maximize2,
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

function formatMonthYear(dateStr: string): string {
  const d = new Date(dateStr)
  return d.toLocaleDateString('en-GB', { month: 'short', year: '2-digit' })
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function HealthTrackingPage() {
  const params = useParams()
  const motherId = params.id as string

  const mother = useMemo(() => db.mothers.find((m) => m.id === motherId), [motherId])

  const weightRecords = useMemo(() => {
    return db.weightRecords
      .filter((w) => w.motherId === motherId)
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
  }, [motherId])

  const weightRecordsDesc = useMemo(() => [...weightRecords].reverse(), [weightRecords])

  const latestWeight = weightRecords.length > 0 ? weightRecords[weightRecords.length - 1] : null

  // SVG chart dimensions
  const svgWidth = 320
  const svgHeight = 180
  const padLeft = 40
  const padRight = 16
  const padTop = 16
  const padBottom = 32
  const chartW = svgWidth - padLeft - padRight
  const chartH = svgHeight - padTop - padBottom

  const chartData = useMemo(() => {
    if (weightRecords.length === 0) return { points: '', circles: [] as { cx: number; cy: number; w: number }[], xLabels: [] as { x: number; label: string }[], yLabels: [] as { y: number; label: string }[], gridLines: [] as number[] }

    const weights = weightRecords.map((r) => r.weight)
    const minW = Math.floor(Math.min(...weights) - 1)
    const maxW = Math.ceil(Math.max(...weights) + 1)
    const rangeW = maxW - minW || 1

    const circles: { cx: number; cy: number; w: number }[] = []
    const xLabels: { x: number; label: string }[] = []

    weightRecords.forEach((r, i) => {
      const cx = padLeft + (weightRecords.length === 1 ? chartW / 2 : (i / (weightRecords.length - 1)) * chartW)
      const cy = padTop + chartH - ((r.weight - minW) / rangeW) * chartH
      circles.push({ cx, cy, w: r.weight })
      xLabels.push({ x: cx, label: formatMonthYear(r.date) })
    })

    const points = circles.map((c) => `${c.cx},${c.cy}`).join(' ')

    // Y-axis labels (5 steps)
    const ySteps = 4
    const yLabels: { y: number; label: string }[] = []
    for (let i = 0; i <= ySteps; i++) {
      const val = minW + (rangeW * i) / ySteps
      const y = padTop + chartH - (i / ySteps) * chartH
      yLabels.push({ y, label: val.toFixed(1) })
    }

    // Grid lines
    const gridLines = yLabels.map((yl) => yl.y)

    return { points, circles, xLabels, yLabels, gridLines }
  }, [weightRecords, chartW, chartH])

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
            Weight &amp; Health Tracking
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

        {/* ── Weight Tracking Section ──────────────────────────────────────── */}
        <div
          className="flex items-center justify-between"
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
          <span>Weight Tracking</span>
          <Maximize2 size={16} />
        </div>

        <div
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
          {weightRecords.length === 0 ? (
            <div
              style={{
                textAlign: 'center',
                padding:   'var(--spacing-lg)',
                color:     'var(--color-on-surface-secondary)',
                fontSize:  '13px',
              }}
            >
              No weight records available.
            </div>
          ) : (
            <>
              <svg
                viewBox={`0 0 ${svgWidth} ${svgHeight}`}
                style={{ width: '100%', height: 'auto' }}
              >
                {/* Grid lines */}
                {chartData.gridLines.map((y, i) => (
                  <line
                    key={`grid-${i}`}
                    x1={padLeft}
                    y1={y}
                    x2={svgWidth - padRight}
                    y2={y}
                    stroke="var(--color-border)"
                    strokeWidth={0.5}
                    strokeDasharray="3,3"
                  />
                ))}

                {/* Y-axis labels */}
                {chartData.yLabels.map((yl, i) => (
                  <text
                    key={`ylabel-${i}`}
                    x={padLeft - 6}
                    y={yl.y + 4}
                    textAnchor="end"
                    fontSize="10"
                    fill="var(--color-on-surface-secondary)"
                  >
                    {yl.label}
                  </text>
                ))}

                {/* X-axis labels */}
                {chartData.xLabels.map((xl, i) => (
                  <text
                    key={`xlabel-${i}`}
                    x={xl.x}
                    y={svgHeight - 6}
                    textAnchor="middle"
                    fontSize="9"
                    fill="var(--color-on-surface-secondary)"
                  >
                    {xl.label}
                  </text>
                ))}

                {/* Polyline connecting data points */}
                <polyline
                  points={chartData.points}
                  fill="none"
                  stroke="var(--color-brand-pink)"
                  strokeWidth={2}
                />

                {/* Data point circles */}
                {chartData.circles.map((c, i) => (
                  <circle
                    key={`dot-${i}`}
                    cx={c.cx}
                    cy={c.cy}
                    r={4}
                    fill="var(--color-brand-pink)"
                  />
                ))}
              </svg>

              {/* Latest weight info */}
              {latestWeight && (
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
                  <span style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>
                    Latest Weight: {latestWeight.weight} kg
                  </span>
                  <span>Last Recorded: {formatDate(latestWeight.date)}</span>
                </div>
              )}
            </>
          )}
        </div>

        {/* ── Blood Pressure Tracking Section ──────────────────────────────── */}
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
          Blood Pressure Tracking
        </div>

        {weightRecordsDesc.length === 0 ? (
          <div
            style={{
              textAlign: 'center',
              padding:   'var(--spacing-lg)',
              color:     'var(--color-on-surface-secondary)',
              fontSize:  '13px',
            }}
          >
            No blood pressure records available.
          </div>
        ) : (
          weightRecordsDesc.map((rec) => {
            const isHigh = rec.bloodPressureSystolic >= 140 || rec.bloodPressureDiastolic >= 90
            return (
              <div
                key={`bp-${rec.id}`}
                className="flex items-center justify-between"
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
                <span
                  style={{
                    fontSize: '13px',
                    color:    'var(--color-on-surface-secondary)',
                  }}
                >
                  {formatDate(rec.date)}
                </span>

                <span
                  style={{
                    fontSize:   '14px',
                    fontWeight: 600,
                    color:      'var(--color-on-surface)',
                  }}
                >
                  {rec.bloodPressureSystolic}/{rec.bloodPressureDiastolic} mmHg
                </span>

                <span
                  style={{
                    fontSize:      '12px',
                    fontWeight:    500,
                    paddingLeft:   'var(--spacing-sm)',
                    paddingRight:  'var(--spacing-sm)',
                    paddingTop:    '2px',
                    paddingBottom: '2px',
                    borderRadius:  'var(--radius-full)',
                    background:    isHigh ? 'var(--color-risk-high-bg)' : 'var(--color-risk-low-bg)',
                    color:         isHigh ? 'var(--color-risk-high)' : 'var(--color-risk-low)',
                  }}
                >
                  {isHigh ? 'High' : 'Normal'}
                </span>
              </div>
            )
          })
        )}

        {/* ── Hemoglobin Level Section ─────────────────────────────────────── */}
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
          Hemoglobin Level
        </div>

        <div
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
              Hemoglobin: 11.5 g/dL
            </span>
            <span
              style={{
                fontSize:      '12px',
                fontWeight:    500,
                paddingLeft:   'var(--spacing-sm)',
                paddingRight:  'var(--spacing-sm)',
                paddingTop:    '2px',
                paddingBottom: '2px',
                borderRadius:  'var(--radius-full)',
                background:    'var(--color-risk-low-bg)',
                color:         'var(--color-risk-low)',
              }}
            >
              Normal
            </span>
          </div>
          <div
            style={{
              marginTop: 'var(--spacing-xs)',
              fontSize:  '13px',
              color:     'var(--color-on-surface-secondary)',
            }}
          >
            Date: 15 Jan 2024
          </div>
        </div>

        {/* ── Add Health Record Button ─────────────────────────────────────── */}
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
            Add Health Record
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
