import React, { useState } from 'react';
import { Shield, LogOut, Edit3, Sparkles, Upload, Check } from 'lucide-react';
import { useAdmin } from '../context/AdminContext';
import { useContent } from '../context/ContentContext';

export default function AdminToolbar() {
  const { isAdmin, logout } = useAdmin();
  const { publishChanges } = useContent();
  const [isPublishing, setIsPublishing] = useState(false);
  const [publishedSuccess, setPublishedSuccess] = useState(false);

  if (!isAdmin) return null;

  const handlePublish = async () => {
    setIsPublishing(true);
    const success = await publishChanges();
    setIsPublishing(false);
    if (success) {
      setPublishedSuccess(true);
      setTimeout(() => setPublishedSuccess(false), 3000);
    }
  };

  return (
    <div className="fixed top-16 left-0 right-0 z-40 bg-gradient-to-r from-amber-500 via-amber-400 to-amber-500 text-amber-950 px-4 py-2 sm:h-10 sm:py-0 flex flex-wrap items-center justify-between text-xs sm:text-sm font-semibold shadow-lg border-b border-amber-600/30 backdrop-blur-md">
      <div className="flex items-center gap-2 sm:gap-3">
        <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-amber-950/15 text-amber-950">
          <Shield className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-amber-900" />
          <span className="font-bold text-[11px] sm:text-xs uppercase tracking-wider">Admin Mode</span>
        </div>
        <span className="hidden sm:inline text-amber-950/90 font-medium">
          Click any <span className="inline-flex items-center gap-0.5 font-bold underline decoration-amber-950/40"><Edit3 className="w-3 h-3 inline" /> Edit</span> button to modify content in real-time
        </span>
      </div>

      <div className="flex items-center gap-3">
        <button
          type="button"
          onClick={handlePublish}
          disabled={isPublishing}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-950 hover:bg-black text-amber-300 transition-all text-xs font-bold shadow hover:shadow-md cursor-pointer active:scale-95 disabled:opacity-50"
          title="Push all edits and uploaded photos to cloud for customer view"
        >
          {publishedSuccess ? (
            <>
              <Check className="w-3.5 h-3.5 text-emerald-400" />
              <span>Published to Customers!</span>
            </>
          ) : isPublishing ? (
            <>
              <Upload className="w-3.5 h-3.5 animate-pulse" />
              <span>Publishing...</span>
            </>
          ) : (
            <>
              <Upload className="w-3.5 h-3.5" />
              <span>Publish to Customers</span>
            </>
          )}
        </button>

        <button
          onClick={logout}
          className="flex items-center gap-1.5 px-3 py-1 rounded-lg bg-amber-900 hover:bg-amber-950 text-white transition-all text-xs font-semibold shadow hover:shadow-md cursor-pointer active:scale-95"
          title="Sign out of Admin Mode"
        >
          <LogOut className="w-3.5 h-3.5" />
          <span>Log Out</span>
        </button>
      </div>
    </div>
  );
}
