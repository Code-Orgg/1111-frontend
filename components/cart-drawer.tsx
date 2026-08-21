'use client'

import Image from 'next/image'
import Link from 'next/link'
import { Minus, Plus, X } from 'lucide-react'
import { lineTotal, useCart } from '@/lib/cart-context'
import { FRAMING_OPTIONS } from '@/lib/demo-data'
import { cn } from '@/lib/utils'

function framingLabel(id: string) {
  return FRAMING_OPTIONS.find((f) => f.id === id)?.label ?? id
}

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export function CartDrawer() {
  const { isOpen, closeCart, lines, subtotal, updateQuantity, removeLine } = useCart()

  return (
    <div
      className={cn(
        'fixed inset-0 z-[60]',
        isOpen ? 'pointer-events-auto' : 'pointer-events-none',
      )}
      aria-hidden={!isOpen}
    >
      <div
        onClick={closeCart}
        className={cn(
          'absolute inset-0 bg-background/70 backdrop-blur-sm transition-opacity duration-500',
          isOpen ? 'opacity-100' : 'opacity-0',
        )}
      />
      <aside
        className={cn(
          'absolute right-0 top-0 flex h-full w-full max-w-md flex-col border-l border-border bg-card transition-transform duration-500 ease-out',
          isOpen ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-label="Shopping cart"
      >
        <div className="flex items-center justify-between border-b border-border px-6 py-5">
          <h2 className="text-[11px] uppercase tracking-luxe">
            Acquisitions ({lines.length})
          </h2>
          <button type="button" onClick={closeCart} aria-label="Close cart">
            <X className="size-5" />
          </button>
        </div>

        {lines.length === 0 ? (
          <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
            <p className="font-serif text-2xl">Your collection is empty</p>
            <p className="text-sm text-muted-foreground">
              Every acquisition arrives signed, numbered, and AR-enabled.
            </p>
            <Link
              href="/collection"
              onClick={closeCart}
              className="mt-2 border-b border-accent pb-1 text-[11px] uppercase tracking-luxe-sm text-accent"
            >
              Enter the gallery
            </Link>
          </div>
        ) : (
          <div className="flex-1 overflow-y-auto px-6 py-4">
            <ul className="divide-y divide-border">
              {lines.map((line) => (
                <li key={`${line.product.id}-${line.framing}`} className="flex gap-4 py-5">
                  <div className="relative h-24 w-20 shrink-0 overflow-hidden bg-secondary">
                    <Image
                      src={line.product.image || '/placeholder.svg'}
                      alt={line.product.title}
                      fill
                      className="object-cover"
                      sizes="80px"
                    />
                  </div>
                  <div className="flex flex-1 flex-col">
                    <div className="flex justify-between gap-2">
                      <div>
                        <p className="font-serif text-lg leading-tight">
                          {line.product.title}
                        </p>
                        <p className="mt-1 text-[10px] uppercase tracking-luxe-sm text-muted-foreground">
                          {framingLabel(line.framing)}
                        </p>
                      </div>
                      <button
                        type="button"
                        onClick={() => removeLine(line.product.id, line.framing)}
                        aria-label="Remove"
                        className="text-muted-foreground transition-colors hover:text-foreground"
                      >
                        <X className="size-4" />
                      </button>
                    </div>
                    <div className="mt-auto flex items-center justify-between pt-3">
                      <div className="flex items-center border border-border">
                        <button
                          type="button"
                          aria-label="Decrease quantity"
                          className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            updateQuantity(line.product.id, line.framing, line.quantity - 1)
                          }
                        >
                          <Minus className="size-3" />
                        </button>
                        <span className="w-8 text-center text-sm">{line.quantity}</span>
                        <button
                          type="button"
                          aria-label="Increase quantity"
                          className="flex size-8 items-center justify-center text-muted-foreground hover:text-foreground"
                          onClick={() =>
                            updateQuantity(line.product.id, line.framing, line.quantity + 1)
                          }
                        >
                          <Plus className="size-3" />
                        </button>
                      </div>
                      <p className="text-sm tabular-nums">{fmt(lineTotal(line))}</p>
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        )}

        {lines.length > 0 && (
          <div className="border-t border-border px-6 py-6">
            <div className="flex items-center justify-between text-sm">
              <span className="uppercase tracking-luxe-sm text-muted-foreground">
                Subtotal
              </span>
              <span className="font-serif text-xl">{fmt(subtotal)}</span>
            </div>
            <p className="mt-2 text-xs text-muted-foreground">
              Taxes and white-glove shipping calculated at checkout.
            </p>
            <Link
              href="/cart"
              onClick={closeCart}
              className="mt-5 flex w-full items-center justify-center bg-primary py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
            >
              Proceed to checkout
            </Link>
          </div>
        )}
      </aside>
    </div>
  )
}
