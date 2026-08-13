/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./app/**/*.{js,ts,jsx,tsx,mdx}', './components/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['var(--font-sans)'],
        heading: ['var(--font-heading)', 'var(--font-sans)'],
        mono: ['var(--font-mono)']
      },
      colors: {
        white: 'rgb(var(--color-white) / <alpha-value>)',
        slate: {
          50: 'rgb(var(--color-slate-50) / <alpha-value>)',
          100: 'rgb(var(--color-slate-100) / <alpha-value>)',
          200: 'rgb(var(--color-slate-200) / <alpha-value>)',
          300: 'rgb(var(--color-slate-300) / <alpha-value>)',
          400: 'rgb(var(--color-slate-400) / <alpha-value>)',
          500: 'rgb(var(--color-slate-500) / <alpha-value>)',
          600: 'rgb(var(--color-slate-600) / <alpha-value>)',
          700: 'rgb(var(--color-slate-700) / <alpha-value>)',
          800: 'rgb(var(--color-slate-800) / <alpha-value>)',
          900: 'rgb(var(--color-slate-900) / <alpha-value>)',
          950: 'rgb(var(--color-slate-950) / <alpha-value>)'
        },
        sky: {
          50: 'rgb(var(--color-sky-50) / <alpha-value>)',
          100: 'rgb(var(--color-sky-100) / <alpha-value>)',
          200: 'rgb(var(--color-sky-200) / <alpha-value>)',
          300: 'rgb(var(--color-sky-300) / <alpha-value>)',
          400: 'rgb(var(--color-sky-400) / <alpha-value>)',
          500: 'rgb(var(--color-sky-500) / <alpha-value>)',
          600: 'rgb(var(--color-sky-600) / <alpha-value>)',
          700: 'rgb(var(--color-sky-700) / <alpha-value>)',
          800: 'rgb(var(--color-sky-800) / <alpha-value>)',
          900: 'rgb(var(--color-sky-900) / <alpha-value>)',
          950: 'rgb(var(--color-sky-950) / <alpha-value>)'
        },
        cyan: {
          50: 'rgb(var(--color-cyan-50) / <alpha-value>)',
          100: 'rgb(var(--color-cyan-100) / <alpha-value>)',
          200: 'rgb(var(--color-cyan-200) / <alpha-value>)',
          300: 'rgb(var(--color-cyan-300) / <alpha-value>)',
          400: 'rgb(var(--color-cyan-400) / <alpha-value>)',
          500: 'rgb(var(--color-cyan-500) / <alpha-value>)',
          600: 'rgb(var(--color-cyan-600) / <alpha-value>)',
          700: 'rgb(var(--color-cyan-700) / <alpha-value>)',
          800: 'rgb(var(--color-cyan-800) / <alpha-value>)',
          900: 'rgb(var(--color-cyan-900) / <alpha-value>)',
          950: 'rgb(var(--color-cyan-950) / <alpha-value>)'
        },
        emerald: {
          50: 'rgb(var(--color-emerald-50) / <alpha-value>)',
          100: 'rgb(var(--color-emerald-100) / <alpha-value>)',
          200: 'rgb(var(--color-emerald-200) / <alpha-value>)',
          300: 'rgb(var(--color-emerald-300) / <alpha-value>)',
          400: 'rgb(var(--color-emerald-400) / <alpha-value>)',
          500: 'rgb(var(--color-emerald-500) / <alpha-value>)',
          600: 'rgb(var(--color-emerald-600) / <alpha-value>)',
          700: 'rgb(var(--color-emerald-700) / <alpha-value>)',
          800: 'rgb(var(--color-emerald-800) / <alpha-value>)',
          900: 'rgb(var(--color-emerald-900) / <alpha-value>)',
          950: 'rgb(var(--color-emerald-950) / <alpha-value>)'
        },
        rose: {
          50: 'rgb(var(--color-rose-50) / <alpha-value>)',
          100: 'rgb(var(--color-rose-100) / <alpha-value>)',
          200: 'rgb(var(--color-rose-200) / <alpha-value>)',
          300: 'rgb(var(--color-rose-300) / <alpha-value>)',
          400: 'rgb(var(--color-rose-400) / <alpha-value>)',
          500: 'rgb(var(--color-rose-500) / <alpha-value>)',
          600: 'rgb(var(--color-rose-600) / <alpha-value>)',
          700: 'rgb(var(--color-rose-700) / <alpha-value>)',
          800: 'rgb(var(--color-rose-800) / <alpha-value>)',
          900: 'rgb(var(--color-rose-900) / <alpha-value>)',
          950: 'rgb(var(--color-rose-950) / <alpha-value>)'
        },
        amber: {
          50: 'rgb(var(--color-amber-50) / <alpha-value>)',
          100: 'rgb(var(--color-amber-100) / <alpha-value>)',
          200: 'rgb(var(--color-amber-200) / <alpha-value>)',
          300: 'rgb(var(--color-amber-300) / <alpha-value>)',
          400: 'rgb(var(--color-amber-400) / <alpha-value>)',
          500: 'rgb(var(--color-amber-500) / <alpha-value>)',
          600: 'rgb(var(--color-amber-600) / <alpha-value>)',
          700: 'rgb(var(--color-amber-700) / <alpha-value>)',
          800: 'rgb(var(--color-amber-800) / <alpha-value>)',
          900: 'rgb(var(--color-amber-900) / <alpha-value>)',
          950: 'rgb(var(--color-amber-950) / <alpha-value>)'
        },
        violet: {
          50: 'rgb(var(--color-violet-50) / <alpha-value>)',
          100: 'rgb(var(--color-violet-100) / <alpha-value>)',
          200: 'rgb(var(--color-violet-200) / <alpha-value>)',
          300: 'rgb(var(--color-violet-300) / <alpha-value>)',
          400: 'rgb(var(--color-violet-400) / <alpha-value>)',
          500: 'rgb(var(--color-violet-500) / <alpha-value>)',
          600: 'rgb(var(--color-violet-600) / <alpha-value>)',
          700: 'rgb(var(--color-violet-700) / <alpha-value>)',
          800: 'rgb(var(--color-violet-800) / <alpha-value>)',
          900: 'rgb(var(--color-violet-900) / <alpha-value>)',
          950: 'rgb(var(--color-violet-950) / <alpha-value>)'
        },
        sentinel: {
          50: '#f3f8ff',
          100: '#dfeeff',
          200: 'rgb(var(--color-sentinel-200) / <alpha-value>)',
          300: 'rgb(var(--color-sentinel-300) / <alpha-value>)',
          400: '#4d97ff',
          500: '#1e6fff',
          600: '#1459d9',
          700: '#1548a8',
          800: '#183e86',
          900: '#1b345e'
        }
      },
      boxShadow: {
        glow: '0 20px 80px rgba(56, 189, 248, 0.18)',
        panel: '0 25px 80px rgba(15, 23, 42, 0.24)'
      },
      backgroundImage: {
        'hero-grid': 'radial-gradient(circle at top left, rgba(56, 189, 248, 0.14), transparent 28%), radial-gradient(circle at bottom right, rgba(56, 189, 248, 0.12), transparent 24%)'
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' }
        },
        glow: {
          '0%, 100%': { opacity: '0.6' },
          '50%': { opacity: '1' }
        }
      },
      animation: {
        float: 'float 9s ease-in-out infinite',
        glow: 'glow 3.6s ease-in-out infinite'
      }
    }
  },
  plugins: []
};
