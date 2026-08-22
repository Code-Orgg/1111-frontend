'use client'

import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Instagram, MessageCircle } from 'lucide-react'

const INSTAGRAM_URL = 'https://www.instagram.com/1111byouverture'
const WHATSAPP_NUMBER = '+2349031767617'
const WHATSAPP_URL = `https://wa.me/${WHATSAPP_NUMBER.replace(/[^\d]/g, '')}`

export function SiteFooter() {
  const [email, setEmail] = useState('')
  const [done, setDone] = useState(false)

  return (
    <footer className="border-t border-border bg-background">
      <div className="mx-auto max-w-7xl px-5 py-16 md:px-8 md:py-24">
        <div className="grid gap-12 md:grid-cols-[1.4fr_1fr_1fr]">
          <div>
            <p className="font-serif text-2xl tracking-[0.16em]">OUVERTURE</p>
            <p className="mt-4 max-w-sm text-sm leading-relaxed text-muted-foreground">
              The 1111 Project — limited-edition framed fine art that unlocks
              augmented-reality animation. Each edition is signed, numbered, and
              accompanied by a lifetime AR licence.
            </p>
            <form
              className="mt-8 max-w-sm"
              onSubmit={(e) => {
                e.preventDefault()
                if (email) setDone(true)
              }}
            >
              <label
                htmlFor="footer-email"
                className="text-[10px] uppercase tracking-luxe text-muted-foreground"
              >
                Private viewings & new drops
              </label>
              <div className="mt-3 flex items-center border-b border-border focus-within:border-accent">
                <input
                  id="footer-email"
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="you@studio.com"
                  className="w-full bg-transparent py-2 text-sm outline-none placeholder:text-muted-foreground"
                />
                <button type="submit" aria-label="Subscribe" className="p-2">
                  <ArrowRight className="size-4" />
                </button>
              </div>
              {done && (
                <p className="mt-2 text-xs text-accent">
                  Welcome to the list. We&apos;ll be in touch.
                </p>
              )}
            </form>

            <div className="mt-8 flex items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Ouverture on Instagram"
                className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <Instagram className="size-4" />
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Concierge on WhatsApp"
                className="flex size-9 items-center justify-center border border-border text-muted-foreground transition-colors hover:border-accent hover:text-accent"
              >
                <MessageCircle className="size-4" />
              </a>
            </div>
          </div>

          <FooterCol
            title="Gallery"
            links={[
              { href: '/collection', label: 'The Collection' },
              { href: '/ar', label: 'AR Experience' },
              { href: '/about', label: 'About Ouverture' },
              { href: '/cart', label: 'Cart' },
            ]}
          />
          <div>
            <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">Concierge</p>
            <ul className="mt-5 space-y-3">
              <li>
                <Link href="/about" className="text-sm text-foreground/80 transition-colors hover:text-accent">
                  Press &amp; contact
                </Link>
              </li>
              <li>
                <Link href="/ar" className="text-sm text-foreground/80 transition-colors hover:text-accent">
                  Supported devices
                </Link>
              </li>
              <li>
                <Link href="/collection" className="text-sm text-foreground/80 transition-colors hover:text-accent">
                  Editions &amp; provenance
                </Link>
              </li>
              <li>
                <a
                  href={WHATSAPP_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/80 transition-colors hover:text-accent"
                >
                  WhatsApp concierge
                </a>
              </li>
              <li>
                <a
                  href={INSTAGRAM_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm text-foreground/80 transition-colors hover:text-accent"
                >
                  @1111byouverture
                </a>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-border pt-8 text-[11px] uppercase tracking-luxe-sm text-muted-foreground md:flex-row md:items-center md:justify-between">
          <p>&copy; {new Date().getFullYear()} Ouverture Studio</p>
          <p>Augmented fine art, editioned worldwide</p>
        </div>
      </div>
    </footer>
  )
}

function FooterCol({
  title,
  links,
}: {
  title: string
  links: { href: string; label: string }[]
}) {
  return (
    <div>
      <p className="text-[10px] uppercase tracking-luxe text-muted-foreground">
        {title}
      </p>
      <ul className="mt-5 space-y-3">
        {links.map((l) => (
          <li key={l.label}>
            <Link
              href={l.href}
              className="text-sm text-foreground/80 transition-colors hover:text-accent"
            >
              {l.label}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
}
