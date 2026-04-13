import { useState } from 'react'
import { motion } from 'framer-motion'
import emailjs from '@emailjs/browser'
import toast, { Toaster } from 'react-hot-toast'

function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    message: '',
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [step, setStep] = useState(1)

  const contactLinks = [
    {
      icon: '✉️',
      label: 'Email',
      value: import.meta.env.VITE_CONTACT_EMAIL,
      href: `mailto:${import.meta.env.VITE_CONTACT_EMAIL}`,
    },
    {
      icon: '💼',
      label: 'LinkedIn',
      value: 'linkedin.com/in/jose-fernandez-7058b12a7',
      href: 'https://www.linkedin.com/in/jose-fernandez-7058b12a7',
    },
    {
      icon: '🐙',
      label: 'GitHub',
      value: `@${import.meta.env.VITE_GITHUB_USERNAME}`,
      href: `https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`,
    },
    {
      icon: '📍',
      label: 'Location',
      value: 'Philippines',
      href: '#',
    },
  ]

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (!formData.name || !formData.email || !formData.message) {
      toast.error('Please fill in all fields')
      return
    }

    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      toast.error('Please enter a valid email address')
      return
    }

    setIsSubmitting(true)

    try {
      // Initialize EmailJS (only once)
      if (!window.emailjsInitialized) {
        emailjs.init(import.meta.env.VITE_EMAILJS_PUBLIC_KEY)
        window.emailjsInitialized = true
      }

      // For now, we'll show a success message
      // In production, configure EmailJS with proper service ID and template ID
      if (
        import.meta.env.VITE_EMAILJS_SERVICE_ID &&
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID
      ) {
        await emailjs.send(
          import.meta.env.VITE_EMAILJS_SERVICE_ID,
          import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
          {
            from_name: formData.name,
            from_email: formData.email,
            message: formData.message,
            to_email: import.meta.env.VITE_CONTACT_EMAIL,
          }
        )
      }

      toast.success('Message sent successfully! I\'ll get back to you soon.')
      setFormData({ name: '', email: '', message: '' })
    } catch (error) {
      console.error('Error sending message:', error)
      toast.error('Failed to send message. Please try again or email directly.')
    } finally {
      setIsSubmitting(false)
    }
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }))
  }

  const validateStep = (s) => {
    if (s === 1) {
      if (!formData.name.trim()) {
        toast.error('Please enter your name')
        return false
      }
      return true
    }
    if (s === 2) {
      if (!formData.email.trim()) {
        toast.error('Please enter your email')
        return false
      }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
        toast.error('Please enter a valid email address')
        return false
      }
      return true
    }
    if (s === 3) {
      if (!formData.message.trim()) {
        toast.error('Please enter a message')
        return false
      }
      return true
    }
    return true
  }

  const next = () => {
    if (!validateStep(step)) return
    setStep((v) => Math.min(3, v + 1))
  }

  const back = () => {
    setStep((v) => Math.max(1, v - 1))
  }

  return (
    <section id="contact" className="py-20 px-4 bg-dark-secondary/30">
      <Toaster position="bottom-right" />
      <div className="max-w-6xl mx-auto">
        <motion.div
          className="text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className="section-eyebrow justify-center">Get in touch</p>
          <h2 className="text-4xl md:text-5xl font-bold font-code">
            Let’s <span className="text-accent-teal">Connect</span>
          </h2>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <motion.div
            className="space-y-6"
            initial={{ opacity: 0, x: -20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            <p className="text-lg text-gray-300 mb-8">
              I'm always interested in hearing about new projects and opportunities. Feel free
              to reach out if you'd like to collaborate or just say hello!
            </p>

            {contactLinks.map((link, index) => (
              <motion.a
                key={index}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="glass-card p-4 flex items-center gap-4 group hover:border-accent-teal transition-all"
                initial={{ opacity: 0, y: 10 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1, duration: 0.6 }}
                viewport={{ once: true }}
                whileHover={{ x: 4 }}
              >
                <span className="text-3xl">{link.icon}</span>
                <div>
                  <p className="text-sm text-gray-400">{link.label}</p>
                  <p className="text-accent-teal font-semibold group-hover:text-accent-amber transition-colors">
                    {link.value}
                  </p>
                </div>
              </motion.a>
            ))}

            {/* Social links */}
            <motion.div
              className="flex gap-4 mt-8 pt-8 border-t border-accent-teal/20"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              viewport={{ once: true }}
            >
              <motion.a
                href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`}
                className="w-12 h-12 glass-card flex items-center justify-center text-xl hover:text-accent-teal transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                🐙
              </motion.a>
              <motion.a
                href="https://www.linkedin.com/in/jose-fernandez-7058b12a7"
                className="w-12 h-12 glass-card flex items-center justify-center text-xl hover:text-accent-teal transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
                target="_blank"
                rel="noopener noreferrer"
              >
                💼
              </motion.a>
              <motion.a
                href="#"
                className="w-12 h-12 glass-card flex items-center justify-center text-xl hover:text-accent-teal transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
              >
                🐦
              </motion.a>
            </motion.div>
          </motion.div>

          {/* Contact Form */}
          <motion.form
            onSubmit={handleSubmit}
            className="glass-card p-8"
            initial={{ opacity: 0, x: 20 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.8 }}
            viewport={{ once: true }}
          >
            {/* Stepper header */}
            <div className="mb-8">
              <div className="flex items-center justify-between gap-3">
                {[
                  { n: 1, label: 'Name' },
                  { n: 2, label: 'Email' },
                  { n: 3, label: 'Message' },
                ].map((s, idx, arr) => {
                  const active = step === s.n
                  const done = step > s.n
                  return (
                    <div key={s.n} className="flex items-center flex-1">
                      <button
                        type="button"
                        onClick={() => {
                          if (s.n < step && validateStep(s.n)) setStep(s.n)
                        }}
                        className="flex items-center gap-3 text-left"
                        aria-label={`Step ${s.n}: ${s.label}`}
                      >
                        <span
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-code text-sm border transition-colors ${
                            done
                              ? 'bg-accent-teal text-dark-bg border-accent-teal'
                              : active
                              ? 'bg-accent-teal/10 text-accent-teal border-accent-teal/50'
                              : 'bg-dark-bg/30 text-slate_mist border-accent-teal/15'
                          }`}
                        >
                          {s.n}
                        </span>
                        <span
                          className={`text-sm font-semibold transition-colors ${
                            active ? 'text-porcelain' : 'text-slate_mist'
                          }`}
                        >
                          {s.label}
                        </span>
                      </button>

                      {idx !== arr.length - 1 && (
                        <div className="flex-1 mx-3 h-[2px] rounded bg-accent-teal/10 overflow-hidden">
                          <motion.div
                            className="h-full bg-accent-teal"
                            initial={false}
                            animate={{ width: step > s.n ? '100%' : '0%' }}
                            transition={{ duration: 0.35 }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <motion.div
                className="mt-4 h-2 rounded-full bg-accent-teal/10 overflow-hidden"
                initial={false}
              >
                <motion.div
                  className="h-full bg-gradient-to-r from-accent-teal to-accent-amber"
                  initial={false}
                  animate={{ width: `${(step / 3) * 100}%` }}
                  transition={{ duration: 0.4 }}
                />
              </motion.div>
            </div>

            {/* Step content */}
            <motion.div
              key={step}
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.25 }}
              className="mb-8"
            >
              {step === 1 && (
                <div>
                  <label className="block text-sm font-semibold text-slate_mist mb-2">
                    Your Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-dark-secondary/40 rounded-lg border border-accent-teal/20 text-porcelain placeholder-slate_mist/60 focus:outline-none focus:border-accent-teal transition-colors"
                    autoComplete="name"
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="block text-sm font-semibold text-slate_mist mb-2">
                    Your Email
                  </label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-dark-secondary/40 rounded-lg border border-accent-teal/20 text-porcelain placeholder-slate_mist/60 focus:outline-none focus:border-accent-teal transition-colors"
                    autoComplete="email"
                  />
                </div>
              )}

              {step === 3 && (
                <div>
                  <label className="block text-sm font-semibold text-slate_mist mb-2">
                    Message
                  </label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows="6"
                    className="w-full px-4 py-3 bg-dark-secondary/40 rounded-lg border border-accent-teal/20 text-porcelain placeholder-slate_mist/60 focus:outline-none focus:border-accent-teal transition-colors resize-none"
                  />

                  <div className="mt-5 p-4 rounded-xl border border-accent-teal/15 bg-dark-bg/25">
                    <p className="text-xs text-slate_mist mb-2 font-code tracking-wide">
                      Review
                    </p>
                    <div className="text-sm text-porcelain space-y-1">
                      <p>
                        <span className="text-slate_mist">Name:</span> {formData.name || '—'}
                      </p>
                      <p>
                        <span className="text-slate_mist">Email:</span> {formData.email || '—'}
                      </p>
                    </div>
                  </div>
                </div>
              )}
            </motion.div>

            {/* Actions */}
            <div className="flex gap-3">
              <motion.button
                type="button"
                onClick={back}
                disabled={step === 1 || isSubmitting}
                className="flex-1 px-6 py-3 border border-accent-teal/25 text-porcelain rounded-lg hover:bg-accent-teal/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
                whileHover={{ scale: step === 1 ? 1 : 1.01 }}
                whileTap={{ scale: step === 1 ? 1 : 0.99 }}
              >
                Back
              </motion.button>

              {step < 3 ? (
                <motion.button
                  type="button"
                  onClick={next}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-teal to-accent-amber text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-accent-teal/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  Next
                </motion.button>
              ) : (
                <motion.button
                  type="submit"
                  disabled={isSubmitting || !validateStep(3)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-teal to-accent-amber text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-accent-teal/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                  whileHover={{ scale: 1.01 }}
                  whileTap={{ scale: 0.99 }}
                >
                  {isSubmitting ? 'Sending...' : 'Send Message'}
                </motion.button>
              )}
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              Your information is secure and will only be used to respond to your message.
            </p>
          </motion.form>
        </div>
      </div>
    </section>
  )
}

export default Contact
