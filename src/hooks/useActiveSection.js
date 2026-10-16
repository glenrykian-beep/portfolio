import { useState, useEffect } from 'react';

export function useActiveSection(sectionIds, offset = 100) {
  const [activeSection, setActiveSection] = useState(sectionIds[0] || 'home');

  useEffect(() => {
    if (!sectionIds || sectionIds.length === 0) return;

    const observers = [];

    // Use IntersectionObserver with rootMargin tuned for sticky navbar
    const handleIntersect = (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersect, {
      root: null,
      rootMargin: `-${offset}px 0px -40% 0px`,
      threshold: [0, 0.25, 0.5],
    });

    sectionIds.forEach((id) => {
      const el = document.getElementById(id);
      if (el) {
        observer.observe(el);
      }
    });

    // Also support scroll listener as a failsafe when reaching bottom of page (e.g. contact)
    const handleScroll = () => {
      if (window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 50) {
        const lastSection = sectionIds[sectionIds.length - 1];
        if (lastSection) {
          setActiveSection(lastSection);
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });

    return () => {
      observer.disconnect();
      window.removeEventListener('scroll', handleScroll);
    };
  }, [sectionIds, offset]);

  return activeSection;
}
