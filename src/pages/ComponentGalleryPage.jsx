import React, { useState } from 'react';
import HeroSection from '../components/builder/HeroSection';
import BenefitCard from '../components/builder/BenefitCard';
import SplitHero from '../components/builder/SplitHero';
import TestimonialsSection from '../components/builder/TestimonialsSection';
import BoldBanner from '../components/builder/BoldBanner';
import BuilderHeading from '../components/builder/BuilderHeading';
import BuilderEyebrow from '../components/builder/BuilderEyebrow';
import BuilderSubtitle from '../components/builder/BuilderSubtitle';
import BuilderBody from '../components/builder/BuilderBody';
import './ComponentGalleryPage.scss';

// ── Component definitions ────────────────────────────────────────────────────

const COMPONENTS = [
  {
    group: 'Sections',
    items: [
      {
        id: 'hero-section',
        name: 'HeroSection',
        description: 'Full-width hero with headline, tagline, and up to two CTA buttons. Supports an optional background image with a dark overlay.',
        inputs: 'headline, tagline, backgroundImage, primaryCtaText/Url, secondaryCtaText/Url',
        variants: [
          {
            label: 'With background image · Two CTAs',
            render: () => (
              <HeroSection
                headline="Protect Your Future with Confidence"
                tagline="Comprehensive car and home insurance designed for the modern world."
                primaryCtaText="Sign Up Now"
                primaryCtaUrl="/signup"
                secondaryCtaText="Learn More"
                secondaryCtaUrl="/"
                backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80&auto=format&fit=crop"
              />
            ),
          },
          {
            label: 'With background image · Single CTA',
            render: () => (
              <HeroSection
                headline="Simple. Fast. Trusted."
                tagline="Get covered in minutes, not days."
                primaryCtaText="Get a Quote"
                primaryCtaUrl="/signup"
                secondaryCtaText=""
                backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop"
              />
            ),
          },
          {
            label: 'No background image',
            render: () => (
              <HeroSection
                headline="Coverage That Moves With You"
                tagline="Whether you're renting, buying, or driving—we've got a plan."
                primaryCtaText="Explore Plans"
                primaryCtaUrl="/signup"
                secondaryCtaText="Learn More"
                secondaryCtaUrl="/"
              />
            ),
          },
        ],
      },
      {
        id: 'benefit-card',
        name: 'BenefitCard',
        description: 'Icon tile used to highlight a product benefit. Drop multiple into a grid for a features section.',
        inputs: 'title, description, icon (Security | CheckmarkFilled | Car | Home)',
        variants: [
          {
            label: 'All four icon variants',
            render: () => (
              <div className="cg-card-grid">
                {[
                  { icon: 'Security', title: 'Bank-Level Security', description: 'Your personal data is protected with enterprise-grade encryption at every step.' },
                  { icon: 'CheckmarkFilled', title: 'Instant Approval', description: 'Get coverage decisions in seconds, not days. No paperwork, no waiting.' },
                  { icon: 'Car', title: 'Car Coverage', description: 'Comprehensive and collision protection tailored to your vehicle and driving habits.' },
                  { icon: 'Home', title: 'Home Coverage', description: 'Protect your property and belongings from the unexpected with flexible plans.' },
                ].map(({ icon, title, description }) => (
                  <BenefitCard key={icon} icon={icon} title={title} description={description} />
                ))}
              </div>
            ),
          },
          {
            label: 'Single card — Security',
            render: () => <BenefitCard icon="Security" title="Bank-Level Security" description="Your personal data is protected with enterprise-grade encryption at every step." />,
          },
        ],
      },
      {
        id: 'split-hero',
        name: 'SplitHero',
        description: 'Two-column section pairing content (heading, description, bullets, CTA) with an image. Supports left/right image placement and two background colors.',
        inputs: 'heading, description, bullets, ctaText/Url, image, imageAlt, imagePosition (left | right), background (primary | secondary)',
        variants: [
          {
            label: 'Image right · Primary background',
            render: () => (
              <SplitHero
                heading="Car Insurance Made Simple"
                description="Whether you drive daily or occasionally, our flexible plans adapt to your lifestyle."
                bullets={[
                  { text: 'Collision & comprehensive coverage' },
                  { text: 'Roadside assistance included' },
                  { text: 'Instant digital ID cards' },
                ]}
                ctaText="Learn More"
                ctaUrl="/signup"
                image="https://images.unsplash.com/photo-1494976388531-d1058494cdd8?w=800&q=80&auto=format&fit=crop"
                imageAlt="Silver car on an open road"
                imagePosition="right"
                background="primary"
              />
            ),
          },
          {
            label: 'Image left · Secondary background',
            render: () => (
              <SplitHero
                heading="Home Insurance You Can Count On"
                description="From floods to fires, we've got your home covered with plans that fit your budget."
                bullets={[
                  { text: 'Dwelling & personal property coverage' },
                  { text: 'Liability protection' },
                  { text: 'Loss of use benefits' },
                ]}
                ctaText="Get a Quote"
                ctaUrl="/signup"
                image="https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&q=80&auto=format&fit=crop"
                imageAlt="Modern suburban home"
                imagePosition="left"
                background="secondary"
              />
            ),
          },
          {
            label: 'No image (placeholder)',
            render: () => (
              <SplitHero
                heading="Renters Insurance"
                description="Protect everything you own—even when you don't own the walls around it."
                bullets={[{ text: 'Personal property coverage' }, { text: 'Liability included' }]}
                ctaText="Learn More"
                ctaUrl="/signup"
                imagePosition="right"
                background="primary"
              />
            ),
          },
        ],
      },
      {
        id: 'testimonials',
        name: 'TestimonialsSection',
        description: 'Grid of customer quote cards with author name and role. Scales from one to many cards.',
        inputs: 'sectionHeading, testimonials[ ] (quote, author, role)',
        variants: [
          {
            label: 'Three testimonials',
            render: () => (
              <TestimonialsSection
                sectionHeading="What Our Customers Say"
                testimonials={[
                  { quote: 'Switching to InsureCo was the easiest financial decision I ever made. The savings were immediate.', author: 'Sarah Johnson', role: 'Customer since 2022' },
                  { quote: 'Filed a claim after a fender-bender and had a check in two days. Incredible experience.', author: 'Marcus Lee', role: 'Customer since 2021' },
                  { quote: 'The dashboard makes managing my policies effortless. I love having everything in one place.', author: 'Priya Patel', role: 'Customer since 2023' },
                ]}
              />
            ),
          },
          {
            label: 'Single testimonial',
            render: () => (
              <TestimonialsSection
                sectionHeading="Trusted by Thousands"
                testimonials={[
                  { quote: "Best insurance company I've ever dealt with. Responsive, fair, and transparent.", author: 'Tom Rivera', role: 'Customer since 2020' },
                ]}
              />
            ),
          },
        ],
      },
      {
        id: 'bold-banner',
        name: 'BoldBanner',
        description: 'High-contrast CTA banner for end-of-page or mid-page conversion moments.',
        inputs: 'heading, subtext, ctaText, ctaUrl',
        variants: [
          {
            label: 'Default',
            render: () => (
              <BoldBanner
                heading="Ready to Get Started?"
                subtext="Join thousands of satisfied customers who trust InsureCo for their insurance needs."
                ctaText="Get Your Free Quote"
                ctaUrl="/signup"
              />
            ),
          },
          {
            label: 'Custom copy',
            render: () => (
              <BoldBanner
                heading="Switch and Save Today"
                subtext="Most customers save an average of $400 a year when they switch to InsureCo."
                ctaText="See My Savings"
                ctaUrl="/signup"
              />
            ),
          },
        ],
      },
    ],
  },
  {
    group: 'Text Primitives',
    items: [
      {
        id: 'heading',
        name: 'Heading',
        description: 'Semantic heading element (h1–h4) with controllable alignment. Use for section titles in Builder pages.',
        inputs: 'text, level (h1 | h2 | h3 | h4), align (left | center | right)',
        variants: [
          {
            label: 'All levels — left aligned',
            render: () => (
              <div className="cg-primitives-preview">
                {['h1', 'h2', 'h3', 'h4'].map((level) => (
                  <PrimitiveRow key={level} label={level.toUpperCase()}>
                    <BuilderHeading text={`Heading ${level.toUpperCase()}`} level={level} align="left" />
                  </PrimitiveRow>
                ))}
              </div>
            ),
          },
          {
            label: 'H2 — all alignments',
            render: () => (
              <div className="cg-primitives-preview">
                {['left', 'center', 'right'].map((align) => (
                  <PrimitiveRow key={align} label={align}>
                    <BuilderHeading text={`Heading H2 — ${align}`} level="h2" align={align} />
                  </PrimitiveRow>
                ))}
              </div>
            ),
          },
        ],
      },
      {
        id: 'eyebrow',
        name: 'Eyebrow',
        description: 'Small uppercase label used above headings to set category context.',
        inputs: 'text, align (left | center | right)',
        variants: [
          {
            label: 'All alignments',
            render: () => (
              <div className="cg-primitives-preview">
                {['left', 'center', 'right'].map((align) => (
                  <PrimitiveRow key={align} label={align}>
                    <BuilderEyebrow text="Category Label" align={align} />
                  </PrimitiveRow>
                ))}
              </div>
            ),
          },
        ],
      },
      {
        id: 'subtitle',
        name: 'Subtitle',
        description: 'Medium-weight supporting text, typically placed directly beneath a heading.',
        inputs: 'text, align (left | center | right)',
        variants: [
          {
            label: 'All alignments',
            render: () => (
              <div className="cg-primitives-preview">
                {['left', 'center', 'right'].map((align) => (
                  <PrimitiveRow key={align} label={align}>
                    <BuilderSubtitle text="Supporting subtitle text that appears below a section heading." align={align} />
                  </PrimitiveRow>
                ))}
              </div>
            ),
          },
        ],
      },
      {
        id: 'body',
        name: 'Body',
        description: 'Standard body copy block for readable paragraph content.',
        inputs: 'text, align (left | center | right)',
        variants: [
          {
            label: 'All alignments',
            render: () => (
              <div className="cg-primitives-preview">
                {['left', 'center', 'right'].map((align) => (
                  <PrimitiveRow key={align} label={align}>
                    <BuilderBody text="Body paragraph text goes here. This is the standard readable copy style used throughout Builder CMS pages." align={align} />
                  </PrimitiveRow>
                ))}
              </div>
            ),
          },
        ],
      },
    ],
  },
];

