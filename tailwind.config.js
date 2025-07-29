module.exports = {
  // Tell Tailwind to scan all of our React source files for class names
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
    "./public/index.html",
  ],
  // Enable dark mode support using a class on the <html> element
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        // Custom colour palette inspired by Superprof
        primary: '#00C1F7',
        accent: '#003049',
        darkBg: '#0f172a',
        darkCard: '#1e293b',
        darkText: '#e2e8f0',
      },
      fontFamily: {
        // Use Montserrat for headings and body text
        sans: ['Montserrat', 'sans-serif'],
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
};