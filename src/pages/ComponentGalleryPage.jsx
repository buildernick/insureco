import React from 'react';
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

const TOC = [
  { id: 'hero-section', label: 'HeroSection' },
  { id: 'benefit-card', label: 'BenefitCard' },
  { id: 'split-hero', label: 'SplitHero' },
  { id: 'testimonials', label: 'TestimonialsSection' },
  { id: 'bold-banner', label: 'BoldBanner' },
  { id: 'text-primitives', label: 'Text Primitives' },
];

function GallerySection({ id, label, description, children }) {
  return (
    <section className="cg-section" id={id}>
      <div className="cg-section__header">
        <span className="cg-section__tag">Builder CMS</span>
        <h2 className="cg-section__name">{label}</h2>
        {description && <p className="cg-section__desc">{description}</p>}
      </div>
      <div className="cg-section__content">{children}</div>
    </section>
  );
}

function Variant({ label, children }) {
  return (
    <div className="cg-variant">
      <p className="cg-variant__label">{label}</p>
      <div className="cg-variant__preview">{children}</div>
    </div>
  );
}

function PrimitiveRow({ label, children }) {
  return (
    <div className="cg-primitive-row">
      <span className="cg-primitive-row__label">{label}</span>
      <div className="cg-primitive-row__output">{children}</div>
    </div>
  );
}

