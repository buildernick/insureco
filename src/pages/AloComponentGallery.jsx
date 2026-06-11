import React, { useState } from 'react';
import AnnouncementBanner from '../alo/AnnouncementBanner';
import CollectionHeader from '../alo/CollectionHeader';
import SectionTabNav from '../alo/SectionTabNav';
import PlpTile from '../alo/PlpTile';
import PlpGrid from '../alo/PlpGrid';
import PlpFilterPanel from '../alo/PlpFilterPanel';
import ProductCard from '../alo/ProductCard';
import ProductGrid from '../alo/ProductGrid';
import AloCategoryGridCMS from '../alo/AloCategoryGridCMS';
import AloPlpGridCMS from '../alo/AloPlpGridCMS';
import './AloComponentGallery.scss';

const SAMPLE_TABS = [
  { label: 'Collection', active: true },
  { label: 'Editorial', href: '#editorial' },
  { label: 'Lookbook', href: '#lookbook' },
];

const SAMPLE_TILES = [
  {
    href: '#product-1',
    imageSrc: 'https://picsum.photos/seed/alo1/600/900',
    imageAlt: 'Athletic pants',
    name: 'Airbrush High-Waist Legging',
    colorway: 'Midnight',
    price: '$98',
    badge: 'NEW',
    swatches: [
      { label: 'Midnight', color: '#1a1a2e' },
      { label: 'Slate', color: '#6c757d' },
      { label: 'Bone', color: '#e8dcc8' },
    ],
    extraColors: 4,
  },
  {
    href: '#product-2',
    imageSrc: 'https://picsum.photos/seed/alo2/600/900',
    imageAlt: 'Sports bra',
    name: 'Airlift Suit Up Bra',
    colorway: 'Ivory',
    price: '$78',
    swatches: [
      { label: 'Ivory', color: '#fffff0' },
      { label: 'Black', color: '#000000' },
    ],
    extraColors: 2,
  },
  {
    href: '#product-3',
    imageSrc: 'https://picsum.photos/seed/alo3/600/900',
    imageAlt: 'Yoga jacket',
    name: 'Define Jacket',
    colorway: 'Espresso',
    price: '$148',
    badge: 'BESTSELLER',
    swatches: [
      { label: 'Espresso', color: '#4a2c2a' },
      { label: 'Forest', color: '#228b22' },
    ],
    extraColors: 3,
  },
  {
    href: '#product-4',
    imageSrc: 'https://picsum.photos/seed/alo4/600/900',
    imageAlt: 'Cropped hoodie',
    name: 'Accolade Cropped Sweatshirt',
    colorway: 'Cloud',
    price: '$118',
    swatches: [
      { label: 'Cloud', color: '#d6d6d6' },
      { label: 'Navy', color: '#001f5b' },
      { label: 'Blush', color: '#f4c2c2' },
    ],
  },
];

const SAMPLE_PRODUCT_CARDS = [
  {
    href: '#bags',
    mediaSrc: 'https://picsum.photos/seed/alobag1/800/1000',
    name: 'The Tote Bag',
    description: 'A structured carry-all for every occasion.',
    availability: 'Available now',
  },
  {
    href: '#accessories',
    mediaSrc: 'https://picsum.photos/seed/alobag2/800/1000',
    name: 'The Mini Crossbody',
    description: 'Compact and effortless—perfect for on-the-go.',
    availability: 'Available now',
  },
  {
    href: '#tote',
    mediaSrc: 'https://picsum.photos/seed/alobag3/800/1000',
    name: 'The Weekender',
    description: 'Designed for the mindful traveler.',
    availability: 'Coming soon',
  },
];

const FILTER_GROUPS = [
  {
    label: 'Color',
    defaultOpen: true,
    options: [
      { value: 'black', label: 'Black', swatch: '#000000' },
      { value: 'white', label: 'White', swatch: '#ffffff' },
      { value: 'navy', label: 'Navy', swatch: '#001f5b' },
      { value: 'espresso', label: 'Espresso', swatch: '#4a2c2a' },
      { value: 'blush', label: 'Blush', swatch: '#f4c2c2' },
    ],
  },
  {
    label: 'Size',
    defaultOpen: false,
    options: [
      { value: 'xs', label: 'XS' },
      { value: 's', label: 'S' },
      { value: 'm', label: 'M' },
      { value: 'l', label: 'L' },
      { value: 'xl', label: 'XL' },
    ],
  },
  {
    label: 'Category',
    defaultOpen: false,
    options: [
      { value: 'leggings', label: 'Leggings' },
      { value: 'bras', label: 'Sports Bras' },
      { value: 'tops', label: 'Tops' },
      { value: 'jackets', label: 'Jackets' },
    ],
  },
];

function GallerySection({ id, name, description, children, fullWidth = false }) {
  return (
    <section className="gallery-section" id={id}>
      <div className="gallery-section__header">
        <div className="gallery-section__meta">
          <code className="gallery-section__component-name">{name}</code>
          {description && (
            <p className="gallery-section__description">{description}</p>
          )}
        </div>
      </div>
      <div className={`gallery-section__demo${fullWidth ? ' gallery-section__demo--full' : ''}`}>
        {children}
      </div>
    </section>
  );
}

