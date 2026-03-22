'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Search,
  Calendar,
  Clock,
  ChevronRight,
  Home,
  Users,
  Building2,
  FileText,
  UserCircle,
} from 'lucide-react'

// ─── Navigation ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: Home,       label: 'HOME',    href: '/dashboard',         active: false },
  { icon: Users,      label: 'MOTHERS', href: '/dashboard/mothers', active: false },
  { icon: Building2,  label: 'CLINICS', href: '/dashboard/clinics', active: true  },
  { icon: FileText,   label: 'RECORDS', href: null,                 active: false },
  { icon: UserCircle, label: 'PROFILE', href: null,                 active: false },
]

// ─── Styles ──────────────────────────────────────────────────────────────────

const sectionHeaderStyle: React.CSSProperties = {
  textTransform:  'uppercase',
  fontSize:       '11px',
  fontWeight:     600,
  color:          'var(--color-brand-pink)',
  letterSpacing:  '0.5px',
  marginBottom:   'var(--spacing-md)',
}

const cardStyle: React.CSSProperties = {
  background:   'var(--color-surface)',
  border:       '1px solid var(--color-border)',
  borderRadius: 'var(--radius-xl)',
  marginLeft:   'var(--spacing-md)',
  marginRight:  'var(--spacing-md)',
  marginTop:    'var(--spacing-sm)',
  padding:      'var(--spacing-md)',
}

const labelStyle: React.CSSProperties = {
  fontSize:     '13px',
  fontWeight:   500,
  color:        'var(--color-on-surface)',
  marginBottom: '6px',
  display:      'block',
}

const inputStyle: React.CSSProperties = {
  height:       '44px',
  border:       '1px solid var(--color-border)',
  borderRadius: 'var(--radius-lg)',
  paddingLeft:  'var(--spacing-md)',
  paddingRight: 'var(--spacing-md)',
  fontSize:     '14px',
  color:        'var(--color-on-surface)',
  background:   'var(--color-surface)',
  width:        '100%',
  outline:      'none',
  boxSizing:    'border-box',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  appearance:        'none',
  WebkitAppearance:  'none',
  color:             'var(--color-on-surface-secondary)',
}

// ─── Page ────────────────────────────────────────────────────────────────────

