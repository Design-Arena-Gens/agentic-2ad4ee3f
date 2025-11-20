"use client";

import { useEffect, useState } from 'react';

const STORAGE_KEY = 'cdr_brief_v1';

export default function BriefEditor() {
  const [brief, setBrief] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setBrief(saved);
    } catch {}
  }, []);

  useEffect(() => {
    const id = setTimeout(() => {
      try {
        localStorage.setItem(STORAGE_KEY, brief);
      } catch {}
    }, 300);
    return () => clearTimeout(id);
  }, [brief]);

  return (
    <div className="space-y-3">
      <textarea
        className="input w-full min-h-[200px]"
        placeholder={`Objective\nAudience\nTone\nReferences\nKey Deliverables`}
        value={brief}
        onChange={(e) => setBrief(e.target.value)}
      />
      <div className="text-xs text-white/50">Autosaved locally</div>
    </div>
  );
}
