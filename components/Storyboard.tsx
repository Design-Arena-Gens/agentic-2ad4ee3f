"use client";

import { useEffect, useState } from 'react';

type Frame = { id: string; title: string; note: string };
const STORAGE_KEY = 'cdr_storyboard_v1';

export default function Storyboard() {
  const [frames, setFrames] = useState<Frame[]>([]);
  const [title, setTitle] = useState('');
  const [note, setNote] = useState('');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setFrames(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(frames));
    } catch {}
  }, [frames]);

  function addFrame() {
    if (!title && !note) return;
    setFrames([{ id: crypto.randomUUID(), title, note }, ...frames]);
    setTitle('');
    setNote('');
  }

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        <input className="input sm:col-span-2" placeholder="Frame title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input className="input sm:col-span-3" placeholder="Frame note" value={note} onChange={(e) => setNote(e.target.value)} />
        <button className="btn sm:col-span-5" onClick={addFrame}>Add Frame</button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
        {frames.map((f) => (
          <div key={f.id} className="rounded-xl border border-white/10 bg-slate-900/50 p-4">
            <div className="flex items-start justify-between gap-3">
              <div>
                <h4 className="font-semibold text-white/90">{f.title || 'Untitled frame'}</h4>
                <p className="text-sm text-white/60 mt-1">{f.note || 'No notes yet.'}</p>
              </div>
              <button
                className="text-white/60 hover:text-white/90"
                onClick={() => setFrames((prev) => prev.filter((p) => p.id !== f.id))}
              >
                Delete
              </button>
            </div>
          </div>
        ))}
        {frames.length === 0 && <div className="text-white/50">No frames yet. Sketch your narrative beats.</div>}
      </div>
    </div>
  );
}
