'use client'

import Link from 'next/link'
import { useRouter, useSearchParams } from 'next/navigation'
import { useState, Suspense } from 'react'
import { useAuth } from '@/lib/auth-context'
import { ApiError } from '@/lib/api'

function LoginForm() {
  const { signIn } = useAuth()
  const router = useRouter()
  const searchParams = useSearchParams()
  const redirectTo = searchParams.get('redirect') || '/collection'

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setError(null)
    setLoading(true)
    try {
      await signIn(email, password)
      router.push(redirectTo)
    } catch (err) {
      setError(err instanceof ApiError ? err.message : 'Something went wrong. Please try again.')
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="mx-auto flex min-h-[80vh] max-w-md flex-col justify-center px-5 pt-28 pb-16 md:pt-36">
      <p className="text-[11px] uppercase tracking-luxe text-accent">The 1111 Project</p>
      <h1 className="mt-4 font-serif text-4xl font-light md:text-5xl">Collector access</h1>
      <p className="mt-3 text-sm text-muted-foreground">
        Sign in to your vault of editions and AR licences.
      </p>

      <form onSubmit={onSubmit} className="mt-10 space-y-6">
        <Field
          id="login-email"
          label="Email"
          type="email"
          value={email}
          onChange={setEmail}
          autoComplete="email"
        />
        <Field
          id="login-password"
          label="Password"
          type="password"
          value={password}
          onChange={setPassword}
          autoComplete="current-password"
        />

        {error && <p className="text-xs text-destructive">{error}</p>}

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-primary py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
        >
          {loading ? 'Signing in…' : 'Sign in'}
        </button>
      </form>

      <p className="mt-8 text-center text-sm text-muted-foreground">
        New to Ouverture?{' '}
        <Link
          href="/signup"
          className="text-accent underline-offset-4 hover:underline"
        >
          Request membership
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
    </div>
  )
}

export default function LoginPage() {
  return (
    <Suspense fallback={null}>
      <LoginForm />
    </Suspense>
  )
}
