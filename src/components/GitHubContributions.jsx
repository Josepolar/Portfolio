import { useEffect, useMemo, useState } from 'react'
import axios from 'axios'

function fmtDate(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' })
}

function getMonthLabel(dateStr) {
  const d = new Date(dateStr)
  return d.toLocaleDateString(undefined, { month: 'short' })
}

function toSundayStartIndex(day) {
  // JS: 0 Sun ... 6 Sat, GitHub calendar starts at Sunday
  return day
}

const LEVEL_COLORS = {
  // Styled to match the GitHub grid but with your Coolors palette vibe
  dark: ['#1b263b', '#415a77', '#778da9', '#9aaac0', '#e0e1dd'],
  light: ['#cfd2cd', '#778da9', '#5f7694', '#415a77', '#0d1b2a'],
}

export default function GitHubContributions({ theme = 'dark', username = 'Josepolar' }) {
  const [days, setDays] = useState([])
  const [total, setTotal] = useState(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    const run = async () => {
      try {
        setLoading(true)
        setError(null)
        const res = await axios.get(`https://github-contributions-api.jogruber.de/v4/${username}?y=last`, {
          timeout: 15000,
        })
        setDays(res.data?.contributions || [])
        setTotal(res.data?.total?.lastYear ?? null)
      } catch (err) {
        const status = err?.response?.status
        const message = err?.response?.data?.message || err?.message || 'Unknown error'
        setError(`Failed to load contributions${status ? ` (${status})` : ''}: ${message}`)
        // eslint-disable-next-line no-console
        console.error('Contributions fetch failed:', { status, message, err })
      } finally {
        setLoading(false)
      }
    }
    run()
  }, [username])

  const { weeks, monthLabels } = useMemo(() => {
    if (!days.length) return { weeks: [], monthLabels: [] }

    const sorted = [...days].sort((a, b) => new Date(a.date) - new Date(b.date))

    // Pad to start on Sunday
    const first = new Date(sorted[0].date)
    const padCount = toSundayStartIndex(first.getDay())
    const padded = [
      ...Array.from({ length: padCount }, (_, i) => {
        const d = new Date(sorted[0].date)
        d.setDate(d.getDate() - (padCount - i))
        return { date: d.toISOString().slice(0, 10), count: 0, level: 0, pad: true }
      }),
      ...sorted,
    ]

    const w = []
    for (let i = 0; i < padded.length; i += 7) {
      w.push(padded.slice(i, i + 7))
    }

    // Month labels at week boundaries when month changes
    const labels = []
    let lastMonth = null
    for (let i = 0; i < w.length; i += 1) {
      const weekStart = w[i]?.[0]
      if (!weekStart) continue
      const m = new Date(weekStart.date).getMonth()
      if (m !== lastMonth) {
        labels.push({ weekIndex: i, label: getMonthLabel(weekStart.date) })
        lastMonth = m
      }
    }

    return { weeks: w, monthLabels: labels }
  }, [days])

  const colors = theme === 'light' ? LEVEL_COLORS.light : LEVEL_COLORS.dark

  if (loading) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-accent-secondary">Loading contributions...</p>
      </div>
    )
  }

  if (error) {
    return (
      <div className="glass-card p-8 text-center">
        <p className="text-accent-secondary">{error}</p>
      </div>
    )
  }

  return (
    <div className="glass-card p-6 md:p-8">
      <div className="flex items-center justify-between gap-4 flex-wrap mb-4">
        <p className="text-sm text-accent-secondary">
          <span className="font-semibold text-accent-primary">
            {typeof total === 'number' ? total : '—'}
          </span>{' '}
          contributions in the last year
        </p>

        <a
          className="text-xs font-display text-accent-primary hover:underline"
          href={`https://github.com/${username}`}
          target="_blank"
          rel="noopener noreferrer"
        >
          View on GitHub ↗
        </a>
      </div>

      <div className="overflow-x-auto">
        <div className="min-w-[820px]">
          {/* Month labels */}
          <div className="flex gap-[3px] ml-10 mb-2">
            {weeks.map((_, i) => {
              const label = monthLabels.find((m) => m.weekIndex === i)?.label
              return (
                <div key={i} className="w-[12px]">
                  {label ? <span className="text-[10px] text-accent-secondary">{label}</span> : null}
                </div>
              )
            })}
          </div>

          <div className="flex">
            {/* Weekday labels (Mon/Wed/Fri like GitHub) */}
            <div className="w-10 pr-2">
              {['', 'Mon', '', 'Wed', '', 'Fri', ''].map((d, idx) => (
                <div key={idx} className="h-[12px] mb-[3px] text-[10px] text-accent-secondary">
                  {d}
                </div>
              ))}
            </div>

            {/* Grid */}
            <div className="flex gap-[3px]">
              {weeks.map((week, wIdx) => (
                <div key={wIdx} className="flex flex-col gap-[3px]">
                  {week.map((day) => (
                    <div
                      key={day.date}
                      className="relative group rounded-[3px] transition-transform duration-150 hover:scale-125"
                      style={{
                        width: 12,
                        height: 12,
                        backgroundColor: colors[Math.min(4, Math.max(0, day.level ?? 0))],
                        outline: '1px solid rgba(255,255,255,0.06)',
                      }}
                    >
                      <div className="pointer-events-none absolute z-20 left-1/2 -translate-x-1/2 bottom-full mb-2 opacity-0 group-hover:opacity-100 transition-opacity">
                        <div className="px-3 py-2 rounded-md bg-dark-secondary/95 border border-accent-primary/20 text-[11px] text-porcelain whitespace-nowrap shadow-lg">
                          <span className="font-semibold">{day.count}</span> contributions
                          <span className="text-accent-secondary"> • {fmtDate(day.date)}</span>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>

          {/* Legend */}
          <div className="flex items-center justify-end gap-2 mt-4">
            <span className="text-[10px] text-accent-secondary">Less</span>
            {colors.map((c, i) => (
              <span
                key={i}
                className="inline-block rounded-[3px]"
                style={{
                  width: 12,
                  height: 12,
                  backgroundColor: c,
                  outline: '1px solid rgba(255,255,255,0.06)',
                }}
              />
            ))}
            <span className="text-[10px] text-accent-secondary">More</span>
          </div>
        </div>
      </div>
    </div>
  )
}

