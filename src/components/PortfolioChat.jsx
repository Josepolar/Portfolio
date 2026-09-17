import { useState } from 'react'
import { FiMessageCircle, FiSend, FiX } from 'react-icons/fi'

const SCOPE_TERMS = [
  'jose', 'portfolio', 'resume', 'cv', 'experience', 'project', 'work', 'skill',
  'frontend', 'backend', 'full stack', 'software engineer', 'javascript',
  'typescript', 'react', 'next.js', 'nextjs', 'node.js', 'nodejs', 'vite',
  'tailwind', 'php', 'laravel', 'mysql', 'postgresql', 'prisma', 'python',
  'dart', 'flutter', 'html', 'css', 'aws', 'vercel', 'stripe', 'github',
  'api', 'database', 'cloud', 'fintech', 'payment', 'nlp', 'ai', 'contact',
  'hire', 'available', 'about', 'hello', 'hi', 'hey',
]

function isInScope(text) {
  const normalized = text.toLowerCase()
  return SCOPE_TERMS.some((term) => term.length <= 3
    ? new RegExp(`\\b${term}\\b`).test(normalized)
    : normalized.includes(term))
}

function getLocalResponse(question) {
  const normalized = question.toLowerCase()

  if (/hello|^hi$|^hey$|good morning|good afternoon/.test(normalized)) {
    return 'Hi! I can tell you about Jose\'s skills, projects, experience, or availability.'
  }

  if (/skill|stack|technology|tech/.test(normalized)) {
    return 'Jose works across React, Next.js, TypeScript, JavaScript, Node.js, PostgreSQL, Prisma, PHP, Laravel, MySQL, Python, Dart, Flutter, Vite, Tailwind CSS, AWS, Vercel, GitHub, and Stripe.'
  }

  if (/project|work|built|build/.test(normalized)) {
    return 'Jose builds production-ready full-stack systems, fintech and commercial platforms, payment integrations, cloud storage workflows, and thoughtful digital experiences.'
  }

  if (/experience|background|about|who is|jose/.test(normalized)) {
    return 'Jose Bernard R. Fernandez is a full-stack software engineer focused on production-ready systems, clear user experiences, fintech products, commercial platforms, and AI/NLP evaluation.'
  }

  if (/frontend|front.?end|react|next|typescript|javascript/.test(normalized)) {
    return 'On the frontend, Jose works with React, Next.js, TypeScript, JavaScript, Tailwind CSS, Vite, and Framer Motion.'
  }

  if (/backend|back.?end|node|php|laravel|api|database|postgres|mysql|prisma/.test(normalized)) {
    return 'On the backend, Jose works with Node.js, PHP, Laravel, PostgreSQL, MySQL, Prisma, REST APIs, role-based access control, and system design.'
  }

  if (/hire|available|contact|email/.test(normalized)) {
    return 'You can reach Jose through the Contact section of this portfolio for availability and project inquiries.'
  }

  return 'Jose works as a full-stack software engineer across frontend, backend, databases, cloud tools, fintech, and thoughtful digital experiences.'
}

function PortfolioChat() {
  const [isOpen, setIsOpen] = useState(false)
  const [input, setInput] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [messages, setMessages] = useState([
    { role: 'assistant', content: 'Ask me about Jose\'s skills, projects, or experience.' },
  ])

  const sendMessage = async (event) => {
    event.preventDefault()
    const content = input.trim()
    if (!content || isLoading) return

    const userMessage = { role: 'user', content }
    setInput('')
    setMessages((current) => [...current, userMessage])

    if (!isInScope(content)) {
      setMessages((current) => [...current, { role: 'assistant', content: 'oops bawal yan' }])
      return
    }

    setIsLoading(true)
    setMessages((current) => [...current, { role: 'assistant', content: getLocalResponse(content) }])
    setIsLoading(false)
  }

  return (
    <div className={`portfolio-chat ${isOpen ? 'is-open' : ''}`}>
      {isOpen && (
        <section className="portfolio-chat__panel" aria-label="Jose.dev AI assistant">
          <header className="portfolio-chat__header">
            <div>
              <p className="portfolio-chat__eyebrow">Jose.dev / Local AI</p>
              <h2>Ask about my stack</h2>
            </div>
            <button type="button" onClick={() => setIsOpen(false)} aria-label="Close chat">
              <FiX />
            </button>
          </header>

          <div className="portfolio-chat__messages" aria-live="polite">
            {messages.map((message, index) => (
              <div key={`${message.role}-${index}`} className={`portfolio-chat__message ${message.role}`}>
                {message.content}
              </div>
            ))}
            {isLoading && <div className="portfolio-chat__message assistant">Thinking...</div>}
          </div>

          <form className="portfolio-chat__form" onSubmit={sendMessage}>
            <input
              value={input}
              onChange={(event) => setInput(event.target.value)}
              placeholder="Ask about React, projects..."
              aria-label="Ask the portfolio assistant"
            />
            <button type="submit" disabled={isLoading || !input.trim()} aria-label="Send message">
              <FiSend />
            </button>
          </form>
        </section>
      )}

      <button
        type="button"
        className="portfolio-chat__toggle"
        onClick={() => setIsOpen((current) => !current)}
        aria-label={isOpen ? 'Close portfolio assistant' : 'Open portfolio assistant'}
      >
        {isOpen ? <FiX /> : <FiMessageCircle />}
        <span>Ask Jose AI</span>
      </button>
    </div>
  )
}

export default PortfolioChat
