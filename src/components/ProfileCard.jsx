import { motion } from 'framer-motion'

function ProfileCard({ src, alt, badge, subtitle, detail, active = false, onActivate }) {
  return (
    <motion.div
      className="relative w-64 h-80 md:w-72 md:h-96 cursor-pointer"
      initial={{ opacity: 0, y: 16, scale: 0.96 }}
      whileInView={{ opacity: 1, y: 0, scale: 1 }}
      animate={active ? { scale: 1.04, rotateX: 6, rotateY: -6, translateY: -8 } : { scale: 1, rotateX: 0, rotateY: 0, translateY: 0 }}
      whileHover={{ scale: 1.06, rotateX: 7, rotateY: -7, translateY: -10 }}
      transition={{ type: 'spring', stiffness: 260, damping: 26 }}
      viewport={{ once: true, amount: 0.4 }}
      style={{
        transformStyle: 'preserve-3d',
      }}
      onMouseEnter={onActivate}
      onClick={onActivate}
    >
      <div
        className={`absolute inset-0 rounded-2xl bg-gradient-to-br from-accent-teal via-accent-amber/60 to-accent-teal/80 blur-xl transition-opacity ${
          active ? 'opacity-90' : 'opacity-60'
        }`}
      />

      <div
        className={`relative h-full rounded-2xl bg-dark-secondary/90 overflow-hidden shadow-[0_24px_60px_rgba(0,0,0,0.55)] border transition-colors ${
          active ? 'border-accent-teal/80' : 'border-accent-teal/20'
        }`}
      >
        <div className="h-3/5 overflow-hidden">
          <motion.img
            src={src}
            alt={alt}
            className="w-full h-full object-cover"
            animate={active ? { scale: 1.06 } : { scale: 1 }}
            whileHover={{ scale: 1.08 }}
            transition={{ duration: 0.6, ease: 'easeOut' }}
          />
        </div>

        <div className="h-2/5 px-4 py-4 flex flex-col justify-between">
          <div>
            <p className="text-xs uppercase tracking-[0.2em] text-accent-teal/70 mb-1">
              PROFILE
            </p>
            <h3 className="text-lg font-semibold text-gray-100 leading-snug line-clamp-2">
              {alt}
            </h3>
            {subtitle && (
              <p
                className={`mt-1 text-xs text-gray-400 transition-all ${
                  active ? 'line-clamp-none' : 'line-clamp-2'
                }`}
              >
                {subtitle}
              </p>
            )}
            {detail && active && (
              <p className="mt-2 text-xs text-gray-400/90 leading-relaxed">{detail}</p>
            )}
          </div>

          {badge && (
            <div className="mt-2 inline-flex items-center gap-2 rounded-full bg-accent-teal/10 border border-accent-teal/40 px-3 py-1 text-xs font-code text-accent-teal">
              <span className="h-1.5 w-1.5 rounded-full bg-accent-teal animate-pulse" />
              <span>{badge}</span>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  )
}

export default ProfileCard

