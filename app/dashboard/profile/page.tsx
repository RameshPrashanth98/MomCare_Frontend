'use client'

import { useState } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import {
  ArrowLeft,
  Bell,
  Globe,
  ChevronRight,
  User,
  Users,
  Building2,
  FileText,
  UserCircle,
  Home,
  LogOut,
} from 'lucide-react'

// ─── Navigation ──────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: Home,       label: 'HOME',    href: '/dashboard',         active: false },
  { icon: Users,      label: 'MOTHERS', href: '/dashboard/mothers', active: false },
  { icon: Building2,  label: 'CLINICS', href: '/dashboard/clinics', active: false },
  { icon: FileText,   label: 'RECORDS', href: null,                 active: false },
  { icon: UserCircle, label: 'PROFILE', href: '/dashboard/profile', active: true  },
]

// ─── Styles ──────────────────────────────────────────────────────────────────

const sectionLabelStyle: React.CSSProperties = {
  textTransform:  'uppercase',
  fontSize:       '12px',
  fontWeight:     600,
  color:          'var(--color-brand-pink)',
  letterSpacing:  '0.5px',
  paddingLeft:    'var(--spacing-md)',
  paddingRight:   'var(--spacing-md)',
  marginTop:      'var(--spacing-lg)',
  marginBottom:   'var(--spacing-sm)',
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function ProfilePage() {
  const router = useRouter()
  const [notificationsOn, setNotificationsOn] = useState(true)

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
            padding:    '4px',
            color:      'var(--color-on-surface)',
          }}
        >
          <ArrowLeft size={20} strokeWidth={1.5} />
        </button>

        <span
          style={{
            fontSize:   '17px',
            fontWeight: 600,
            color:      'var(--color-on-surface)',
          }}
        >
          User Profile
        </span>

        <div className="flex items-center" style={{ gap: 'var(--spacing-sm)' }}>
          <span
            style={{
              fontSize:   '12px',
              fontWeight: 500,
              color:      'var(--color-on-surface-secondary)',
            }}
          >
            EN
          </span>
          <span style={{ color: 'var(--color-border-strong)', fontSize: '14px' }}>|</span>
          <button
            type="button"
            style={{
              display:    'flex',
              alignItems: 'center',
              background: 'none',
              border:     'none',
              cursor:     'pointer',
              padding:    '4px',
              color:      'var(--color-on-surface-secondary)',
            }}
          >
            <Globe size={18} strokeWidth={1.5} />
          </button>
          <Link
            href="/dashboard/notifications"
            style={{ display: 'flex', alignItems: 'center', color: 'var(--color-on-surface)', padding: '4px' }}
          >
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
      <div
        className="flex-1 overflow-y-auto"
        style={{
          background:    'var(--color-surface-secondary)',
          paddingBottom: '16px',
        }}
      >

        {/* ── Profile Card ──────────────────────────────────────────────────── */}
        <div
          style={{
            background:   'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border:       '1px solid var(--color-border)',
            padding:      'var(--spacing-md)',
            marginLeft:   'var(--spacing-md)',
            marginRight:  'var(--spacing-md)',
            marginTop:    'var(--spacing-md)',
          }}
        >
          {/* Avatar + Name row */}
          <div className="flex items-center" style={{ gap: 'var(--spacing-md)' }}>
            {/* Large avatar */}
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width:      '56px',
                height:     '56px',
                background: 'var(--color-brand-pink)',
                opacity:    0.3,
                flexShrink: 0,
                position:   'relative',
              }}
            >
              <User
                size={28}
                strokeWidth={1.5}
                style={{
                  color:   'var(--color-brand-pink)',
                  opacity: 1,
                }}
              />
            </div>
            <div style={{ position: 'relative' }}>
              {/* Re-render the avatar icon on top with full opacity */}
            </div>
            <div>
              <div style={{ fontSize: '17px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
                Malani Perera
              </div>
              <div style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)', marginTop: '2px' }}>
                Public Health Midwife
              </div>
            </div>
          </div>

          {/* Clinic + Area details */}
          <div style={{ marginTop: 'var(--spacing-md)' }}>
            <div style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)', marginBottom: '4px' }}>
              MOH Clinic: <span style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>Colombo South</span>
            </div>
            <div style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)' }}>
              PHM Area: <span style={{ fontWeight: 600, color: 'var(--color-on-surface)' }}>Dehiwala</span>
            </div>
          </div>
        </div>

        {/* ── Account Information ────────────────────────────────────────────── */}
        <div style={sectionLabelStyle}>Account Information</div>
        <div
          style={{
            background:   'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border:       '1px solid var(--color-border)',
            marginLeft:   'var(--spacing-md)',
            marginRight:  'var(--spacing-md)',
            overflow:     'hidden',
          }}
        >
          {[
            { label: 'Staff ID:', value: 'MOH-2045' },
            { label: 'Phone:', value: '+94 77 456 7890' },
            { label: 'Email:', value: 'malani@moh.lk' },
            { label: 'District:', value: 'Colombo' },
          ].map((item, index, arr) => (
            <button
              key={item.label}
              type="button"
              className="flex items-center justify-between"
              style={{
                width:          '100%',
                padding:        'var(--spacing-md)',
                background:     'transparent',
                border:         'none',
                borderBottom:   index < arr.length - 1 ? '1px solid var(--color-border)' : 'none',
                cursor:         'pointer',
                textAlign:      'left',
              }}
            >
              <div className="flex items-center" style={{ gap: '6px' }}>
                <span style={{ fontSize: '13px', color: 'var(--color-on-surface-secondary)' }}>
                  {item.label}
                </span>
                <span style={{ fontSize: '14px', fontWeight: 600, color: 'var(--color-on-surface)' }}>
                  {item.value}
                </span>
              </div>
              <ChevronRight size={18} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
            </button>
          ))}
        </div>

        {/* ── App Preferences ───────────────────────────────────────────────── */}
        <div style={sectionLabelStyle}>App Preferences</div>
        <div
          style={{
            background:   'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border:       '1px solid var(--color-border)',
            marginLeft:   'var(--spacing-md)',
            marginRight:  'var(--spacing-md)',
            overflow:     'hidden',
          }}
        >
          {/* Language */}
          <div
            className="flex items-center justify-between"
            style={{
              padding:      'var(--spacing-md)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <span style={{ fontSize: '14px', color: 'var(--color-on-surface)' }}>
              Language
            </span>
            <div
              className="flex items-center justify-center"
              style={{
                gap:          '4px',
                height:       '28px',
                paddingLeft:  'var(--spacing-sm)',
                paddingRight: 'var(--spacing-sm)',
                borderRadius: 'var(--radius-full)',
                background:   'var(--color-brand-pink)',
                color:        'white',
                fontSize:     '12px',
                fontWeight:   600,
              }}
            >
              EN
              <Globe size={14} />
            </div>
          </div>

          {/* Notifications */}
          <div
            className="flex items-center justify-between"
            style={{
              padding:      'var(--spacing-md)',
              borderBottom: '1px solid var(--color-border)',
            }}
          >
            <span style={{ fontSize: '14px', color: 'var(--color-on-surface)' }}>
              Notifications
            </span>
            <button
              type="button"
              onClick={() => setNotificationsOn(!notificationsOn)}
              style={{
                width:        '48px',
                height:       '28px',
                borderRadius: 'var(--radius-full)',
                background:   notificationsOn ? 'var(--color-brand-pink)' : 'var(--color-border-strong)',
                border:       'none',
                cursor:       'pointer',
                position:     'relative',
                transition:   'background 0.2s ease',
                flexShrink:   0,
              }}
            >
              <div
                style={{
                  width:        '22px',
                  height:       '22px',
                  borderRadius: 'var(--radius-full)',
                  background:   'white',
                  position:     'absolute',
                  top:          '3px',
                  left:         notificationsOn ? '23px' : '3px',
                  transition:   'left 0.2s ease',
                  boxShadow:    'var(--shadow-sm)',
                }}
              />
            </button>
          </div>

          {/* Sync Status */}
          <div
            className="flex items-center justify-between"
            style={{ padding: 'var(--spacing-md)' }}
          >
            <span style={{ fontSize: '14px', color: 'var(--color-on-surface)' }}>
              Sync Status
            </span>
            <span style={{ fontSize: '12px', color: 'var(--color-on-surface-secondary)' }}>
              Last synced: 10 minutes ago
            </span>
          </div>
        </div>

        {/* ── Quick Access ──────────────────────────────────────────────────── */}
        <div style={sectionLabelStyle}>Quick Access</div>
        <div
          style={{
            background:   'var(--color-surface)',
            borderRadius: 'var(--radius-xl)',
            border:       '1px solid var(--color-border)',
            marginLeft:   'var(--spacing-md)',
            marginRight:  'var(--spacing-md)',
            overflow:     'hidden',
          }}
        >
          {['Change Password', 'Help & Support', 'About Application'].map((item, index, arr) => (
            <button
              key={item}
              type="button"
              className="flex items-center justify-between"
              style={{
                width:        '100%',
                padding:      'var(--spacing-md)',
                background:   'transparent',
                border:       'none',
                borderBottom: index < arr.length - 1 ? '1px solid var(--color-border)' : 'none',
                cursor:       'pointer',
                textAlign:    'left',
              }}
            >
              <span style={{ fontSize: '14px', color: 'var(--color-on-surface)' }}>
                {item}
              </span>
              <ChevronRight size={18} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
            </button>
          ))}
        </div>

        {/* ── Logout Button ─────────────────────────────────────────────────── */}
        <button
          type="button"
          onClick={() => router.push('/login')}
          className="flex items-center justify-center"
          style={{
            width:          'calc(100% - 2 * var(--spacing-md))',
            marginLeft:     'var(--spacing-md)',
            marginRight:    'var(--spacing-md)',
            marginTop:      'var(--spacing-lg)',
            height:         '48px',
            background:     'transparent',
            color:          'var(--color-brand-pink)',
            border:         '1.5px solid var(--color-brand-pink)',
            borderRadius:   'var(--radius-full)',
            fontSize:       '15px',
            fontWeight:     600,
            cursor:         'pointer',
            gap:            'var(--spacing-sm)',
          }}
        >
          Logout
        </button>

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

          const isProfile = item.label === 'PROFILE'

          const innerContent = (
            <>
              {isProfile && item.active ? (
                <div
                  className="flex items-center justify-center rounded-full"
                  style={{
                    width:      '36px',
                    height:     '36px',
                    background: 'var(--color-brand-pink)',
                    color:      'white',
                  }}
                >
                  <Icon size={20} fill="currentColor" />
                </div>
              ) : (
                <Icon
                  size={22}
                  fill={item.active ? 'currentColor' : 'none'}
                />
              )}
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
