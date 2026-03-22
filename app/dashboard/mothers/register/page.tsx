'use client'

import { useState, useRef, useEffect } from 'react'
import { createPortal } from 'react-dom'
import { useRouter } from 'next/navigation'
import Link from 'next/link'
import {
  ArrowLeft,
  Home,
  Users,
  Building2,
  FileText,
  UserCircle,
  ChevronDown,
  Check,
  CalendarDays,
  UserPlus,
} from 'lucide-react'
import { db } from '@/lib/mock/db'
import { COMMUNITIES, CLINICS } from '@/lib/mock/factories/mother.factory'

// ─── Constants ────────────────────────────────────────────────────────────────

const NAV_ITEMS = [
  { icon: Home,       label: 'HOME',    href: '/dashboard',         active: false },
  { icon: Users,      label: 'MOTHERS', href: '/dashboard/mothers', active: true  },
  { icon: Building2,  label: 'CLINICS', href: '/dashboard/clinics', active: false },
  { icon: FileText,   label: 'RECORDS', href: '/dashboard/records', active: false },
  { icon: UserCircle, label: 'PROFILE', href: '/dashboard/profile',                 active: false },
]

const TRIMESTER_OPTIONS = [
  { value: '1', label: '1st Trimester' },
  { value: '2', label: '2nd Trimester' },
  { value: '3', label: '3rd Trimester' },
]

const PREGNANCY_TYPE_OPTIONS = [
  { value: 'normal',    label: 'Normal' },
  { value: 'high-risk', label: 'High Risk' },
  { value: 'multiple',  label: 'Multiple' },
]

const RISK_LEVEL_OPTIONS = [
  { value: 'low',    label: 'Low Risk' },
  { value: 'medium', label: 'Medium Risk' },
  { value: 'high',   label: 'High Risk' },
]

const MIDWIFE_OPTIONS = db.staff
  .filter((s) => s.role === 'midwife')
  .map((s) => ({ value: s.id, label: s.name }))

// If no midwives, fall back to all staff
const STAFF_OPTIONS = MIDWIFE_OPTIONS.length > 0
  ? MIDWIFE_OPTIONS
  : db.staff.map((s) => ({ value: s.id, label: s.name }))

// ─── Helpers ──────────────────────────────────────────────────────────────────

function addDays(dateStr: string, days: number): string {
  const date = new Date(dateStr)
  date.setDate(date.getDate() + days)
  return date.toISOString().split('T')[0]
}

function generateId(): string {
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, (c) => {
    const r = (Math.random() * 16) | 0
    const v = c === 'x' ? r : (r & 0x3) | 0x8
    return v.toString(16)
  })
}

// ─── Inline Dropdown component ────────────────────────────────────────────────
// Full-width dropdown that matches wireframe style (no label above, just placeholder inside)

interface DropdownProps {
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  placeholder: string
  accentBorder?: boolean // for risk level yellow border
}

function Dropdown({ value, options, onChange, placeholder, accentBorder }: DropdownProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLDivElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, left: 0, width: 0 })

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setDropdownPos({ top: rect.bottom + 4, left: rect.left, width: rect.width })
    }
  }, [open])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const selectedLabel = options.find((o) => o.value === value)?.label

  return (
    <div ref={triggerRef}>
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center"
        style={{
          width:        '100%',
          height:       '46px',
          paddingLeft:  'var(--spacing-md)',
          paddingRight: 'var(--spacing-md)',
          background:   'var(--color-surface)',
          borderRadius: 'var(--radius-lg)',
          border:       accentBorder
            ? '1.5px solid var(--color-warning)'
            : '1px solid var(--color-border)',
          cursor:       'pointer',
          textAlign:    'left',
        }}
      >
        <span
          className="flex-1"
          style={{
            fontSize: '14px',
            color:    value ? 'var(--color-on-surface)' : 'var(--color-on-surface-secondary)',
          }}
        >
          {selectedLabel || placeholder}
        </span>
        <ChevronDown
          size={16}
          style={{
            color:      'var(--color-on-surface-secondary)',
            flexShrink: 0,
            transform:  open ? 'rotate(180deg)' : 'none',
            transition: 'transform 0.2s',
          }}
        />
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position:     'fixed',
            top:          dropdownPos.top,
            left:         dropdownPos.left,
            width:        dropdownPos.width,
            maxHeight:    '200px',
            overflowY:    'auto',
            background:   'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            border:       '1px solid var(--color-border)',
            boxShadow:    'var(--shadow-md)',
            zIndex:       100,
            padding:      'var(--spacing-xs) 0',
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              className="flex items-center"
              style={{
                width:      '100%',
                textAlign:  'left',
                padding:    'var(--spacing-sm) var(--spacing-md)',
                fontSize:   '14px',
                color:      opt.value === value ? 'var(--color-primary)' : 'var(--color-on-surface)',
                fontWeight: opt.value === value ? 600 : 400,
                background: opt.value === value ? 'var(--color-primary-light)' : 'transparent',
                border:     'none',
                cursor:     'pointer',
                gap:        'var(--spacing-sm)',
              }}
            >
              {opt.label}
              {opt.value === value && <Check size={14} style={{ marginLeft: 'auto' }} />}
            </button>
          ))}
        </div>,
        document.body,
      )}
    </div>
  )
}

