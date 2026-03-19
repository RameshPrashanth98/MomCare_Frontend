'use client'

import { useState, useMemo } from 'react'
import Link from 'next/link'
import {
  ArrowLeft,
  Search,
  SlidersHorizontal,
  Home,
  Users,
  Building2,
  FileText,
  UserCircle,
} from 'lucide-react'
import { db } from '@/lib/mock/db'
import type { RiskLevel } from '@/lib/types/entities'

// ─── Constants ────────────────────────────────────────────────────────────────

const COMMUNITIES = [
  'Nakuru Town', 'Naivasha', 'Gilgil', 'Molo', 'Njoro',
  'Rongai', 'Subukia', 'Bahati', 'Laikipia East',
  'Laikipia North', 'Laikipia West', 'Kuresoi North', 'Kuresoi South',
]

const NAV_ITEMS = [
  { icon: Home,       label: 'HOME',    href: '/dashboard',         active: false },
  { icon: Users,      label: 'MOTHERS', href: '/dashboard/mothers', active: true  },
  { icon: Building2,  label: 'CLINICS', href: null,                 active: false },
  { icon: FileText,   label: 'RECORDS', href: null,                 active: false },
  { icon: UserCircle, label: 'PROFILE', href: null,                 active: false },
]

// ─── Helpers ──────────────────────────────────────────────────────────────────

function getGestationalAge(lmpDate: string): { weeks: number; days: number } {
  const diffMs = Date.now() - new Date(lmpDate).getTime()
  const totalDays = Math.floor(diffMs / 86400000)
  return { weeks: Math.floor(totalDays / 7), days: totalDays % 7 }
}

function getAge(dateOfBirth: string): number {
  const dob = new Date(dateOfBirth)
  const today = new Date()
  let age = today.getFullYear() - dob.getFullYear()
  const monthDiff = today.getMonth() - dob.getMonth()
  if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) {
    age--
  }
  return age
}

function getTrimester(lmpDate: string): 1 | 2 | 3 {
  const { weeks } = getGestationalAge(lmpDate)
  if (weeks <= 13) return 1
  if (weeks <= 27) return 2
  return 3
}

function getRiskBadgeStyles(risk: RiskLevel): { bg: string; color: string; label: string } {
  switch (risk) {
    case 'high':
      return { bg: 'var(--color-risk-high-bg)', color: 'var(--color-risk-high)', label: 'High Risk' }
    case 'medium':
      return { bg: 'var(--color-risk-medium-bg)', color: 'var(--color-risk-medium)', label: 'Medium' }
    case 'low':
      return { bg: 'var(--color-risk-low-bg)', color: 'var(--color-risk-low)', label: 'Low Risk' }
  }
}

function formatDate(dateStr: string): string {
  return new Date(dateStr).toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
  })
}

