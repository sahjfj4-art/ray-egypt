/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        ray: {
          gold: '#FDB813',
          blue: '#1E3A8A',
          white: '#FFFFFF',
          black: '#1A1A1A',
          orange: '#F97316',
          gray: '#F3F4F6'
        }
      }
    },
  },
  plugins: [],
}

