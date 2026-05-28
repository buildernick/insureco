import React from 'react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import './LandingPage.scss';

export default function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="landing-page">
      <Hero
        headline="Protect Your Future with Confidence"
        subtitle="Comprehensive car and home insurance designed for the modern world. Get covered in minutes with InsureCo."
        primaryButton={{ label: 'Sign Up Now', onClick: () => navigate('/signup') }}
        secondaryButton={{ label: 'Learn More', onClick: () => navigate('/about') }}
      />

      <section className="cta-section">
        <div className="cta-content">
          <h2 className="cta-heading">Ready to get started?</h2>
          <p className="cta-description">Join thousands of customers who trust InsureCo to protect what matters most.</p>
          <button className="cta-btn" onClick={() => navigate('/signup')}>Get a Quote</button>
        </div>
      </section>
    </div>
  );
}
