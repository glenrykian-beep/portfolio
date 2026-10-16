import React, { useEffect, useRef } from 'react';
import { X, ExternalLink, Github, Image as ImageIcon } from 'lucide-react';

export default function ProjectModal({ project, isOpen, onClose }) {
  const modalRef = useRef(null);

  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === 'Escape') {
        onClose();
      }
    };

    if (isOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleKeyDown);
      modalRef.current?.focus();
    } else {
      document.body.style.overflow = 'unset';
    }

    return () => {
      document.body.style.overflow = 'unset';
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [isOpen, onClose]);

  if (!isOpen || !project) return null;

  // Active or primary image preview
  const primaryImage = project.images && project.images.length > 0 ? project.images[0] : null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 lg:p-8 bg-black/75 backdrop-blur-sm animate-in fade-in duration-200"
      onClick={onClose}
      role="dialog"
      aria-modal="true"
      aria-labelledby="project-modal-title"
    >
      <div
        ref={modalRef}
        tabIndex={-1}
        className="relative w-full max-w-3xl max-h-[90vh] overflow-y-auto bg-white dark:bg-dark-secondary rounded-2xl border border-gray-200 dark:border-dark-border shadow-2xl p-6 sm:p-8 focus:outline-none"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close button */}
        <button
          type="button"
          onClick={onClose}
          aria-label="Close project modal"
          className="absolute top-4 right-4 p-2 rounded-xl text-gray-500 hover:text-gray-900 dark:text-dark-muted dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-card transition-colors z-10"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Modal Header */}
        <div className="mb-6 pr-8">
          <div className="inline-block px-3 py-1 rounded-full text-xs font-semibold bg-blue-50 dark:bg-dark-card text-accent border border-blue-200 dark:border-dark-border mb-2">
            {project.category}
          </div>
          <h3
            id="project-modal-title"
            className="text-2xl sm:text-3xl font-extrabold text-gray-900 dark:text-dark-text"
          >
            {project.title}
          </h3>
        </div>

        {/* Image Showcase Area */}
        <div className="mb-6 rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border bg-gray-100 dark:bg-dark-card">
          {primaryImage ? (
            <img
              src={primaryImage}
              alt={project.title}
              className="w-full max-h-96 object-cover object-center"
            />
          ) : (
            <div className="h-64 sm:h-80 flex flex-col items-center justify-center text-gray-400 dark:text-dark-muted p-6 text-center">
              <ImageIcon className="w-14 h-14 mb-3 opacity-60 text-accent" />
              <p className="font-medium text-base text-gray-700 dark:text-gray-300">
                {project.title}
              </p>
              <p className="text-xs text-gray-500 dark:text-dark-muted mt-1">
                Upload photos on the project card to preview screenshots here.
              </p>
            </div>
          )}
        </div>

        {/* Gallery Thumbnails if multiple images uploaded */}
        {project.images && project.images.length > 1 && (
          <div className="flex gap-3 mb-6 overflow-x-auto pb-2">
            {project.images.map((img, idx) => (
              <img
                key={idx}
                src={img}
                alt={`${project.title} screenshot ${idx + 1}`}
                className="w-20 h-16 object-cover rounded-lg border border-gray-200 dark:border-dark-border hover:border-accent cursor-pointer transition-colors"
              />
            ))}
          </div>
        )}

        {/* Full Detailed Description */}
        <div className="mb-6 space-y-4 text-gray-700 dark:text-dark-muted leading-relaxed text-sm sm:text-base">
          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-dark-text mb-2">
              Overview &amp; Architecture
            </h4>
            <p>{project.fullDescription || project.shortDescription}</p>
          </div>

          <div>
            <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-dark-text mb-2">
              Key Capabilities &amp; Solved Challenges
            </h4>
            <ul className="list-disc list-inside space-y-1.5 text-sm">
              {project.features?.map((feat, idx) => (
                <li key={idx} className="text-gray-600 dark:text-gray-300">
                  {feat}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Tech Stack */}
        <div className="mb-8">
          <h4 className="text-sm font-semibold uppercase tracking-wider text-gray-900 dark:text-dark-text mb-3">
            Technology Stack
          </h4>
          <div className="flex flex-wrap gap-2">
            {project.tags.map((tag, idx) => (
              <span
                key={idx}
                className="px-3 py-1 rounded-lg text-xs font-medium bg-gray-100 dark:bg-dark-card border border-gray-200 dark:border-dark-border text-gray-800 dark:text-dark-text"
              >
                {tag}
              </span>
            ))}
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-wrap items-center gap-4 pt-4 border-t border-gray-200 dark:border-dark-border">
          <a
            href={project.liveUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-medium transition-all shadow-md shadow-accent/20"
          >
            <ExternalLink className="w-4 h-4" />
            <span>Live Demo</span>
          </a>

          <a
            href={project.githubUrl || '#'}
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-dark-card dark:hover:bg-dark-border text-gray-800 dark:text-dark-text border border-gray-200 dark:border-dark-border text-sm font-medium transition-all"
          >
            <Github className="w-4 h-4" />
            <span>Source Code</span>
          </a>

          <button
            type="button"
            onClick={onClose}
            className="ml-auto px-4 py-2 text-sm text-gray-600 dark:text-dark-muted hover:text-gray-900 dark:hover:text-dark-text transition-colors"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
}
