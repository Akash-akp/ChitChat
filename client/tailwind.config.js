/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary:'rgb(236,87,43)',
        lightgray: 'rgb(233,233,233)'
      }
    },
  },
  plugins: [],
}