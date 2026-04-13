import { useEffect, useMemo, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { FiMoon, FiSun } from 'react-icons/fi'

function Navbar({ theme = 'dark', onToggleTheme }) {
  const [isOpen, setIsOpen] = useState(false)

  const navItems = [
    { label: 'Home', href: '#hero' },
    { label: 'About', href: '#about' },
    { label: 'Skills', href: '#skills' },
    { label: 'Contributions', href: '#featured' },
    { label: 'GitHub', href: '#github' },
    { label: 'Timeline', href: '#timeline' },
    { label: 'Certificates', href: '#certificates' },
    { label: 'Contact', href: '#contact' },
  ]

  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : ''
    return () => {
      document.body.style.overflow = ''
    }
  }, [isOpen])

  const menuVariants = useMemo(
    () => ({
      open: {
        opacity: 1,
        transition: { duration: 0.25, when: 'beforeChildren', staggerChildren: 0.08, delayChildren: 0.12 },
      },
      closed: {
        opacity: 0,
        transition: { duration: 0.18, when: 'afterChildren', staggerChildren: 0.05, staggerDirection: -1 },
      },
    }),
    []
  )

  const itemVariants = useMemo(
    () => ({
      open: { opacity: 1, y: 0, transition: { type: 'spring', stiffness: 420, damping: 28 } },
      closed: { opacity: 0, y: 18, transition: { duration: 0.12 } },
    }),
    []
  )

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-dark-bg/80 backdrop-blur-md border-b border-accent-teal/10">
      <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
        {/* Logo */}
        <motion.a
          href="#home"
          className="text-2xl font-bold font-code text-accent-teal"
          whileHover={{ scale: 1.05 }}
        >
          Jose.dev
        </motion.a>

        <div className="flex items-center gap-2">
          {/* Theme toggle */}
          <button
            type="button"
            onClick={onToggleTheme}
            className="p-2 rounded-lg border border-accent-teal/20 text-porcelain hover:border-accent-teal/40 hover:bg-accent-teal/10 transition-colors"
            aria-label={theme === 'light' ? 'Switch to dark mode' : 'Switch to light mode'}
          >
            {theme === 'light' ? (
              <FiMoon className="w-5 h-5" />
            ) : (
              <FiSun className="w-5 h-5" />
            )}
          </button>

          {/* Menu toggle */}
          <button
            className="p-2 rounded-lg border border-accent-teal/20 text-porcelain hover:border-accent-teal/40 hover:bg-accent-teal/10 transition-colors"
            onClick={() => setIsOpen((v) => !v)}
            type="button"
            aria-label={isOpen ? 'Close menu' : 'Open menu'}
          >
            <div className="w-6 h-6 relative">
              <motion.span
                className="absolute left-0 top-[6px] h-[2px] w-6 bg-accent-teal rounded"
                animate={isOpen ? { rotate: 45, top: 12 } : { rotate: 0, top: 6 }}
                transition={{ duration: 0.18 }}
              />
              <motion.span
                className="absolute left-0 top-[12px] h-[2px] w-6 bg-accent-teal rounded"
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                transition={{ duration: 0.12 }}
              />
              <motion.span
                className="absolute left-0 top-[18px] h-[2px] w-6 bg-accent-teal rounded"
                animate={isOpen ? { rotate: -45, top: 12 } : { rotate: 0, top: 18 }}
                transition={{ duration: 0.18 }}
              />
            </div>
          </button>
        </div>
      </div>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="fixed inset-0 z-50"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
          >
            <motion.div
              className="absolute inset-0 bg-dark-bg/40 backdrop-blur-sm"
              onClick={() => setIsOpen(false)}
            />

            <motion.div
              className="absolute inset-0 bg-gradient-to-b from-dark-secondary/80 via-dark-secondary/70 to-dark-secondary/85 backdrop-blur-md border-t border-accent-teal/10"
              variants={menuVariants}
              initial="closed"
              animate="open"
              exit="closed"
            >
              <div className="max-w-6xl mx-auto px-6 pt-24 pb-10">
                <div className="flex items-center justify-between mb-10">
                  <p className="text-xs font-code tracking-[0.22em] text-slate_mist uppercase">
                    Navigation
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsOpen(false)}
                    className="text-slate_mist hover:text-porcelain transition-colors text-sm font-code"
                  >
                    Close
                  </button>
                </div>

                <div className="grid md:grid-cols-2 gap-10 items-start">
                  <motion.div
                    variants={itemVariants}
                    className="rounded-2xl bg-dark-bg/55 backdrop-blur-lg border border-accent-teal/10 p-6 md:p-8"
                  >
                    <div className="space-y-4">
                      {navItems.map((item) => (
                        <motion.a
                          key={item.href}
                          href={item.href}
                          variants={itemVariants}
                          className="block text-4xl md:text-6xl font-bold font-code text-porcelain hover:text-accent-teal transition-colors"
                          onClick={() => setIsOpen(false)}
                        >
                          {item.label}
                        </motion.a>
                      ))}
                    </div>
                  </motion.div>

                  <motion.div
                    variants={itemVariants}
                    className="glass-card p-6 bg-dark-bg/45 border border-accent-teal/10"
                  >
                    <h3 className="text-lg font-bold text-accent-teal mb-2">Quick links</h3>
                    <p className="text-slate_mist text-sm mb-6">
                      Jump to any section, or open my GitHub profile.
                    </p>
                    <div className="flex flex-col gap-3">
                      <a
                        className="px-4 py-3 rounded-lg border border-accent-teal/20 text-porcelain hover:bg-accent-teal/10 transition-colors"
                        href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME || 'Josepolar'}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        onClick={() => setIsOpen(false)}
                      >
                        GitHub Profile ↗
                      </a>
                      <button
                        type="button"
                        onClick={() => {
                          onToggleTheme?.()
                        }}
                        className="px-4 py-3 rounded-lg border border-accent-teal/20 text-porcelain hover:bg-accent-teal/10 transition-colors text-left"
                      >
                        Toggle theme
                      </button>
                    </div>
                  </motion.div>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  )
}

export default Navbar
