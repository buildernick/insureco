import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Column, Tile } from '@carbon/react';
import {
  Security,
  CheckmarkFilled,
  CustomerService,
  Home,
  Car,
  ArrowRight,
} from '@carbon/icons-react';
import Hero from '../components/Hero';
import SplitHero from '../components/SplitHero';
import InfoCard from '../components/InfoCard';
import Footer from '../components/Footer';
import { fetchLandingPage, fetchTestimonials } from '../services/contentful';
import { useSignUpDrawer } from '../contexts/SignUpDrawerContext';
import './LandingPage.scss';

const FEATURE_ICONS = [
  <Security size={48} />,
  <CheckmarkFilled size={48} />,
  <CustomerService size={48} />,
  <Home size={48} />,
];

const FEATURE_DEFAULTS = [
  {
    title: 'Comprehensive Coverage',
    description: 'Protect what matters most with our comprehensive insurance plans tailored to your needs.',
  },
  {
    title: 'Fast Claims Processing',
    description: 'Get your claims processed quickly and efficiently with our streamlined digital process.',
  },
  {
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to assist you when you need it most.',
  },
  {
    title: 'Flexible Plans',
    description: 'Choose from a variety of coverage options that fit your lifestyle and budget.',
  },
];

const HERO_BG = 'https://api.builder.io/api/v1/image/assets/TEMP/58e131f07a038151043ed2cdafdc61264418a371?width=2292';
const CAR_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/95e8adfb647c6b0647911779aa7ae9de21ce3721?width=1054';
const HOME_IMG = 'https://api.builder.io/api/v1/image/assets/TEMP/e465272c050358685dad1591ae9f2cefb40152dd?width=1054';

export default function LandingPage() {
  const navigate = useNavigate();
  const { openDrawer } = useSignUpDrawer();
  const [page, setPage] = useState(null);
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchLandingPage('/').then(setPage);
    fetchTestimonials().then(setTestimonials);
  }, []);

  const heroHeadline = page?.heroHeadline ?? 'Protect Your Future with Confidence';
  const heroSubtitle = page?.heroSubtitle ?? 'Comprehensive car and home insurance designed for the modern world. Get covered in minutes with InsureCo.';
  const heroPrimaryLabel = page?.heroPrimaryButtonLabel ?? 'Sign Up Now';
  const heroSecondaryLabel = page?.heroSecondaryButtonLabel ?? 'Get a Demo';
  const featuresTitle = page?.featuresTitle ?? 'Why Choose InsureCo?';
  const carHeadline = page?.carInsuranceHeadline ?? 'Car Insurance';
  const carDescription = page?.carInsuranceDescription ?? 'Drive with confidence knowing you\'re protected. Our comprehensive auto insurance covers collision, liability, and more.';
  const carFeatures = page?.carInsuranceFeatures?.length ? page.carInsuranceFeatures : ['Collision coverage', 'Liability protection', 'Roadside assistance', 'Rental car coverage'];
  const homeHeadline = page?.homeInsuranceHeadline ?? 'Home Insurance';
  const homeDescription = page?.homeInsuranceDescription ?? 'Protect your home and belongings with our comprehensive homeowners insurance.';
  const homeFeatures = page?.homeInsuranceFeatures?.length ? page.homeInsuranceFeatures : ['Property damage coverage', 'Personal liability protection', 'Natural disaster coverage', 'Personal property protection'];
  const ctaHeading = page?.ctaHeading ?? 'Ready to Get Started?';
  const ctaSubtext = page?.ctaSubtext ?? 'Join thousands of satisfied customers who trust InsureCo for their insurance needs.';
  const ctaButtonLabel = page?.ctaButtonLabel ?? 'Get Your Free Quote';

  return (
    <div className="landing-page">
      <Hero
        headline={heroHeadline}
        subtitle={heroSubtitle}
        backgroundImage={HERO_BG}
        primaryButton={{ label: heroPrimaryLabel, onClick: openDrawer }}
        secondaryButton={{ label: heroSecondaryLabel, onClick: () => {} }}
      />

      <section className="features-section">
        <div className="section-header">
          <h2 className="section-header__title">{featuresTitle}</h2>
        </div>
        <Grid className="features-grid">
          {FEATURE_DEFAULTS.map((f, i) => (
            <Column lg={4} md={4} sm={4} key={f.title} className="features-grid__col">
              <InfoCard icon={FEATURE_ICONS[i]} title={f.title} description={f.description} />
            </Column>
          ))}
        </Grid>
      </section>

      <SplitHero
        id="car-insurance"
        headline={carHeadline}
        description={carDescription}
        icon={<Car size={64} />}
        features={carFeatures}
        button={{ label: 'Learn More', onClick: () => navigate('/signup') }}
        image={CAR_IMG}
        imageAlt="Blue sports car"
        imagePosition="right"
        background="primary"
      />

      <SplitHero
        id="home-insurance"
        headline={homeHeadline}
        description={homeDescription}
        icon={<Home size={64} />}
        features={homeFeatures}
        button={{ label: 'Learn More', onClick: () => navigate('/signup') }}
        image={HOME_IMG}
        imageAlt="Modern home exterior"
        imagePosition="left"
        background="secondary"
      />

      <section className="testimonials-section">
        <div className="section-header">
          <h2 className="section-header__title">What Our Customers Say</h2>
        </div>
        <div className="testimonials-grid">
          {testimonials.map((t) => (
            <Tile key={t.name} className="testimonial-card">
              <p className="testimonial-card__quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-card__author">
                <p className="testimonial-card__name">{t.name}</p>
                <p className="testimonial-card__since">{t.since}</p>
              </div>
            </Tile>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-section__heading">{ctaHeading}</h2>
        <p className="cta-section__subtext">{ctaSubtext}</p>
        <Button
          kind="ghost"
          renderIcon={ArrowRight}
          onClick={openDrawer}
          className="cta-section__btn"
        >
          {ctaButtonLabel}
        </Button>
      </section>

      <Footer />
    </div>
  );
}
