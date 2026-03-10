import { useEffect, useMemo, useRef, useState } from 'react'

const DEFAULT_CHARS =
  'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()_+-=[]{};:,.<>/?'

function clamp(n, min, max) {
  return Math.max(min, Math.min(max, n))
}

function buildScrambleChars(text, useOriginalCharsOnly) {
  if (!useOriginalCharsOnly) return DEFAULT_CHARS
  const set = new Set(text.split(''))
  return Array.from(set).join('') || DEFAULT_CHARS
}

function getRevealOrder(length, revealDirection) {
  if (revealDirection === 'end') {
    return Array.from({ length }, (_, i) => length - 1 - i)
  }
  if (revealDirection === 'center') {
    const order = []
    const leftCenter = Math.floor((length - 1) / 2)
    const rightCenter = Math.ceil((length - 1) / 2)
    order.push(leftCenter)
    if (rightCenter !== leftCenter) order.push(rightCenter)
    for (let offset = 1; order.length < length; offset += 1) {
      const l = leftCenter - offset
      const r = rightCenter + offset
      if (l >= 0) order.push(l)
      if (r < length) order.push(r)
    }
    return order
  }
  return Array.from({ length }, (_, i) => i) // start
}

function DecryptedText({
  text = '',
  speed = 50,
  maxIterations = 10,
  sequential = false,
  revealDirection = 'start',
  useOriginalCharsOnly = false,
  className = '',
  parentClassName = '',
  encryptedClassName = '',
  animateOn = 'hover',
  clickMode = 'once',
}) {
  const containerRef = useRef(null)
  const intervalRef = useRef(null)
  const hasAnimatedOnceRef = useRef(false)

  const [output, setOutput] = useState(text)
  const [isActive, setIsActive] = useState(false)

  const safeSpeed = clamp(Number(speed) || 50, 10, 2000)
  const scrambleChars = useMemo(
    () => buildScrambleChars(text, useOriginalCharsOnly),
    [text, useOriginalCharsOnly]
  )
  const revealOrder = useMemo(
    () => getRevealOrder(text.length, revealDirection),
    [text.length, revealDirection]
  )

  const stop = () => {
    if (intervalRef.current) window.clearInterval(intervalRef.current)
    intervalRef.current = null
    setIsActive(false)
  }

  const start = () => {
    if (!text) return
    if (animateOn === 'click' && clickMode === 'once' && hasAnimatedOnceRef.current) return

    stop()
    setIsActive(true)

    if (sequential) {
      let revealedCount = 0
      intervalRef.current = window.setInterval(() => {
        setOutput(() => {
          const revealedSet = new Set(revealOrder.slice(0, revealedCount + 1))
          const next = text
            .split('')
            .map((ch, i) =>
              revealedSet.has(i)
                ? ch
                : scrambleChars[Math.floor(Math.random() * scrambleChars.length)]
            )
            .join('')
          return next
        })

        revealedCount += 1
        if (revealedCount >= text.length) {
          hasAnimatedOnceRef.current = true
          setOutput(text)
          stop()
        }
      }, safeSpeed)
      return
    }

    let iterations = 0
    intervalRef.current = window.setInterval(() => {
      setOutput(() =>
        text
          .split('')
          .map(() => scrambleChars[Math.floor(Math.random() * scrambleChars.length)])
          .join('')
      )
      iterations += 1
      if (iterations >= maxIterations) {
        hasAnimatedOnceRef.current = true
        setOutput(text)
        stop()
      }
    }, safeSpeed)
  }

  useEffect(() => {
    setOutput(text)
    stop()
    hasAnimatedOnceRef.current = false
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [text])

  useEffect(() => {
    if (animateOn !== 'view' && animateOn !== 'inViewHover') return
    const el = containerRef.current
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries[0]
        if (entry?.isIntersecting) {
          start()
          if (animateOn === 'view') observer.disconnect()
        }
      },
      { threshold: 0.35 }
    )

    observer.observe(el)
    return () => observer.disconnect()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [animateOn, text, sequential, revealDirection, safeSpeed, maxIterations, scrambleChars])

  useEffect(() => () => stop(), [])

  const handleMouseEnter = () => {
    if (animateOn === 'hover' || animateOn === 'inViewHover') start()
  }

  const handleClick = () => {
    if (animateOn !== 'click') return
    if (clickMode === 'toggle') {
      if (isActive) {
        stop()
        setOutput(text)
        return
      }
      start()
      return
    }
    start()
  }

  return (
    <span
      ref={containerRef}
      className={parentClassName}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      role={animateOn === 'click' ? 'button' : undefined}
      tabIndex={animateOn === 'click' ? 0 : undefined}
      onKeyDown={(e) => {
        if (animateOn === 'click' && (e.key === 'Enter' || e.key === ' ')) handleClick()
      }}
    >
      <span className={isActive ? encryptedClassName : className}>{output}</span>
    </span>
  )
}

export default DecryptedText

