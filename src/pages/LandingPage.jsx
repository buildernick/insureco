import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Grid, Column, Tile, Button } from '@carbon/react';
import { Security, CheckmarkFilled, CustomerService, ArrowRight } from '@carbon/icons-react';
import Hero from '../components/Hero';
import Footer from '../components/Footer';
import './LandingPage.scss';

const benefits = [
  {
    icon: <Security size={32} />,
    title: 'Comprehensive Coverage',
    description: 'Protect what matters most with plans tailored to your needs.',
  },
  {
    icon: <CheckmarkFilled size={32} />,
    title: 'Fast Claims',
    description: 'Get claims processed quickly with our streamlined digital process.',
  },
  {
    icon: <CustomerService size={32} />,
    title: '24/7 Support',
    description: 'Our dedicated team is available around the clock to help you.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Hero
        headline="Protect Your Future with Confidence"
        subtitle="Comprehensive car and home insurance designed for the modern world."
        primaryButton={{ label: 'Sign Up Now', onClick: () => navigate('/signup') }}
      />

      <section className="benefits-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <h2 className="benefits-heading">Why Choose InsureCo?</h2>
          </Column>
          {benefits.map((b) => (
            <Column lg={5} md={8} sm={4} key={b.title}>
              <Tile className="benefit-tile">
                <div className="benefit-tile__icon">{b.icon}</div>
                <h3 className="benefit-tile__title">{b.title}</h3>
                <p className="benefit-tile__description">{b.description}</p>
              </Tile>
            </Column>
          ))}
        </Grid>
      </section>

      <section className="cta-section">
        <h2 className="cta-heading">Ready to Get Started?</h2>
        <p className="cta-description">Join thousands of customers who trust InsureCo.</p>
        <Button kind="tertiary" renderIcon={ArrowRight} onClick={() => navigate('/signup')}>
          Get Your Free Quote
        </Button>
      </section>

      <Footer />
    </div>
  );
}
