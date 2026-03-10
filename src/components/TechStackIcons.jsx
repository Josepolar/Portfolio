import { motion } from 'framer-motion'
import {
  SiReact,
  SiVite,
  SiTailwindcss,
  SiJavascript,
  SiPhp,
  SiLaravel,
  SiMysql,
  SiDart,
  SiFlutter,
  SiPython,
  SiGithub,
} from 'react-icons/si'

const STACK = [
  { label: 'React', Icon: SiReact },
  { label: 'Vite', Icon: SiVite },
  { label: 'Tailwind', Icon: SiTailwindcss },
  { label: 'JavaScript', Icon: SiJavascript },
  { label: 'PHP', Icon: SiPhp },
  { label: 'Laravel', Icon: SiLaravel },
  { label: 'MySQL', Icon: SiMysql },
  { label: 'Dart', Icon: SiDart },
  { label: 'Flutter', Icon: SiFlutter },
  { label: 'Python', Icon: SiPython },
  { label: 'GitHub', Icon: SiGithub },
]

export default function TechStackIcons({ className = '' }) {
  return (
    <div className={className} aria-label="Tech stack">
      <div className="relative overflow-hidden py-2">
        <motion.div
          className="flex gap-4 whitespace-nowrap"
          animate={{ x: ['0%', '-50%'] }}
          transition={{
            repeat: Infinity,
            repeatType: 'loop',
            duration: 22,
            ease: 'linear',
          }}
        >
          {[...STACK, ...STACK].map(({ label, Icon }, index) => (
            <motion.div
              key={`${label}-${index}`}
              className="group relative mx-1"
              whileHover={{ y: -4, scale: 1.05 }}
              transition={{ type: 'spring', stiffness: 350, damping: 24 }}
            >
              <div className="glass-card !p-3 flex items-center justify-center border border-accent-teal/10 hover:border-accent-teal/40 transition-colors bg-dark-secondary/60">
                <Icon className="w-6 h-6 text-gray-200 group-hover:text-accent-teal transition-colors" />
              </div>

              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="px-3 py-1 rounded-md bg-dark-secondary/90 border border-accent-teal/20 text-xs font-code text-gray-200 whitespace-nowrap">
                  {label}
                </div>
              </div>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </div>
  )
}