// ─── Compact Dropdown (for Clinic Assignment row layout) ──────────────────────

interface CompactDropdownProps {
  value: string
  options: { value: string; label: string }[]
  onChange: (value: string) => void
  placeholder: string
}

function CompactDropdown({ value, options, onChange, placeholder }: CompactDropdownProps) {
  const [open, setOpen] = useState(false)
  const triggerRef = useRef<HTMLButtonElement>(null)
  const dropdownRef = useRef<HTMLDivElement>(null)
  const [dropdownPos, setDropdownPos] = useState({ top: 0, right: 0, width: 0 })

  useEffect(() => {
    if (open && triggerRef.current) {
      const rect = triggerRef.current.getBoundingClientRect()
      setDropdownPos({ top: rect.bottom + 4, right: window.innerWidth - rect.right, width: Math.max(rect.width, 180) })
    }
  }, [open])

  useEffect(() => {
    function handleClickOutside(e: MouseEvent) {
      const target = e.target as Node
      if (
        triggerRef.current && !triggerRef.current.contains(target) &&
        dropdownRef.current && !dropdownRef.current.contains(target)
      ) {
        setOpen(false)
      }
    }
    if (open) document.addEventListener('mousedown', handleClickOutside)
    return () => document.removeEventListener('mousedown', handleClickOutside)
  }, [open])

  const selectedLabel = options.find((o) => o.value === value)?.label

  return (
    <>
      <button
        ref={triggerRef}
        type="button"
        onClick={() => setOpen(!open)}
        className="flex items-center"
        style={{
          gap:        '4px',
          fontSize:   '13px',
          color:      value ? 'var(--color-on-surface)' : 'var(--color-on-surface-secondary)',
          background: 'none',
          border:     'none',
          cursor:     'pointer',
          padding:    0,
          whiteSpace: 'nowrap',
        }}
      >
        {selectedLabel || placeholder}
        <ChevronDown size={14} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
      </button>

      {open && typeof document !== 'undefined' && createPortal(
        <div
          ref={dropdownRef}
          style={{
            position:     'fixed',
            top:          dropdownPos.top,
            right:        dropdownPos.right,
            width:        dropdownPos.width,
            maxHeight:    '200px',
            overflowY:    'auto',
            background:   'var(--color-surface)',
            borderRadius: 'var(--radius-lg)',
            border:       '1px solid var(--color-border)',
            boxShadow:    'var(--shadow-md)',
            zIndex:       100,
            padding:      'var(--spacing-xs) 0',
          }}
        >
          {options.map((opt) => (
            <button
              key={opt.value}
              type="button"
              onClick={() => { onChange(opt.value); setOpen(false) }}
              style={{
                display:    'block',
                width:      '100%',
                textAlign:  'left',
                padding:    'var(--spacing-sm) var(--spacing-md)',
                fontSize:   '13px',
                color:      opt.value === value ? 'var(--color-primary)' : 'var(--color-on-surface)',
                fontWeight: opt.value === value ? 600 : 400,
                background: opt.value === value ? 'var(--color-primary-light)' : 'transparent',
                border:     'none',
                cursor:     'pointer',
              }}
            >
              {opt.label}
            </button>
          ))}
        </div>,
        document.body,
      )}
    </>
  )
}

// ─── Page ─────────────────────────────────────────────────────────────────────