export default function AloComponentGallery() {
  const [selectedColors, setSelectedColors] = useState([]);

  function handleColorToggle(value) {
    setSelectedColors((prev) =>
      prev.includes(value) ? prev.filter((v) => v !== value) : [...prev, value]
    );
  }

  return (
    <div className="alo-gallery">
      <div className="alo-gallery__hero">
        <h1 className="alo-gallery__title">ALO Component Gallery</h1>
        <p className="alo-gallery__subtitle">
          All available ALO Yoga UI components — live, interactive, and ready to use.
        </p>
        <nav className="alo-gallery__jump-nav" aria-label="Jump to component">
          {[
            ['AnnouncementBanner', '#announcement-banner'],
            ['CollectionHeader', '#collection-header'],
            ['SectionTabNav', '#section-tab-nav'],
            ['PlpTile', '#plp-tile'],
            ['PlpFilterPanel', '#plp-filter-panel'],
            ['PlpGrid', '#plp-grid'],
            ['ProductCard', '#product-card'],
            ['ProductGrid', '#product-grid'],
            ['AloCategoryGridCMS', '#category-grid-cms'],
            ['AloPlpGridCMS', '#plp-grid-cms'],
          ].map(([label, href]) => (
            <a key={href} href={href} className="alo-gallery__jump-link">
              {label}
            </a>
          ))}
        </nav>
      </div>

      <div className="alo-gallery__sections">

        <GallerySection
          id="announcement-banner"
          name="AnnouncementBanner"
          description="A slim promotional banner displayed above the navigation. Accepts a message string."
          fullWidth
        >
          <AnnouncementBanner message="ENJOY COMPLIMENTARY SHIPPING & RETURNS ON ALL ORDERS" />
        </GallerySection>

        <GallerySection
          id="collection-header"
          name="CollectionHeader"
          description="Hero header for collection and editorial pages. Accepts a title and description."
          fullWidth
        >
          <CollectionHeader
            title="The Bag Collection"
            description="As the next evolution of our Atelier line, the Bag Collection was designed with intentional living in mind."
          />
        </GallerySection>

        <GallerySection
          id="section-tab-nav"
          name="SectionTabNav"
          description="Horizontal tab navigation for switching between collection views. Active tab is styled as text; inactive tabs are links."
        >
          <SectionTabNav tabs={SAMPLE_TABS} />
        </GallerySection>

        <GallerySection
          id="plp-tile"
          name="PlpTile"
          description="Individual product tile used on PLP pages. Includes wishlist toggle, color swatches, badge, name, colorway, price, and an add-to-bag hover overlay."
        >
          <div className="gallery-tile-grid">
            {SAMPLE_TILES.map((tile) => (
              <PlpTile key={tile.href} {...tile} />
            ))}
          </div>
        </GallerySection>

        <GallerySection
          id="plp-filter-panel"
          name="PlpFilterPanel"
          description="Filter sidebar with accordion sections. Supports color swatches and plain-text checkbox options. Stateful — try checking items below."
        >
          <div className="gallery-filter-demo">
            <PlpFilterPanel
              groups={FILTER_GROUPS}
              selectedColors={selectedColors}
              onColorToggle={handleColorToggle}
            />
            {selectedColors.length > 0 && (
              <p className="gallery-filter-selection">
                Active filters: {selectedColors.join(', ')}
              </p>
            )}
          </div>
        </GallerySection>

        <GallerySection
          id="plp-grid"
          name="PlpGrid"
          description="Layout wrapper for PLP pages. Arranges tiles in a responsive grid and optionally renders a sidebar (e.g. PlpFilterPanel) beside the content."
          fullWidth
        >
          <PlpGrid
            title="Shop the Collection"
            sidebar={
              <PlpFilterPanel
                groups={FILTER_GROUPS}
                selectedColors={selectedColors}
                onColorToggle={handleColorToggle}
              />
            }
          >
            {SAMPLE_TILES.map((tile) => (
              <PlpTile key={tile.href} {...tile} />
            ))}
          </PlpGrid>
        </GallerySection>

        <GallerySection
          id="product-card"
          name="ProductCard"
          description="Category card used in editorial and curated grid sections. Supports image or video media along with name, description, and availability text."
        >
          <div className="gallery-product-card-row">
            {SAMPLE_PRODUCT_CARDS.map((card) => (
              <ProductCard key={card.href} {...card} />
            ))}
          </div>
        </GallerySection>

        <GallerySection
          id="product-grid"
          name="ProductGrid"
          description="Simple horizontal grid wrapper for ProductCard components."
          fullWidth
        >
          <ProductGrid>
            {SAMPLE_PRODUCT_CARDS.map((card) => (
              <ProductCard key={card.href} {...card} />
            ))}
          </ProductGrid>
        </GallerySection>

        <GallerySection
          id="category-grid-cms"
          name="AloCategoryGridCMS"
          description="CMS-driven category grid. Fetches alo-category entries from Builder.io and renders them through ProductGrid and ProductCard. Content is managed in Builder."
          fullWidth
        >
          <AloCategoryGridCMS />
        </GallerySection>

        <GallerySection
          id="plp-grid-cms"
          name="AloPlpGridCMS"
          description="CMS-driven PLP grid. Fetches alo-product entries from Builder.io, supports category filtering, and optionally renders a color filter sidebar."
          fullWidth
        >
          <AloPlpGridCMS title="All Products" showFilters />
        </GallerySection>

      </div>
    </div>
  );
}
