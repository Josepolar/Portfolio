/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Fixed dark palette ────────────────────────────────
        'dark-bg':        '#07091e',
        'dark-secondary': '#0b1229',
        abyss:            '#07091e',
        deep_slate:       '#0b1229',

        // ── Fixed light palette ───────────────────────────────
        porcelain:        '#e8eaf6',   // light text on dark bg
        'light-bg':       '#f7f8ff',   // true light mode background
        'light-surface':  '#eef0ff',   // light mode card surface

        // ── CSS-variable-driven (switches per theme) ──────────
        // In CSS: --accent-primary  = space-separated R G B values
        //         --accent-secondary = space-separated R G B values
        'accent-teal':  'rgb(var(--accent-primary)  / <alpha-value>)',
        'accent-amber': 'rgb(var(--accent-secondary) / <alpha-value>)',
        'steel_blue':   'rgb(var(--accent-primary)  / <alpha-value>)',
        'slate_mist':   'rgb(var(--accent-secondary) / <alpha-value>)',
      },
      fontFamily: {
        'code': ['JetBrains Mono', 'monospace'],
        'body': ['Lato', 'sans-serif'],
      },
      spacing: {
        'safe-top':    'max(1rem, env(safe-area-inset-top))',
        'safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
      },
    },
  },
  plugins: [],
}

