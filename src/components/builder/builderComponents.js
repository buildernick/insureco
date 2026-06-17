import HeroSection from './HeroSection';
import BenefitCard from './BenefitCard';
import SplitHero from './SplitHero';
import TestimonialsSection from './TestimonialsSection';
import BoldBanner from './BoldBanner';
import BuilderHeading from './BuilderHeading';
import BuilderEyebrow from './BuilderEyebrow';
import BuilderSubtitle from './BuilderSubtitle';
import BuilderBody from './BuilderBody';

const ALIGN_OPTIONS = [
  { label: 'Left', value: 'left' },
  { label: 'Center', value: 'center' },
  { label: 'Right', value: 'right' },
];

const builderComponents = [
  // ── Section components ──────────────────────────────────────────────────────
  {
    component: HeroSection,
    name: 'HeroSection',
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
    inputs: [
      { name: 'heading', type: 'string', defaultValue: 'Insurance Heading' },
      { name: 'description', type: 'string', defaultValue: 'Describe the product here.' },
      {
        name: 'bullets',
        type: 'list',
        subFields: [
          { name: 'text', type: 'string', defaultValue: 'Feature bullet point' },
          { name: 'subtitle', type: 'string', defaultValue: '' },
          { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
          { name: 'imageAlt', type: 'string', defaultValue: '' },
        ],
        defaultValue: [{ text: 'Coverage included' }],
      },
      { name: 'ctaText', type: 'string', defaultValue: 'Learn More' },
      { name: 'ctaUrl', type: 'string', defaultValue: '/signup' },
      { name: 'image', type: 'file', allowedFileTypes: ['jpeg', 'jpg', 'png', 'webp'] },
      { name: 'imageAlt', type: 'string', defaultValue: '' },
      { name: 'cycleInterval', type: 'number', defaultValue: 6000, helperText: 'Milliseconds between bullet/image transitions' },
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
    inputs: [
      { name: 'text', type: 'string', defaultValue: 'Category Label' },
      { name: 'align', type: 'string', defaultValue: 'left', enum: ALIGN_OPTIONS.map((o) => o.value) },
    ],
  },
  {
    component: BuilderSubtitle,
    name: 'Subtitle',
    inputs: [
      { name: 'text', type: 'string', defaultValue: 'Supporting subtitle text that appears below a heading.' },
      { name: 'align', type: 'string', defaultValue: 'left', enum: ALIGN_OPTIONS.map((o) => o.value) },
    ],
  },
  {
    component: BuilderBody,
    name: 'Body',
    inputs: [
      { name: 'text', type: 'string', defaultValue: 'Body paragraph text goes here.' },
      { name: 'align', type: 'string', defaultValue: 'left', enum: ALIGN_OPTIONS.map((o) => o.value) },
    ],
  },
];

export default builderComponents;
