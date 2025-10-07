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
      keyframes: {
        'pulse-slow': {
          '0%, 100%': { opacity: 0.3 },
          '50%': { opacity: 1 },
        },
        'gradient-move': {
          '0%, 100%': { backgroundPosition: '0% 0%' },
          '50%': { backgroundPosition: '100% 100%' },
        },
      },
      animation: {
        'pulse-slow': 'pulse-slow 3s ease-in-out infinite',
        'gradient-move': 'gradient-move 8s ease-in-out infinite',
      },
    },
  },
  plugins: [],
}
