import { useEffect, useMemo, useRef, useState } from 'react'
import gsap from 'gsap'
import { ScrollTrigger } from 'gsap/ScrollTrigger'
import axios from 'axios'
import { FiArrowUpRight, FiGithub, FiImage, FiMonitor, FiX } from 'react-icons/fi'

const FEATURED_NAMES = [
  'lars-web',
  'Portfolio',
  'profile-app',
  'VibeCheck',
  'Web-Planner',
  'Court-Reservation',
  'snapframe-style-booth',
  'ADR-Autoparts-PB',
]

const PROJECT_COPY = {
  'lars-web': { title: 'LARS', type: 'Gamified learning platform', description: 'A pixel-art learning platform for Filipino 7 students, bringing quizzes, activities, achievements, typing games, matching games, and score tracking into one playful system.' },
  Portfolio: { title: 'Jose.dev', type: 'Personal portfolio', description: 'A cinematic developer portfolio rooted in Antipolo, thoughtful interfaces, and useful systems.' },
  'profile-app': { title: 'Profile App', type: 'Mobile experience', description: 'A Flutter profile experience exploring calm information design and focused interaction.' },
  VibeCheck: { title: 'VibeCheck', type: 'Social product', description: 'A visual way to share mood, music, and small moments without the weight of long-form posting.' },
  'Web-Planner': { title: 'Web Planner', type: 'Planning tool', description: 'A focused planning workspace for turning ideas into clear next steps.' },
  'Court-Reservation': { title: 'Court Reservation', type: 'Booking system', description: 'A full-stack reservation system built for multi-user scheduling and reliable availability.' },
  'snapframe-style-booth': { title: 'SnapFrame', type: 'Photo booth experience', description: 'A modern photo booth studio for capturing, customizing, and printing timeless photostrips.' },
  'ADR-Autoparts-PB': { title: 'ADR AutoParts Trading', type: 'Automotive super-app', description: 'A full-stack automotive platform combining an ECU firmware portal, e-commerce, vehicle service booking, real-time analytics, and integrated payment gateways.' },
}

function getProjectImage(repo) {
  if (repo.name === 'lars-web') return '/projects/lars-web.png'
  if (repo.name === 'snapframe-style-booth') return '/projects/SnapFrame.webp'
  if (repo.name === 'ADR-Autoparts-PB') return '/projects/ADR-Autoparts-PB.webp'
  return `/projects/${repo.name}.webp`
}

function getScreenshotPath(repo) {
  return getProjectImage(repo)
}

function getProjectLink(repo) {
  if (repo.name === 'snapframe-style-booth') return 'https://snapframe-style-booth.vercel.app/'
  return repo.homepage || repo.html_url
}

function getFallbackImage(repo) {
  return `https://opengraph.githubassets.com/1/${repo.full_name}`
}

function ProjectVisual({ repo, copy }) {
  return (
    <div className={`project-gallery-visual ${repo.name === 'lars-web' ? 'project-gallery-visual--lars' : ''}`}>
      <img
        src={getProjectImage(repo)}
        alt={`${copy.title} project preview`}
        loading="lazy"
        onError={(event) => { event.currentTarget.src = getFallbackImage(repo) }}
      />
      <div className="project-gallery-overlay" />
      <span className="project-gallery-index">{String(FEATURED_NAMES.indexOf(repo.name) + 1).padStart(2, '0')}</span>
      <span className="project-gallery-open" aria-hidden="true"><FiArrowUpRight /></span>
    </div>
  )
}

