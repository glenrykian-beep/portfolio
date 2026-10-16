import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import ThemeToggle from './ThemeToggle';
import AdminLoginModal from './AdminLoginModal';
import { smoothScroll } from '../utils/smoothScroll';
import { useAdmin } from '../context/AdminContext';

export default function Navbar({ activeSection, theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const { handleLogoClick, showLoginModal, setShowLoginModal, isAdmin } = useAdmin();

  const navLinks = [
    { name: 'Home', href: 'home' },
    { name: 'About', href: 'about' },
    { name: 'Services', href: 'services' },
    { name: 'Skills', href: 'skills' },
    { name: 'Projects', href: 'projects' },
    { name: 'Equipment', href: 'equipment' },
    { name: 'Education', href: 'education' },
    { name: 'Contact', href: 'contact' },
  ];

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 20) {
        setIsScrolled(true);
      } else {
        setIsScrolled(false);
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const handleNavClick = (e, href) => {
    e.preventDefault();
    setMobileMenuOpen(false);
    smoothScroll(href);
  };

  const onLogoClick = (e) => {
    e.preventDefault();
    handleLogoClick();
    smoothScroll('home');
  };

  return (
    <>
      <header
        className={`sticky top-0 z-50 transition-all duration-300 ${
          isScrolled
            ? 'bg-white/85 dark:bg-dark-primary/85 backdrop-blur-md shadow-sm dark:shadow-none border-b border-gray-200/80 dark:border-dark-border'
            : 'bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex items-center justify-between h-16">
            {/* Logo / Monogram with 5-click secret admin trigger */}
            <a
              href="#home"
              onClick={onLogoClick}
              title={isAdmin ? 'Admin Mode Active (click 5 times to log out)' : 'GIG Portfolio (Admin: click logo 5 times)'}
              className="flex items-center gap-2 group focus:outline-none focus:ring-2 focus:ring-accent rounded-lg p-1 relative cursor-pointer select-none"
            >
              <div className="relative">
                <div
                  className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-sm tracking-wider shadow-md transition-all group-hover:scale-105 ${
                    isAdmin
                      ? 'bg-amber-500 text-amber-950 shadow-amber-500/30 ring-2 ring-amber-400'
                      : 'bg-accent text-white shadow-accent/20'
                  }`}
                >
                  GIG
                </div>
              </div>

              <div className="hidden sm:flex flex-col">
                <span className="font-semibold text-gray-900 dark:text-dark-text leading-tight group-hover:text-accent transition-colors flex items-center gap-1.5">
                  <span>GIG</span>
                  {isAdmin && (
                    <span className="text-[10px] uppercase font-bold tracking-wider px-1.5 py-0.2 bg-amber-500/20 text-amber-600 dark:text-amber-400 rounded">
                      Admin
                    </span>
                  )}
                </span>
                <span className="text-xs text-gray-500 dark:text-dark-muted leading-none">
                  Portfolio
                </span>
              </div>
            </a>

            {/* Desktop Navigation */}
            <nav className="hidden md:flex items-center space-x-1 lg:space-x-2">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={`#${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-3 py-1.5 rounded-lg text-sm font-medium transition-colors ${
                      isActive
                        ? 'text-accent dark:text-accent font-semibold bg-accent/10 dark:bg-accent/15'
                        : 'text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-card'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </nav>

            {/* Right Action (Theme Toggle + Mobile Menu Button) */}
            <div className="flex items-center gap-2">
              <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

              {/* Mobile Menu Trigger */}
              <button
                type="button"
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="md:hidden p-2 rounded-lg text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-card border border-transparent dark:border-dark-border focus:outline-none focus:ring-2 focus:ring-accent transition-colors"
                aria-expanded={mobileMenuOpen}
                aria-label="Toggle navigation menu"
              >
                {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Menu Slide-down Panel */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b border-gray-200 dark:border-dark-border bg-white dark:bg-dark-secondary px-4 pt-2 pb-6 shadow-xl animate-in slide-in-from-top-2 duration-200">
            <div className="flex flex-col space-y-1">
              {navLinks.map((link) => {
                const isActive = activeSection === link.href;
                return (
                  <a
                    key={link.name}
                    href={`#${link.href}`}
                    onClick={(e) => handleNavClick(e, link.href)}
                    className={`px-4 py-2.5 rounded-lg text-base font-medium transition-colors ${
                      isActive
                        ? 'text-accent dark:text-accent font-semibold bg-accent/10 dark:bg-accent/15'
                        : 'text-gray-700 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-card'
                    }`}
                  >
                    {link.name}
                  </a>
                );
              })}
            </div>
          </div>
        )}
      </header>

      {/* Secret Admin Login Modal */}
      <AdminLoginModal
        isOpen={showLoginModal}
        onClose={() => setShowLoginModal(false)}
      />
    </>
  );
}
