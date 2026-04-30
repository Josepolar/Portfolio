import { useEffect, useRef } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'

gsap.registerPlugin(ScrollTrigger)

function SkillsMatrix() {
  const sectionRef = useRef(null)

  const skillGroups = [
    {
      category: 'Frontend',
      skills: ['HTML5', 'CSS3', 'Tailwind CSS', 'JavaScript', 'React', 'Flutter'],
      color: 'accent-primary',
    },
    {
      category: 'Backend',
      skills: ['PHP', 'Laravel', 'REST APIs', 'Sanctum Auth', 'Database Design', 'Performance Optimization'],
      color: 'accent-secondary',
    },
    {
      category: 'Database',
      skills: ['MySQL', 'Query Optimization', 'Database Design', 'Data Modeling'],
      color: 'accent-primary',
    },
    {
      category: 'Tools & DevOps',
      skills: ['Git', 'GitHub', 'Postman', 'VS Code', 'Figma', 'Vercel'],
      color: 'accent-secondary',
    },
    {
      category: 'AI & Research',
      skills: ['IoT Integration', 'System Design', 'Python Basics', 'Machine Learning Concepts'],
      color: 'accent-primary',
    },
    {
      category: 'Soft Skills',
      skills: ['Problem Solving', 'Team Collaboration', 'Technical Writing', 'Project Management'],
      color: 'accent-secondary',
    },
  ]

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.skills-header', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.skills-header', start: 'top 85%', once: true },
      })

      gsap.fromTo('.skill-card', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.5, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.skills-grid', start: 'top 85%', once: true },
      })

      gsap.fromTo('.skills-overview', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.skills-overview', start: 'top 85%', once: true },
      })
    }, sectionRef)

    return () => ctx.revert()
  }, [])

  return (
    <section id="skills" className="py-20 px-4 bg-dark-secondary/30" ref={sectionRef}>
      <div className="max-w-6xl mx-auto">
        <div className="skills-header text-center mb-16 opacity-0">
          <p className="section-eyebrow justify-center">What I work with</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            <span className="text-accent-primary">Skills</span> &amp; Expertise
          </h2>
        </div>

        <div className="skills-grid grid md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillGroups.map((group, groupIndex) => (
            <div
              key={groupIndex}
              className="skill-card glass-card p-6 opacity-0"
            >
              <h3 className={`text-xl font-bold ${group.color === 'accent-primary' ? 'text-accent-primary' : 'text-accent-secondary'} mb-4`}>
                {group.category}
              </h3>

              <div className="flex flex-wrap gap-2">
                {group.skills.map((skill, skillIndex) => (
                  <span
                    key={skillIndex}
                    className={`px-3 py-1 bg-${group.color}/10 border border-${group.color}/30 rounded-full text-sm text-gray-300 hover:bg-${group.color}/20 hover:scale-105 transition-all`}
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {/* Tech Stack Overview */}
        <div className="skills-overview mt-16 glass-card p-8 text-center opacity-0">
          <h3 className="text-2xl font-bold text-accent-primary mb-4">Current Tech Stack</h3>
          <p className="text-gray-300 mb-6">
            Building modern applications with React, Laravel, Flutter, and Tailwind CSS
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <span className="font-display text-accent-primary bg-accent-primary/10 px-4 py-2 rounded-lg">
              React 18+
            </span>
            <span className="font-display text-accent-secondary bg-accent-secondary/10 px-4 py-2 rounded-lg">
              Laravel 10+
            </span>
            <span className="font-display text-accent-primary bg-accent-primary/10 px-4 py-2 rounded-lg">
              Tailwind CSS
            </span>
            <span className="font-display text-accent-secondary bg-accent-secondary/10 px-4 py-2 rounded-lg">
              Flutter
            </span>
          </div>
        </div>
      </div>
    </section>
  )
}

export default SkillsMatrix
