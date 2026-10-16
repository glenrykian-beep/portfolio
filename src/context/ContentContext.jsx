import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { fetchCloudPortfolio, triggerCloudSync } from '../utils/cloudStorage';

const ContentContext = createContext(null);

export const defaultContent = {
  hero: {
    name: 'Glenryk Ian Gregorio',
    role: 'Civil Engineer & AI Automation Developer',
    bio: 'Undergraduate BS Civil Engineering graduate combining analytical thinking, programming, and automation to develop practical solutions for businesses.',
    highlights: [
      {
        title: 'AI Engineering & Automation',
        description: 'Building intelligent workflow systems, autonomous agents, and AI-powered tools.',
      },
      {
        title: 'Web Development',
        description: 'Creating responsive, modern full-stack business websites and administrative portals.',
      },
      {
        title: 'Data Analytics & Visualization',
        description: 'Transforming raw operational data into actionable business intelligence and dashboards.',
      },
    ],
  },
  contact: {
    email: 'glenrykian@gmail.com',
    github: 'https://github.com/glenrykian-beep',
    linkedin: 'https://linkedin.com/in/yourusername',
  },
  services: [
    {
      id: 'ai-automation',
      title: 'AI Automation',
      badge: 'High Impact',
      description: 'Streamlining business operations with intelligent automation, autonomous agents, and AI-powered tools.',
      features: [
        'Business workflow automation',
        'AI-powered assistants and chatbots',
        'Automated booking and notification systems',
        'API integrations and process optimization',
      ],
    },
    {
      id: 'web-development',
      title: 'Web Development',
      badge: 'Full Stack',
      description: 'Building responsive, professional business websites and performant web applications.',
      features: [
        'Responsive business websites',
        'Online ordering systems',
        'Booking and appointment platforms',
        'Administrative dashboards',
      ],
    },
    {
      id: 'data-analytics',
      title: 'Data Analytics',
      badge: 'Actionable Insights',
      description: 'Turning raw business data into clear, actionable insights, reporting pipelines, and interactive dashboards.',
      features: [
        'Data cleaning and transformation',
        'SQL queries and reporting',
        'Power BI dashboards',
        'Business performance analysis',
      ],
    },
  ],
  equipment: [],
};

