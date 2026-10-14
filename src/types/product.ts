export type TentBrand = 'Coleman' | 'MSR' | 'Big Agnes' | 'NEMO' | 'Marmot' | 'The North Face';

export type TentCapacity = '1-Person' | '2-Person' | '3-Person' | '4-Person' | '6-Person';

export type WeightCategory = 'Ultralight' | 'Backpacking' | 'Basecamp & Family';

export type SeasonRating = '3-Season' | '4-Season';

export type ActivityIntent = 
  | 'High Wind Alpine' 
  | 'Ultralight Thru-Hiking' 
  | 'Family Car Camping' 
  | 'All-Weather Expedition';

export interface TentProduct {
  id: string;
  sku: string;
  slug: string;
  name: string;
  brand: TentBrand;
  price: number;
  originalPrice?: number;
  rating: number;
  reviewCount: number;
  capacity: TentCapacity;
  capacityNum: number;
  weight: string;
  weightLbs: number;
  weightCategory: WeightCategory;
  season: SeasonRating;
  activity: ActivityIntent;
  waterproofRating: string;
  poleMaterial: string;
  floorArea: string;
  vestibuleArea: string;
  inStock: boolean;
  image: string;
  badge?: string;
  description: string;
  semanticIntentMatches: string[];
  entityAttributes: {
    fabric: string;
    windResistanceMph: number;
    freestanding: boolean;
    setupTimeMinutes: number;
    rainflyHydrostaticHead: string;
    ventilationType: string;
  };
}

export interface FacetFilters {
  brands: TentBrand[];
  capacities: TentCapacity[];
  priceRange: [number, number];
  weightCategories: WeightCategory[];
  seasons: SeasonRating[];
  activities: ActivityIntent[];
  inStockOnly: boolean;
  sortBy: 'recommended' | 'price-asc' | 'price-desc' | 'rating' | 'weight';
}

export interface BreadcrumbItem {
  name: string;
  url: string;
}
