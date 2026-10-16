import React, { useState } from 'react';
import {
  MonitorSmartphone,
  Layers,
  Plus,
  Pencil,
  Trash2,
  X,
  AlertCircle,
  Bot,
  Monitor,
  BarChart2,
  Cpu,
  Sparkles,
  Code2,
  Wrench,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useContent } from '../context/ContentContext';

const getServiceIcon = (index, title = '') => {
  const lower = title.toLowerCase();
  if (lower.includes('ai') || lower.includes('automation') || lower.includes('bot')) {
    return Bot;
  }
  if (lower.includes('web') || lower.includes('site') || lower.includes('frontend')) {
    return Monitor;
  }
  if (lower.includes('data') || lower.includes('analytics') || lower.includes('bi')) {
    return BarChart2;
  }
  const icons = [Bot, Monitor, BarChart2, Cpu, Sparkles];
  return icons[index % icons.length];
};

const skillCategories = [
  {
    title: 'Programming & Web',
    icon: Code2,
    skills: ['HTML', 'CSS', 'JavaScript', 'Python', 'CI/CD'],
  },
  {
    title: 'Data Analytics',
    icon: BarChart2,
    skills: ['SQL', 'Power BI', 'Excel', 'Data Cleaning', 'Data Visualization'],
  },
  {
    title: 'AI & Automation',
    icon: Bot,
    skills: ['Workflow Automation', 'AI Agents', 'API Integration', 'Chatbots'],
  },
  {
    title: 'Tools & Platforms',
    icon: Wrench,
    skills: ['Git', 'GitHub', 'VS Code', 'n8n', 'Make', 'Zapier', 'GHL'],
  },
];

