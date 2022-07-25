/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/constants/classnames.ts",
    "./src/content/**/*.md",
    "./src/content/*.md"
  ],
  theme: {
    extend: {
      colors: {
        accent: '#EEB868'
      }
    },
  },
  plugins: [require('@tailwindcss/typography')],
}
