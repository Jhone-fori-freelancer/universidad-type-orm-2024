/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/*.{pug,html}', // Para archivos Pug
    './src/*.js', // Para archivos JavaScript
],
  theme: {
    extend: {},
  },
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ],
}

