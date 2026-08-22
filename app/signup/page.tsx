'use client'

import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { useState } from 'react'
import { useAuth } from '@/lib/auth-context'
import { ApiError } from '@/lib/api'

export default function SignupPage() {
  const { signUp } = useAuth()
  const router = useRouter()

  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)

    if (password.length < 8) {
      setError('Password must be at least 8 characters.')
      return
    }

    setLoading(true)
    try {
      await signUp(name, email, password)
      router.push('/collection')
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 pt-28 pb-16 md:pt-36">
      <p className="text-[11px] uppercase tracking-luxe text-accent">The 1111 Project</p>
      <h1 className="mt-4 font-serif text-4xl font-light md:text-5xl">Become a collector</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Create an account for early access to every drop, private viewings, and
        a lifetime AR licence with every acquisition.
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-6">
        <Field
          id="signup-name"
          label="Full name"
          type="text"
          value={name}
          onChange={setName}
          autoComplete="name"
        />
        <Field
          id="signup-email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />
        <Field
          id="signup-password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="new-password"
          hint="At least 8 characters."
        />

        {error && <p className="text-xs text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? 'Creating account…' : 'Create account'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        Already a collector?{' '}
        <Link href="/login" className="text-accent underline-offset-4 hover:underline">
          Sign in
        </Link>
      </p>
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
  hint,
}: {
  id: string
  label: string
  type: string
  value: string
  onChange: (v: string) => void
  autoComplete?: string
  hint?: string
}) {
  return (
    <div>
      <label htmlFor={id} className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground">
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
      {hint && <p className="mt-1.5 text-xs text-muted-foreground">{hint}</p>}
    </div>
  )
}