function GitHubRepos() {
  const [repos, setRepos] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const [selectedProject, setSelectedProject] = useState(null)
  const sectionRef = useRef(null)

  useEffect(() => {
    const fetchRepos = async () => {
      try {
        const username = import.meta.env.VITE_GITHUB_USERNAME || 'Josepolar'
        const rawToken = import.meta.env.VITE_GITHUB_TOKEN?.trim?.() || ''
        const token = rawToken && !/your_(github_)?token/i.test(rawToken) ? rawToken : ''
        const response = await axios.get(`https://api.github.com/users/${username}/repos`, {
          headers: token ? { Authorization: `Bearer ${token}` } : undefined,
          params: { per_page: 100, sort: 'updated' },
          timeout: 15000,
        })
        setRepos(response.data)
      } catch (err) {
        setError(err?.response?.data?.message || 'Projects are temporarily unavailable.')
      } finally {
        setLoading(false)
      }
    }
    fetchRepos()
  }, [])

  const projects = useMemo(() => {
    const byName = new Map(repos.map((repo) => [repo.name, repo]))
    return FEATURED_NAMES.map((name) => byName.get(name)).filter(Boolean)
  }, [repos])

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.repos-header', { opacity: 0, y: 24 }, {
        opacity: 1, y: 0, duration: 0.8, ease: 'power3.out',
        scrollTrigger: { trigger: '.repos-header', start: 'top 84%', once: true },
      })
      gsap.fromTo('.project-gallery-item', { opacity: 0, y: 32 }, {
        opacity: 1, y: 0, duration: 0.7, stagger: 0.1, ease: 'power3.out',
        scrollTrigger: { trigger: '.project-gallery', start: 'top 82%', once: true },
      })
    }, sectionRef)
    return () => ctx.revert()
  }, [projects.length])

  useEffect(() => {
    if (!selectedProject) return undefined

    const handleKeyDown = (event) => {
      if (event.key === 'Escape') setSelectedProject(null)
    }

    document.body.style.overflow = 'hidden'
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = ''
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [selectedProject])

  return (
    <section id="github" className="project-gallery-section" ref={sectionRef}>
      <div className="project-gallery-wrap">
        <div className="repos-header project-gallery-header">
          <div>
            <p className="section-eyebrow justify-start">Selected works</p>
            <h2 className="project-gallery-title">Built with intent.</h2>
          </div>
          <p className="project-gallery-intro">A small selection of systems, interfaces, and experiments I have made real.</p>
        </div>

        {loading && <p className="project-gallery-status">Loading projects...</p>}
        {error && <p className="project-gallery-status">{error}</p>}

        {!loading && !error && (
          <>
          <div className="project-gallery" aria-label="Selected projects">
            {projects.map((repo, index) => {
              const copy = PROJECT_COPY[repo.name] || { title: repo.name, type: repo.language || 'Project', description: repo.description || 'A project from my development archive.' }
              return (
                <article className={`project-gallery-item project-gallery-item--${(index % 3) + 1}`} key={repo.id}>
                  <button type="button" className="project-gallery-link" onClick={() => setSelectedProject({ repo, copy })} aria-label={`Open ${copy.title} project image`}>
                    <ProjectVisual repo={repo} copy={copy} />
                  </button>
                  <div className="project-gallery-meta">
                    <div>
                      <p className="project-gallery-type">{copy.type}</p>
                      <h3>{copy.title}</h3>
                    </div>
                    <p className="project-gallery-description">{copy.description}</p>
                    <div className="project-gallery-footer">
                      <span>{repo.language || 'Web'}</span>
                      <span className="project-gallery-actions">
                        <a href={getScreenshotPath(repo)} target="_blank" rel="noopener noreferrer"><FiImage /> Screenshot</a>
                        <a href={getProjectLink(repo)} target="_blank" rel="noopener noreferrer">{getProjectLink(repo) !== repo.html_url ? <><FiMonitor /> Live site</> : <><FiGithub /> Repository</>}</a>
                      </span>
                    </div>
                  </div>
                </article>
              )
            })}
          </div>

          {selectedProject && (
            <div
              className="project-lightbox"
              role="dialog"
              aria-modal="true"
              aria-label={`${selectedProject.copy.title} project preview`}
              onMouseDown={(event) => {
                if (event.target === event.currentTarget) setSelectedProject(null)
              }}
            >
              <div className="project-lightbox-panel">
                <button type="button" className="project-lightbox-close" onClick={() => setSelectedProject(null)} aria-label="Close project image">
                  <FiX />
                </button>
                <img
                  src={getProjectImage(selectedProject.repo)}
                  alt={`${selectedProject.copy.title} project preview enlarged`}
                  onError={(event) => { event.currentTarget.src = getFallbackImage(selectedProject.repo) }}
                />
                <p>{selectedProject.copy.title}</p>
              </div>
            </div>
          )}
          </>
        )}

        {!loading && !error && projects.length === 0 && (
          <p className="project-gallery-status">Add featured repositories to see them here.</p>
        )}
      </div>
    </section>
  )
}

export default GitHubRepos
