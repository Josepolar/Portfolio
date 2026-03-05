import { useEffect, useState } from 'react'
import { motion } from 'framer-motion'
import axios from 'axios'

function GitHubRepos() {
  const [repos, setRepos] = useState([])
  const [filteredRepos, setFilteredRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [searchTerm, setSearchTerm] = useState('')
  const [selectedLanguage, setSelectedLanguage] = useState('All')
  const [sortBy, setSortBy] = useState('recent')

  const languages = ['All', 'PHP', 'JavaScript', 'Dart', 'Python', 'HTML']

  useEffect(() => {
    fetchRepos()
  }, [])

  const fetchRepos = async () => {
    try {
      setLoading(true)
      const headers = import.meta.env.VITE_GITHUB_TOKEN
        ? { Authorization: `token ${import.meta.env.VITE_GITHUB_TOKEN}` }
        : {}

      const response = await axios.get(
        `https://github.com/Josepolar${import.meta.env.VITE_GITHUB_USERNAME}/repos?per_page=100&sort=updated`,
        { headers }
      )

      setRepos(response.data)
      setFilteredRepos(response.data)
      setError(null)
    } catch (err) {
      setError('Failed to fetch repositories')
      console.error(err)
    } finally {
      setLoading(false)
    }
  }

  useEffect(() => {
    let filtered = repos

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

  return (
    <section id="github" className="py-20 px-4 bg-dark-secondary/30">
      <div className="max-w-6xl mx-auto">
        <motion.h2
          className="text-4xl md:text-5xl font-bold font-code text-center mb-4"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <span className="text-accent-teal">GitHub</span> Repositories
        </motion.h2>

        <p className="text-center text-gray-400 mb-8">
          Explore my open-source projects and contributions
        </p>

        {/* Filters and Search */}
        <motion.div
          className="glass-card p-6 mb-8"
          initial={{ opacity: 0, y: 10 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
        >
          {/* Search bar */}
          <div className="mb-6">
            <input
              type="text"
              placeholder="Search repositories..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full px-4 py-3 bg-dark-secondary rounded-lg border border-accent-teal/20 text-white placeholder-gray-500 focus:outline-none focus:border-accent-teal"
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
                  <motion.button
                    key={lang}
                    onClick={() => setSelectedLanguage(lang)}
                    className={`px-4 py-2 rounded-full transition-colors text-sm font-semibold ${
                      selectedLanguage === lang
                        ? 'bg-accent-teal text-dark-bg'
                        : 'bg-dark-secondary text-gray-300 hover:border-accent-teal border border-transparent'
                    }`}
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {lang}
                  </motion.button>
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
                className="w-full px-4 py-2 bg-dark-secondary rounded-lg border border-accent-teal/20 text-white focus:outline-none focus:border-accent-teal"
              >
                <option value="recent">Most Recent</option>
                <option value="stars">Most Stars</option>
                <option value="forks">Most Forks</option>
              </select>
            </div>
          </div>
        </motion.div>

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
            <motion.div
              className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
            >
              {filteredRepos.map((repo, index) => (
                <motion.a
                  key={repo.id}
                  href={repo.html_url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="glass-card p-6 hover:border-accent-teal transition-all group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.05, duration: 0.5 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -4 }}
                >
                  {/* Header */}
                  <div className="flex items-start justify-between mb-4">
                    <h3 className="text-lg font-bold text-accent-teal group-hover:text-accent-amber transition-colors">
                      {repo.name}
                    </h3>
                    {repo.private ? (
                      <span className="text-xs bg-accent-amber/20 text-accent-amber px-2 py-1 rounded">
                        Private
                      </span>
                    ) : (
                      <span className="text-xs bg-accent-teal/20 text-accent-teal px-2 py-1 rounded">
                        Public
                      </span>
                    )}
                  </div>

                  {/* Description */}
                  <p className="text-gray-400 text-sm mb-4 line-clamp-2">
                    {repo.description || 'No description provided'}
                  </p>

                  {/* Language and stats */}
                  <div className="flex items-center justify-between text-xs text-gray-500 mb-4">
                    {repo.language && (
                      <div className="flex items-center gap-1">
                        <span className={`w-2 h-2 rounded-full ${getLanguageColor(repo.language)}`}></span>
                        <span className={getLanguageColor(repo.language)}>
                          {repo.language}
                        </span>
                      </div>
                    )}
                    <span>Updated {getRelativeTime(repo.updated_at)}</span>
                  </div>

                  {/* Stats and footer */}
                  <div className="flex gap-4 pt-4 border-t border-accent-teal/10">
                    {repo.stargazers_count > 0 && (
                      <span className="text-sm text-gray-400">
                        ⭐ {repo.stargazers_count}
                      </span>
                    )}
                    {repo.forks_count > 0 && (
                      <span className="text-sm text-gray-400">
                        🍴 {repo.forks_count}
                      </span>
                    )}
                  </div>
                </motion.a>
              ))}
            </motion.div>

            {filteredRepos.length === 0 && (
              <div className="text-center py-12">
                <p className="text-gray-400">No repositories found matching your filters.</p>
              </div>
            )}

            <motion.div
              className="text-center text-gray-400 text-sm"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              Showing {filteredRepos.length} of {repos.length} repositories
            </motion.div>
          </>
        )}
      </div>
    </section>
  )
}

export default GitHubRepos
