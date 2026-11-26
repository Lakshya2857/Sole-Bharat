/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        parchment: '#faf8f5',
        ecru: '#f5f0e8',
        bone: '#faf8f5',
        stoneWarm: '#f4f0eb',
        amberGum: '#c8863a',
        heritageMaroon: '#5b1b29',
        retroAzure: '#3b7b9e',
        vintageOlive: '#435e49',
        mochaGum: '#4a3326',
      },
      fontFamily: {
        sole: ['"Plus Jakarta Sans"', 'sans-serif'],
        display: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        serif: ['"Playfair Display"', '"Cormorant Garamond"', 'Georgia', 'serif'],
        editorial: ['"Cormorant Garamond"', '"Playfair Display"', 'Georgia', 'serif'],
        sans: ['"Plus Jakarta Sans"', '-apple-system', 'sans-serif'],
        syne: ['"Syne"', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
