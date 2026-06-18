import HeroSection from './HeroSection';
import BenefitCard from './BenefitCard';
import SplitHero from './SplitHero';
import TestimonialsSection from './TestimonialsSection';
import BoldBanner from './BoldBanner';
import BuilderHeading from './BuilderHeading';
import BuilderEyebrow from './BuilderEyebrow';
import BuilderSubtitle from './BuilderSubtitle';
import BuilderBody from './BuilderBody';
import CarbonButton from './CarbonButton';

const ALIGN_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
];

// Wireframe SVG icons — 48×36 viewBox, outline/minimal style
const icons = {
  // Full-width hero: image backdrop + headline bar + two button outlines
  HeroSection: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36">
    <rect x="0" y="0" width="48" height="36" rx="2" fill="none" stroke="#8d8d8d" stroke-width="1"/>
    <line x1="0" y1="22" x2="48" y2="22" stroke="#8d8d8d" stroke-width="0.75" stroke-dasharray="2,2"/>
    <rect x="5" y="6" width="22" height="3.5" rx="1" fill="none" stroke="#161616" stroke-width="1.25"/>
    <rect x="5" y="12" width="16" height="2" rx="0.75" fill="none" stroke="#525252" stroke-width="1"/>
    <rect x="5" y="26" width="12" height="6" rx="1.5" fill="none" stroke="#da1e28" stroke-width="1.25"/>
    <rect x="20" y="26" width="12" height="6" rx="1.5" fill="none" stroke="#525252" stroke-width="1"/>
    <circle cx="38" cy="11" r="5" fill="none" stroke="#8d8d8d" stroke-width="1"/>
    <line x1="35" y1="14" x2="41" y2="8" stroke="#8d8d8d" stroke-width="0.75"/>
  </svg>`,

  // Card with icon circle, title bar, and description lines
  BenefitCard: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36">
    <rect x="2" y="1" width="44" height="34" rx="2" fill="none" stroke="#8d8d8d" stroke-width="1"/>
    <circle cx="24" cy="12" r="6" fill="none" stroke="#da1e28" stroke-width="1.25"/>
    <rect x="12" y="22" width="24" height="3" rx="1" fill="none" stroke="#161616" stroke-width="1"/>
    <rect x="7" y="28" width="34" height="2" rx="0.75" fill="none" stroke="#8d8d8d" stroke-width="1"/>
    <rect x="10" y="32" width="28" height="2" rx="0.75" fill="none" stroke="#8d8d8d" stroke-width="1"/>
  </svg>`,

  // Two-column: text panel left, image placeholder right
  SplitHero: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36">
    <rect x="0" y="0" width="22" height="36" rx="2" fill="none" stroke="#8d8d8d" stroke-width="1"/>
    <rect x="3" y="5" width="16" height="3" rx="0.75" fill="none" stroke="#161616" stroke-width="1.1"/>
    <rect x="3" y="11" width="13" height="2" rx="0.75" fill="none" stroke="#8d8d8d" stroke-width="0.9"/>
    <circle cx="5" cy="18" r="1.5" fill="none" stroke="#da1e28" stroke-width="1"/>
    <rect x="8.5" y="17" width="10" height="2" rx="0.75" fill="none" stroke="#525252" stroke-width="0.9"/>
    <circle cx="5" cy="23" r="1.5" fill="none" stroke="#da1e28" stroke-width="1"/>
    <rect x="8.5" y="22" width="8" height="2" rx="0.75" fill="none" stroke="#525252" stroke-width="0.9"/>
    <rect x="3" y="28" width="14" height="5" rx="1.5" fill="none" stroke="#da1e28" stroke-width="1.1"/>
    <rect x="26" y="0" width="22" height="36" rx="2" fill="none" stroke="#8d8d8d" stroke-width="1"/>
    <line x1="26" y1="0" x2="48" y2="36" stroke="#c8d5e8" stroke-width="0.75"/>
    <line x1="26" y1="36" x2="48" y2="0" stroke="#c8d5e8" stroke-width="0.75"/>
    <circle cx="37" cy="12" r="3" fill="none" stroke="#8d8d8d" stroke-width="1"/>
  </svg>`,

  // Two quote cards side by side with a heading bar above
  TestimonialsSection: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36">
    <rect x="6" y="2" width="36" height="3" rx="1" fill="none" stroke="#161616" stroke-width="1"/>
    <rect x="1" y="9" width="21" height="24" rx="2" fill="none" stroke="#8d8d8d" stroke-width="1"/>
    <rect x="4" y="12" width="3" height="4" rx="0.75" fill="none" stroke="#da1e28" stroke-width="1"/>
    <rect x="4" y="19" width="14" height="1.5" rx="0.75" fill="none" stroke="#525252" stroke-width="0.9"/>
    <rect x="4" y="22" width="11" height="1.5" rx="0.75" fill="none" stroke="#525252" stroke-width="0.9"/>
    <rect x="4" y="27" width="8" height="1.5" rx="0.75" fill="none" stroke="#8d8d8d" stroke-width="0.9"/>
    <rect x="26" y="9" width="21" height="24" rx="2" fill="none" stroke="#8d8d8d" stroke-width="1"/>
    <rect x="29" y="12" width="3" height="4" rx="0.75" fill="none" stroke="#da1e28" stroke-width="1"/>
    <rect x="29" y="19" width="14" height="1.5" rx="0.75" fill="none" stroke="#525252" stroke-width="0.9"/>
    <rect x="29" y="22" width="11" height="1.5" rx="0.75" fill="none" stroke="#525252" stroke-width="0.9"/>
    <rect x="29" y="27" width="8" height="1.5" rx="0.75" fill="none" stroke="#8d8d8d" stroke-width="0.9"/>
  </svg>`,

  // Full-width dark band: heading + subtext + CTA button
  BoldBanner: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36">
    <rect x="0" y="3" width="48" height="30" rx="2" fill="none" stroke="#161616" stroke-width="1.5"/>
    <rect x="8" y="9" width="32" height="4" rx="1" fill="none" stroke="#161616" stroke-width="1.1"/>
    <rect x="11" y="16" width="26" height="2" rx="0.75" fill="none" stroke="#8d8d8d" stroke-width="0.9"/>
    <rect x="14" y="22" width="20" height="7" rx="1.5" fill="none" stroke="#da1e28" stroke-width="1.25"/>
  </svg>`,

  // Large heading bar with smaller subtitle lines below
  Heading: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36">
    <rect x="3" y="8" width="42" height="8" rx="1.5" fill="none" stroke="#161616" stroke-width="1.5"/>
    <rect x="3" y="21" width="30" height="2.5" rx="1" fill="none" stroke="#8d8d8d" stroke-width="1"/>
    <rect x="3" y="26" width="22" height="2.5" rx="1" fill="none" stroke="#8d8d8d" stroke-width="1"/>
  </svg>`,

  // Narrow label bar + heading bar below
  Eyebrow: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36">
    <rect x="3" y="5" width="16" height="2.5" rx="1" fill="none" stroke="#da1e28" stroke-width="1.1"/>
    <rect x="3" y="11" width="42" height="7" rx="1.5" fill="none" stroke="#161616" stroke-width="1.4"/>
    <rect x="3" y="22" width="34" height="2" rx="0.75" fill="none" stroke="#8d8d8d" stroke-width="0.9"/>
    <rect x="3" y="27" width="26" height="2" rx="0.75" fill="none" stroke="#8d8d8d" stroke-width="0.9"/>
  </svg>`,

  // Medium text bar: sits between a heading and body
  Subtitle: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36">
    <rect x="3" y="5" width="42" height="3.5" rx="1" fill="none" stroke="#525252" stroke-width="1.2"/>
    <rect x="3" y="12" width="42" height="3.5" rx="1" fill="none" stroke="#525252" stroke-width="1.2"/>
    <rect x="3" y="19" width="30" height="3.5" rx="1" fill="none" stroke="#525252" stroke-width="1.2"/>
    <rect x="3" y="29" width="18" height="2" rx="0.75" fill="none" stroke="#c6c6c6" stroke-width="0.9"/>
  </svg>`,

  // Multiple narrow lines — classic paragraph representation
  Body: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36">
    <rect x="3" y="4" width="42" height="2" rx="0.75" fill="none" stroke="#525252" stroke-width="1"/>
    <rect x="3" y="9" width="42" height="2" rx="0.75" fill="none" stroke="#525252" stroke-width="1"/>
    <rect x="3" y="14" width="42" height="2" rx="0.75" fill="none" stroke="#525252" stroke-width="1"/>
    <rect x="3" y="19" width="28" height="2" rx="0.75" fill="none" stroke="#525252" stroke-width="1"/>
    <rect x="3" y="26" width="42" height="2" rx="0.75" fill="none" stroke="#525252" stroke-width="1"/>
    <rect x="3" y="31" width="20" height="2" rx="0.75" fill="none" stroke="#525252" stroke-width="1"/>
  </svg>`,

  // Simple button outline
  CarbonButton: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 36">
    <rect x="4" y="10" width="40" height="16" rx="2" fill="none" stroke="#161616" stroke-width="1.5"/>
    <rect x="13" y="16" width="22" height="4" rx="1" fill="none" stroke="#525252" stroke-width="1"/>
    <rect x="36" y="13" width="6" height="10" rx="0" fill="none" stroke="#da1e28" stroke-width="0" />
    <rect x="37" y="14" width="4" height="8" rx="1" fill="#da1e28" opacity="0.15"/>
  </svg>`,
};

