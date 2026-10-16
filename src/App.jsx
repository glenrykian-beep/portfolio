import React from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import Services from './components/Services';
import Projects from './components/Projects';
import TechEquipment from './components/TechEquipment';
import Education from './components/Education';
import Contact from './components/Contact';
import Footer from './components/Footer';
import AdminToolbar from './components/AdminToolbar';
import { AdminProvider } from './context/AdminContext';
import { ContentProvider } from './context/ContentContext';
import { useTheme } from './hooks/useTheme';
import { useActiveSection } from './hooks/useActiveSection';

function AppInner() {
  const { theme, toggleTheme } = useTheme();

  const sectionIds = [
    'home',
    'about',
    'services',
    'skills',
    'projects',
    'equipment',
    'education',
    'contact',
  ];

  const activeSection = useActiveSection(sectionIds, 90);

  return (
    <div className="min-h-screen bg-white dark:bg-dark-primary text-gray-900 dark:text-dark-text selection:bg-accent selection:text-white transition-colors duration-200 flex flex-col font-sans">
      {/* Sticky Header / Navbar */}
      <Navbar
        activeSection={activeSection}
        theme={theme}
        toggleTheme={toggleTheme}
      />

      {/* Floating Admin Mode Toolbar when logged in */}
      <AdminToolbar />

      {/* Main Content Sections */}
      <main className="flex-1">
        <Hero />
        <Services />
        <Projects />
        <TechEquipment />
        <Education />
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}

export default function App() {
  return (
    <AdminProvider>
      <ContentProvider>
        <AppInner />
      </ContentProvider>
    </AdminProvider>
  );
}
