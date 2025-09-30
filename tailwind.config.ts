/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['"FC Vision Compressed"', 'Arial', 'Helvetica', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
 