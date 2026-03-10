import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import ProfileCard from './ProfileCard'

function About() {
  const highlights = [
    {
      icon: '💻',
      title: '2+ Years',
      description: 'Full-stack development experience with Laravel and React',
    },
    {
      icon: '🚀',
      title: 'IoT & AI',
      description: 'Research in disaster monitoring systems and smart IoT integration',
    },
    {
      icon: '🇵🇭',
      title: 'PH-Based',
      description: 'Building solutions tailored to Philippine tech needs and communities',
    },
  ]

  const [activeProfile, setActiveProfile] = useState(0)
  const [lastInteraction, setLastInteraction] = useState(() => Date.now())

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

  const handleActivate = (index) => {
    setActiveProfile(index)
    setLastInteraction(Date.now())
  }

  return (
    <section id="about" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold font-code text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-accent-teal">About</span> Me
        </motion.h2>

        <div
          className="grid md:grid-cols-[minmax(0,1.1fr)_minmax(0,1.2fr)] gap-12 items-center"
          onMouseMove={() => setLastInteraction(Date.now())}
          onTouchStart={() => setLastInteraction(Date.now())}
        >
          {/* Left side - Profile cards */}
          <div className="flex justify-center">
            <div className="relative">
              <ProfileCard
                src="/profile-outdoor.png"
                alt="Jose Bernard outdoors in the mountains"
                subtitle="Grounded in nature, always looking for the next challenge."
                badge="Full‑stack dev • PH"
                detail="Most days you'll find me exploring new places, sketching systems in my head, and thinking about how tech can improve day‑to‑day life."
                active={activeProfile === 0}
                onActivate={() => handleActivate(0)}
              />

              <motion.div
                className="hidden md:block absolute -right-16 bottom-0"
                initial={{ opacity: 0, y: 24, rotate: 6 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.8, delay: 0.1 }}
              >
                <ProfileCard
                  src="/profile-indoor.png"
                  alt="Jose Bernard in a casual fit"
                  subtitle="Comfort build: coffee, music, and long coding sessions."
                  badge="Available for freelance"
                  detail="When I'm indoors, I'm usually deep into code, experimenting with new stacks, or polishing UI details until everything feels just right."
                  active={activeProfile === 1}
                  onActivate={() => handleActivate(1)}
                />
              </motion.div>
            </div>
          </div>

          {/* Right side - Bio and highlights */}
          <motion.div
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-300 mb-6 leading-relaxed">
              I'm a Full-Stack Developer passionate about building scalable systems and elegant user experiences. With a strong foundation in Laravel, React, and Flutter, I craft solutions that bridge the gap between complex technical requirements and user needs.
            </p>

            <p className="text-lg text-gray-300 mb-8 leading-relaxed">
              Currently exploring the intersection of IoT, AI, and disaster management systems. I believe technology should serve communities and solve real-world problems, especially in the Philippine context.
            </p>

            <p className="text-gray-400 mb-8 italic">
              "I debug with coffee ☕ and deploy with confidence."
            </p>

            {/* Highlights */}
            <div className="space-y-4">
              {highlights.map((highlight, index) => (
                <motion.div
                  key={index}
                  className="glass-card p-4 flex gap-4"
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1, duration: 0.6 }}
                  viewport={{ once: true }}
                >
                  <span className="text-3xl">{highlight.icon}</span>
                  <div>
                    <h3 className="text-accent-teal font-bold">{highlight.title}</h3>
                    <p className="text-sm text-gray-400">{highlight.description}</p>
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}

export default About
