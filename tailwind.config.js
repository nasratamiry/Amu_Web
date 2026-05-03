/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        milky: '#f5f2eb',
        readable: 'rgba(15, 23, 42, 0.1)',
        'readable-strong': 'rgba(15, 23, 42, 0.16)',
        brand: '#0f5aa0',
        'brand-dark': '#0c4d8a',
        'brand-light': '#3d7eb8',
        'brand-soft': '#e8f1fa',
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
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        fa: ['Vazirmatn', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 4px 6px -1px rgba(15, 90, 160, 0.08), 0 2px 4px -2px rgba(15, 90, 160, 0.06)',
        'brand': '0 10px 40px -10px rgba(15, 90, 160, 0.28)',
        'brand-lg': '0 25px 50px -12px rgba(15, 90, 160, 0.22)',
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
        'hero-pattern': 'linear-gradient(135deg, rgba(15, 90, 160, 0.06) 0%, rgba(61, 126, 184, 0.1) 100%)',
        'hero-brand': 'linear-gradient(to bottom, #ffffff 0%, rgba(232, 241, 250, 0.55) 50%, #e8f1fa 100%)',
      },
    },
  },
  plugins: [],
}
