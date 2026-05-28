import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, Grid, Column } from '@carbon/react';
import { Security, CheckmarkFilled, CustomerService, ArrowRight } from '@carbon/icons-react';
import Footer from '../components/Footer';
import './LandingPage.scss';

const benefits = [
  {
    icon: <Security size={32} />,
    title: 'Comprehensive Coverage',
    description: 'Tailored plans that protect your car and home against the unexpected.',
  },
  {
    icon: <CheckmarkFilled size={32} />,
    title: 'Fast Claims',
    description: 'File and track claims digitally — most resolved within 48 hours.',
  },
  {
    icon: <CustomerService size={32} />,
    title: '24/7 Support',
    description: 'Real people available around the clock whenever you need help.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <section className="hero">
        <h1 className="hero__heading">Protect Your Future with Confidence</h1>
        <p className="hero__subtitle">
          Car and home insurance designed for the modern world. Get covered in minutes.
        </p>
        <div className="hero__actions">
          <Button kind="primary" onClick={() => navigate('/signup')}>
            Sign Up Now
          </Button>
          <Button kind="tertiary" onClick={() => {}}>
            Get a Demo
          </Button>
        </div>
      </section>

      <section className="benefits">
        <Grid>
          {benefits.map((b) => (
            <Column lg={5} md={4} sm={4} key={b.title} className="benefit-item">
              <div className="benefit-item__icon">{b.icon}</div>
              <h3 className="benefit-item__title">{b.title}</h3>
              <p className="benefit-item__description">{b.description}</p>
            </Column>
          ))}
        </Grid>
      </section>

      <section className="cta">
        <h2 className="cta__heading">Ready to get started?</h2>
        <Button
          kind="primary"
          renderIcon={ArrowRight}
          onClick={() => navigate('/signup')}
        >
          Get Your Free Quote
        </Button>
      </section>

      <Footer />
    </div>
  );
}
