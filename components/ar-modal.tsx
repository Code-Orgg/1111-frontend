'use client'

import Image from 'next/image'
import { useEffect, useRef, useState } from 'react'
import { Camera, ScanLine, X } from 'lucide-react'
import type { Product } from '@/lib/types'
import { cn } from '@/lib/utils'

type Status = 'idle' | 'requesting' | 'live' | 'fallback'

export function ARModal({
  product,
  open,
  onClose,
}: {
  product: Product
  open: boolean
  onClose: () => void
}) {
  const videoRef = useRef<HTMLVideoElement>(null)
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const streamRef = useRef<MediaStream | null>(null)
  const [status, setStatus] = useState<Status>('idle')

  // Camera lifecycle
  useEffect(() => {
    if (!open) return
    let cancelled = false
    setStatus('requesting')

    async function start() {
      try {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { facingMode: 'environment' },
          audio: false,
        })
        if (cancelled) {
          stream.getTracks().forEach((t) => t.stop())
          return
        }
        streamRef.current = stream
        if (videoRef.current) {
          videoRef.current.srcObject = stream
          await videoRef.current.play().catch(() => {})
        }
        setStatus('live')
      } catch {
        if (!cancelled) setStatus('fallback')
      }
    }
    start()

    return () => {
      cancelled = true
      streamRef.current?.getTracks().forEach((t) => t.stop())
      streamRef.current = null
    }
  }, [open])

  // Gold particle reveal animation
  useEffect(() => {
    if (!open || status === 'requesting' || status === 'idle') return
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let raf = 0
    const resize = () => {
      canvas.width = canvas.offsetWidth
      canvas.height = canvas.offsetHeight
    }
    resize()
    window.addEventListener('resize', resize)

    const particles = Array.from({ length: 90 }, () => ({
      x: Math.random(),
      y: Math.random(),
      r: Math.random() * 1.8 + 0.4,
      s: Math.random() * 0.0016 + 0.0004,
      a: Math.random() * 0.6 + 0.2,
    }))

    const draw = () => {
      ctx.clearRect(0, 0, canvas.width, canvas.height)
      for (const p of particles) {
        p.y -= p.s
        if (p.y < -0.02) {
          p.y = 1.02
          p.x = Math.random()
        }
        const px = p.x * canvas.width
        const py = p.y * canvas.height
        ctx.beginPath()
        ctx.arc(px, py, p.r, 0, Math.PI * 2)
        ctx.fillStyle = `rgba(212, 177, 90, ${p.a})`
        ctx.fill()
      }
      raf = requestAnimationFrame(draw)
    }
    draw()

    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
    }
  }, [open, status])

  if (!open) return null

  return (
    <div className="fixed inset-0 z-[80] flex flex-col bg-black">
      {/* Camera feed / fallback backdrop */}
      {status === 'live' ? (
        <video
          ref={videoRef}
          playsInline
          muted
          className="absolute inset-0 h-full w-full object-cover"
        />
      ) : (
        <div className="absolute inset-0 bg-gradient-to-b from-[#141210] via-black to-black" />
      )}

      {/* Particle layer */}
      <canvas
        ref={canvasRef}
        className="pointer-events-none absolute inset-0 h-full w-full"
      />

      {/* Floating artwork */}
      <div className="pointer-events-none absolute inset-0 flex items-center justify-center">
        <div
          className={cn(
            'relative w-[62%] max-w-sm',
            status === 'fallback' && 'animate-[float_5s_ease-in-out_infinite]',
          )}
          style={{
            filter: 'drop-shadow(0 30px 60px rgba(0,0,0,0.6))',
          }}
        >
          <div className="border-[6px] border-[#0a0a0a] bg-[#0a0a0a] p-2 shadow-2xl">
            <div className="relative aspect-[3/4] w-full overflow-hidden">
              <Image
                src={product.image || '/placeholder.svg'}
                alt={product.title}
                fill
                className="object-cover"
                sizes="400px"
              />
              <div className="absolute inset-0 animate-pulse bg-gradient-to-t from-accent/20 via-transparent to-transparent" />
            </div>
          </div>
        </div>
      </div>

      {/* Header */}
      <div className="relative z-10 flex items-center justify-between px-5 py-5">
        <div className="flex items-center gap-2 rounded-full bg-black/40 px-3 py-1.5 backdrop-blur-sm">
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent opacity-75" />
            <span className="relative inline-flex size-2 rounded-full bg-accent" />
          </span>
          <span className="text-[10px] uppercase tracking-luxe-sm text-white">
            {status === 'live'
              ? 'AR live'
              : status === 'requesting'
                ? 'Starting camera'
                : 'Preview mode'}
          </span>
        </div>
        <button
          type="button"
          onClick={onClose}
          aria-label="Exit AR"
          className="flex size-10 items-center justify-center rounded-full bg-black/40 text-white backdrop-blur-sm"
        >
          <X className="size-5" />
        </button>
      </div>

      {/* Reticle */}
      <div className="pointer-events-none relative z-0 flex flex-1 items-center justify-center">
        {status === 'requesting' && (
          <ScanLine className="size-12 animate-pulse text-accent" />
        )}
      </div>

      {/* Footer info */}
      <div className="relative z-10 px-5 pb-8 text-center">
        <p className="font-serif text-2xl text-white">{product.title}</p>
        <p className="mt-1 text-[11px] uppercase tracking-luxe-sm text-white/60">
          {status === 'fallback'
            ? '3D preview — grant camera access for full AR'
            : `Augmented reveal · ${product.arDurationSeconds}s loop`}
        </p>
        {status === 'fallback' && (
          <button
            type="button"
            onClick={() => setStatus('requesting')}
            className="mt-4 inline-flex items-center gap-2 border border-white/30 px-5 py-3 text-[11px] uppercase tracking-luxe-sm text-white"
          >
            <Camera className="size-4" />
            Retry camera
          </button>
        )}
      </div>

      <style jsx>{`
        @keyframes float {
          0%,
          100% {
            transform: translateY(0) rotate(-1deg);
          }
          50% {
            transform: translateY(-16px) rotate(1deg);
          }
        }
      `}</style>
    </div>
  )
}
