'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { Globe, Plus, User, Lock, Eye, EyeOff } from 'lucide-react'
import { useUIStore } from '@/store/ui'

export default function LoginPage() {
  const router = useRouter()
  const { setAuthenticated } = useUIStore()
  const [showPassword, setShowPassword] = useState(false)
  const [staffId, setStaffId] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)

  function handleLogin(e: React.FormEvent) {
    e.preventDefault()
    setAuthenticated(true)
    document.cookie = 'momcare-session=staff-demo; path=/; max-age=86400'
    router.push('/dashboard')
  }

  return (
    <div className="relative flex flex-col items-center w-full overflow-hidden px-[var(--spacing-xl)] pt-[var(--spacing-lg)]">

      {/* Language selector */}
      <div className="absolute top-[var(--spacing-lg)] right-[var(--spacing-xl)] flex items-center gap-1 cursor-pointer"
        style={{ color: 'var(--color-on-surface-secondary)', fontSize: '12px' }}>
        <Globe size={14} />
        <span>EN</span>
      </div>

      {/* Decorative pink blob */}
      <div
        className="absolute w-[200px] h-[200px] rounded-full pointer-events-none"
        style={{
          background: 'var(--color-brand-pink-light)',
          opacity: 0.3,
          filter: 'blur(40px)',
          top: '-40px',
          right: '20px',
        }}
      />

      {/* Spacing above plus button */}
      <div className="mt-[var(--spacing-2xl)]" />

      {/* Pink circular plus button */}
      <div
        className="flex items-center justify-center rounded-full"
        style={{
          width: '72px',
          height: '72px',
          background: 'var(--color-brand-pink)',
          boxShadow: 'var(--shadow-md)',
        }}
      >
        <Plus size={32} strokeWidth={2.5} color="white" />
      </div>

      {/* Heading */}
      <h1
        className="mt-[var(--spacing-md)] text-[22px] font-bold text-center"
        style={{
          color: 'var(--color-on-surface)',
          fontFamily: 'serif',
        }}
      >
        Maternal Health Clinic Management
      </h1>

      {/* Subheading */}
      <p
        className="mt-[var(--spacing-xs)] text-[11px] uppercase tracking-[2px]"
        style={{ color: 'var(--color-on-surface-secondary)' }}
      >
        CLINIC SYSTEM . SRI LANKA
      </p>

      {/* Form */}
      <form
        onSubmit={handleLogin}
        className="w-full mt-[var(--spacing-xl)] flex flex-col gap-[var(--spacing-md)]"
      >
        {/* Staff ID input */}
        <div
          className="flex items-center gap-[var(--spacing-sm)] rounded-[var(--radius-lg)] px-[var(--spacing-md)]"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            height: '52px',
          }}
        >
          <User size={18} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
          <input
            type="text"
            placeholder="Enter Staff ID"
            value={staffId}
            onChange={(e) => setStaffId(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[14px]"
            style={{
              color: 'var(--color-on-surface)',
              caretColor: 'var(--color-brand-pink)',
            }}
          />
        </div>

        {/* Password input */}
        <div
          className="flex items-center gap-[var(--spacing-sm)] rounded-[var(--radius-lg)] px-[var(--spacing-md)]"
          style={{
            background: 'var(--color-surface)',
            border: '1px solid var(--color-border)',
            height: '52px',
          }}
        >
          <Lock size={18} style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }} />
          <input
            type={showPassword ? 'text' : 'password'}
            placeholder="Enter Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="flex-1 bg-transparent border-none outline-none text-[14px]"
            style={{
              color: 'var(--color-on-surface)',
              caretColor: 'var(--color-brand-pink)',
            }}
          />
          <button
            type="button"
            onClick={() => setShowPassword(!showPassword)}
            className="flex items-center justify-center"
            style={{ color: 'var(--color-on-surface-secondary)', flexShrink: 0 }}
            aria-label={showPassword ? 'Hide password' : 'Show password'}
          >
            {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
          </button>
        </div>

        {/* Remember me */}
        <div className="mt-[var(--spacing-sm)] flex items-center gap-[var(--spacing-sm)]">
          <input
            type="checkbox"
            id="remember-me"
            checked={rememberMe}
            onChange={(e) => setRememberMe(e.target.checked)}
            style={{ accentColor: 'var(--color-brand-pink)', width: '16px', height: '16px' }}
          />
          <label
            htmlFor="remember-me"
            className="text-[14px] cursor-pointer"
            style={{ color: 'var(--color-on-surface)' }}
          >
            Remember me
          </label>
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="mt-[var(--spacing-lg)] w-full font-semibold text-[16px] text-white"
          style={{
            height: '52px',
            borderRadius: 'var(--radius-full)',
            background: 'var(--color-brand-pink)',
            boxShadow: 'var(--shadow-md)',
            border: 'none',
            cursor: 'pointer',
          }}
        >
          Login
        </button>
      </form>

      {/* Links row */}
      <div
        className="mt-[var(--spacing-md)] text-[13px] text-center"
        style={{ color: 'var(--color-brand-pink)' }}
      >
        <button
          type="button"
          onClick={() => console.log('Forgot password')}
          className="bg-transparent border-none cursor-pointer text-[13px]"
          style={{ color: 'var(--color-brand-pink)' }}
        >
          Forgot Password
        </button>
        <span className="mx-[var(--spacing-sm)]" style={{ color: 'var(--color-on-surface-secondary)' }}>|</span>
        <button
          type="button"
          onClick={() => console.log('Contact admin')}
          className="bg-transparent border-none cursor-pointer text-[13px]"
          style={{ color: 'var(--color-brand-pink)' }}
        >
          Contact Administrator
        </button>
      </div>

      {/* Info card */}
      <div
        className="mt-[var(--spacing-xl)] w-full text-center text-[13px]"
        style={{
          border: '1px solid var(--color-border)',
          borderRadius: 'var(--radius-lg)',
          padding: 'var(--spacing-md)',
          background: 'var(--color-surface)',
          color: 'var(--color-on-surface-secondary)',
        }}
      >
        Maternal Health Clinic System helps healthcare workers manage maternal records, clinic schedules, and antenatal care efficiently.
      </div>

      {/* Footer */}
      <div
        className="mt-[var(--spacing-lg)] pb-[var(--spacing-xl)] flex flex-col items-center gap-[var(--spacing-xs)]"
        style={{ color: 'var(--color-on-surface-secondary)', fontSize: '11px' }}
      >
        <div
          className="flex items-center justify-center rounded-full"
          style={{
            width: '28px',
            height: '28px',
            background: 'var(--color-brand-pink)',
            fontSize: '8px',
            color: 'white',
            fontWeight: 600,
          }}
        >
          MoH
        </div>
        <span>Ministry of Health - Sri Lanka</span>
        <span>Version 1.0</span>
      </div>

    </div>
  )
}
