import { useEffect, useMemo, useState } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import SkillsMatrix from './components/SkillsMatrix'
import GitHubRepos from './components/GitHubRepos'
import FeaturedProjects from './components/FeaturedProjects'
import Timeline from './components/Timeline'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import DitherBackground from './components/DitherBackground'

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia?.('(prefers-color-scheme: light)')?.matches ? 'light' : 'dark'
  })

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

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const rootClassName = useMemo(() => {
    return theme === 'light' ? 'bg-white text-slate-900' : 'bg-dark-bg text-white'
  }, [theme])

  return (
    <div className={rootClassName}>
      <DitherBackground theme={theme} />

      {/* Navigation */}
      <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))} />

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
