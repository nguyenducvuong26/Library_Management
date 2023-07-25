/** @type {import('tailwindcss').Config} */
const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: ['./src/**/*.{html,js,jsx}'],
  theme: {
    screens: {
      xs: { max: '640px' },
      ...defaultTheme.screens,
    },
    extend: {},
  },
  important: true,
  plugins: [],
}
