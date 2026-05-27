import React from 'react';
import { Grid, Column, Tile } from '@carbon/react';
import { Security, Money, Time, Headset } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import './LandingPage.scss';

const benefits = [
  {
    icon: <Security size={40} />,
    title: 'Trusted Protection',
    description: 'Backed by industry-leading coverage options that keep you and your family safe no matter what life throws your way.',
  },
  {
    icon: <Money size={40} />,
    title: 'Competitive Rates',
    description: 'Get the coverage you need at a price that fits your budget, with no hidden fees or surprise charges.',
  },
  {
    icon: <Time size={40} />,
    title: 'Fast Claims',
    description: 'Our streamlined digital claims process means less paperwork and faster resolutions when you need it most.',
  },
  {
    icon: <Headset size={40} />,
    title: '24/7 Support',
    description: 'Real people available around the clock to answer your questions and guide you through any situation.',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Hero
        image="https://images.pexels.com/photos/4145355/pexels-photo-4145355.jpeg?auto=compress&cs=tinysrgb&w=1920"
        headline="Protect Your Future with Confidence"
        subtitle="Comprehensive car and home insurance designed for the modern world. Get covered in minutes with InsureCo."
        primaryButton={{ label: 'Get a Quote', onClick: () => navigate('/signup') }}
        secondaryButton={{ label: 'Learn More', onClick: () => navigate('/about') }}
      />

      <section className="benefits-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <h2 className="benefits-heading">Why Choose InsureCo?</h2>
          </Column>
          {benefits.map((benefit) => (
            <Column lg={4} md={4} sm={4} key={benefit.title}>
              <Tile className="benefit-tile">
                <div className="benefit-icon">{benefit.icon}</div>
                <h3 className="benefit-title">{benefit.title}</h3>
                <p className="benefit-description">{benefit.description}</p>
              </Tile>
            </Column>
          ))}
        </Grid>
      </section>
    </div>
  );
}
