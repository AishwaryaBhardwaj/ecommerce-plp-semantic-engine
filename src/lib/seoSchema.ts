import { TentProduct } from '../types/product';

export const SITE_URL = 'https://apexoutdoors.com';
export const CATEGORY_ROOT_PATH = '/tents';
export const CANONICAL_URL = `${SITE_URL}${CATEGORY_ROOT_PATH}`;

/**
 * Generates the BreadcrumbList schema for hierarchical navigation signals
 */
export function generateBreadcrumbSchema() {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: `${SITE_URL}/`,
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Camping & Hiking Gear',
        item: `${SITE_URL}/camp-hike`,
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Outdoor Camping Tents',
        item: CANONICAL_URL,
      },
    ],
  };
}

/**
 * Generates the ItemList schema with embedded Product entities for machine-readable AEO parsing
 */
export function generateItemListSchema(products: TentProduct[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'ItemList',
    name: 'Outdoor Camping Tents Catalog',
    description: 'Comprehensive category listing of ultralight backpacking, high-wind alpine mountaineering, and family camping tents.',
    url: CANONICAL_URL,
    numberOfItems: products.length,
    itemListElement: products.map((product, index) => ({
      '@type': 'ListItem',
      position: index + 1,
      name: product.name,
      url: `${SITE_URL}/tents/${product.slug}`,
      item: {
        '@type': 'Product',
        name: product.name,
        image: product.image,
        description: product.description,
        sku: product.sku,
        mpn: product.sku,
        brand: {
          '@type': 'Brand',
          name: product.brand,
        },
        offers: {
          '@type': 'Offer',
          url: `${SITE_URL}/tents/${product.slug}`,
          priceCurrency: 'USD',
          price: product.price,
          priceValidUntil: '2027-12-31',
          availability: product.inStock ? 'https://schema.org/InStock' : 'https://schema.org/OutOfStock',
          itemCondition: 'https://schema.org/NewCondition',
        },
        aggregateRating: {
          '@type': 'AggregateRating',
          ratingValue: product.rating,
          reviewCount: product.reviewCount,
          bestRating: 5,
          worstRating: 1,
        },
        additionalProperty: [
          {
            '@type': 'PropertyValue',
            name: 'Sleeping Capacity',
            value: product.capacity,
          },
          {
            '@type': 'PropertyValue',
            name: 'Season Rating',
            value: product.season,
          },
          {
            '@type': 'PropertyValue',
            name: 'Packaged Trail Weight',
            value: product.weight,
          },
          {
            '@type': 'PropertyValue',
            name: 'Wind Velocity Resistance',
            value: `${product.entityAttributes.windResistanceMph} mph`,
          },
          {
            '@type': 'PropertyValue',
            name: 'Framework Architecture',
            value: product.poleMaterial,
          },
          {
            '@type': 'PropertyValue',
            name: 'Waterproof Hydrostatic Head',
            value: product.entityAttributes.rainflyHydrostaticHead,
          },
        ],
      },
    })),
  };
}

/**
 * Generates an AEO Entity Knowledge Graph showing explicit relationship mapping
 */
export function generateEntityGraph(products: TentProduct[]) {
  return {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'CollectionPage',
        '@id': `${CANONICAL_URL}#webpage`,
        url: CANONICAL_URL,
        name: 'Outdoor Camping Tents | Ultralight & High-Wind Shelter Hub',
        isPartOf: {
          '@type': 'WebSite',
          '@id': `${SITE_URL}/#website`,
          name: 'Apex Outdoors',
          url: SITE_URL,
        },
        about: [
          {
            '@type': 'Thing',
            name: 'Ultralight Backpacking Tent',
            description: 'Sub-3 pound shelters engineered for long-distance thru-hiking with high strength-to-weight ratio.',
          },
          {
            '@type': 'Thing',
            name: 'Four-Season Alpine Mountaineering Tent',
            description: 'Geodesic pole architectures with standing snow load and gale-force wind resistance up to 85 mph.',
          },
          {
            '@type': 'Thing',
            name: 'Family Dome Tent',
            description: 'High ceiling car camping shelters with screened porches and multi-occupant vestibules.',
          },
        ],
      },
      ...products.slice(0, 4).map((p) => ({
        '@type': 'Product',
        '@id': `${SITE_URL}/tents/${p.slug}#product`,
        name: p.name,
        brand: {
          '@type': 'Brand',
          name: p.brand,
        },
        category: 'Outdoor Recreation > Camping & Hiking > Tents',
        material: p.entityAttributes.fabric,
      })),
    ],
  };
}
