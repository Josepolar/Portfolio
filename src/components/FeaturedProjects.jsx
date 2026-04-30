import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import GitHubContributions from './GitHubContributions'

gsap.registerPlugin(ScrollTrigger)

function FeaturedProjects({ theme = 'dark' }) {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'Josepolar'
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.featured-header', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.featured-header', start: 'top 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="featured" className="py-24 md:py-32 px-4 sm:px-6 md:px-12 relative" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="featured-header text-left mb-16 md:mb-20 opacity-0">
          <p className="section-eyebrow justify-start">Open source</p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] font-bold font-display uppercase tracking-tighter leading-[1.0] md:leading-[0.9]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">GitHub</span> <br className="hidden md:block" /> Activity.
          </h2>
        </div>

        <GitHubContributions theme={theme} username={username} />
      </div>
    </section>
  )
}

export default FeaturedProjects
