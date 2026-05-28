import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Column, Tile } from '@carbon/react';
import {
  Security,
  CheckmarkFilled,
  CustomerService,
  Home,
  Car,
  ArrowRight,
} from '@carbon/icons-react';
import Hero from '../components/Hero';
import InfoCard from '../components/InfoCard';
import SplitHero from '../components/SplitHero';
import Footer from '../components/Footer';
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

const testimonials = [
  {
    quote: '" InsureCo made switching my insurance so easy. The process was smooth and the savings were immediate. "',
    name: 'Sarah Johnson',
    since: 'Customer since 2022',
  },
  {
    quote: '" When I had a claim, they handled everything professionally and got me back on the road quickly. "',
    name: 'Michael Chen',
    since: 'Customer since 2021',
  },
  {
    quote: '" Best insurance experience I\'ve had. The customer service is exceptional and the rates are competitive. "',
    name: 'Emily Rodriguez',
    since: 'Customer since 2023',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Hero
        headline="Protect Your Future with Confidence"
        subtitle="Comprehensive car and home insurance designed for the modern world. Get covered in minutes with InsureCo."
        primaryButton={{ label: 'Sign Up Now', onClick: () => navigate('/signup') }}
        secondaryButton={{ label: 'Get a Demo', onClick: () => {} }}
        backgroundImage="https://api.builder.io/api/v1/image/assets/TEMP/58e131f07a038151043ed2cdafdc61264418a371?width=2292"
      />

      <section className="features-section">
        <div className="features-section__header">
          <h2 className="features-section__title">Why Choose InsureCo?</h2>
        </div>
        <Grid className="features-section__grid">
          {features.map((f) => (
            <Column lg={4} md={2} sm={4} key={f.title}>
              <InfoCard icon={f.icon} title={f.title} description={f.description} />
            </Column>
          ))}
        </Grid>
      </section>

      <SplitHero
        id="car-insurance"
        headline="Car Insurance"
        icon={<Car size={64} />}
        description="Drive with confidence knowing you're protected. Our comprehensive auto insurance covers collision, liability, and more. Get instant quotes and customize your coverage to match your needs."
        features={['Collision coverage', 'Liability protection', 'Roadside assistance', 'Rental car coverage']}
        button={{ label: 'Learn More', onClick: () => navigate('/signup') }}
        image="https://api.builder.io/api/v1/image/assets/TEMP/95e8adfb647c6b0647911779aa7ae9de21ce3721?width=1054"
        imageAlt="Blue car on road"
        imagePosition="right"
        background="primary"
      />

      <SplitHero
        id="home-insurance"
        headline="Home Insurance"
        icon={<Home size={64} />}
        description="Protect your home and belongings with our comprehensive homeowners insurance. Coverage for property damage, personal liability, and more. Your peace of mind is our priority."
        features={['Property damage coverage', 'Personal liability protection', 'Natural disaster coverage', 'Personal property protection']}
        button={{ label: 'Learn More', onClick: () => navigate('/signup') }}
        image="https://api.builder.io/api/v1/image/assets/TEMP/e465272c050358685dad1591ae9f2cefb40152dd?width=1054"
        imageAlt="Modern home surrounded by trees"
        imagePosition="left"
        background="secondary"
      />

      <section className="testimonials-section">
        <div className="testimonials-section__header">
          <h2 className="testimonials-section__title">What Our Customers Say</h2>
        </div>
        <div className="testimonials-section__grid">
          {testimonials.map((t) => (
            <Tile key={t.name} className="testimonial-card">
              <p className="testimonial-card__quote">{t.quote}</p>
              <div className="testimonial-card__author">
                <span className="testimonial-card__name">{t.name}</span>
                <span className="testimonial-card__since">{t.since}</span>
              </div>
            </Tile>
          ))}
        </div>
      </section>

      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-heading">Ready to Get Started?</h2>
          <p className="cta-description">
            Join thousands of satisfied customers who trust InsureCo for their insurance needs.
          </p>
          <button className="cta-btn" onClick={() => navigate('/signup')}>
            Get Your Free Quote <ArrowRight size={16} />
          </button>
        </div>
      </section>

      <Footer />
    </div>
  );
}
