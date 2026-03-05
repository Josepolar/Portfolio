/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx}",
  ],
  theme: {
    extend: {
      colors: {
        'dark-bg': '#0A0E1A',
        'dark-secondary': '#1A1F3A',
        'accent-teal': '#00D4FF',
        'accent-amber': '#F5A623',
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

