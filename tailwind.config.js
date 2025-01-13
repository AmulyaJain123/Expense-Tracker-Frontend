/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      screens: {
        lap: '1250px',
        tab: '800px',
        smTab: '650px',
        mob: '500px'
      }
    },
  },
  plugins: [],
}

