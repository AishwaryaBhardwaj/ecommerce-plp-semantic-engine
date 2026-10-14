import type { Metadata } from 'next';
import { Suspense } from 'react';
import { TentsCategoryPage } from '@/components/TentsCategoryPage';

export const metadata: Metadata = {
  title: 'Outdoor Camping Tents | Ultralight & High-Wind Expedition Hub | Apex Outdoors',
  description: 'Shop outdoor camping and backpacking tents. Programmatic faceted filtering for Brand, Capacity, and Price with canonical URL consolidation to prevent index bloat.',
  alternates: {
    canonical: 'https://apexoutdoors.com/tents',
  },
  robots: {
    index: true,
    follow: true,
  },
  openGraph: {
    title: 'Outdoor Camping Tents | Apex Outdoors Category Hub',
    description: 'Explore high-wind mountaineering tents, ultralight thru-hiking shelters, and family camping models.',
    url: 'https://apexoutdoors.com/tents',
    siteName: 'Apex Outdoors',
    images: [
      {
        url: 'https://images.unsplash.com/photo-1510312305653-8ed496efae75?auto=format&fit=crop&w=1200&q=80',
        width: 1200,
        height: 630,
        alt: 'Camping Tents in Alpine Valley',
      },
    ],
    type: 'website',
  },
};

export default function TentsPage() {
  return (
    <Suspense 
      fallback={
        <div className="min-h-screen flex items-center justify-center bg-slate-900 text-emerald-400 font-mono text-sm">
          <div className="flex items-center gap-3">
            <span className="w-3 h-3 rounded-full bg-emerald-400 animate-ping"></span>
            <span>Initializing Tents Category Hub & Ingesting Schema...</span>
          </div>
        </div>
      }
    >
      <TentsCategoryPage />
    </Suspense>
  );
}
