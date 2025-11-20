"use client";

import { useEffect, useRef, useState } from 'react';

type MoodItem = { id: string; dataUrl: string };
const STORAGE_KEY = 'cdr_mood_items_v1';

export default function MoodBoard() {
  const [items, setItems] = useState<MoodItem[]>([]);
  const inputRef = useRef<HTMLInputElement | null>(null);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setItems(JSON.parse(saved));
    } catch {}
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(items));
    } catch {}
  }, [items]);

  function onFiles(files: FileList | null) {
    if (!files) return;
    const readers = Array.from(files).slice(0, 20).map(
      (file) =>
        new Promise<MoodItem>((resolve) => {
          const reader = new FileReader();
          reader.onload = () => resolve({ id: crypto.randomUUID(), dataUrl: String(reader.result) });
          reader.readAsDataURL(file);
        })
    );
    Promise.all(readers).then((newItems) => setItems((prev) => [...newItems, ...prev].slice(0, 60)));
  }

  function onDrop(e: React.DragEvent<HTMLDivElement>) {
    e.preventDefault();
    onFiles(e.dataTransfer.files);
  }

  return (
    <div>
      <div
        onDragOver={(e) => e.preventDefault()}
        onDrop={onDrop}
        className="mb-4 border-2 border-dashed border-white/15 rounded-xl p-6 flex flex-col items-center justify-center text-white/70 hover:border-white/25 transition-colors"
      >
        <p className="mb-3">Drag & drop images here</p>
        <div className="flex items-center gap-3">
          <button className="btn" onClick={() => inputRef.current?.click()}>Upload</button>
          <button className="px-4 py-2 rounded-lg bg-white/10 hover:bg-white/15" onClick={() => setItems([])}>Clear</button>
        </div>
        <input ref={inputRef} type="file" accept="image/*" multiple className="hidden" onChange={(e) => onFiles(e.target.files)} />
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-3">
        {items.map((it) => (
          <figure key={it.id} className="group relative overflow-hidden rounded-xl bg-slate-800/40 border border-white/10">
            <img src={it.dataUrl} alt="mood" className="w-full h-40 object-cover" />
            <button
              className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity text-xs bg-black/60 px-2 py-1 rounded"
              onClick={() => setItems((prev) => prev.filter((p) => p.id !== it.id))}
            >
              Remove
            </button>
          </figure>
        ))}
        {items.length === 0 && (
          <div className="col-span-full text-center text-white/50 py-6">No images yet. Add some inspiration!</div>
        )}
      </div>
    </div>
  );
}
