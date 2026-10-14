'use client';

import React from 'react';
import { 
  TentBrand, 
  TentCapacity, 
  WeightCategory, 
  SeasonRating, 
  FacetFilters 
} from '../types/product';
import { 
  BRAND_OPTIONS, 
  CAPACITY_OPTIONS, 
  PRICE_TIERS, 
  SEASON_OPTIONS, 
  WEIGHT_OPTIONS 
} from '../data/tentsData';
import { 
  Filter, 
  RotateCcw, 
  ShieldCheck, 
  Check, 
  DollarSign, 
  Compass, 
  Wind,
  Layers
} from 'lucide-react';

interface FacetSidebarProps {
  filters: FacetFilters;
  onUpdateFilters: (newFilters: Partial<FacetFilters>) => void;
  onResetFilters: () => void;
  currentSearchQueryString: string;
}

export const FacetSidebar: React.FC<FacetSidebarProps> = ({
  filters,
  onUpdateFilters,
  onResetFilters,
  currentSearchQueryString,
}) => {
  const toggleBrand = (brand: TentBrand) => {
    const exists = filters.brands.includes(brand);
    const updated = exists
      ? filters.brands.filter((b) => b !== brand)
      : [...filters.brands, brand];
    onUpdateFilters({ brands: updated });
  };

  const toggleCapacity = (capacity: TentCapacity) => {
    const exists = filters.capacities.includes(capacity);
    const updated = exists
      ? filters.capacities.filter((c) => c !== capacity)
      : [...filters.capacities, capacity];
    onUpdateFilters({ capacities: updated });
  };

  const toggleWeight = (weight: WeightCategory) => {
    const exists = filters.weightCategories.includes(weight);
    const updated = exists
      ? filters.weightCategories.filter((w) => w !== weight)
      : [...filters.weightCategories, weight];
    onUpdateFilters({ weightCategories: updated });
  };

  const toggleSeason = (season: SeasonRating) => {
    const exists = filters.seasons.includes(season);
    const updated = exists
      ? filters.seasons.filter((s) => s !== season)
      : [...filters.seasons, season];
    onUpdateFilters({ seasons: updated });
  };

  const setPriceTier = (min: number, max: number) => {
    if (filters.priceRange[0] === min && filters.priceRange[1] === max) {
      // Toggle off to default all prices
      onUpdateFilters({ priceRange: [0, 2000] });
    } else {
      onUpdateFilters({ priceRange: [min, max] });
    }
  };

  const activeFilterCount =
    filters.brands.length +
    filters.capacities.length +
    (filters.priceRange[0] > 0 || filters.priceRange[1] < 2000 ? 1 : 0) +
    filters.weightCategories.length +
    filters.seasons.length +
    (filters.inStockOnly ? 1 : 0);

  return (
    <aside className="w-full lg:w-72 shrink-0 space-y-6">
      {/* Facet Controls Header */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs">
        <div className="flex items-center justify-between mb-2">
          <div className="flex items-center gap-2">
            <Filter className="w-4 h-4 text-emerald-700" />
            <h2 className="text-base font-bold text-slate-900 tracking-tight">Faceted Filters</h2>
            {activeFilterCount > 0 && (
              <span className="bg-emerald-100 text-emerald-800 text-xs px-2 py-0.5 rounded-full font-bold">
                {activeFilterCount}
              </span>
            )}
          </div>
          {activeFilterCount > 0 && (
            <button
              onClick={onResetFilters}
              className="text-xs text-rose-600 hover:text-rose-700 font-semibold flex items-center gap-1 hover:underline cursor-pointer"
            >
              <RotateCcw className="w-3 h-3" />
              Reset All
            </button>
          )}
        </div>
        <p className="text-xs text-slate-500 leading-relaxed">
          Filter by outdoor brand, sleeping capacity, price range, and environmental rating.
        </p>

        {/* Live URL Query String Feedback */}
        <div className="mt-3 pt-3 border-t border-slate-100">
          <div className="text-[11px] font-mono text-slate-600 flex items-center justify-between">
            <span className="font-semibold text-slate-700">Active URL Query:</span>
            <span className="text-[10px] text-slate-400">Updates live</span>
          </div>
          <div className="mt-1 bg-slate-900 text-emerald-400 font-mono text-[11px] px-2.5 py-1.5 rounded-md overflow-x-auto whitespace-nowrap border border-slate-800">
            {currentSearchQueryString ? `?${currentSearchQueryString}` : '(no parameters — root category)'}
          </div>
        </div>
      </div>

      {/* Brand Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Compass className="w-3.5 h-3.5 text-emerald-700" />
            Brand
          </h3>
          {filters.brands.length > 0 && (
            <button
              onClick={() => onUpdateFilters({ brands: [] })}
              className="text-[11px] text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-1.5">
          {BRAND_OPTIONS.map((brand) => {
            const isChecked = filters.brands.includes(brand.name);
            return (
              <label
                key={brand.name}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition text-sm text-slate-700"
              >
                <div className="flex items-center gap-2.5">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleBrand(brand.name)}
                    className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500 cursor-pointer"
                  />
                  <span className={isChecked ? 'font-semibold text-slate-900' : 'text-slate-700'}>
                    {brand.name}
                  </span>
                </div>
                <span className="text-xs text-slate-400 bg-slate-100 px-1.5 py-0.5 rounded font-mono">
                  {brand.count}
                </span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Capacity Filter */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <Layers className="w-3.5 h-3.5 text-emerald-700" />
            Capacity
          </h3>
          {filters.capacities.length > 0 && (
            <button
              onClick={() => onUpdateFilters({ capacities: [] })}
              className="text-[11px] text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        <div className="grid grid-cols-2 gap-1.5">
          {CAPACITY_OPTIONS.map((cap) => {
            const isChecked = filters.capacities.includes(cap.value as TentCapacity);
            return (
              <button
                key={cap.value}
                onClick={() => toggleCapacity(cap.value as TentCapacity)}
                type="button"
                className={`flex items-center justify-between px-3 py-2 rounded-lg border text-xs font-medium transition cursor-pointer ${
                  isChecked
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-semibold ring-1 ring-emerald-500/30'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50 hover:border-slate-300'
                }`}
              >
                <span>{cap.label}</span>
                <span className={`text-[10px] px-1 rounded ${isChecked ? 'bg-emerald-200/70 text-emerald-900' : 'text-slate-400'}`}>
                  {cap.count}
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Price Tiers */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
        <div className="flex items-center justify-between">
          <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
            <DollarSign className="w-3.5 h-3.5 text-emerald-700" />
            Price Tier
          </h3>
          {(filters.priceRange[0] > 0 || filters.priceRange[1] < 2000) && (
            <button
              onClick={() => onUpdateFilters({ priceRange: [0, 2000] })}
              className="text-[11px] text-slate-400 hover:text-slate-600"
            >
              Clear
            </button>
          )}
        </div>

        <div className="space-y-1.5">
          {PRICE_TIERS.map((tier) => {
            const isSelected =
              filters.priceRange[0] === tier.min && filters.priceRange[1] === tier.max;
            return (
              <button
                key={tier.label}
                onClick={() => setPriceTier(tier.min, tier.max)}
                type="button"
                className={`w-full flex items-center justify-between px-3 py-2 rounded-lg border text-xs transition cursor-pointer ${
                  isSelected
                    ? 'bg-emerald-50 border-emerald-500 text-emerald-900 font-bold'
                    : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-50'
                }`}
              >
                <span>{tier.label}</span>
                <span className="text-[10px] text-slate-400 font-mono">
                  {tier.count} items
                </span>
              </button>
            );
          })}
        </div>
      </div>

      {/* Season Rating */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900 flex items-center gap-2">
          <Wind className="w-3.5 h-3.5 text-emerald-700" />
          Season Rating
        </h3>
        <div className="space-y-1.5">
          {SEASON_OPTIONS.map((season) => {
            const isChecked = filters.seasons.includes(season.value as SeasonRating);
            return (
              <label
                key={season.value}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition text-xs text-slate-700"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleSeason(season.value as SeasonRating)}
                    className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className={isChecked ? 'font-semibold text-slate-900' : 'text-slate-700'}>
                    {season.label}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">({season.count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* Weight Category */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs space-y-3">
        <h3 className="text-sm font-bold text-slate-900">Trail Weight Class</h3>
        <div className="space-y-1.5">
          {WEIGHT_OPTIONS.map((weight) => {
            const isChecked = filters.weightCategories.includes(weight.value as WeightCategory);
            return (
              <label
                key={weight.value}
                className="flex items-center justify-between p-2 rounded-lg hover:bg-slate-50 cursor-pointer transition text-xs text-slate-700"
              >
                <div className="flex items-center gap-2">
                  <input
                    type="checkbox"
                    checked={isChecked}
                    onChange={() => toggleWeight(weight.value as WeightCategory)}
                    className="w-4 h-4 rounded border-slate-300 text-emerald-600 focus:ring-emerald-500"
                  />
                  <span className={isChecked ? 'font-semibold text-slate-900' : 'text-slate-700'}>
                    {weight.label}
                  </span>
                </div>
                <span className="text-[10px] text-slate-400 font-mono">({weight.count})</span>
              </label>
            );
          })}
        </div>
      </div>

      {/* In-Stock Toggle */}
      <div className="bg-white p-4 rounded-xl border border-slate-200/90 shadow-2xs flex items-center justify-between">
        <div>
          <span className="text-sm font-bold text-slate-900 block">In-Stock Only</span>
          <span className="text-[11px] text-slate-500">Exclude backordered models</span>
        </div>
        <button
          onClick={() => onUpdateFilters({ inStockOnly: !filters.inStockOnly })}
          className={`w-11 h-6 flex items-center rounded-full p-1 cursor-pointer transition-colors duration-200 ease-in-out ${
            filters.inStockOnly ? 'bg-emerald-600' : 'bg-slate-300'
          }`}
        >
          <div
            className={`bg-white w-4 h-4 rounded-full shadow-md transform transition-transform duration-200 ease-in-out ${
              filters.inStockOnly ? 'translate-x-5' : 'translate-x-0'
            }`}
          />
        </button>
      </div>

      {/* SEO Architecture Note Box */}
      <div className="p-4 rounded-xl bg-gradient-to-br from-slate-900 to-emerald-950 text-white shadow-sm border border-emerald-800/40 space-y-2">
        <div className="flex items-center gap-2 text-emerald-400 font-bold text-xs">
          <ShieldCheck className="w-4 h-4 shrink-0" />
          <span>Technical SEO: Anti-Bloat</span>
        </div>
        <p className="text-[11px] text-slate-300 leading-relaxed">
          Every facet selection modifies URL parameters programmatically. A server-rendered & client-verified <code className="text-emerald-300 font-mono text-[10px] bg-slate-800 px-1 py-0.5 rounded">&lt;link rel=&quot;canonical&quot;&gt;</code> points strictly to <code className="text-emerald-300 font-mono text-[10px] bg-slate-800 px-1 py-0.5 rounded">/tents</code> to preserve crawl equity.
        </p>
      </div>
    </aside>
  );
};
