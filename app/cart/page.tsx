'use client'

import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { ArrowRight, Check, Minus, Plus } from 'lucide-react'
import { lineTotal, useCart } from '@/lib/cart-context'
import { useAuth } from '@/lib/auth-context'
import { FRAMING_OPTIONS } from '@/lib/demo-data'
import { placeOrder } from '@/lib/api'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

const framingLabel = (id: string) =>
  FRAMING_OPTIONS.find((f) => f.id === id)?.label ?? id

export default function CartPage() {
  const { lines, subtotal, updateQuantity, removeLine, clearCart } = useCart()
  const { user, openModal } = useAuth()
  const [placing, setPlacing] = useState(false)
  const [orderId, setOrderId] = useState<string | null>(null)

  const shipping = subtotal > 0 ? 85 : 0
  const total = subtotal + shipping

  async function onCheckout(e: React.FormEvent) {
    e.preventDefault()
    setPlacing(true)
    try {
      const res = await placeOrder({
        items: lines.map((l) => ({
          productId: l.product.id,
          framing: l.framing,
          quantity: l.quantity,
        })),
        total,
      })
      setOrderId(res.orderId)
      clearCart()
    } catch {
      // Demo fallback confirmation when the orders API is offline.
      setOrderId(`OUV-${Math.floor(Math.random() * 900000 + 100000)}`)
      clearCart()
    } finally {
      setPlacing(false)
    }
  }

  if (orderId) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-28 text-center">
        <span className="flex size-14 items-center justify-center rounded-full border border-accent text-accent">
          <Check className="size-6" />
        </span>
        <h1 className="mt-8 font-serif text-4xl font-light md:text-5xl">
          Acquisition confirmed
        </h1>
        <p className="mt-4 leading-relaxed text-muted-foreground">
          Order <span className="text-accent">{orderId}</span>. A confirmation and
          your AR licences are on their way. Our team will arrange white-glove
          delivery personally.
        </p>
        <Link
          href="/collection"
          className="mt-10 inline-flex items-center gap-3 border-b border-accent pb-2 text-[11px] uppercase tracking-luxe-sm text-accent"
        >
          Continue browsing
          <ArrowRight className="size-4" />
        </Link>
      </div>
    )
  }

  if (lines.length === 0) {
    return (
      <div className="mx-auto flex min-h-[70vh] max-w-xl flex-col items-center justify-center px-5 pt-28 text-center">
        <h1 className="font-serif text-4xl font-light md:text-5xl">Your cart is empty</h1>
        <p className="mt-4 text-muted-foreground">
          Discover editions that move only for you.
        </p>
        <Link
          href="/collection"
          className="mt-10 inline-flex items-center gap-3 bg-primary px-8 py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
        >
          Enter the gallery
          <ArrowRight className="size-4" />
        </Link>
      </div>
    )
  }

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <h1 className="font-serif text-5xl font-light md:text-6xl">Checkout</h1>

      <div className="mt-12 grid gap-12 lg:grid-cols-[1fr_400px] lg:gap-16">
        {/* Left: items + form */}
        <div>
          {/* Line items */}
          <ul className="divide-y divide-border border-y border-border">
            {lines.map((line) => (
              <li key={`${line.product.id}-${line.framing}`} className="flex gap-5 py-6">
                <div className="relative h-28 w-24 shrink-0 overflow-hidden bg-secondary">
                  <Image
                    src={line.product.image || '/placeholder.svg'}
                    alt={line.product.title}
                    fill
                    className="object-cover"
                    sizes="96px"
                  />
                </div>
                <div className="flex flex-1 flex-col">
                  <div className="flex items-start justify-between gap-4">
                    <div>
                      <Link
                        href={`/artwork/${line.product.id}`}
                        className="font-serif text-xl hover:text-accent"
                      >
                        {line.product.title}
                      </Link>
                      <p className="mt-1 text-[10px] uppercase tracking-luxe-sm text-muted-foreground">
                        {line.product.series} · {framingLabel(line.framing)}
                      </p>
                    </div>
                    <p className="text-sm tabular-nums">{fmt(lineTotal(line))}</p>
                  </div>
                  <div className="mt-auto flex items-center justify-between pt-4">
                    <div className="flex items-center border border-border">
                      <button
                        type="button"
                        aria-label="Decrease quantity"
                        onClick={() =>
                          updateQuantity(line.product.id, line.framing, line.quantity - 1)
                        }
                        className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Minus className="size-3" />
                      </button>
                      <span className="w-9 text-center text-sm">{line.quantity}</span>
                      <button
                        type="button"
                        aria-label="Increase quantity"
                        onClick={() =>
                          updateQuantity(line.product.id, line.framing, line.quantity + 1)
                        }
                        className="flex size-9 items-center justify-center text-muted-foreground hover:text-foreground"
                      >
                        <Plus className="size-3" />
                      </button>
                    </div>
                    <button
                      type="button"
                      onClick={() => removeLine(line.product.id, line.framing)}
                      className="text-[11px] uppercase tracking-luxe-sm text-muted-foreground hover:text-foreground"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </li>
            ))}
          </ul>

          {/* Account nudge */}
          {!user && (
            <div className="mt-8 flex flex-col gap-3 border border-border p-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-sm text-foreground/80">
                Sign in as a collector to store provenance &amp; AR licences.
              </p>
              <button
                type="button"
                onClick={openModal}
                className="shrink-0 border border-border px-5 py-3 text-[11px] uppercase tracking-luxe-sm transition-colors hover:border-accent hover:text-accent"
              >
                Collector access
              </button>
            </div>
          )}

          {/* Details form */}
          <form id="checkout-form" onSubmit={onCheckout} className="mt-10 space-y-10">
            <fieldset>
              <legend className="text-[11px] uppercase tracking-luxe text-accent">
                Delivery details
              </legend>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Input id="name" label="Full name" defaultValue={user?.name} />
                <Input id="email" label="Email" type="email" defaultValue={user?.email} />
                <Input id="address" label="Address" className="sm:col-span-2" />
                <Input id="city" label="City" />
                <Input id="postal" label="Postal code" />
              </div>
            </fieldset>

            <fieldset>
              <legend className="text-[11px] uppercase tracking-luxe text-accent">
                Payment
              </legend>
              <div className="mt-6 grid gap-5 sm:grid-cols-2">
                <Input id="card" label="Card number" className="sm:col-span-2" placeholder="0000 0000 0000 0000" />
                <Input id="exp" label="Expiry" placeholder="MM / YY" />
                <Input id="cvc" label="CVC" placeholder="123" />
              </div>
            </fieldset>
          </form>
        </div>

        {/* Right: summary */}
        <aside className="lg:sticky lg:top-28 lg:self-start">
          <div className="border border-border p-6">
            <h2 className="text-[11px] uppercase tracking-luxe">Order summary</h2>
            <dl className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between">
                <dt className="text-muted-foreground">Subtotal</dt>
                <dd className="tabular-nums">{fmt(subtotal)}</dd>
              </div>
              <div className="flex justify-between">
                <dt className="text-muted-foreground">White-glove shipping</dt>
                <dd className="tabular-nums">{fmt(shipping)}</dd>
              </div>
            </dl>
            <div className="mt-6 flex items-baseline justify-between border-t border-border pt-6">
              <span className="text-[11px] uppercase tracking-luxe-sm text-muted-foreground">
                Total
              </span>
              <span className="font-serif text-3xl">{fmt(total)}</span>
            </div>
            <button
              type="submit"
              form="checkout-form"
              disabled={placing}
              className="mt-6 flex w-full items-center justify-center gap-2 bg-primary py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90 disabled:opacity-60"
            >
              {placing ? 'Placing order…' : 'Complete acquisition'}
            </button>
            <p className="mt-4 text-center text-xs leading-relaxed text-muted-foreground">
              Editions are insured in transit. Your AR licences activate the moment
              your order is confirmed.
            </p>
          </div>
        </aside>
      </div>
    </div>
  )
}

function Input({
  id,
  label,
  type = 'text',
  className,
  defaultValue,
  placeholder,
}: {
  id: string
  label: string
  type?: string
  className?: string
  defaultValue?: string
  placeholder?: string
}) {
  return (
    <div className={className}>
      <label
        htmlFor={id}
        className="text-[10px] uppercase tracking-luxe-sm text-muted-foreground"
      >
        {label}
      </label>
      <input
        id={id}
        name={id}
        type={type}
        required
        defaultValue={defaultValue}
        placeholder={placeholder}
        className="mt-2 w-full border-b border-border bg-transparent py-2 text-sm outline-none transition-colors focus:border-accent placeholder:text-muted-foreground/60"
      />
    </div>
  )
}
