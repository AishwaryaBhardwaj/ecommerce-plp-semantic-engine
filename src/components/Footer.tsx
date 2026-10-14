'use client';

import React from 'react';
import Link from 'next/link';
import { Tent, ShieldCheck, Compass, Heart, ArrowUpRight } from 'lucide-react';

export const Footer: React.FC = () => {
  return (
    <footer className="mt-24 bg-slate-900 text-slate-400 text-xs border-t border-slate-800">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          {/* Brand info */}
          <div className="space-y-3 md:col-span-1">
            <div className="flex items-center gap-2 text-white">
              <div className="w-8 h-8 rounded-lg bg-emerald-600 flex items-center justify-center text-white">
                <Tent className="w-4 h-4" />
              </div>
              <span className="font-black text-sm tracking-tight">APEX OUTDOORS</span>
            </div>
            <p className="text-slate-400 text-xs leading-relaxed">
              Technical outdoor equipment engineered for high-wind alpine environments, thru-hiking trails, and backcountry expeditions.
            </p>
            <div className="pt-2 flex items-center gap-2 text-[11px] text-emerald-400">
              <ShieldCheck className="w-4 h-4" />
              <span>AEO Semantic Entity Architecture Active</span>
            </div>
          </div>

          {/* Category Hubs */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Tents & Shelters
            </h4>
            <ul className="space-y-2">
              <li>
                <Link href="/tents?season=4-Season" className="hover:text-emerald-400 transition">
                  Mountaineering 4-Season Tents
                </Link>
              </li>
              <li>
                <Link href="/tents?weight=Ultralight" className="hover:text-emerald-400 transition">
                  Ultralight Backpacking Tents
                </Link>
              </li>
              <li>
                <Link href="/tents?capacity=6-Person" className="hover:text-emerald-400 transition">
                  Family Basecamp Tents
                </Link>
              </li>
              <li>
                <Link href="/tents?brand=MSR" className="hover:text-emerald-400 transition">
                  MSR Expeditions Line
                </Link>
              </li>
            </ul>
          </div>

          {/* Technical Guides */}
          <div className="space-y-3">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px]">
              Architectural Guides
            </h4>
            <ul className="space-y-2">
              <li>
                <span className="text-slate-400">Geodesic vs Tunnel Pole Geometry</span>
              </li>
              <li>
                <span className="text-slate-400">Hydrostatic Head & DWR Coatings</span>
              </li>
              <li>
                <span className="text-slate-400">Easton Syclone vs Aluminum NFL</span>
              </li>
              <li>
                <span className="text-slate-400">Spindrift Snow Shedding Design</span>
              </li>
            </ul>
          </div>

          {/* Technical SEO Standards */}
          <div className="space-y-3 bg-slate-950/60 p-4 rounded-xl border border-slate-800">
            <h4 className="text-white font-bold uppercase tracking-wider text-[11px] flex items-center gap-1.5">
              <span>Technical SEO & AEO Spec</span>
            </h4>
            <p className="text-[11px] text-slate-400 leading-relaxed">
              Faceted navigation parameter updates are consolidated via canonical tags pointing to the category root to stop crawl budget bloat. Full ItemList and Product schemas are injected in the HTML head.
            </p>
            <div className="font-mono text-[10px] text-emerald-400">
              Canonical: /tents
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-slate-800 flex flex-wrap items-center justify-between gap-4 text-[11px] text-slate-500">
          <p>© {new Date().getFullYear()} Apex Outdoors Inc. All rights reserved.</p>
          <p className="flex items-center gap-1">
            Built for Next.js App Router • Programmatic Canonicalization • Schema.org ItemList
          </p>
        </div>
      </div>
    </footer>
  );
};
