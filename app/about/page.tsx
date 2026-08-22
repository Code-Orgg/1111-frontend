import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, MessageCircle } from 'lucide-react'

export const metadata: Metadata = {
  title: 'Ouverture — The Artist',
  description:
    'The biography, studio practice, and press of Ouverture, the artist behind The 1111 Project of augmented fine art.',
}

const ARTIST_IMAGE_URL =
  'https://cloudsecure.lon1.cdn.digitaloceanspaces.com/selfany/U5jawMsr1q1bewlaijstKoqYfvNmtLZBSbUto81YM25oONNUVluofJDGmxA8.webp'
const INSTAGRAM_URL = 'https://www.instagram.com/1111byouverture'
const WHATSAPP_URL = 'https://wa.me/2349031767617'

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
              src={ARTIST_IMAGE_URL}
              alt="Portrait of the artist Ouverture"
              fill
              className="object-cover"
              sizes="(min-width: 1024px) 45vw, 90vw"
              priority
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
                Ouverture belongs to a small lineage of artists for whom the
                canvas was never the destination — only the opening bar. Trained
                first in the exacting discipline of classical portraiture, where
                a single held gaze could carry the weight of an entire
                composition, Ouverture came to a quiet, insistent conviction:
                that stillness is not the absence of motion, but motion held in
                reserve. <span className="italic">The 1111 Project</span> is the
                estate of that conviction — eleven hundred and eleven editions,
                each one a painted surface that has agreed, briefly, to stop
                moving so that it might be framed, and hung, and lived with —
                until the moment it is asked to continue.
              </p>
              <p>
                The name is deliberate. <span className="italic">Ouverture</span> —
                French for &ldquo;opening&rdquo; — names both a piece of music
                and a door left ajar. Every work in the collection is
                constructed the same way an overture is composed: as a
                condensed, exact statement of everything that follows,
                encountered before the viewer knows what they are being shown.
                The augmented layer beneath each print is not an effect
                applied afterward. It is the second movement, written at the
                same time as the first, waiting only for a lens.
              </p>
              <p>
                The studio practice sits at the meeting point of two
                disciplines rarely asked to share a table: the patient,
                material craft of pigment, gesso, and gold leaf, and the
                exacting choreography of motion capture and generative code.
                Each edition begins as a painting in the traditional sense —
                composed, layered, allowed to dry — before its second,
                augmented life is hand-animated frame by frame, so that the
                two states read not as artwork-plus-technology, but as one
                indivisible object that simply has more than one way of being
                seen.
              </p>
              <p>
                It is this refusal to treat technology as ornament — insisting
                instead that it be earned, frame by frame, the way a painter
                earns a shadow — that has placed Ouverture at the forefront of
                a genuinely new collecting category: fine art built to outlive
                its own frame.
              </p>
            </div>

            <div className="mt-10 flex items-center gap-4">
              <a
                href={INSTAGRAM_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-5 py-3 text-[11px] uppercase tracking-luxe-sm transition-colors hover:border-accent hover:text-accent"
              >
                <Instagram className="size-4" />
                @1111byouverture
              </a>
              <a
                href={WHATSAPP_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 border border-border px-5 py-3 text-[11px] uppercase tracking-luxe-sm transition-colors hover:border-accent hover:text-accent"
              >
                <MessageCircle className="size-4" />
                Concierge
              </a>
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
