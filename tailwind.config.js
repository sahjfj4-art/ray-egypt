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
        },
        // Enhanced dark mode colors
        gray: {
          50: '#f9fafb',
          100: '#f3f4f6',
          200: '#e5e7eb',
          300: '#d1d5db',
          400: '#9ca3af',
          500: '#6b7280',
          600: '#4b5563',
          700: '#374151',
          800: '#1f2937',
          850: '#1a202c',
          900: '#111827',
          950: '#030712'
        }
      },
      // Better transitions for theme switching
      transitionProperty: {
        'colors': 'color, background-color, border-color, text-decoration-color, fill, stroke',
        'theme': 'color, background-color, border-color, text-decoration-color, fill, stroke, opacity, box-shadow, transform'
      }
    },
  },
  plugins: [],
}

