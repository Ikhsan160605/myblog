/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}"],
  theme: {
    extend: {
      fontFamily: {
        'system' : ['Rubik Scribble', 'system-ui'],
        'serif': ['Georgia', 'serif'],
        'mono': ['Menlo', 'monospace']
      }
    },
  },
  plugins: [],
}