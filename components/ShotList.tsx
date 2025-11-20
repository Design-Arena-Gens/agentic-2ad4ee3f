"use client";

import { useEffect, useMemo, useState } from 'react';

type Shot = { id: string; description: string; priority: 'A' | 'B' | 'C'; done: boolean };
const STORAGE_KEY = 'cdr_shots_v1';

export default function ShotList() {
  const [shots, setShots] = useState<Shot[]>([]);
  const [text, setText] = useState('');
  const [priority, setPriority] = useState<'A' | 'B' | 'C'>('A');

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setShots(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(shots));
    } catch {}
  }, [shots]);

  function addShot() {
    if (!text) return;
    setShots([{ id: crypto.randomUUID(), description: text, priority, done: false }, ...shots]);
    setText('');
  }

  const ordered = useMemo(
    () => [...shots].sort((a, b) => a.priority.localeCompare(b.priority)).sort((a, b) => Number(a.done) - Number(b.done)),
    [shots]
  );

  return (
    <div className="space-y-4">
      <div className="grid grid-cols-1 sm:grid-cols-5 gap-2">
        <input className="input sm:col-span-4" placeholder="Describe the shot..." value={text} onChange={(e) => setText(e.target.value)} />
        <div className="flex items-center gap-2">
          <select className="input" value={priority} onChange={(e) => setPriority(e.target.value as any)}>
            <option value="A">A</option>
            <option value="B">B</option>
            <option value="C">C</option>
          </select>
          <button className="btn" onClick={addShot}>Add</button>
        </div>
      </div>

      <ul className="space-y-2">
        {ordered.map((s) => (
          <li key={s.id} className="flex items-center justify-between gap-3 rounded-lg border border-white/10 bg-slate-900/50 p-3">
            <div className="flex items-center gap-3">
              <input
                type="checkbox"
                checked={s.done}
                onChange={(e) => setShots((prev) => prev.map((p) => (p.id === s.id ? { ...p, done: e.target.checked } : p)))}
              />
              <span className={`text-sm ${s.done ? 'line-through text-white/40' : 'text-white/80'}`}>{s.description}</span>
            </div>
            <div className="flex items-center gap-2">
              <span className="text-xs px-2 py-1 rounded bg-white/10">Priority {s.priority}</span>
              <button className="text-white/60 hover:text-white" onClick={() => setShots((prev) => prev.filter((p) => p.id !== s.id))}>Delete</button>
            </div>
          </li>
        ))}
        {shots.length === 0 && <div className="text-white/50">No shots yet. Build your plan.</div>}
      </ul>
    </div>
  );
}
