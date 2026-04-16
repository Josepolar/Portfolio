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
    <section id="featured" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="featured-header text-center mb-16 opacity-0">
          <p className="section-eyebrow justify-center">Open source</p>
          <h2 className="text-4xl md:text-5xl font-bold font-code">
            <span className="text-accent-teal">GitHub</span> Contributions
          </h2>
        </div>

        <GitHubContributions theme={theme} username={username} />
      </div>
    </section>
  )
}

export default FeaturedProjects
