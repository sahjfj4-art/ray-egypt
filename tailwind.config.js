/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./App.tsx",
    "./index.tsx"
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

