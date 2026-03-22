'use client'

import { useMemo } from 'react'
import Link from 'next/link'
import { useParams, useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Home,
  Users,
  Building2,
  FileText,
  UserCircle,
  ChevronRight,
  AlertTriangle,
  FileUp,
  FilePlus,
  Plus,
  Bell,
} from 'lucide-react'
import { db } from '@/lib/mock/db'
import type { RiskLevel } from '@/lib/types/entities'

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: Home,       label: 'HOME',    href: '/dashboard',         active: false },
  { icon: Users,      label: 'MOTHERS', href: '/dashboard/mothers', active: true  },
  { icon: Building2,  label: 'CLINICS', href: '/dashboard/clinics', active: false },
  { icon: FileText,   label: 'RECORDS', href: '/dashboard/records', active: false },
  { icon: UserCircle, label: 'PROFILE', href: '/dashboard/profile',                 active: false },
]

// ─── Mock medical history data ────────────────────────────────────────────────

interface PreviousPregnancy {
  year: number
  type: 'Cesarean' | 'Normal' | 'Assisted'
  notes: string[]
}

interface Attachment {
  id: string
  name: string
  date: string
}

const PREVIOUS_PREGNANCIES: PreviousPregnancy[] = [
  {
    year: 2021,
    type: 'Cesarean',
    notes: ['Healthy baby girl', 'High blood pressure during pregnancy'],
  },
  {
    year: 2019,
    type: 'Normal',
    notes: ['Miscarriage at 20 weeks'],
  },
]

const MEDICAL_CONDITIONS = ['Hypertension', 'Gestational Diabetes']

const COMPLICATIONS_RISK_NOTES =
  'Needs close monitoring of blood pressure and regular checkups.'

