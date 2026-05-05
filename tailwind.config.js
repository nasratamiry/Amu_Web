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
        brand: '#1A3C2A',
        'brand-dark': '#122a1d',
        'brand-light': '#27553b',
        'brand-soft': '#d4f0df',
        secondary: '#E8620A',
        primary: {
          50: '#edf7f1',
          100: '#d4ecde',
          200: '#abd8be',
          300: '#82c39f',
          400: '#5aaf7f',
          500: '#1A3C2A',
          600: '#173624',
          700: '#14301f',
          800: '#11291a',
          900: '#0e2316',
        },
        accent: {
          500: '#D4F0DF',
          600: '#BCE4CE',
        },
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        display: ['Plus Jakarta Sans', 'Inter', 'system-ui', 'sans-serif'],
        fa: ['Vazirmatn', 'Tahoma', 'sans-serif'],
      },
      boxShadow: {
        'soft': '0 10px 28px -16px rgba(26, 60, 42, 0.25), 0 8px 20px -18px rgba(0, 0, 0, 0.35)',
        'brand': '0 14px 38px -14px rgba(26, 60, 42, 0.45)',
        'brand-lg': '0 24px 52px -18px rgba(26, 60, 42, 0.5)',
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
        'hero-pattern': 'linear-gradient(135deg, rgba(26, 60, 42, 0.08) 0%, rgba(212, 240, 223, 0.34) 100%)',
        'hero-brand': 'linear-gradient(to bottom, #ffffff 0%, rgba(212, 240, 223, 0.72) 52%, #d4f0df 100%)',
      },
    },
  },
  plugins: [],
}
