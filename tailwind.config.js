/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{js,jsx}'],
  theme: {
    extend: {
      colors: {
        'dark-primary': '#0A0A0A',
        'dark-secondary': '#111111',
        'dark-card': '#161616',
        'dark-border': '#27272A',
        'dark-text': '#F5F5F5',
        'dark-muted': '#A1A1AA',
        'light-bg': '#FFFFFF',
        'light-surface': '#F8FAFC',
        'light-text': '#111827',
        'light-border': '#E5E7EB',
        'accent': '#3B82F6',
        'accent-hover': '#60A5FA',
      },
    },
  },
  plugins: [],
};
