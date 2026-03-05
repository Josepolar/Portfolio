import { motion } from 'framer-motion'

function Timeline() {
  const timeline = [
    {
      year: '2022',
      title: 'Academic Projects Begin',
      description: 'Started learning HTML, CSS, and PHP fundamentals through intensive self-study and academic coursework',
    },
    {
      year: '2023',
      title: 'Laravel Deep Dive',
      description: 'Developed proficiency in Laravel framework and built first full-stack web application for university project',
    },
    {
      year: '2024',
      title: 'Court Reservation System',
      description: 'Completed comprehensive multi-user booking platform handling 500+ concurrent reservations with React frontend',
    },
    {
      year: '2024',
      title: 'Flutter Exploration',
      description: 'Started mobile development journey with Flutter, creating cross-platform applications for iOS and Android',
    },
    {
      year: '2025',
      title: 'AI & IoT Research',
      description: 'Began exploring disaster monitoring systems, IoT integration, and AI-powered predictive systems for real-world impact',
    },
    {
      year: '2026',
      title: 'GitHub Portfolio Growth',
      description: 'Building public presence with open-source projects and expanding expertise across full-stack ecosystem',
    },
  ]

  return (
    <section id="timeline" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold font-code text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-accent-teal">Experience</span> Timeline
        </motion.h2>

        {/* Timeline */}
        <div className="relative">
          {/* Vertical line */}
          <motion.div
            className="absolute left-0 md:left-1/2 w-1 h-full bg-gradient-to-b from-accent-teal via-accent-amber to-accent-teal hidden md:block transform -translate-x-1/2"
            initial={{ scaleY: 0 }}
            whileInView={{ scaleY: 1 }}
            transition={{ duration: 1.5 }}
            viewport={{ once: true }}
          ></motion.div>

          {/* Timeline items */}
          <div className="space-y-8 md:space-y-12">
            {timeline.map((item, index) => (
              <motion.div
                key={index}
                className={`flex gap-6 md:gap-0 ${index % 2 === 0 ? 'md:flex-row-reverse' : 'md:flex-row'}`}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
              >
                {/* Content */}
                <div className={`flex-1 md:${index % 2 === 0 ? 'pr-12' : 'pl-12'} md:w-1/2`}>
                  <motion.div
                    className="glass-card p-6 h-full"
                    whileHover={{ scale: 1.02 }}
                  >
                    <h3 className="text-2xl font-bold text-accent-teal mb-2">
                      {item.title}
                    </h3>
                    <p className="text-gray-400 mb-2">{item.description}</p>

                    {/* Visual separator */}
                    <div className="mt-4 pt-4 border-t border-accent-teal/20">
                      <span className="text-xs text-accent-amber font-mono font-bold">
                        Year {item.year}
                      </span>
                    </div>
                  </motion.div>
                </div>

                {/* Timeline marker */}
                <motion.div
                  className="hidden md:flex flex-col items-center justify-start w-auto"
                  initial={{ scale: 0 }}
                  whileInView={{ scale: 1 }}
                  transition={{ delay: index * 0.1 + 0.2, duration: 0.4 }}
                  viewport={{ once: true }}
                >
                  {/* Year badge */}
                  <div className="text-center mb-4">
                    <span className="font-code font-bold text-accent-amber text-lg">
                      {item.year}
                    </span>
                  </div>

                  {/* Circle marker */}
                  <motion.div
                    className="w-4 h-4 rounded-full bg-accent-teal border-4 border-dark-bg relative"
                    animate={{ boxShadow: ['0 0 0 8px rgba(0, 212, 255, 0.2)', '0 0 0 0px rgba(0, 212, 255, 0)'] }}
                    transition={{ duration: 2, repeat: Infinity }}
                  ></motion.div>
                </motion.div>

                {/* Empty space for alternate layout */}
                <div className="hidden md:block w-1/2"></div>
              </motion.div>
            ))}
          </div>
        </div>

        {/* End marker */}
        <motion.div
          className="text-center mt-16"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.8 }}
          viewport={{ once: true }}
        >
          <div className="inline-block glass-card px-6 py-4">
            <p className="text-gray-400">
              Currently building the future
              <span className="text-accent-teal font-bold ml-2">→ 2026+</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline
