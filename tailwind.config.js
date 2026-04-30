/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // ── Premium Dark Palette ────────────────────────────────
        'dark-bg':        '#050505',
        'dark-secondary': '#0f0f11',
        abyss:            '#000000',
        deep_slate:       '#111111',

        // ── Premium Light Palette ───────────────────────────────
        porcelain:        '#f3f3f3',   // light text on dark bg
        'light-bg':       '#ffffff',   // true light mode background
        'light-surface':  '#f8f8f8',   // light mode card surface

        // ── CSS-variable-driven (switches per theme) ──────────
        'accent-primary':  'rgb(var(--accent-primary)  / <alpha-value>)',
        'accent-secondary': 'rgb(var(--accent-secondary) / <alpha-value>)',
      },
      fontFamily: {
        'display': ['Syne', 'sans-serif'],
        'body': ['Inter', 'sans-serif'],
      },
      spacing: {
        'safe-top':    'max(1rem, env(safe-area-inset-top))',
        'safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
      },
      keyframes: {
        marquee: {
          '0%':   { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
      animation: {
        marquee: 'marquee 22s linear infinite',
      },
    },
  },
  plugins: [],
}

