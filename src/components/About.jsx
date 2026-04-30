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
                src="/profile-indoor.png" 
                alt="Jose Bernard Indoor" 
                className="about-image-img w-full h-full object-cover grayscale hover:grayscale-0 transition-all duration-700"
              />
              <div className="absolute bottom-6 left-6 z-20">
                <div className="inline-flex items-center gap-2 rounded-full bg-dark-bg/80 backdrop-blur-md border border-accent-primary/40 px-4 py-2 text-xs font-display text-accent-primary tracking-widest uppercase">
                  <span className="h-2 w-2 rounded-full bg-accent-primary animate-pulse" />
                  Available for freelance
                </div>
              </div>
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
              I am a Full-Stack Developer passionate about building scalable systems and elegant user experiences.
            </p>
            
            <p className="text-xl text-gray-400 mb-10 leading-relaxed opacity-0">
              With a strong foundation in Laravel, React, and Flutter, I craft solutions that bridge the gap between complex technical requirements and user needs. Most days you'll find me exploring new places, sketching systems in my head, and thinking about how tech can improve day-to-day life.
            </p>

            <p className="text-xl text-gray-400 mb-12 leading-relaxed opacity-0">
              When I'm indoors, I'm usually deep into code, experimenting with new stacks, or polishing UI details until everything feels just right. Late nights, lo-fi beats, and a good terminal font. Currently exploring the intersection of IoT, AI, and disaster management systems.
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
