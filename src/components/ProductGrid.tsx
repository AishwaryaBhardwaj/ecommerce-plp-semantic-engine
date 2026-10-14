'use client';

import React from 'react';
import { TentProduct, FacetFilters } from '../types/product';
import { ProductCard } from './ProductCard';
import { 
  ArrowUpDown, 
  X, 
  RotateCcw, 
  Sparkles,
  LayoutGrid, 
  AlertTriangle 
} from 'lucide-react';

interface ProductGridProps {
  products: TentProduct[];
  totalCatalogCount: number;
  filters: FacetFilters;
  onUpdateFilters: (newFilters: Partial<FacetFilters>) => void;
  onResetFilters: () => void;
  onQuickView: (product: TentProduct) => void;
}

export const ProductGrid: React.FC<ProductGridProps> = ({
  products,
  totalCatalogCount,
  filters,
  onUpdateFilters,
  onResetFilters,
  onQuickView,
}) => {
  // Collect active filter tags for one-click removal
  const activeChips: { label: string; onRemove: () => void }[] = [];

  filters.brands.forEach((brand) => {
    activeChips.push({
      label: `Brand: ${brand}`,
      onRemove: () =>
        onUpdateFilters({
          brands: filters.brands.filter((b) => b !== brand),
        }),
    });
  });

  filters.capacities.forEach((cap) => {
    activeChips.push({
      label: `Capacity: ${cap}`,
      onRemove: () =>
        onUpdateFilters({
          capacities: filters.capacities.filter((c) => c !== cap),
        }),
    });
  });

  if (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) {
    activeChips.push({
      label: `Price: $${filters.priceRange[0]} - $${filters.priceRange[1]}`,
      onRemove: () => onUpdateFilters({ priceRange: [0, 2000] }),
    });
  }

  filters.seasons.forEach((season) => {
    activeChips.push({
      label: `Season: ${season}`,
      onRemove: () =>
        onUpdateFilters({
          seasons: filters.seasons.filter((s) => s !== season),
        }),
    });
  });

  filters.weightCategories.forEach((weight) => {
    activeChips.push({
      label: `Weight: ${weight}`,
      onRemove: () =>
        onUpdateFilters({
          weightCategories: filters.weightCategories.filter((w) => w !== weight),
        }),
    });
  });

  if (filters.inStockOnly) {
    activeChips.push({
      label: 'In-Stock Only',
      onRemove: () => onUpdateFilters({ inStockOnly: false }),
    });
  }

  return (
    <div className="flex-1 space-y-6">
      {/* Category Hero / Title bar */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-800 to-emerald-950 text-white p-6 sm:p-8 rounded-2xl shadow-sm border border-slate-800 relative overflow-hidden">
        <div className="relative z-10 max-w-2xl">
          <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-2.5 py-1 rounded-full text-xs font-semibold mb-3">
            <Sparkles className="w-3.5 h-3.5" />
            <span>Entity-Based PLP Hub</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-black tracking-tight text-white mb-2">
            Outdoor Camping & Expedition Tents
          </h1>
          <p className="text-sm text-slate-300 leading-relaxed">
            Engineered shelters for extreme high-wind ridges, ultralight fastpacking, and multi-day family basecamps. Compare aerodynamic poles, waterproof hydrostatic ratings, and trail weights.
          </p>
        </div>

        {/* Decorative background grid effect */}
        <div className="absolute right-0 top-0 bottom-0 w-1/3 opacity-10 bg-[radial-gradient(#10b981_1px,transparent_1px)] [background-size:16px_16px]" />
      </div>

      {/* Control Bar: Count, Active Chips, Sort */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <p className="text-sm font-bold text-slate-900">
              Showing <span className="text-emerald-700">{products.length}</span> of {totalCatalogCount} tents
            </p>
          </div>

          {/* Sort Dropdown */}
          <div className="flex items-center gap-2">
            <label htmlFor="sort-select" className="text-xs text-slate-500 font-medium flex items-center gap-1">
              <ArrowUpDown className="w-3.5 h-3.5 text-slate-400" />
              Sort By:
            </label>
            <select
              id="sort-select"
              value={filters.sortBy}
              onChange={(e) => onUpdateFilters({ sortBy: e.target.value as any })}
              className="text-xs font-semibold bg-slate-50 border border-slate-300 rounded-lg px-2.5 py-1.5 text-slate-800 focus:outline-none focus:ring-2 focus:ring-emerald-500 cursor-pointer"
            >
              <option value="recommended">Featured (AEO Relevance)</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
              <option value="weight">Trail Weight: Lightest</option>
            </select>
          </div>
        </div>

        {/* Active Filter Chips */}
        {activeChips.length > 0 && (
          <div className="pt-2 border-t border-slate-100 flex flex-wrap items-center gap-2">
            <span className="text-xs text-slate-400 font-medium">Applied:</span>
            {activeChips.map((chip) => (
              <span
                key={chip.label}
                className="inline-flex items-center gap-1.5 bg-emerald-50 text-emerald-900 border border-emerald-200/80 text-xs px-2.5 py-1 rounded-full font-medium"
              >
                <span>{chip.label}</span>
                <button
                  onClick={chip.onRemove}
                  className="hover:text-emerald-600 transition rounded-full hover:bg-emerald-100 p-0.5 cursor-pointer"
                  title="Remove filter"
                >
                  <X className="w-3 h-3" />
                </button>
              </span>
            ))}
            <button
              onClick={onResetFilters}
              className="text-xs text-slate-500 hover:text-rose-600 underline ml-2 font-medium cursor-pointer"
            >
              Clear All
            </button>
          </div>
        )}
      </div>

      {/* Products Grid */}
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-3 gap-6">
          {products.map((product) => (
            <ProductCard
              key={product.id}
              product={product}
              onQuickView={onQuickView}
            />
          ))}
        </div>
      ) : (
        /* Empty State */
        <div className="bg-white rounded-2xl border border-slate-200 p-12 text-center space-y-4">
          <div className="w-14 h-14 mx-auto rounded-full bg-amber-50 text-amber-600 flex items-center justify-center">
            <AlertTriangle className="w-7 h-7" />
          </div>
          <div>
            <h3 className="text-lg font-bold text-slate-900">No tents match your filter criteria</h3>
            <p className="text-sm text-slate-500 mt-1 max-w-md mx-auto">
              Try removing some facet constraints or broaden your price and capacity settings to view available models.
            </p>
          </div>
          <button
            onClick={onResetFilters}
            className="inline-flex items-center gap-2 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-4 py-2.5 rounded-xl transition cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            Reset All Filters
          </button>
        </div>
      )}
    </div>
  );
};
