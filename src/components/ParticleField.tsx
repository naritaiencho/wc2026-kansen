import { useEffect, useRef } from 'react'

interface Particle {
  x: number
  y: number
  vx: number
  vy: number
  r: number
  hue: number
}

/** カーソルに反応するパーティクル星座 — ヒーローのWOW要素 */
export default function ParticleField({ density = 70 }: { density?: number }) {
  const canvasRef = useRef<HTMLCanvasElement>(null)
  const mouseRef = useRef({ x: -9999, y: -9999 })

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d')
    if (!ctx) return

    let particles: Particle[] = []
    let raf = 0
    let width = 0
    let height = 0

    const palette = [212, 48, 152] // blue, gold, green hues

    const resize = () => {
      const parent = canvas.parentElement
      if (!parent) return
      width = parent.clientWidth
      height = parent.clientHeight
      const dpr = Math.min(window.devicePixelRatio || 1, 2)
      canvas.width = width * dpr
      canvas.height = height * dpr
      canvas.style.width = `${width}px`
      canvas.style.height = `${height}px`
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
      const count = Math.min(density, Math.floor((width * height) / 16000))
      particles = Array.from({ length: count }, () => ({
        x: Math.random() * width,
        y: Math.random() * height,
        vx: (Math.random() - 0.5) * 0.35,
        vy: (Math.random() - 0.5) * 0.35,
        r: 1 + Math.random() * 2.2,
        hue: palette[Math.floor(Math.random() * palette.length)],
      }))
    }

    const onMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect()
      mouseRef.current = { x: e.clientX - rect.left, y: e.clientY - rect.top }
    }
    const onLeave = () => {
      mouseRef.current = { x: -9999, y: -9999 }
    }

    const tick = () => {
      ctx.clearRect(0, 0, width, height)
      const mouse = mouseRef.current

      for (const p of particles) {
        // repulsion from cursor
        const dx = p.x - mouse.x
        const dy = p.y - mouse.y
        const dist2 = dx * dx + dy * dy
        if (dist2 < 14400) {
          const dist = Math.sqrt(dist2) || 1
          const force = (120 - dist) / 120
          p.vx += (dx / dist) * force * 0.6
          p.vy += (dy / dist) * force * 0.6
        }
        p.vx *= 0.98
        p.vy *= 0.98
        // gentle drift floor
        if (Math.abs(p.vx) < 0.05) p.vx += (Math.random() - 0.5) * 0.04
        if (Math.abs(p.vy) < 0.05) p.vy += (Math.random() - 0.5) * 0.04
        p.x += p.vx
        p.y += p.vy
        if (p.x < -10) p.x = width + 10
        if (p.x > width + 10) p.x = -10
        if (p.y < -10) p.y = height + 10
        if (p.y > height + 10) p.y = -10
      }

      // constellation lines
      ctx.lineWidth = 0.6
      for (let i = 0; i < particles.length; i++) {
        for (let j = i + 1; j < particles.length; j++) {
          const a = particles[i]
          const b = particles[j]
          const dx = a.x - b.x
          const dy = a.y - b.y
          const d2 = dx * dx + dy * dy
          if (d2 < 13000) {
            const alpha = 0.14 * (1 - d2 / 13000)
            ctx.strokeStyle = `hsla(${a.hue}, 90%, 70%, ${alpha})`
            ctx.beginPath()
            ctx.moveTo(a.x, a.y)
            ctx.lineTo(b.x, b.y)
            ctx.stroke()
          }
        }
      }

      for (const p of particles) {
        ctx.fillStyle = `hsla(${p.hue}, 95%, 68%, 0.8)`
        ctx.beginPath()
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2)
        ctx.fill()
      }

      raf = requestAnimationFrame(tick)
    }

    resize()
    tick()
    window.addEventListener('resize', resize)
    canvas.parentElement?.addEventListener('mousemove', onMove)
    canvas.parentElement?.addEventListener('mouseleave', onLeave)
    return () => {
      cancelAnimationFrame(raf)
      window.removeEventListener('resize', resize)
      canvas.parentElement?.removeEventListener('mousemove', onMove)
      canvas.parentElement?.removeEventListener('mouseleave', onLeave)
    }
  }, [density])

  return <canvas ref={canvasRef} className="absolute inset-0 z-0" aria-hidden />
}
