import type { Config } from 'tailwindcss'

const config: Config = {
  darkMode: 'class',
  content: [
    './index.html',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        cream: '#FFFDF5',
        'soft-yellow': '#FEFCE8',
        'soft-blue': '#EFF6FF',
        'soft-grey': '#F5F5F5',
      },
      fontFamily: {
        'open-dyslexic': ['"OpenDyslexic"', 'sans-serif'],
        'comic-neue': ['"Comic Neue"', 'cursive'],
        lexie: ['"Lexie Readable"', 'sans-serif'],
      },
      backdropBlur: {
        xs: '2px',
      },
    },
  },
  plugins: [],
}

export default config
