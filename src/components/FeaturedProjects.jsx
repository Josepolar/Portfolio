import { motion } from 'framer-motion'
import GitHubContributions from './GitHubContributions'

function FeaturedProjects({ theme = 'dark' }) {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'Josepolar'

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
          <span className="text-accent-teal">GitHub</span> Contributions
        </motion.h2>

        <GitHubContributions theme={theme} username={username} />
      </div>
    </section>
  )
}

export default FeaturedProjects
