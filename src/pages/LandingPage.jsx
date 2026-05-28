import React, { useState } from 'react';
import { Grid, Column, Button, Modal, TextInput, Stack } from '@carbon/react';
import { Security, CheckmarkFilled, Car, Home as HomeIcon } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import SplitHero from '../components/SplitHero';
import InfoCard from '../components/InfoCard';
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
    icon: <Car size={48} />,
    title: '24/7 Support',
    description: 'Our dedicated support team is available around the clock to assist you when you need it most.',
  },
  {
    icon: <HomeIcon size={48} />,
    title: 'Flexible Plans',
    description: 'Choose from a variety of coverage options that fit your lifestyle and budget.',
  },
];

const testimonials = [
  {
    quote: 'InsureCo made switching my insurance so easy. The process was smooth and the savings were immediate.',
    author: 'Sarah Johnson',
    role: 'Customer since 2022',
  },
  {
    quote: 'When I had a claim, they handled everything professionally and got me back on the road quickly.',
    author: 'Michael Chen',
    role: 'Customer since 2021',
  },
  {
    quote: "Best insurance experience I've had. The customer service is exceptional and the rates are competitive.",
    author: 'Emily Rodriguez',
    role: 'Customer since 2023',
  },
];

export default function LandingPage() {
  const navigate = useNavigate();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

  return (
    <div className="landing-page">
      <Hero
        image="https://api.builder.io/api/v1/image/assets/TEMP/58e131f07a038151043ed2cdafdc61264418a371?width=2292"
        headline="Protect Your Future with Confidence"
        subtitle="Comprehensive car and home insurance designed for the modern world. Get covered in minutes with InsureCo."
        primaryButton={{ label: 'Sign Up Now', onClick: () => navigate('/signup') }}
        secondaryButton={{ label: 'Get a Demo', onClick: () => setDemoModalOpen(true) }}
      />

      <section className="features-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className="section-heading-row">
              <h2 className="section-heading-row__text">Why Choose InsureCo?</h2>
            </div>
          </Column>
          {features.map((feature) => (
            <Column lg={4} md={4} sm={4} key={feature.title}>
              <InfoCard
                icon={feature.icon}
                title={feature.title}
                description={feature.description}
              />
            </Column>
          ))}
        </Grid>
      </section>

      <SplitHero
        id="car-insurance"
        image="https://api.builder.io/api/v1/image/assets/TEMP/95e8adfb647c6b0647911779aa7ae9de21ce3721?width=1054"
        imageAlt="Car insurance coverage"
        imagePosition="right"
        icon={<Car size={64} />}
        headline="Car Insurance"
        description="Drive with confidence knowing you're protected. Our comprehensive auto insurance covers collision, liability, and more. Get instant quotes and customize your coverage to match your needs."
        features={['Collision coverage', 'Liability protection', 'Roadside assistance', 'Rental car coverage']}
        button={{ label: 'Learn More', onClick: () => navigate('/signup') }}
        background="primary"
      />

      <SplitHero
        id="home-insurance"
        image="https://api.builder.io/api/v1/image/assets/TEMP/e465272c050358685dad1591ae9f2cefb40152dd?width=1054"
        imageAlt="Home insurance coverage"
        imagePosition="left"
        icon={<HomeIcon size={64} />}
        headline="Home Insurance"
        description="Protect your home and belongings with our comprehensive homeowners insurance. Coverage for property damage, personal liability, and more. Your peace of mind is our priority."
        features={['Property damage coverage', 'Personal liability protection', 'Natural disaster coverage', 'Personal property protection']}
        button={{ label: 'Learn More', onClick: () => navigate('/signup') }}
        background="secondary"
      />

      <section className="testimonials-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className="section-heading-row">
              <h2 className="section-heading-row__text">What Our Customers Say</h2>
            </div>
          </Column>
          {testimonials.map((t) => (
            <Column lg={5} md={4} sm={4} key={t.author}>
              <Tile className="testimonial-tile">
                <p className="testimonial-tile__quote">"{t.quote}"</p>
                <div className="testimonial-tile__author">
                  <p className="testimonial-tile__name">{t.author}</p>
                  <p className="testimonial-tile__role">{t.role}</p>
                </div>
              </Tile>
            </Column>
          ))}
        </Grid>
      </section>

      <footer className="landing-footer">
        <Grid>
          <Column lg={4} md={2} sm={4}>
            <div className="footer-col">
              <h4 className="footer-col__heading">InsureCo</h4>
              <p className="footer-col__body">Protecting what matters most since 2020.</p>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="footer-col">
              <h4 className="footer-col__heading">Products</h4>
              <ul className="footer-col__links">
                <li>Car Insurance</li>
                <li>Home Insurance</li>
                <li>Bundle &amp; Save</li>
              </ul>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="footer-col">
              <h4 className="footer-col__heading">Company</h4>
              <ul className="footer-col__links">
                <li>About Us</li>
                <li>Careers</li>
                <li>Contact</li>
              </ul>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="footer-col">
              <h4 className="footer-col__heading">Support</h4>
              <ul className="footer-col__links">
                <li>Help Center</li>
                <li>File a Claim</li>
                <li>FAQ</li>
              </ul>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="footer-col">
              <h4 className="footer-col__heading">Legal</h4>
              <ul className="footer-col__links">
                <li>Privacy Policy</li>
                <li>Terms of Service</li>
                <li>Cookie Policy</li>
              </ul>
            </div>
          </Column>
        </Grid>
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <p className="footer-copyright">© 2024 InsureCo. All rights reserved.</p>
          </Column>
        </Grid>
      </footer>

      <Modal
        open={demoModalOpen}
        onRequestClose={() => setDemoModalOpen(false)}
        modalHeading="Request a Demo"
        primaryButtonText="Submit Request"
        secondaryButtonText="Cancel"
        onRequestSubmit={() => setDemoModalOpen(false)}
        size="sm"
      >
        <Stack gap={6}>
          <TextInput id="demo-name" labelText="Full Name" placeholder="Enter your name" />
          <TextInput id="demo-email" labelText="Email Address" placeholder="Enter your email" type="email" />
        </Stack>
      </Modal>
    </div>
  );
}
