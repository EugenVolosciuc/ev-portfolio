const defaultTheme = require("tailwindcss/defaultTheme");

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/constants/classnames.ts",
    "./src/content/**/*.md",
    "./src/content/*.md",
  ],
  theme: {
    extend: {
      colors: {
        accent: "#EEB868",
      },
      fontFamily: {
        RobotoMono: ["RobotoMono", ...defaultTheme.fontFamily.mono],
        serif: ["Lora", ...defaultTheme.fontFamily.serif],
      },
    },
  },
  plugins: [require("@tailwindcss/typography")],
};
