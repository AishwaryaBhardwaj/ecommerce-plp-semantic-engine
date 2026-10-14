# E-Commerce PLP Semantic Hub (Technical SEO + AEO Focus)

An enterprise-grade, responsive Next.js App Router e-commerce Product Listing Page (PLP) for **"Outdoor Camping Tents"** built with Tailwind CSS.

This project solves the technical SEO challenge of **faceted index bloat** (millions of duplicate filter parameter permutations) while converting the category base into an **Entity-Based Semantic Hub** tailored for modern Answer Engine Optimization (AEO) and LLM search engines (Google SGE, Perplexity, ChatGPT Search).

---

## 🚀 Key Architectural Highlights

### 1. Programmatic URL Handling & Anti-Bloat Canonical Lock
- **Stateful URL Faceting:** Filter selections for Brand (`Coleman`, `MSR`, `Big Agnes`, `NEMO`, `Marmot`, `The North Face`), Capacity (`1-Person` to `6-Person+`), Price tiers, and Seasons update the browser URL programmatically via query parameters (e.g., `/tents?brand=MSR&season=4-Season`) without triggering full page reloads.
- **Canonical Lock:** To eliminate duplicate crawl traps and index bloat, a `<link rel="canonical">` tag is permanently anchored to the root category URL (`https://apexoutdoors.com/tents`), consolidating all indexing signals and link equity to the root category.

### 2. Machine-Readable Structured Data (JSON-LD in `<head>`)
- **`ItemList` Schema:** Dynamic array of all active products with sequential positioning, canonical URLs, and full specifications.
- **`Product` Schema:** Each item includes Offer prices, currency, in-stock availability, AggregateRating, SKU, brand entity, and `additionalProperty` tags (pole material, hydrostatic head, wind velocity limit, fabric denier).
- **`BreadcrumbList` Schema:** Hierarchical breadcrumb structure (`Home` > `Camping & Hiking Gear` > `Outdoor Camping Tents`).
- **AEO Entity Graph (`@graph`):** Explicit entity relationships mapping user intent nodes to product entities.

### 3. Modular "Semantic Buying Block"
- Located directly below the product grid using semantic HTML (`<h2>`, `<article>`, `<section>`).
- Intent-based sections:
  - `<h2>Best Tents for High Winds & Alpine Storms</h2>`: Structural engineering (geodesic poles, Easton Syclone composites, hydrostatic head ratings).
  - `<h2>Best Ultralight Tents for Thru-Hiking & Fastpacking</h2>`: Weight management, high-volume hub geometry, OSMO wet-sag resistance.
  - `<h2>Best Family & Car Camping Tents for High Comfort and Headroom</h2>`: Standing clearance, bug-free screen rooms, welded tub floors.
  - `<h2>3-Season vs. 4-Season Tent Architecture: Entity Attribute Matrix</h2>`: Technical comparison table.
- Interactive Intent Triggers: Shoppers and search auditors can click intent buttons to filter the grid in real-time.

### 4. Technical SEO & Schema Live Inspector HUD
- Modal to inspect the live `<link rel="canonical">` tag, test filter query parameters, and copy the exact JSON-LD payloads.

---

## 🛠️ Tech Stack
- **Framework:** Next.js 16 (App Router, Turbopack)
- **Language:** TypeScript
- **Styling:** Tailwind CSS
- **Icons:** Lucide React
- **Schemas:** Schema.org (ItemList, Product, BreadcrumbList, Offer, AggregateRating)

---

## 💻 Quick Start

```bash
# Clone or navigate to the directory
cd ecommerce-plp-semantic-hub

# Install dependencies
npm install

# Start development server
npm run dev -- -p 3001
```

Visit [http://localhost:3001/tents](http://localhost:3001/tents) or [http://localhost:3001](http://localhost:3001).
