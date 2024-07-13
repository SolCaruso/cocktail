/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./*.{html,js}"],
  theme: {
    extend: {
      fontSize: {
        "2.5": "2.5rem",
        "3": "3rem",
        "4": "4rem",
        "5.5": "5.5rem",
        "2xs": ".65rem",
        "3xs": ".55rem",
        "4xs": ".45rem",
        "5xs": ".35rem",
        "6xs": ".25rem",
      },
      fontFamily: {
        sans: [
          "-apple-system",
          "system-ui",
          "BlinkMacSystemFont",
          "San Francisco",
          "Segoe UI",
          "Roboto",
          "Helvetica Neue",
          "sans-serif",
        ],
      },
      screens: {
        "xs": "440px",
        "2xs": "340px",
        "nav": "850px",
        "wild": "1540px",
        "3xl": "2000px",
      },
      borderRadius: {
        "xl": "1rem",
        "2xl": "1.5rem",
      },
      padding: {
        '30': '7.5rem',
        '1.2': '0.3125rem',
      },
      width: {
        '22': '5.5rem',
        '5.5': '1.375rem',
      },
      height: {
        '22': '5.5rem',
        '33': '2.0625rem',
      },
      scale: {
        '101': '1.01',
      },
    },
  },
  plugins: [],
}