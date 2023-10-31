/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
    colors: {
      transparent: 'transparent',
      current: 'currentColor',
      'white': '#ffffff',
      'tahiti': {
        100: '#e49f9b',
        200: '#e38984',
        300: '#e37872',
        400: '#e36861',
        500: '#e2544b',
        600: '#d44137',
        700: '#cb3127',
        800: '#b51d13',
        900: '#ac1108',
      },
    },
    },
  },
  plugins: [],
}

