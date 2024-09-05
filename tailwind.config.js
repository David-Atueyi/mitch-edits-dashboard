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
      keyframes: {
        'modal-overlay': {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        'modal-content': {
          '0%': { opacity: '0', transform: 'scale(0.9) translateY(20px)' },
          '100%': { opacity: '1', transform: 'scale(1) translateY(0)' },
        },
      },
      animation: {
        'modal-overlay': 'modal-overlay 0.3s ease-out',
        'modal-content': 'modal-content 0.3s ease-out',
      },
    },
  },
  plugins: [],
}