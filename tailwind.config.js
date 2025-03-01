/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#14b8a6',
          dark: '#0d9488',
        },
        secondary: {
          DEFAULT: '#f97316',
          dark: '#ea580c',
        },
      },
    },
  },
  plugins: [],
};