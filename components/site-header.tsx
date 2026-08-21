'use client'

import Link from 'next/link'
import { usePathname } from 'next/navigation'
import { useEffect, useState } from 'react'
import { Menu, ShoppingBag, User, X } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'

const NAV = [
  { href: '/collection', label: 'The Collection' },
  { href: '/ar', label: 'AR Experience' },
  { href: '/about', label: 'Ouverture' },
]

export function SiteHeader() {
  const pathname = usePathname()
  const [scrolled, setScrolled] = useState(false)
  const [mobileOpen, setMobileOpen] = useState(false)
  const { count, openCart } = useCart()
  const { user, openModal } = useAuth()

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  useEffect(() => {
    setMobileOpen(false)
  }, [pathname])

  return (
    <header
      className={cn(
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        scrolled || mobileOpen
          ? 'border-b border-border bg-background/85 backdrop-blur-md'
          : 'border-b border-transparent',
      )}
    >
      <div className="mx-auto flex h-16 max-w-7xl items-center justify-between px-5 md:h-20 md:px-8">
        <div className="flex items-center gap-3 md:w-64">
          <button
            type="button"
            aria-label="Open menu"
            className="md:hidden"
            onClick={() => setMobileOpen((o) => !o)}
          >
            {mobileOpen ? <X className="size-5" /> : <Menu className="size-5" />}
          </button>
          <nav className="hidden items-center gap-8 md:flex" aria-label="Primary">
            {NAV.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className={cn(
                  'text-[11px] uppercase tracking-luxe-sm text-muted-foreground transition-colors hover:text-foreground',
                  pathname.startsWith(item.href) && 'text-foreground',
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        </div>

        <Link
          href="/"
          className="flex flex-col items-center leading-none"
          aria-label="The 1111 Project by Ouverture — home"
        >
          <span className="font-serif text-xl font-medium tracking-[0.22em] md:text-2xl">
            OUVERTURE
          </span>
          <span className="mt-1 text-[9px] uppercase tracking-luxe text-muted-foreground">
            The 1111 Project
          </span>
        </Link>

        <div className="flex items-center justify-end gap-5 md:w-64">
          <button
            type="button"
            onClick={openModal}
            className="hidden items-center gap-2 text-[11px] uppercase tracking-luxe-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            <User className="size-4" />
            <span>{user ? user.name.split(' ')[0] : 'Members'}</span>
          </button>
          <button
            type="button"
            onClick={openCart}
            aria-label={`Cart, ${count} items`}
            className="relative text-muted-foreground transition-colors hover:text-foreground"
          >
            <ShoppingBag className="size-5" />
            {count > 0 && (
              <span className="absolute -right-2 -top-2 flex size-4 items-center justify-center rounded-full bg-accent text-[9px] font-medium text-accent-foreground">
                {count}
              </span>
            )}
          </button>
        </div>
      </div>

      {mobileOpen && (
        <nav
          className="flex flex-col gap-1 border-t border-border px-5 pb-6 pt-2 md:hidden"
          aria-label="Mobile"
        >
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="py-3 font-serif text-2xl"
            >
              {item.label}
            </Link>
          ))}
          <button
            type="button"
            onClick={() => {
              setMobileOpen(false)
              openModal()
            }}
            className="py-3 text-left font-serif text-2xl"
          >
            {user ? user.name : 'Collector Membership'}
          </button>
        </nav>
      )}
    </header>
  )
}
