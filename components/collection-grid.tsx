'use client'

import { useMemo, useState } from 'react'
import { ProductCard } from '@/components/product-card'
import { cn } from '@/lib/utils'
import type { Product } from '@/lib/types'

type PriceBand = 'all' | 'under600' | '600to1000' | 'over1000'
type Avail = 'all' | 'available' | 'sold'
type SortKey = 'featured' | 'price-asc' | 'price-desc' | 'scarcity'

const PRICE_BANDS: { id: PriceBand; label: string }[] = [
  { id: 'all', label: 'All prices' },
  { id: 'under600', label: 'Under $600' },
  { id: '600to1000', label: '$600 – $1,000' },
  { id: 'over1000', label: '$1,000+' },
]

const SORTS: { id: SortKey; label: string }[] = [
  { id: 'featured', label: 'Featured' },
  { id: 'price-asc', label: 'Price · Low to high' },
  { id: 'price-desc', label: 'Price · High to low' },
  { id: 'scarcity', label: 'Scarcity' },
]

function inBand(price: number, band: PriceBand) {
  if (band === 'under600') return price < 600
  if (band === '600to1000') return price >= 600 && price <= 1000
  if (band === 'over1000') return price > 1000
  return true
}

export function CollectionGrid({ products }: { products: Product[] }) {
  const seriesList = useMemo(
    () => ['All series', ...Array.from(new Set(products.map((p) => p.series)))],
    [products],
  )
  const [series, setSeries] = useState('All series')
  const [band, setBand] = useState<PriceBand>('all')
  const [avail, setAvail] = useState<Avail>('all')
  const [sort, setSort] = useState<SortKey>('featured')

  const filtered = useMemo(() => {
    let list = products.filter((p) => {
      if (series !== 'All series' && p.series !== series) return false
      if (!inBand(p.price, band)) return false
      if (avail === 'available' && p.availability === 'sold') return false
      if (avail === 'sold' && p.availability !== 'sold') return false
      return true
    })
    list = [...list]
    if (sort === 'price-asc') list.sort((a, b) => a.price - b.price)
    else if (sort === 'price-desc') list.sort((a, b) => b.price - a.price)
    else if (sort === 'scarcity')
      list.sort((a, b) => a.editionRemaining - b.editionRemaining)
    return list
  }, [products, series, band, avail, sort])

  return (
    <div className="grid gap-10 lg:grid-cols-[220px_1fr] lg:gap-14">
      {/* Filters */}
      <aside className="lg:sticky lg:top-28 lg:self-start">
        <div className="space-y-8">
          <FilterGroup title="Series">
            {seriesList.map((s) => (
              <FilterButton key={s} active={series === s} onClick={() => setSeries(s)}>
                {s}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup title="Price">
            {PRICE_BANDS.map((b) => (
              <FilterButton key={b.id} active={band === b.id} onClick={() => setBand(b.id)}>
                {b.label}
              </FilterButton>
            ))}
          </FilterGroup>

          <FilterGroup title="Availability">
            {(
              [
                { id: 'all', label: 'All' },
                { id: 'available', label: 'Available' },
                { id: 'sold', label: 'Sold out' },
              ] as { id: Avail; label: string }[]
            ).map((a) => (
              <FilterButton key={a.id} active={avail === a.id} onClick={() => setAvail(a.id)}>
                {a.label}
              </FilterButton>
            ))}
          </FilterGroup>
        </div>
      </aside>

      {/* Results */}
      <div>
        <div className="mb-8 flex flex-wrap items-center justify-between gap-4 border-b border-border pb-5">
          <p className="text-[11px] uppercase tracking-luxe-sm text-muted-foreground">
            {filtered.length} {filtered.length === 1 ? 'work' : 'works'}
          </p>
          <label className="flex items-center gap-3 text-[11px] uppercase tracking-luxe-sm text-muted-foreground">
            Sort
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as SortKey)}
              className="border border-border bg-transparent px-3 py-2 text-foreground outline-none focus:border-accent"
            >
              {SORTS.map((s) => (
                <option key={s.id} value={s.id} className="bg-card">
                  {s.label}
                </option>
              ))}
            </select>
          </label>
        </div>

        {filtered.length === 0 ? (
          <p className="py-20 text-center font-serif text-2xl text-muted-foreground">
            No works match this selection.
          </p>
        ) : (
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 xl:grid-cols-3">
            {filtered.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        )}
      </div>
    </div>
  )
}

function FilterGroup({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div>
      <p className="mb-4 text-[10px] uppercase tracking-luxe text-accent">{title}</p>
      <div className="flex flex-col items-start gap-2.5">{children}</div>
    </div>
  )
}

function FilterButton({
  active,
  onClick,
  children,
}: {
  active: boolean
  onClick: () => void
  children: React.ReactNode
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={cn(
        'text-left text-sm transition-colors',
        active ? 'text-foreground' : 'text-muted-foreground hover:text-foreground',
      )}
    >
      <span className={cn('border-b pb-0.5', active ? 'border-accent' : 'border-transparent')}>
        {children}
      </span>
    </button>
  )
}
