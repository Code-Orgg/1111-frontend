import type { Metadata } from 'next'
import Image from 'next/image'
import Link from 'next/link'
import { ArrowRight, ScanLine, Smartphone, Sparkles } from 'lucide-react'

export const metadata: Metadata = {
  title: 'AR Experience — The 1111 Project by Ouverture',
  description:
    'How the augmented-reality layer works: supported devices, the unlock guide, and a demo reel of Ouverture editions in motion.',
}

const STATS = [
  { value: '1,111', label: 'Editions in motion' },
  { value: '38s', label: 'Average animation loop' },
  { value: '4K', label: 'AR render resolution' },
  { value: '∞', label: 'Lifetime licence' },
]

const STEPS = [
  {
    n: '01',
    title: 'Acquire an edition',
    body: 'Every framed print ships with a private AR licence tied to your collector account.',
  },
  {
    n: '02',
    title: 'Open the lens',
    body: 'Launch the companion web lens — no app store, no download. It runs in your browser.',
  },
  {
    n: '03',
    title: 'Point & unlock',
    body: 'Aim your phone at the framed work. Recognition triggers the animation instantly.',
  },
  {
    n: '04',
    title: 'Witness the reveal',
    body: 'The artwork dissolves, blooms and moves — a private performance in your space.',
  },
]

const DEVICES = [
  'iPhone 11 and newer (iOS 15+)',
  'iPad Pro / Air (M-series)',
  'Android 10+ with ARCore',
  'Chrome, Safari & Edge (WebXR)',
]

export default function ARPage() {
  return (
    <div>
      {/* Hero */}
      <section className="relative overflow-hidden">
        <Image
          src="/artworks/ar-demo.png"
          alt="Viewing augmented art through a phone"
          fill
          priority
          className="object-cover opacity-50"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/70 to-background/60" />
        <div className="relative mx-auto max-w-7xl px-5 pb-20 pt-40 md:px-8 md:pb-28 md:pt-52">
          <div className="flex items-center gap-2 text-[11px] uppercase tracking-luxe text-accent">
            <Sparkles className="size-4" />
            The AR Layer
          </div>
          <h1 className="mt-6 max-w-4xl text-balance font-serif text-5xl font-light leading-[0.95] md:text-8xl">
            The reveal only you can see
          </h1>
          <p className="mt-6 max-w-xl text-pretty leading-relaxed text-foreground/80">
            Each Ouverture edition is a threshold. On the wall it is a still,
            museum-grade print. Through the lens, it becomes a living, moving,
            one-of-one performance.
          </p>
        </div>
      </section>

      {/* Stats */}
      <section className="border-y border-border bg-card">
        <div className="mx-auto grid max-w-7xl grid-cols-2 gap-px md:grid-cols-4">
          {STATS.map((s) => (
            <div key={s.label} className="px-6 py-10 text-center">
              <p className="font-serif text-4xl md:text-5xl">{s.value}</p>
              <p className="mt-3 text-[10px] uppercase tracking-luxe-sm text-muted-foreground">
                {s.label}
              </p>
            </div>
          ))}
        </div>
      </section>

      {/* Demo reel */}
      <section className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
        <div className="grid gap-4 md:grid-cols-3 md:gap-6">
          <div className="relative aspect-square overflow-hidden bg-secondary md:col-span-2 md:aspect-[16/10]">
            <Image
              src="/artworks/art-5.png"
              alt="Nebula edition in augmented reality"
              fill
              className="object-cover"
              sizes="66vw"
            />
            <div className="absolute inset-0 flex items-center justify-center bg-background/20">
              <span className="flex size-16 items-center justify-center rounded-full border border-foreground/40 bg-background/40 backdrop-blur-sm">
                <ScanLine className="size-6 text-accent" />
              </span>
            </div>
            <div className="absolute bottom-5 left-5">
              <p className="font-serif text-2xl">Nebula 1111</p>
              <p className="text-[10px] uppercase tracking-luxe-sm text-foreground/70">
                55s perpetual loop
              </p>
            </div>
          </div>
          <div className="relative aspect-square overflow-hidden bg-secondary md:aspect-auto">
            <Image
              src="/artworks/art-1.png"
              alt="Threshold edition in augmented reality"
              fill
              className="object-cover"
              sizes="33vw"
            />
            <div className="absolute bottom-5 left-5">
              <p className="font-serif text-2xl">Threshold</p>
              <p className="text-[10px] uppercase tracking-luxe-sm text-foreground/70">
                38s loop
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Steps */}
      <section className="border-t border-border">
        <div className="mx-auto max-w-7xl px-5 py-20 md:px-8 md:py-32">
          <h2 className="max-w-2xl font-serif text-4xl font-light leading-tight md:text-6xl">
            Unlocking your edition
          </h2>
          <div className="mt-14 grid gap-px border border-border bg-border sm:grid-cols-2 lg:grid-cols-4">
            {STEPS.map((step) => (
              <div key={step.n} className="bg-background p-8">
                <p className="font-serif text-3xl text-accent">{step.n}</p>
                <h3 className="mt-6 font-serif text-2xl">{step.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {step.body}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Devices */}
      <section className="border-t border-border">
        <div className="mx-auto grid max-w-7xl gap-12 px-5 py-20 md:grid-cols-2 md:px-8 md:py-32">
          <div>
            <div className="flex items-center gap-2 text-[11px] uppercase tracking-luxe text-accent">
              <Smartphone className="size-4" />
              Supported Devices
            </div>
            <h2 className="mt-6 font-serif text-4xl font-light leading-tight md:text-5xl">
              No app. Just your browser.
            </h2>
            <p className="mt-6 max-w-md leading-relaxed text-foreground/80">
              The lens runs on WebXR and WebAR, so there is nothing to install.
              If your device can browse the web, it can hold an Ouverture.
            </p>
            <Link
              href="/collection"
              className="group mt-10 inline-flex items-center gap-3 bg-primary px-8 py-4 text-[11px] uppercase tracking-luxe text-primary-foreground transition-opacity hover:opacity-90"
            >
              Acquire an edition
              <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>
          <ul className="divide-y divide-border border-y border-border">
            {DEVICES.map((d) => (
              <li
                key={d}
                className="flex items-center justify-between py-5 text-sm text-foreground/85"
              >
                {d}
                <span className="text-[10px] uppercase tracking-luxe-sm text-accent">
                  Supported
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>
    </div>
  )
}
