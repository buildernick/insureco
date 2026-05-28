import React from 'react';
import { Grid, Column, Button } from '@carbon/react';
import { Security, CheckmarkFilled, Car, Home as HomeIcon, ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import InfoCard from '../components/InfoCard';
import Footer from '../components/Footer';
import './LandingPage.scss';

const benefits = [
  {
    icon: <Security size={48} />,
    title: 'Comprehensive Coverage',
    description: 'Protect what matters most with insurance plans tailored to your needs.',
  },
  {
    icon: <CheckmarkFilled size={48} />,
    title: 'Fast Claims Processing',
    description: 'Get your claims processed quickly with our streamlined digital process.',
  },
  {
    icon: <Car size={48} />,
    title: '24/7 Support',
    description: 'Our support team is available around the clock to assist you.',
  },
  {
    icon: <HomeIcon size={48} />,
    title: 'Flexible Plans',
    description: 'Choose from coverage options that fit your lifestyle and budget.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Hero
        image="https://api.builder.io/api/v1/image/assets/TEMP/58e131f07a038151043ed2cdafdc61264418a371?width=2292"
        headline="Protect Your Future with Confidence"
        subtitle="Comprehensive car and home insurance designed for the modern world. Get covered in minutes with InsureCo."
        primaryButton={{ label: 'Sign Up Now', onClick: () => navigate('/signup') }}
        secondaryButton={{ label: 'Learn More', onClick: () => navigate('/about') }}
      />

      <section className="benefits-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className="section-heading-row">
              <h2 className="section-heading-row__text">Why Choose InsureCo?</h2>
            </div>
          </Column>
          {benefits.map((benefit) => (
            <Column lg={4} md={4} sm={4} key={benefit.title}>
              <InfoCard
                icon={benefit.icon}
                title={benefit.title}
                description={benefit.description}
              />
            </Column>
          ))}
        </Grid>
      </section>

      <section className="cta-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className="cta-content">
              <h2 className="cta-heading">Ready to Get Started?</h2>
              <p className="cta-description">
                Join thousands of customers who trust InsureCo to protect what matters most. Get your personalized quote in minutes.
              </p>
              <Button
                kind="primary"
                size="lg"
                renderIcon={ArrowRight}
                onClick={() => navigate('/signup')}
              >
                Get a Quote
              </Button>
            </div>
          </Column>
        </Grid>
      </section>

      <Footer />
    </div>
  );
}
