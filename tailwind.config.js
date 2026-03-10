/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        // Coolors palette:
        // https://coolors.co/palette/0d1b2a-1b263b-415a77-778da9-e0e1dd
        abyss: '#0d1b2a',
        deep_slate: '#1b263b',
        steel_blue: '#415a77',
        slate_mist: '#778da9',
        porcelain: '#e0e1dd',

        // Keep existing token names used across components.
        'dark-bg': '#0d1b2a', // abyss
        'dark-secondary': '#1b263b', // deep_slate
        'accent-teal': '#778da9', // slate_mist
        'accent-amber': '#415a77', // steel_blue
      },
      fontFamily: {
        'code': ['JetBrains Mono', 'monospace'],
        'body': ['Lato', 'sans-serif'],
      },
      spacing: {
        'safe-top': 'max(1rem, env(safe-area-inset-top))',
        'safe-bottom': 'max(1rem, env(safe-area-inset-bottom))',
      },
    },
  },
  plugins: [],
}

