"use client";

import { Playfair_Display, Montserrat } from 'next/font/google';
import { useState } from 'react';

const playfair = Playfair_Display({ subsets: ['latin'] });
const montserrat = Montserrat({ subsets: ['latin'] });

const pairs = [
  { id: 'pf+ms', heading: playfair.className, body: montserrat.className, name: 'Playfair Display + Montserrat' },
  { id: 'ms+ms', heading: montserrat.className, body: montserrat.className, name: 'Montserrat + Montserrat' },
];

export default function TypographyBoard() {
  const [active, setActive] = useState(pairs[0]);

  return (
    <div className="space-y-4">
      <div className="flex items-center gap-2">
        {pairs.map((p) => (
          <button
            key={p.id}
            className={`px-3 py-2 rounded-lg text-sm border ${
              active.id === p.id ? 'bg-white/10 border-white/20' : 'bg-transparent border-white/10 hover:bg-white/5'
            }`}
            onClick={() => setActive(p)}
          >
            {p.name}
          </button>
        ))}
      </div>

      <div className="rounded-xl border border-white/10 bg-slate-900/50 p-5">
        <h3 className={`${active.heading} text-2xl text-white/90`}>Heading Typography Showcase</h3>
        <p className={`${active.body} text-white/70 mt-2`}>
          Body text pairing for readability and tone. Adjust size, weight, and spacing to align with the
          brand voice and medium. Typography shapes perception?choose wisely.
        </p>
      </div>
    </div>
  );
}
