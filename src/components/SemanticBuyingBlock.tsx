'use client';

import React, { useState } from 'react';
import { TentProduct, FacetFilters } from '../types/product';
import { 
  Wind, 
  Feather, 
  Users, 
  HelpCircle, 
  ArrowRight, 
  Bot, 
  CheckCircle2, 
  ShieldAlert, 
  Sparkles,
  ChevronDown,
  Layers
} from 'lucide-react';

interface SemanticBuyingBlockProps {
  onApplyIntentFilter: (filters: Partial<FacetFilters>) => void;
  onSelectProduct: (product: TentProduct) => void;
  catalog: TentProduct[];
}

export const SemanticBuyingBlock: React.FC<SemanticBuyingBlockProps> = ({
  onApplyIntentFilter,
  onSelectProduct,
  catalog,
}) => {
  const [activeTab, setActiveTab] = useState<'guide' | 'entity-graph'>('guide');

  const scrollToGrid = () => {
    window.scrollTo({ top: 180, behavior: 'smooth' });
  };

  const handleFilterHighWind = () => {
    onApplyIntentFilter({
      seasons: ['4-Season'],
      brands: [],
      capacities: [],
      priceRange: [0, 2000],
    });
    scrollToGrid();
  };

  const handleFilterUltralight = () => {
    onApplyIntentFilter({
      weightCategories: ['Ultralight'],
      brands: [],
      capacities: [],
      priceRange: [0, 2000],
    });
    scrollToGrid();
  };

  const handleFilterFamily = () => {
    onApplyIntentFilter({
      capacities: ['4-Person', '6-Person'],
      brands: [],
      weightCategories: [],
      priceRange: [0, 2000],
    });
    scrollToGrid();
  };

  return (
    <section 
      aria-labelledby="semantic-buying-hub-title" 
      className="mt-16 bg-white rounded-3xl border border-slate-200/90 shadow-sm overflow-hidden"
    >
      {/* Header bar with AEO Intent Tag */}
      <div className="bg-gradient-to-r from-slate-900 via-emerald-950 to-slate-900 text-white p-6 sm:p-8 border-b border-slate-800">
        <div className="flex flex-wrap items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 bg-emerald-500/20 text-emerald-300 border border-emerald-500/30 px-3 py-1 rounded-full text-xs font-semibold mb-2">
              <Bot className="w-3.5 h-3.5" />
              <span>AEO & LLM Crawler Entity Taxonomy</span>
            </div>
            <h2 id="semantic-buying-hub-title" className="text-2xl sm:text-3xl font-black tracking-tight text-white">
              Semantic Buying Guide: Tent Architecture by User Intent
            </h2>
            <p className="text-sm text-slate-300 mt-1 max-w-3xl leading-relaxed">
              This knowledge block maps outdoor user search intents to machine-readable product specifications (fabric denier, pole geometry, hydrostatic head, wind velocity resistance) for human shoppers and AI search engines.
            </p>
          </div>

          {/* Toggle between Guide Reading and AI Entity Graph */}
          <div className="flex bg-slate-800/80 p-1 rounded-xl border border-slate-700">
            <button
              onClick={() => setActiveTab('guide')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer ${
                activeTab === 'guide'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              Buyer Guide (Semantic H2s)
            </button>
            <button
              onClick={() => setActiveTab('entity-graph')}
              className={`px-3 py-1.5 rounded-lg text-xs font-bold transition cursor-pointer flex items-center gap-1 ${
                activeTab === 'entity-graph'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-300 hover:text-white'
              }`}
            >
              <Sparkles className="w-3 h-3 text-emerald-300" />
              AEO Entity Graph
            </button>
          </div>
        </div>
      </div>

      {activeTab === 'guide' ? (
        <div className="p-6 sm:p-10 space-y-12 text-slate-700 leading-relaxed">
          
          {/* INTENT 1: HIGH WINDS & ALPINE STORMS */}
          <article className="border-b border-slate-200 pb-10 space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <Wind className="w-4 h-4 text-emerald-700" />
              <span>Search Intent: Expedition & Extreme Weather Shelter</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Best Tents for High Winds & Alpine Storms
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              When camping exposed above treeline or enduring ridge-top gusts, tent structural failure typically occurs when standard aluminum poles deform past their yield point or wind pushes broad rainfly surfaces flat against the inner canopy. Tents engineered for extreme winds utilize <strong>geodesic or semi-geodesic pole crossovers</strong>—where four to five pole sections intersect, redistributing directional wind shear across the entire perimeter rather than concentrating stress on a single apex.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-emerald-800 block uppercase tracking-wide">Key Spec: Frame Tensile</span>
                <p className="text-xs text-slate-600 mt-1">
                  Composite poles like <strong>Easton Syclone</strong> flex under 75+ mph blasts and instantly bounce back without fracturing or taking permanent metal bend.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-emerald-800 block uppercase tracking-wide">Key Spec: Hydrostatic Head</span>
                <p className="text-xs text-slate-600 mt-1">
                  Look for <strong>1500mm to 3000mm DuraShield coatings</strong> on the rainfly and 5000mm–10000mm polyurethane on the tub floor to stop hydrostatic seepage.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-emerald-800 block uppercase tracking-wide">Key Spec: Solid Canopies</span>
                <p className="text-xs text-slate-600 mt-1">
                  Solid ripstop nylon panels prevent fine airborne spindrift snow and drafty gale gusts from infiltrating your sleeping bag compartment.
                </p>
              </div>
            </div>

            {/* Mapped Entity Recommendations */}
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-900 block">
                  AI Entity-Mapped Products for This Intent:
                </span>
                <span className="text-xs text-emerald-800 font-medium">
                  • MSR Remote 2-Person (75 mph limit) &nbsp;|&nbsp; • The North Face Summit VE 25 (85 mph limit) &nbsp;|&nbsp; • Marmot Fortress 2P (65 mph limit)
                </span>
              </div>
              <button
                onClick={handleFilterHighWind}
                className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition shadow-xs cursor-pointer"
              >
                <span>Filter Grid to High-Wind Tents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>


          {/* INTENT 2: ULTRALIGHT THRU-HIKING */}
          <article className="border-b border-slate-200 pb-10 space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <Feather className="w-4 h-4 text-emerald-700" />
              <span>Search Intent: Minimalist Trail Weight & Fastpacking</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Best Ultralight Tents for Thru-Hiking & Fastpacking
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              On continuous 2,000-mile journeys like the Pacific Crest Trail (PCT) or Appalachian Trail (AT), backpack base weight is the single biggest predictor of joint fatigue and daily mileage efficiency. Ultralight tents achieve <strong>sub-3-pound packaged weights</strong> through high-tenacity, low-denier fabrics (15D to 20D sil-poly or OSMO composite) and single-hub pole architectures such as <strong>DAC Featherlite NFL</strong>.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-emerald-800 block uppercase tracking-wide">High-Volume Hub Geometry</span>
                <p className="text-xs text-slate-600 mt-1">
                  Angled hub joints and pre-bent brow poles shift sidewalls outward, maximizing shoulder livability and sit-up height without increasing floor footprint.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-emerald-800 block uppercase tracking-wide">Condensation Ventilation</span>
                <p className="text-xs text-slate-600 mt-1">
                  Full no-see-um mesh inners combined with strutted kickstand apex vents create continuous chimney airflow to prevent overnight dew buildup on sleeping bags.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-emerald-800 block uppercase tracking-wide">Wet Sag Resistance</span>
                <p className="text-xs text-slate-600 mt-1">
                  Modern hydrophobic composite fabrics like NEMO OSMO stretch 3x less when wet, avoiding that classic 3 AM fly-sagging against the mesh.
                </p>
              </div>
            </div>

            {/* Mapped Entity Recommendations */}
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-900 block">
                  AI Entity-Mapped Products for This Intent:
                </span>
                <span className="text-xs text-emerald-800 font-medium">
                  • Big Agnes Copper Spur HV UL2 (2 lbs 11 oz) &nbsp;|&nbsp; • NEMO Hornet OSMO 2P (2 lbs 3 oz) &nbsp;|&nbsp; • Big Agnes Fly Creek UL1 (1 lb 14 oz)
                </span>
              </div>
              <button
                onClick={handleFilterUltralight}
                className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition shadow-xs cursor-pointer"
              >
                <span>Filter Grid to Ultralight Tents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>


          {/* INTENT 3: FAMILY & CAR CAMPING */}
          <article className="border-b border-slate-200 pb-10 space-y-4">
            <div className="flex items-center gap-2.5 text-emerald-800 font-bold text-xs uppercase tracking-wider">
              <Users className="w-4 h-4 text-emerald-700" />
              <span>Search Intent: Maximum Living Space & Campsite Ease</span>
            </div>

            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              Best Family & Car Camping Tents for High Comfort and Headroom
            </h2>

            <p className="text-sm text-slate-600 leading-relaxed">
              When weight is not carried on your back, family camping priorities rotate completely toward interior volume, standing headroom (6 ft 6 in or taller), intuitive color-coded pole setup, and separate living zones. Multi-room models like the <strong>Coleman WeatherMaster 6-Person</strong> incorporate dedicated enclosed screen rooms that serve as a bug-free dining porch during afternoon mosquito swarms and double as dry storage for boots and coolers.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 pt-2">
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-emerald-800 block uppercase tracking-wide">Welded Tub Floors</span>
                <p className="text-xs text-slate-600 mt-1">
                  Patented inverted seams and welded polyethylene tub floors elevate critical seams 6 inches above ground level to neutralize campsite standing puddles.
                </p>
              </div>

              <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                <span className="text-xs font-bold text-emerald-800 block uppercase tracking-wide">Front Porch Vestibules</span>
                <p className="text-xs text-slate-600 mt-1">
                  Massive front vestibules (like The North Face Wawona) offer enough overhead shelter to park mountain bikes or set up camp chairs during a storm.
                </p>
              </div>
            </div>

            {/* Mapped Entity Recommendations */}
            <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-200 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold text-emerald-900 block">
                  AI Entity-Mapped Products for This Intent:
                </span>
                <span className="text-xs text-emerald-800 font-medium">
                  • Coleman WeatherMaster 6P (Stand-up Height) &nbsp;|&nbsp; • The North Face Wawona 6P &nbsp;|&nbsp; • Coleman Sundome 4P
                </span>
              </div>
              <button
                onClick={handleFilterFamily}
                className="inline-flex items-center gap-1.5 bg-emerald-700 hover:bg-emerald-800 text-white text-xs font-bold px-3.5 py-2 rounded-lg transition shadow-xs cursor-pointer"
              >
                <span>Filter Grid to Family Tents</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </button>
            </div>
          </article>


          {/* INTENT 4: TECHNICAL COMPARISON TABLE (3-SEASON VS 4-SEASON) */}
          <article className="space-y-4">
            <h2 className="text-xl sm:text-2xl font-black text-slate-900 tracking-tight">
              3-Season vs. 4-Season Tent Architecture: Entity Attribute Matrix
            </h2>
            <p className="text-sm text-slate-600 leading-relaxed">
              AI crawlers and knowledgeable backpackers categorize shelters into distinct seasonal classes based on canopy permeability and structural rigidity:
            </p>

            <div className="overflow-x-auto rounded-xl border border-slate-200 shadow-2xs">
              <table className="w-full text-left text-xs text-slate-700">
                <thead className="bg-slate-100 text-slate-900 font-bold uppercase tracking-wider text-[11px] border-b border-slate-200">
                  <tr>
                    <th className="py-3 px-4">Architectural Attribute</th>
                    <th className="py-3 px-4 bg-emerald-50/50 text-emerald-900">3-Season Backpacking</th>
                    <th className="py-3 px-4 bg-blue-50/50 text-blue-900">4-Season Mountaineering</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-200">
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Canopy Material</td>
                    <td className="py-3 px-4">80% Micro-mesh for maximum condensation release</td>
                    <td className="py-3 px-4">Solid breathable ripstop nylon to block blowing spindrift</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Pole Geometry</td>
                    <td className="py-3 px-4">Single or dual hub with 1–2 crossover points</td>
                    <td className="py-3 px-4">Geodesic dome with 4–5 crossover points for snow loads</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Wind Velocity Limit</td>
                    <td className="py-3 px-4">35 – 50 mph sustained</td>
                    <td className="py-3 px-4 font-bold text-emerald-700">65 – 85+ mph sustained</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Rainfly Extension</td>
                    <td className="py-3 px-4">Elevated 2–3 inches for low perimeter airflow</td>
                    <td className="py-3 px-4">Extends flush to ground with snow-flaps</td>
                  </tr>
                  <tr>
                    <td className="py-3 px-4 font-bold text-slate-900">Average Packaged Weight</td>
                    <td className="py-3 px-4 font-bold text-emerald-700">1.8 – 3.5 lbs</td>
                    <td className="py-3 px-4">5.5 – 10.0 lbs</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>

        </div>
      ) : (
        /* AEO ENTITY GRAPH VIEW */
        <div className="p-6 sm:p-10 space-y-6">
          <div className="bg-slate-900 text-slate-200 p-5 rounded-2xl border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <span className="font-mono text-xs text-emerald-400 font-semibold flex items-center gap-1.5">
                <Bot className="w-4 h-4" />
                Knowledge Graph: Explicit Intent-to-Entity Relationships
              </span>
              <span className="text-[10px] text-slate-400 font-mono">
                Schema.org / RDF Triples
              </span>
            </div>
            <p className="text-xs text-slate-300">
              The graph below depicts how search intents map into explicit product entities in this category hub. This enables LLM answer engines (Perplexity, SGE, ChatGPT) to perform precise multi-hop reasoning.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {/* Intent Node 1 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-blue-100 text-blue-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                <span>User Intent: High Winds</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <span className="font-semibold text-slate-900 block">Required Entity Attributes:</span>
                <p>• Geodesic pole architecture</p>
                <p>• Wind resistance &gt; 65 mph</p>
                <p>• Solid nylon canopy</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Products:</span>
                <ul className="text-xs space-y-1 text-slate-800 font-medium">
                  <li>• MSR Remote 2-Person</li>
                  <li>• TNF Summit VE 25</li>
                  <li>• Marmot Fortress 2P</li>
                </ul>
              </div>
            </div>

            {/* Intent Node 2 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-emerald-100 text-emerald-800 text-[11px] font-bold px-2.5 py-1 rounded-md">
                <span>User Intent: Ultralight Thru-Hiking</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <span className="font-semibold text-slate-900 block">Required Entity Attributes:</span>
                <p>• Trail weight &lt; 3.0 lbs</p>
                <p>• High-volume hub geometry</p>
                <p>• Silicone-treated nylon or OSMO</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Products:</span>
                <ul className="text-xs space-y-1 text-slate-800 font-medium">
                  <li>• Big Agnes Copper Spur UL2</li>
                  <li>• NEMO Hornet OSMO 2P</li>
                  <li>• Big Agnes Fly Creek UL1</li>
                  <li>• MSR Hubba Hubba 2P</li>
                </ul>
              </div>
            </div>

            {/* Intent Node 3 */}
            <div className="bg-slate-50 p-5 rounded-2xl border border-slate-200 space-y-3">
              <div className="inline-flex items-center gap-1.5 bg-amber-100 text-amber-900 text-[11px] font-bold px-2.5 py-1 rounded-md">
                <span>User Intent: Family Comfort</span>
              </div>
              <div className="text-xs text-slate-600 space-y-1">
                <span className="font-semibold text-slate-900 block">Required Entity Attributes:</span>
                <p>• Headroom &gt; 6 ft</p>
                <p>• Screen room / dual vestibules</p>
                <p>• Welded tub floor</p>
              </div>
              <div className="pt-2 border-t border-slate-200">
                <span className="text-[10px] uppercase font-bold text-slate-400 block mb-1">Target Products:</span>
                <ul className="text-xs space-y-1 text-slate-800 font-medium">
                  <li>• Coleman WeatherMaster 6P</li>
                  <li>• The North Face Wawona 6P</li>
                  <li>• Coleman Sundome 4P</li>
                </ul>
              </div>
            </div>
          </div>
        </div>
      )}
    </section>
  );
};
