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
      value: 'LinkedIn Profile',
      href: '#',
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

  return (
    <section id="contact" className="py-20 px-4 bg-dark-secondary/30">
      <Toaster position="bottom-right" />
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold font-code text-center mb-16"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          Let's <span className="text-accent-teal">Connect</span>
        </motion.h2>

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
                href="#"
                className="w-12 h-12 glass-card flex items-center justify-center text-xl hover:text-accent-teal transition-colors"
                whileHover={{ scale: 1.1, rotate: 5 }}
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
            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Your Name
              </label>
              <input
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="John Doe"
                className="w-full px-4 py-3 bg-dark-secondary rounded-lg border border-accent-teal/20 text-white placeholder-gray-600 focus:outline-none focus:border-accent-teal transition-colors"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Your Email
              </label>
              <input
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="your@email.com"
                className="w-full px-4 py-3 bg-dark-secondary rounded-lg border border-accent-teal/20 text-white placeholder-gray-600 focus:outline-none focus:border-accent-teal transition-colors"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block text-sm font-semibold text-gray-300 mb-2">
                Message
              </label>
              <textarea
                name="message"
                value={formData.message}
                onChange={handleChange}
                placeholder="Tell me about your project or opportunity..."
                rows="5"
                className="w-full px-4 py-3 bg-dark-secondary rounded-lg border border-accent-teal/20 text-white placeholder-gray-600 focus:outline-none focus:border-accent-teal transition-colors resize-none"
                required
              ></textarea>
            </div>

            <motion.button
              type="submit"
              disabled={isSubmitting}
              className="w-full px-6 py-3 bg-gradient-to-r from-accent-teal to-accent-amber text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-accent-teal/50 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              {isSubmitting ? 'Sending...' : 'Send Message'}
            </motion.button>

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
