'use client'

import { useState } from 'react'
import { X } from 'lucide-react'
import { useAuth } from '@/lib/auth-context'
import { cn } from '@/lib/utils'

export function AuthModal() {
  const { isModalOpen, closeModal, user, signIn, signUp, signOut } = useAuth()
  const [mode, setMode] = useState<'login' | 'register'>('login')
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      if (mode === 'login') {
        await signIn(email, password)
      } else {
        await signUp(name, email, password)
      }
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Something went wrong')
    } finally {
      setLoading(false)
    }
  }

  if (!isModalOpen) return null

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div
        onClick={closeModal}
        className="absolute inset-0 bg-background/80 backdrop-blur-sm"
      />
      <div
        role="dialog"
        aria-label="Collector membership"
        className="relative w-full max-w-md border border-border bg-card p-8 md:p-10"
      >
        <button
          type="button"
          onClick={closeModal}
          aria-label="Close"
          className="absolute right-5 top-5 text-muted-foreground hover:text-foreground"
        >
          <X className="size-5" />
        </button>

        {user ? (
          <div className="text-center">
            <p className="text-[10px] uppercase tracking-luxe text-accent">
              Collector
            </p>
            <h2 className="mt-4 font-serif text-3xl">{user.name}</h2>
            <p className="mt-2 text-sm text-muted-foreground">{user.email}</p>
            <p className="mt-6 text-sm leading-relaxed text-muted-foreground">
              Your AR licences and provenance certificates live in your private
              vault. New drops open to you 48 hours before public release.
            </p>
            <button
              type="button"
              onClick={() => {
                signOut()
                closeModal()
              }}
              className="mt-8 w-full border border-border py-3 text-[11px] uppercase tracking-luxe-sm transition-colors hover:border-accent hover:text-accent"
            >
              Sign out
            </button>
          </div>
        ) : (
          <>
            <p className="text-[10px] uppercase tracking-luxe text-accent">
              The 1111 Project
            </p>
            <h2 className="mt-4 font-serif text-3xl">
              {mode === 'login' ? 'Collector access' : 'Become a collector'}
            </h2>
            <p className="mt-2 text-sm text-muted-foreground">
              {mode === 'login'
                ? 'Sign in to your vault of editions and AR licences.'
                : 'Create an account for early access to every drop.'}
            </p>

            <form onSubmit={onSubmit} className="mt-8 space-y-5">
              {mode === 'register' && (
                <Field
                  id="auth-name"
                  label="Full name"
                  type="text"
                  value={name}
                  onChange={setName}
                  autoComplete="name"
                />
              )}
              <Field
                id="auth-email"
                label="Email"
                type="email"
                value={email}
                onChange={setEmail}
                autoComplete="email"
              />
              <Field
                id="auth-password"
                label="Password"
                type="password"
                value={password}
                onChange={setPassword}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
              />

              {error && <p className="text-xs text-destructive">{error}</p>}

              <button
                type="submit"
                disabled={loading}
                className="w-full bg-primary py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
              >
                {loading
                  ? 'One moment…'
                  : mode === 'login'
                    ? 'Sign in'
                    : 'Create account'}
              </button>
            </form>

            <p className="mt-6 text-center text-sm text-muted-foreground">
              {mode === 'login' ? 'New to Ouverture?' : 'Already a collector?'}{' '}
              <button
                type="button"
                onClick={() => {
                  setMode(mode === 'login' ? 'register' : 'login')
                  setError(null)
                }}
                className="text-accent underline-offset-4 hover:underline"
              >
                {mode === 'login' ? 'Request membership' : 'Sign in'}
              </button>
            </p>
          </>
        )}
      </div>
    </div>
  )
}

function Field({
  id,
  label,
  type,
  value,
  onChange,
  autoComplete,
}: {
  id: string
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  autoComplete?: string
}) {
  return (
    <div>
      <label
        htmlFor={id}
        className={cn('text-[10px] uppercase tracking-luxe-sm text-muted-foreground')}
      >
        {label}
      </label>
      <input
        id={id}
        type={type}
        required
        value={value}
        autoComplete={autoComplete}
        onChange={(e) => onChange(e.target.value)}
        className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent"
      />
    </div>
  )
}
