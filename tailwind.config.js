module.exports = {
  content: [
    './src/**/*.{html,js}'
  ],
  theme: {
    extend: {
      boxShadow: {
        'xs': '0 .125rem .25rem rgba(0,0,0,.075)',
        'sm': '0px 2px 8px 0px rgba(99, 99, 99, 0.1)',
      }
    },
    fontFamily: {
      sans: ['IRANSans', 'sans-serif'],
    }
  },
  plugins: [],
}
