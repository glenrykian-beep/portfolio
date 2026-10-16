import React, { useState, useEffect } from 'react';
import {
  GraduationCap,
  Award,
  Plus,
  Building2,
  X,
  ZoomIn,
  Trash2,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { triggerCloudSync, uploadPortfolioImage } from '../utils/cloudStorage';

export default function Education() {
  const { isAdmin } = useAdmin();

  const defaultCertifications = [
    {
      id: 1,
      title: 'Azure AI Fundamentals',
      organization: 'Technical Education and Skills Development Authority',
      date: 'October 08, 2026',
      image: 'https://ngtqirwawuocqmgbtirk.supabase.co/storage/v1/object/public/portfolio-uploads/Certificate_of_Completion%20Azure(1).jpg',
    },
  ];

  // Certifications state with localStorage persistence
  const [certifications, setCertifications] = useState(() => {
    try {
      const stored = localStorage.getItem('portfolio_certifications');
      if (stored) {
        const parsed = JSON.parse(stored);
        if (Array.isArray(parsed) && parsed.length > 0) {
          return parsed;
        }
      }
    } catch (e) {}
    return defaultCertifications;
  });

  useEffect(() => {
    try {
      localStorage.setItem('portfolio_certifications', JSON.stringify(certifications));
      // Auto-publish changes to cloud for all customers
      const timer = setTimeout(() => {
        triggerCloudSync().then((success) => {
          if (success) {
            console.log('✅ Certifications auto-published to cloud - All customers will see updates within 30 seconds');
          }
        });
      }, 1000);
      return () => clearTimeout(timer);
    } catch (e) {}
  }, [certifications]);

  useEffect(() => {
    const handleCloudUpdate = () => {
      try {
        const stored = localStorage.getItem('portfolio_certifications');
        if (stored) {
          const parsed = JSON.parse(stored);
          if (Array.isArray(parsed) && parsed.length > 0) {
            setCertifications(parsed);
          }
        }
      } catch (e) {}
    };

    window.addEventListener('portfolio_certifications_updated', handleCloudUpdate);
    return () => window.removeEventListener('portfolio_certifications_updated', handleCloudUpdate);
  }, []);

  // Lightbox modal state for viewing certificate full image
  const [lightboxImage, setLightboxImage] = useState(null);

  // Handle certificate image upload via Supabase Storage or Base64 fallback
  const handleCertImage = async (id, file) => {
    if (!file) return;
    const imageUrl = await uploadPortfolioImage(file, 'certifications');
    if (imageUrl) {
      setCertifications((prev) =>
        prev.map((cert) => (cert.id === id ? { ...cert, image: imageUrl } : cert))
      );
    }
  };

  // Update certificate field
  const updateCertField = (id, field, value) => {
    setCertifications((prev) =>
      prev.map((cert) => (cert.id === id ? { ...cert, [field]: value } : cert))
    );
  };

  // Add new certificate slot
  const addCertification = () => {
    const nextId = certifications.length > 0 ? Math.max(...certifications.map((c) => c.id)) + 1 : 1;
    setCertifications((prev) => [
      ...prev,
      {
        id: nextId,
        title: '',
        organization: '',
        date: '',
        image: null,
      },
    ]);
  };

  // Remove certificate slot
  const removeCertification = (id) => {
    setCertifications((prev) => prev.filter((cert) => cert.id !== id));
  };

  return (
    <section
      id="education"
      className="py-20 bg-white dark:bg-dark-primary border-t border-gray-200 dark:border-dark-border"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs sm:text-sm uppercase tracking-widest text-accent font-semibold mb-2">
            Background &amp; Credentials
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-dark-text tracking-tight mb-4">
            Education &amp; Certifications
          </h3>
          <p className="text-gray-600 dark:text-dark-muted text-base sm:text-lg">
            Academic foundation and professional credentials.
          </p>
        </div>

        {/* Two-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x lg:divide-gray-200 lg:dark:divide-dark-border">
          {/* LEFT — Education */}
          <div className="lg:pr-10 pb-12 lg:pb-0">
            <h4 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-6 flex items-center gap-2">
              <GraduationCap className="w-5 h-5 text-accent" />
              <span>Formal Education</span>
            </h4>

            <div className="rounded-2xl p-6 sm:p-8 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-sm flex flex-col justify-between">
              <div>
                <div className="flex items-start justify-between gap-4 mb-4">
                  <div className="w-12 h-12 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <span className="px-3 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                    Undergraduate
                  </span>
                </div>

                <h5 className="text-2xl font-bold text-gray-900 dark:text-dark-text mb-2">
                  BS Civil Engineering
                </h5>

                <p className="text-base font-semibold text-accent mb-4 flex items-center gap-2">
                  <Building2 className="w-4 h-4" />
                  <span>Ramon Magsaysay Memorial Colleges</span>
                </p>

                <p className="text-sm text-gray-600 dark:text-dark-muted leading-relaxed mb-6">
                  Rigorous engineering curriculum centered on structural analysis, quantitative problem-solving, project management, and mathematical modeling — bringing structured algorithmic precision directly into software development and AI automation workflows.
                </p>
              </div>

              {/* Core Competencies Learned */}
              <div className="pt-4 border-t border-gray-200/80 dark:border-dark-border">
                <span className="text-xs font-semibold text-gray-500 dark:text-dark-muted uppercase tracking-wider block mb-2">
                  Engineering Focus
                </span>
                <div className="flex flex-wrap gap-2">
                  {['Analytical Thinking', 'Systems Design', 'Data Calculations', 'Project Optimization', 'Quality Assurance'].map(
                    (tag, idx) => (
                      <span
                        key={idx}
                        className="px-2.5 py-1 rounded-md text-xs bg-white dark:bg-dark-secondary border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300 font-medium"
                      >
                        {tag}
                      </span>
                    )
                  )}
                </div>
              </div>
            </div>
          </div>

          {/* RIGHT — Certifications */}
          <div className="lg:pl-10 pt-12 lg:pt-0 border-t lg:border-t-0 border-gray-200 dark:border-dark-border">
            <div className="flex items-center justify-between mb-6">
              <h4 className="text-xl font-bold text-gray-900 dark:text-dark-text flex items-center gap-2">
                <Award className="w-5 h-5 text-accent" />
                <span>Certifications &amp; Credentials</span>
              </h4>

              {/* Admin only: Add Certificate button */}
              {isAdmin && (
                <button
                  type="button"
                  onClick={addCertification}
                  className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-accent hover:bg-accent-hover text-white text-xs font-semibold shadow transition-all cursor-pointer"
                >
                  <Plus className="w-4 h-4" />
                  <span>Add Certificate</span>
                </button>
              )}
            </div>

            {/* Certifications list */}
            <div className="space-y-4">
              {certifications.map((cert) =>
                isAdmin ? (
                  /* Full editable card with inputs, file upload, delete */
                  <div
                    key={cert.id}
                    className="relative rounded-2xl p-5 bg-gray-50/80 dark:bg-dark-card border border-amber-300 dark:border-amber-500/40 shadow-sm transition-all"
                  >
                    {/* Delete Slot Button */}
                    <button
                      type="button"
                      onClick={() => removeCertification(cert.id)}
                      title="Remove this certificate slot"
                      className="absolute top-3 right-3 p-1.5 text-gray-400 hover:text-red-500 rounded-lg hover:bg-red-50 dark:hover:bg-red-950/30 transition-colors cursor-pointer"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>

                    <div className="flex flex-col sm:flex-row gap-4 items-start">
                      {/* Image Upload / Preview Box */}
                      <div className="w-full sm:w-36 h-32 rounded-xl border-2 border-dashed border-gray-300 dark:border-dark-border bg-white dark:bg-dark-secondary flex flex-col items-center justify-center relative overflow-hidden shrink-0 group">
                        {cert.image ? (
                          <>
                            <img
                              src={cert.image}
                              alt={cert.title || 'Certificate'}
                              className="w-full h-full object-cover"
                            />
                            <button
                              type="button"
                              onClick={() => setLightboxImage(cert.image)}
                              className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity gap-1 text-xs font-medium cursor-pointer"
                            >
                              <ZoomIn className="w-3.5 h-3.5" />
                              <span>View Full</span>
                            </button>
                          </>
                        ) : (
                          <div className="p-2 text-center flex flex-col items-center justify-center">
                            <Award className="w-6 h-6 text-gray-400 dark:text-dark-muted mb-1" />
                            <span className="text-[10px] text-gray-500 dark:text-dark-muted font-medium">
                              No image
                            </span>
                          </div>
                        )}

                        {/* File upload trigger */}
                        <label className="absolute bottom-1 right-1 left-1 bg-white/90 dark:bg-dark-card/90 backdrop-blur-sm border border-gray-200 dark:border-dark-border py-1 px-1.5 rounded text-[10px] text-center font-medium text-gray-700 dark:text-dark-text cursor-pointer hover:bg-accent hover:text-white transition-colors">
                          <input
                            type="file"
                            accept="image/*"
                            className="hidden"
                            onChange={(e) => handleCertImage(cert.id, e.target.files?.[0])}
                          />
                          <span>Choose File</span>
                        </label>
                      </div>

                      {/* Form Inputs for this Certificate Slot */}
                      <div className="flex-1 w-full space-y-2">
                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 dark:text-dark-text mb-0.5">
                            Certificate Title
                          </label>
                          <input
                            type="text"
                            placeholder="Add certification title..."
                            value={cert.title}
                            onChange={(e) => updateCertField(cert.id, 'title', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-secondary text-xs text-gray-900 dark:text-dark-text placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 dark:text-dark-text mb-0.5">
                            Issuing Organization
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. Coursera, DeepLearning.AI, AWS"
                            value={cert.organization}
                            onChange={(e) => updateCertField(cert.id, 'organization', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-secondary text-xs text-gray-900 dark:text-dark-text placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        </div>

                        <div>
                          <label className="block text-[11px] font-semibold text-gray-700 dark:text-dark-text mb-0.5">
                            Issue Date
                          </label>
                          <input
                            type="text"
                            placeholder="e.g. 2024 or Nov 2023"
                            value={cert.date}
                            onChange={(e) => updateCertField(cert.id, 'date', e.target.value)}
                            className="w-full px-2.5 py-1.5 rounded-lg border border-gray-300 dark:border-dark-border bg-white dark:bg-dark-secondary text-xs text-gray-900 dark:text-dark-text placeholder-gray-400 focus:outline-none focus:ring-1 focus:ring-accent"
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                ) : (
                  /* Read-only viewer version */
                  <div
                    key={cert.id}
                    className="relative rounded-2xl p-6 bg-gray-50/80 dark:bg-dark-card border border-gray-200 dark:border-dark-border shadow-sm"
                  >
                    <div className="flex flex-col sm:flex-row gap-5 items-start">
                      {/* Image or placeholder */}
                      <div
                        onClick={() => cert.image && setLightboxImage(cert.image)}
                        className={`w-full sm:w-44 h-36 rounded-xl border border-gray-200 dark:border-dark-border bg-white dark:bg-dark-secondary flex items-center justify-center overflow-hidden shrink-0 ${
                          cert.image ? 'cursor-pointer hover:opacity-90 group relative' : ''
                        }`}
                      >
                        {cert.image ? (
                          <>
                            <img
                              src={cert.image}
                              alt={cert.title || 'Certificate'}
                              className="w-full h-full object-cover"
                            />
                            <div className="absolute inset-0 bg-black/30 opacity-0 group-hover:opacity-100 flex items-center justify-center text-white transition-opacity gap-1 text-xs font-medium">
                              <ZoomIn className="w-4 h-4" />
                              <span>View Full</span>
                            </div>
                          </>
                        ) : (
                          <Award className="w-10 h-10 text-gray-300 dark:text-dark-border" />
                        )}
                      </div>

                      {/* Text info */}
                      <div className="flex-1">
                        {cert.title ? (
                          <>
                            <h5 className="text-base font-bold text-gray-900 dark:text-dark-text mb-1">
                              {cert.title}
                            </h5>
                            {cert.organization && (
                              <p className="text-sm text-accent font-medium mb-1">
                                {cert.organization}
                              </p>
                            )}
                            {cert.date && (
                              <p className="text-xs text-gray-500 dark:text-dark-muted">
                                {cert.date}
                              </p>
                            )}
                          </>
                        ) : (
                          <p className="text-sm text-gray-400 dark:text-dark-muted italic">
                            Certification coming soon
                          </p>
                        )}
                      </div>
                    </div>
                  </div>
                )
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Lightbox Modal */}
      {lightboxImage && (
        <div
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/85 backdrop-blur-md animate-in fade-in duration-200"
          onClick={() => setLightboxImage(null)}
        >
          <div className="relative max-w-4xl max-h-[90vh]">
            <button
              type="button"
              onClick={() => setLightboxImage(null)}
              className="absolute -top-12 right-0 p-2 text-white/80 hover:text-white transition-colors cursor-pointer"
            >
              <X className="w-6 h-6" />
            </button>
            <img
              src={lightboxImage}
              alt="Enlarged Certificate"
              className="max-w-full max-h-[85vh] rounded-lg shadow-2xl object-contain border border-white/10"
              onClick={(e) => e.stopPropagation()}
            />
          </div>
        </div>
      )}
    </section>
  );
}
