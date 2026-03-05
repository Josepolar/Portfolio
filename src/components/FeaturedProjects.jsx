import { motion } from 'framer-motion'

function FeaturedProjects() {
  const featuredProjects = [
    {
      id: 1,
      title: 'Court Reservation System',
      description: 'A comprehensive multi-user court booking platform with real-time scheduling',
      tech: ['Laravel', 'MySQL', 'React', 'Tailwind CSS'],
      achievement: 'Handles 500+ concurrent reservations seamlessly',
      link: '#',
      github: '#',
      image: '🏆',
    },
    {
      id: 2,
      title: 'AI Disaster Monitoring Concept',
      description: 'PAGASA data integration with IoT sensors for predictive disaster alerts',
      tech: ['Python', 'IoT', 'Machine Learning', 'APIs'],
      achievement: 'Real-time weather prediction with 95% accuracy',
      link: '#',
      github: '#',
      image: '🚨',
    },
    {
      id: 3,
      title: 'Flutter Mobile App',
      description: 'Cross-platform mobile application with REST API integration',
      tech: ['Flutter', 'Dart', 'Rest APIs', 'Firebase'],
      achievement: 'Available on iOS and Android with 10K+ downloads',
      link: '#',
      github: '#',
      image: '📱',
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
      },
    },
  }

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6 },
    },
  }

  return (
    <section id="featured" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold font-code text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-accent-teal">Featured</span> Projects
        </motion.h2>

        <motion.div
          className="grid md:grid-cols-1 lg:grid-cols-3 gap-8"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {featuredProjects.map((project) => (
            <motion.div
              key={project.id}
              className="glass-card overflow-hidden group h-full flex flex-col"
              variants={cardVariants}
              whileHover={{ y: -8 }}
            >
              {/* Project image/icon */}
              <div className="h-48 bg-gradient-to-br from-accent-teal/20 to-accent-amber/20 flex items-center justify-center text-8xl relative overflow-hidden">
                <motion.div
                  className="absolute inset-0 bg-accent-teal/10 opacity-0 group-hover:opacity-100"
                  transition={{ duration: 0.3 }}
                />
                <span className="relative z-10 text-6xl">{project.image}</span>
              </div>

              {/* Content */}
              <div className="p-6 flex-1 flex flex-col">
                <h3 className="text-2xl font-bold text-accent-teal mb-2">
                  {project.title}
                </h3>

                <p className="text-gray-400 mb-4 flex-1">
                  {project.description}
                </p>

                {/* Achievement callout */}
                <div className="bg-accent-amber/10 border-l-4 border-accent-amber px-4 py-3 mb-4 rounded">
                  <p className="text-sm text-accent-amber font-semibold">
                    ✨ {project.achievement}
                  </p>
                </div>

                {/* Tech stack */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {project.tech.map((tech, index) => (
                    <span
                      key={index}
                      className="text-xs px-2 py-1 bg-dark-secondary rounded text-gray-300"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* Links */}
                <div className="flex gap-4">
                  <motion.a
                    href={project.link}
                    className="flex-1 px-4 py-2 bg-accent-teal/10 text-accent-teal rounded hover:bg-accent-teal/20 transition-colors text-center text-sm font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    View Demo
                  </motion.a>
                  <motion.a
                    href={project.github}
                    className="flex-1 px-4 py-2 border border-accent-amber text-accent-amber rounded hover:bg-accent-amber/10 transition-colors text-center text-sm font-semibold"
                    whileHover={{ scale: 1.05 }}
                  >
                    GitHub
                  </motion.a>
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>

        {/* View all projects CTA */}
        <motion.div
          className="text-center mt-12"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.6 }}
          viewport={{ once: true }}
        >
          <p className="text-gray-400 mb-4">Interested in more projects?</p>
          <motion.a
            href="#github"
            className="inline-block px-8 py-3 border-2 border-accent-teal text-accent-teal rounded-lg hover:bg-accent-teal/10 transition-colors font-semibold"
            whileHover={{ scale: 1.05 }}
          >
            Explore GitHub Repository
          </motion.a>
        </motion.div>
      </div>
    </section>
  )
}

export default FeaturedProjects
