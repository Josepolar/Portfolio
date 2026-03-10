import { useEffect, useMemo, useRef } from 'react'

const BAYER_8 = [
  [0, 48, 12, 60, 3, 51, 15, 63],
  [32, 16, 44, 28, 35, 19, 47, 31],
  [8, 56, 4, 52, 11, 59, 7, 55],
  [40, 24, 36, 20, 43, 27, 39, 23],
  [2, 50, 14, 62, 1, 49, 13, 61],
  [34, 18, 46, 30, 33, 17, 45, 29],
  [10, 58, 6, 54, 9, 57, 5, 53],
  [42, 26, 38, 22, 41, 25, 37, 21],
]

function hexToRgb(hex) {
  const h = hex.replace('#', '').trim()
  const full = h.length === 3 ? h.split('').map((c) => c + c).join('') : h
  const n = parseInt(full, 16)
  return { r: (n >> 16) & 255, g: (n >> 8) & 255, b: n & 255 }
}

function lerp(a, b, t) {
  return a + (b - a) * t
}

function smoothstep(edge0, edge1, x) {
  const t = Math.max(0, Math.min(1, (x - edge0) / (edge1 - edge0)))
  return t * t * (3 - 2 * t)
}

function hash2(x, y) {
  // cheap, stable 2D hash -> [0,1)
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123
  return s - Math.floor(s)
}

export default function DitherBackground({
  theme = 'dark',
  className = '',
  opacity = 0.9,
  pixelSize = 2,
  speed = 1,
  quality = 'auto', // 'auto' | 'low' | 'medium' | 'high'
}) {
  const canvasRef = useRef(null)
  const rafRef = useRef(null)

  const palette = useMemo(() => {
    if (theme === 'light') {
      return {
        a: hexToRgb('#e0e1dd'), // porcelain
        b: hexToRgb('#b6bcc5'), // mid tint between slate_mist & porcelain
        c: hexToRgb('#415a77'), // steel_blue
      }
    }
    return {
      a: hexToRgb('#0d1b2a'), // abyss
      b: hexToRgb('#1b263b'), // deep_slate
      c: hexToRgb('#778da9'), // slate_mist
    }
  }, [theme])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return
    const ctx = canvas.getContext('2d', { alpha: true })
    if (!ctx) return

    const dpr = Math.min(2, window.devicePixelRatio || 1)
    let w = 0
    let h = 0
    let rw = 0
    let rh = 0
    let frame = 0
    let lastT = 0
    const targetFps = quality === 'high' ? 60 : quality === 'medium' ? 45 : 30
    const frameMs = 1000 / targetFps
    let img = null
    let off = null
    let octx = null

    const getScale = () => {
      if (quality === 'low') return 0.22
      if (quality === 'medium') return 0.3
      if (quality === 'high') return 0.42
      // auto
      return theme === 'light' ? 0.34 : 0.3
    }

    const resize = () => {
      const rect = canvas.getBoundingClientRect()
      w = Math.max(1, Math.floor(rect.width))
      h = Math.max(1, Math.floor(rect.height))
      canvas.width = Math.floor(w * dpr)
      canvas.height = Math.floor(h * dpr)
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0)

      const scale = getScale()
      rw = Math.max(1, Math.floor(w * scale))
      rh = Math.max(1, Math.floor(h * scale))
      img = ctx.createImageData(rw, rh)

      off = document.createElement('canvas')
      off.width = rw
      off.height = rh
      octx = off.getContext('2d')
    }

    const draw = (now) => {
      rafRef.current = window.requestAnimationFrame(draw)
      if (!img) return

      if (now - lastT < frameMs) return
      lastT = now
      frame += 1

      const data = img.data

      const t = frame * 0.0075 * Math.max(0.1, speed)
      const px = Math.max(1, Math.floor(pixelSize))

      for (let y = 0; y < rh; y += 1) {
        for (let x = 0; x < rw; x += 1) {
          // ReactBits-like: large smooth field + micro noise, then ordered dither
          const nx = x / rw
          const ny = y / rh

          const waveA = Math.sin((nx * 2.1 + ny * 1.4 + t) * Math.PI * 2) * 0.5 + 0.5
          const waveB = Math.sin((nx * 0.9 - ny * 1.8 - t * 0.9) * Math.PI * 2) * 0.5 + 0.5
          const grad = smoothstep(0.0, 1.0, nx * 0.55 + ny * 0.75)
          const n = hash2(Math.floor(x / px), Math.floor(y / px) + frame * 0.25 * speed)

          const field = lerp(waveA, waveB, 0.35)
          const v = Math.max(0, Math.min(1, lerp(grad, field, 0.55) * 0.92 + (n - 0.5) * 0.12))

          // ordered dithering threshold
          const bx = Math.floor(x / px) % 8
          const by = Math.floor(y / px) % 8
          const threshold = (BAYER_8[by][bx] + 0.5) / 64
          const bit = v > threshold ? 1 : 0

          // two-tone + subtle accent sparkle (rare)
          const sparkle = hash2((x + frame) * 0.11, (y - frame) * 0.13) > 0.9992 ? 1 : 0
          const base = bit ? palette.b : palette.a
          const col = sparkle ? palette.c : base

          const i = (y * rw + x) * 4
          data[i] = col.r
          data[i + 1] = col.g
          data[i + 2] = col.b
          data[i + 3] = Math.floor(255 * opacity)
        }
      }

      // Draw low-res buffer, scale up crisply
      if (!octx || !off) return
      octx.putImageData(img, 0, 0)

      ctx.save()
      ctx.imageSmoothingEnabled = false
      ctx.clearRect(0, 0, w, h)
      ctx.drawImage(off, 0, 0, rw, rh, 0, 0, w, h)
      ctx.restore()
    }

    resize()
    rafRef.current = window.requestAnimationFrame(draw)

    const onResize = () => {
      resize()
    }
    window.addEventListener('resize', onResize)

    return () => {
      window.removeEventListener('resize', onResize)
      if (rafRef.current) window.cancelAnimationFrame(rafRef.current)
    }
  }, [opacity, palette, pixelSize, quality, speed, theme])

  return (
    <div
      className={className}
      aria-hidden="true"
      style={{
        position: 'fixed',
        inset: 0,
        zIndex: -10,
        pointerEvents: 'none',
      }}
    >
      <canvas
        ref={canvasRef}
        style={{
          width: '100%',
          height: '100%',
          display: 'block',
          imageRendering: 'pixelated',
          filter:
            theme === 'light'
              ? 'contrast(1.06) saturate(0.92) blur(0.25px)'
              : 'contrast(1.18) saturate(1.05) blur(0.25px)',
        }}
      />
    </div>
  )
}

