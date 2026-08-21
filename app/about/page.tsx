import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ouverture — The Artist',
  description:
    'The biography, studio practice, and press of Ouverture, the artist behind The 1111 Project of augmented fine art.',
}

const PRESS = [
  { outlet: 'Art in America', quote: 'The most convincing marriage of print and pixel yet.' },
  { outlet: 'Wallpaper*', quote: 'Ouverture has quietly redrawn the edge of the frame.' },
  { outlet: 'Financial Times · HTSI', quote: 'Collecting, reimagined for a screen-lit age.' },
]

export default function AboutPage() {
  return (
    <div>
      {/* Intro */}
      <section className="mx-auto max-w-7xl px-5 pb-16 pt-28 md:px-8 md:pb-24 md:pt-40">
        <p className="text-[11px] uppercase tracking-luxe text-accent">The Artist</p>
        <h1 className="mt-6 max-w-4xl text-balance font-serif text-5xl font-light leading-[0.95] md:text-8xl">
          Ouverture works at the seam of the seen and the summoned
        </h1>
      </section>

      {/* Portrait + bio */}
      <section className="mx-auto max-w-7xl px-5 pb-20 md:px-8 md:pb-32">
        <div className="grid gap-10 lg:grid-cols-2 lg:gap-16">
          <div className="relative aspect-[4/5] overflow-hidden bg-secondary">
            <Image
              src="/artworks/artist.png"
              alt="Portrait of the artist Ouverture in the studio"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 90vw"
            />
          </div>
          <div className="flex flex-col justify-center">
            <p className="text-pretty text-xl leading-relaxed text-foreground/90 md:text-2xl">
              &ldquo;A painting has always asked you to imagine what happens after
              the moment it holds. I simply give that moment permission to
              continue.&rdquo;
            </p>
            <div className="mt-8 space-y-5 leading-relaxed text-foreground/80">
              <p>
                Ouverture is a French-trained painter and media artist whose
                practice began in classical portraiture before turning to the
                possibilities of augmented reality. The 1111 Project is the
                culmination: a body of framed, editioned prints that each carry a
                hidden, hand-animated second life.
              </p>
              <p>
                Working between a Paris atelier and a small motion-capture studio,
                Ouverture treats code as pigment — layering light, particle and
                gesture until the still image and its augmented reveal feel like
                one indivisible work.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Studio detail band */}
      <section className="relative overflow-hidden border-y border-border">
        <Image
          src="/artworks/studio.png"
          alt="Detail of the Ouverture studio"
          fill
          className="object-cover opacity-45"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-r from-background via-background/60 to-transparent" />
        <div className="relative mx-auto max-w-7xl px-5 py-24 md:px-8 md:py-36">
          <p className="text-[11px] uppercase tracking-luxe text-accent">The Studio</p>
          <h2 className="mt-6 max-w-2xl font-serif text-4xl font-light leading-tight md:text-6xl">
            Gold pigment, motion capture, and a great deal of patience
          </h2>
          <p className="mt-6 max-w-xl leading-relaxed text-foreground/80">
            Each edition takes months: the print is composed first, then its
            augmented layer is choreographed frame by frame so the two read as a
            single, breathing object.
          </p>
        </div>
      </section>

      {/* Press */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <p className="text-[11px] uppercase tracking-luxe text-accent">Press</p>
        <div className="mt-10 grid gap-px border border-border bg-border md:grid-cols-3">
          {PRESS.map((p) => (
            <figure key={p.outlet} className="bg-background p-8">
              <blockquote className="font-serif text-2xl leading-snug text-foreground/90">
                &ldquo;{p.quote}&rdquo;
              </blockquote>
              <figcaption className="mt-6 text-[10px] uppercase tracking-luxe-sm text-muted-foreground">
                {p.outlet}
              </figcaption>
            </figure>
          ))}
        </div>
      </section>

      {/* CTA */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 text-center md:px-8 md:py-32">
          <h2 className="mx-auto max-w-2xl text-balance font-serif text-4xl font-light leading-tight md:text-6xl">
            Begin your collection
          </h2>
          <Link
            href="/collection"
            className="group mt-10 inline-flex items-center gap-3 bg-primary px-8 py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
          >
            Enter the gallery
            <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
          </Link>
        </div>
      </section>
    </div>
  )
}