export default function ComponentGalleryPage() {
  return (
    <div className="cg-page">
      {/* Page header */}
      <header className="cg-header">
        <h1 className="cg-header__title">Builder CMS Components</h1>
        <p className="cg-header__subtitle">
          Every component registered in the Builder CMS, shown with its key variants.
        </p>
      </header>

      {/* Sticky table of contents */}
      <nav className="cg-toc" aria-label="Component sections">
        {TOC.map(({ id, label }) => (
          <a key={id} href={`#${id}`} className="cg-toc__link">
            {label}
          </a>
        ))}
      </nav>

      <div className="cg-body">

        {/* ── HeroSection ────────────────────────────────────────── */}
        <GallerySection
          id="hero-section"
          label="HeroSection"
          description="Full-width hero with headline, tagline, and two CTA buttons. Optionally accepts a background image."
        >
          <Variant label="With background image · Two CTAs">
            <HeroSection
              headline="Protect Your Future with Confidence"
              tagline="Comprehensive car and home insurance designed for the modern world."
              primaryCtaText="Sign Up Now"
              primaryCtaUrl="/signup"
              secondaryCtaText="Learn More"
              secondaryCtaUrl="/"
              backgroundImage="https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=1600&q=80&auto=format&fit=crop"
            />
          </Variant>
          <Variant label="With background image · Single CTA">
            <HeroSection
              headline="Simple. Fast. Trusted."
              tagline="Get covered in minutes, not days."
              primaryCtaText="Get a Quote"
              primaryCtaUrl="/signup"
              secondaryCtaText=""
              backgroundImage="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=1600&q=80&auto=format&fit=crop"
            />
          </Variant>
          <Variant label="No background image">
            <HeroSection
              headline="Coverage That Moves With You"
              tagline="Whether you're renting, buying, or driving—we've got a plan."
              primaryCtaText="Explore Plans"
              primaryCtaUrl="/signup"
              secondaryCtaText="Learn More"
              secondaryCtaUrl="/"
            />
          </Variant>
        </GallerySection>

        {/* ── BenefitCard ────────────────────────────────────────── */}
        <GallerySection
          id="benefit-card"
          label="BenefitCard"
          description="Icon tile used to highlight a product benefit. Supports four icon variants."
        >
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
        </GallerySection>

        {/* ── SplitHero ──────────────────────────────────────────── */}
        <GallerySection
          id="split-hero"
          label="SplitHero"
          description="Two-column section with content and an image. Supports left/right image position and primary/secondary background."
        >
          <Variant label="Image right · Primary background">
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
          </Variant>
          <Variant label="Image left · Secondary background">
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
          </Variant>
        </GallerySection>

        {/* ── TestimonialsSection ────────────────────────────────── */}
        <GallerySection
          id="testimonials"
          label="TestimonialsSection"
          description="Grid of customer quote cards with author and role."
        >
          <Variant label="Three testimonials">
            <TestimonialsSection
              sectionHeading="What Our Customers Say"
              testimonials={[
                { quote: 'Switching to InsureCo was the easiest financial decision I ever made. The savings were immediate.', author: 'Sarah Johnson', role: 'Customer since 2022' },
                { quote: 'Filed a claim after a fender-bender and had a check in two days. Incredible experience.', author: 'Marcus Lee', role: 'Customer since 2021' },
                { quote: 'The dashboard makes managing my policies effortless. I love having everything in one place.', author: 'Priya Patel', role: 'Customer since 2023' },
              ]}
            />
          </Variant>
          <Variant label="Single testimonial">
            <TestimonialsSection
              sectionHeading="Trusted by Thousands"
              testimonials={[
                { quote: "Best insurance company I've ever dealt with. Responsive, fair, and transparent.", author: 'Tom Rivera', role: 'Customer since 2020' },
              ]}
            />
          </Variant>
        </GallerySection>

        {/* ── BoldBanner ─────────────────────────────────────────── */}
        <GallerySection
          id="bold-banner"
          label="BoldBanner"
          description="High-contrast CTA banner for end-of-page or mid-page conversion moments."
        >
          <Variant label="Default">
            <BoldBanner
              heading="Ready to Get Started?"
              subtext="Join thousands of satisfied customers who trust InsureCo for their insurance needs."
              ctaText="Get Your Free Quote"
              ctaUrl="/signup"
            />
          </Variant>
          <Variant label="Custom copy">
            <BoldBanner
              heading="Switch and Save Today"
              subtext="Most customers save an average of $400 a year when they switch to InsureCo."
              ctaText="See My Savings"
              ctaUrl="/signup"
            />
          </Variant>
        </GallerySection>

        {/* ── Text Primitives ────────────────────────────────────── */}
        <GallerySection
          id="text-primitives"
          label="Text Primitives"
          description="Standalone text blocks — Heading (h1–h4), Eyebrow, Subtitle, and Body — each supporting left, center, and right alignment."
        >
          <div className="cg-primitives">
            <div className="cg-primitives__group">
              <h3 className="cg-primitives__group-name">Heading</h3>
              {(['h1', 'h2', 'h3', 'h4'] ).map((level) => (
                <PrimitiveRow key={level} label={level.toUpperCase()}>
                  <BuilderHeading text={`Heading ${level.toUpperCase()} — Left aligned`} level={level} align="left" />
                </PrimitiveRow>
              ))}
              <PrimitiveRow label="H2 Center">
                <BuilderHeading text="Heading H2 — Center aligned" level="h2" align="center" />
              </PrimitiveRow>
              <PrimitiveRow label="H2 Right">
                <BuilderHeading text="Heading H2 — Right aligned" level="h2" align="right" />
              </PrimitiveRow>
            </div>

            <div className="cg-primitives__group">
              <h3 className="cg-primitives__group-name">Eyebrow</h3>
              {(['left', 'center', 'right']).map((align) => (
                <PrimitiveRow key={align} label={`align: ${align}`}>
                  <BuilderEyebrow text="Category Label" align={align} />
                </PrimitiveRow>
              ))}
            </div>

            <div className="cg-primitives__group">
              <h3 className="cg-primitives__group-name">Subtitle</h3>
              {(['left', 'center', 'right']).map((align) => (
                <PrimitiveRow key={align} label={`align: ${align}`}>
                  <BuilderSubtitle text="Supporting subtitle text that appears below a section heading." align={align} />
                </PrimitiveRow>
              ))}
            </div>

            <div className="cg-primitives__group">
              <h3 className="cg-primitives__group-name">Body</h3>
              {(['left', 'center', 'right']).map((align) => (
                <PrimitiveRow key={align} label={`align: ${align}`}>
                  <BuilderBody text="Body paragraph text goes here. This is the standard readable copy style used throughout Builder CMS pages." align={align} />
                </PrimitiveRow>
              ))}
            </div>
          </div>
        </GallerySection>

      </div>
    </div>
  );
}
