import React, { useState, useEffect } from 'react';
import { ArrowRight, Mail, Bot, Globe, BarChart3, Pencil, Check, X, Sparkles } from 'lucide-react';
import { smoothScroll } from '../utils/smoothScroll';
import { useAdmin } from '../context/AdminContext';
import { useContent } from '../context/ContentContext';

const highlightIcons = [Bot, Globe, BarChart3];

export default function Hero() {
  const { isAdmin } = useAdmin();
  const { content, updateHero } = useContent();

  const heroData = content?.hero || {
    name: 'GIG',
    role: 'Civil Engineer & AI Automation Developer',
    bio: 'Undergraduate BS Civil Engineering graduate combining analytical thinking, programming, and automation to develop practical solutions for businesses.',
    highlights: [],
  };

  const displayName = (!heroData.name || heroData.name === 'Glen R.') ? 'GIG' : heroData.name;

  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    name: displayName,
    role: heroData.role || 'Civil Engineer & AI Automation Developer',
    bio: heroData.bio || '',
  });

  // Sync formData with heroData when not currently editing
  useEffect(() => {
    if (!isEditing) {
      setFormData({
        name: displayName,
        role: heroData.role || 'Civil Engineer & AI Automation Developer',
        bio: heroData.bio || '',
      });
    }
  }, [displayName, heroData.role, heroData.bio, isEditing]);

  const handleStartEdit = () => {
    setFormData({
      name: displayName,
      role: heroData.role || 'Civil Engineer & AI Automation Developer',
      bio: heroData.bio || '',
    });
    setIsEditing(true);
  };

  const handleSave = (e) => {
    e?.preventDefault();
    updateHero('name', formData.name.trim() || 'GIG');
    updateHero('role', formData.role.trim() || 'Civil Engineer & AI Automation Developer');
    updateHero('bio', formData.bio.trim());
    setIsEditing(false);
  };

  const handleCancel = () => {
    setFormData({
      name: displayName,
      role: heroData.role || 'Civil Engineer & AI Automation Developer',
      bio: heroData.bio || '',
    });
    setIsEditing(false);
  };

  const rawHighlights = heroData.highlights && heroData.highlights.length > 0
    ? heroData.highlights
    : [
        {
          title: 'AI Engineering & Automation',
          description: 'Intelligent agents, autonomous workflows, and LLM integrations.',
        },
        {
          title: 'Web Development',
          description: 'Modern, full-stack, and responsive web applications with React & Vite.',
        },
        {
          title: 'Data Analytics & Visualization',
          description: 'SQL queries, Power BI dashboards, and actionable data pipelines.',
        },
      ];

  const highlights = rawHighlights.filter(
    (item) => !item.title.toLowerCase().includes('network')
  );

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex flex-col justify-center items-center py-16 md:py-24 overflow-hidden"
    >
      {/* Background Grid Pattern & Ambient Glows */}
      <div className="absolute inset-0 bg-grid-pattern opacity-60 dark:opacity-40 pointer-events-none" />
      <div className="absolute top-1/4 left-1/2 -translate-x-1/2 -translate-y-1/2 w-96 h-96 bg-accent/15 dark:bg-accent/10 rounded-full blur-3xl pointer-events-none -z-10" />
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-blue-500/10 dark:bg-blue-600/10 rounded-full blur-2xl pointer-events-none -z-10" />

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10 w-full">
        {/* Availability Badge & Admin Controls */}
        <div className="flex items-center justify-center gap-3 mb-6 flex-wrap">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-blue-50 dark:bg-dark-card border border-blue-200 dark:border-dark-border text-accent text-xs sm:text-sm font-medium animate-pulse">
            <span className="w-2 h-2 rounded-full bg-accent" />
            <span>Available for Projects &amp; Automation Solutions</span>
          </div>

          {isAdmin && !isEditing && (
            <button
              type="button"
              onClick={handleStartEdit}
              className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-xs shadow-md transition-all cursor-pointer hover:scale-105"
            >
              <Pencil className="w-3.5 h-3.5" />
              <span>Edit Hero Info</span>
            </button>
          )}
        </div>

        {/* Inline Editing Form or Display View */}
        {isAdmin && isEditing ? (
          <div className="mb-10 p-6 sm:p-8 rounded-3xl bg-white dark:bg-dark-card border-2 border-dashed border-amber-400 dark:border-amber-500 shadow-2xl text-left max-w-2xl mx-auto animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-dark-border">
              <span className="text-sm font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1.5">
                <Pencil className="w-4 h-4" /> Editing Hero Profile Information
              </span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={handleCancel}
                  className="px-3 py-1 rounded-lg text-xs font-semibold text-gray-600 dark:text-dark-muted hover:bg-gray-100 dark:hover:bg-dark-secondary transition-colors cursor-pointer flex items-center gap-1"
                >
                  <X className="w-3.5 h-3.5" />
                  <span>Cancel</span>
                </button>
                <button
                  type="button"
                  onClick={handleSave}
                  className="px-4 py-1 rounded-lg text-xs font-bold bg-amber-500 hover:bg-amber-600 text-amber-950 shadow transition-all cursor-pointer flex items-center gap-1"
                >
                  <Check className="w-3.5 h-3.5" />
                  <span>Save</span>
                </button>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1">
                  Full Name
                </label>
                <input
                  type="text"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-secondary text-sm font-semibold text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1">
                  Professional Title / Role
                </label>
                <input
                  type="text"
                  value={formData.role}
                  onChange={(e) => setFormData((prev) => ({ ...prev, role: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-secondary text-sm font-semibold text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-amber-500"
                />
              </div>

              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1">
                  Bio / Introduction Paragraph
                </label>
                <textarea
                  rows={3}
                  value={formData.bio}
                  onChange={(e) => setFormData((prev) => ({ ...prev, bio: e.target.value }))}
                  className="w-full px-3.5 py-2 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-secondary text-sm text-gray-900 dark:text-dark-text focus:outline-none focus:ring-2 focus:ring-amber-500 resize-none"
                />
              </div>
            </div>
          </div>
        ) : (
          <>
            {/* Name and Title Display */}
            <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold tracking-tight text-gray-900 dark:text-dark-text mb-4">
              Hi, I'm <span className="text-accent">{displayName}</span>
            </h1>

            <p className="text-xl sm:text-2xl lg:text-3xl font-semibold text-gray-700 dark:text-gray-300 mb-6">
              {heroData.role || 'Civil Engineer & AI Automation Developer'}
            </p>

            {/* Bio / About Anchor */}
            <div id="about" className="max-w-3xl mx-auto mb-10 pt-2">
              <p className="text-base sm:text-lg text-gray-600 dark:text-dark-muted leading-relaxed">
                {heroData.bio ||
                  'Undergraduate BS Civil Engineering graduate combining analytical thinking, programming, and automation to develop practical solutions for businesses.'}
              </p>
            </div>
          </>
        )}

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4 mb-16">
          <button
            type="button"
            onClick={() => smoothScroll('projects')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-sm sm:text-base shadow-lg shadow-accent/25 hover:shadow-accent/40 hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent focus:ring-offset-2 dark:focus:ring-offset-dark-primary cursor-pointer"
          >
            <span>View My Work</span>
            <ArrowRight className="w-4 h-4" />
          </button>

          <button
            type="button"
            onClick={() => smoothScroll('contact')}
            className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl bg-gray-100 hover:bg-gray-200 dark:bg-dark-card dark:hover:bg-dark-secondary text-gray-800 dark:text-dark-text font-semibold text-sm sm:text-base border border-gray-200 dark:border-dark-border hover:-translate-y-0.5 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-accent cursor-pointer"
          >
            <Mail className="w-4 h-4 text-accent" />
            <span>Get In Touch</span>
          </button>
        </div>

        {/* Highlights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left max-w-4xl mx-auto">
          {highlights.map((item, idx) => {
            const Icon = highlightIcons[idx % highlightIcons.length];
            return (
              <div
                key={idx}
                className="p-5 rounded-2xl bg-white/70 dark:bg-dark-card/80 backdrop-blur-sm border border-gray-200 dark:border-dark-border hover:border-accent/40 dark:hover:border-accent/40 shadow-sm hover:shadow-md transition-all duration-200 group"
              >
                <div className="w-10 h-10 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent mb-3 group-hover:scale-110 transition-transform">
                  <Icon className="w-5 h-5" />
                </div>
                <h3 className="font-semibold text-gray-900 dark:text-dark-text text-sm sm:text-base mb-1">
                  {item.title}
                </h3>
                <p className="text-xs sm:text-sm text-gray-500 dark:text-dark-muted leading-snug">
                  {item.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
