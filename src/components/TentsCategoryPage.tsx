'use client';

import React, { useState, useEffect, useMemo, useTransition } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import Head from 'next/head';
import { TentProduct, FacetFilters, TentBrand, TentCapacity, SeasonRating, WeightCategory } from '../types/product';
import { TENTS_CATALOG } from '../data/tentsData';
import { 
  generateBreadcrumbSchema, 
  generateItemListSchema, 
  generateEntityGraph,
  CANONICAL_URL,
  CATEGORY_ROOT_PATH 
} from '../lib/seoSchema';
import { Header } from './Header';
import { FacetSidebar } from './FacetSidebar';
import { ProductGrid } from './ProductGrid';
import { SemanticBuyingBlock } from './SemanticBuyingBlock';
import { SeoAeoInspectorModal } from './SeoAeoInspectorModal';
import { QuickViewModal } from './QuickViewModal';
import { Footer } from './Footer';

export const TentsCategoryPage: React.FC = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const [isPending, startTransition] = useTransition();

  // State for technical modal and quick view
  const [inspectorOpen, setInspectorOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState<TentProduct | null>(null);

  // Parse initial filters from URL search params
  const [filters, setFilters] = useState<FacetFilters>(() => {
    const brandsParam = searchParams.get('brand');
    const capacityParam = searchParams.get('capacity');
    const priceParam = searchParams.get('price');
    const seasonParam = searchParams.get('season');
    const weightParam = searchParams.get('weight');
    const inStockParam = searchParams.get('inStock');
    const sortParam = searchParams.get('sort');

    let initialPrice: [number, number] = [0, 2000];
    if (priceParam) {
      const [minStr, maxStr] = priceParam.split('-');
      if (minStr && maxStr) {
        initialPrice = [Number(minStr) || 0, Number(maxStr) || 2000];
      }
    }

    return {
      brands: brandsParam ? (brandsParam.split(',') as TentBrand[]) : [],
      capacities: capacityParam ? (capacityParam.split(',') as TentCapacity[]) : [],
      priceRange: initialPrice,
      weightCategories: weightParam ? (weightParam.split(',') as WeightCategory[]) : [],
      seasons: seasonParam ? (seasonParam.split(',') as SeasonRating[]) : [],
      activities: [],
      inStockOnly: inStockParam === 'true',
      sortBy: (sortParam as any) || 'recommended',
    };
  });

  // Sync state to URL programmatically (Requirement: Programmatic URL handling)
  const updateUrlWithFilters = (newFilters: FacetFilters) => {
    const params = new URLSearchParams();

    if (newFilters.brands.length > 0) {
      params.set('brand', newFilters.brands.join(','));
    }
    if (newFilters.capacities.length > 0) {
      params.set('capacity', newFilters.capacities.join(','));
    }
    if (newFilters.priceRange[0] > 0 || newFilters.priceRange[1] < 2000) {
      params.set('price', `${newFilters.priceRange[0]}-${newFilters.priceRange[1]}`);
    }
    if (newFilters.seasons.length > 0) {
      params.set('season', newFilters.seasons.join(','));
    }
    if (newFilters.weightCategories.length > 0) {
      params.set('weight', newFilters.weightCategories.join(','));
    }
    if (newFilters.inStockOnly) {
      params.set('inStock', 'true');
    }
    if (newFilters.sortBy !== 'recommended') {
      params.set('sort', newFilters.sortBy);
    }

    const query = params.toString();
    const targetUrl = query ? `${CATEGORY_ROOT_PATH}?${query}` : CATEGORY_ROOT_PATH;

    startTransition(() => {
      // Updates browser history & URL bar without jarring page reloads
      router.replace(targetUrl, { scroll: false });
    });
  };

  const handleUpdateFilters = (changed: Partial<FacetFilters>) => {
    setFilters((prev) => {
      const updated = { ...prev, ...changed };
      updateUrlWithFilters(updated);
      return updated;
    });
  };

  const handleResetFilters = () => {
    const reset: FacetFilters = {
      brands: [],
      capacities: [],
      priceRange: [0, 2000],
      weightCategories: [],
      seasons: [],
      activities: [],
      inStockOnly: false,
      sortBy: 'recommended',
    };
    setFilters(reset);
    updateUrlWithFilters(reset);
  };

  // Filter & Sort Products
  const filteredProducts = useMemo(() => {
    return TENTS_CATALOG.filter((product) => {
      // Brand filter
      if (filters.brands.length > 0 && !filters.brands.includes(product.brand)) {
        return false;
      }
      // Capacity filter
      if (filters.capacities.length > 0 && !filters.capacities.includes(product.capacity)) {
        return false;
      }
      // Price range
      if (product.price < filters.priceRange[0] || product.price > filters.priceRange[1]) {
        return false;
      }
      // Season filter
      if (filters.seasons.length > 0 && !filters.seasons.includes(product.season)) {
        return false;
      }
      // Weight category filter
      if (filters.weightCategories.length > 0 && !filters.weightCategories.includes(product.weightCategory)) {
        return false;
      }
      // In-stock only
      if (filters.inStockOnly && !product.inStock) {
        return false;
      }
      return true;
    }).sort((a, b) => {
      if (filters.sortBy === 'price-asc') return a.price - b.price;
      if (filters.sortBy === 'price-desc') return b.price - a.price;
      if (filters.sortBy === 'rating') return b.rating - a.rating;
      if (filters.sortBy === 'weight') return a.weightLbs - b.weightLbs;
      return 0; // recommended default
    });
  }, [filters]);

  // Current query string representation for inspector and sidebar
  const currentQueryString = searchParams.toString();
  const currentBrowserUrl = currentQueryString 
    ? `${CANONICAL_URL}?${currentQueryString}` 
    : CANONICAL_URL;

  // Generate Schemas for Head injection
  const breadcrumbSchema = useMemo(() => generateBreadcrumbSchema(), []);
  const itemListSchema = useMemo(() => generateItemListSchema(filteredProducts), [filteredProducts]);
  const entityGraphSchema = useMemo(() => generateEntityGraph(filteredProducts), [filteredProducts]);

  return (
    <>
      {/* 
        TECHNICAL SEO & AEO HEAD INJECTIONS:
        1. Dynamic <link rel="canonical"> pointing to the root category URL (/tents)
        2. Dynamic JSON-LD ItemList, Product, and BreadcrumbList schemas
      */}
      <link rel="canonical" href={CANONICAL_URL} />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(breadcrumbSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(itemListSchema) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(entityGraphSchema) }}
      />

      <div className="min-h-screen flex flex-col bg-[#fbfcfb] text-slate-900">
        {/* Navigation & Breadcrumbs */}
        <Header
          onOpenInspector={() => setInspectorOpen(true)}
          canonicalUrl={CANONICAL_URL}
          activeFilterCount={
            filters.brands.length +
            filters.capacities.length +
            filters.seasons.length +
            filters.weightCategories.length +
            (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000 ? 1 : 0)
          }
          productCount={filteredProducts.length}
        />

        {/* Main Category Body */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 flex-1 w-full">
          {/* Top Banner explaining canonical lock */}
          <div className="mb-6 p-3 sm:p-4 rounded-xl bg-slate-900 text-white flex flex-wrap items-center justify-between gap-3 shadow-sm border border-slate-800">
            <div className="flex items-center gap-2.5 text-xs">
              <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              <span className="text-slate-300">
                <strong className="text-white">AEO Strategy Active:</strong> Permutation query parameters like <code className="text-emerald-300 font-mono text-[11px] bg-slate-800 px-1.5 py-0.5 rounded">{currentQueryString ? `?${currentQueryString}` : 'none'}</code> update state seamlessly while the canonical tag remains locked to <code className="text-emerald-300 font-mono text-[11px] bg-slate-800 px-1.5 py-0.5 rounded">/tents</code>.
              </span>
            </div>
            <button
              onClick={() => setInspectorOpen(true)}
              className="text-xs text-emerald-400 hover:text-emerald-300 underline font-semibold cursor-pointer shrink-0"
            >
              Inspect JSON-LD & Canonical &rarr;
            </button>
          </div>

          <div className="flex flex-col lg:flex-row gap-8 items-start">
            {/* Faceted Sidebar */}
            <FacetSidebar
              filters={filters}
              onUpdateFilters={handleUpdateFilters}
              onResetFilters={handleResetFilters}
              currentSearchQueryString={currentQueryString}
            />

            {/* Product Grid Area */}
            <ProductGrid
              products={filteredProducts}
              totalCatalogCount={TENTS_CATALOG.length}
              filters={filters}
              onUpdateFilters={handleUpdateFilters}
              onResetFilters={handleResetFilters}
              onQuickView={(p) => setSelectedProduct(p)}
            />
          </div>

          {/* Modular Semantic Buying Block (Technical SEO + AEO Focus) */}
          <SemanticBuyingBlock
            onApplyIntentFilter={handleUpdateFilters}
            onSelectProduct={(p) => setSelectedProduct(p)}
            catalog={TENTS_CATALOG}
          />
        </main>

        {/* Technical SEO / AEO Inspector Modal */}
        <SeoAeoInspectorModal
          isOpen={inspectorOpen}
          onClose={() => setInspectorOpen(false)}
          products={filteredProducts}
          currentBrowserUrl={currentBrowserUrl}
        />

        {/* Quick View Product Specs Modal */}
        <QuickViewModal
          product={selectedProduct}
          onClose={() => setSelectedProduct(null)}
        />

        {/* Global Footer */}
        <Footer />
      </div>
    </>
  );
};
