'use client';

import React from 'react';
import Image from 'next/image';
import { TentProduct } from '../types/product';
import { 
  X, 
  Star, 
  Wind, 
  Feather, 
  ShieldCheck, 
  Check, 
  Clock, 
  Compass, 
  Layers, 
  ShoppingBag 
} from 'lucide-react';

interface QuickViewModalProps {
  product: TentProduct | null;
  onClose: () => void;
}

export const QuickViewModal: React.FC<QuickViewModalProps> = ({ product, onClose }) => {
  if (!product) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/70 backdrop-blur-sm animate-in fade-in duration-200">
      <div className="bg-white rounded-3xl w-full max-w-3xl max-h-[92vh] flex flex-col shadow-2xl overflow-hidden border border-slate-200">
        
        {/* Modal Header */}
        <div className="p-4 sm:p-5 border-b border-slate-100 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-emerald-100 text-emerald-800 text-xs font-bold px-2.5 py-1 rounded-md">
              {product.brand}
            </span>
            <span className="text-xs text-slate-400 font-mono">
              SKU: {product.sku}
            </span>
          </div>

          <button
            onClick={onClose}
            className="p-1.5 text-slate-400 hover:text-slate-700 rounded-lg hover:bg-slate-100 transition cursor-pointer"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            {/* Image */}
            <div className="relative aspect-4/3 rounded-2xl overflow-hidden bg-slate-100 border border-slate-200">
              <Image
                src={product.image}
                alt={product.name}
                fill
                className="object-cover"
              />
              {product.badge && (
                <div className="absolute top-3 left-3 bg-emerald-600 text-white text-[11px] font-bold px-2.5 py-1 rounded-md shadow-xs">
                  {product.badge}
                </div>
              )}
            </div>

            {/* Title & Key Highlights */}
            <div className="space-y-4">
              <div className="flex items-center gap-1.5 text-amber-500 font-bold text-sm">
                <Star className="w-4 h-4 fill-amber-400" />
                <span>{product.rating}</span>
                <span className="text-slate-400 font-normal">({product.reviewCount} customer reviews)</span>
              </div>

              <h2 className="text-lg font-black text-slate-900 leading-snug">
                {product.name}
              </h2>

              <div className="flex items-baseline gap-2">
                <span className="text-2xl font-black text-slate-900">
                  ${product.price.toFixed(2)}
                </span>
                {product.originalPrice && (
                  <span className="text-sm text-slate-400 line-through">
                    ${product.originalPrice.toFixed(2)}
                  </span>
                )}
              </div>

              <p className="text-xs text-slate-600 leading-relaxed">
                {product.description}
              </p>

              <div className="pt-2">
                <button
                  onClick={onClose}
                  className="w-full bg-emerald-700 hover:bg-emerald-800 text-white font-bold text-xs py-3 rounded-xl transition flex items-center justify-center gap-2 cursor-pointer shadow-xs"
                >
                  <ShoppingBag className="w-4 h-4" />
                  Add to Cart • ${product.price.toFixed(2)}
                </button>
              </div>
            </div>
          </div>

          {/* Technical Entity Specifications Table */}
          <div className="border-t border-slate-100 pt-6 space-y-3">
            <h4 className="text-xs font-bold text-slate-900 uppercase tracking-wider flex items-center gap-1.5">
              <Layers className="w-4 h-4 text-emerald-700" />
              Machine-Readable Entity Attributes
            </h4>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 text-xs">
              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block font-medium">Pole Architecture</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{product.poleMaterial}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block font-medium">Wind Resistance</span>
                <span className="font-bold text-emerald-700 mt-0.5 block">{product.entityAttributes.windResistanceMph} mph tested</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block font-medium">Hydrostatic Head</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{product.entityAttributes.rainflyHydrostaticHead}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block font-medium">Floor Area</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{product.floorArea}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block font-medium">Vestibule Space</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{product.vestibuleArea}</span>
              </div>

              <div className="bg-slate-50 p-3 rounded-xl border border-slate-100">
                <span className="text-slate-400 text-[10px] block font-medium">Canopy Fabric</span>
                <span className="font-bold text-slate-800 mt-0.5 block">{product.entityAttributes.fabric}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
