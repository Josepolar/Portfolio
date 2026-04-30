import { useEffect, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'

gsap.registerPlugin(ScrollTrigger)

function GitHubRepos() {
  const [repos, setRepos] = useState([])
  const [filteredRepos, setFilteredRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [sortBy, setSortBy] = useState('recent')
  const sectionRef = useRef(null)
  const gridRef = useRef(null)

  const languages = ['All', 'PHP', 'JavaScript', 'Typescript']

  const fetchRepos = async () => {
    try {
      setLoading(true)
      const username = import.meta.env.VITE_GITHUB_USERNAME || 'Josepolar'

      const rawToken = import.meta.env.VITE_GITHUB_TOKEN?.trim?.() || ''
      const tokenLooksPlaceholder = /your_(github_)?token/i.test(rawToken) || rawToken === 'your_github_token_here'
      const token = rawToken && !tokenLooksPlaceholder ? rawToken : ''

      const headers = token ? { Authorization: `Bearer ${token}` } : {}

      const response = await axios.get(
        `https://api.github.com/users/${username}/repos`,
        {
          headers,
          params: {
            per_page: 100,
            sort: 'updated',
          },
          timeout: 15000,
        }
      )

      setRepos(response.data)
      setFilteredRepos(response.data)
      setError(null)
    } catch (err) {
      const status = err?.response?.status
      const message =
        err?.response?.data?.message ||
        err?.message ||
        'Unknown error'

      if (status === 403 && /rate limit/i.test(message)) {
        setError('GitHub rate limit hit. Add a server-side proxy, or remove token from client and accept the limit.')
      } else if (status === 401) {
        setError('GitHub token is invalid/expired (401). Remove it or set a valid token.')
      } else if (status === 404) {
        setError(`GitHub user "${username}" not found (404). Check VITE_GITHUB_USERNAME.`)
      } else {
        setError(`Failed to fetch repositories${status ? ` (${status})` : ''}: ${message}`)
      }

      console.error('GitHub repos fetch failed:', { status, message, err })
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    fetchRepos()
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  useEffect(() => {
    let filtered = [...repos]

    // Filter by language
    if (selectedLanguage !== 'All') {
      filtered = filtered.filter((repo) => repo.language === selectedLanguage)
    }

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (repo) =>
          repo.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (repo.description?.toLowerCase().includes(searchTerm.toLowerCase()) ?? false)
      )
    }

    // Sort
    if (sortBy === 'stars') {
      filtered.sort((a, b) => (b.stargazers_count || 0) - (a.stargazers_count || 0))
    } else if (sortBy === 'forks') {
      filtered.sort((a, b) => (b.forks_count || 0) - (a.forks_count || 0))
    } else {
      filtered.sort((a, b) => new Date(b.updated_at) - new Date(a.updated_at))
    }

    setFilteredRepos(filtered)
  }, [searchTerm, selectedLanguage, sortBy, repos])

  const getRelativeTime = (dateString) => {
    const date = new Date(dateString)
    const now = new Date()
    const seconds = Math.floor((now - date) / 1000)

    if (seconds < 60) return 'just now'
    if (seconds < 3600) return `${Math.floor(seconds / 60)}m ago`
    if (seconds < 86400) return `${Math.floor(seconds / 3600)}h ago`
    if (seconds < 604800) return `${Math.floor(seconds / 86400)}d ago`
    return `${Math.floor(seconds / 604800)}w ago`
  }

  const getLanguageColor = (language) => {
    const colors = {
      PHP: 'text-purple-400',
      JavaScript: 'text-yellow-400',
      Dart: 'text-blue-400',
      Python: 'text-blue-600',
      HTML: 'text-orange-400',
      CSS: 'text-pink-400',
      React: 'text-cyan-400',
    }
    return colors[language] || 'text-gray-400'
  }

  // GSAP scroll animations
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.repos-header', { opacity: 0, y: 20 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power2.out',
        scrollTrigger: { trigger: '.repos-header', start: 'top 85%', once: true },
      })
      gsap.fromTo('.repos-filters', { opacity: 0, y: 10 }, {
        opacity: 1, y: 0, duration: 0.6, ease: 'power2.out',
        scrollTrigger: { trigger: '.repos-filters', start: 'top 85%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [])

  // Animate repo cards when filteredRepos changes
  useEffect(() => {
    if (!gridRef.current || !filteredRepos.length) return
    const cards = gridRef.current.querySelectorAll('.repo-card')
    if (!cards.length) return
    gsap.fromTo(cards, { opacity: 0, y: 20 }, {
      opacity: 1, y: 0, duration: 0.4, stagger: 0.04, ease: 'power2.out',
    })
  }, [filteredRepos])

  return (
    <section id="github" className="py-24 md:py-32 px-4 sm:px-6 md:px-12 bg-dark-secondary/10" ref={sectionRef}>
      <div className="max-w-7xl mx-auto">
        <div className="repos-header text-left mb-16 opacity-0">
          <p className="section-eyebrow justify-start">Archive</p>
          <h2 className="text-4xl sm:text-5xl md:text-7xl lg:text-[7rem] font-bold font-display uppercase tracking-tighter leading-[1.0] md:leading-[0.9]">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-accent-primary to-accent-secondary">Selected</span> <br className="hidden md:block" /> Works.
          </h2>
        </div>

        {/* Filters and Search */}
        <div className="repos-filters glass-card p-6 mb-8 opacity-0">
          {/* Search bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-dark-secondary/50 rounded-lg border border-accent-primary/20 text-porcelain placeholder-accent-secondary/50 focus:outline-none focus:border-accent-primary transition-colors"
            />
          </div>

          {/* Language and Sort filters */}
          <div className="grid md:grid-cols-2 gap-6">
            {/* Language filter */}
            <div>
              <label className="block text-sm text-gray-400 mb-3 font-semibold">
                Filter by Language
              </label>
              <div className="flex flex-wrap gap-2">
                {languages.map((lang) => (
                  <button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-2 rounded-full transition-all text-sm font-semibold hover:scale-105 active:scale-95 ${selectedLanguage === lang
                        ? 'bg-accent-primary text-dark-bg'
                        : 'bg-accent-primary/10 text-accent-primary border border-accent-primary/20 hover:bg-accent-primary/20'
                      }`}
                  >
                    {lang}
                  </button>
                ))}
              </div>
            </div>

            {/* Sort */}
            <div>
              <label className="block text-sm text-gray-400 mb-3 font-semibold">
                Sort By
              </label>
              <select
                value={sortBy}
                onChange={(e) => setSortBy(e.target.value)}
                className="w-full px-4 py-2 bg-dark-secondary/50 rounded-lg border border-accent-primary/20 text-porcelain focus:outline-none focus:border-accent-primary"
              >
                <option value="recent">Most Recent</option>
                <option value="stars">Most Stars</option>
                <option value="forks">Most Forks</option>
              </select>
            </div>
          </div>
        </div>

        {/* Repositories Grid */}
        {loading ? (
          <div className="text-center py-12">
            <p className="text-gray-400">Loading repositories...</p>
          </div>
        ) : error ? (
          <div className="text-center py-12 text-red-400">
            <p>{error}</p>
          </div>
        ) : (
          <>
            <div
              ref={gridRef}
              className="flex flex-col mb-16 border-t border-white/5"
            >
              {filteredRepos.map((repo) => (
                <a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="repo-card group relative py-10 md:py-16 border-b border-white/5 hover:border-accent-primary/50 transition-colors opacity-0 block w-full overflow-hidden"
                >
                  <div className="flex flex-col md:flex-row md:items-baseline justify-between gap-4 md:gap-8 relative z-10">
                    <h3 className="text-4xl sm:text-5xl md:text-7xl lg:text-[6rem] font-bold font-display uppercase tracking-tighter text-porcelain group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-accent-primary group-hover:to-accent-secondary transition-all duration-300">
                      {repo.name}
                    </h3>
                    <div className="flex flex-wrap items-center gap-4 md:gap-8 text-gray-500 font-display uppercase tracking-widest text-xs sm:text-sm">
                      {repo.language && <span className="group-hover:text-accent-primary transition-colors">{repo.language}</span>}
                      <span>⭐ {repo.stargazers_count}</span>
                      <span className="hidden sm:inline-block">{getRelativeTime(repo.updated_at)}</span>
                    </div>
                  </div>

                  {repo.description && (
                    <p className="mt-6 md:mt-8 text-gray-400 max-w-3xl relative z-10 text-base md:text-xl font-display tracking-wide leading-relaxed group-hover:text-porcelain transition-colors duration-300">
                      {repo.description}
                    </p>
                  )}

                  {/* Hover background effect */}
                  <div className="absolute inset-0 bg-gradient-to-r from-accent-primary/5 to-transparent scale-y-0 origin-bottom group-hover:scale-y-100 transition-transform duration-500 ease-out z-0"></div>
                </a>
              ))}
            </div>

            {filteredRepos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No repositories found matching your filters.</p>
              </div>
            )}

            <div className="text-center text-gray-400 text-sm">
              Showing {filteredRepos.length} of {repos.length} repositories
            </div>
          </>
        )}
      </div>
    </section>
  )
}

export default GitHubRepos