const ATTACHMENTS: Attachment[] = [
  { id: 'att-1', name: 'Ultrasound Report', date: 'Apr 12, 2023' },
  { id: 'att-2', name: 'Blood Test Results', date: 'Apr 5, 2023' },
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

function getTrimesterLabel(t: 1 | 2 | 3): string {
  if (t === 1) return '1st'
  if (t === 2) return '2nd'
  return '3rd'
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

function getTimeAgo(): string {
  return '10 mins ago'
}

// ─── Shared styles ────────────────────────────────────────────────────────────

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

export default function MedicalHistoryPage() {
  const params = useParams()
  const router = useRouter()
  const motherId = params.id as string

  const mother = useMemo(() => db.mothers.find((m) => m.id === motherId), [motherId])

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
  const trimester = getTrimester(mother.lmpDate)
  const midwifeName = getAssignedMidwifeName(mother.assignedStaffId)

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
          Medical History
        </span>

        <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
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
          <Bell size={20} style={{ color: 'var(--color-on-surface-secondary)', cursor: 'pointer' }} />
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
            {initials.charAt(0)}
          </div>
        </div>
      </div>

      {/* ── Scrollable content ───────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <div style={{ padding: 'var(--spacing-md)', paddingBottom: '100px' }}>

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

              {/* Name + NIC */}
              <div className="flex-1 min-w-0">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center flex-wrap" style={{ gap: 'var(--spacing-sm)' }}>
                      <span style={{ fontSize: '16px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                        {mother.name}
                      </span>
                    </div>
                    <div style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)', marginTop: '2px' }}>
                      NIC {mother.nationalId}
                    </div>
                  </div>
                  <div className="flex flex-col items-end" style={{ gap: '4px' }}>
                    <span style={{ fontSize: '11px', color: 'var(--color-on-surface-secondary)' }}>
                      {getTimeAgo()}
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
                </div>
                <div
                  style={{
                    fontSize:  '12px',
                    color:     'var(--color-on-surface-secondary)',
                    marginTop: 'var(--spacing-xs)',
                    display:   'flex',
                    gap:       'var(--spacing-sm)',
                  }}
                >
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ color: 'var(--color-brand-pink)' }}>&#9830;</span>
                    Trimester {getTrimesterLabel(trimester)}
                  </span>
                  <span style={{ display: 'flex', alignItems: 'center', gap: '4px' }}>
                    <span style={{ fontSize: '14px' }}>&#127973;</span>
                    Midwife: {midwifeName}
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* ── Previous Pregnancies ──────────────────────────────────────────── */}
          <div style={{ ...sectionHeaderStyle, marginTop: 'var(--spacing-md)' }}>
            Previous Pregnancies
          </div>

          {PREVIOUS_PREGNANCIES.map((pregnancy, idx) => (
            <div key={idx} style={cardStyle}>
              <div className="flex items-center justify-between" style={{ marginBottom: 'var(--spacing-xs)' }}>
                <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                  <span style={{ fontSize: '15px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                    {pregnancy.year}
                  </span>
                  <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-on-surface)' }}>
                    {pregnancy.type}
                  </span>
                </div>
                {idx === 0 && (
                  <span
                    style={{
                      fontSize:   '13px',
                      fontWeight: 500,
                      color:      'var(--color-brand-pink)',
                      cursor:     'pointer',
                    }}
                  >
                    Notes
                  </span>
                )}
              </div>
              {pregnancy.notes.map((note, nIdx) => (
                <div
                  key={nIdx}
                  className="flex items-start"
                  style={{
                    gap:       'var(--spacing-xs)',
                    marginTop: 'var(--spacing-xs)',
                  }}
                >
                  <span
                    style={{
                      fontSize:  '11px',
                      color:     nIdx === 0 && idx === 0 ? 'var(--color-success)' : 'var(--color-on-surface-secondary)',
                      marginTop: '2px',
                      flexShrink: 0,
                    }}
                  >
                    {nIdx === 0 && idx === 0 ? '●' : idx === 1 ? '◎' : '⊜'}
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      color:    'var(--color-on-surface-secondary)',
                    }}
                  >
                    {note}
                  </span>
                </div>
              ))}
            </div>
          ))}

          {/* ── Medical Conditions ───────────────────────────────────────────── */}
          <div style={{ ...sectionHeaderStyle, marginTop: 'var(--spacing-md)' }}>
            Medical Conditions
          </div>

          <div style={cardStyle}>
            <div className="flex flex-wrap" style={{ gap: 'var(--spacing-sm)' }}>
              {MEDICAL_CONDITIONS.map((condition, idx) => (
                <span
                  key={idx}
                  style={{
                    display:       'inline-block',
                    paddingLeft:   'var(--spacing-md)',
                    paddingRight:  'var(--spacing-md)',
                    paddingTop:    'var(--spacing-sm)',
                    paddingBottom: 'var(--spacing-sm)',
                    borderRadius:  'var(--radius-full)',
                    fontSize:      '13px',
                    fontWeight:    500,
                    background:    'var(--color-risk-high-bg)',
                    color:         'var(--color-risk-high)',
                  }}
                >
                  {condition}
                </span>
              ))}
            </div>
          </div>

          {/* ── Complications & Risk Notes ────────────────────────────────────── */}
          <div style={{ ...sectionHeaderStyle, marginTop: 'var(--spacing-md)' }}>
            Complications & Risk Notes
          </div>

          <div style={cardStyle}>
            <div className="flex items-start" style={{ gap: 'var(--spacing-sm)' }}>
              <AlertTriangle
                size={18}
                style={{
                  color:     'var(--color-warning)',
                  flexShrink: 0,
                  marginTop: '1px',
                }}
              />
              <span
                style={{
                  fontSize:   '13px',
                  color:      'var(--color-on-surface)',
                  lineHeight: '1.5',
                }}
              >
                {COMPLICATIONS_RISK_NOTES}
              </span>
            </div>
          </div>

          {/* ── Attachments ───────────────────────────────────────────────────── */}
          <div style={{ ...sectionHeaderStyle, marginTop: 'var(--spacing-md)' }}>
            Attachments
          </div>

          <div style={cardStyle}>
            {ATTACHMENTS.map((attachment, idx) => {
              const isLast = idx === ATTACHMENTS.length - 1
              return (
                <button
                  key={attachment.id}
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
                  <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
                    <div
                      className="flex items-center justify-center"
                      style={{
                        width:        '36px',
                        height:       '36px',
                        borderRadius: 'var(--radius-lg)',
                        background:   'var(--color-risk-high-bg)',
                        flexShrink:   0,
                      }}
                    >
                      <FileText size={18} style={{ color: 'var(--color-brand-pink)' }} />
                    </div>
                    <div>
                      <div style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-on-surface)' }}>
                        {attachment.name}
                      </div>
                      <div style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)', marginTop: '1px' }}>
                        {attachment.date}
                      </div>
                    </div>
                  </div>
                  <ChevronRight size={18} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
                </button>
              )
            })}
          </div>

        </div>
      </div>
      {/* ── End scrollable content ──────────────────────────────────────────── */}

      {/* ── Sticky Bottom Action Buttons ───────────────────────────────────── */}
      <div
        className="flex items-center justify-center flex-shrink-0"
        style={{
          position:    'absolute',
          bottom:      '64px',
          left:        0,
          right:       0,
          padding:     'var(--spacing-sm) var(--spacing-md)',
          display:     'flex',
          gap:         'var(--spacing-sm)',
          background:  'linear-gradient(to top, var(--color-surface) 80%, transparent)',
          paddingTop:  'var(--spacing-lg)',
        }}
      >
        {/* Add Note */}
        <button
          type="button"
          className="flex items-center justify-center"
          style={{
            gap:           '4px',
            background:    'transparent',
            color:         'var(--color-on-surface-secondary)',
            border:        '1px solid var(--color-border)',
            borderRadius:  'var(--radius-full)',
            fontSize:      '12px',
            fontWeight:    500,
            paddingTop:    '10px',
            paddingBottom: '10px',
            paddingLeft:   'var(--spacing-md)',
            paddingRight:  'var(--spacing-md)',
            cursor:        'pointer',
            whiteSpace:    'nowrap',
          }}
        >
          <FilePlus size={14} />
          Add Note
        </button>

        {/* Add Complication */}
        <button
          type="button"
          className="flex items-center justify-center"
          style={{
            gap:           '4px',
            background:    'transparent',
            color:         'var(--color-on-surface-secondary)',
            border:        '1px solid var(--color-border)',
            borderRadius:  'var(--radius-full)',
            fontSize:      '12px',
            fontWeight:    500,
            paddingTop:    '10px',
            paddingBottom: '10px',
            paddingLeft:   'var(--spacing-md)',
            paddingRight:  'var(--spacing-md)',
            cursor:        'pointer',
            whiteSpace:    'nowrap',
          }}
        >
          <Plus size={14} />
          Add Complication
        </button>

        {/* Upload Report */}
        <button
          type="button"
          className="flex items-center justify-center"
          style={{
            gap:           '4px',
            background:    'var(--color-brand-pink)',
            color:         'white',
            border:        'none',
            borderRadius:  'var(--radius-full)',
            fontSize:      '12px',
            fontWeight:    500,
            paddingTop:    '10px',
            paddingBottom: '10px',
            paddingLeft:   'var(--spacing-md)',
            paddingRight:  'var(--spacing-md)',
            cursor:        'pointer',
            whiteSpace:    'nowrap',
          }}
        >
          <FileUp size={14} />
          Upload Report
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
