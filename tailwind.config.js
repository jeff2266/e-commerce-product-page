/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}/"],
  theme: {
    extend: {},
    colors: {
      'orange': 'hsl(26deg 100% 55% / <alpha-value>)',
      'paleorange': 'hsl(25deg 100% 94% / <alpha-value>)',
      'verydarkblue': 'hsl(220deg 13% 13% / <alpha-value>)',
      'darkgrayishblue': 'hsl(219deg 9% 45% / <alpha-value>)',
      'grayishblue': 'hsl(220deg 14% 75% / <alpha-value>)',
      'lightgrayishblue': 'hsl(223deg 64% 98% / <alpha-value>)',
      'white': 'hsl(0deg 0% 100% / <alpha-value>)',
      'black': 'hsl(0deg 0% 0% / <alpha-value>)'
    }
  },
  plugins: [],
}

