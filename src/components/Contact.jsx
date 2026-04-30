import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import emailjs from '@emailjs/browser'
import toast, { Toaster } from 'react-hot-toast'

gsap.registerPlugin(ScrollTrigger)

// Detect placeholder / missing values at module load (not on every render)
const EMAILJS_SERVICE  = import.meta.env.VITE_EMAILJS_SERVICE_ID  || ''
const EMAILJS_TEMPLATE = import.meta.env.VITE_EMAILJS_TEMPLATE_ID || ''
const EMAILJS_KEY      = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  || ''
const CONTACT_EMAIL    = import.meta.env.VITE_CONTACT_EMAIL        || ''

const isPlaceholder = (v) => !v || v.startsWith('your_') || v === 'undefined'

const emailjsReady =
  !isPlaceholder(EMAILJS_SERVICE) &&
  !isPlaceholder(EMAILJS_TEMPLATE) &&
  !isPlaceholder(EMAILJS_KEY)

// Init once at module level (safe to call even before any send)
if (emailjsReady) {
  emailjs.init({ publicKey: EMAILJS_KEY })
}

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

  const sectionRef = useRef(null)
  const stepContentRef = useRef(null)
  const progressRef = useRef(null)

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.contact-header', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-header', start: 'top 85%', once: true },
      })
      gsap.fromTo('.contact-info', { opacity: 0, x: -20 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-info', start: 'top 85%', once: true },
      })
      gsap.fromTo('.contact-link-item', { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-info', start: 'top 85%', once: true },
      })
      gsap.fromTo('.contact-social', { opacity: 0 }, {
        opacity: 1, duration: 0.5, delay: 0.5, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-social', start: 'top 90%', once: true },
      })
      gsap.fromTo('.contact-form', { opacity: 0, x: 20 }, {
        opacity: 1, x: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.contact-form', start: 'top 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Animate step content transitions
  useEffect(() => {
    if (stepContentRef.current) {
      gsap.fromTo(stepContentRef.current, { opacity: 0, y: 10 }, { opacity: 1, y: 0, duration: 0.25, ease: 'power2.out' })
    }
    if (progressRef.current) {
      gsap.to(progressRef.current, { width: `${(step / 3) * 100}%`, duration: 0.4, ease: 'power2.out' })
    }
  }, [step])

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

    if (emailjsReady) {
      try {
        await emailjs.send(
          EMAILJS_SERVICE,
          EMAILJS_TEMPLATE,
          {
            from_name:    formData.name,
            reply_to:     formData.email,
            from_email:   formData.email,
            message:      formData.message,
            to_email:     CONTACT_EMAIL,
          }
        )
        toast.success("Message sent! I'll get back to you soon.")
        setFormData({ name: '', email: '', message: '' })
        setStep(1)
      } catch (err) {
        console.error('EmailJS error:', err)
        toast.error('Failed to send. Redirecting to email client...')
        setTimeout(() => openMailto(), 1200)
      } finally {
        setIsSubmitting(false)
      }
      return
    }

    openMailto()
    setIsSubmitting(false)
  }

  const openMailto = () => {
    const subject = encodeURIComponent(`Portfolio Contact from ${formData.name}`)
    const body    = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\n${formData.message}`
    )
    window.location.href = `mailto:${CONTACT_EMAIL}?subject=${subject}&body=${body}`
  }

  const handleChange = (e) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const validateStep = (s) => {
    if (s === 1) {
      if (!formData.name.trim()) { toast.error('Please enter your name'); return false }
      return true
    }
    if (s === 2) {
      if (!formData.email.trim()) { toast.error('Please enter your email'); return false }
      if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) { toast.error('Please enter a valid email address'); return false }
      return true
    }
    if (s === 3) {
      if (!formData.message.trim()) { toast.error('Please enter a message'); return false }
      return true
    }
    return true
  }

  const next = () => { if (!validateStep(step)) return; setStep((v) => Math.min(3, v + 1)) }
  const back = () => { setStep((v) => Math.max(1, v - 1)) }

  return (
    <section id="contact" className="py-20 px-4 bg-dark-secondary/30" ref={sectionRef}>
      <Toaster position="bottom-right" />
      <div className="max-w-6xl mx-auto">
        <div className="contact-header text-center mb-16 opacity-0">
          <p className="section-eyebrow justify-center">Get in touch</p>
          <h2 className="text-4xl md:text-5xl font-bold font-display">
            Let's <span className="text-accent-primary">Connect</span>
          </h2>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {/* Contact Information */}
          <div className="contact-info space-y-6 opacity-0">
            <p className="text-lg text-gray-300 mb-8">
              I'm always interested in hearing about new projects and opportunities. Feel free
              to reach out if you'd like to collaborate or just say hello!
            </p>

            {contactLinks.map((link, index) => (
              <a
                key={index}
                href={link.href}
                target={link.href.startsWith('http') ? '_blank' : undefined}
                rel={link.href.startsWith('http') ? 'noopener noreferrer' : undefined}
                className="contact-link-item glass-card p-4 flex items-center gap-4 group hover:border-accent-primary hover:translate-x-1 transition-all opacity-0"
              >
                <span className="text-3xl">{link.icon}</span>
                <div>
                  <p className="text-sm text-gray-400">{link.label}</p>
                  <p className="text-accent-primary font-semibold group-hover:text-accent-secondary transition-colors">
                    {link.value}
                  </p>
                </div>
              </a>
            ))}

            {/* Social links */}
            <div className="contact-social flex gap-4 mt-8 pt-8 border-t border-accent-primary/20 opacity-0">
              <a
                href={`https://github.com/${import.meta.env.VITE_GITHUB_USERNAME}`}
                className="w-12 h-12 glass-card flex items-center justify-center text-xl hover:text-accent-primary hover:scale-110 hover:rotate-[5deg] transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                🐙
              </a>
              <a
                href="https://www.linkedin.com/in/jose-fernandez-7058b12a7"
                className="w-12 h-12 glass-card flex items-center justify-center text-xl hover:text-accent-primary hover:scale-110 hover:rotate-[5deg] transition-all"
                target="_blank"
                rel="noopener noreferrer"
              >
                💼
              </a>
              <a
                href="#"
                className="w-12 h-12 glass-card flex items-center justify-center text-xl hover:text-accent-primary hover:scale-110 hover:rotate-[5deg] transition-all"
              >
                🐦
              </a>
            </div>
          </div>

          {/* Contact Form */}
          <form
            onSubmit={handleSubmit}
            className="contact-form glass-card p-8 opacity-0"
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
                        onClick={() => { if (s.n < step && validateStep(s.n)) setStep(s.n) }}
                        className="flex items-center gap-3 text-left"
                        aria-label={`Step ${s.n}: ${s.label}`}
                      >
                        <span
                          className={`w-9 h-9 rounded-full flex items-center justify-center font-display text-sm border transition-colors ${
                            done
                              ? 'bg-accent-primary text-dark-bg border-accent-primary'
                              : active
                              ? 'bg-accent-primary/10 text-accent-primary border-accent-primary/50'
                              : 'bg-dark-bg/30 text-accent-secondary border-accent-primary/15'
                          }`}
                        >
                          {s.n}
                        </span>
                        <span className={`text-sm font-semibold transition-colors ${active ? 'text-porcelain' : 'text-accent-secondary'}`}>
                          {s.label}
                        </span>
                      </button>

                      {idx !== arr.length - 1 && (
                        <div className="flex-1 mx-3 h-[2px] rounded bg-accent-primary/10 overflow-hidden">
                          <div
                            className="h-full bg-accent-primary transition-all duration-300"
                            style={{ width: step > s.n ? '100%' : '0%' }}
                          />
                        </div>
                      )}
                    </div>
                  )
                })}
              </div>

              <div className="mt-4 h-2 rounded-full bg-accent-primary/10 overflow-hidden">
                <div
                  ref={progressRef}
                  className="h-full bg-gradient-to-r from-accent-primary to-accent-secondary"
                  style={{ width: `${(step / 3) * 100}%` }}
                />
              </div>
            </div>

            {/* Step content */}
            <div ref={stepContentRef} key={step} className="mb-8">
              {step === 1 && (
                <div>
                  <label className="block text-sm font-semibold text-accent-secondary mb-2">Your Name</label>
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder="John Doe"
                    className="w-full px-4 py-3 bg-dark-secondary/40 rounded-lg border border-accent-primary/20 text-porcelain placeholder-accent-secondary/60 focus:outline-none focus:border-accent-primary transition-colors"
                    autoComplete="name"
                  />
                </div>
              )}

              {step === 2 && (
                <div>
                  <label className="block text-sm font-semibold text-accent-secondary mb-2">Your Email</label>
                  <input
                    type="email"
                    name="email"
                    value={formData.email}
                    onChange={handleChange}
                    placeholder="your@email.com"
                    className="w-full px-4 py-3 bg-dark-secondary/40 rounded-lg border border-accent-primary/20 text-porcelain placeholder-accent-secondary/60 focus:outline-none focus:border-accent-primary transition-colors"
                    autoComplete="email"
                  />
                </div>
              )}

              {step === 3 && (
                <div>
                  <label className="block text-sm font-semibold text-accent-secondary mb-2">Message</label>
                  <textarea
                    name="message"
                    value={formData.message}
                    onChange={handleChange}
                    placeholder="Tell me about your project or opportunity..."
                    rows="6"
                    className="w-full px-4 py-3 bg-dark-secondary/40 rounded-lg border border-accent-primary/20 text-porcelain placeholder-accent-secondary/60 focus:outline-none focus:border-accent-primary transition-colors resize-none"
                  />

                  <div className="mt-5 p-4 rounded-xl border border-accent-primary/15 bg-dark-bg/25">
                    <p className="text-xs text-accent-secondary mb-2 font-display tracking-wide">Review</p>
                    <div className="text-sm text-porcelain space-y-1">
                      <p><span className="text-accent-secondary">Name:</span> {formData.name || '—'}</p>
                      <p><span className="text-accent-secondary">Email:</span> {formData.email || '—'}</p>
                    </div>
                  </div>
                </div>
              )}
            </div>

            {/* Actions */}
            <div className="flex gap-3">
              <button
                type="button"
                onClick={back}
                disabled={step === 1 || isSubmitting}
                className="flex-1 px-6 py-3 border border-accent-primary/25 text-porcelain rounded-lg hover:bg-accent-primary/10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-semibold"
              >
                Back
              </button>

              {step < 3 ? (
                <button
                  type="button"
                  onClick={next}
                  disabled={isSubmitting}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-accent-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  Next
                </button>
              ) : (
                <button
                  type="submit"
                  disabled={isSubmitting || !validateStep(3)}
                  className="flex-1 px-6 py-3 bg-gradient-to-r from-accent-primary to-accent-secondary text-dark-bg font-bold rounded-lg hover:shadow-lg hover:shadow-accent-primary/30 transition-all disabled:opacity-50 disabled:cursor-not-allowed"
                >
                  {isSubmitting ? 'Sending...' : emailjsReady ? 'Send Message' : 'Open Email App ↗'}
                </button>
              )}
            </div>

            <p className="text-xs text-gray-500 text-center mt-4">
              {emailjsReady
                ? 'Your message will be delivered directly to my inbox.'
                : 'Clicking Send will open your email client with the message pre-filled.'}
            </p>
          </form>
        </div>
      </div>
    </section>
  )
}

export default Contact
