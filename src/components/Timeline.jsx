import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import { ScrollStack, ScrollStackItem } from './ScrollStack'

gsap.registerPlugin(ScrollTrigger)

const timeline = [
  {
    year: '2022 – 2024',
    title: 'Academic Foundation',
    description:
      'Mastered HTML, CSS, PHP, and Laravel through university coursework and self-study. Built a full-stack Court Reservation System with React + Laravel Sanctum handling multi-user bookings.',
    tags: ['HTML', 'CSS', 'PHP', 'Laravel', 'React', 'MySQL'],
  },
  {
    year: 'May 2024 – Sep 2025',
    title: 'Prompter Assistant & NLP',
    description:
      'Freelance remote work for a top AI company based in Singapore. Focused on checking and analyzing the behavior of AI models under development, contributing to natural language processing quality assurance.',
    tags: ['NLP', 'AI', 'Prompt Engineering', 'Remote'],
    location: 'Singapore · Remote',
    type: 'Freelance',
  },
  {
    year: 'Sep 2025 – Dec 2025',
    title: 'Web & Software Developer',
    description:
      'Freelance part-time engagement with a well-known steel fabrication company. Developed a customized ERP system to streamline operations, improve efficiency, and support large-scale project management needs.',
    tags: ['ERP', 'Web Development', 'Backend', 'PHP'],
    location: 'Philippines · Part-time',
    type: 'Freelance',
  },
  {
    year: 'Feb 2026 – Present',
    title: 'Software Developer — Pisopay.com Inc.',
    description:
      'Internship at Pisopay Inc. working on real-world software development and financial technology systems. Developing and improving web-based applications, fixing bugs, and supporting system enhancements for smooth and secure digital transactions.',
    tags: ['Fintech', 'Web Apps', 'Bug Fixing', 'Code Review'],
    location: 'Makati, Philippines · On-site',
    type: 'Internship',
  },
]

// Alternating accent so the deck has visual variety
const accentCycle = ['accent-primary', 'accent-secondary']

function TimelineCard({ item, index }) {
  const accent = accentCycle[index % 2]
  const isIndigo = accent === 'accent-primary'

  return (
    <div className="max-w-3xl mx-auto w-full mb-8">
      <div className="bg-dark-secondary rounded-2xl overflow-hidden p-0 border border-white/5 hover:border-accent-primary/30 transition-colors shadow-2xl">
        {/* Top bar */}
        <div
          className={`h-1 w-full ${isIndigo ? 'bg-gradient-to-r from-accent-primary to-accent-secondary' : 'bg-gradient-to-r from-accent-secondary to-accent-primary'}`}
        />
        <div className="p-8 md:p-10 relative z-10 bg-dark-secondary">
          {/* Year + emoji row */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-display text-xs font-bold tracking-[0.18em] uppercase text-accent-secondary">
              {item.year}
            </span>
            <span className="text-2xl">{item.emoji}</span>
          </div>

          <h3 className={`text-xl md:text-2xl font-bold mb-2 ${isIndigo ? 'text-accent-primary' : 'text-accent-secondary'}`}>
            {item.title}
          </h3>

          {(item.type || item.location) && (
            <div className="flex flex-wrap gap-3 mb-3 text-xs text-gray-400 font-display">
              {item.type && (
                <span className="px-2 py-0.5 rounded-full bg-accent-secondary/10 border border-accent-secondary/20 text-accent-secondary font-semibold">
                  {item.type}
                </span>
              )}
              {item.location && <span>{item.location}</span>}
            </div>
          )}

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-accent-primary/10">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs font-display font-medium bg-accent-primary/8 border border-accent-primary/20 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Timeline() {
  const sectionRef = useRef(null)

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.timeline-header', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.timeline-header', start: 'top 85%', once: true },
      })
      gsap.fromTo('.timeline-end', { opacity: 0 }, {
        opacity: 1, duration: 0.6, delay: 0.4, ease: 'power2.out',
        scrollTrigger: { trigger: '.timeline-end', start: 'top 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  return (
    <section id="timeline" className="py-20 px-4" ref={sectionRef}>
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <div className="timeline-header text-center mb-12 opacity-0">
          <p className="section-eyebrow justify-center">My journey</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            <span className="text-accent-primary">Experience</span> Timeline
          </h2>
          <p className="mt-4 text-gray-400 text-sm">Scroll to flip through each chapter</p>
        </div>

        {/* ScrollStack — cards fan in from below as you scroll */}
        <ScrollStack
          itemDistance={220}
          stackPosition="14vh"
          baseScale={0.86}
          itemScale={0.04}
          blurAmount={0}
        >
          {timeline.map((item, index) => (
            <ScrollStackItem key={index}>
              <TimelineCard item={item} index={index} />
            </ScrollStackItem>
          ))}
        </ScrollStack>

        {/* End marker */}
        <div className="timeline-end text-center mt-8 opacity-0">
          <div className="inline-block glass-card px-6 py-4">
            <p className="text-gray-400 text-sm">
              Currently building the future
              <span className="text-accent-primary font-bold ml-2">→ 2026+</span>
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}

export default Timeline

