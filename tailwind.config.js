/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        'ds-dark': '#1a0a0a',
        'ds-burgundy': '#6b0f1a',
        'ds-gold': '#c9a84c',
        'ds-gold-light': '#e8c97a',
        'ds-cream': '#f7f3ee',
        'ds-warm': '#f0e8d8',
      },
      fontFamily: {
        'cormorant': ['Cormorant Garamond', 'serif'],
        'montserrat': ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [],
};
