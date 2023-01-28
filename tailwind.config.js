/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
    './hooks/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        'active-text': '#359381'
      }
    },
    fontFamily: {
      poppins: ["Poppins"]
    }
  },
  plugins: [
    require('@tailwindcss/line-clamp'),
  ],
}
