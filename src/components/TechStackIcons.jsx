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
  SiNextdotjs,
  SiTypescript,
  SiNodedotjs,
  SiPostgresql,
  SiPrisma,
  SiVercel,
  SiStripe,
  SiHtml5,
  SiCss,
} from 'react-icons/si'
import { FaAws } from 'react-icons/fa6'
import { createElement } from 'react'
import { useRef } from 'react'
import { motion } from 'framer-motion'

const MotionDiv = motion.div

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
  { label: 'Next.js', Icon: SiNextdotjs },
  { label: 'TypeScript', Icon: SiTypescript },
  { label: 'Node.js', Icon: SiNodedotjs },
  { label: 'PostgreSQL', Icon: SiPostgresql },
  { label: 'Prisma', Icon: SiPrisma },
  { label: 'AWS', Icon: FaAws },
  { label: 'Vercel', Icon: SiVercel },
  { label: 'Stripe', Icon: SiStripe },
  { label: 'HTML5', Icon: SiHtml5 },
  { label: 'CSS3', Icon: SiCss },
]

export default function TechStackIcons({ className = '', floating = false }) {
  const floatingStackRef = useRef(null)

  if (floating) {
    return (
      <div ref={floatingStackRef} className={`skills-floating-icons ${className}`}>
        {STACK.map(({ label, Icon }, index) => (
          <MotionDiv
            key={label}
            className="skills-floating-icon group"
            style={{ '--stack-x': `${[7, 28, 49, 70, 16, 37, 58, 79, 25, 46, 67, 14, 34, 54, 74, 21, 42, 63, 83, 30, 58][index]}%`, '--stack-y': `${[8, 17, 29, 39, 52, 61, 70, 78, 86, 22, 45, 34, 12, 48, 66, 80, 26, 57, 73, 42, 15][index]}%` }}
            drag
            dragConstraints={floatingStackRef}
            dragElastic={0.18}
            dragMomentum={false}
            whileHover={{ scale: 1.12, zIndex: 10 }}
            whileDrag={{ scale: 1.16, zIndex: 10, cursor: 'grabbing' }}
            title={`Drag ${label}`}
          >
            <span
              className="skills-floating-icon__surface"
              style={{
                '--float-delay': `${index * -0.27}s`,
                '--float-duration': `${5.2 + (index % 4) * 0.8}s`,
                '--float-x': `${index % 3 === 0 ? 0.75 : 1.15}rem`,
                '--float-y': `${index % 2 === 0 ? 0.65 : 0.9}rem`,
              }}
            >
              {createElement(Icon, { className: 'w-7 h-7 text-accent-primary transition-colors group-hover:text-accent-secondary' })}
            </span>
            <span className="skills-floating-icon__label">{label}</span>
          </MotionDiv>
        ))}
      </div>
    )
  }

  return (
    <div className={className} aria-label="Tech stack">
      <div className="relative overflow-hidden py-2">
        <div
          className="tech-stack-track flex gap-4 whitespace-nowrap animate-marquee"
          style={{ width: 'max-content' }}
        >
          {[...STACK, ...STACK].map(({ label, Icon }, index) => (
            <div
              key={`${label}-${index}`}
              className="group relative mx-1 transition-transform duration-200 hover:-translate-y-1 hover:scale-105"
            >
              <div className="glass-card !p-3 flex items-center justify-center border border-accent-primary/10 hover:border-accent-primary/40 transition-colors bg-dark-secondary/60">
                {createElement(Icon, { className: 'w-6 h-6 text-gray-200 group-hover:text-accent-primary transition-colors' })}
              </div>

              <div className="pointer-events-none absolute left-1/2 -translate-x-1/2 top-full mt-2 opacity-0 group-hover:opacity-100 transition-opacity">
                <div className="px-3 py-1 rounded-md bg-dark-secondary/90 border border-accent-primary/20 text-xs font-display text-gray-200 whitespace-nowrap">
                  {label}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

