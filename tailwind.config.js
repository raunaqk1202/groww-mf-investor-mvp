/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        groww: {
          primary: '#00D09C',      // Signature Groww Emerald Green
          primaryDark: '#00B386',
          primaryLight: '#E6FAF5',
          dark: '#121212',
          cardDark: '#1E222B',
          bgDark: '#0F1318',
          borderDark: '#2D333F',
          textDark: '#E0E6ED',
          mutedDark: '#8F9CAE',
          red: '#EB5757',
          redLight: '#FDECEC',
          blue: '#5367FF',
          blueLight: '#EEF0FF',
          yellow: '#FFB800',
          yellowLight: '#FFF8E6',
        }
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      boxShadow: {
        'groww': '0 2px 10px rgba(0, 0, 0, 0.06)',
        'groww-hover': '0 8px 24px rgba(0, 0, 0, 0.1)',
        'groww-glow': '0 0 20px rgba(0, 208, 156, 0.25)',
      }
    },
  },
  plugins: [],
}

