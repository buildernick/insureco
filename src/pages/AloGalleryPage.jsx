import React from 'react';
import AnnouncementBanner from '../alo/AnnouncementBanner';
import CollectionHeader from '../alo/CollectionHeader';
import SectionTabNav from '../alo/SectionTabNav';
import ProductGrid from '../alo/ProductGrid';
import ProductCard from '../alo/ProductCard';
import PlpGrid from '../alo/PlpGrid';
import PlpTile from '../alo/PlpTile';
import PlpFilterPanel from '../alo/PlpFilterPanel';
import AloCategoryGridCMS from '../alo/AloCategoryGridCMS';
import AloPlpGridCMS from '../alo/AloPlpGridCMS';
import './AloGalleryPage.scss';

const SAMPLE_TABS = [
  { label: 'Collection', active: true },
  { label: 'Editorial', href: 'https://www.aloyoga.com/pages/bag-collection' },
  { label: 'Lookbook', href: 'https://www.aloyoga.com/pages/bag-collection' },
];

// These image URLs come from the ALO nav data already in the codebase
const IMG_ATELIER   = 'https://cdn.shopify.com/s/files/1/2185/2813/files/atelier_desktop_nav.jpg?v=1780526666';
const IMG_BAG       = 'https://cdn.shopify.com/s/files/1/2185/2813/files/desktop_bag_campaign_image.jpg?v=1780592100';
const IMG_FOOTWEAR  = 'https://cdn.shopify.com/s/files/1/2185/2813/files/atelier_footwear_desktop_nav.jpg?v=1780526724';
const IMG_TRAIL     = 'https://cdn.builder.io/api/v1/image/assets%2Faa96744e7fe74e2a90d22918299c1f1d%2F95ea4cc14ccb4315b63f916f30049c99';
const IMG_SUNSET    = 'https://cdn.builder.io/api/v1/image/assets%2Faa96744e7fe74e2a90d22918299c1f1d%2F3e6b0bb22344416b8d22e5ffbd93c8e5';
const IMG_RUNNER    = 'https://cdn.builder.io/api/v1/image/assets%2Faa96744e7fe74e2a90d22918299c1f1d%2F91611194e967450a9c0949602f81ec2b';

const SAMPLE_CARDS = [
  {
    href: 'https://www.aloyoga.com/pages/bag-collection',
    mediaType: 'image',
    mediaSrc: IMG_BAG,
    name: 'The Bag Collection',
    description: 'Designed with intentional living in mind.',
    availability: 'Available now.',
  },
  {
    href: 'https://www.aloyoga.com/pages/summer-atelier',
    mediaType: 'image',
    mediaSrc: IMG_ATELIER,
    name: 'Atelier Campaign',
    description: 'The next evolution of the Atelier line.',
    availability: 'Limited availability.',
  },
  {
    href: 'https://www.aloyoga.com/collections/shoes',
    mediaType: 'image',
    mediaSrc: IMG_FOOTWEAR,
    name: 'Atelier Footwear',
    description: 'Elevated silhouettes for every occasion.',
    availability: 'Shop the collection.',
  },
];

const SAMPLE_TILES = [
  {
    href: 'https://www.aloyoga.com/products/a0892u-alo-trail-white',
    imageSrc: IMG_TRAIL,
    imageAlt: 'ALO Trail Sneaker',
    name: 'ALO Trail',
    colorway: 'White',
    price: '$198',
    badge: 'NEW',
    swatches: [
      { color: '#FFFFFF', label: 'White' },
      { color: '#000000', label: 'Black' },
      { color: '#C0B090', label: 'Sand' },
    ],
    extraColors: 2,
  },
  {
    href: 'https://www.aloyoga.com/products/a0891u-alo-sunset-sneaker-black-ivory',
    imageSrc: IMG_SUNSET,
    imageAlt: 'ALO Sunset Sneaker in Black Ivory',
    name: 'ALO Sunset Sneaker',
    colorway: 'Black / Ivory',
    price: '$178',
    badge: 'BEST SELLER',
    swatches: [
      { color: '#1A1A1A', label: 'Black / Ivory' },
      { color: '#F5F0E8', label: 'White / Ivory' },
    ],
    extraColors: 3,
  },
  {
    href: 'https://www.aloyoga.com/products/a0590u-alo-runner-white-white',
    imageSrc: IMG_RUNNER,
    imageAlt: 'ALO Runner in White',
    name: 'ALO Runner',
    colorway: 'White / White',
    price: '$168',
    badge: '',
    swatches: [
      { color: '#FFFFFF', label: 'White' },
      { color: '#000000', label: 'Black' },
    ],
    extraColors: 1,
  },
  {
    href: 'https://www.aloyoga.com/pages/bag-collection',
    imageSrc: IMG_BAG,
    imageAlt: 'ALO Voyage Bag',
    name: 'Mini Voyage Bag',
    colorway: 'Black Leather',
    price: '$1,200',
    badge: '',
    swatches: [
      { color: '#000000', label: 'Black Leather' },
      { color: '#8B7355', label: 'Tan Leather' },
    ],
    extraColors: 1,
  },
];

