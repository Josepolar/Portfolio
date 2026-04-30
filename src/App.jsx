
import { useEffect, useMemo, useRef, useState } from 'react'
import Hero from './components/Hero'
import About from './components/About'
import SkillsMatrix from './components/SkillsMatrix'
import GitHubRepos from './components/GitHubRepos'
import FeaturedProjects from './components/FeaturedProjects'
import Timeline from './components/Timeline'
import Certificates from './components/Certificates'
import Contact from './components/Contact'
import Navbar from './components/Navbar'
import ReactLenis from 'lenis/react'
import CustomCursor from './components/CustomCursor'

function App() {
  const [theme, setTheme] = useState(() => {
    const saved = window.localStorage.getItem('theme')
    if (saved === 'light' || saved === 'dark') return saved
    return window.matchMedia?.('(prefers-color-scheme: light)')?.matches ? 'light' : 'dark'
  })

  useEffect(() => {
    document.documentElement.dataset.theme = theme
    window.localStorage.setItem('theme', theme)
  }, [theme])

  const rootClassName = useMemo(() => {
    return theme === 'light' ? 'bg-light-bg text-abyss' : 'bg-dark-bg text-porcelain'
  }, [theme])

  return (
    <>
      {/* autoRaf:true (default) — Lenis drives its own RAF loop */}
      <ReactLenis root />
      <CustomCursor />
      <div className={rootClassName}>
        <Navbar theme={theme} onToggleTheme={() => setTheme((t) => (t === 'light' ? 'dark' : 'light'))} />
        <main>
          <Hero />
          <About />
          <SkillsMatrix />
          <FeaturedProjects theme={theme} />
          <GitHubRepos />
          <Timeline />
          <Certificates />
          <Contact />
        </main>
        <footer className="border-t border-accent-primary/10 py-10">
          <div className="max-w-6xl mx-auto px-6">
            <div className="flex flex-col md:flex-row items-center justify-between gap-4">
              <p className="font-display text-sm text-accent-primary tracking-wide">Jose.dev</p>
              <p className="text-sm text-gray-400">
                Built with{' '}
                <span className="text-accent-primary font-semibold">React</span>
                {' + '}
                <span className="text-accent-secondary font-semibold">Vite</span>
                {' — crafted with precision'}
              </p>
              <p className="text-xs text-gray-500">
                &copy; 2026 Jose Bernard R. Fernandez
              </p>
            </div>
          </div>
        </footer>
      </div>
    </>
  )
}

export default App
