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
      animation: {
        'pulse-glow': 'pulse-glow 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'fade-in': 'fade-in 0.6s ease-in',
        'slide-up': 'slide-up 0.6s ease-out',
      },
      keyframes: {
        'pulse-glow': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'slide-up': {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
      },
      backdropFilter: {
        'glass': 'blur(10px) brightness(1.1)',
      },
    },
  },
  plugins: [],
}
