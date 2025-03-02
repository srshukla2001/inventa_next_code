module.exports = {
  content: [
    './app/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f8f8f8',
          100: '#e8e8e8',
          900: '#0a0a0a',
        },
        secondary: { /* same as primary */ },
        accent: { /* same as primary */ },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui'],
        heading: ['var(--font-montserrat)', 'Inter'],
      },
      animation: {
        // Your custom animations
      },
      keyframes: {
        // Your keyframes
      },
    },
  },
  variants: {
    extend: {
      // Your variants
    },
  },
  plugins: [],
};