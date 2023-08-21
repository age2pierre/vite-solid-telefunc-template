import typo from '@tailwindcss/typography'
import daisyui from 'daisyui'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {},
  },
  daisyui: {
    themes: [
      {
        'dark-teal': {
          primary: '#0d9488',
          secondary: '#10b981',
          accent: '#fde047',
          neutral: '#1c1917',
          'base-100': '#44403c',
          info: '#e0f2fe',
          success: '#047857',
          warning: '#f59e0b',
          error: '#c2410c',
        },
      },
    ],
  },
  plugins: [typo, daisyui],
}

export default config
