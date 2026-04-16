import { useEffect, useRef, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import ProfileCard from './ProfileCard'

gsap.registerPlugin(ScrollTrigger)

const profiles = [
  {
    src: '/profile-outdoor.png',
    alt: 'Jose Bernard outdoors in the mountain',
    subtitle: 'Grounded in nature, always looking for the next challenge.',
    badge: 'Full-stack dev - PH',
    detail: "Most days you'll find me exploring new places, sketching systems in my head, and thinking about how tech can improve day-to-day life. The outdoors remind me that the best solutions are often the simplest ones.",
  },
  {
    src: '/profile-indoor.png',
    alt: 'Jose Bernard in a casual fit',
    subtitle: 'Comfort build: coffee, music, and long coding sessions.',
    badge: 'Available for freelance',
    detail: "When I'm indoors, I'm usually deep into code, experimenting with new stacks, or polishing UI details until everything feels just right. Late nights, lo-fi beats, and a good terminal font.",
  },
]

function ProfileModal({ profile, onClose }) {
  useEffect(() => {
    const handler = (e) => { if (e.key === 'Escape') onClose() }
    window.addEventListener('keydown', handler)
    return () => window.removeEventListener('keydown', handler)
  }, [onClose])

  return (
    <motion.div
      className="fixed inset-0 z-[200] flex items-center justify-center p-4"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.2 }}
    >
      <motion.div
        className="absolute inset-0 bg-black/75"
        style={{ backdropFilter: 'blur(6px)' }}
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
      />
      <motion.div
        className="relative z-10 w-full max-w-md overflow-hidden rounded-2xl border border-accent-teal/30 bg-dark-secondary shadow-2xl"
        initial={{ scale: 0.9, y: 24 }}
        animate={{ scale: 1, y: 0 }}
        exit={{ scale: 0.9, y: 24 }}
        transition={{ type: 'spring', stiffness: 300, damping: 28 }}
      >
        <button
          onClick={onClose}
          className="absolute top-3 right-3 z-20 w-8 h-8 rounded-full bg-dark-bg/70 border border-accent-teal/20 flex items-center justify-center text-gray-400 hover:text-porcelain transition-colors text-sm"
          aria-label="Close"
        >x</button>
        <div className="h-72 overflow-hidden">
          <img src={profile.src} alt={profile.alt} className="w-full h-full object-cover" loading="lazy" />
        </div>
        <div className="p-6">
          <div className="inline-flex items-center gap-2 rounded-full bg-accent-teal/10 border border-accent-teal/40 px-3 py-1 text-xs font-code text-accent-teal mb-4">
            <span className="h-1.5 w-1.5 rounded-full bg-accent-teal animate-pulse" />
            {profile.badge}
          </div>
          <h3 className="text-base font-semibold text-gray-100 mb-2">{profile.alt}</h3>
          <p className="text-sm text-gray-300 leading-relaxed">{profile.detail}</p>
        </div>
      </motion.div>
    </motion.div>
  )
}

function About() {
  const [activeProfile, setActiveProfile] = useState(0)
  const [lastInteraction, setLastInteraction] = useState(() => Date.now())
  const [modalIndex, setModalIndex] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now()
      if (now - lastInteraction > 6000) {
        setActiveProfile((prev) => (prev === 0 ? 1 : 0))
        setLastInteraction(now)
      }
    }, 3000)
    return () => clearInterval(interval)
  }, [lastInteraction])

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-header', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-header', start: 'top 85%', once: true },
      })

      gsap.fromTo('.about-cards .profile-item', { opacity: 0, y: 16 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-cards', start: 'top 85%', once: true },
      })

      gsap.fromTo('.about-text', { opacity: 0, x: 20 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.about-text', start: 'top 85%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="about-header text-center mb-16 opacity-0">
          <p className="section-eyebrow justify-center">Who I am</p>
          <h2 className="text-4xl md:text-5xl font-bold font-code">
            <span className="text-accent-teal">About</span> Me
          </h2>
        </div>

        <div
          className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] gap-12 items-center"
          onMouseMove={() => setLastInteraction(Date.now())}
          onTouchStart={() => setLastInteraction(Date.now())}
        >
          <div className="about-cards flex justify-center">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-end">
              {profiles.map((p, i) => (
                <div key={i} className="profile-item opacity-0">
                  <ProfileCard
                    {...p}
                    active={activeProfile === i}
                    onActivate={() => { setActiveProfile(i); setLastInteraction(Date.now()) }}
                    onOpen={() => setModalIndex(i)}
                  />
                </div>
              ))}
            </div>
          </div>

          <div className="about-text opacity-0">
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              I am a Full-Stack Developer passionate about building scalable systems and elegant
              user experiences. With a strong foundation in Laravel, React, and Flutter, I craft
              solutions that bridge the gap between complex technical requirements and user needs.
            </p>
            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Currently exploring the intersection of IoT, AI, and disaster management systems.
              I believe technology should serve communities and solve real-world problems,
              especially in the Philippine context.
            </p>
            <p className="text-gray-400 mb-8 italic border-l-2 border-accent-amber/40 pl-4">
              "I debug with coffee and deploy with confidence."
            </p>
          </div>
        </div>
      </div>

      <AnimatePresence>
        {modalIndex !== null && (
          <ProfileModal profile={profiles[modalIndex]} onClose={() => setModalIndex(null)} />
        )}
      </AnimatePresence>
    </section>
  )
}

export default About
