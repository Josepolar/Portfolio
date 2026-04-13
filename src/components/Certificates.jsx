import { motion } from 'framer-motion'
import { FiAward, FiExternalLink, FiCalendar, FiHash } from 'react-icons/fi'

const certificates = [
  {
    id: 1,
    title: 'NAISC Certificate of Participation',
    issuer: 'AI Singapore',
    issuerFull: 'National AI Student Challenge — AI Singapore (NUS-hosted)',
    date: 'May 2025',
    credentialId: '36D4FFE-36D4F9F-3500469',
    skills: ['Artificial Intelligence', 'Machine Learning', 'Deep Tech', 'AI Policy'],
    verifyUrl:
      'https://certificates.aisingapore.org/certificate-verification/36D4FFE-36D4F9F-3500469/',
    featured: true,
  },
]

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: { staggerChildren: 0.15 },
  },
}

const cardVariants = {
  hidden: { opacity: 0, y: 28 },
  visible: { opacity: 1, y: 0, transition: { duration: 0.55, ease: 'easeOut' } },
}

function CertCard({ cert }) {
  return (
    <motion.div
      variants={cardVariants}
      className="glass-card p-0 overflow-hidden group relative"
    >
      {/* Top accent bar */}
      <div className="h-1 w-full bg-gradient-to-r from-accent-teal via-accent-amber to-accent-teal" />

      <div className="p-6 md:p-8">
        {/* Header row */}
        <div className="flex items-start justify-between gap-4 mb-5">
          <div className="flex items-center gap-4">
            {/* Icon badge */}
            <div className="w-12 h-12 rounded-xl bg-accent-teal/10 border border-accent-teal/20 flex items-center justify-center flex-shrink-0 group-hover:bg-accent-teal/20 transition-colors">
              <FiAward className="w-6 h-6 text-accent-teal" />
            </div>

            <div>
              {cert.featured && (
                <span className="inline-block text-[0.6rem] font-code font-semibold tracking-[0.18em] uppercase text-accent-amber mb-1 px-2 py-0.5 rounded-full border border-accent-amber/30 bg-accent-amber/10">
                  Featured
                </span>
              )}
              <h3 className="text-lg md:text-xl font-bold text-porcelain leading-snug">
                {cert.title}
              </h3>
            </div>
          </div>

          {/* Verify link */}
          <motion.a
            href={cert.verifyUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="flex-shrink-0 flex items-center gap-1.5 text-xs font-code font-semibold text-accent-teal border border-accent-teal/25 rounded-lg px-3 py-2 hover:bg-accent-teal/10 transition-colors"
            whileHover={{ scale: 1.04 }}
            whileTap={{ scale: 0.97 }}
            aria-label="Verify certificate"
          >
            Verify <FiExternalLink className="w-3.5 h-3.5" />
          </motion.a>
        </div>

        {/* Issuer */}
        <p className="text-sm text-accent-teal font-semibold mb-1">{cert.issuer}</p>
        <p className="text-xs text-gray-400 mb-5">{cert.issuerFull}</p>

        {/* Meta row */}
        <div className="flex flex-wrap gap-4 text-xs text-gray-400 font-code mb-5">
          <span className="flex items-center gap-1.5">
            <FiCalendar className="w-3.5 h-3.5 text-accent-amber" />
            {cert.date}
          </span>
          <span className="flex items-center gap-1.5">
            <FiHash className="w-3.5 h-3.5 text-accent-amber" />
            {cert.credentialId}
          </span>
        </div>

        {/* Skills */}
        {cert.skills?.length > 0 && (
          <div className="flex flex-wrap gap-2 pt-4 border-t border-accent-teal/10">
            {cert.skills.map((skill) => (
              <span
                key={skill}
                className="px-2.5 py-1 rounded-full text-xs font-medium bg-accent-amber/10 border border-accent-amber/20 text-gray-300"
              >
                {skill}
              </span>
            ))}
          </div>
        )}
      </div>
    </motion.div>
  )
}

function Certificates() {
  return (
    <section id="certificates" className="py-20 px-4">
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <motion.div
          className="text-center mb-14"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow justify-center">Recognition</p>
          <h2 className="text-4xl md:text-5xl font-bold font-code">
            <span className="text-accent-teal">Licenses</span> &amp; Certificates
          </h2>
          <p className="mt-4 text-gray-400 max-w-xl mx-auto text-base">
            Credentials earned through industry programs and academic challenges.
          </p>
        </motion.div>

        {/* Cards grid */}
        <motion.div
          className="grid md:grid-cols-2 gap-6"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true }}
        >
          {certificates.map((cert) => (
            <CertCard key={cert.id} cert={cert} />
          ))}
        </motion.div>

        {/* LinkedIn note */}
        <motion.p
          className="mt-8 text-center text-xs text-gray-500 font-code"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ delay: 0.4 }}
          viewport={{ once: true }}
        >
          View all credentials on{' '}
          <a
            href="https://www.linkedin.com/in/jose-fernandez-7058b12a7"
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent-teal hover:underline"
          >
            LinkedIn ↗
          </a>
        </motion.p>
      </div>
    </section>
  )
}

export default Certificates
