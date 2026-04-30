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
      const tl = gsap.timeline({ defaults: { ease: 'power4.out' } })
      
      tl.fromTo('.hero-eyebrow', { opacity: 0, x: -20 }, { opacity: 1, x: 0, duration: 1 }, 0.2)
        .fromTo('.hero-name', { opacity: 0, clipPath: 'inset(0 100% 0 0)' }, { opacity: 1, clipPath: 'inset(0 0% 0 0)', duration: 1.2 }, 0.4)
        .fromTo('.hero-headline', { opacity: 0, y: 50, rotation: 2 }, { opacity: 1, y: 0, rotation: 0, duration: 1.2 }, 0.5)
        .fromTo('.hero-image', { opacity: 0, scale: 0.9, clipPath: 'inset(100% 0 0 0)' }, { opacity: 1, scale: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power4.out' }, 0.6)
        .fromTo('.hero-subtitle', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 1 }, 0.8)
        .fromTo('.hero-stats', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.0)
        .fromTo('.hero-cta', { opacity: 0, y: 20 }, { opacity: 1, y: 0, duration: 0.8 }, 1.1)
        .fromTo('.hero-tech', { opacity: 0 }, { opacity: 1, duration: 1 }, 1.3)

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
      className="min-h-screen flex flex-col justify-center pt-28 pb-16 px-4 sm:px-6 md:px-12 lg:px-24 relative overflow-hidden"
    >
      {/* Background glow effects */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 pointer-events-none">
        <div className="absolute top-[-5%] left-[-10%] w-[60%] md:w-[40%] h-[40%] bg-accent-primary/20 blur-[80px] md:blur-[120px] rounded-full"></div>
        <div className="absolute bottom-[-5%] right-[-10%] w-[50%] md:w-[30%] h-[30%] bg-accent-secondary/20 blur-[80px] md:blur-[100px] rounded-full"></div>
      </div>

      <div className="max-w-7xl mx-auto w-full flex flex-col relative z-10 mt-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center w-full">
          <div className="lg:col-span-7 flex flex-col items-start z-20">
          <div className="hero-eyebrow mb-6 opacity-0">
            <p className="section-eyebrow justify-start">Creative Engineer · PH</p>
          </div>

          <div className="hero-name mb-6 opacity-0">
            <DecryptedText
              text="Jose Bernard Fernandez"
              animateOn="view"
              sequential
              revealDirection="center"
              speed={35}
              parentClassName="inline-block font-display text-2xl sm:text-3xl md:text-5xl font-bold tracking-tight"
              className="text-porcelain"
              encryptedClassName="text-accent-secondary"
            />
          </div>

          {/* Main headline with animated roles */}
          <div className="hero-headline opacity-0 mb-6 md:mb-8 w-full relative z-30 min-w-0">
            <h1 className="text-5xl sm:text-6xl md:text-7xl lg:text-[6rem] xl:text-[7.5rem] font-bold font-display leading-[1.0] md:leading-[0.9] tracking-tighter uppercase break-words z-30 relative drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Creating</span>
              <br />
              <span ref={roleRef} className="text-porcelain inline-block mt-2 lg:-ml-2">
                {roles[currentRoleIndex]}
              </span>
            </h1>
          </div>

          {/* Subtitle & Stats Row */}
          <div className="flex flex-col gap-8 items-start w-full max-w-xl mt-4">
            <p className="hero-subtitle text-lg md:text-xl text-gray-400 opacity-0 leading-relaxed">
              A passionate developer specializing in scalable web
              systems, beautiful interfaces, and AI-integrated solutions. Crafting
              digital experiences that leave a mark.
            </p>

            {gitHubStats && (
              <div className="hero-stats glass-card px-6 py-4 opacity-0 flex flex-col gap-2 min-w-[200px]">
                <div className="text-xs font-display uppercase tracking-widest text-gray-500">Github Impact</div>
                <div className="flex items-center gap-4">
                  <span className="text-porcelain font-display font-bold text-lg"><span className="text-accent-primary">⭐</span> {gitHubStats.repos}</span>
                  <span className="text-porcelain font-display font-bold text-lg">
                    <span className="text-accent-secondary">👥</span> {gitHubStats.followers}
                  </span>
                </div>
              </div>
            )}
          </div>

          {/* CTA Buttons */}
          <div className="hero-cta flex flex-col sm:flex-row gap-4 sm:gap-6 mt-12 opacity-0 w-full sm:w-auto">
            <a
              href="#featured"
              className="group relative px-6 md:px-8 py-4 bg-porcelain text-dark-bg font-bold font-display uppercase tracking-widest text-xs md:text-sm overflow-hidden text-center"
            >
              <span className="relative z-10 transition-colors group-hover:text-porcelain">View Projects</span>
              <div className="absolute inset-0 bg-accent-primary transform scale-x-0 origin-left transition-transform duration-500 group-hover:scale-x-100"></div>
            </a>
            <a
              href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`}
              target="_blank"
              className="group px-6 md:px-8 py-4 border border-white/20 text-porcelain font-bold font-display uppercase tracking-widest text-xs md:text-sm hover:border-white/50 transition-colors flex items-center justify-center gap-2"
            >
              GitHub <span className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform">↗</span>
            </a>
          </div>

          <div className="hero-tech opacity-0 mt-16">
            <p className="text-sm text-gray-400 font-display mb-4 uppercase tracking-widest">Tech Stack</p>
            <TechStackIcons />
          </div>
        </div>

        {/* Hero Image Profile */}
        <div className="lg:col-span-5 relative w-full h-[50vh] lg:h-[80vh] hero-image opacity-0 z-10 mt-8 lg:mt-0">
          <div className="absolute inset-0 bg-gradient-to-r from-dark-bg via-dark-bg/50 to-transparent z-10 lg:hidden"></div>
          <div className="absolute inset-0 bg-gradient-to-t from-dark-bg via-transparent to-transparent z-10"></div>
          <div className="absolute inset-0 bg-accent-primary/10 mix-blend-overlay z-10"></div>
          <img 
            src="/profile-outdoor.png" 
            alt="Jose Bernard" 
            className="w-full h-full object-cover rounded-2xl grayscale hover:grayscale-0 transition-all duration-700 shadow-2xl"
          />
        </div>
      </div>

      {/* Scroll indicator */}
      <div className="hero-scroll-indicator flex justify-center mt-16">
        <svg
          className="w-6 h-6 text-accent-primary"
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
