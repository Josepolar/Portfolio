import { useEffect } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import SkillsMatrix from './components/SkillsMatrix'
import GitHubRepos from './components/GitHubRepos'
import FeaturedProjects from './components/FeaturedProjects'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Navbar from './components/Navbar'

function App() {
  useEffect(() => {
    // Initialize custom cursor interactions
    const handleMouseMove = (e) => {
      const cursor = document.querySelector('.cursor')
      if (cursor) {
        cursor.style.left = e.clientX + 'px'
        cursor.style.top = e.clientY + 'px'
      }
    }

    window.addEventListener('mousemove', handleMouseMove)
    return () => window.removeEventListener('mousemove', handleMouseMove)
  }, [])

  return (
    <div className="bg-dark-bg text-white">
      {/* Animated background */}
      <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-dark-bg to-dark-secondary -z-10 pointer-events-none"></div>

      {/* Navigation */}
      <Navbar />

      {/* Main Content */}
      <main>
        <Hero />
        <About />
        <SkillsMatrix />
        <FeaturedProjects />
        <GitHubRepos />
        <Timeline />
        <Contact />
      </main>

      {/* Footer */}
      <footer className="bg-dark-secondary border-t border-accent-teal/10 py-8 mt-20">
        <div className="max-w-6xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            Built with <span className="text-accent-teal">React</span> + <span className="text-accent-teal">Vite</span> | Designed with precision
          </p>
          <p className="text-sm text-gray-500 mt-2">
            © 2026 Jose Bernard R. Fernandez — Full-Stack Developer from the Philippines
          </p>
        </div>
      </footer>
    </div>
  )
}

export default App
