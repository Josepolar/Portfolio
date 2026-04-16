import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

/**
 * Lightweight GSAP ScrollTrigger hook — animates a ref when it enters the viewport.
 * All work happens in the DOM via GSAP; zero React re-renders on scroll.
 *
 * @param {object}  [from]      - GSAP "from" values  (default: { opacity: 0, y: 40 })
 * @param {object}  [to]        - GSAP "to" values    (default: { opacity: 1, y: 0 })
 * @param {object}  [trigger]   - ScrollTrigger config overrides
 * @param {number}  [duration]  - seconds (default 0.8)
 * @param {number}  [delay]     - seconds (default 0)
 * @param {string}  [ease]      - GSAP ease (default 'power2.out')
 */
export default function useScrollReveal({
  from = { opacity: 0, y: 40 },
  to = {},
  trigger = {},
  duration = 0.8,
  delay = 0,
  ease = 'power2.out',
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const tween = gsap.fromTo(
      el,
      from,
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        ...to,
        duration,
        delay,
        ease,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
          ...trigger,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}

/**
 * Batch-reveal children of a container (staggered entrance).
 * Attach `ref` to the parent; children matching `childSelector` are animated.
 */
export function useScrollRevealBatch({
  childSelector = '.reveal-item',
  from = { opacity: 0, y: 30 },
  to = {},
  stagger = 0.08,
  duration = 0.6,
  ease = 'power2.out',
  trigger = {},
} = {}) {
  const ref = useRef(null)

  useEffect(() => {
    const el = ref.current
    if (!el) return

    const children = el.querySelectorAll(childSelector)
    if (!children.length) return

    const tween = gsap.fromTo(
      children,
      from,
      {
        opacity: 1,
        y: 0,
        x: 0,
        scale: 1,
        ...to,
        duration,
        stagger,
        ease,
        scrollTrigger: {
          trigger: el,
          start: 'top 85%',
          toggleActions: 'play none none none',
          once: true,
          ...trigger,
        },
      },
    )

    return () => {
      tween.scrollTrigger?.kill()
      tween.kill()
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  return ref
}
