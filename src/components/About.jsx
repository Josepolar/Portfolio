import { motion } from 'framer-motion'

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

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Left side - Profile image placeholder */}
          <motion.div
            className="flex justify-center"
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <div className="relative w-64 h-64 md:w-80 md:h-80">
              {/* Glowing border frame */}
              <div className="absolute inset-0 bg-gradient-to-br from-accent-teal to-accent-amber rounded-lg blur opacity-75 p-1"></div>

              {/* Image placeholder */}
              <div className="relative bg-dark-secondary rounded-lg flex items-center justify-center h-full">
                <div className="text-6xl">👨‍💻</div>
              </div>

              {/* Status badge */}
              <div className="absolute -bottom-4 -right-4 bg-accent-amber text-dark-bg px-4 py-2 rounded-full font-bold text-sm">
                Available for freelance
              </div>
            </div>
          </motion.div>

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