const FILTER_GROUPS = [
  {
    label: 'Product Type',
    defaultOpen: true,
    options: [
      { value: 'bag', label: 'Bag' },
      { value: 'tote', label: 'Tote' },
      { value: 'backpack', label: 'Backpack' },
      { value: 'clutch', label: 'Clutch' },
    ],
  },
  {
    label: 'Color',
    defaultOpen: true,
    options: [
      { value: 'black', label: 'Black', swatch: '#000000' },
      { value: 'tan', label: 'Tan', swatch: '#8B7355' },
      { value: 'cream', label: 'Cream', swatch: '#F5F5DC' },
      { value: 'white', label: 'White', swatch: '#FFFFFF' },
    ],
  },
  {
    label: 'Price',
    defaultOpen: false,
    options: [
      { value: 'under-500', label: 'Under $500' },
      { value: '500-1000', label: '$500 – $1,000' },
      { value: 'over-1000', label: 'Over $1,000' },
    ],
  },
];

function GallerySection({ name, description, children, fullWidth = false }) {
  return (
    <section className="gallery-section">
      <div className="gallery-section__label-row">
        <span className="gallery-section__component-tag">{name}</span>
        {description && <p className="gallery-section__description">{description}</p>}
      </div>
      <div className={`gallery-section__demo${fullWidth ? ' gallery-section__demo--full' : ''}`}>
        {children}
      </div>
    </section>
  );
}

export default function AloGalleryPage() {
  return (
    <div className="alo-gallery">
      <header className="alo-gallery__header">
        <p className="alo-gallery__eyebrow">Component Library</p>
        <h1 className="alo-gallery__title">ALO Components</h1>
        <p className="alo-gallery__subtitle">
          A live showcase of all reusable ALO design system components.
        </p>
      </header>

      <div className="alo-gallery__sections">

        <GallerySection
          name="AnnouncementBanner"
          description="Full-width burgundy strip for promotional messaging."
          fullWidth
        >
          <AnnouncementBanner message="ENJOY COMPLIMENTARY SHIPPING & RETURNS" />
        </GallerySection>

        <GallerySection
          name="CollectionHeader"
          description="Collection landing header with title and descriptive copy."
          fullWidth
        >
          <CollectionHeader
            title="The Bag Collection"
            description="As the next evolution of our Atelier line, the Bag Collection was designed with intentional living in mind."
          />
        </GallerySection>

        <GallerySection
          name="SectionTabNav"
          description="Horizontal tab strip for collection navigation."
          fullWidth
        >
          <SectionTabNav tabs={SAMPLE_TABS} />
        </GallerySection>

        <GallerySection
          name="ProductGrid + ProductCard"
          description="CMS-authored collection cards arranged in a horizontal grid. Each card supports image or video media."
          fullWidth
        >
          <ProductGrid>
            {SAMPLE_CARDS.map((card) => (
              <ProductCard key={card.name} {...card} />
            ))}
          </ProductGrid>
        </GallerySection>

        <GallerySection
          name="PlpTile"
          description="Individual product listing tile with wishlist toggle, color swatches, badge, and add-to-bag overlay."
        >
          <div className="gallery-tile-row">
            {SAMPLE_TILES.slice(0, 2).map((tile) => (
              <PlpTile key={tile.name} {...tile} />
            ))}
          </div>
        </GallerySection>

        <GallerySection
          name="PlpFilterPanel"
          description="Collapsible sidebar filter panel with checkbox groups and color swatches."
        >
          <div className="gallery-filter-demo">
            <PlpFilterPanel groups={FILTER_GROUPS} selectedColors={[]} onColorToggle={() => {}} />
          </div>
        </GallerySection>

        <GallerySection
          name="PlpGrid + PlpFilterPanel + PlpTile"
          description="Full product listing layout combining the filter sidebar with the tile grid."
          fullWidth
        >
          <PlpGrid
            title="Shop the Collection"
            sidebar={
              <PlpFilterPanel
                groups={FILTER_GROUPS}
                selectedColors={[]}
                onColorToggle={() => {}}
              />
            }
          >
            {SAMPLE_TILES.map((tile) => (
              <PlpTile key={tile.name + tile.colorway} {...tile} />
            ))}
          </PlpGrid>
        </GallerySection>

        <GallerySection
          name="AloCategoryGridCMS"
          description="CMS-driven category card grid powered by the alo-category Builder.io model."
          fullWidth
        >
          <AloCategoryGridCMS />
        </GallerySection>

        <GallerySection
          name="AloPlpGridCMS"
          description="CMS-driven product listing grid powered by the alo-product Builder.io model."
          fullWidth
        >
          <AloPlpGridCMS title="Shop the Collection" showFilters={false} />
        </GallerySection>

      </div>
    </div>
  );
}
