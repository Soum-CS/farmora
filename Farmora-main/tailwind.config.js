/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        moss:"#3A5A40",
        charcoal:"#344E41",
        teal:"#1B4332",
        accent:"#DAD7CD",
        background:"#F2F4F3"
      },
      fontFamily:{
        sans:["Montserrat","sans-serif"]
      }
    },
  },
  plugins: [],
}