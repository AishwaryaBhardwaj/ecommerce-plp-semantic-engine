'use client';

import React, { useState } from 'react';
import Image from 'next/image';
import { TentProduct } from '../types/product';
import { 
  Star, 
  Wind, 
  Feather, 
  Users, 
  ShieldCheck, 
  Eye, 
  ShoppingBag, 
  Check,
  AlertCircle 
} from 'lucide-react';

interface ProductCardProps {
  product: TentProduct;
  onQuickView: (product: TentProduct) => void;
}

export const ProductCard: React.FC<ProductCardProps> = ({ product, onQuickView }) => {
  const [added, setAdded] = useState(false);
  const [imgError, setImgError] = useState(false);

  const handleAddToCart = (e: React.MouseEvent) => {
    e.stopPropagation();
    setAdded(true);
    setTimeout(() => setAdded(false), 2000);
  };

  return (
    <article 
      className="group bg-white rounded-2xl border border-slate-200/90 hover:border-emerald-500/50 shadow-2xs hover:shadow-lg transition-all duration-300 flex flex-col overflow-hidden relative"
      itemScope
      itemType="https://schema.org/Product"
    >
      {/* Product Image Area */}
      <div className="relative aspect-4/3 w-full bg-slate-100 overflow-hidden">
        <Image
          src={product.image}
          alt={product.name}
          fill
          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-105 transition-transform duration-500"
          onError={() => setImgError(true)}
          priority={false}
        />
        
        {/* Subtle Dark Gradient Overlay */}
        <div className="absolute inset-0 bg-gradient-to-t from-slate-950/40 via-transparent to-transparent pointer-events-none" />

        {/* Top Badges */}
        <div className="absolute top-3 left-3 flex flex-wrap gap-1.5 items-center z-10">
          <span className="bg-slate-900/85 backdrop-blur-md text-white text-[11px] font-bold px-2.5 py-1 rounded-md tracking-wider uppercase">
            {product.brand}
          </span>
          {product.badge && (
            <span className="bg-emerald-600 text-white text-[10px] font-bold px-2 py-0.5 rounded-md shadow-xs">
              {product.badge}
            </span>
          )}
        </div>

        {/* Stock Status Badge */}
        <div className="absolute top-3 right-3 z-10">
          {product.inStock ? (
            <span className="bg-emerald-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
              <span className="w-1.5 h-1.5 rounded-full bg-white"></span>
              In Stock
            </span>
          ) : (
            <span className="bg-rose-500/90 text-white text-[10px] font-bold px-2 py-0.5 rounded-full backdrop-blur-xs flex items-center gap-1">
              <AlertCircle className="w-2.5 h-2.5" />
              Backorder
            </span>
          )}
        </div>

        {/* Quick View Hover Button */}
        <div className="absolute inset-x-3 bottom-3 flex gap-2 opacity-0 group-hover:opacity-100 transition-opacity duration-200 z-10">
          <button
            onClick={() => onQuickView(product)}
            className="flex-1 bg-white/95 hover:bg-white text-slate-900 text-xs font-semibold py-2 px-3 rounded-lg shadow-md flex items-center justify-center gap-1.5 transition backdrop-blur-xs cursor-pointer"
          >
            <Eye className="w-3.5 h-3.5 text-slate-600" />
            Quick Specs
          </button>
        </div>
      </div>

      {/* Product Content Details */}
      <div className="p-4 sm:p-5 flex-1 flex flex-col justify-between space-y-4">
        <div>
          {/* Reviews & Season Rating */}
          <div className="flex items-center justify-between text-xs mb-2">
            <div className="flex items-center gap-1 text-amber-500 font-bold" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
              <Star className="w-3.5 h-3.5 fill-amber-400 text-amber-400" />
              <span itemProp="ratingValue">{product.rating}</span>
              <span className="text-slate-400 font-normal">
                (<span itemProp="reviewCount">{product.reviewCount}</span>)
              </span>
            </div>
            <span className={`text-[11px] font-medium px-2 py-0.5 rounded-full ${
              product.season === '4-Season' 
                ? 'bg-blue-50 text-blue-700 border border-blue-200' 
                : 'bg-emerald-50 text-emerald-700 border border-emerald-200'
            }`}>
              {product.season}
            </span>
          </div>

          {/* Product Title */}
          <h3 
            className="text-sm sm:text-base font-bold text-slate-900 hover:text-emerald-700 transition line-clamp-2 leading-snug cursor-pointer"
            onClick={() => onQuickView(product)}
            itemProp="name"
          >
            {product.name}
          </h3>

          {/* Structured Entity Specification Badges (AEO Data Anchors) */}
          <div className="mt-3 grid grid-cols-3 gap-1.5 text-[11px] bg-slate-50 p-2.5 rounded-xl border border-slate-100">
            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] flex items-center gap-1">
                <Users className="w-3 h-3 text-slate-400" /> Capacity
              </span>
              <span className="font-semibold text-slate-800">{product.capacity}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] flex items-center gap-1">
                <Feather className="w-3 h-3 text-slate-400" /> Weight
              </span>
              <span className="font-semibold text-slate-800">{product.weight}</span>
            </div>

            <div className="flex flex-col">
              <span className="text-slate-400 text-[10px] flex items-center gap-1">
                <Wind className="w-3 h-3 text-slate-400" /> Wind Limit
              </span>
              <span className="font-semibold text-emerald-700">{product.entityAttributes.windResistanceMph} mph</span>
            </div>
          </div>
        </div>

        {/* Pricing and Action Button */}
        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
          <div itemProp="offers" itemScope itemType="https://schema.org/Offer">
            <meta itemProp="priceCurrency" content="USD" />
            <div className="flex items-baseline gap-1.5">
              <span className="text-lg font-black text-slate-900" itemProp="price">
                ${product.price.toFixed(2)}
              </span>
              {product.originalPrice && (
                <span className="text-xs text-slate-400 line-through">
                  ${product.originalPrice.toFixed(2)}
                </span>
              )}
            </div>
            <span className="text-[10px] text-slate-500 font-mono block">
              SKU: <span itemProp="sku">{product.sku}</span>
            </span>
          </div>

          <button
            onClick={handleAddToCart}
            disabled={!product.inStock}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition flex items-center gap-1.5 cursor-pointer shadow-xs ${
              !product.inStock
                ? 'bg-slate-100 text-slate-400 cursor-not-allowed'
                : added
                ? 'bg-emerald-700 text-white'
                : 'bg-emerald-700 hover:bg-emerald-800 text-white hover:shadow-md'
            }`}
          >
            {added ? (
              <>
                <Check className="w-3.5 h-3.5" />
                <span>Added</span>
              </>
            ) : (
              <>
                <ShoppingBag className="w-3.5 h-3.5" />
                <span>Add</span>
              </>
            )}
          </button>
        </div>
      </div>
    </article>
  );
};
