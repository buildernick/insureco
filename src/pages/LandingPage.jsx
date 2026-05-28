import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Column } from '@carbon/react';
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
import { fetchTestimonials } from '../services/contentful';
import { useSignUpDrawer } from '../contexts/SignUpDrawerContext';
import './LandingPage.scss';

const features = [
  {
    icon: <Security size={48} />,
    title: 'Comprehensive Coverage',
    description: 'Protect what matters most with our comprehensive insurance plans tailored to your needs.',
  },
  {
    icon: <CheckmarkFilled size={48} />,
    title: 'Fast Claims Processing',
    description: 'Get your claims processed quickly and efficiently with our streamlined digital process.',
  },
  {
    icon: <CustomerService size={48} />,
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to assist you when you need it most.',
  },
  {
    icon: <Home size={48} />,
    title: 'Flexible Plans',
    description: 'Choose from a variety of coverage options that fit your lifestyle and budget.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const { openDrawer } = useSignUpDrawer();
  const [testimonials, setTestimonials] = useState([]);

  useEffect(() => {
    fetchTestimonials().then(setTestimonials);
  }, []);

  return (
    <div className="landing-page">
      <Hero
        headline="Protect Your Future with Confidence"
        subtitle="Comprehensive car and home insurance designed for the modern world. Get covered in minutes with InsureCo."
        backgroundImage="https://api.builder.io/api/v1/image/assets/TEMP/58e131f07a038151043ed2cdafdc61264418a371?width=2292"
        primaryButton={{ label: 'Sign Up Now', onClick: openDrawer }}
        secondaryButton={{ label: 'Get a Demo', onClick: () => {} }}
      />

      <section className="features-section">
        <div className="section-header">
          <h2 className="section-header__title">Why Choose InsureCo?</h2>
        </div>
        <Grid className="features-grid">
          {features.map((f) => (
            <Column lg={4} md={4} sm={4} key={f.title} className="features-grid__col">
              <InfoCard icon={f.icon} title={f.title} description={f.description} />
            </Column>
          ))}
        </Grid>
      </section>

      <SplitHero
        id="car-insurance"
        headline="Car Insurance"
        description="Drive with confidence knowing you're protected. Our comprehensive auto insurance covers collision, liability, and more. Get instant quotes and customize your coverage to match your needs."
        icon={<Car size={64} />}
        features={[
          'Collision coverage',
          'Liability protection',
          'Roadside assistance',
          'Rental car coverage',
        ]}
        button={{ label: 'Learn More', onClick: () => navigate('/signup') }}
        image="https://api.builder.io/api/v1/image/assets/TEMP/95e8adfb647c6b0647911779aa7ae9de21ce3721?width=1054"
        imageAlt="Blue sports car"
        imagePosition="right"
        background="primary"
      />

      <SplitHero
        id="home-insurance"
        headline="Home Insurance"
        description="Protect your home and belongings with our comprehensive homeowners insurance. Coverage for property damage, personal liability, and more. Your peace of mind is our priority."
        icon={<Home size={64} />}
        features={[
          'Property damage coverage',
          'Personal liability protection',
          'Natural disaster coverage',
          'Personal property protection',
        ]}
        button={{ label: 'Learn More', onClick: () => navigate('/signup') }}
        image="https://api.builder.io/api/v1/image/assets/TEMP/e465272c050358685dad1591ae9f2cefb40152dd?width=1054"
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
            <div key={t.name} className="testimonial-card">
              <p className="testimonial-card__quote">&ldquo;{t.quote}&rdquo;</p>
              <div className="testimonial-card__author">
                <p className="testimonial-card__name">{t.name}</p>
                <p className="testimonial-card__since">{t.since}</p>
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <h2 className="cta-section__heading">Ready to Get Started?</h2>
        <p className="cta-section__subtext">
          Join thousands of satisfied customers who trust InsureCo for their insurance needs.
        </p>
        <Button
          kind="ghost"
          renderIcon={ArrowRight}
          onClick={openDrawer}
          className="cta-section__btn"
        >
          Get Your Free Quote
        </Button>
      </section>

      <Footer />
    </div>
  );
}
