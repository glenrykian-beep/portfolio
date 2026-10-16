import React, { useState } from 'react';
import {
  Cpu,
  Plus,
  Pencil,
  Trash2,
  X,
  Upload,
  Image as ImageIcon,
  Monitor,
  Laptop,
  HardDrive,
  Headphones,
  Check,
  AlertCircle,
} from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useContent } from '../context/ContentContext';

const categoryColors = {
  Computer: 'bg-blue-100 text-blue-800 dark:bg-blue-950/60 dark:text-blue-300 border-blue-200 dark:border-blue-900',
  Peripherals: 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950/60 dark:text-emerald-300 border-emerald-200 dark:border-emerald-900',
  Audio: 'bg-purple-100 text-purple-800 dark:bg-purple-950/60 dark:text-purple-300 border-purple-200 dark:border-purple-900',
  Networking: 'bg-orange-100 text-orange-800 dark:bg-orange-950/60 dark:text-orange-300 border-orange-200 dark:border-orange-900',
  Display: 'bg-indigo-100 text-indigo-800 dark:bg-indigo-950/60 dark:text-indigo-300 border-indigo-200 dark:border-indigo-900',
};

export default function TechEquipment() {
  const { isAdmin } = useAdmin();
  const { content, addEquipment, updateEquipment, removeEquipment } = useContent();

  const [modalOpen, setModalOpen] = useState(false);
  const [editingId, setEditingId] = useState(null);
  const [formData, setFormData] = useState({
    name: '',
    category: 'Computer',
    description: '',
    image: '',
  });
  const [formError, setFormError] = useState('');

  const equipmentList = content?.equipment || [];

  const handleOpenAdd = () => {
    setEditingId(null);
    setFormData({
      name: '',
      category: 'Computer',
      description: '',
      image: '',
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleOpenEdit = (item) => {
    setEditingId(item.id);
    setFormData({
      name: item.name || '',
      category: item.category || 'General',
      description: item.description || '',
      image: item.image || '',
    });
    setFormError('');
    setModalOpen(true);
  };

  const handleImageChange = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setFormError('Please select a valid image file (PNG, JPG, WebP).');
      return;
    }

    if (file.size > 3 * 1024 * 1024) {
      setFormError('Image size should be less than 3MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (event) => {
      setFormData((prev) => ({ ...prev, image: event.target.result }));
      setFormError('');
    };
    reader.onerror = () => {
      setFormError('Failed to read image file.');
    };
    reader.readAsDataURL(file);
  };

  const handleRemoveImage = () => {
    setFormData((prev) => ({ ...prev, image: '' }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!formData.name.trim()) {
      setFormError('Please enter equipment name.');
      return;
    }

    if (editingId) {
      updateEquipment(editingId, {
        name: formData.name.trim(),
        category: formData.category.trim() || 'General',
        description: formData.description.trim(),
        image: formData.image,
      });
    } else {
      addEquipment({
        name: formData.name.trim(),
        category: formData.category.trim() || 'General',
        description: formData.description.trim(),
        image: formData.image,
      });
    }

    setModalOpen(false);
  };

  const handleDelete = (id, name) => {
    if (window.confirm(`Are you sure you want to remove "${name}" from equipment?`)) {
      removeEquipment(id);
    }
  };

  return (
    <section
      id="equipment"
      className="py-20 bg-gray-50/50 dark:bg-dark-secondary/40 border-t border-gray-200 dark:border-dark-border relative"
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 sm:mb-16 gap-4">
          <div className="max-w-2xl">
            <h2 className="text-xs sm:text-sm uppercase tracking-widest text-accent font-semibold mb-2">
              Hardware &amp; Workspace
            </h2>
            <h3 className="text-3xl sm:text-4xl font-extrabold text-gray-900 dark:text-dark-text tracking-tight mb-3">
              Tech Equipment
            </h3>
            <p className="text-gray-600 dark:text-dark-muted text-base sm:text-lg">
              Hardware and tools that power my development workflow.
            </p>
          </div>

          {/* Admin Add Button */}
          {isAdmin && (
            <button
              type="button"
              onClick={handleOpenAdd}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-bold text-sm shadow-md shadow-amber-500/20 hover:shadow-amber-500/30 transition-all cursor-pointer self-start md:self-auto"
            >
              <Plus className="w-4 h-4 stroke-[2.5]" />
              <span>Add Equipment</span>
            </button>
          )}
        </div>

        {/* Empty State */}
        {equipmentList.length === 0 ? (
          <div className="flex flex-col items-center justify-center p-12 sm:p-16 rounded-3xl bg-white dark:bg-dark-card border-2 border-dashed border-gray-300 dark:border-dark-border text-center max-w-xl mx-auto">
            <div className="w-16 h-16 rounded-2xl bg-gray-100 dark:bg-dark-secondary flex items-center justify-center text-gray-400 dark:text-dark-muted mb-4">
              <Cpu className="w-8 h-8" />
            </div>
            <h4 className="text-lg font-bold text-gray-900 dark:text-dark-text mb-1">
              No equipment added yet
            </h4>
            <p className="text-sm text-gray-500 dark:text-dark-muted max-w-sm mb-6">
              Hardware setup, monitors, development rigs, and workflow tools will appear here.
            </p>
            {isAdmin && (
              <button
                type="button"
                onClick={handleOpenAdd}
                className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-600 text-amber-950 font-semibold text-sm transition-colors cursor-pointer"
              >
                <Plus className="w-4 h-4" />
                <span>Add Your First Equipment</span>
              </button>
            )}
          </div>
        ) : (
          /* Equipment Responsive Grid: 2 cols mobile, 3 cols tablet, 4 cols desktop */
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 sm:gap-6">
            {equipmentList.map((item) => {
              const badgeClass =
                categoryColors[item.category] ||
                'bg-gray-100 text-gray-800 dark:bg-dark-secondary dark:text-dark-text border-gray-200 dark:border-dark-border';

              return (
                <div
                  key={item.id}
                  className={`group relative rounded-2xl bg-white dark:bg-dark-card border p-4 shadow-sm hover:shadow-md transition-all duration-200 flex flex-col justify-between overflow-hidden ${
                    isAdmin
                      ? 'border-amber-400/60 dark:border-amber-500/50 hover:border-amber-500'
                      : 'border-gray-200 dark:border-dark-border hover:border-accent/40'
                  }`}
                >
                  {/* Admin Action Buttons Overlay */}
                  {isAdmin && (
                    <div className="absolute top-2 left-2 right-2 flex items-center justify-between z-20 pointer-events-auto">
                      <button
                        type="button"
                        onClick={() => handleOpenEdit(item)}
                        title="Edit equipment"
                        className="p-1.5 rounded-lg bg-amber-500 text-amber-950 hover:bg-amber-600 shadow-md transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Pencil className="w-3.5 h-3.5" />
                      </button>
                      <button
                        type="button"
                        onClick={() => handleDelete(item.id, item.name)}
                        title="Delete equipment"
                        className="p-1.5 rounded-lg bg-red-600 text-white hover:bg-red-700 shadow-md transition-transform hover:scale-105 cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                      </button>
                    </div>
                  )}

                  <div>
                    {/* Square Image Area */}
                    <div className="w-full aspect-square rounded-xl bg-gray-100 dark:bg-dark-secondary overflow-hidden flex items-center justify-center relative mb-3 border border-gray-100 dark:border-dark-border/50">
                      {item.image ? (
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                        />
                      ) : (
                        <div className="flex flex-col items-center justify-center text-gray-400 dark:text-dark-muted p-4 text-center">
                          <Monitor className="w-10 h-10 mb-2 stroke-[1.5]" />
                          <span className="text-[11px] font-medium tracking-wide">No image</span>
                        </div>
                      )}
                    </div>

                    {/* Category Badge */}
                    <div className="mb-2">
                      <span
                        className={`inline-block text-[11px] font-semibold px-2.5 py-0.5 rounded-full border ${badgeClass}`}
                      >
                        {item.category || 'General'}
                      </span>
                    </div>

                    {/* Equipment Name */}
                    <h4 className="font-bold text-gray-900 dark:text-dark-text text-sm sm:text-base leading-snug line-clamp-2 mb-1.5">
                      {item.name}
                    </h4>

                    {/* Equipment Description */}
                    {item.description && (
                      <p className="text-xs text-gray-500 dark:text-dark-muted leading-relaxed line-clamp-3">
                        {item.description}
                      </p>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        )}
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
            {/* Modal Header */}
            <div className="flex items-center justify-between pb-4 mb-4 border-b border-gray-200 dark:border-dark-border">
              <div className="flex items-center gap-2.5">
                <div className="w-9 h-9 rounded-xl bg-amber-500/10 text-amber-600 dark:text-amber-400 flex items-center justify-center">
                  <Cpu className="w-5 h-5" />
                </div>
                <h3 className="text-lg font-bold text-gray-900 dark:text-dark-text">
                  {editingId ? 'Edit Tech Equipment' : 'Add Tech Equipment'}
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
              {/* Name */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1">
                  Equipment Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  required
                  placeholder="e.g. Dell UltraSharp 27'' 4K Monitor"
                  value={formData.name}
                  onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-secondary text-gray-900 dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
              </div>

              {/* Category */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1">
                  Category
                </label>
                <input
                  type="text"
                  placeholder="e.g. Computer, Peripherals, Audio, Networking, Display"
                  value={formData.category}
                  onChange={(e) => setFormData((prev) => ({ ...prev, category: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-secondary text-gray-900 dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent"
                />
                <div className="flex flex-wrap gap-1.5 mt-1.5">
                  {['Computer', 'Peripherals', 'Audio', 'Networking', 'Display'].map((cat) => (
                    <button
                      key={cat}
                      type="button"
                      onClick={() => setFormData((prev) => ({ ...prev, category: cat }))}
                      className={`text-[11px] px-2 py-0.5 rounded-md border transition-colors cursor-pointer ${
                        formData.category === cat
                          ? 'bg-accent text-white border-accent'
                          : 'bg-gray-100 dark:bg-dark-secondary text-gray-600 dark:text-dark-muted border-gray-200 dark:border-dark-border hover:bg-gray-200'
                      }`}
                    >
                      {cat}
                    </button>
                  ))}
                </div>
              </div>

              {/* Description */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1">
                  Description / Specs
                </label>
                <textarea
                  rows={3}
                  placeholder="Key specs, usage in daily development, or model details..."
                  value={formData.description}
                  onChange={(e) => setFormData((prev) => ({ ...prev, description: e.target.value }))}
                  className="w-full px-4 py-2.5 rounded-xl border border-gray-300 dark:border-dark-border bg-gray-50 dark:bg-dark-secondary text-gray-900 dark:text-dark-text text-sm focus:outline-none focus:ring-2 focus:ring-accent resize-none"
                />
              </div>

              {/* Image Upload Area */}
              <div>
                <label className="block text-xs font-semibold text-gray-700 dark:text-dark-text mb-1">
                  Equipment Photo
                </label>

                {formData.image ? (
                  <div className="relative w-36 h-36 rounded-xl overflow-hidden border border-gray-200 dark:border-dark-border group">
                    <img
                      src={formData.image}
                      alt="Preview"
                      className="w-full h-full object-cover"
                    />
                    <button
                      type="button"
                      onClick={handleRemoveImage}
                      className="absolute top-1.5 right-1.5 p-1 rounded-lg bg-black/60 text-white hover:bg-red-600 transition-colors cursor-pointer"
                      title="Remove image"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>
                ) : (
                  <label className="flex flex-col items-center justify-center p-6 border-2 border-dashed border-gray-300 dark:border-dark-border rounded-xl cursor-pointer hover:border-accent hover:bg-gray-50/50 dark:hover:bg-dark-secondary/50 transition-colors">
                    <Upload className="w-7 h-7 text-gray-400 mb-2" />
                    <span className="text-xs font-semibold text-gray-700 dark:text-dark-text">
                      Choose Photo
                    </span>
                    <span className="text-[11px] text-gray-400 dark:text-dark-muted mt-0.5">
                      PNG, JPG, WebP up to 3MB
                    </span>
                    <input
                      type="file"
                      accept="image/*"
                      onChange={handleImageChange}
                      className="hidden"
                    />
                  </label>
                )}
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
                  {editingId ? 'Save Changes' : 'Add Equipment'}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </section>
  );
}
