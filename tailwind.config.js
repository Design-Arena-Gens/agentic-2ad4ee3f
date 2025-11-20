/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        ink: '#0f172a',
        paper: '#0b1220',
        accent: '#8b5cf6',
      },
      boxShadow: {
        soft: '0 8px 20px rgba(0,0,0,0.15)'
      }
    },
  },
  plugins: [],
};
