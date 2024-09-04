/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        montserratFont: ["Montserrat"],
      },
      screens: {
        mobile: "320px",

        tablet: "500px",

        pc: "765px",

        mediumPc: "860px",

        biggerPc: "1000px",
      },
    },
  },
  plugins: [],
}