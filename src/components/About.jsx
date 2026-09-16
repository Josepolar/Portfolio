import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function About() {
  const sectionRef = useRef(null)

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.about-header', { opacity: 0, x: -50 }, {
        opacity: 1, x: 0, duration: 1.2, ease: 'power4.out',
        scrollTrigger: { trigger: '.about-header', start: 'top 80%', once: true },
      })

      gsap.fromTo('.about-image-img', { opacity: 0, scale: 1.1, clipPath: 'inset(100% 0 0 0)' }, {
        opacity: 1, scale: 1, clipPath: 'inset(0% 0 0 0)', duration: 1.5, ease: 'power4.out',
        scrollTrigger: { trigger: '.about-image-wrapper', start: 'top 75%', once: true },
      })

      gsap.fromTo('.about-text p', { opacity: 0, y: 30 }, {
        opacity: 1, y: 0, duration: 1.2, stagger: 0.2, ease: 'power4.out',
        scrollTrigger: { trigger: '.about-text', start: 'top 75%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="about" className="py-24 md:py-32 relative min-h-[150vh]" ref={sectionRef}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 md:px-12 h-full">
        
        <div className="grid lg:grid-cols-2 gap-16 lg:gap-24 h-full relative">
          
          {/* Sticky Image Column */}
          <div className="lg:sticky lg:top-24 lg:h-[80vh] w-full h-[60vh] flex items-center z-10 about-image-wrapper">
            <div className="relative w-full h-full overflow-hidden rounded-3xl shadow-2xl">
              <div className="absolute inset-0 bg-accent-primary/20 mix-blend-overlay z-10"></div>
              <img 
                src="/Jose%20Fernandez.png"
                alt="Jose Bernard Indoor" 
                className="about-image-img w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
            </div>
          </div>

          {/* Scrolling Text Column */}
          <div className="about-text flex flex-col justify-center pt-10 lg:pt-[20vh] pb-32 z-20">
            <div className="about-header text-left mb-16 opacity-0">
              <p className="section-eyebrow justify-start">Identity</p>
              <h2 className="text-5xl sm:text-6xl md:text-8xl lg:text-[7rem] font-bold font-display uppercase tracking-tighter leading-[1.0] md:leading-[0.9]">
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">About</span> <br /> Me.
              </h2>
            </div>

            <p className="text-2xl sm:text-3xl md:text-4xl text-porcelain mb-12 leading-tight font-display tracking-tight opacity-0">
              I am a full-stack software engineer building production-ready systems and thoughtful digital experiences.
            </p>
            
            <p className="text-xl text-gray-400 mb-10 leading-relaxed opacity-0">
              I work across Next.js, React, and TypeScript on the frontend, with Node.js, PostgreSQL, and Prisma on the backend. I enjoy taking a product from its first idea to a complete platform, with careful attention to architecture, usability, and the details that make complex workflows feel clear.
            </p>

            <p className="text-xl text-gray-400 mb-12 leading-relaxed opacity-0">
              My experience includes fintech product development, commercial platforms, payment integrations, cloud storage, and role-based access control. I also bring a strong foundation in NLP and AI model evaluation, where I learned to examine system behavior closely and improve the quality of the user experience.
            </p>

            <p className="text-accent-primary mb-8 italic border-l-4 border-accent-secondary pl-6 text-2xl font-display opacity-0">
              "I debug with coffee and deploy with confidence."
            </p>
          </div>

        </div>
      </div>
    </section>
  )
}

export default About
