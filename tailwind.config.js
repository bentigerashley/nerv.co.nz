const { fontFamily } = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        "dark-blue": "#080A0A",
        purple: "#E23B2E",
        "light-clay": "#F3E7C3",
        "dark-clay": "#1A1010",
        signal: "#F2552C",
        amber: "#F6B13D",
        terminal: "#62D86B",
      },
      fontFamily: {
        mono: ["Cascadia Mono", "Segoe UI Mono", ...fontFamily.mono],
        sans: ["Segoe UI", "Arial", ...fontFamily.sans],
      },
    },
  },
  plugins: [],
};
