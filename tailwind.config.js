module.exports = {
  purge: ['./src/**/*.{js,jsx,ts,tsx}', './public/index.html'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        'teal': {
          500: '#14B8A6',
          600: '#0D9488'
        }
      },
      fontSize: {
        'nav': ['1.1rem', {
          letterSpacing: '-1px'
        }]
      },
      height: {
        '80screen': '80vh'
      }
    },
  },
  variants: {
    extend: {
      cursor: ['disabled'],
      pointerEvents: ['disabled'],
      opacity: ['disabled'],
    },
  },
  plugins: [],
}
