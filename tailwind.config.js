module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans:['Open Sans', 'sans-serif']
      },
      gridTemplateColumns: {
        "1/5":"1fr 5fr"
      }
    },
  },
  plugins: [require('@tailwindcss/forms')],
}
