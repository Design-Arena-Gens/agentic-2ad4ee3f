"use client";

import { useEffect, useState } from 'react';

type Swatch = { id: string; hex: string };
const STORAGE_KEY = 'cdr_palette_v1';

function randomHex() {
  return `#${Math.floor(Math.random() * 0xffffff)
    .toString(16)
    .padStart(6, '0')}`;
}

export default function ColorPalette() {
  const [swatches, setSwatches] = useState<Swatch[]>([]);

  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setSwatches(JSON.parse(saved));
      else setSwatches(Array.from({ length: 5 }, () => ({ id: crypto.randomUUID(), hex: randomHex() })));
    } catch {
      setSwatches(Array.from({ length: 5 }, () => ({ id: crypto.randomUUID(), hex: randomHex() })));
    }
  }, []);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(swatches));
    } catch {}
  }, [swatches]);

  function shuffle() {
    setSwatches((prev) => prev.map((p) => ({ ...p, hex: randomHex() })));
  }

  async function copy(text: string) {
    try {
      await navigator.clipboard.writeText(text);
    } catch {}
  }

  return (
    <div>
      <div className="flex items-center justify-between mb-4">
        <div className="text-white/60 text-sm">Click a swatch to copy HEX</div>
        <button className="btn" onClick={shuffle}>Shuffle</button>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-5 gap-3">
        {swatches.map((s) => (
          <button
            key={s.id}
            onClick={() => copy(s.hex)}
            className="group rounded-xl overflow-hidden border border-white/10 bg-slate-900/40"
          >
            <div className="h-20" style={{ backgroundColor: s.hex }} />
            <div className="p-2 text-center text-xs text-white/80 group-hover:bg-white/5">{s.hex}</div>
          </button>
        ))}
      </div>
    </div>
  );
}
