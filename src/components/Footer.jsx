import React from 'react';
import { Github, Linkedin, Mail, ArrowUp } from 'lucide-react';
import { smoothScroll } from '../utils/smoothScroll';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  const links = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Services', href: 'services' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Equipment', href: 'equipment' },
    { name: 'Education', href: 'education' },
    { name: 'Contact', href: 'contact' },
  ];

  return (
    <footer className="bg-white dark:bg-dark-secondary border-t border-gray-200 dark:border-dark-border py-12">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col md:flex-row items-center justify-between gap-6 pb-8 border-b border-gray-200/80 dark:border-dark-border">
          {/* Brand Info */}
          <div>
            <span className="font-bold text-lg text-gray-900 dark:text-dark-text block">
              GIG
            </span>
          </div>

          {/* Quick Links Row */}
          <nav className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2">
            {links.map((link) => (
              <button
                key={link.name}
                type="button"
                onClick={() => smoothScroll(link.href)}
                className="text-sm text-gray-600 dark:text-dark-muted hover:text-accent dark:hover:text-accent transition-colors cursor-pointer"
              >
                {link.name}
              </button>
            ))}
          </nav>

          {/* Social Icons & Back to top */}
          <div className="flex items-center gap-3">
            <a
              href="https://github.com/glenrykian-beep"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="GitHub Profile"
              className="p-2 rounded-xl text-gray-600 dark:text-dark-muted hover:text-accent hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
            >
              <Github className="w-5 h-5" />
            </a>
            <a
              href="https://linkedin.com/in/yourusername"
              target="_blank"
              rel="noopener noreferrer"
              aria-label="LinkedIn Profile"
              className="p-2 rounded-xl text-gray-600 dark:text-dark-muted hover:text-accent hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
            >
              <Linkedin className="w-5 h-5" />
            </a>
            <a
              href="mailto:glenrykian@gmail.com"
              aria-label="Send Email"
              className="p-2 rounded-xl text-gray-600 dark:text-dark-muted hover:text-accent hover:bg-gray-100 dark:hover:bg-dark-card transition-colors"
            >
              <Mail className="w-5 h-5" />
            </a>
            <button
              type="button"
              onClick={() => smoothScroll('home')}
              aria-label="Scroll back to top"
              className="p-2 rounded-xl bg-gray-100 dark:bg-dark-card text-gray-600 dark:text-dark-muted hover:text-accent hover:bg-gray-200 dark:hover:bg-dark-border transition-colors cursor-pointer ml-2"
            >
              <ArrowUp className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* Copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-center text-xs text-gray-500 dark:text-dark-muted">
          <p>&copy; {currentYear} GIG. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
}