export default function AddClinicSessionPage() {
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
          Add Clinic Session
        </span>

        {/* Right: Search + B/EN badge + Avatar */}
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
            B/EN
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
            RP
          </div>
        </div>
      </div>

      {/* ── Scrollable content ───────────────────────────────────────────────── */}
      <div
        className="flex-1 overflow-y-auto"
        style={{
          background:    'var(--color-surface-secondary)',
          paddingTop:    'var(--spacing-sm)',
          paddingBottom: '80px',
        }}
      >

        {/* ── Section 1: Clinic Information ──────────────────────────────────── */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Clinic Information</div>

          <div className="flex flex-col" style={{ gap: 'var(--spacing-md)' }}>
            {/* Clinic Name */}
            <div>
              <label style={labelStyle}>Clinic Name</label>
              <select style={selectStyle}>
                <option value="" disabled selected>Select Clinic Name</option>
                <option value="antenatal-a">Antenatal Clinic A</option>
                <option value="antenatal-b">Antenatal Clinic B</option>
                <option value="antenatal-c">Antenatal Clinic C</option>
              </select>
            </div>

            {/* Clinic Type */}
            <div>
              <label style={labelStyle}>Clinic Type</label>
              <select
                style={{
                  ...selectStyle,
                  borderColor: 'var(--color-brand-pink)',
                  color:       'var(--color-on-surface)',
                }}
                defaultValue="antenatal-postnatal"
              >
                <option value="antenatal-postnatal">Antenatal / Postnatal</option>
                <option value="antenatal">Antenatal</option>
                <option value="postnatal">Postnatal</option>
              </select>
            </div>

            {/* Clinic Location */}
            <div>
              <label style={labelStyle}>Clinic Location</label>
              <input
                type="text"
                placeholder="Enter clinic location"
                style={{
                  ...inputStyle,
                  color: undefined,
                }}
              />
            </div>

            {/* PHM Area */}
            <div>
              <label style={labelStyle}>PHM Area</label>
              <select style={selectStyle}>
                <option value="" disabled selected>Select PHM Area</option>
                <option value="area-1">Lakewood</option>
                <option value="area-2">Riverside</option>
                <option value="area-3">Greenhill</option>
              </select>
            </div>
          </div>
        </div>

        {/* ── Section 2: Schedule Details ─────────────────────────────────────── */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Schedule Details</div>

          <div className="flex flex-col" style={{ gap: 'var(--spacing-md)' }}>
            {/* Clinic Date */}
            <div>
              <label style={labelStyle}>Clinic Date</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  readOnly
                  placeholder="Select Date"
                  style={{
                    ...inputStyle,
                    paddingRight: '40px',
                    cursor:       'pointer',
                  }}
                />
                <Calendar
                  size={18}
                  style={{
                    position:  'absolute',
                    right:     '12px',
                    top:       '50%',
                    transform: 'translateY(-50%)',
                    color:     'var(--color-on-surface-secondary)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            {/* Clinic Start Time */}
            <div>
              <label style={labelStyle}>Clinic Start Time</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  readOnly
                  placeholder="Select Start Time"
                  style={{
                    ...inputStyle,
                    paddingRight: '40px',
                    cursor:       'pointer',
                  }}
                />
                <Clock
                  size={18}
                  style={{
                    position:  'absolute',
                    right:     '12px',
                    top:       '50%',
                    transform: 'translateY(-50%)',
                    color:     'var(--color-on-surface-secondary)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>

            {/* Clinic End Time */}
            <div>
              <label style={labelStyle}>Clinic End Time</label>
              <div style={{ position: 'relative' }}>
                <input
                  type="text"
                  readOnly
                  placeholder="Select End Time"
                  style={{
                    ...inputStyle,
                    paddingRight: '40px',
                    cursor:       'pointer',
                  }}
                />
                <Clock
                  size={18}
                  style={{
                    position:  'absolute',
                    right:     '12px',
                    top:       '50%',
                    transform: 'translateY(-50%)',
                    color:     'var(--color-on-surface-secondary)',
                    pointerEvents: 'none',
                  }}
                />
              </div>
            </div>
          </div>
        </div>

        {/* ── Section 3: Staff Assignment ─────────────────────────────────────── */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Staff Assignment</div>

          <div className="flex flex-col" style={{ gap: 'var(--spacing-md)' }}>
            {/* Assigned Midwife */}
            <div>
              <label style={labelStyle}>Assigned Midwife</label>
              <button
                type="button"
                className="flex items-center justify-between"
                style={{
                  ...inputStyle,
                  cursor:     'pointer',
                  background: 'var(--color-surface)',
                }}
              >
                <span style={{ color: 'var(--color-on-surface-secondary)', fontSize: '14px' }}>
                  Select Midwife
                </span>
                <ChevronRight size={18} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
              </button>
            </div>

            {/* Supervising MOH / AMOH */}
            <div>
              <label style={labelStyle}>Supervising MOH / AMOH</label>
              <button
                type="button"
                className="flex items-center justify-between"
                style={{
                  ...inputStyle,
                  cursor:     'pointer',
                  background: 'var(--color-surface)',
                }}
              >
                <span style={{ color: 'var(--color-on-surface-secondary)', fontSize: '14px' }}>
                  Select Officer
                </span>
                <ChevronRight size={18} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
              </button>
            </div>
          </div>
        </div>

        {/* ── Section 4: Expected Attendance ──────────────────────────────────── */}
        <div style={cardStyle}>
          <div style={sectionHeaderStyle}>Expected Attendance</div>

          <div>
            <label style={labelStyle}>Expected Number of Mothers</label>
            <textarea
              placeholder="Enter notes"
              style={{
                ...inputStyle,
                height:    'auto',
                minHeight: '80px',
                resize:    'none',
                paddingTop: 'var(--spacing-sm)',
              }}
            />
          </div>
        </div>

      </div>
      {/* ── End scrollable content ──────────────────────────────────────────── */}

      {/* ── Fixed Bottom Action Bar ───────────────────────────────────────────── */}
      <div
        className="flex items-center justify-between flex-shrink-0"
        style={{
          height:       '68px',
          background:   'var(--color-surface)',
          borderTop:    '1px solid var(--color-border)',
          paddingLeft:  'var(--spacing-md)',
          paddingRight: 'var(--spacing-md)',
        }}
      >
        {/* Cancel */}
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            height:       '44px',
            paddingLeft:  '24px',
            paddingRight: '24px',
            fontSize:     '14px',
            fontWeight:   500,
            color:        'var(--color-on-surface-secondary)',
            background:   'transparent',
            border:       '1.5px solid var(--color-border-strong)',
            borderRadius: 'var(--radius-full)',
            cursor:       'pointer',
          }}
        >
          Cancel
        </button>

        {/* Create Clinic Session */}
        <button
          type="button"
          style={{
            height:       '44px',
            paddingLeft:  '24px',
            paddingRight: '24px',
            fontSize:     '14px',
            fontWeight:   600,
            color:        'white',
            background:   'var(--color-brand-pink)',
            border:       'none',
            borderRadius: 'var(--radius-full)',
            cursor:       'pointer',
          }}
        >
          Create Clinic Session
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
