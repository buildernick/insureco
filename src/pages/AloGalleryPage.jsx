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

const SAMPLE_CARDS = [
  {
    href: 'https://www.aloyoga.com/',
    mediaType: 'image',
    mediaSrc: 'https://cdn.shopify.com/s/files/1/0376/4549/files/alo_bag_mini_voyage_black_1.jpg',
    name: 'Mini Voyage Bag',
    description: 'A compact companion for every journey.',
    availability: 'Available in three sizes.',
  },
  {
    href: 'https://www.aloyoga.com/',
    mediaType: 'image',
    mediaSrc: 'https://cdn.shopify.com/s/files/1/0376/4549/files/alo_bag_micro_voyage_black_1.jpg',
    name: 'Micro Voyage Bag',
    description: 'The smallest expression of the Voyage line.',
    availability: 'Available in two colors.',
  },
  {
    href: 'https://www.aloyoga.com/',
    mediaType: 'image',
    mediaSrc: 'https://cdn.shopify.com/s/files/1/0376/4549/files/alo_bag_maxi_voyage_black_1.jpg',
    name: 'Maxi Voyage Bag',
    description: 'Generous capacity for intentional living.',
    availability: 'One size.',
  },
];

const SAMPLE_TILES = [
  {
    href: 'https://www.aloyoga.com/',
    imageSrc: 'https://cdn.shopify.com/s/files/1/0376/4549/files/alo_bag_mini_voyage_black_1.jpg',
    imageAlt: 'Mini Voyage Bag in Black',
    name: 'Mini Voyage Bag',
    colorway: 'Black Leather',
    price: '$1,200',
    badge: 'NEW',
    swatches: [
      { color: '#000000', label: 'Black Leather' },
      { color: '#8B7355', label: 'Tan Leather' },
      { color: '#F5F5DC', label: 'Cream' },
    ],
    extraColors: 2,
  },
  {
    href: 'https://www.aloyoga.com/',
    imageSrc: 'https://cdn.shopify.com/s/files/1/0376/4549/files/alo_bag_micro_voyage_black_1.jpg',
    imageAlt: 'Micro Voyage Bag in Black',
    name: 'Micro Voyage Bag',
    colorway: 'Black Leather',
    price: '$850',
    badge: '',
    swatches: [
      { color: '#000000', label: 'Black Leather' },
      { color: '#8B7355', label: 'Tan Leather' },
    ],
    extraColors: 1,
  },
  {
    href: 'https://www.aloyoga.com/',
    imageSrc: 'https://cdn.shopify.com/s/files/1/0376/4549/files/alo_bag_maxi_voyage_black_1.jpg',
    imageAlt: 'Maxi Voyage Bag in Black',
    name: 'Maxi Voyage Bag',
    colorway: 'Black Leather',
    price: '$1,600',
    badge: 'BEST SELLER',
    swatches: [
      { color: '#000000', label: 'Black Leather' },
    ],
    extraColors: 0,
  },
  {
    href: 'https://www.aloyoga.com/',
    imageSrc: 'https://cdn.shopify.com/s/files/1/0376/4549/files/alo_bag_mini_voyage_black_1.jpg',
    imageAlt: 'Voyage Tote in Black',
    name: 'Voyage Tote',
    colorway: 'Black',
    price: '$980',
    badge: '',
    swatches: [
      { color: '#000000', label: 'Black' },
      { color: '#F5F5DC', label: 'Cream' },
    ],
    extraColors: 3,
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
