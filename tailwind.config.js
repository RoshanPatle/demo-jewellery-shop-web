/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        ivory: '#FFFCF7',
        cream: '#F8F1E7',
        line: '#E9DFD1',
        ink: '#514034',
        // Brand secondary text is #817468; this slightly deeper tone keeps small text above WCAG AA contrast.
        muted: '#766A5E',
        gold: {
          DEFAULT: '#B99A5B',
          soft: '#E9D9B5',
          deep: '#876B31', // gold for text/buttons: passes AA with white / ivory
        },
      },
      fontFamily: {
        serif: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['Inter', 'system-ui', '-apple-system', 'Segoe UI', 'Roboto', 'sans-serif'],
      },
      screens: {
        xs: '375px',
        '3xl': '1536px',
      },
      boxShadow: {
        soft: '0 1px 2px rgba(81,64,52,.04), 0 8px 24px -12px rgba(81,64,52,.14)',
        lift: '0 2px 4px rgba(81,64,52,.05), 0 18px 40px -16px rgba(81,64,52,.22)',
      },
      maxWidth: {
        page: '1440px',
      },
    },
  },
  plugins: [],
}
