import { motion } from 'framer-motion'
import GitHubContributions from './GitHubContributions'

function FeaturedProjects({ theme = 'dark' }) {
  const username = import.meta.env.VITE_GITHUB_USERNAME || 'Josepolar'

  return (
    <section id="featured" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow justify-center">Open source</p>
          <h2 className="text-4xl md:text-5xl font-bold font-code">
            <span className="text-accent-teal">GitHub</span> Contributions
          </h2>
        </motion.div>

        <GitHubContributions theme={theme} username={username} />
      </div>
    </section>
  )
}

export default FeaturedProjects
