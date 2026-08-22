export const dynamic = 'force-dynamic'
import type { Metadata } from 'next'
import { getProducts } from '@/lib/api'
import { CollectionGrid } from '@/components/collection-grid'

export const metadata: Metadata = {
  title: 'The Collection — The 1111 Project by Ouverture',
  description:
    'Browse limited-edition framed fine art prints that unlock augmented-reality animation. Filter by series, price, and availability.',
}

export default async function CollectionPage() {
  const products = await getProducts()

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-28 md:px-8 md:pt-36">
      <header className="mb-14 max-w-3xl">
        <p className="text-[11px] uppercase tracking-luxe text-accent">The Collection</p>
        <h1 className="mt-5 font-serif text-5xl font-light leading-[0.95] md:text-7xl">
          Editioned works, augmented
        </h1>
        <p className="mt-6 text-pretty leading-relaxed text-foreground/80">
          Each print is produced in a strictly limited edition, signed and
          numbered by Ouverture, and paired with a lifetime augmented-reality
          licence unlocked through the companion lens.
        </p>
      </header>

      <CollectionGrid products={products} />
    </div>
  )
}
