import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

const FRAMES = [
  { src: '/scroll-craft/01.png', alt: 'Wide aerial view over Metro Manila and Antipolo' },
  { src: '/scroll-craft/02.png', alt: 'Aerial descent toward Antipolo through clouds' },
  { src: '/scroll-craft/03.png', alt: 'Closer aerial view of Antipolo terrain' },
  { src: '/scroll-craft/04.png', alt: 'Detailed satellite view of Antipolo' },
  { src: '/scroll-craft/05.png', alt: 'Angled aerial view of the Antipolo mountains' },
  { src: '/scroll-craft/06.png', alt: 'Jose Bernard Fernandez in the Antipolo mountains at golden hour' },
]

function CinematicIntro() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const root = sectionRef.current
    if (!root) return undefined

    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)')
    const ctx = gsap.context(() => {
      gsap.registerPlugin(ScrollTrigger)
      const frames = gsap.utils.toArray('.antipolo-frame')
      const clouds = gsap.utils.toArray('.antipolo-cloud')
      const openingCopy = gsap.utils.toArray('.antipolo-opening-copy')
      const finalCopy = gsap.utils.toArray('.antipolo-final-copy')
      const stage = root.querySelector('.antipolo-stage')

      gsap.set(frames, { opacity: 0 })
      gsap.set(frames[0], { opacity: 1 })
      gsap.set(finalCopy, { opacity: 0, y: 30 })

      if (reduceMotion.matches) {
        gsap.set(frames, { opacity: 0 })
        gsap.set(frames[5], { opacity: 1 })
        gsap.set(openingCopy, { opacity: 0 })
        gsap.set(finalCopy, { opacity: 1, y: 0 })
        return
      }

      const camera = gsap.timeline({
        scrollTrigger: {
          trigger: root,
          start: 'top top',
          end: 'bottom bottom',
          scrub: 1.1,
          onUpdate: (self) => root.style.setProperty('--sc-p', self.progress.toFixed(4)),
        },
      })

      camera.to(frames[0], { opacity: 1, scale: 1.12, xPercent: -1, duration: 0.15, ease: 'none' }, 0)
        .to(frames[1], { opacity: 1, scale: 1.14, xPercent: 0, duration: 0.15, ease: 'none' }, 0.15)
        .to(frames[0], { opacity: 0, duration: 0.12, ease: 'power1.inOut' }, 0.18)
        .to(frames[1], { scale: 1.22, yPercent: -3, duration: 0.15, ease: 'none' }, 0.22)
        .to(frames[2], { opacity: 1, scale: 1.16, duration: 0.15, ease: 'none' }, 0.30)
        .to(frames[1], { opacity: 0, duration: 0.12, ease: 'power1.inOut' }, 0.34)
        .to(frames[2], { scale: 1.28, yPercent: -4, duration: 0.16, ease: 'none' }, 0.38)
        .to(frames[3], { opacity: 1, scale: 1.18, rotateX: 4, transformPerspective: 900, duration: 0.15, ease: 'none' }, 0.46)
        .to(frames[2], { opacity: 0, duration: 0.12, ease: 'power1.inOut' }, 0.50)
        .to(frames[3], { scale: 1.34, yPercent: -5, rotateX: 20, duration: 0.16, ease: 'none' }, 0.54)
        .to(frames[4], { opacity: 1, scale: 1.17, rotateX: 13, xPercent: 1, transformPerspective: 800, duration: 0.15, ease: 'none' }, 0.62)
        .to(frames[3], { opacity: 0, duration: 0.12, ease: 'power1.inOut' }, 0.67)
        .to(frames[4], { scale: 1.09, yPercent: -2, rotateX: 5, duration: 0.12, ease: 'none' }, 0.72)
        .to(frames[5], { opacity: 1, scale: 1.04, rotateX: 0, xPercent: 0, transformPerspective: 900, duration: 0.16, ease: 'none' }, 0.80)
        .to(frames[4], { opacity: 0, duration: 0.14, ease: 'power1.inOut' }, 0.86)
        .to(frames[5], { scale: 1.01, duration: 0.14, ease: 'none' }, 0.88)
        .to(openingCopy, { opacity: 0, y: -24, stagger: 0.02, duration: 0.14, ease: 'power2.in' }, 0.14)
        .to(finalCopy, { opacity: 1, y: 0, stagger: 0.04, duration: 0.16, ease: 'power3.out' }, 0.79)
        .to(clouds[0], { xPercent: -8, yPercent: -2, opacity: 0.34, duration: 0.7, ease: 'none' }, 0.1)
        .to(clouds[1], { xPercent: 12, yPercent: 3, opacity: 0.48, duration: 0.7, ease: 'none' }, 0.1)
        .to(clouds[2], { xPercent: -18, yPercent: 6, opacity: 0.58, duration: 0.7, ease: 'none' }, 0.1)
        .to(clouds, { opacity: 0, duration: 0.16, ease: 'power1.out' }, 0.78)

      gsap.set(stage, { transformPerspective: 1000 })
    }, root)

    return () => {
      root.style.removeProperty('--sc-p')
      ctx.revert()
    }
  }, [])

  return (
    <section ref={sectionRef} id="hero" className="antipolo-intro" data-sc-act="scrub" data-sc-span="6">
      <div className="antipolo-stage">
        <div className="antipolo-frames" aria-hidden="true">
          {FRAMES.map((frame, index) => (
            <img
              key={frame.src}
              className={`antipolo-frame antipolo-frame--${index + 1}`}
              src={frame.src}
              alt={frame.alt}
              loading={index < 2 ? 'eager' : 'lazy'}
              decoding="async"
            />
          ))}
        </div>

        <div className="antipolo-cloud antipolo-cloud--far" aria-hidden="true" />
        <div className="antipolo-cloud antipolo-cloud--middle" aria-hidden="true" />
        <div className="antipolo-cloud antipolo-cloud--front" aria-hidden="true" />
        <div className="antipolo-vignette" aria-hidden="true" />

        <div className="antipolo-copy antipolo-opening-copy">
          <p className="antipolo-kicker">Antipolo · Philippines</p>
          <h1 className="antipolo-title">Where my story begins.</h1>
          <p className="antipolo-hint">Scroll to descend</p>
        </div>

        <div className="antipolo-copy antipolo-final-copy">
          <p className="antipolo-kicker">Hello, I&apos;m Jose</p>
          <h2 className="antipolo-title antipolo-title--final">Creative engineer<br />building useful things.</h2>
          <p className="antipolo-lede">Full-stack software engineer · Next.js / React / TypeScript · AI / NLP</p>
          <div className="antipolo-actions">
            <a className="antipolo-cta" href="#featured">Enter my work <span aria-hidden="true">↘</span></a>
            <a className="antipolo-cta antipolo-cta--secondary" href="/Jose-Bernard-Fernandez-CV.html" download>Download CV <span aria-hidden="true">↓</span></a>
          </div>
        </div>

        <div className="antipolo-progress" aria-hidden="true">
          <span>01</span><i /><span>06</span>
        </div>
      </div>
    </section>
  )
}

export default CinematicIntro
