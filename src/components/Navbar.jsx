import { useEffect, useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { FiMoon, FiSun, FiMenu, FiX } from 'react-icons/fi'

function Navbar({ theme = 'dark', onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)

  const navItems = [
    { label: 'Work', href: '#featured' },
    { label: 'About', href: '#about' },
    { label: 'Experience', href: '#timeline' },
    { label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  return (
    <>
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 px-6 md:px-12 flex justify-between items-center ${scrolled ? 'py-4 bg-dark-bg/80 backdrop-blur-md border-b border-white/5' : 'py-8'
          }`}
      >
        {/* Logo */}
        <a
          href="#hero"
          className="text-xl md:text-2xl font-bold font-display tracking-widest uppercase text-porcelain hover:text-accent-primary transition-colors"
        >
          Jose.Dev
        </a>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-10">
          <ul className="flex gap-8">
            {navItems.map((item) => (
              <li key={item.label}>
                <a
                  href={item.href}
                  className="font-display text-xs font-bold tracking-[0.2em] uppercase text-gray-400 hover:text-porcelain transition-colors"
                >
                  {item.label}
                </a>
              </li>
            ))}
          </ul>

          <button
            onClick={onToggleTheme}
            className="text-gray-400 hover:text-porcelain transition-colors"
            aria-label="Toggle theme"
          >
            {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
          </button>
        </div>

        {/* Mobile Menu Button */}
        <div className="flex md:hidden items-center gap-4">
          <button
            onClick={onToggleTheme}
            className="text-gray-400 hover:text-porcelain transition-colors"
          >
            {theme === 'light' ? <FiMoon className="w-5 h-5" /> : <FiSun className="w-5 h-5" />}
          </button>
          <button
            onClick={() => setIsOpen(true)}
            className="text-porcelain"
          >
            <FiMenu className="w-6 h-6" />
          </button>
        </div>
      </nav>

      {/* Mobile Fullscreen Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.5, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-[60] bg-dark-bg flex flex-col justify-center items-center"
          >
            <button
              onClick={() => setIsOpen(false)}
              className="absolute top-6 right-6 md:top-8 md:right-12 text-porcelain p-2"
            >
              <FiX className="w-8 h-8" />
            </button>

            <ul className="flex flex-col gap-8 text-center">
              {navItems.map((item) => (
                <li key={item.label} className="overflow-hidden">
                  <motion.a
                    initial={{ y: 50 }}
                    animate={{ y: 0 }}
                    transition={{ duration: 0.5, delay: 0.2 }}
                    href={item.href}
                    onClick={() => setIsOpen(false)}
                    className="font-display text-4xl sm:text-5xl font-bold uppercase tracking-widest text-porcelain hover:text-accent-primary transition-colors block"
                  >
                    {item.label}
                  </motion.a>
                </li>
              ))}
            </ul>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}

export default Navbar
