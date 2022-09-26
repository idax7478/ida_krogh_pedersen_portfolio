/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,vue,js,ts,jsx,tsx}"],
  theme: {
    extend: {
      color: {
        mustard: "#B1803E",
        sunset: "#CFA78D",
        terracotta: "#C68462",
        rust: "#7F4C31",
        cage: "#9C9A81",
      },
    },
  },
  plugins: [require("@tailwindcss/typography"), require("@tailwindcss/forms")],
};
