'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useState,
  type ReactNode,
} from 'react'
import type { User } from './types'
import {
  clearToken,
  getToken,
  login as apiLogin,
  register as apiRegister,
} from './api'

interface AuthContextValue {
  user: User | null
  isModalOpen: boolean
  openModal: () => void
  closeModal: () => void
  signIn: (email: string, password: string) => Promise<void>
  signUp: (name: string, email: string, password: string) => Promise<void>
  signOut: () => void
}

const AuthContext = createContext<AuthContextValue | null>(null)
const USER_KEY = 'ouverture_user'

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [isModalOpen, setIsModalOpen] = useState(false)

  useEffect(() => {
    if (!getToken()) return
    try {
      const raw = window.localStorage.getItem(USER_KEY)
      if (raw) setUser(JSON.parse(raw))
    } catch {
      // ignore
    }
  }, [])

  const persist = useCallback((u: User) => {
    setUser(u)
    window.localStorage.setItem(USER_KEY, JSON.stringify(u))
  }, [])

  const signIn = useCallback(
    async (email: string, password: string) => {
      const { user: u } = await apiLogin(email, password)
      persist(u)
      setIsModalOpen(false)
    },
    [persist],
  )

  const signUp = useCallback(
    async (name: string, email: string, password: string) => {
      const { user: u } = await apiRegister(name, email, password)
      persist(u)
      setIsModalOpen(false)
    },
    [persist],
  )

  const signOut = useCallback(() => {
    clearToken()
    window.localStorage.removeItem(USER_KEY)
    setUser(null)
  }, [])

  return (
    <AuthContext.Provider
      value={{
        user,
        isModalOpen,
        openModal: () => setIsModalOpen(true),
        closeModal: () => setIsModalOpen(false),
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  )
}

export function useAuth() {
  const ctx = useContext(AuthContext)
  if (!ctx) throw new Error('useAuth must be used within AuthProvider')
  return ctx
}
