'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { Check, Minus, Plus, ScanLine } from 'lucide-react'
import type { Product } from '@/lib/types'
import { FRAMING_OPTIONS } from '@/lib/demo-data'
import { useCart } from '@/lib/cart-context'
import { ARModal } from '@/components/ar-modal'
import { cn } from '@/lib/utils'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export function ArtworkDetail({ product }: { product: Product }) {
  const { addToCart } = useCart()
  const [framing, setFraming] = useState(FRAMING_OPTIONS[0].id)
  const [qty, setQty] = useState(1)
  const [arOpen, setArOpen] = useState(false)

  const sold = product.availability === 'sold'
  const modifier = FRAMING_OPTIONS.find((f) => f.id === framing)?.priceModifier ?? 0
  const unit = product.price + modifier
  const pctClaimed = Math.round(
    ((product.editionSize - product.editionRemaining) / product.editionSize) * 100,
  )

  return (
    <>
      <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
        {/* Image */}
        <div className="lg:sticky lg:top-28 lg:self-start">
          <div className="group relative aspect-[4/5] overflow-hidden bg-secondary">
            <Image
              src={product.image || '/placeholder.svg'}
              alt={`${product.title} by Ouverture`}
              fill
              priority
              sizes="(min-width: 1024px) 45vw, 100vw"
              className="object-cover"
            />
            <button
              type="button"
              onClick={() => setArOpen(true)}
              className="absolute bottom-5 left-5 flex items-center gap-2 bg-background/80 px-4 py-3 text-[11px] uppercase tracking-luxe-sm backdrop-blur-sm transition-colors hover:bg-accent hover:text-accent-foreground"
            >
              <ScanLine className="size-4" />
              View in AR
            </button>
          </div>
          <p className="mt-4 text-center text-[10px] uppercase tracking-luxe-sm text-muted-foreground">
            {product.medium} · {product.dimensions}
          </p>
        </div>

        {/* Details */}
        <div>
          <Link
            href="/collection"
            className="text-[11px] uppercase tracking-luxe-sm text-muted-foreground transition-colors hover:text-foreground"
          >
            ← The Collection
          </Link>

          <p className="mt-6 text-[11px] uppercase tracking-luxe text-accent">
            {product.series} · {product.year}
          </p>
          <h1 className="mt-4 font-serif text-5xl font-light leading-tight md:text-6xl">
            {product.title}
          </h1>
          <p className="mt-5 font-serif text-3xl">{fmt(unit)}</p>

          {/* Edition counter */}
          <div className="mt-8 border border-border p-5">
            <div className="flex items-center justify-between text-[11px] uppercase tracking-luxe-sm">
              <span className="text-muted-foreground">Edition</span>
              <span className={cn(sold ? 'text-muted-foreground' : 'text-accent')}>
                {sold
                  ? 'Sold out'
                  : `${product.editionRemaining} of ${product.editionSize} remaining`}
              </span>
            </div>
            <div className="mt-4 h-px w-full bg-border">
              <div
                className="h-px bg-accent transition-all"
                style={{ width: `${Math.max(4, pctClaimed)}%` }}
              />
            </div>
            <p className="mt-3 text-xs text-muted-foreground">
              {pctClaimed}% of this edition has been acquired.
            </p>
          </div>

          {/* Framing */}
          <div className="mt-8">
            <p className="mb-4 text-[10px] uppercase tracking-luxe text-muted-foreground">
              Framing
            </p>
            <div className="grid grid-cols-2 gap-3">
              {FRAMING_OPTIONS.map((f) => (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setFraming(f.id)}
                  className={cn(
                    'flex items-center justify-between border px-4 py-3 text-left text-sm transition-colors',
                    framing === f.id
                      ? 'border-accent text-foreground'
                      : 'border-border text-muted-foreground hover:border-foreground/40',
                  )}
                >
                  <span>{f.label}</span>
                  {f.priceModifier !== 0 && (
                    <span className="text-xs tabular-nums">
                      {f.priceModifier > 0 ? '+' : '−'}
                      {fmt(Math.abs(f.priceModifier))}
                    </span>
                  )}
                </button>
              ))}
            </div>
          </div>

          {/* Quantity + Add */}
          <div className="mt-8 flex flex-col gap-4 sm:flex-row">
            <div className="flex items-center border border-border">
              <button
                type="button"
                aria-label="Decrease quantity"
                onClick={() => setQty((q) => Math.max(1, q - 1))}
                className="flex size-12 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <Minus className="size-4" />
              </button>
              <span className="w-10 text-center tabular-nums">{qty}</span>
              <button
                type="button"
                aria-label="Increase quantity"
                onClick={() => setQty((q) => q + 1)}
                className="flex size-12 items-center justify-center text-muted-foreground hover:text-foreground"
              >
                <Plus className="size-4" />
              </button>
            </div>
            <button
              type="button"
              disabled={sold}
              onClick={() => addToCart(product, framing, qty)}
              className="flex flex-1 items-center justify-center gap-2 bg-primary py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90 disabled:cursor-not-allowed disabled:opacity-40"
            >
              {sold ? 'Sold out' : 'Add to collection'}
            </button>
          </div>

          <button
            type="button"
            onClick={() => setArOpen(true)}
            className="mt-4 flex w-full items-center justify-center gap-2 border border-border py-4 text-[11px] uppercase tracking-luxe-sm transition-colors hover:border-accent hover:text-accent"
          >
            <ScanLine className="size-4" />
            Preview in your space
          </button>

          {/* Assurances */}
          <ul className="mt-8 space-y-3 border-t border-border pt-8">
            {[
              'Signed & numbered by Ouverture',
              `Lifetime AR licence · ${product.arDurationSeconds}s animation`,
              'Archival pigment print, 100-year lightfastness',
              'Insured white-glove delivery worldwide',
            ].map((item) => (
              <li key={item} className="flex items-start gap-3 text-sm text-foreground/80">
                <Check className="mt-0.5 size-4 shrink-0 text-accent" />
                {item}
              </li>
            ))}
          </ul>

          {/* Story */}
          <div className="mt-12 border-t border-border pt-10">
            <p className="text-[11px] uppercase tracking-luxe text-accent">The Story</p>
            <p className="mt-5 text-pretty text-lg leading-relaxed text-foreground/85">
              {product.description}
            </p>
          </div>
        </div>
      </div>

      <ARModal product={product} open={arOpen} onClose={() => setArOpen(false)} />
    </>
  )
}
