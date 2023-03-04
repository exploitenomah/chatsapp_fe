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
      colors: {
        bg: {
          default: '#111b21',
          darkest: '#0b141a',
          dark: '#0a1014',
          medium: '#182229',
        },
        accent: {
          dark: '#00a884',
          medium: '#06cf9c',
          light: '#71eb85',
          bright: '#09d261',
        },
        text: { primary: '#e9edef', secondary: '#8696a0' },
      },
    },
  },
  plugins: [],
}
