export const dynamic = 'force-dynamic'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ArrowUpRight } from 'lucide-react'
import { getProducts } from '@/lib/api'
import { ProductCard } from '@/components/product-card'

const fmt = (n: number) =>
  n.toLocaleString('en-US', { style: 'currency', currency: 'USD', maximumFractionDigits: 0 })

export default async function HomePage() {
  const products = await getProducts()
  const drop = products.find((p) => p.availability !== 'sold') ?? products[0]
  const featured = products.slice(0, 3)

  return (
    <>
      {/* HERO */}
      <section className="relative flex h-[100svh] min-h-[640px] items-end overflow-hidden">
        <Image
          src="/artworks/hero.png"
          alt="An augmented fine art print in a gallery"
          fill
          priority
          className="animate-[kenburns_24s_ease-in-out_infinite_alternate] object-cover"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-background/10" />
        <div className="absolute inset-0 bg-gradient-to-r from-background/50 to-transparent" />

        <div className="relative mx-auto w-full max-w-7xl px-5 pb-16 md:px-8 md:pb-24">
          <p className="text-[11px] uppercase tracking-luxe text-accent">
            Autumn Exhibition — Now Unlocking
          </p>
          <h1 className="mt-6 max-w-3xl text-balance font-serif text-5xl font-light leading-[0.95] md:text-7xl lg:text-8xl">
            Fine art that comes alive in your room
          </h1>
          <p className="mt-6 max-w-xl text-pretty text-base leading-relaxed text-foreground/80 md:text-lg">
            The 1111 Project by Ouverture — limited-edition framed prints that
            unlock private augmented-reality animation, seen only through your lens.
          </p>
          <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
            <Link
              href="/collection"
              className="group inline-flex items-center justify-center gap-3 bg-primary px-8 py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
            >
              Enter the gallery
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
            <Link
              href="/ar"
              className="inline-flex items-center justify-center gap-2 border border-border px-8 py-4 text-[11px] uppercase tracking-luxe-sm text-foreground transition-colors hover:border-accent hover:text-accent"
            >
              Watch the AR reveal
            </Link>
          </div>
        </div>

        <div className="absolute bottom-8 left-1/2 hidden -translate-x-1/2 flex-col items-center gap-2 md:flex">
          <span className="text-[9px] uppercase tracking-luxe text-foreground/50">
            Scroll
          </span>
          <span className="h-10 w-px animate-pulse bg-foreground/30" />
        </div>
      </section>

      {/* MARQUEE STRIP */}
      <section className="border-y border-border bg-card py-4">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-center gap-x-10 gap-y-2 px-5 text-[10px] uppercase tracking-luxe-sm text-muted-foreground md:px-8">
          <span>Signed &amp; numbered</span>
          <span className="text-accent">·</span>
          <span>Lifetime AR licence</span>
          <span className="text-accent">·</span>
          <span>Archival pigment prints</span>
          <span className="text-accent">·</span>
          <span>White-glove delivery worldwide</span>
        </div>
      </section>

      {/* CURRENT DROP */}
      {drop && (
        <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
          <div className="grid items-center gap-10 lg:grid-cols-2 lg:gap-16">
            <Link href={`/artwork/${drop.id}`} className="group relative block">
              <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
                <Image
                  src={drop.image || '/placeholder.svg'}
                  alt={drop.title}
                  fill
                  className="object-cover transition-transform duration-700 group-hover:scale-[1.03]"
                  sizes="(min-width: 1024px) 45vw, 90vw"
                />
              </div>
            </Link>
            <div>
              <p className="text-[11px] uppercase tracking-luxe text-accent">
                The Current Drop
              </p>
              <h2 className="mt-5 font-serif text-4xl font-light leading-tight md:text-6xl">
                {drop.title}
              </h2>
              <p className="mt-4 text-[11px] uppercase tracking-luxe-sm text-muted-foreground">
                {drop.series} · {drop.year} · {drop.dimensions}
              </p>
              <p className="mt-6 max-w-md text-pretty leading-relaxed text-foreground/80">
                {drop.description}
              </p>
              <div className="mt-8 flex items-center gap-6">
                <span className="font-serif text-2xl">{fmt(drop.price)}</span>
                <span className="text-[11px] uppercase tracking-luxe-sm text-muted-foreground">
                  {drop.editionRemaining} of {drop.editionSize} remaining
                </span>
              </div>
              <Link
                href={`/artwork/${drop.id}`}
                className="group mt-10 inline-flex items-center gap-3 border-b border-accent pb-2 text-[11px] uppercase tracking-luxe-sm text-accent"
              >
                View the artwork
                <ArrowUpRight className="size-4 transition-transform group-hover:translate-x-0.5 group-hover:-translate-y-0.5" />
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* FEATURED GRID */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-32">
        <div className="mb-10 flex items-end justify-between border-b border-border pb-6">
          <div>
            <p className="text-[11px] uppercase tracking-luxe text-accent">Selected Works</p>
            <h2 className="mt-3 font-serif text-3xl font-light md:text-5xl">
              From the collection
            </h2>
          </div>
          <Link
            href="/collection"
            className="hidden shrink-0 items-center gap-2 text-[11px] uppercase tracking-luxe-sm text-muted-foreground transition-colors hover:text-foreground md:flex"
          >
            View all
            <ArrowRight className="size-4" />
          </Link>
        </div>
        <div className="grid gap-x-6 gap-y-12 sm:grid-cols-2 lg:grid-cols-3">
          {featured.map((p) => (
            <ProductCard key={p.id} product={p} />
          ))}
        </div>
      </section>

      {/* AR TEASER */}
      <section className="relative overflow-hidden border-t border-border">
        <Image
          src="/artworks/ar-demo.png"
          alt="Viewing augmented art through a phone"
          fill
          className="object-cover opacity-40"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/40" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 text-center md:px-8 md:py-36">
          <p className="text-[11px] uppercase tracking-luxe text-accent">The AR Layer</p>
          <h2 className="mx-auto mt-6 max-w-3xl text-balance font-serif text-4xl font-light leading-tight md:text-6xl">
            Every print holds a secret only your lens can reveal
          </h2>
          <p className="mx-auto mt-6 max-w-xl text-pretty leading-relaxed text-foreground/80">
            Point your phone at the framed work and watch it dissolve, bloom, and
            move — a private animation that lives forever with the edition.
          </p>
          <Link
            href="/ar"
            className="mt-10 inline-flex items-center gap-3 bg-primary px-8 py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
          >
            Explore the AR experience
            <ArrowRight className="size-4" />
          </Link>
        </div>
      </section>
    </>
  )
}