// Inline SVG chevron-down for <select> dropdown indicator
const CHEVRON_SVG = `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%236B7280' stroke-width='2' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'%3E%3C/polyline%3E%3C/svg%3E")`

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function MothersPage() {
  const [searchQuery, setSearchQuery]     = useState('')
  const [areaFilter, setAreaFilter]       = useState('')
  const [trimesterFilter, setTrimesterFilter] = useState('')
  const [riskFilter, setRiskFilter]       = useState('')

  const filteredMothers = useMemo(() => {
    return db.mothers.filter((m) => {
      // Search: match name (case-insensitive) or nationalId (contains)
      if (searchQuery) {
        const q = searchQuery.toLowerCase()
        const nameMatch = m.name.toLowerCase().includes(q)
        const nicMatch  = m.nationalId.includes(searchQuery)
        if (!nameMatch && !nicMatch) return false
      }
      // Area filter
      if (areaFilter && m.community !== areaFilter) return false
      // Trimester filter
      if (trimesterFilter && getTrimester(m.lmpDate) !== Number(trimesterFilter)) return false
      // Risk filter
      if (riskFilter && m.riskLevel !== riskFilter) return false
      return true
    })
  }, [searchQuery, areaFilter, trimesterFilter, riskFilter])

  const hasActiveFilters = areaFilter || trimesterFilter || riskFilter

  function clearFilters() {
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
        {/* Left: Back arrow */}
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

        {/* Center: Title */}
        <span
          style={{
            fontSize:   '18px',
            fontWeight: 700,
            color:      'var(--color-on-surface)',
          }}
        >
          Mothers
        </span>

        {/* Right: Filter icon + EN badge + Avatar */}
        <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
          <SlidersHorizontal
            size={20}
            strokeWidth={1.5}
            style={{ color: 'var(--color-on-surface-secondary)' }}
          />
          <span
            style={{
              fontSize:   '12px',
              fontWeight: 500,
              color:      'var(--color-on-surface-secondary)',
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
              position:  'absolute',
              left:      '12px',
              top:       '50%',
              transform: 'translateY(-50%)',
              color:     'var(--color-on-surface-secondary)',
              pointerEvents: 'none',
            }}
          />
          <input
            type="text"
            placeholder="Search by name or NIC..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            style={{
              width:           '100%',
              height:          '44px',
              paddingLeft:     '40px',
              paddingRight:    'var(--spacing-md)',
              background:      'var(--color-surface-secondary)',
              borderRadius:    'var(--radius-xl)',
              border:          '1px solid var(--color-border)',
              fontSize:        '14px',
              color:           'var(--color-on-surface)',
              outline:         'none',
              boxSizing:       'border-box',
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

        {/* Results count */}
        <div
          style={{
            marginTop:   'var(--spacing-sm)',
            paddingLeft: 'var(--spacing-md)',
            paddingRight:'var(--spacing-md)',
            fontSize:    '12px',
            color:       'var(--color-on-surface-secondary)',
          }}
        >
          {filteredMothers.length} mothers
        </div>

        {/* Mother cards list */}
        <div style={{ paddingBottom: 'var(--spacing-lg)' }}>
          {filteredMothers.map((mother) => {
            const { weeks, days } = getGestationalAge(mother.lmpDate)
            const trimester = getTrimester(mother.lmpDate)
            const age = getAge(mother.dateOfBirth)
            const badge = getRiskBadgeStyles(mother.riskLevel)

            return (
              <div
                key={mother.id}
                style={{
                  marginLeft:   'var(--spacing-md)',
                  marginRight:  'var(--spacing-md)',
                  marginTop:    'var(--spacing-sm)',
                  padding:      'var(--spacing-md)',
                  background:   'var(--color-surface)',
                  borderRadius: 'var(--radius-xl)',
                  border:       '1px solid var(--color-border)',
                  boxShadow:    'var(--shadow-sm)',
                }}
              >
                {/* Row 1: Name + Age | Risk badge */}
                <div className="flex justify-between items-start">
                  <div>
                    <div
                      style={{
                        fontSize:   '14px',
                        fontWeight: 600,
                        color:      'var(--color-on-surface)',
                      }}
                    >
                      {mother.name}
                    </div>
                    <div
                      style={{
                        fontSize: '12px',
                        color:    'var(--color-on-surface-secondary)',
                      }}
                    >
                      {age} years old
                    </div>
                  </div>
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
                      marginLeft:    'var(--spacing-sm)',
                    }}
                  >
                    {badge.label}
                  </span>
                </div>

                {/* Row 2: Gestational age */}
                <div
                  style={{
                    marginTop: 'var(--spacing-xs)',
                    display:   'flex',
                    gap:       '4px',
                    alignItems: 'baseline',
                  }}
                >
                  <span
                    style={{
                      fontSize:   '14px',
                      fontWeight: 600,
                      color:      'var(--color-on-surface)',
                    }}
                  >
                    {weeks}w {days}d
                  </span>
                  <span
                    style={{
                      fontSize: '13px',
                      color:    'var(--color-on-surface-secondary)',
                    }}
                  >
                    · Trimester {trimester}
                  </span>
                </div>

                {/* Row 3: Community + Phone */}
                <div
                  style={{
                    marginTop: 'var(--spacing-xs)',
                    fontSize:  '12px',
                    color:     'var(--color-on-surface-secondary)',
                  }}
                >
                  {mother.community} | {mother.phone}
                </div>

                {/* Row 4: Last visit */}
                <div
                  style={{
                    marginTop: 'var(--spacing-xs)',
                    fontSize:  '12px',
                    color:     'var(--color-on-surface-secondary)',
                  }}
                >
                  {mother.lastVisitDate
                    ? `Last visit: ${formatDate(mother.lastVisitDate)}`
                    : 'No visits yet'}
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
          const Icon         = item.icon
          const activeColor  = 'var(--color-brand-pink)'
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