export default function RegisterMotherPage() {
  const router = useRouter()

  // Mother Information
  const [fullName, setFullName]       = useState('')
  const [nicNumber, setNicNumber]     = useState('')
  const [dateOfBirth, setDateOfBirth] = useState('')
  const [contactNumber, setContactNumber] = useState('')
  const [homeAddress, setHomeAddress] = useState('')

  // Pregnancy Information
  const [pregRegistrationDate, setPregRegistrationDate] = useState('')
  const [edd, setEdd]                 = useState('')
  const [trimester, setTrimester]     = useState('')
  const [pregnancyType, setPregnancyType] = useState('')

  // Clinic Assignment
  const [mohClinic, setMohClinic]     = useState('')
  const [phmArea, setPhmArea]         = useState('')
  const [assignedMidwife, setAssignedMidwife] = useState('')

  // Risk Information
  const [riskLevel, setRiskLevel]     = useState('')
  const [riskNotes, setRiskNotes]     = useState('')

  // UI state
  const [errors, setErrors]             = useState<Record<string, string>>({})
  const [showSuccess, setShowSuccess]   = useState(false)
  const [isSubmitting, setIsSubmitting] = useState(false)

  function validate(): boolean {
    const newErrors: Record<string, string> = {}
    if (!fullName.trim())      newErrors.fullName = 'Required'
    if (!nicNumber.trim())     newErrors.nicNumber = 'Required'
    if (!dateOfBirth)          newErrors.dateOfBirth = 'Required'
    if (!contactNumber.trim()) newErrors.contactNumber = 'Required'
    if (!mohClinic)            newErrors.mohClinic = 'Required'
    if (!phmArea)              newErrors.phmArea = 'Required'
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault()
    if (!validate() || isSubmitting) return

    setIsSubmitting(true)

    const staffId = assignedMidwife || db.staff[0]?.id || ''

    const newMother = {
      id:               generateId(),
      name:             fullName.trim(),
      dateOfBirth,
      phone:            contactNumber.trim(),
      community:        phmArea || 'Colombo',
      nationalId:       nicNumber.trim(),
      riskLevel:        (riskLevel || 'low') as 'high' | 'medium' | 'low',
      lmpDate:          pregRegistrationDate || new Date().toISOString().split('T')[0],
      edd:              edd || addDays(pregRegistrationDate || new Date().toISOString().split('T')[0], 280),
      assignedStaffId:  staffId,
      assignedClinicId: mohClinic || CLINICS[0],
      createdAt:        new Date().toISOString(),
      lastVisitDate:    null,
    }

    db.mothers.unshift(newMother)

    setShowSuccess(true)
    setTimeout(() => {
      router.push('/dashboard/mothers')
    }, 1800)
  }

  // ── Shared styles ───────────────────────────────────────────────────────────

  const textInputStyle = (hasError?: boolean): React.CSSProperties => ({
    width:        '100%',
    height:       '46px',
    paddingLeft:  'var(--spacing-md)',
    paddingRight: 'var(--spacing-md)',
    background:   'var(--color-surface)',
    borderRadius: 'var(--radius-lg)',
    border:       hasError ? '1.5px solid var(--color-error)' : '1px solid var(--color-border)',
    fontSize:     '14px',
    color:        'var(--color-on-surface)',
    outline:      'none',
    boxSizing:    'border-box' as const,
  })

  const dateInputStyle = (hasValue: boolean, hasError?: boolean): React.CSSProperties => ({
    ...textInputStyle(hasError),
    color: hasValue ? 'var(--color-on-surface)' : 'var(--color-on-surface-secondary)',
  })

  const sectionCardStyle: React.CSSProperties = {
    background:   'var(--color-surface)',
    borderRadius: 'var(--radius-xl)',
    border:       '1px solid var(--color-border)',
    borderLeft:   '3px solid var(--color-brand-pink)',
    padding:      'var(--spacing-md)',
    display:      'flex',
    flexDirection: 'column',
    gap:          'var(--spacing-sm)',
  }

  const sectionTitleStyle: React.CSSProperties = {
    fontSize:      '12px',
    fontWeight:    700,
    textTransform: 'uppercase',
    letterSpacing: '0.08em',
    color:         'var(--color-brand-pink)',
    marginBottom:  'var(--spacing-xs)',
  }

  return (
    <div className="flex flex-col h-dvh overflow-hidden" style={{ position: 'relative', background: 'var(--color-surface-secondary)' }}>

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
            color:      'var(--color-on-surface)',
            background: 'none',
            border:     'none',
            cursor:     'pointer',
            padding:    0,
          }}
        >
          <ArrowLeft size={22} strokeWidth={1.5} />
        </button>

        <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
          Register Mother
        </span>

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
      </div>

      {/* ── Scrollable Form Content ─────────────────────────────────────────── */}
      <div className="flex-1 overflow-y-auto">
        <form
          onSubmit={handleSubmit}
          style={{
            padding:       'var(--spacing-md)',
            paddingBottom: '120px',
            display:       'flex',
            flexDirection: 'column',
            gap:           'var(--spacing-md)',
          }}
        >
          {/* ── MOTHER INFORMATION ──────────────────────────────────────────── */}
          <div style={sectionCardStyle}>
            <div style={sectionTitleStyle}>Mother Information</div>

            {/* Full Name */}
            <input
              type="text"
              placeholder="Full Name"
              value={fullName}
              onChange={(e) => { setFullName(e.target.value); setErrors((p) => ({ ...p, fullName: '' })) }}
              style={textInputStyle(!!errors.fullName)}
            />

            {/* NIC Number */}
            <input
              type="text"
              placeholder="NIC Number"
              value={nicNumber}
              onChange={(e) => { setNicNumber(e.target.value); setErrors((p) => ({ ...p, nicNumber: '' })) }}
              style={textInputStyle(!!errors.nicNumber)}
            />

            {/* Date of Birth */}
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                placeholder="Date of Birth"
                value={dateOfBirth}
                onChange={(e) => { setDateOfBirth(e.target.value); setErrors((p) => ({ ...p, dateOfBirth: '' })) }}
                style={dateInputStyle(!!dateOfBirth, !!errors.dateOfBirth)}
              />
              {!dateOfBirth && (
                <span
                  style={{
                    position:      'absolute',
                    left:          'var(--spacing-md)',
                    top:           '50%',
                    transform:     'translateY(-50%)',
                    fontSize:      '14px',
                    color:         'var(--color-on-surface-secondary)',
                    pointerEvents: 'none',
                  }}
                >
                  Date of Birth
                </span>
              )}
              <CalendarDays
                size={18}
                style={{
                  position:      'absolute',
                  right:         '14px',
                  top:           '50%',
                  transform:     'translateY(-50%)',
                  color:         'var(--color-on-surface-secondary)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Contact Number */}
            <input
              type="tel"
              placeholder="Contact Number"
              value={contactNumber}
              onChange={(e) => { setContactNumber(e.target.value); setErrors((p) => ({ ...p, contactNumber: '' })) }}
              style={textInputStyle(!!errors.contactNumber)}
            />

            {/* Home Address (textarea) */}
            <textarea
              placeholder="Home Address"
              value={homeAddress}
              onChange={(e) => setHomeAddress(e.target.value)}
              rows={3}
              style={{
                width:        '100%',
                paddingLeft:  'var(--spacing-md)',
                paddingRight: 'var(--spacing-md)',
                paddingTop:   'var(--spacing-sm)',
                paddingBottom: 'var(--spacing-sm)',
                background:   'var(--color-surface)',
                borderRadius: 'var(--radius-lg)',
                border:       '1px solid var(--color-border)',
                fontSize:     '14px',
                color:        'var(--color-on-surface)',
                outline:      'none',
                resize:       'none',
                fontFamily:   'inherit',
                boxSizing:    'border-box',
              }}
            />
          </div>

          {/* ── PREGNANCY INFORMATION ──────────────────────────────────────── */}
          <div style={sectionCardStyle}>
            <div style={sectionTitleStyle}>Pregnancy Information</div>

            {/* Pregnancy Registration Date */}
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={pregRegistrationDate}
                onChange={(e) => setPregRegistrationDate(e.target.value)}
                style={dateInputStyle(!!pregRegistrationDate)}
              />
              {!pregRegistrationDate && (
                <span
                  style={{
                    position:      'absolute',
                    left:          'var(--spacing-md)',
                    top:           '50%',
                    transform:     'translateY(-50%)',
                    fontSize:      '14px',
                    color:         'var(--color-on-surface-secondary)',
                    pointerEvents: 'none',
                  }}
                >
                  Pregnancy Registration Date
                </span>
              )}
              <CalendarDays
                size={18}
                style={{
                  position:      'absolute',
                  right:         '14px',
                  top:           '50%',
                  transform:     'translateY(-50%)',
                  color:         'var(--color-on-surface-secondary)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Estimated Delivery Date (EDD) */}
            <div style={{ position: 'relative' }}>
              <input
                type="date"
                value={edd}
                onChange={(e) => setEdd(e.target.value)}
                style={dateInputStyle(!!edd)}
              />
              {!edd && (
                <span
                  style={{
                    position:      'absolute',
                    left:          'var(--spacing-md)',
                    top:           '50%',
                    transform:     'translateY(-50%)',
                    fontSize:      '14px',
                    color:         'var(--color-on-surface-secondary)',
                    pointerEvents: 'none',
                  }}
                >
                  Estimated Delivery Date (EDD)
                </span>
              )}
              <CalendarDays
                size={18}
                style={{
                  position:      'absolute',
                  right:         '14px',
                  top:           '50%',
                  transform:     'translateY(-50%)',
                  color:         'var(--color-on-surface-secondary)',
                  pointerEvents: 'none',
                }}
              />
            </div>

            {/* Select Trimester */}
            <Dropdown
              value={trimester}
              options={TRIMESTER_OPTIONS}
              onChange={setTrimester}
              placeholder="Select Trimester"
            />

            {/* Select Pregnancy Type */}
            <Dropdown
              value={pregnancyType}
              options={PREGNANCY_TYPE_OPTIONS}
              onChange={setPregnancyType}
              placeholder="Select Pregnancy Type"
            />
          </div>

          {/* ── CLINIC ASSIGNMENT ──────────────────────────────────────────── */}
          <div style={sectionCardStyle}>
            <div style={sectionTitleStyle}>Clinic Assignment</div>

            {/* MOH Clinic row */}
            <div
              className="flex items-center justify-between"
              style={{
                paddingTop:    'var(--spacing-sm)',
                paddingBottom: 'var(--spacing-sm)',
                borderBottom:  '1px solid var(--color-border)',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-on-surface)' }}>
                MOH Clinic
              </span>
              <CompactDropdown
                value={mohClinic}
                options={CLINICS.map((c) => ({ value: c, label: c }))}
                onChange={(v) => { setMohClinic(v); setErrors((p) => ({ ...p, mohClinic: '' })) }}
                placeholder="Select Clinic"
              />
            </div>

            {/* PHM Area row */}
            <div
              className="flex items-center justify-between"
              style={{
                paddingTop:    'var(--spacing-sm)',
                paddingBottom: 'var(--spacing-sm)',
                borderBottom:  '1px solid var(--color-border)',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-on-surface)' }}>
                PHM Area
              </span>
              <CompactDropdown
                value={phmArea}
                options={COMMUNITIES.map((c) => ({ value: c, label: c }))}
                onChange={(v) => { setPhmArea(v); setErrors((p) => ({ ...p, phmArea: '' })) }}
                placeholder="Select Area"
              />
            </div>

            {/* Assigned Midwife row */}
            <div
              className="flex items-center justify-between"
              style={{
                paddingTop:    'var(--spacing-sm)',
                paddingBottom: 'var(--spacing-sm)',
              }}
            >
              <span style={{ fontSize: '14px', fontWeight: 500, color: 'var(--color-on-surface)' }}>
                Assigned Midwife
              </span>
              <CompactDropdown
                value={assignedMidwife}
                options={STAFF_OPTIONS}
                onChange={setAssignedMidwife}
                placeholder="Select Midwife"
              />
            </div>
          </div>

          {/* ── RISK INFORMATION ───────────────────────────────────────────── */}
          <div style={sectionCardStyle}>
            <div style={sectionTitleStyle}>Risk Information</div>

            {/* Risk Level dropdown (yellow/amber border) */}
            <Dropdown
              value={riskLevel}
              options={RISK_LEVEL_OPTIONS}
              onChange={setRiskLevel}
              placeholder="Type select risk level"
              accentBorder
            />

            {/* Risk Notes textarea */}
            <textarea
              placeholder="Risk Notes (optional)"
              value={riskNotes}
              onChange={(e) => setRiskNotes(e.target.value)}
              rows={3}
              style={{
                width:         '100%',
                paddingLeft:   'var(--spacing-md)',
                paddingRight:  'var(--spacing-md)',
                paddingTop:    'var(--spacing-sm)',
                paddingBottom: 'var(--spacing-sm)',
                background:    'var(--color-surface)',
                borderRadius:  'var(--radius-lg)',
                border:        '1px solid var(--color-border)',
                fontSize:      '14px',
                color:         'var(--color-on-surface)',
                outline:       'none',
                resize:        'none',
                fontFamily:    'inherit',
                boxSizing:     'border-box',
              }}
            />
          </div>
        </form>
      </div>

      {/* ── Bottom Action Bar (Cancel + Register Mother) ──────────────────── */}
      <div
        className="flex items-center flex-shrink-0"
        style={{
          gap:          'var(--spacing-sm)',
          padding:      'var(--spacing-sm) var(--spacing-md)',
          background:   'var(--color-surface)',
          borderTop:    '1px solid var(--color-border)',
        }}
      >
        {/* Cancel button */}
        <button
          type="button"
          onClick={() => router.back()}
          style={{
            flex:         1,
            height:       '46px',
            background:   'var(--color-surface)',
            color:        'var(--color-on-surface)',
            border:       '1px solid var(--color-border)',
            borderRadius: 'var(--radius-xl)',
            fontSize:     '14px',
            fontWeight:   600,
            cursor:       'pointer',
          }}
        >
          Cancel
        </button>

        {/* Register Mother button */}
        <button
          type="button"
          onClick={handleSubmit as () => void}
          disabled={isSubmitting}
          className="flex items-center justify-center"
          style={{
            flex:         1.4,
            height:       '46px',
            gap:          'var(--spacing-xs)',
            background:   isSubmitting ? 'var(--color-on-surface-secondary)' : 'var(--color-brand-pink)',
            color:        'white',
            border:       'none',
            borderRadius: 'var(--radius-full)',
            fontSize:     '14px',
            fontWeight:   600,
            cursor:       isSubmitting ? 'not-allowed' : 'pointer',
            boxShadow:    'var(--shadow-sm)',
          }}
        >
          <UserPlus size={16} />
          {isSubmitting ? 'Registering...' : 'Register Mother'}
        </button>
      </div>

      {/* ── Bottom Navigation Bar ─────────────────────────────────────────── */}
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

          const iconContent = item.active ? (
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width:      '40px',
                height:     '40px',
                background: 'var(--color-brand-pink)',
                color:      'white',
              }}
            >
              <Icon size={20} fill="currentColor" />
            </div>
          ) : (
            <Icon size={22} />
          )

          const innerContent = (
            <>
              {iconContent}
              <span
                style={{
                  fontSize:   '10px',
                  fontWeight: item.active ? 700 : 500,
                  color:      item.active ? activeColor : inactiveColor,
                }}
              >
                {item.label}
              </span>
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

      {/* ── Success Overlay ──────────────────────────────────────────────────── */}
      {showSuccess && (
        <div
          className="flex items-center justify-center"
          style={{
            position:   'absolute',
            inset:      0,
            background: 'rgba(0, 0, 0, 0.45)',
            zIndex:     200,
          }}
        >
          <div
            className="flex flex-col items-center"
            style={{
              background:   'var(--color-surface)',
              borderRadius: 'var(--radius-xl)',
              padding:      'var(--spacing-xl) var(--spacing-lg)',
              margin:       'var(--spacing-md)',
              boxShadow:    'var(--shadow-lg)',
              textAlign:    'center',
              gap:          'var(--spacing-md)',
              maxWidth:     '300px',
              width:        '100%',
            }}
          >
            <div
              className="flex items-center justify-center rounded-full"
              style={{
                width:      '64px',
                height:     '64px',
                background: 'var(--color-risk-low-bg)',
                color:      'var(--color-success)',
              }}
            >
              <Check size={32} strokeWidth={2.5} />
            </div>
            <span style={{ fontSize: '18px', fontWeight: 700, color: 'var(--color-on-surface)' }}>
              Mother Registered Successfully
            </span>
            <span style={{ fontSize: '14px', color: 'var(--color-on-surface-secondary)' }}>
              Redirecting to Mothers list...
            </span>
          </div>
        </div>
      )}
    </div>
  )
}
