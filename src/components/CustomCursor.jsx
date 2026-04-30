import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'

export default function CustomCursor() {
  const cursorRef = useRef(null)
  const [isHovering, setIsHovering] = useState(false)

  useEffect(() => {
    // Only enable on non-touch devices
    if (window.matchMedia('(pointer: coarse)').matches) {
      if (cursorRef.current) cursorRef.current.style.display = 'none'
      return
    }

    const cursor = cursorRef.current
    if (!cursor) return

    // Setup initial cursor tracking with gsap quickTo for high performance
    const xTo = gsap.quickTo(cursor, "x", { duration: 0.2, ease: "power3" })
    const yTo = gsap.quickTo(cursor, "y", { duration: 0.2, ease: "power3" })

    const moveCursor = (e) => {
      xTo(e.clientX)
      yTo(e.clientY)
    }

    const handleMouseOver = (e) => {
      const target = e.target
      if (
        target.tagName.toLowerCase() === 'a' ||
        target.tagName.toLowerCase() === 'button' ||
        target.closest('a') ||
        target.closest('button')
      ) {
        setIsHovering(true)
      } else {
        setIsHovering(false)
      }
    }

    window.addEventListener('mousemove', moveCursor)
    window.addEventListener('mouseover', handleMouseOver)

    return () => {
      window.removeEventListener('mousemove', moveCursor)
      window.removeEventListener('mouseover', handleMouseOver)
    }
  }, [])

  useEffect(() => {
    const cursor = cursorRef.current
    if (!cursor) return

    if (isHovering) {
      gsap.to(cursor, {
        scale: 3.5,
        backgroundColor: 'rgba(255,255,255,1)',
        duration: 0.3,
        ease: 'power3.out'
      })
    } else {
      gsap.to(cursor, {
        scale: 1,
        backgroundColor: 'rgba(255,255,255,0.5)',
        duration: 0.3,
        ease: 'power3.out'
      })
    }
  }, [isHovering])

  return (
    <div
      ref={cursorRef}
      className="fixed top-0 left-0 w-4 h-4 rounded-full pointer-events-none z-[9999] mix-blend-difference"
      style={{ transform: 'translate(-50%, -50%)', left: 0, top: 0 }}
    ></div>
  )
}