// Encode an SVG string to a data URI
const toDataURI = (svg) =>
  `data:image/svg+xml,${encodeURIComponent(svg.trim())}`;

const builderComponents = [
  // ── Section components ──────────────────────────────────────────────────────
  {
    component: HeroSection,
    name: 'HeroSection',
    image: toDataURI(icons.HeroSection),
    inputs: [
      { name: 'headline', type: 'string', defaultValue: 'Protect Your Future with Confidence' },
      { name: 'tagline', type: 'string', defaultValue: 'Comprehensive car and home insurance designed for the modern world.' },
      { name: 'backgroundImage', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
      { name: 'primaryCtaText', type: 'string', defaultValue: 'Sign Up Now' },
      { name: 'primaryCtaUrl', type: 'string', defaultValue: '/signup' },
      { name: 'secondaryCtaText', type: 'string', defaultValue: 'Learn More' },
      { name: 'secondaryCtaUrl', type: 'string', defaultValue: '/' },
    ],
  },
  {
    component: BenefitCard,
    name: 'BenefitCard',
    image: toDataURI(icons.BenefitCard),
    inputs: [
      { name: 'title', type: 'string', defaultValue: 'Benefit Title' },
      { name: 'description', type: 'string', defaultValue: 'Describe the benefit here.' },
      {
        name: 'icon',
        type: 'string',
        defaultValue: 'Security',
        enum: ['Security', 'CheckmarkFilled', 'Car', 'Home'],
      },
    ],
  },
  {
    component: SplitHero,
    name: 'SplitHero',
    image: toDataURI(icons.SplitHero),
    inputs: [
      { name: 'heading', type: 'string', defaultValue: 'Insurance Heading' },
      { name: 'description', type: 'string', defaultValue: 'Describe the product here.' },
      {
        name: 'bullets',
        type: 'list',
        subFields: [{ name: 'text', type: 'string', defaultValue: 'Feature bullet point' }],
        defaultValue: [{ text: 'Coverage included' }],
      },
      { name: 'ctaText', type: 'string', defaultValue: 'Learn More' },
      { name: 'ctaUrl', type: 'string', defaultValue: '/signup' },
      { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
      { name: 'imageAlt', type: 'string', defaultValue: '' },
      {
        name: 'imagePosition',
        type: 'string',
        defaultValue: 'right',
        enum: ['left', 'right'],
      },
      {
        name: 'background',
        type: 'string',
        defaultValue: 'primary',
        enum: ['primary', 'secondary'],
      },
    ],
  },
  {
    component: TestimonialsSection,
    name: 'TestimonialsSection',
    image: toDataURI(icons.TestimonialsSection),
    inputs: [
      { name: 'sectionHeading', type: 'string', defaultValue: 'What Our Customers Say' },
      {
        name: 'testimonials',
        type: 'list',
        subFields: [
          { name: 'quote', type: 'string', defaultValue: 'This is a great product!' },
          { name: 'author', type: 'string', defaultValue: 'Customer Name' },
          { name: 'role', type: 'string', defaultValue: 'Customer since 2024' },
        ],
        defaultValue: [
          {
            quote: 'InsureCo made switching my insurance so easy.',
            author: 'Sarah Johnson',
            role: 'Customer since 2022',
          },
        ],
      },
    ],
  },
  {
    component: BoldBanner,
    name: 'BoldBanner',
    image: toDataURI(icons.BoldBanner),
    inputs: [
      { name: 'heading', type: 'string', defaultValue: "Ready to Get Started?" },
      { name: 'subtext', type: 'string', defaultValue: 'Join thousands of satisfied customers who trust InsureCo.' },
      { name: 'ctaText', type: 'string', defaultValue: 'Get Your Free Quote' },
      { name: 'ctaUrl', type: 'string', defaultValue: '/signup' },
    ],
  },

  // ── Text primitives ─────────────────────────────────────────────────────────
  {
    component: BuilderHeading,
    name: 'Heading',
    image: toDataURI(icons.Heading),
    inputs: [
      { name: 'text', type: 'string', defaultValue: 'Section Heading' },
      {
        name: 'level',
        type: 'string',
        defaultValue: 'h2',
        enum: ['h1', 'h2', 'h3', 'h4'],
      },
      { name: 'align', type: 'string', defaultValue: 'left', enum: ALIGN_OPTIONS.map((o) => o.value) },
    ],
  },
  {
    component: BuilderEyebrow,
    name: 'Eyebrow',
    image: toDataURI(icons.Eyebrow),
    inputs: [
      { name: 'text', type: 'string', defaultValue: 'Category Label' },
      { name: 'align', type: 'string', defaultValue: 'left', enum: ALIGN_OPTIONS.map((o) => o.value) },
    ],
  },
  {
    component: BuilderSubtitle,
    name: 'Subtitle',
    image: toDataURI(icons.Subtitle),
    inputs: [
      { name: 'text', type: 'string', defaultValue: 'Supporting subtitle text that appears below a heading.' },
      { name: 'align', type: 'string', defaultValue: 'left', enum: ALIGN_OPTIONS.map((o) => o.value) },
    ],
  },
  {
    component: BuilderBody,
    name: 'Body',
    image: toDataURI(icons.Body),
    inputs: [
      { name: 'text', type: 'string', defaultValue: 'Body paragraph text goes here.' },
      { name: 'align', type: 'string', defaultValue: 'left', enum: ALIGN_OPTIONS.map((o) => o.value) },
    ],
  },

  // ── Carbon Design System components ─────────────────────────────────────────
  {
    component: CarbonButton,
    name: 'CarbonButton',
    friendlyName: 'Button',
    image: toDataURI(icons.CarbonButton),
    inputs: [
      { name: 'label', type: 'string', defaultValue: 'Click Me' },
      {
        name: 'kind',
        type: 'string',
        defaultValue: 'primary',
        enum: ['primary', 'secondary', 'tertiary', 'ghost', 'danger'],
      },
      {
        name: 'size',
        type: 'string',
        defaultValue: 'md',
        enum: ['sm', 'md', 'lg', 'xl', '2xl'],
      },
      { name: 'href', type: 'string', defaultValue: '' },
      { name: 'disabled', type: 'boolean', defaultValue: false },
      {
        name: 'icon',
        type: 'string',
        defaultValue: 'None',
        friendlyName: 'Icon',
        helperText: 'Optional Carbon icon displayed inside the button',
        enum: [
          'None',
          'ArrowRight',
          'Add',
          'Checkmark',
          'Download',
          'Upload',
          'Send',
          'Search',
          'Login',
          'Logout',
          'Phone',
          'Email',
          'Document',
          'Edit',
          'TrashCan',
          'ChevronRight',
          'ChevronLeft',
          'Star',
          'Help',
          'Information',
          'Warning',
        ],
      },
      {
        name: 'iconPosition',
        type: 'string',
        defaultValue: 'right',
        friendlyName: 'Icon Position',
        enum: ['left', 'right'],
        showIf: "options.get('icon') !== 'None'",
      },
    ],
  },
];

export default builderComponents;
