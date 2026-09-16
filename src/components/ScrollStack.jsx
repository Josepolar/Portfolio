/**
 * ScrollStack — scroll-driven card stacking effect.
 * Each card slides up into a sticky "deck" position as you scroll.
 * Cards that are buried in the deck scale down, giving depth.
 *
 * Uses `useLenis` for perfectly smooth scroll tracking (no React state
 * updates on scroll — all transforms via direct DOM refs).
 */
import { useRef, useEffect, useCallback, Children } from 'react'
import { useLenis } from 'lenis/react'

export function ScrollStackItem({ children, className = '' }) {
  return <div className={className}>{children}</div>
}

function getResponsiveSettings(width, itemDistance, stackPosition, baseScale, itemScale) {
  if (width < 768) {
    return { distance: Math.min(itemDistance, 150), position: '9vh', scale: Math.max(baseScale, 0.94), itemScale: Math.min(itemScale, 0.02) }
  }
  if (width < 1024) {
    return { distance: Math.min(itemDistance, 180), position: '11vh', scale: Math.max(baseScale, 0.9), itemScale: Math.min(itemScale, 0.03) }
  }
  return { distance: itemDistance, position: stackPosition, scale: baseScale, itemScale }
}

export function ScrollStack({
  children,
  itemDistance   = 200,   // px of scroll between each card trigger
  stackPosition  = '14vh',// sticky top offset (where cards rest)
  baseScale      = 0.86,  // minimum scale for the most-buried card
  itemScale      = 0.04,  // scale removed per card layered on top
  rotationAmount = 0,     // optional slight rotation (degrees)
  blurAmount     = 0,     // optional blur for buried cards (px)
  className      = '',
}) {
  const containerRef   = useRef(null)
  const itemRefs       = useRef([])
  const containerTopRef = useRef(null)   // null = not yet measured

  const items = Children.toArray(children)
  const N = items.length

  const applyStack = useCallback((scroll) => {
    const settings = getResponsiveSettings(typeof window !== 'undefined' ? window.innerWidth : 1280, itemDistance, stackPosition, baseScale, itemScale)
    const localScroll = Math.max(0, scroll - (containerTopRef.current ?? 0))

    items.forEach((_, i) => {
      const el = itemRefs.current[i]
      if (!el) return

      const triggerAt = i * settings.distance
      const arriveProgress = Math.min(1, Math.max(0, (localScroll - triggerAt) / settings.distance))
      const cardsAbove = Math.min(
        N - 1 - i,
        Math.max(0, Math.floor((localScroll - triggerAt) / settings.distance)),
      )
      const scale = Math.max(settings.scale, 1 - cardsAbove * settings.itemScale)
      const blur = cardsAbove * blurAmount
      const rotation = cardsAbove * rotationAmount
      const translateY = arriveProgress < 1 ? `${(1 - arriveProgress) * 100}vh` : '0px'

      el.style.transform = `translateY(${translateY}) scale(${scale}) rotate(${rotation}deg)`
      el.style.filter = blur > 0 ? `blur(${blur}px)` : ''
      el.style.opacity = arriveProgress < 0.05 ? '0' : '1'
    })
  }, [baseScale, blurAmount, itemDistance, itemScale, items, N, rotationAmount, stackPosition])

  // Measure container's absolute top once (and on resize)
  useEffect(() => {
    const measure = () => {
      if (!containerRef.current) return
      // Walk offsetParent chain for accurate absolute position
      let top = 0
      let el = containerRef.current
      while (el) {
        top += el.offsetTop
        el = el.offsetParent
      }
      containerTopRef.current = top
      applyStack(window.scrollY)
    }
    measure()
    window.addEventListener('resize', measure)
    const frame = window.requestAnimationFrame(() => applyStack(window.scrollY))
    return () => {
      window.removeEventListener('resize', measure)
      window.cancelAnimationFrame(frame)
    }
  }, [applyStack])

  // Scroll handler — direct DOM updates, zero React re-renders
  useLenis(({ scroll }) => {
    // Lazily initialise containerTop on first scroll event too
    if (containerTopRef.current === null && containerRef.current) {
      containerTopRef.current =
        containerRef.current.getBoundingClientRect().top + scroll
    }
    applyStack(scroll)
  })

  // Reserve a full release runway so the final sticky card clears before the next section.
  const vh = typeof window !== 'undefined' ? window.innerHeight : 800
  const settings = getResponsiveSettings(typeof window !== 'undefined' ? window.innerWidth : 1280, itemDistance, stackPosition, baseScale, itemScale)
  const releaseRunway = vh * (settings.distance < itemDistance ? 1.35 : 1.15)
  const containerHeight = N * settings.distance + releaseRunway

  return (
    <div
      ref={containerRef}
      className={className}
      style={{ height: containerHeight, position: 'relative' }}
    >
      {items.map((child, i) => (
        <div
          key={i}
          style={{
            position: 'sticky',
            top: settings.position,
            zIndex: i + 1,
          }}
        >
          <div
            ref={(el) => (itemRefs.current[i] = el)}
            style={{
              transform: 'translateY(100vh)',   // off-screen before first scroll
              willChange: 'transform',
              transformOrigin: 'top center',
              transition: 'opacity 0.15s ease',
            }}
          >
            {child}
          </div>
        </div>
      ))}
    </div>
  )
}
