/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: 'rgb(0, 140, 255)',
        'brand-dark': 'rgb(0, 110, 220)',
        'brand-light': 'rgb(79, 179, 255)',
        'brand-soft': 'rgb(230, 244, 255)',
        primary: {
          50: '#f0f9ff',
          100: '#e0f2fe',
          200: '#bae6fd',
          300: '#7dd3fc',
          400: '#38bdf8',
          500: '#0ea5e9',
          600: '#0284c7',
          700: '#0369a1',
          800: '#075985',
          900: '#0c4a6e',
        },
        accent: {
          500: '#8b5cf6',
          600: '#7c3aed',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Inter', 'system-ui', 'sans-serif'],
        fa: ['Vazirmatn', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(0, 140, 255, 0.08), 0 2px 4px -2px rgba(0, 140, 255, 0.06)',
        'brand': '0 10px 40px -10px rgba(0, 140, 255, 0.25)',
        'brand-lg': '0 25px 50px -12px rgba(0, 140, 255, 0.2)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'gradient': 'gradient 3s ease infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        gradient: {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'hero-pattern': 'linear-gradient(135deg, rgba(0, 140, 255, 0.05) 0%, rgba(79, 179, 255, 0.08) 100%)',
        'hero-brand': 'linear-gradient(to bottom, #ffffff 0%, rgba(230, 244, 255, 0.5) 50%, rgb(230, 244, 255) 100%)',
      },
    },
  },
  plugins: [],
}
