import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'
import DecryptedText from './DecryptedText'
import TechStackIcons from './TechStackIcons'

function Hero() {
  const [gitHubStats, setGitHubStats] = useState(null)
  const [currentRoleIndex, setCurrentRoleIndex] = useState(0)

  useEffect(() => {
    const fetchGitHubStats = async () => {
      try {
        const username = import.meta.env.VITE_GITHUB_USERNAME || 'Josepolar'
        const rawToken = import.meta.env.VITE_GITHUB_TOKEN?.trim?.() || ''
        const tokenLooksPlaceholder = /your_(github_)?token/i.test(rawToken) || rawToken === 'your_github_token_here'
        const token = rawToken && !tokenLooksPlaceholder ? rawToken : ''

        const response = await axios.get(`https://api.github.com/users/${username}`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          timeout: 15000,
        })
        setGitHubStats({
          followers: response.data.followers,
          repos: response.data.public_repos,
        })
      } catch (error) {
        console.error('Error fetching GitHub stats:', error)
      }
    }

    fetchGitHubStats()
  }, [])

  // Cycle through roles
  useEffect(() => {
    const roles = [
      'Full-Stack Developer',
      'Laravel Engineer',
      'Flutter Builder',
      'AI Systems Thinker',
      'IoT Enthusiast',
    ]
    const interval = setInterval(() => {
      setCurrentRoleIndex((prev) => (prev + 1) % roles.length)
    }, 3000)
    return () => clearInterval(interval)
  }, [])

  const roles = [
    'Full-Stack Developer',
    'Laravel Engineer',
    'Flutter Builder',
    'AI Systems Thinker',
    'IoT Enthusiast',
  ]

  return (
    <section
      id="hero"
      className="min-h-screen flex items-center justify-center pt-20 pb-20 px-4"
    >
      <div className="max-w-4xl mx-auto text-center">
        <motion.div
          className="mb-4"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.05 }}
        >
          <p className="section-eyebrow justify-center">Full-Stack Developer · Philippines</p>
        </motion.div>

        <motion.div
          className="mb-6"
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, delay: 0.1 }}
        >
          <DecryptedText
            text="jose Bernard fernandez"
            animateOn="view"
            sequential
            revealDirection="center"
            speed={35}
            parentClassName="inline-block font-code text-2xl md:text-3xl tracking-wide"
            className="text-accent-teal"
            encryptedClassName="text-accent-amber"
          />
        </motion.div>

        {/* Main headline with animated roles */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
        >
          <h1 className="text-5xl md:text-7xl font-bold font-code mb-6 leading-tight">
            <span className="text-accent-teal">I Build</span>
            <br />
            <motion.span
              className="text-accent-amber"
              key={currentRoleIndex}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.5 }}
            >
              {roles[currentRoleIndex]}
            </motion.span>
          </h1>
        </motion.div>

        {/* Subtitle */}
        <motion.p
          className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ delay: 0.3, duration: 0.8 }}
        >
          A passionate developer from the Philippines specializing in scalable web
          systems, mobile applications, and AI-integrated solutions. Currently crafting
          digital experiences that matter.
        </motion.p>

        {/* GitHub stats pill */}
        {gitHubStats && (
          <motion.div
            className="inline-block glass-card px-6 py-3 mb-8 text-sm"
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.5 }}
          >
            <span className="text-accent-teal font-code">⭐ {gitHubStats.repos}</span>
            <span className="mx-3 text-gray-600">•</span>
            <span className="text-accent-amber font-code">
              👥 {gitHubStats.followers}
            </span>
          </motion.div>
        )}

        {/* CTA Buttons */}
        <motion.div
          className="flex flex-col sm:flex-row gap-4 justify-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6, duration: 0.8 }}
        >
          <motion.a
            href="#featured"
            className="px-8 py-3 bg-accent-teal text-dark-bg font-bold rounded-lg hover:bg-accent-amber transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
          </motion.a>
          <motion.a
            href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`}
            target="_blank"
            className="px-8 py-3 border-2 border-accent-teal text-accent-teal font-bold rounded-lg hover:bg-accent-teal/10 transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            GitHub ↗
          </motion.a>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.75, duration: 0.6 }}
        >
          <p className="text-sm text-gray-400 font-code mb-4">Tech I ship with</p>
          <TechStackIcons />
        </motion.div>

        {/* Scroll indicator */}
        <motion.div
          className="flex justify-center mt-16"
          animate={{ y: [0, 10, 0] }}
          transition={{ repeat: Infinity, duration: 2 }}
        >
          <svg
            className="w-6 h-6 text-accent-teal"
            fill="none"
            stroke="currentColor"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M19 14l-7 7m0 0l-7-7m7 7V3"
            />
          </svg>
        </motion.div>
      </div>
    </section>
  )
}

export default Hero
