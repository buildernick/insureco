import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Column, Tile, Button, SkeletonText } from '@carbon/react';
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
import SignUpDrawer from '../components/SignUpDrawer';
import { fetchTestimonials } from '../services/contentful';
import './LandingPage.scss';

const HERO_IMAGE = 'https://api.builder.io/api/v1/image/assets/TEMP/58e131f07a038151043ed2cdafdc61264418a371?width=2292';
const CAR_IMAGE = 'https://api.builder.io/api/v1/image/assets/TEMP/95e8adfb647c6b0647911779aa7ae9de21ce3721?width=1054';
const HOME_IMAGE = 'https://api.builder.io/api/v1/image/assets/TEMP/e465272c050358685dad1591ae9f2cefb40152dd?width=1054';

const benefits = [
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

const STATIC_TESTIMONIALS = [
  {
    id: 'static-1',
    quote: '" InsureCo made switching my insurance so easy. The process was smooth and the savings were immediate. "',
    name: 'Sarah Johnson',
    since: 'Customer since 2022',
  },
  {
    id: 'static-2',
    quote: '" When I had a claim, they handled everything professionally and got me back on the road quickly. "',
    name: 'Michael Chen',
    since: 'Customer since 2021',
  },
  {
    id: 'static-3',
    quote: '" Best insurance experience I\'ve had. The customer service is exceptional and the rates are competitive. "',
    name: 'Emily Rodriguez',
    since: 'Customer since 2023',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [testimonials, setTestimonials] = useState([]);
  const [testimonialsLoading, setTestimonialsLoading] = useState(true);

  useEffect(() => {
    fetchTestimonials()
      .then((items) => {
        setTestimonials(items.length > 0 ? items : STATIC_TESTIMONIALS);
      })
      .catch(() => {
        setTestimonials(STATIC_TESTIMONIALS);
      })
      .finally(() => {
        setTestimonialsLoading(false);
      });
  }, []);

  // Scroll reveal observer for sections not handled by their own components
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.1, rootMargin: '0px 0px -50px 0px' }
    );

    const els = document.querySelectorAll('.landing-page .scroll-reveal');
    els.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, [testimonialsLoading]); // re-run after testimonials render

  return (
    <div className="landing-page">
      <SignUpDrawer isOpen={isDrawerOpen} onClose={() => setIsDrawerOpen(false)} />

      <Hero
        headline="Protect Your Future with Confidence"
        subtitle="Comprehensive car and home insurance designed for the modern world. Get covered in minutes with InsureCo."
        backgroundImage={HERO_IMAGE}
        primaryButton={{ label: 'Sign Up Now', onClick: () => setIsDrawerOpen(true) }}
        secondaryButton={{ label: 'Get a Demo', onClick: () => {} }}
      />

      <section className="benefits-section">
        <div className="section-heading-banner scroll-reveal reveal-up">
          <h2 className="section-heading-text">Why Choose InsureCo?</h2>
        </div>
        <Grid className="benefits-grid">
          {benefits.map((b, i) => (
            <Column lg={4} md={4} sm={4} key={b.title}>
              <div
                className="scroll-reveal reveal-scale"
                style={{ '--reveal-delay': `${i * 100}ms` }}
              >
                <InfoCard icon={b.icon} title={b.title} description={b.description} />
              </div>
            </Column>
          ))}
        </Grid>
      </section>

      <SplitHero
        id="car-insurance"
        icon={<Car size={64} />}
        headline="Car Insurance"
        description="Drive with confidence knowing you're protected. Our comprehensive auto insurance covers collision, liability, and more. Get instant quotes and customize your coverage to match your needs."
        features={[
          'Collision coverage',
          'Liability protection',
          'Roadside assistance',
          'Rental car coverage',
        ]}
        button={{ label: 'Learn More', onClick: () => navigate('/signup') }}
        image={CAR_IMAGE}
        imageAlt="Blue BMW car"
        imagePosition="right"
        background="primary"
      />

      <SplitHero
        id="home-insurance"
        icon={<Home size={64} />}
        headline="Home Insurance"
        description="Protect your home and belongings with our comprehensive homeowners insurance. Coverage for property damage, personal liability, and more. Your peace of mind is our priority."
        features={[
          'Property damage coverage',
          'Personal liability protection',
          'Natural disaster coverage',
          'Personal property protection',
        ]}
        button={{ label: 'Learn More', onClick: () => navigate('/signup') }}
        image={HOME_IMAGE}
        imageAlt="Modern home exterior"
        imagePosition="left"
        background="secondary"
      />

      <section className="testimonials-section">
        <div className="section-heading-banner scroll-reveal reveal-up">
          <h2 className="section-heading-text">What Our Customers Say</h2>
        </div>
        <Grid className="testimonials-grid">
          {testimonialsLoading
            ? [1, 2, 3].map((n) => (
                <Column lg={5} md={8} sm={4} key={n}>
                  <Tile className="testimonial-card testimonial-card--skeleton">
                    <SkeletonText paragraph lineCount={4} />
                    <div className="testimonial-author">
                      <SkeletonText width="60%" />
                      <SkeletonText width="40%" />
                    </div>
                  </Tile>
                </Column>
              ))
            : testimonials.map((t, i) => (
                <Column lg={5} md={8} sm={4} key={t.id ?? t.name}>
                  <Tile
                    className="testimonial-card scroll-reveal reveal-up"
                    style={{ '--reveal-delay': `${i * 120}ms` }}
                  >
                    <p className="testimonial-quote">{t.quote}</p>
                    <div className="testimonial-author">
                      <span className="testimonial-name">{t.name}</span>
                      <span className="testimonial-since">{t.since}</span>
                    </div>
                  </Tile>
                </Column>
              ))}
        </Grid>
      </section>

      <section className="cta-section scroll-reveal reveal-scale">
        <h2 className="cta-heading">Ready to Get Started?</h2>
        <p className="cta-description">
          Join thousands of satisfied customers who trust InsureCo for their insurance needs.
        </p>
        <Button kind="ghost" renderIcon={ArrowRight} onClick={() => navigate('/signup')} className="cta-btn">
          Get Your Free Quote
        </Button>
      </section>

      <Footer />
    </div>
  );
}
