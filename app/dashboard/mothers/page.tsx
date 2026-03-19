'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Search,
  Home,
  Users,
  Building2,
  FileText,
  UserCircle,
  AlertTriangle,
  User,
  ClipboardList,
  FolderOpen,
} from 'lucide-react'
import { db } from '@/lib/mock/db'
import { COMMUNITIES, CLINICS } from '@/lib/mock/factories/mother.factory'
import type { RiskLevel } from '@/lib/types/entities'

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: Home,       label: 'HOME',    href: '/dashboard',         active: false },
  { icon: Users,      label: 'MOTHERS', href: '/dashboard/mothers', active: true  },
  { icon: Building2,  label: 'CLINICS', href: null,                 active: false },
  { icon: FileText,   label: 'RECORDS', href: null,                 active: false },
  { icon: UserCircle, label: 'PROFILE', href: null,                 active: false },
]

// Avatar background colors — rotate through these
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

function getTrimesterLabel(t: 1 | 2 | 3): string {
  if (t === 1) return '1st Trimester'
  if (t === 2) return '2nd Trimester'
  return '3rd Trimester'
}

function getRiskBadgeStyles(risk: RiskLevel): { bg: string; color: string; label: string } {
  switch (risk) {
    case 'high':
      return { bg: 'var(--color-risk-high-bg)', color: 'var(--color-risk-high)', label: 'High Risk' }
    case 'medium':
      return { bg: 'var(--color-risk-medium-bg)', color: 'var(--color-risk-medium)', label: 'Normal' }
    case 'low':
      return { bg: 'var(--color-risk-low-bg)', color: 'var(--color-risk-low)', label: 'Normal' }
  }
}

function getAssignedMidwifeName(staffId: string): string {
  const staff = db.staff.find((s) => s.id === staffId)
  if (!staff) return 'Unknown'
  return staff.name.split(' ')[0]
}

