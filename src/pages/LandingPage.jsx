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
  InlineNotification,
} from '@carbon/react';
import {
  Security,
  Car,
  Home as HomeIcon,
  CheckmarkFilled,
  ArrowRight,
} from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import './LandingPage.scss';

export default function LandingPage() {
  const navigate = useNavigate();
  const [demoModalOpen, setDemoModalOpen] = useState(false);
  const [warningVisible, setWarningVisible] = useState(true);

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
      {/* Hero Section */}
      <section className="hero-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className="hero-content">
              <Heading className="hero-heading">
                Protect Your Future with Confidence
              </Heading>
              <p className="hero-tagline">
                Comprehensive car and home insurance designed for the modern world. 
                Get covered in minutes with InsureCo.
              </p>
              <div className="hero-actions">
                <Button
                  kind="primary"
                  size="lg"
                  onClick={() => navigate('/signup')}
                  renderIcon={ArrowRight}
                >
                  Sign Up Now
                </Button>
                <Button
                  kind="secondary"
                  size="lg"
                  onClick={() => setDemoModalOpen(true)}
                >
                  Get a Demo
                </Button>
              </div>
            </div>
          </Column>
        </Grid>
      </section>

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

      {/* Car Insurance Section */}
      <section id="car-insurance" className="product-section car-insurance-section">
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <div className="product-content">
              <div className="product-icon">
                <Car size={64} />
              </div>
              <Heading className="product-heading">Car Insurance</Heading>
              <p className="product-description">
                Drive with confidence knowing you're protected. Our comprehensive auto insurance 
                covers collision, liability, and more. Get instant quotes and customize your 
                coverage to match your needs.
              </p>
              <ul className="product-features">
                <li><CheckmarkFilled size={20} /> Collision coverage</li>
                <li><CheckmarkFilled size={20} /> Liability protection</li>
                <li><CheckmarkFilled size={20} /> Roadside assistance</li>
                <li><CheckmarkFilled size={20} /> Rental car coverage</li>
              </ul>
              <Button
                kind="tertiary"
                onClick={() => navigate('/signup')}
                renderIcon={ArrowRight}
              >
                Learn More
              </Button>
            </div>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <div className="product-image">
              <img
                src="https://images.pexels.com/photos/220309/pexels-photo-220309.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern blue sedan representing everyday auto insurance coverage"
                loading="lazy"
              />
            </div>
          </Column>
        </Grid>
      </section>

      {/* Home Insurance Section */}
      <section id="home-insurance" className="product-section home-insurance-section">
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <div className="product-image">
              <img
                src="https://images.pexels.com/photos/7587856/pexels-photo-7587856.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Modern suburban home representing comprehensive home insurance protection"
                loading="lazy"
              />
            </div>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <div className="product-content">
              <div className="product-icon">
                <HomeIcon size={64} />
              </div>
              <Heading className="product-heading">Home Insurance</Heading>
              <p className="product-description">
                Protect your home and belongings with our comprehensive homeowners insurance. 
                Coverage for property damage, personal liability, and more. Your peace of mind 
                is our priority.
              </p>
              <ul className="product-features">
                <li><CheckmarkFilled size={20} /> Property damage coverage</li>
                <li><CheckmarkFilled size={20} /> Personal liability protection</li>
                <li><CheckmarkFilled size={20} /> Natural disaster coverage</li>
                <li><CheckmarkFilled size={20} /> Personal property protection</li>
              </ul>
              <Button
                kind="tertiary"
                onClick={() => navigate('/signup')}
                renderIcon={ArrowRight}
              >
                Learn More
              </Button>
            </div>
          </Column>
        </Grid>
      </section>

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
