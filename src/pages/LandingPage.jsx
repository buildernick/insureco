import React, { useState } from 'react';
import {
  Grid,
  Column,
  Button,
  Tile,
  Modal,
  TextInput,
  TextArea,
  Heading,
  Stack,
} from '@carbon/react';
import {
  Security,
  Car,
  Home as HomeIcon,
  CheckmarkFilled,
  ArrowRight,
} from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import Hero from '../components/Hero';
import SplitHero from '../components/SplitHero';
import './LandingPage.scss';

export default function LandingPage() {
  const navigate = useNavigate();
  const [demoModalOpen, setDemoModalOpen] = useState(false);

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
      quote: 'Best insurance experience I\'ve had. The customer service is exceptional and the rates are competitive.',
      author: 'Emily Rodriguez',
      role: 'Customer since 2023',
    },
  ];

  return (
    <div className="landing-page">
      <Hero
        image="https://images.pexels.com/photos/4145355/pexels-photo-4145355.jpeg?auto=compress&cs=tinysrgb&w=1920"
        headline="Protect Your Future with Confidence"
        subtitle="Comprehensive car and home insurance designed for the modern world. Get covered in minutes with InsureCo."
        primaryButton={{ label: 'Sign Up Now', onClick: () => navigate('/signup') }}
        secondaryButton={{ label: 'Get a Demo', onClick: () => setDemoModalOpen(true) }}
      />

      {/* Features Section */}
      <section className="features-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <Heading className="section-heading">
              Why Choose InsureCo?
            </Heading>
          </Column>
          {features.map((feature, index) => (
            <Column lg={4} md={4} sm={4} key={index}>
              <Tile className="feature-tile">
                <div className="feature-icon">{feature.icon}</div>
                <h3 className="feature-title">{feature.title}</h3>
                <p className="feature-description">{feature.description}</p>
              </Tile>
            </Column>
          ))}
        </Grid>
      </section>

      <SplitHero
        id="car-insurance"
        image="https://images.pexels.com/photos/220309/pexels-photo-220309.jpeg?auto=compress&cs=tinysrgb&w=800"
        imageAlt="Modern blue sedan representing everyday auto insurance coverage"
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
        image="https://images.pexels.com/photos/7587856/pexels-photo-7587856.jpeg?auto=compress&cs=tinysrgb&w=800"
        imageAlt="Modern suburban home representing comprehensive home insurance protection"
        imagePosition="left"
        icon={<HomeIcon size={64} />}
        headline="Home Insurance"
        description="Protect your home and belongings with our comprehensive homeowners insurance. Coverage for property damage, personal liability, and more. Your peace of mind is our priority."
        features={['Property damage coverage', 'Personal liability protection', 'Natural disaster coverage', 'Personal property protection']}
        button={{ label: 'Learn More', onClick: () => navigate('/signup') }}
        background="secondary"
      />

      {/* Testimonials Section */}
      <section className="testimonials-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <Heading className="section-heading">
              What Our Customers Say
            </Heading>
          </Column>
          {testimonials.map((testimonial, index) => (
            <Column lg={5} md={4} sm={4} key={index}>
              <Tile className="testimonial-tile">
                <p className="testimonial-quote">"{testimonial.quote}"</p>
                <div className="testimonial-author">
                  <p className="author-name">{testimonial.author}</p>
                  <p className="author-role">{testimonial.role}</p>
                </div>
              </Tile>
            </Column>
          ))}
        </Grid>
      </section>

      {/* Call to Action Section */}
      <section className="cta-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className="cta-content">
              <Heading className="cta-heading">
                Ready to Get Started?
              </Heading>
              <p className="cta-text">
                Join thousands of satisfied customers who trust InsureCo for their insurance needs.
              </p>
              <Button
                kind="primary"
                size="lg"
                onClick={() => navigate('/signup')}
                renderIcon={ArrowRight}
              >
                Get Your Free Quote
              </Button>
            </div>
          </Column>
        </Grid>
      </section>

      {/* Footer */}
      <footer className="landing-footer">
        <Grid>
          <Column lg={4} md={2} sm={4}>
            <div className="footer-section">
              <h4 className="footer-heading">InsureCo</h4>
              <p className="footer-description">
                Protecting what matters most since 2020.
              </p>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="footer-section">
              <h4 className="footer-heading">Products</h4>
              <ul className="footer-links">
                <li><a href="#car-insurance">Car Insurance</a></li>
                <li><a href="#home-insurance">Home Insurance</a></li>
                <li><button onClick={() => navigate('/signup')} className="footer-link-button">Bundle & Save</button></li>
              </ul>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="footer-section">
              <h4 className="footer-heading">Company</h4>
              <ul className="footer-links">
                <li><button onClick={() => navigate('/about')} className="footer-link-button">About Us</button></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="footer-section">
              <h4 className="footer-heading">Support</h4>
              <ul className="footer-links">
                <li><a href="#help">Help Center</a></li>
                <li><button onClick={() => navigate('/dashboard')} className="footer-link-button">File a Claim</button></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="footer-section">
              <h4 className="footer-heading">Legal</h4>
              <ul className="footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
              </ul>
            </div>
          </Column>
        </Grid>
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className="footer-bottom">
              <p>&copy; 2024 InsureCo. All rights reserved.</p>
            </div>
          </Column>
        </Grid>
      </footer>

      {/* Demo Request Modal */}
      <Modal
        open={demoModalOpen}
        onRequestClose={() => setDemoModalOpen(false)}
        modalHeading="Request a Demo"
        primaryButtonText="Submit Request"
        secondaryButtonText="Cancel"
        onRequestSubmit={(e) => {
          e.preventDefault();
          setDemoModalOpen(false);
          alert('Thank you for your interest! We will contact you soon.');
        }}
        size="sm"
      >
        <Stack gap={6}>
          <TextInput
            id="demo-name"
            labelText="Full Name"
            placeholder="Enter your name"
          />
          <TextInput
            id="demo-email"
            labelText="Email Address"
            placeholder="Enter your email"
            type="email"
          />
          <TextInput
            id="demo-phone"
            labelText="Phone Number"
            placeholder="Enter your phone number"
            type="tel"
          />
          <TextArea
            id="demo-message"
            labelText="Message (Optional)"
            placeholder="Tell us about your insurance needs"
            rows={4}
          />
        </Stack>
      </Modal>
    </div>
  );
}