// ── Sub-components ───────────────────────────────────────────────────────────

function PrimitiveRow({ label, children }) {
  return (
    <div className="cg-primitive-row">
      <span className="cg-primitive-row__label">{label}</span>
      <div className="cg-primitive-row__output">{children}</div>
    </div>
  );
}

// ── Page ─────────────────────────────────────────────────────────────────────

const ALL_ITEMS = COMPONENTS.flatMap((g) => g.items);

export default function ComponentGalleryPage() {
  const [activeId, setActiveId] = useState(ALL_ITEMS[0].id);
  const active = ALL_ITEMS.find((c) => c.id === activeId) ?? ALL_ITEMS[0];

  return (
    <div className="cg-shell">

      {/* ── Left sidebar ──────────────────────────────────────── */}
      <aside className="cg-sidebar">
        <div className="cg-sidebar__brand">
          <span className="cg-sidebar__brand-label">Builder CMS</span>
          <span className="cg-sidebar__brand-sub">Component Gallery</span>
        </div>

        <nav className="cg-sidebar__nav" aria-label="Component list">
          {COMPONENTS.map(({ group, items }) => (
            <div key={group} className="cg-sidebar__group">
              <span className="cg-sidebar__group-label">{group}</span>
              {items.map((item) => (
                <button
                  key={item.id}
                  className={`cg-sidebar__item${activeId === item.id ? ' cg-sidebar__item--active' : ''}`}
                  onClick={() => setActiveId(item.id)}
                  type="button"
                >
                  {item.name}
                </button>
              ))}
            </div>
          ))}
        </nav>
      </aside>

      {/* ── Main content ──────────────────────────────────────── */}
      <main className="cg-main">

        {/* Component header bar */}
        <header className="cg-main__header">
          <div className="cg-main__header-left">
            <span className="cg-main__breadcrumb">
              {COMPONENTS.find((g) => g.items.some((i) => i.id === activeId))?.group}
              <span className="cg-main__breadcrumb-sep">/</span>
            </span>
            <h1 className="cg-main__title">{active.name}</h1>
          </div>
          <span className="cg-main__count">{active.variants.length} variant{active.variants.length !== 1 ? 's' : ''}</span>
        </header>

        {/* Component meta */}
        <div className="cg-main__meta">
          <p className="cg-main__desc">{active.description}</p>
          <p className="cg-main__inputs">
            <span className="cg-main__inputs-label">Inputs</span>
            {active.inputs}
          </p>
        </div>

        {/* Variants */}
        <div className="cg-variants">
          {active.variants.map((variant, i) => (
            <div key={i} className="cg-variant">
              <div className="cg-variant__header">
                <span className="cg-variant__index">{i + 1}</span>
                <span className="cg-variant__label">{variant.label}</span>
              </div>
              <div className="cg-variant__canvas">
                {variant.render()}
              </div>
            </div>
          ))}
        </div>

      </main>
    </div>
  );
}
