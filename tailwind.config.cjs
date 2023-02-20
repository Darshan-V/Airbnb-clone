/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},
    screens: {
      sm: "500px",

      md: "850px",

      lg: "1600px"
    }
  },
  plugins: []
}
