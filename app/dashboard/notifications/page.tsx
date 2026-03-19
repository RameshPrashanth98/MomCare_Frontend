'use client'

import Link from 'next/link'
import { ArrowLeft, SlidersHorizontal, AlertTriangle, Calendar, Syringe, Bell } from 'lucide-react'

// ─── Types ────────────────────────────────────────────────────────────────────

type ButtonVariant = 'filled' | 'outlined'

interface NotificationCard {
  id: string
  iconComponent: React.ElementType
  iconBg: string
  iconColor: string
  title: string
  titleColor: string
  time: string
  details: string[]
  buttonLabel: string
  buttonVariant: ButtonVariant
}

// ─── Mock data ────────────────────────────────────────────────────────────────

const NOTIFICATIONS: NotificationCard[] = [
  {
    id: 'high-risk-1',
    iconComponent: AlertTriangle,
    iconBg: 'var(--color-risk-high-bg)',
    iconColor: 'var(--color-risk-high)',
    title: 'High Risk Alert',
    titleColor: 'var(--color-risk-high)',
    time: '10 minutes ago',
    details: [
      'Mother: Nadeesha Silva',
      'Risk: High Blood Pressure',
      'Assigned Midwife: Malani',
    ],
    buttonLabel: 'View',
    buttonVariant: 'filled',
  },
  {
    id: 'appointment-1',
    iconComponent: Calendar,
    iconBg: 'var(--color-surface-secondary)',
    iconColor: 'var(--color-on-surface-secondary)',
    title: 'Appointment Reminder',
    titleColor: 'var(--color-primary)',
    time: '1 hour ago',
    details: [
      'Samanthi Perera',
      'Clinic: Clinic A',
      'Time: 9:15 AM Today',
    ],
    buttonLabel: 'Mark as Read',
    buttonVariant: 'outlined',
  },
  {
    id: 'vaccine-1',
    iconComponent: Syringe,
    iconBg: 'var(--color-risk-low-bg)',
    iconColor: 'var(--color-warning)',
    title: 'Vaccine Reminder',
    titleColor: 'var(--color-warning)',
    time: '5 hours ago',
    details: [
      'Baby: Kavindu',
      'Next Vaccine: Pentavalent 2',
      'Due Date: 25 Aug',
    ],
    buttonLabel: 'Mark as Read',
    buttonVariant: 'outlined',
  },
  {
    id: 'system-1',
    iconComponent: Bell,
    iconBg: 'var(--color-risk-medium-bg)',
    iconColor: 'var(--color-risk-medium)',
    title: 'System Alert',
    titleColor: 'var(--color-risk-high)',
    time: '1 day ago',
    details: [
      'Monthly clinic report submission due tomorrow',
    ],
    buttonLabel: 'Mark as Read',
    buttonVariant: 'outlined',
  },
]

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function NotificationsPage() {
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
          Notifications
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

      {/* ── Scrollable content ──────────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">

        {/* Filter chips */}
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
          {/* All — active/filled */}
          <div
            style={{
              background:    'var(--color-primary)',
              color:         'white',
              fontSize:      '13px',
              fontWeight:    500,
              paddingLeft:   'var(--spacing-md)',
              paddingRight:  'var(--spacing-md)',
              paddingTop:    'var(--spacing-xs)',
              paddingBottom: 'var(--spacing-xs)',
              borderRadius:  'var(--radius-full)',
              whiteSpace:    'nowrap',
              cursor:        'pointer',
            }}
          >
            All
          </div>

          {/* High-Risk Alerts — outlined */}
          <div
            style={{
              background:    'transparent',
              color:         'var(--color-on-surface-secondary)',
              border:        '1px solid var(--color-border)',
              fontSize:      '13px',
              fontWeight:    500,
              paddingLeft:   'var(--spacing-md)',
              paddingRight:  'var(--spacing-md)',
              paddingTop:    'var(--spacing-xs)',
              paddingBottom: 'var(--spacing-xs)',
              borderRadius:  'var(--radius-full)',
              whiteSpace:    'nowrap',
              cursor:        'pointer',
            }}
          >
            High-Risk Alerts
          </div>

          {/* Appointment Reminders — outlined */}
          <div
            style={{
              background:    'transparent',
              color:         'var(--color-on-surface-secondary)',
              border:        '1px solid var(--color-border)',
              fontSize:      '13px',
              fontWeight:    500,
              paddingLeft:   'var(--spacing-md)',
              paddingRight:  'var(--spacing-md)',
              paddingTop:    'var(--spacing-xs)',
              paddingBottom: 'var(--spacing-xs)',
              borderRadius:  'var(--radius-full)',
              whiteSpace:    'nowrap',
              cursor:        'pointer',
            }}
          >
            Appointment Reminders
          </div>
        </div>

        {/* Section label */}
        <div
          style={{
            fontSize:      '12px',
            fontWeight:    600,
            textTransform: 'uppercase',
            letterSpacing: '0.08em',
            color:         'var(--color-on-surface-secondary)',
            marginTop:     'var(--spacing-lg)',
            paddingLeft:   'var(--spacing-md)',
            paddingRight:  'var(--spacing-md)',
            marginBottom:  'var(--spacing-sm)',
          }}
        >
          Notification List
        </div>

        {/* Notification cards */}
        <div style={{ paddingBottom: 'var(--spacing-lg)' }}>
          {NOTIFICATIONS.map((notification) => {
            const IconComponent = notification.iconComponent
            return (
              <div
                key={notification.id}
                style={{
                  background:    'var(--color-surface)',
                  borderRadius:  'var(--radius-xl)',
                  padding:       'var(--spacing-md)',
                  boxShadow:     'var(--shadow-sm)',
                  marginBottom:  'var(--spacing-sm)',
                  marginLeft:    'var(--spacing-md)',
                  marginRight:   'var(--spacing-md)',
                  border:        '1px solid var(--color-border)',
                }}
              >
                {/* Top row: icon + title + time */}
                <div className="flex items-start" style={{ gap: 'var(--spacing-sm)', marginBottom: 'var(--spacing-sm)' }}>
                  {/* Icon circle */}
                  <div
                    className="flex items-center justify-center flex-shrink-0"
                    style={{
                      width:        '40px',
                      height:       '40px',
                      borderRadius: 'var(--radius-full)',
                      background:   notification.iconBg,
                    }}
                  >
                    <IconComponent
                      size={18}
                      style={{ color: notification.iconColor }}
                    />
                  </div>

                  {/* Title + time */}
                  <div className="flex-1 min-w-0">
                    <div
                      style={{
                        fontSize:   '14px',
                        fontWeight: 600,
                        color:      notification.titleColor,
                        lineHeight: 1.3,
                      }}
                    >
                      {notification.title}
                    </div>
                    <div
                      style={{
                        fontSize:  '12px',
                        color:     'var(--color-on-surface-secondary)',
                        marginTop: '2px',
                      }}
                    >
                      {notification.time}
                    </div>
                  </div>
                </div>

                {/* Detail lines */}
                <div style={{ marginBottom: 'var(--spacing-sm)' }}>
                  {notification.details.map((line, i) => (
                    <div
                      key={i}
                      style={{
                        fontSize:  '13px',
                        color:     'var(--color-on-surface-secondary)',
                        lineHeight: 1.6,
                      }}
                    >
                      {line}
                    </div>
                  ))}
                </div>

                {/* Action button — right-aligned */}
                <div className="flex justify-end">
                  <button
                    type="button"
                    style={
                      notification.buttonVariant === 'filled'
                        ? {
                            background:    'var(--color-primary)',
                            color:         'white',
                            border:        'none',
                            borderRadius:  'var(--radius-full)',
                            fontSize:      '13px',
                            fontWeight:    500,
                            paddingLeft:   'var(--spacing-lg)',
                            paddingRight:  'var(--spacing-lg)',
                            paddingTop:    'var(--spacing-xs)',
                            paddingBottom: 'var(--spacing-xs)',
                            cursor:        'pointer',
                          }
                        : {
                            background:    'transparent',
                            color:         'var(--color-on-surface-secondary)',
                            border:        '1px solid var(--color-border)',
                            borderRadius:  'var(--radius-full)',
                            fontSize:      '13px',
                            fontWeight:    500,
                            paddingLeft:   'var(--spacing-lg)',
                            paddingRight:  'var(--spacing-lg)',
                            paddingTop:    'var(--spacing-xs)',
                            paddingBottom: 'var(--spacing-xs)',
                            cursor:        'pointer',
                          }
                    }
                  >
                    {notification.buttonLabel}
                  </button>
                </div>
              </div>
            )
          })}
        </div>

      </div>
      {/* ── End scrollable content ──────────────────────────────────────────── */}

    </div>
  )
}
