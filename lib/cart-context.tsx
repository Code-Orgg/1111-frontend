'use client'

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from 'react'
import type { CartLine, Product } from './types'
import { FRAMING_OPTIONS } from './demo-data'

interface CartContextValue {
  lines: CartLine[]
  isOpen: boolean
  count: number
  subtotal: number
  openCart: () => void
  closeCart: () => void
  addToCart: (product: Product, framing: string, quantity?: number) => void
  updateQuantity: (id: string, framing: string, quantity: number) => void
  removeLine: (id: string, framing: string) => void
  clearCart: () => void
}

const CartContext = createContext<CartContextValue | null>(null)
const STORAGE_KEY = 'ouverture_cart'

function framingModifier(framing: string) {
  return FRAMING_OPTIONS.find((f) => f.id === framing)?.priceModifier ?? 0
}

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([])
  const [isOpen, setIsOpen] = useState(false)
  const [hydrated, setHydrated] = useState(false)

  useEffect(() => {
    try {
      const raw = window.localStorage.getItem(STORAGE_KEY)
      if (raw) setLines(JSON.parse(raw))
    } catch {
      // ignore malformed storage
    } finally {
      setHydrated(true)
    }
  }, [])

  useEffect(() => {
    // Only persist after the initial load so we never overwrite stored
    // lines with the empty starting state on mount.
    if (!hydrated) return
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines))
  }, [lines, hydrated])

  const addToCart = useCallback(
    (product: Product, framing: string, quantity = 1) => {
      setLines((prev) => {
        const existing = prev.find(
          (l) => l.product.id === product.id && l.framing === framing,
        )
        if (existing) {
          return prev.map((l) =>
            l.product.id === product.id && l.framing === framing
              ? { ...l, quantity: l.quantity + quantity }
              : l,
          )
        }
        return [...prev, { product, framing, quantity }]
      })
      setIsOpen(true)
    },
    [],
  )

  const updateQuantity = useCallback(
    (id: string, framing: string, quantity: number) => {
      setLines((prev) =>
        prev
          .map((l) =>
            l.product.id === id && l.framing === framing
              ? { ...l, quantity: Math.max(0, quantity) }
              : l,
          )
          .filter((l) => l.quantity > 0),
      )
    },
    [],
  )

  const removeLine = useCallback((id: string, framing: string) => {
    setLines((prev) =>
      prev.filter((l) => !(l.product.id === id && l.framing === framing)),
    )
  }, [])

  const clearCart = useCallback(() => setLines([]), [])

  const count = useMemo(
    () => lines.reduce((sum, l) => sum + l.quantity, 0),
    [lines],
  )

  const subtotal = useMemo(
    () =>
      lines.reduce(
        (sum, l) => sum + (l.product.price + framingModifier(l.framing)) * l.quantity,
        0,
      ),
    [lines],
  )

  const value: CartContextValue = {
    lines,
    isOpen,
    count,
    subtotal,
    openCart: () => setIsOpen(true),
    closeCart: () => setIsOpen(false),
    addToCart,
    updateQuantity,
    removeLine,
    clearCart,
  }

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>
}

export function useCart() {
  const ctx = useContext(CartContext)
  if (!ctx) throw new Error('useCart must be used within CartProvider')
  return ctx
}

export function lineTotal(line: CartLine) {
  return (line.product.price + framingModifier(line.framing)) * line.quantity
}
