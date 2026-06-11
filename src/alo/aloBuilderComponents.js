import AloNavBar from './AloNavBar';
import AloCategoryGridCMS from './AloCategoryGridCMS';
import AloPlpGridCMS from './AloPlpGridCMS';
import AnnouncementBanner from './AnnouncementBanner';
import CollectionHeader from './CollectionHeader';
import ProductCard from './ProductCard';
import ProductGrid from './ProductGrid';
import SectionTabNav from './SectionTabNav';
import PlpTile from './PlpTile';
import PlpFilterPanel from './PlpFilterPanel';
import PlpGrid from './PlpGrid';

const ALO = 'ALO';

const aloBuilderComponents = [
  {
    component: AloNavBar,
    name: 'AloNavBar',
    category: ALO,
    image: 'https://cdn.builder.io/api/v1/image/assets%2FYJIGb4i01jvw0SRdL5Bt%2F72c80f114dc149019051b6852a9e3b7a',
    inputs: [],
  },

  {
    component: AnnouncementBanner,
    name: 'AloAnnouncementBanner',
    category: ALO,
    inputs: [
      {
        name: 'message',
        type: 'string',
        defaultValue: 'ENJOY COMPLIMENTARY SHIPPING & RETURNS',
      },
    ],
  },

  {
    component: CollectionHeader,
    name: 'AloCollectionHeader',
    category: ALO,
    inputs: [
      { name: 'title', type: 'string', defaultValue: 'The Bag Collection' },
      {
        name: 'description',
        type: 'string',
        defaultValue:
          'As the next evolution of our Atelier line, the Bag Collection was designed with intentional living in mind.',
      },
    ],
  },

  {
    component: ProductGrid,
    name: 'AloProductGrid',
    category: ALO,
    canHaveChildren: true,
    inputs: [],
  },

  {
    component: ProductCard,
    name: 'AloProductCard',
    category: ALO,
    inputs: [
      { name: 'href', type: 'string', defaultValue: 'https://www.aloyoga.com/' },
      {
        name: 'mediaType',
        type: 'string',
        defaultValue: 'image',
        enum: ['image', 'video'],
      },
      { name: 'mediaSrc', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp', 'mp4', 'mov'] },
      { name: 'videoPoster', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
      { name: 'name', type: 'string', defaultValue: 'ALO Voyage' },
      {
        name: 'description',
        type: 'string',
        defaultValue: 'A signature bag for every moment of your day.',
      },
      { name: 'availability', type: 'string', defaultValue: 'Available in three sizes.' },
    ],
  },

  {
    component: SectionTabNav,
    name: 'AloSectionTabNav',
    category: ALO,
    inputs: [
      {
        name: 'tabs',
        type: 'list',
        defaultValue: [
          { label: 'Collection', active: true, href: '' },
          { label: 'Editorial', active: false, href: 'https://www.aloyoga.com/pages/bag-collection' },
        ],
        subFields: [
          { name: 'label', type: 'string', defaultValue: 'Tab' },
          { name: 'active', type: 'boolean', defaultValue: false },
          { name: 'href', type: 'string', defaultValue: '' },
        ],
      },
    ],
  },

  {
    component: PlpGrid,
    name: 'AloPlpGrid',
    category: ALO,
    canHaveChildren: true,
    inputs: [
      { name: 'title', type: 'string', defaultValue: 'Shop the Collection' },
    ],
  },

  {
    component: PlpTile,
    name: 'AloPlpTile',
    category: ALO,
    inputs: [
      { name: 'href', type: 'string', defaultValue: 'https://www.aloyoga.com/' },
      { name: 'imageSrc', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
      { name: 'imageAlt', type: 'string', defaultValue: '' },
      { name: 'badge', type: 'string', defaultValue: '' },
      { name: 'name', type: 'string', defaultValue: 'ALO Mini Voyage' },
      { name: 'colorway', type: 'string', defaultValue: 'Black Leather' },
      { name: 'price', type: 'string', defaultValue: '$1,200' },
      {
        name: 'swatches',
        type: 'list',
        defaultValue: [{ color: '#000000', label: 'Black Leather' }],
        subFields: [
          { name: 'color', type: 'color', defaultValue: '#000000' },
          { name: 'label', type: 'string', defaultValue: 'Color' },
        ],
      },
      { name: 'extraColors', type: 'number', defaultValue: 0 },
    ],
  },

  {
    component: PlpFilterPanel,
    name: 'AloPlpFilterPanel',
    category: ALO,
    inputs: [
      {
        name: 'groups',
        type: 'list',
        defaultValue: [
          {
            label: 'Product Type',
            defaultOpen: true,
            options: [
              { value: 'Bag', label: 'Bag' },
              { value: 'Tote', label: 'Tote' },
            ],
          },
        ],
        subFields: [
          { name: 'label', type: 'string', defaultValue: 'Filter Group' },
          { name: 'defaultOpen', type: 'boolean', defaultValue: true },
          {
            name: 'options',
            type: 'list',
            defaultValue: [{ value: 'option', label: 'Option', swatch: '' }],
            subFields: [
              { name: 'value', type: 'string', defaultValue: 'option' },
              { name: 'label', type: 'string', defaultValue: 'Option' },
              { name: 'swatch', type: 'color' },
            ],
          },
        ],
      },
    ],
  },
  // ── CMS-driven category grid ────────────────────────────────────────────────
  {
    component: AloCategoryGridCMS,
    name: 'AloCategoryGridCMS',
    category: ALO,
    friendlyName: 'ALO Category Grid (CMS)',
    description: 'Collection card grid driven by the ALO Category content model.',
    inputs: [
      {
        name: 'populateBy',
        type: 'string',
        friendlyName: 'How to populate',
        helperText: 'Choose how to fill this grid: by product type, by picking specific categories, or show all.',
        defaultValue: 'all',
        enum: [
          { label: 'All Categories', value: 'all' },
          { label: 'By Product Type', value: 'type' },
          { label: 'By Specific Products', value: 'product' },
        ],
      },
      {
        name: 'productType',
        type: 'string',
        friendlyName: 'Product Type',
        helperText: 'Show only categories tagged with this product type.',
        defaultValue: 'bag',
        enum: [
          { label: 'Bag', value: 'bag' },
          { label: 'Crystal', value: 'crystal' },
        ],
        showIf: "options.get('populateBy') === 'type'",
      },
      {
        name: 'categories',
        type: 'list',
        friendlyName: 'Specific Categories',
        helperText: 'Pick individual ALO category entries to display.',
        showIf: "options.get('populateBy') === 'product'",
        subFields: [
          {
            name: 'category',
            type: 'reference',
            model: 'alo-category',
            helperText: 'Pick an ALO category',
          },
        ],
      },
    ],
  },

  // ── CMS-driven PLP grid ─────────────────────────────────────────────────────
  {
    component: AloPlpGridCMS,
    name: 'AloProductGridCMS',
    category: ALO,
    friendlyName: 'ALO PLP Grid (CMS)',
    description: 'Product listing grid driven by the ALO Product content model. Choose a category to display bags, crystals, or all products.',
    inputs: [
      { name: 'title', type: 'string', defaultValue: 'Shop the Collection' },
      { name: 'showFilters', type: 'boolean', defaultValue: true },
      {
        name: 'category',
        type: 'string',
        friendlyName: 'Product Category',
        helperText: 'Choose which category of products to display in this grid.',
        defaultValue: 'all',
        enum: [
          { label: 'All Products', value: 'all' },
          { label: 'Bags', value: 'bag' },
          { label: 'Crystals', value: 'crystal' },
        ],
      },
    ],
  },
];

export default aloBuilderComponents;
