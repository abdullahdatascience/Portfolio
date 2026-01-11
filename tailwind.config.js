/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{ts,tsx,js,jsx}", // make sure it includes all your components
  ],
  theme: {
    extend: {
      colors: {
        primary: "#14b8a6",   // Teal
        secondary: "#3b82f6", // Blue
        accent1: "#8b5cf6",   // Violet
        accent2: "#f43f5e",   // Rose
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(to right, #80808012 1px, transparent 1px), linear-gradient(to bottom, #80808012 1px, transparent 1px)"
      },
      animation: {
        'gradient-x': 'gradient-x 15s ease infinite',
      },
      keyframes: {
        'gradient-x': {
          '0%, 100%': { 'background-position': '0% 50%' },
          '50%': { 'background-position': '100% 50%' },
        },
      },
    },
  },
  plugins: [],
}
