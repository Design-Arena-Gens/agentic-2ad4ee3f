"use client";

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Navbar() {
  const pathname = usePathname();
  const tabs = [
    { href: '/', label: 'Room' },
  ];
  return (
    <nav className="sticky top-0 z-40 backdrop-blur bg-slate-950/40 border-b border-white/10">
      <div className="container-padded flex h-14 items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="h-7 w-7 rounded-lg bg-gradient-to-br from-violet-500 to-emerald-400" />
          <span className="font-semibold text-white/90">Creative Director's Room</span>
        </div>
        <div className="flex items-center gap-2">
          {tabs.map((t) => (
            <Link
              key={t.href}
              href={t.href}
              className={`px-3 py-1.5 rounded-md text-sm transition-colors ${
                pathname === t.href
                  ? 'bg-white/10 text-white'
                  : 'text-white/70 hover:text-white hover:bg-white/5'
              }`}
            >
              {t.label}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}