export function ContentProvider({ children }) {
  const [content, setContent] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolio_content');
      if (stored) {
        const parsed = JSON.parse(stored);
        return {
          ...defaultContent,
          ...parsed,
          hero: {
            ...defaultContent.hero,
            ...(parsed.hero || {}),
          },
          contact: {
            ...defaultContent.contact,
            ...(parsed.contact || {}),
          },
          services: Array.isArray(parsed.services) && parsed.services.length > 0
            ? parsed.services
            : defaultContent.services,
          equipment: Array.isArray(parsed.equipment)
            ? parsed.equipment
            : defaultContent.equipment,
        };
      }
    } catch (e) {
      console.error('Error loading portfolio content from localStorage:', e);
    }
    return defaultContent;
  });

  // Fetch from cloud on mount to sync customer view with admin changes
  useEffect(() => {
    fetchCloudPortfolio().then((cloudData) => {
      if (cloudData) {
        if (cloudData.content) {
          try {
            localStorage.setItem('portfolio_content', JSON.stringify(cloudData.content));
            setContent((prev) => ({
              ...defaultContent,
              ...cloudData.content,
              hero: { ...defaultContent.hero, ...(cloudData.content.hero || {}) },
              contact: { ...defaultContent.contact, ...(cloudData.content.contact || {}) },
              services: Array.isArray(cloudData.content.services) && cloudData.content.services.length > 0
                ? cloudData.content.services
                : defaultContent.services,
              equipment: Array.isArray(cloudData.content.equipment)
                ? cloudData.content.equipment
                : defaultContent.equipment,
            }));
          } catch (e) {}
        }
        if (cloudData.projects) {
          try {
            localStorage.setItem('portfolio_projects', JSON.stringify(cloudData.projects));
            window.dispatchEvent(new Event('portfolio_projects_updated'));
          } catch (e) {}
        }
        if (cloudData.certifications) {
          try {
            localStorage.setItem('portfolio_certifications', JSON.stringify(cloudData.certifications));
            window.dispatchEvent(new Event('portfolio_certifications_updated'));
          } catch (e) {}
        }
      }
    });
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_content', JSON.stringify(content));
      // Trigger auto cloud sync on change (debounced)
      const timer = setTimeout(() => {
        triggerCloudSync();
      }, 1000);
      return () => clearTimeout(timer);
    } catch (e) {
      console.error('Error saving portfolio content to localStorage:', e);
    }
  }, [content]);

  const publishChanges = useCallback(async () => {
    const success = await triggerCloudSync();
    return success;
  }, []);

  const updateHero = useCallback((field, value) => {
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        [field]: value,
      },
    }));
  }, []);

  const updateHeroBatch = useCallback((updates) => {
    setContent((prev) => ({
      ...prev,
      hero: {
        ...prev.hero,
        ...updates,
      },
    }));
  }, []);

  const updateContact = useCallback((field, value) => {
    setContent((prev) => ({
      ...prev,
      contact: {
        ...prev.contact,
        [field]: value,
      },
    }));
  }, []);

  const updateContent = useCallback((path, value) => {
    setContent((prev) => {
      const segments = path.split('.');
      if (segments.length === 1) {
        return { ...prev, [segments[0]]: value };
      }
      if (segments.length === 2) {
        return {
          ...prev,
          [segments[0]]: {
            ...prev[segments[0]],
            [segments[1]]: value,
          },
        };
      }
      return prev;
    });
  }, []);

  // Equipment CRUD
  const addEquipment = useCallback((item) => {
    setContent((prev) => ({
      ...prev,
      equipment: [
        ...prev.equipment,
        {
          id: Date.now().toString(),
          name: item.name || '',
          category: item.category || 'General',
          description: item.description || '',
          image: item.image || '',
        },
      ],
    }));
  }, []);

  const updateEquipment = useCallback((id, updates) => {
    setContent((prev) => ({
      ...prev,
      equipment: prev.equipment.map((e) => (e.id === id ? { ...e, ...updates } : e)),
    }));
  }, []);

  const removeEquipment = useCallback((id) => {
    setContent((prev) => ({
      ...prev,
      equipment: prev.equipment.filter((e) => e.id !== id),
    }));
  }, []);

  // Services CRUD
  const addService = useCallback((item) => {
    setContent((prev) => ({
      ...prev,
      services: [
        ...prev.services,
        {
          id: Date.now().toString(),
          title: item.title || 'New Service',
          badge: item.badge || 'Service',
          description: item.description || '',
          features: Array.isArray(item.features)
            ? item.features
            : (item.features || '').split('\n').map((s) => s.trim()).filter(Boolean),
        },
      ],
    }));
  }, []);

  const updateService = useCallback((id, updates) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.map((s) => {
        if (s.id === id) {
          const updatedFeatures = Array.isArray(updates.features)
            ? updates.features
            : typeof updates.features === 'string'
            ? updates.features.split('\n').map((item) => item.trim()).filter(Boolean)
            : s.features;
          return {
            ...s,
            ...updates,
            features: updatedFeatures,
          };
        }
        return s;
      }),
    }));
  }, []);

  const removeService = useCallback((id) => {
    setContent((prev) => ({
      ...prev,
      services: prev.services.filter((s) => s.id !== id),
    }));
  }, []);

  const resetContent = useCallback(() => {
    setContent(defaultContent);
    try {
      localStorage.setItem('portfolio_content', JSON.stringify(defaultContent));
    } catch (e) {}
  }, []);

  return (
    <ContentContext.Provider
      value={{
        content,
        updateHero,
        updateHeroBatch,
        updateContact,
        updateContent,
        addEquipment,
        updateEquipment,
        removeEquipment,
        addService,
        updateService,
        removeService,
        resetContent,
        publishChanges,
      }}
    >
      {children}
    </ContentContext.Provider>
  );
}

export const useContent = () => {
  const context = useContext(ContentContext);
  if (!context) {
    throw new Error('useContent must be used within a ContentProvider');
  }
  return context;
};
