'use client';

import React from 'react';
import Link from 'next/link';
import { 
  Tent, 
  Search, 
  ShoppingBag, 
  SlidersHorizontal, 
  Code2, 
  ShieldCheck, 
  ChevronRight, 
  Sparkles,
  Info
} from 'lucide-react';

interface HeaderProps {
  onOpenInspector: () => void;
  canonicalUrl: string;
  activeFilterCount: number;
  productCount: number;
}

export const Header: React.FC<HeaderProps> = ({
  onOpenInspector,
  canonicalUrl,
  activeFilterCount,
  productCount,
}) => {
  return (
    <header className="sticky top-0 z-40 bg-white/95 backdrop-blur-md border-b border-slate-200 shadow-xs">
      {/* Top Technical SEO & AEO Banner */}
      <div className="bg-slate-900 text-slate-200 text-xs px-4 py-2 border-b border-slate-800">
        <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
          <div className="flex items-center gap-2">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
            </span>
            <span className="font-semibold text-emerald-400">Technical SEO & AEO Hub:</span>
            <span className="text-slate-300 hidden sm:inline">
              Faceted URL consolidation active. Canonical locked to <code className="text-emerald-300 bg-slate-800 px-1.5 py-0.5 rounded text-[11px]">/tents</code>
            </span>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={onOpenInspector}
              className="inline-flex items-center gap-1.5 bg-emerald-600/30 hover:bg-emerald-600/50 text-emerald-300 border border-emerald-500/40 px-2.5 py-1 rounded text-xs font-medium transition cursor-pointer"
              title="Inspect Canonical Tag and JSON-LD Schema"
            >
              <Code2 className="w-3.5 h-3.5" />
              <span>SEO & Schema Inspector</span>
              <span className="bg-emerald-500 text-slate-950 font-bold px-1.5 py-0.2 rounded-full text-[10px] ml-1">
                Active
              </span>
            </button>
          </div>
        </div>
      </div>

      {/* Main Navigation Bar */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-18">
          {/* Brand Logo */}
          <Link href="/tents" className="flex items-center gap-3 group">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-600 to-teal-800 flex items-center justify-center text-white shadow-md shadow-emerald-900/20 group-hover:scale-105 transition-transform">
              <Tent className="w-5 h-5" />
            </div>
            <div>
              <span className="text-xl font-black tracking-tight text-slate-900 block leading-tight">
                APEX <span className="text-emerald-700">OUTDOORS</span>
              </span>
              <span className="text-[11px] font-semibold uppercase tracking-wider text-slate-500 block">
                Technical Expedition Gear
              </span>
            </div>
          </Link>

          {/* Search bar */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <input
                type="text"
                placeholder="Search tents (e.g. 'high wind', 'ultralight', 'MSR')..."
                className="w-full bg-slate-50 hover:bg-white focus:bg-white text-slate-900 text-sm rounded-full pl-10 pr-4 py-2 border border-slate-300 focus:outline-none focus:ring-2 focus:ring-emerald-600/30 focus:border-emerald-600 transition"
                readOnly
                onClick={onOpenInspector}
              />
              <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
              <span className="absolute right-3 top-2 text-[10px] text-slate-400 bg-slate-200/80 px-1.5 py-0.5 rounded font-mono">
                AEO Ready
              </span>
            </div>
          </div>

          {/* Action Links & Cart */}
          <div className="flex items-center gap-4">
            <button
              onClick={onOpenInspector}
              className="hidden lg:flex items-center gap-1.5 text-xs text-slate-600 hover:text-emerald-700 font-medium py-1.5 px-3 rounded-lg hover:bg-slate-100 transition"
            >
              <ShieldCheck className="w-4 h-4 text-emerald-600" />
              <span>Anti-Bloat Engine</span>
            </button>

            <div className="flex items-center gap-2">
              <div className="relative p-2 rounded-lg text-slate-700 hover:bg-slate-100 transition cursor-pointer">
                <ShoppingBag className="w-5 h-5" />
                <span className="absolute top-1 right-1 w-4 h-4 rounded-full bg-emerald-600 text-white text-[10px] font-bold flex items-center justify-center">
                  2
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Breadcrumb Hierarchy (Semantic Navigation for AEO) */}
      <nav aria-label="Breadcrumb" className="bg-slate-50/80 border-t border-slate-200/80 px-4 py-2 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <ol className="flex items-center space-x-2 flex-wrap">
            <li>
              <Link href="/tents" className="hover:text-emerald-700 transition">
                Home
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <li>
              <Link href="/tents" className="hover:text-emerald-700 transition">
                Camping & Hiking Gear
              </Link>
            </li>
            <ChevronRight className="w-3.5 h-3.5 text-slate-400 shrink-0" />
            <li className="font-semibold text-slate-900">
              Outdoor Camping Tents
            </li>
          </ol>

          <div className="hidden sm:flex items-center gap-2 text-slate-500 text-[11px]">
            <span>Category Root:</span>
            <span className="font-mono text-emerald-700 font-semibold bg-emerald-50 px-2 py-0.5 rounded border border-emerald-200">
              {canonicalUrl}
            </span>
          </div>
        </div>
      </nav>
    </header>
  );
};
