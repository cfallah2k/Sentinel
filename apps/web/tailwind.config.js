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
        sentinel: {
          50: '#f3f8ff',
          100: '#dfeeff',
          200: '#bddcff',
          300: '#8ac1ff',
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
