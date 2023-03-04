/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',

    // Or if using `src` directory:
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
      },
      animation: {
        'fade-in': 'fade-in 600ms ease',
      },
      colors: {
        primary: {
          default: '#111b21',
          darkest: '#0b141a',
          dark: '#0a1014',
          medium: '#182229',
        },
        secondary: {
          darkest: '#2a3942',
          default: '#202c33',
        },
        accent: {
          darkest: '#008069',
          dark: '#00a884',
          medium: '#06cf9c',
          light: '#71eb85',
          bright: '#09d261',
        },
        contrast: {
          primary: '#d1d7db',
          secondary: '#8696a0',
          heading: '#e9edefe0',
        },
      },
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
