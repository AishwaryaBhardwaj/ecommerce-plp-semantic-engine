'use client';

import React, { useState } from 'react';
import { TentProduct } from '../types/product';
import { 
  generateBreadcrumbSchema, 
  generateItemListSchema, 
  generateEntityGraph,
  CANONICAL_URL 
} from '../lib/seoSchema';
import { 
  X, 
  Copy, 
  Check, 
  Code2, 
  Link as LinkIcon, 
  ShieldCheck, 
  FileJson, 
  Sparkles,
  ExternalLink,
  Layers
} from 'lucide-react';

interface SeoAeoInspectorModalProps {
  isOpen: boolean;
  onClose: () => void;
  products: TentProduct[];
  currentBrowserUrl: string;
}

export const SeoAeoInspectorModal: React.FC<SeoAeoInspectorModalProps> = ({
  isOpen,
  onClose,
  products,
  currentBrowserUrl,
}) => {
  const [activeTab, setActiveTab] = useState<'canonical' | 'itemlist' | 'breadcrumbs' | 'graph'>('canonical');
  const [copied, setCopied] = useState(false);

  if (!isOpen) return null;

  const breadcrumbSchema = generateBreadcrumbSchema();
  const itemListSchema = generateItemListSchema(products);
  const entityGraphSchema = generateEntityGraph(products);

  const getActiveCode = () => {
    switch (activeTab) {
      case 'itemlist':
        return JSON.stringify(itemListSchema, null, 2);
      case 'breadcrumbs':
        return JSON.stringify(breadcrumbSchema, null, 2);
      case 'graph':
        return JSON.stringify(entityGraphSchema, null, 2);
      default:
        return `<link rel="canonical" href="${CANONICAL_URL}" />`;
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(getActiveCode());
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl w-full max-w-4xl max-h-[90vh] flex flex-col shadow-2xl overflow-hidden text-slate-100">
        
        {/* Modal Header */}
        <div className="p-5 sm:p-6 border-b border-slate-800 flex items-center justify-between bg-slate-900/90">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-emerald-600/30 border border-emerald-500/40 flex items-center justify-center text-emerald-400">
              <Code2 className="w-5 h-5" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h3 className="text-lg font-black tracking-tight text-white">
                  Technical SEO & AEO Live Inspector
                </h3>
                <span className="bg-emerald-500/20 text-emerald-300 text-[11px] font-bold px-2 py-0.5 rounded-full border border-emerald-500/30">
                  Head Tag Active
                </span>
              </div>
              <p className="text-xs text-slate-400">
                Inspect canonical link tag, JSON-LD schemas, and entity relationship mappings in real time.
              </p>
            </div>
          </div>

          <button
            onClick={onClose}
            className="p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Inspector Navigation Tabs */}
        <div className="flex border-b border-slate-800 bg-slate-950/40 px-6 gap-2 overflow-x-auto text-xs font-semibold">
          <button
            onClick={() => setActiveTab('canonical')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition whitespace-nowrap ${
              activeTab === 'canonical'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <ShieldCheck className="w-4 h-4" />
            <span>Canonical & Anti-Bloat</span>
          </button>

          <button
            onClick={() => setActiveTab('itemlist')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition whitespace-nowrap ${
              activeTab === 'itemlist'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <FileJson className="w-4 h-4" />
            <span>ItemList & Product JSON-LD ({products.length})</span>
          </button>

          <button
            onClick={() => setActiveTab('breadcrumbs')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition whitespace-nowrap ${
              activeTab === 'breadcrumbs'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Layers className="w-4 h-4" />
            <span>BreadcrumbList Schema</span>
          </button>

          <button
            onClick={() => setActiveTab('graph')}
            className={`py-3 px-3.5 border-b-2 flex items-center gap-2 cursor-pointer transition whitespace-nowrap ${
              activeTab === 'graph'
                ? 'border-emerald-500 text-emerald-400 font-bold'
                : 'border-transparent text-slate-400 hover:text-slate-200'
            }`}
          >
            <Sparkles className="w-4 h-4" />
            <span>AEO Knowledge Graph (@graph)</span>
          </button>
        </div>

        {/* Tab Content Area */}
        <div className="p-6 flex-1 overflow-y-auto space-y-5">
          {activeTab === 'canonical' && (
            <div className="space-y-6">
              {/* Problem vs Solution explanation */}
              <div className="bg-emerald-950/30 border border-emerald-500/30 rounded-2xl p-5 space-y-3">
                <div className="flex items-center gap-2 text-emerald-400 font-bold text-sm">
                  <ShieldCheck className="w-5 h-5" />
                  <span>The Problem: Faceted Index Bloat</span>
                </div>
                <p className="text-xs text-slate-300 leading-relaxed">
                  In large e-commerce catalogs, every combination of brand, size, capacity, and price creates millions of unique filter URLs (e.g., <code className="text-emerald-300 font-mono bg-slate-900 px-1 py-0.5 rounded">/tents?brand=coleman&capacity=4P&price=150-350</code>). Without programmatic canonicalization, Googlebot wastes its crawl budget indexing duplicate pages, diluting domain authority and causing index bloat.
                </p>
                <div className="pt-2 text-xs text-emerald-300 font-medium">
                  <strong>Our Architectural Fix:</strong> Even as users toggle filters and update browser URL parameters programmatically, the <code className="font-mono bg-slate-900 px-1 py-0.5 rounded">&lt;link rel=&quot;canonical&quot;&gt;</code> tag remains permanently anchored to the root category URL <code className="font-mono bg-slate-900 px-1 py-0.5 rounded">{CANONICAL_URL}</code>.
                </div>
              </div>

              {/* Live URL comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">
                    Current Browser URL (with Facet Parameters):
                  </span>
                  <div className="font-mono text-xs text-amber-400 bg-slate-900 p-2.5 rounded-lg border border-slate-800 break-all">
                    {currentBrowserUrl}
                  </div>
                  <span className="text-[10px] text-slate-500 block">
                    User UX state preserved without page reload.
                  </span>
                </div>

                <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5">
                  <span className="text-[11px] font-bold text-emerald-400 uppercase tracking-wider block">
                    Rendered &lt;link rel=&quot;canonical&quot;&gt; in &lt;head&gt;:
                  </span>
                  <div className="font-mono text-xs text-emerald-300 bg-slate-900 p-2.5 rounded-lg border border-slate-800 break-all">
                    {CANONICAL_URL}
                  </div>
                  <span className="text-[10px] text-emerald-500/80 block">
                    Consolidates all indexing signals strictly to root category.
                  </span>
                </div>
              </div>

              {/* Code Snippet of Head Link */}
              <div className="space-y-2">
                <span className="text-xs font-bold text-slate-300">HTML Head Injected Tag:</span>
                <pre className="bg-slate-950 p-4 rounded-xl text-xs font-mono text-emerald-400 border border-slate-800 overflow-x-auto">
{`<link rel="canonical" href="${CANONICAL_URL}" />
<meta name="robots" content="index, follow" />`}
                </pre>
              </div>
            </div>
          )}

          {activeTab !== 'canonical' && (
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-xs font-mono text-slate-400">
                  {activeTab === 'itemlist' && 'Injected via <script type="application/ld+json">'}
                  {activeTab === 'breadcrumbs' && 'BreadcrumbList hierarchy schema for Google Search & SGE'}
                  {activeTab === 'graph' && 'Entity-relationship graph for LLM multi-hop reasoning'}
                </span>

                <button
                  onClick={handleCopy}
                  className="inline-flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-xs text-slate-200 px-3 py-1.5 rounded-lg transition cursor-pointer"
                >
                  {copied ? (
                    <>
                      <Check className="w-3.5 h-3.5 text-emerald-400" />
                      <span className="text-emerald-400 font-bold">Copied JSON</span>
                    </>
                  ) : (
                    <>
                      <Copy className="w-3.5 h-3.5" />
                      <span>Copy Schema</span>
                    </>
                  )}
                </button>
              </div>

              <div className="relative">
                <pre className="bg-slate-950 p-4 rounded-2xl text-[11px] font-mono text-emerald-300/90 border border-slate-800 max-h-[50vh] overflow-auto leading-relaxed">
                  {getActiveCode()}
                </pre>
              </div>
            </div>
          )}
        </div>

        {/* Modal Footer */}
        <div className="p-4 bg-slate-950/80 border-t border-slate-800 flex items-center justify-between text-xs text-slate-400">
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse"></span>
            <span>Schema.org Standards: ItemList, Product, BreadcrumbList, Offer</span>
          </div>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-white font-bold rounded-xl transition cursor-pointer"
          >
            Close Inspector
          </button>
        </div>
      </div>
    </div>
  );
};
