/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    screens: {
      'h-min-80': { min: '80vh' },
      'h-max-full': { max: '100vh' },
    },
    extend: {},
  },
  plugins: [],
};