export default function Services() {
  const { isAdmin } = useAdmin();
  const { content, addService, updateService, removeService } = useContent();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    title: '',
    badge: 'High Impact',
    description: '',
    featuresText: '',
  });
  const [formError, setFormError] = useState('');

  const servicesList = content?.services || [];

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      title: '',
      badge: 'Popular',
      description: '',
      featuresText: '',
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleOpenEdit = (service) => {
    setEditingId(service.id);
    setFormData({
      title: service.title || '',
      badge: service.badge || 'Service',
      description: service.description || '',
      featuresText: Array.isArray(service.features)
        ? service.features.join('\n')
        : service.features || '',
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.title.trim()) {
      setFormError('Please provide a service title.');
      return;
    }

    const featuresArray = formData.featuresText
      .split('\n')
      .map((item) => item.trim())
      .filter(Boolean);

    if (editingId) {
      updateService(editingId, {
        title: formData.title.trim(),
        badge: formData.badge.trim() || 'Service',
        description: formData.description.trim(),
        features: featuresArray,
      });
    } else {
      addService({
        title: formData.title.trim(),
        badge: formData.badge.trim() || 'Service',
        description: formData.description.trim(),
        features: featuresArray,
      });
    }

    setModalOpen(false);
  };

  const handleDelete = (id, title) => {
    if (window.confirm(`Are you sure you want to delete "${title}"?`)) {
      removeService(id);
    }
  };

  return (
    <section
      id="services"
      className="py-20 bg-white dark:bg-dark-primary border-t border-gray-200 dark:border-dark-border relative"
    >
      {/* Anchor for Skills link in navbar */}
      <div id="skills" className="absolute -top-20" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Combined Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-12">
          <h2 className="text-xs sm:text-sm uppercase tracking-widest text-accent font-semibold mb-2">
            What I Offer
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-dark-text tracking-tight mb-4">
            Services &amp; Skills
          </h3>
          <p className="text-gray-600 dark:text-dark-muted text-base sm:text-lg">
            A full overview of the solutions I deliver and the technical expertise behind them.
          </p>
        </div>

        {/* Two-column split */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-0 lg:divide-x lg:divide-gray-200 lg:dark:divide-dark-border">
          {/* LEFT — Services & Solutions */}
          <div className="lg:pr-10 pb-12 lg:pb-0">
            <div className="flex items-center justify-between mb-2">
              <h4 className="text-xl font-bold text-gray-900 dark:text-dark-text flex items-center gap-2">
                <MonitorSmartphone className="w-5 h-5 text-accent" />
                <span>Services &amp; Solutions</span>
              </h4>

              {isAdmin && (
                <button
                  type="button"
                  onClick={handleOpenAdd}
                  className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs shadow-md transition-all cursor-pointer"
                >
                  <Plus className="w-3.5 h-3.5 stroke-[2.5]" />
                  <span>Add Service</span>
                </button>
              )}
            </div>

            <p className="text-sm text-gray-500 dark:text-dark-muted mb-6">
              Professional services I provide to businesses and clients.
            </p>

            {/* Service cards — compact version stacked vertically */}
            <div className="space-y-4">
              {servicesList.map((service, index) => {
                const Icon = getServiceIcon(index, service.title);
                const features = Array.isArray(service.features)
                  ? service.features
                  : typeof service.features === 'string'
                  ? service.features.split('\n').filter(Boolean)
                  : [];

                return (
                  <div
                    key={service.id || index}
                    className="rounded-xl p-5 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border hover:border-accent/40 transition-all group shadow-sm"
                  >
                    <div className="flex items-start gap-4">
                      <div className="w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent shrink-0 group-hover:scale-105 transition-transform">
                        <Icon className="w-5 h-5" />
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1">
                          <h5 className="font-bold text-gray-900 dark:text-dark-text text-base truncate">
                            {service.title}
                          </h5>
                          {service.badge && (
                            <span className="text-[10px] font-semibold px-2 py-0.5 rounded-full bg-blue-100/70 dark:bg-dark-secondary text-accent border border-blue-200 dark:border-dark-border shrink-0">
                              {service.badge}
                            </span>
                          )}
                        </div>

                        <p className="text-xs text-gray-500 dark:text-dark-muted mb-3 leading-relaxed">
                          {service.description}
                        </p>

                        {features.length > 0 && (
                          <ul className="space-y-1">
                            {features.map((feature, fIdx) => (
                              <li
                                key={fIdx}
                                className="flex items-center gap-1.5 text-xs text-gray-600 dark:text-dark-muted"
                              >
                                <div className="w-1 h-1 rounded-full bg-accent shrink-0" />
                                <span>{feature}</span>
                              </li>
                            ))}
                          </ul>
                        )}
                      </div>

                      {/* Admin edit/delete buttons */}
                      {isAdmin && (
                        <div className="flex flex-col gap-1 shrink-0 pt-0.5">
                          <button
                            type="button"
                            onClick={() => handleOpenEdit(service)}
                            title="Edit service"
                            className="p-1.5 rounded-lg bg-amber-500 text-amber-950 hover:bg-amber-600 transition-colors cursor-pointer shadow-sm"
                          >
                            <Pencil className="w-3 h-3" />
                          </button>
                          <button
                            type="button"
                            onClick={() => handleDelete(service.id, service.title)}
                            title="Delete service"
                            className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 transition-colors cursor-pointer shadow-sm"
                          >
                            <Trash2 className="w-3 h-3" />
                          </button>
                        </div>
                      )}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* RIGHT — Skills & Expertise */}
          <div className="lg:pl-10 pt-12 lg:pt-0 border-t lg:border-t-0 border-gray-200 dark:border-dark-border">
            <h4 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-2 flex items-center gap-2">
              <Layers className="w-5 h-5 text-accent" />
              <span>Skills &amp; Expertise</span>
            </h4>
            <p className="text-sm text-gray-500 dark:text-dark-muted mb-6">
              Technologies and tools I work with daily.
            </p>

            {/* Skills categories */}
            <div className="space-y-4">
              {skillCategories.map((cat, idx) => {
                const CatIcon = cat.icon;
                return (
                  <div
                    key={idx}
                    className="rounded-xl p-4 bg-gray-50 dark:bg-dark-card border border-gray-200 dark:border-dark-border hover:border-accent/40 transition-all shadow-sm"
                  >
                    <h5 className="text-sm font-bold text-gray-900 dark:text-dark-text mb-3 flex items-center gap-2">
                      <CatIcon className="w-4 h-4 text-accent" />
                      <span>{cat.title}</span>
                    </h5>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="px-2.5 py-1 rounded-lg text-xs font-medium bg-white dark:bg-dark-secondary border border-gray-200 dark:border-dark-border text-gray-700 dark:text-gray-300"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Admin Add/Edit Modal */}
      {modalOpen && (
        <div
          role="dialog"
          aria-modal="true"
          className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in"
          onClick={() => setModalOpen(false)}
        >
          <div
            className="relative w-full max-w-lg bg-white dark:bg-dark-card rounded-2xl shadow-2xl border border-gray-200 dark:border-dark-border p-6 sm:p-8 max-h-[90vh] overflow-y-auto"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-dark-border">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Pencil className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text">
                  {editingId ? 'Edit Service' : 'Add New Service'}
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setModalOpen(false)}
                className="p-1.5 rounded-lg text-gray-400 hover:text-gray-600 dark:hover:text-dark-text hover:bg-gray-100 dark:hover:bg-dark-secondary transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Error Message */}
            {formError && (
              <div className="mb-4 p-3 rounded-xl bg-red-50 dark:bg-red-950/40 border border-red-200 dark:border-red-900 text-xs text-red-700 dark:text-red-400 flex items-center gap-2">
                <AlertCircle className="w-4 h-4 shrink-0" />
                <span>{formError}</span>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1">
                  Service Title <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. AI Automation & Custom Workflows"
                  value={formData.title}
                  onChange={(e) => setFormData((prev) => ({ ...prev, title: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-secondary text-gray-900 dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1">
                  Highlight Badge
                </label>
                <input
                  type="text"
                  placeholder="e.g. High Impact, Full Stack, Actionable Insights"
                  value={formData.badge}
                  onChange={(e) => setFormData((prev) => ({ ...prev, badge: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-secondary text-gray-900 dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1">
                  Description
                </label>
                <textarea
                  rows={3}
                  placeholder="Brief summary of how this service helps clients..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-secondary text-gray-900 dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1">
                  Features &amp; Deliverables (One per line)
                </label>
                <textarea
                  rows={4}
                  placeholder="Business workflow automation&#10;Custom LLM chat agents&#10;API integrations"
                  value={formData.featuresText}
                  onChange={(e) => setFormData((prev) => ({ ...prev, featuresText: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-secondary text-gray-900 dark:text-dark-text text-sm font-mono focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <p className="text-[11px] text-gray-500 dark:text-dark-muted mt-1">
                  Type each bullet point on a new line.
                </p>
              </div>

              {/* Action Buttons */}
              <div className="flex items-center justify-end gap-3 pt-4 border-t border-gray-200 dark:border-dark-border">
                <button
                  type="button"
                  onClick={() => setModalOpen(false)}
                  className="px-4 py-2 rounded-xl text-gray-700 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-dark-secondary text-sm font-semibold transition-colors cursor-pointer"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="px-5 py-2 rounded-xl bg-accent hover:bg-accent-hover text-white text-sm font-semibold shadow-md shadow-accent/20 transition-all cursor-pointer"
                >
                  {editingId ? 'Save Changes' : 'Create Service'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
