import { useRef, useEffect } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function ProfileCard({ src, alt, badge, subtitle, detail, active = false, onActivate, onOpen }) {
  const cardRef = useRef(null)
  const imgRef = useRef(null)
  const revealed = useRef(false)

  useEffect(() => {
    if (revealed.current || !cardRef.current) return
    revealed.current = true
    gsap.fromTo(
      cardRef.current,
      { opacity: 0, y: 16, scale: 0.96 },
      {
        opacity: 1,
        y: 0,
        scale: 1,
        duration: 0.6,
        ease: 'power2.out',
        scrollTrigger: { trigger: cardRef.current, start: 'top 85%', once: true },
      }
    )
  }, [])

  useEffect(() => {
    if (!cardRef.current) return
    gsap.to(cardRef.current, {
      scale: active ? 1.04 : 1,
      y: active ? -8 : 0,
      duration: 0.35,
      ease: 'power2.out',
    })
  }, [active])

  useEffect(() => {
    if (!imgRef.current) return
    gsap.to(imgRef.current, {
      scale: active ? 1.04 : 1,
      duration: 0.5,
      ease: 'power2.out',
    })
  }, [active])

  return (
    <div
      ref={cardRef}
      className="relative w-64 h-80 md:w-72 md:h-96 cursor-pointer opacity-0 transition-transform duration-200 hover:scale-105 hover:-translate-y-1.5"
      style={{ willChange: 'transform' }}
      onMouseEnter={onActivate}
      onClick={onOpen || onActivate}
    >
      {/* Glow via box-shadow (GPU-composited, not blur-xl) */}
      <div
        className={`absolute inset-0 rounded-2xl transition-opacity ${active ? 'opacity-100' : 'opacity-60'}`}
        style={{
          boxShadow: `0 0 40px 8px rgb(var(--accent-primary) / 0.25)`,
        }}
      />

      <div
        className={`relative h-full rounded-2xl bg-dark-secondary/90 overflow-hidden shadow-xl border transition-colors ${
          active ? 'border-accent-teal/80' : 'border-accent-teal/20'
        }`}
      >
        <div className="h-3/5 overflow-hidden">
          <img
            ref={imgRef}
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
          />
        </div>

        <div className="h-2/5 px-4 py-3 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.18em] text-accent-teal/70 mb-1">
              PROFILE
            </p>
            <h3 className="text-base font-semibold text-gray-100 leading-snug line-clamp-2">
              {alt}
            </h3>
            {subtitle && (
              <p className="mt-1 text-xs text-gray-400 line-clamp-2">{subtitle}</p>
            )}
          </div>

          <div className="flex items-center justify-between">
            {badge && (
              <div className="inline-flex items-center gap-2 rounded-full bg-accent-teal/10 border border-accent-teal/40 px-3 py-1 text-xs font-code text-accent-teal">
                <span className="h-1.5 w-1.5 rounded-full bg-accent-teal animate-pulse" />
                <span>{badge}</span>
              </div>
            )}
            <span className="text-[10px] text-gray-500 ml-auto font-code">tap to expand →</span>
          </div>
        </div>
      </div>
    </div>
  )
}

export default ProfileCard

