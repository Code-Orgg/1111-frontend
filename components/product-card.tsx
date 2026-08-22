import Image from 'next/image'
import Link from 'next/link'
import type { Product } from '@/lib/types'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

function availabilityLabel(p: Product) {
  if (p.availability === 'sold') return 'Sold out'
  if (p.availability === 'low') return `${p.editionRemaining} of ${p.editionSize} remaining`
  return `Edition of ${p.editionSize}`
}

export function ProductCard({ product }: { product: Product }) {
  const sold = product.availability === 'sold'
  return (
    <Link href={`/artwork/${product.id}`} className="group block">
      <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
        <Image
          src={product.image || '/placeholder.svg'}
          alt={`${product.title} by Ouverture`}
          fill
          sizes="(min-width: 1024px) 30vw, (min-width: 640px) 45vw, 90vw"
          className="object-cover transition-transform duration-700 ease-out group-hover:scale-[1.04]"
        />
        <div className="absolute left-4 top-4 flex gap-2">
          <span className="bg-background/70 px-2.5 py-1 text-[9px] uppercase tracking-luxe-sm text-foreground backdrop-blur-sm">
            AR
          </span>
          {product.availability === 'low' && !sold && (
            <span className="bg-accent px-2.5 py-1 text-[9px] uppercase tracking-luxe-sm text-accent-foreground">
              Low stock
            </span>
          )}
          {sold && (
            <span className="bg-foreground px-2.5 py-1 text-[9px] uppercase tracking-luxe-sm text-background">
              Sold out
            </span>
          )}
        </div>
      </div>
      <div className="flex items-baseline justify-between gap-4 pt-4">
        <div>
          <h3 className="font-serif text-xl leading-tight">{product.title}</h3>
          <p className="mt-1 text-[10px] uppercase tracking-luxe-sm text-muted-foreground">
            {product.series} · {product.year}
          </p>
        </div>
        <p className="shrink-0 text-sm tabular-nums text-foreground/90">
          {fmt(product.price)}
        </p>
      </div>
      <p className="mt-2 text-[11px] uppercase tracking-luxe-sm text-muted-foreground">
        {availabilityLabel(product)}
      </p>
    </Link>
  )
}
