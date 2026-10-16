import React, { useState, useEffect } from 'react';
import { ExternalLink, Github, Eye, Upload, Image as ImageIcon, Trash2 } from 'lucide-react';
import ProjectModal from './ProjectModal';
import { useAdmin } from '../context/AdminContext';
import { triggerCloudSync } from '../utils/cloudStorage';

export default function Projects() {
  const { isAdmin } = useAdmin();

  const initialProjects = [
    {
      id: 'cafe-ordering',
      title: 'Cafe Ordering System',
      category: 'Web Application & Automation',
      shortDescription:
        'A full-stack online ordering system with real-time menu management, automated customer notifications, and order routing.',
      fullDescription:
        'Developed a complete web-based cafe ordering solution designed to streamline takeout and dine-in operations. The system incorporates customer ordering portals, an administrative kitchen display screen, and automated webhook triggers via n8n to notify baristas and customers with live order progress.',
      features: [
        'Interactive real-time digital menu with category filtering and cart persistence',
        'n8n automated webhook integration for order receipt generation and messaging',
        'Kitchen display interface updating live status (Received, Preparing, Ready)',
        'Responsive layout optimized for mobile ordering and tablet POS',
      ],
      tags: ['React', 'Node.js', 'n8n', 'Webhook'],
      liveUrl: '#',
      githubUrl: '#',
      images: [],
    },
    {
      id: 'gym-membership',
      title: 'Gym Membership & Appointment System',
      category: 'Database & Management Portal',
      shortDescription:
        'A comprehensive membership portal with scheduled trainer appointments, automated subscription renewals, and attendance tracking.',
      fullDescription:
        'A management platform engineered to automate gym operations. Features membership tier tracking, automated appointment calendar scheduling with personal trainers, recurring billing alerts, and detailed client log management.',
      features: [
        'Secure member registration, subscription tiers, and digital check-in logs',
        'Automated appointment booking calendar preventing double bookings',
        'Relational MySQL schema optimized for financial reporting and membership duration',
        'Automated reminders for renewal expiration and training sessions',
      ],
      tags: ['PHP', 'MySQL', 'JavaScript', 'Automation'],
      liveUrl: '#',
      githubUrl: '#',
      images: [],
    },
    {
      id: 'beach-resort',
      title: 'Beach Resort Booking System',
      category: 'Hospitality & Workflow Automation',
      shortDescription:
        'A modern booking engine with room availability verification, deposit invoice generation, and automated confirmation emails.',
      fullDescription:
        'An end-to-end hospitality booking system built for a beachfront resort. Integrates visual date picker room availability, seasonal tariff calculations, automated email reservation summaries via Python and n8n, and guest check-in automation.',
      features: [
        'Dynamic date range room availability calendar with live pricing calculation',
        'Automated guest itinerary & booking confirmation emails dispatched via n8n',
        'Python backend microservice for booking validation and automated invoice PDFs',
        'Admin reservation dashboard with check-in/check-out status controls',
      ],
      tags: ['React', 'Python', 'n8n', 'Email Automation'],
      liveUrl: '#',
      githubUrl: '#',
      images: [],
    },
  ];

  const [projects, setProjects] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolio_projects');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return initialProjects.map((init) => {
            const found = parsed.find((p) => p.id === init.id);
            return found ? { ...init, ...found, images: found.images || [] } : init;
          });
        }
      }
    } catch (e) {}
    return initialProjects;
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_projects', JSON.stringify(projects));
      const timer = setTimeout(() => {
        triggerCloudSync();
      }, 1000);
      return () => clearTimeout(timer);
    } catch (e) {}
  }, [projects]);

  useEffect(() => {
    const handleCloudUpdate = () => {
      try {
        const stored = localStorage.getItem('portfolio_projects');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setProjects(
              initialProjects.map((init) => {
                const found = parsed.find((p) => p.id === init.id);
                return found ? { ...init, ...found, images: found.images || [] } : init;
              })
            );
          }
        }
      } catch (e) {}
    };

    window.addEventListener('portfolio_projects_updated', handleCloudUpdate);
    return () => window.removeEventListener('portfolio_projects_updated', handleCloudUpdate);
  }, []);

  const [selectedProject, setSelectedProject] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Handle local image file upload via FileReader
  const handleImageUpload = (projectId, slotIndex, file) => {
    if (!file) return;

    const reader = new FileReader();
    reader.onload = (event) => {
      const dataUrl = event.target.result;
      setProjects((prevProjects) =>
        prevProjects.map((p) => {
          if (p.id === projectId) {
            const nextImages = [...p.images];
            nextImages[slotIndex] = dataUrl;
            return { ...p, images: nextImages };
          }
          return p;
        })
      );
    };
    reader.readAsDataURL(file);
  };

  // Remove uploaded image
  const handleRemoveImage = (projectId, slotIndex) => {
    setProjects((prevProjects) =>
      prevProjects.map((p) => {
        if (p.id === projectId) {
          const nextImages = [...p.images];
          nextImages.splice(slotIndex, 1);
          return { ...p, images: nextImages };
        }
        return p;
      })
    );
  };

  const openModal = (project) => {
    setSelectedProject(project);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProject(null);
  };

  return (
    <section id="projects" className="py-20 bg-gray-50/50 dark:bg-dark-secondary/50 border-t border-gray-200 dark:border-dark-border">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs sm:text-sm uppercase tracking-widest text-accent font-semibold mb-2">
            Featured Portfolio
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-dark-text tracking-tight mb-4">
            Recent Projects &amp; Systems
          </h3>
          <p className="text-gray-600 dark:text-dark-muted text-base sm:text-lg">
            Real-world web applications and automated workflows engineered for performance and reliability.
          </p>
        </div>

        {/* Project Cards Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {projects.map((project) => {
            const primaryImage = project.images && project.images[0];

            return (
              <div
                key={project.id}
                className="flex flex-col bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300 hover:border-accent/40"
              >
                {/* Image / Placeholder Area */}
                <div className="relative h-52 bg-gray-100 dark:bg-dark-secondary flex items-center justify-center overflow-hidden border-b border-gray-200 dark:border-dark-border group">
                  {primaryImage ? (
                    <img
                      src={primaryImage}
                      alt={project.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />
                  ) : (
                    <div className="p-6 text-center flex flex-col items-center">
                      <ImageIcon className="w-10 h-10 text-gray-400 dark:text-dark-muted mb-2 opacity-60" />
                      <span className="text-sm font-semibold text-gray-700 dark:text-gray-300">
                        {project.title}
                      </span>
                      <span className="text-xs text-gray-400 dark:text-dark-muted mt-1">
                        Screenshot placeholder
                      </span>
                      {isAdmin && (
                        <label className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-105">
                          <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                          <span>Upload Picture</span>
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) =>
                              handleImageUpload(project.id, 0, e.target.files?.[0])
                            }
                          />
                        </label>
                      )}
                    </div>
                  )}

                  {/* Admin controls when primary image exists */}
                  {isAdmin && primaryImage && (
                    <div className="absolute top-3 right-3 flex items-center gap-1.5 z-20">
                      <label
                        className="p-1.5 rounded-lg bg-amber-500 hover:bg-amber-600 text-amber-950 shadow-md cursor-pointer transition-transform hover:scale-105 flex items-center justify-center"
                        title="Change picture"
                      >
                        <Upload className="w-3.5 h-3.5 stroke-[2.5]" />
                        <input
                          type="file"
                          accept="image/*"
                          className="hidden"
                          onChange={(e) =>
                            handleImageUpload(project.id, 0, e.target.files?.[0])
                          }
                        />
                      </label>
                      <button
                        type="button"
                        onClick={() => handleRemoveImage(project.id, 0)}
                        title="Remove picture"
                        className="p-1.5 rounded-lg bg-red-600 hover:bg-red-700 text-white shadow-md transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  {/* Category Pill Tag Overlay */}
                  <div className="absolute top-3 left-3">
                    <span className="px-2.5 py-1 rounded-md text-xs font-medium bg-black/60 backdrop-blur-md text-white border border-white/10">
                      {project.category}
                    </span>
                  </div>
                </div>

                {/* Local Image Upload Controls (Up to 3 slots) - ADMIN ONLY */}
                {isAdmin && (
                  <div className="px-6 py-3 bg-gray-50/80 dark:bg-dark-secondary/60 border-b border-gray-200 dark:border-dark-border">
                    <div className="flex items-center justify-between mb-2">
                      <span className="text-xs font-semibold text-gray-600 dark:text-dark-muted flex items-center gap-1.5">
                        <Upload className="w-3.5 h-3.5 text-accent" />
                        Upload Photos (Admin Preview):
                      </span>
                    </div>

                    <div className="grid grid-cols-3 gap-2">
                      {[0, 1, 2].map((slotIndex) => {
                        const hasImage = Boolean(project.images[slotIndex]);
                        return (
                          <div key={slotIndex} className="relative">
                            <label
                              className={`flex flex-col items-center justify-center h-14 rounded-lg border border-dashed text-[11px] font-medium cursor-pointer transition-colors ${
                                hasImage
                                  ? 'border-accent bg-accent/5 dark:bg-accent/10 text-accent'
                                  : 'border-gray-300 dark:border-dark-border hover:border-accent text-gray-500 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-dark-card'
                              }`}
                            >
                              <input
                                type="file"
                                accept="image/*"
                                className="hidden"
                                onChange={(e) =>
                                  handleImageUpload(project.id, slotIndex, e.target.files?.[0])
                                }
                              />
                              {hasImage ? (
                                <span className="truncate px-1 font-semibold">Photo {slotIndex + 1} ✓</span>
                              ) : (
                                <span>+ Slot {slotIndex + 1}</span>
                              )}
                            </label>

                            {hasImage && (
                              <button
                                type="button"
                                onClick={() => handleRemoveImage(project.id, slotIndex)}
                                title="Remove image"
                                aria-label={`Remove photo ${slotIndex + 1}`}
                                className="absolute -top-1.5 -right-1.5 bg-red-500 text-white rounded-full p-0.5 shadow hover:bg-red-600 transition-colors"
                              >
                                <Trash2 className="w-3 h-3" />
                              </button>
                            )}
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Card Content */}
                <div className="p-6 flex-1 flex flex-col justify-between">
                  <div>
                    <h4 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2">
                      {project.title}
                    </h4>

                    <p className="text-sm text-gray-600 dark:text-dark-muted mb-4 line-clamp-3 leading-relaxed">
                      {project.shortDescription}
                    </p>

                    {/* Tech Badges */}
                    <div className="flex flex-wrap gap-1.5 mb-6">
                      {project.tags.map((tag, tIdx) => (
                        <span
                          key={tIdx}
                          className="px-2.5 py-0.5 rounded-md text-xs font-medium bg-gray-100 dark:bg-dark-secondary border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                  </div>

                  {/* Actions */}
                  <div className="pt-4 border-t border-gray-100 dark:border-dark-border flex items-center justify-between gap-2">
                    <button
                      type="button"
                      onClick={() => openModal(project)}
                      className="inline-flex items-center gap-1.5 px-3.5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs sm:text-sm font-semibold transition-colors cursor-pointer shadow-sm shadow-accent/20"
                    >
                      <Eye className="w-4 h-4" />
                      <span>View Details</span>
                    </button>

                    <div className="flex items-center gap-1.5">
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="GitHub Repository"
                        className="p-2 rounded-lg text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-card border border-transparent dark:border-dark-border transition-colors"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label="Live Demo"
                        className="p-2 rounded-lg text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-card border border-transparent dark:border-dark-border transition-colors"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Details Modal */}
      <ProjectModal
        project={selectedProject}
        isOpen={isModalOpen}
        onClose={closeModal}
      />
    </section>
  );
}
