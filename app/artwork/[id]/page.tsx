import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import Link from 'next/link'
import { getProduct, getProducts } from '@/lib/api'
import { ArtworkDetail } from '@/components/artwork-detail'
import { ProductCard } from '@/components/product-card'

export async function generateMetadata({
  params,
}: {
  params: Promise<{ id: string }>
}): Promise<Metadata> {
  const { id } = await params
  const product = await getProduct(id)
  if (!product) return { title: 'Artwork not found — Ouverture' }
  return {
    title: `${product.title} — The 1111 Project by Ouverture`,
    description: product.description,
  }
}

export default async function ArtworkPage({
  params,
}: {
  params: Promise<{ id: string }>
}) {
  const { id } = await params
  const [product, all] = await Promise.all([getProduct(id), getProducts()])
  if (!product) notFound()

  const related = all.filter((p) => p.id !== product.id).slice(0, 3)

  return (
    <div className="mx-auto max-w-7xl px-5 pb-24 pt-24 md:px-8 md:pt-32">
      <ArtworkDetail product={product} />

      {related.length > 0 && (
        <section className="mt-28 border-t border-border pt-16">
          <div className="mb-10 flex items-end justify-between">
            <h2 className="font-serif text-3xl font-light md:text-4xl">
              Continue the collection
            </h2>
            <Link
              href="/collection"
              className="text-[11px] uppercase tracking-luxe-sm text-muted-foreground transition-colors hover:text-foreground"
            >
              View all
            </Link>
          </div>
          <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </section>
      )}
    </div>
  )
}
