const colors = require('tailwindcss/colors');

module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { ...colors },
      height: {
        inherit: 'inherit',
      },
      width: {
        inherit: 'inherit',
      },
    },
  },
  plugins: [],
};