// Inline SVG chevron-down for <select> dropdown indicator
const CHEVRON_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MothersPage() {
  const [searchQuery, setSearchQuery]         = useState('')
  const [clinicFilter, setClinicFilter]       = useState('')
  const [areaFilter, setAreaFilter]           = useState('')
  const [trimesterFilter, setTrimesterFilter] = useState('')
  const [riskFilter, setRiskFilter]           = useState('')

  const filteredMothers = useMemo(() => {
    return db.mothers.filter((m) => {
      // Search: match name (case-insensitive) or nationalId (contains)
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const nameMatch = m.name.toLowerCase().includes(q)
        const nicMatch  = m.nationalId.toLowerCase().includes(q.toLowerCase())
        if (!nameMatch && !nicMatch) return false
      }
      // Clinic filter
      if (clinicFilter && m.assignedClinicId !== clinicFilter) return false
      // Area filter
      if (areaFilter && m.community !== areaFilter) return false
      // Trimester filter
      if (trimesterFilter && getTrimester(m.lmpDate) !== Number(trimesterFilter)) return false
      // Risk filter
      if (riskFilter && m.riskLevel !== riskFilter) return false
      return true
    })
  }, [searchQuery, clinicFilter, areaFilter, trimesterFilter, riskFilter])

  const hasActiveFilters = clinicFilter || areaFilter || trimesterFilter || riskFilter

  function clearFilters() {
    setClinicFilter('')
    setAreaFilter('')
    setTrimesterFilter('')
    setRiskFilter('')
  }

  // Shared chip select styles
  function chipStyle(isActive: boolean): React.CSSProperties {
    return {
      appearance: 'none' as const,
      fontSize: '13px',
      fontWeight: 500,
      paddingLeft: 'var(--spacing-md)',
      paddingRight: 'var(--spacing-lg)',
      paddingTop: 'var(--spacing-xs)',
      paddingBottom: 'var(--spacing-xs)',
      borderRadius: 'var(--radius-full)',
      cursor: 'pointer',
      whiteSpace: 'nowrap' as const,
      border: isActive ? 'none' : '1px solid var(--color-border)',
      background: isActive ? 'var(--color-primary)' : 'transparent',
      color: isActive ? 'white' : 'var(--color-on-surface-secondary)',
      backgroundImage: isActive
        ? `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='white' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`
        : CHEVRON_SVG,
      backgroundRepeat: 'no-repeat',
      backgroundPosition: 'right 10px center',
      backgroundSize: '12px',
      outline: 'none',
      flexShrink: 0,
    }
  }

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
          Mothers
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
            B/EN
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
            placeholder="Search by Name or NIC"
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width:        '100%',
              height:       '44px',
              paddingLeft:  '40px',
              paddingRight: 'var(--spacing-md)',
              background:   'var(--color-surface-secondary)',
              borderRadius: 'var(--radius-xl)',
              border:       '1px solid var(--color-border)',
              fontSize:     '14px',
              color:        'var(--color-on-surface)',
              outline:      'none',
              boxSizing:    'border-box',
            }}
          />
        </div>

        {/* Filter chips row */}
        <div
          className="flex [&::-webkit-scrollbar]:hidden"
          style={{
            overflowX:       'auto',
            gap:             'var(--spacing-sm)',
            paddingLeft:     'var(--spacing-md)',
            paddingRight:    'var(--spacing-md)',
            marginTop:       'var(--spacing-sm)',
            paddingBottom:   'var(--spacing-xs)',
            msOverflowStyle: 'none',
            scrollbarWidth:  'none',
          } as React.CSSProperties}
        >
          {/* Clinic filter */}
          <select
            value={clinicFilter}
            onChange={(e) => setClinicFilter(e.target.value)}
            style={chipStyle(clinicFilter !== '')}
          >
            <option value="">Clinic</option>
            {CLINICS.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Area filter */}
          <select
            value={areaFilter}
            onChange={(e) => setAreaFilter(e.target.value)}
            style={chipStyle(areaFilter !== '')}
          >
            <option value="">Area</option>
            {COMMUNITIES.map((c) => (
              <option key={c} value={c}>{c}</option>
            ))}
          </select>

          {/* Trimester filter */}
          <select
            value={trimesterFilter}
            onChange={(e) => setTrimesterFilter(e.target.value)}
            style={chipStyle(trimesterFilter !== '')}
          >
            <option value="">Trimester</option>
            <option value="1">1st Trimester</option>
            <option value="2">2nd Trimester</option>
            <option value="3">3rd Trimester</option>
          </select>

          {/* Risk Level filter */}
          <select
            value={riskFilter}
            onChange={(e) => setRiskFilter(e.target.value)}
            style={chipStyle(riskFilter !== '')}
          >
            <option value="">Risk Level</option>
            <option value="high">High</option>
            <option value="medium">Medium</option>
            <option value="low">Low</option>
          </select>

          {/* Clear chip */}
          {hasActiveFilters && (
            <button
              type="button"
              onClick={clearFilters}
              style={{
                appearance:    'none',
                fontSize:      '13px',
                fontWeight:    500,
                paddingLeft:   'var(--spacing-md)',
                paddingRight:  'var(--spacing-md)',
                paddingTop:    'var(--spacing-xs)',
                paddingBottom: 'var(--spacing-xs)',
                borderRadius:  'var(--radius-full)',
                cursor:        'pointer',
                whiteSpace:    'nowrap',
                border:        '1px solid var(--color-risk-high)',
                background:    'transparent',
                color:         'var(--color-risk-high)',
                flexShrink:    0,
              }}
            >
              Clear
            </button>
          )}
        </div>

        {/* Section label */}
        <div
          style={{
            fontSize:      '12px',
            fontWeight:    600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color:         'var(--color-on-surface-secondary)',
            marginTop:     'var(--spacing-md)',
            paddingLeft:   'var(--spacing-md)',
            paddingRight:  'var(--spacing-md)',
            marginBottom:  'var(--spacing-sm)',
          }}
        >
          Mother List
        </div>

        {/* Mother cards list */}
        <div style={{ paddingBottom: 'var(--spacing-lg)' }}>
          {filteredMothers.length === 0 && (
            <div
              style={{
                textAlign:   'center',
                padding:     'var(--spacing-xl)',
                color:       'var(--color-on-surface-secondary)',
                fontSize:    '14px',
              }}
            >
              No mothers found matching your search or filters.
            </div>
          )}

          {filteredMothers.map((mother, index) => {
            const trimester = getTrimester(mother.lmpDate)
            const badge = getRiskBadgeStyles(mother.riskLevel)
            const initials = getInitials(mother.name)
            const avatarColor = AVATAR_COLORS[index % AVATAR_COLORS.length]
            const midwifeName = getAssignedMidwifeName(mother.assignedStaffId)

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
                {/* Row 1: Avatar + Name/NIC + Risk badge */}
                <div className="flex items-start" style={{ gap: 'var(--spacing-sm)' }}>
                  {/* Avatar circle */}
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

                  {/* Name + NIC */}
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center" style={{ gap: '4px' }}>
                      <span
                        style={{
                          fontSize:   '14px',
                          fontWeight: 600,
                          color:      'var(--color-on-surface)',
                        }}
                      >
                        {mother.name}
                      </span>
                      {mother.riskLevel === 'high' && (
                        <AlertTriangle size={14} style={{ color: 'var(--color-risk-high)', flexShrink: 0 }} />
                      )}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color:    'var(--color-on-surface-secondary)',
                      }}
                    >
                      NIC: {mother.nationalId}
                    </div>
                  </div>

                  {/* Risk badge */}
                  <span
                    style={{
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
                    {badge.label}
                  </span>
                </div>

                {/* Row 2: Trimester + Assigned Midwife */}
                <div
                  style={{
                    marginTop: 'var(--spacing-sm)',
                    fontSize:  '13px',
                    color:     'var(--color-on-surface-secondary)',
                    display:   'flex',
                    gap:       'var(--spacing-md)',
                  }}
                >
                  <span>{getTrimesterLabel(trimester)}</span>
                  <span>Assigned Midwife: {midwifeName}</span>
                </div>

                {/* Row 3: Action buttons */}
                <div
                  className="flex"
                  style={{
                    marginTop: 'var(--spacing-sm)',
                    gap:       'var(--spacing-sm)',
                  }}
                >
                  {/* View Profile — outlined */}
                  <button
                    type="button"
                    className="flex items-center"
                    style={{
                      gap:           '4px',
                      background:    'transparent',
                      color:         'var(--color-primary)',
                      border:        '1px solid var(--color-border)',
                      borderRadius:  'var(--radius-full)',
                      fontSize:      '12px',
                      fontWeight:    500,
                      paddingLeft:   'var(--spacing-sm)',
                      paddingRight:  'var(--spacing-md)',
                      paddingTop:    '6px',
                      paddingBottom: '6px',
                      cursor:        'pointer',
                      whiteSpace:    'nowrap',
                    }}
                  >
                    <User size={13} />
                    View Profile
                  </button>

                  {/* Record Visit — filled pink */}
                  <button
                    type="button"
                    className="flex items-center"
                    style={{
                      gap:           '4px',
                      background:    'var(--color-brand-pink)',
                      color:         'white',
                      border:        'none',
                      borderRadius:  'var(--radius-full)',
                      fontSize:      '12px',
                      fontWeight:    500,
                      paddingLeft:   'var(--spacing-sm)',
                      paddingRight:  'var(--spacing-md)',
                      paddingTop:    '6px',
                      paddingBottom: '6px',
                      cursor:        'pointer',
                      whiteSpace:    'nowrap',
                    }}
                  >
                    <ClipboardList size={13} />
                    Record Visit
                  </button>

                  {/* Records — outlined */}
                  <button
                    type="button"
                    className="flex items-center"
                    style={{
                      gap:           '4px',
                      background:    'transparent',
                      color:         'var(--color-on-surface-secondary)',
                      border:        '1px solid var(--color-border)',
                      borderRadius:  'var(--radius-full)',
                      fontSize:      '12px',
                      fontWeight:    500,
                      paddingLeft:   'var(--spacing-sm)',
                      paddingRight:  'var(--spacing-md)',
                      paddingTop:    '6px',
                      paddingBottom: '6px',
                      cursor:        'pointer',
                      whiteSpace:    'nowrap',
                    }}
                  >
                    <FolderOpen size={13} />
                    Records
                  </button>
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
