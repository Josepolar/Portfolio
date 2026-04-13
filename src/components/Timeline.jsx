import { motion } from 'framer-motion'
import { ScrollStack, ScrollStackItem } from './ScrollStack'

const timeline = [
  {
    year: '2022',
    emoji: '🌱',
    title: 'Academic Projects Begin',
    description:
      'Started learning HTML, CSS, and PHP fundamentals through intensive self-study and academic coursework.',
    tags: ['HTML', 'CSS', 'PHP'],
  },
  {
    year: '2023',
    emoji: '⚙️',
    title: 'Laravel Deep Dive',
    description:
      'Developed proficiency in Laravel framework and built my first full-stack web application for a university project.',
    tags: ['Laravel', 'MySQL', 'REST API'],
  },
  {
    year: '2024',
    emoji: '🏀',
    title: 'Court Reservation System',
    description:
      'Completed a comprehensive multi-user booking platform handling 500+ concurrent reservations with a React frontend.',
    tags: ['React', 'Laravel', 'Sanctum'],
  },
  {
    year: '2024',
    emoji: '📱',
    title: 'Flutter Exploration',
    description:
      'Started mobile development with Flutter, creating cross-platform applications for iOS and Android.',
    tags: ['Flutter', 'Dart', 'Mobile'],
  },
  {
    year: '2025',
    emoji: '🤖',
    title: 'AI & IoT Research',
    description:
      'Began exploring disaster monitoring systems, IoT integration, and AI-powered predictive systems. Participated in NAISC by AI Singapore.',
    tags: ['AI', 'IoT', 'Python'],
  },
  {
    year: '2026',
    emoji: '🚀',
    title: 'Portfolio & Open Source',
    description:
      'Building a public presence with open-source projects, expanding full-stack expertise, and pursuing freelance opportunities.',
    tags: ['React', 'Vite', 'Open Source'],
  },
]

// Alternating accent so the deck has visual variety
const accentCycle = ['accent-teal', 'accent-amber']

function TimelineCard({ item, index }) {
  const accent = accentCycle[index % 2]
  const isIndigo = accent === 'accent-teal'

  return (
    <div className="max-w-2xl mx-auto w-full">
      <div className="glass-card overflow-hidden p-0">
        {/* Top bar */}
        <div
          className={`h-1 w-full ${isIndigo ? 'bg-gradient-to-r from-accent-teal to-accent-amber' : 'bg-gradient-to-r from-accent-amber to-accent-teal'}`}
        />
        <div className="p-6 md:p-8">
          {/* Year + emoji row */}
          <div className="flex items-center justify-between mb-4">
            <span className="font-code text-xs font-bold tracking-[0.18em] uppercase text-accent-amber">
              {item.year}
            </span>
            <span className="text-2xl">{item.emoji}</span>
          </div>

          <h3 className={`text-xl md:text-2xl font-bold mb-3 ${isIndigo ? 'text-accent-teal' : 'text-accent-amber'}`}>
            {item.title}
          </h3>

          <p className="text-gray-300 text-sm md:text-base leading-relaxed mb-5">
            {item.description}
          </p>

          <div className="flex flex-wrap gap-2 pt-4 border-t border-accent-teal/10">
            {item.tags.map((tag) => (
              <span
                key={tag}
                className="px-2.5 py-1 rounded-full text-xs font-code font-medium bg-accent-teal/8 border border-accent-teal/20 text-gray-300"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}

function Timeline() {
  return (
    <section id="timeline" className="py-20 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow justify-center">My journey</p>
          <h2 className="text-4xl md:text-5xl font-bold font-code">
            <span className="text-accent-teal">Experience</span> Timeline
          </h2>
          <p className="mt-4 text-gray-400 text-sm">Scroll to flip through each chapter</p>
        </motion.div>

        {/* ScrollStack — cards fan in from below as you scroll */}
        <ScrollStack
          itemDistance={220}
          stackPosition="14vh"
          baseScale={0.86}
          itemScale={0.04}
          blurAmount={0.5}
        >
          {timeline.map((item, index) => (
            <ScrollStackItem key={index}>
              <TimelineCard item={item} index={index} />
            </ScrollStackItem>
          ))}
        </ScrollStack>

        {/* End marker */}
        <motion.div
          className="text-center mt-8"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          <div className="inline-block glass-card px-6 py-4">
            <p className="text-gray-400 text-sm">
              Currently building the future
              <span className="text-accent-teal font-bold ml-2">→ 2026+</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

export default Timeline

