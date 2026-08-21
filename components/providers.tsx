'use client'

import type { ReactNode } from 'react'
import { AuthProvider } from '@/lib/auth-context'
import { CartProvider } from '@/lib/cart-context'
import { CartDrawer } from '@/components/cart-drawer'
import { AuthModal } from '@/components/auth-modal'

export function Providers({ children }: { children: ReactNode }) {
  return (
    <AuthProvider>
      <CartProvider>
        {children}
        <CartDrawer />
        <AuthModal />
      </CartProvider>
    </AuthProvider>
  )
}
