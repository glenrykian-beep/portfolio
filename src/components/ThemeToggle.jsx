import React from 'react';
import { Sun, Moon } from 'lucide-react';

export default function ThemeToggle({ theme, toggleTheme }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      title={isDark ? 'Switch to light mode' : 'Switch to dark mode'}
      className="relative p-2 rounded-lg text-gray-600 hover:text-gray-900 hover:bg-gray-100 dark:text-dark-muted dark:hover:text-dark-text dark:hover:bg-dark-card border border-transparent dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-accent transition-all duration-200"
    >
      <div className="relative w-5 h-5 flex items-center justify-center">
        {isDark ? (
          <Sun className="w-5 h-5 text-amber-400 transform transition-transform duration-300 rotate-0 scale-100" />
        ) : (
          <Moon className="w-5 h-5 text-slate-700 transform transition-transform duration-300 rotate-0 scale-100" />
        )}
      </div>
    </button>
  );
}
