import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import axios from 'axios'
import DecryptedText from './DecryptedText'
import TechStackIcons from './TechStackIcons'

function Hero() {
  const [gitHubStats, setGitHubStats] = useState(null)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)
  const sectionRef = useRef(null)
  const roleRef = useRef(null)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const username = import.meta.env.VITE_GITHUB_USERNAME || 'Josepolar'
        const rawToken = import.meta.env.VITE_GITHUB_TOKEN?.trim?.() || ''
        const tokenLooksPlaceholder = /your_(github_)?token/i.test(rawToken) || rawToken === 'your_github_token_here'
        const token = rawToken && !tokenLooksPlaceholder ? rawToken : ''

        const response = await axios.get(`https://api.github.com/users/${username}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          timeout: 15000,
        })
        setGitHubStats({
          followers: response.data.followers,
          repos: response.data.public_repos,
        })
      } catch (error) {
        console.error('Error fetching GitHub stats:', error)
      }
    }

    fetchGitHubStats()
  }, [])

  // GSAP entrance timeline
  useEffect(() => {
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ defaults: { ease: 'power2.out' } })
      tl.fromTo('.hero-eyebrow', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.05)
        .fromTo('.hero-name', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.8 }, 0.1)
        .fromTo('.hero-headline', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.15)
        .fromTo('.hero-subtitle', { opacity: 0 }, { opacity: 1, duration: 0.8 }, 0.3)
        .fromTo('.hero-stats', { opacity: 0, scale: 0.8 }, { opacity: 1, scale: 1, duration: 0.5 }, 0.5)
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 0.6)
        .fromTo('.hero-tech', { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.6 }, 0.75)

      // Scroll indicator bounce
      gsap.to('.hero-scroll-indicator', {
        y: 10,
        duration: 1,
        ease: 'power1.inOut',
        repeat: -1,
        yoyo: true,
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  // Cycle through roles
  const roles = [
    'Full-Stack Developer',
    'Laravel Engineer',
    'Flutter Builder',
    'AI Systems Thinker',
    'IoT Enthusiast',
  ]

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [roles.length])

  // Animate role text swap with GSAP
  useEffect(() => {
    if (!roleRef.current) return
    gsap.fromTo(roleRef.current, { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.5, ease: 'power2.out' })
  }, [currentRoleIndex])

  return (
    <section
      ref={sectionRef}
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <div className="hero-eyebrow mb-4 opacity-0">
          <p className="section-eyebrow justify-center">Full-Stack Developer · Philippines</p>
        </div>

        <div className="hero-name mb-6 opacity-0">
          <DecryptedText
            text="jose Bernard fernandez"
            animateOn="view"
            sequential
            revealDirection="center"
            speed={35}
            parentClassName="inline-block font-code text-2xl md:text-3xl tracking-wide"
            className="text-accent-teal"
            encryptedClassName="text-accent-amber"
          />
        </div>

        {/* Main headline with animated roles */}
        <div className="hero-headline opacity-0">
          <h1 className="text-5xl md:text-7xl font-bold font-code mb-6 leading-tight">
            <span className="text-accent-teal">I Build</span>
            <br />
            <span ref={roleRef} className="text-accent-amber inline-block">
              {roles[currentRoleIndex]}
            </span>
          </h1>
        </div>

        {/* Subtitle */}
        <p className="hero-subtitle text-xl text-gray-300 mb-8 max-w-2xl mx-auto opacity-0">
          A passionate developer from the Philippines specializing in scalable web
          systems, mobile applications, and AI-integrated solutions. Currently crafting
          digital experiences that matter.
        </p>

        {/* GitHub stats pill */}
        {gitHubStats && (
          <div className="hero-stats inline-block glass-card px-6 py-3 mb-8 text-sm opacity-0">
            <span className="text-accent-teal font-code">⭐ {gitHubStats.repos}</span>
            <span className="mx-3 text-gray-600">•</span>
            <span className="text-accent-amber font-code">
              👥 {gitHubStats.followers}
            </span>
          </div>
        )}

        {/* CTA Buttons */}
        <div className="hero-cta flex flex-col sm:flex-row gap-4 justify-center mb-12 opacity-0">
          <a
            href="#featured"
            className="px-8 py-3 bg-accent-teal text-dark-bg font-bold rounded-lg hover:bg-accent-amber hover:scale-105 active:scale-95 transition-all"
          >
            View Projects
          </a>
          <a
            href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`}
            target="_blank"
            className="px-8 py-3 border-2 border-accent-teal text-accent-teal font-bold rounded-lg hover:bg-accent-teal/10 hover:scale-105 active:scale-95 transition-all"
          >
            GitHub ↗
          </a>
        </div>

        <div className="hero-tech opacity-0">
          <p className="text-sm text-gray-400 font-code mb-4">Tech I ship with</p>
          <TechStackIcons />
        </div>

        {/* Scroll indicator */}
        <div className="hero-scroll-indicator flex justify-center mt-16">
          <svg
            className="w-6 h-6 text-accent-teal"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </div>
      </div>
    </section>
  )
}

export default Hero
