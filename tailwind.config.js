/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        'bg-main':      '#1a1208',
        'bg-panel':     '#2a1f0e',
        'bg-card':      '#231a0a',
        'text-main':    '#e8d5a3',
        'text-muted':   '#9a8060',
        'accent-gold':  '#c9a84c',
        'accent-red':   '#8b2020',
        'accent-green': '#4a7c59',
        'accent-bronze':'#7a5c2e',
        'border-main':  '#4a3820',
      },
      fontFamily: {
        serif: ['"Source Han Serif"', '"Noto Serif SC"', 'SimSun', 'serif'],
      },
    },
  },
  plugins: [],
}

