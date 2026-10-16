import React, { useState } from 'react';
import {
  Mail,
  Github,
  Linkedin,
  Send,
  AlertCircle,
  Info,
  CheckCircle2,
  Pencil,
  Check,
  X,
  ExternalLink,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useContent } from '../context/ContentContext';

export default function Contact() {
  const { isAdmin } = useAdmin();
  const { content, updateContact } = useContent();

  const contactData = content?.contact || {
    email: 'your.email@example.com',
    github: 'https://github.com/yourusername',
    linkedin: 'https://linkedin.com/in/yourusername',
  };

  // State for editing contact channels
  const [editingField, setEditingField] = useState(null);
  const [fieldValue, setFieldValue] = useState('');

  // Form submission state
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });

  const [errors, setErrors] = useState({});
  const [statusMessage, setStatusMessage] = useState(null);

  const startEditing = (field, currentVal) => {
    setEditingField(field);
    setFieldValue(currentVal || '');
  };

  const saveField = (field) => {
    updateContact(field, fieldValue.trim());
    setEditingField(null);
  };

  const cancelEditing = () => {
    setEditingField(null);
    setFieldValue('');
  };

  const validate = () => {
    const errs = {};
    if (!formData.name.trim()) {
      errs.name = 'Please provide your name.';
    }
    if (!formData.email.trim()) {
      errs.email = 'Please provide your email address.';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      errs.email = 'Please enter a valid email address.';
    }
    if (!formData.subject.trim()) {
      errs.subject = 'Please enter a subject.';
    }
    if (!formData.message.trim()) {
      errs.message = 'Please enter your message.';
    }
    setErrors(errs);
    return Object.keys(errs).length === 0;
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    if (errors[name]) {
      setErrors((prev) => ({ ...prev, [name]: null }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validate()) {
      return;
    }

    const formEndpoint = import.meta.env.VITE_FORMSPREE_ENDPOINT;

    if (formEndpoint && !formEndpoint.includes('your_form_id')) {
      fetch(formEndpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify(formData),
      })
        .then((res) => {
          if (res.ok) {
            setStatusMessage({
              type: 'success',
              text: 'Thank you! Your message has been sent successfully.',
            });
            setFormData({ name: '', email: '', subject: '', message: '' });
          } else {
            throw new Error('Formspree returned an error');
          }
        })
        .catch(() => {
          setStatusMessage({
            type: 'notice',
            text: 'Form submission requires backend configuration. Please use the email link above to reach out directly.',
          });
        });
    } else {
      setStatusMessage({
        type: 'notice',
        text: 'Form submission requires backend configuration. Please use the email link above to reach out directly.',
      });
    }
  };

  const formatUrl = (url, prefix = 'https://') => {
    if (!url) return '';
    if (url.startsWith('http://') || url.startsWith('https://') || url.startsWith('mailto:')) {
      return url;
    }
    return `${prefix}${url}`;
  };

  const contactChannels = [
    {
      key: 'email',
      icon: Mail,
      label: 'Email Address',
      value: contactData.email || 'glenrykian@gmail.com',
      href: `mailto:${contactData.email || 'glenrykian@gmail.com'}`,
      actionText: 'Send an email',
      isMail: true,
    },
    {
      key: 'github',
      icon: Github,
      label: 'GitHub Profile',
      value: contactData.github || 'https://github.com/glenrykian-beep',
      href: formatUrl(contactData.github || 'https://github.com/glenrykian-beep'),
      actionText: 'View repositories',
      isMail: false,
    },
    {
      key: 'linkedin',
      icon: Linkedin,
      label: 'LinkedIn Profile',
      value: contactData.linkedin || 'https://linkedin.com/in/yourusername',
      href: formatUrl(contactData.linkedin),
      actionText: 'Connect on LinkedIn',
      isMail: false,
    },
  ];

  return (
    <section
      id="contact"
      className="py-20 bg-gray-50/50 dark:bg-dark-secondary/50 border-t border-gray-200 dark:border-dark-border relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <h2 className="text-xs sm:text-sm uppercase tracking-widest text-accent font-semibold mb-2">
            Get In Touch
          </h2>
          <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-dark-text tracking-tight mb-4">
            Have a Project in Mind?
          </h3>
          <p className="text-gray-600 dark:text-dark-muted text-base sm:text-lg">
            Let's discuss how web development, data analytics, and AI automation can help solve your business challenges.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-10">
          {/* Direct Contact Channels */}
          <div className="lg:col-span-5 space-y-4">
            <div className="flex items-center justify-between mb-4">
              <h4 className="text-lg font-bold text-gray-900 dark:text-dark-text">
                Direct Channels
              </h4>
              {isAdmin && (
                <span className="text-xs font-semibold text-amber-600 dark:text-amber-400 bg-amber-500/10 px-2 py-0.5 rounded-md flex items-center gap-1">
                  <Pencil className="w-3 h-3" /> Admin Editable
                </span>
              )}
            </div>

            {contactChannels.map((channel) => {
              const Icon = channel.icon;
              const isCurrentlyEditing = editingField === channel.key;

              return (
                <div
                  key={channel.key}
                  className={`p-5 rounded-2xl bg-white dark:bg-dark-card border transition-all shadow-sm ${
                    isAdmin
                      ? 'border-amber-400/60 dark:border-amber-500/50 hover:border-amber-500'
                      : 'border-gray-200 dark:border-dark-border hover:border-accent/40 hover:shadow-md'
                  }`}
                >
                  <div className="flex items-start justify-between gap-3">
                    <div className="flex items-start gap-4 flex-1 min-w-0">
                      <div className="w-12 h-12 rounded-xl bg-accent/10 dark:bg-accent/20 flex items-center justify-center text-accent shrink-0">
                        <Icon className="w-6 h-6" />
                      </div>

                      <div className="min-w-0 flex-1">
                        <span className="block text-xs font-semibold text-gray-500 dark:text-dark-muted">
                          {channel.label}
                        </span>

                        {isCurrentlyEditing ? (
                          <div className="mt-1 flex items-center gap-2">
                            <input
                              type="text"
                              autoFocus
                              value={fieldValue}
                              onChange={(e) => setFieldValue(e.target.value)}
                              onKeyDown={(e) => {
                                if (e.key === 'Enter') saveField(channel.key);
                                if (e.key === 'Escape') cancelEditing();
                              }}
                              className="w-full px-2.5 py-1 text-xs sm:text-sm rounded-lg border border-amber-400 dark:border-amber-500 bg-gray-50 dark:bg-dark-secondary text-gray-900 dark:text-dark-text focus:outline-none focus:ring-1 focus:ring-amber-500"
                            />
                            <button
                              type="button"
                              onClick={() => saveField(channel.key)}
                              className="p-1.5 rounded-lg bg-amber-500 text-amber-950 hover:bg-amber-600 transition-colors cursor-pointer"
                              title="Save"
                            >
                              <Check className="w-3.5 h-3.5" />
                            </button>
                            <button
                              type="button"
                              onClick={cancelEditing}
                              className="p-1.5 rounded-lg bg-gray-200 dark:bg-dark-secondary text-gray-600 dark:text-dark-muted hover:bg-gray-300 transition-colors cursor-pointer"
                              title="Cancel"
                            >
                              <X className="w-3.5 h-3.5" />
                            </button>
                          </div>
                        ) : (
                          <>
                            <span className="block text-sm font-semibold text-gray-900 dark:text-dark-text truncate mt-0.5">
                              {channel.value}
                            </span>
                            <a
                              href={channel.href}
                              target={channel.isMail ? '_self' : '_blank'}
                              rel="noopener noreferrer"
                              className="text-xs text-accent font-medium mt-1 inline-flex items-center gap-1 hover:underline"
                            >
                              <span>{channel.actionText}</span>
                              <ExternalLink className="w-3 h-3" />
                            </a>
                          </>
                        )}
                      </div>
                    </div>

                    {/* Admin Edit Pencil Button */}
                    {isAdmin && !isCurrentlyEditing && (
                      <button
                        type="button"
                        onClick={() => startEditing(channel.key, channel.value)}
                        title={`Edit ${channel.label}`}
                        className="p-1.5 rounded-lg text-amber-600 hover:text-amber-700 bg-amber-500/10 hover:bg-amber-500/20 transition-colors cursor-pointer shrink-0"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                    )}
                  </div>
                </div>
              );
            })}

            {/* Note on Backend / Formspree */}
            <div className="p-4 rounded-xl bg-blue-50/60 dark:bg-dark-card border border-blue-200/60 dark:border-dark-border flex gap-3 text-xs text-gray-600 dark:text-dark-muted">
              <Info className="w-5 h-5 text-accent shrink-0 mt-0.5" />
              <div>
                <p className="font-semibold text-gray-900 dark:text-dark-text mb-1">
                  Need direct integration?
                </p>
                <p>
                  To receive inquiries straight to your inbox via the contact form, set your <code className="text-accent font-mono bg-blue-100/50 dark:bg-dark-secondary px-1 py-0.5 rounded">VITE_FORMSPREE_ENDPOINT</code> in the project's <code className="font-mono">.env</code> file.
                </p>
              </div>
            </div>
          </div>

          {/* Contact Form */}
          <div className="lg:col-span-7">
            <div className="bg-white dark:bg-dark-card rounded-2xl border border-gray-200 dark:border-dark-border p-6 sm:p-8 shadow-sm">
              <h4 className="text-xl font-bold text-gray-900 dark:text-dark-text mb-6">
                Send a Direct Message
              </h4>

              {/* Status Alert */}
              {statusMessage && (
                <div
                  className={`p-4 rounded-xl mb-6 flex items-start gap-3 text-sm ${
                    statusMessage.type === 'success'
                      ? 'bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-emerald-800 dark:text-emerald-300'
                      : 'bg-amber-50 dark:bg-amber-950/30 border border-amber-200 dark:border-amber-800 text-amber-800 dark:text-amber-300'
                  }`}
                >
                  {statusMessage.type === 'success' ? (
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                  ) : (
                    <AlertCircle className="w-5 h-5 text-amber-600 shrink-0 mt-0.5" />
                  )}
                  <div>
                    <span className="font-semibold block">
                      {statusMessage.type === 'success' ? 'Message Sent' : 'Notice'}
                    </span>
                    <span>{statusMessage.text}</span>
                  </div>
                </div>
              )}

              <form onSubmit={handleSubmit} noValidate className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {/* Name field */}
                  <div>
                    <label
                      htmlFor="contact-name"
                      className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1"
                    >
                      Your Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-name"
                      name="name"
                      type="text"
                      placeholder="Jane Doe"
                      value={formData.name}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 dark:bg-dark-secondary text-sm text-gray-900 dark:text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.name
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-dark-border'
                      }`}
                    />
                    {errors.name && (
                      <p className="text-xs text-red-500 mt-1">{errors.name}</p>
                    )}
                  </div>

                  {/* Email field */}
                  <div>
                    <label
                      htmlFor="contact-email"
                      className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1"
                    >
                      Your Email <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="contact-email"
                      name="email"
                      type="email"
                      placeholder="jane@example.com"
                      value={formData.email}
                      onChange={handleChange}
                      className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 dark:bg-dark-secondary text-sm text-gray-900 dark:text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent ${
                        errors.email
                          ? 'border-red-500 dark:border-red-500'
                          : 'border-gray-300 dark:border-dark-border'
                      }`}
                    />
                    {errors.email && (
                      <p className="text-xs text-red-500 mt-1">{errors.email}</p>
                    )}
                  </div>
                </div>

                {/* Subject field */}
                <div>
                  <label
                    htmlFor="contact-subject"
                    className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1"
                  >
                    Subject <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="contact-subject"
                    name="subject"
                    type="text"
                    placeholder="Workflow Automation / Web Application Inquiry"
                    value={formData.subject}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 dark:bg-dark-secondary text-sm text-gray-900 dark:text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent ${
                      errors.subject
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-gray-300 dark:border-dark-border'
                    }`}
                  />
                  {errors.subject && (
                    <p className="text-xs text-red-500 mt-1">{errors.subject}</p>
                  )}
                </div>

                {/* Message field */}
                <div>
                  <label
                    htmlFor="contact-message"
                    className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1"
                  >
                    Message Details <span className="text-red-500">*</span>
                  </label>
                  <textarea
                    id="contact-message"
                    name="message"
                    rows={5}
                    placeholder="Tell me about your business goals, project scope, or automation requirements..."
                    value={formData.message}
                    onChange={handleChange}
                    className={`w-full px-4 py-2.5 rounded-xl border bg-gray-50/50 dark:bg-dark-secondary text-sm text-gray-900 dark:text-dark-text placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-accent resize-none ${
                      errors.message
                        ? 'border-red-500 dark:border-red-500'
                        : 'border-gray-300 dark:border-dark-border'
                    }`}
                  />
                  {errors.message && (
                    <p className="text-xs text-red-500 mt-1">{errors.message}</p>
                  )}
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-accent hover:bg-accent-hover text-white font-semibold text-sm shadow-md shadow-accent/25 hover:shadow-accent/40 transition-all cursor-pointer focus:outline-none focus:ring-2 focus:ring-accent"
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Inquiry</span>
                  </button>
                </div>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
