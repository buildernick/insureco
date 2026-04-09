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
  Favorite,
  CheckmarkFilled,
  ArrowRight,
  Time,
  Hospital,
} from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import './PetInsurancePage.scss';

export default function PetInsurancePage() {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);

  const features = [
    {
      icon: <Security size={48} />,
      title: 'Comprehensive Vet Coverage',
      description: 'From routine checkups to emergency surgeries, we cover the full spectrum of your pet\'s health needs.',
    },
    {
      icon: <CheckmarkFilled size={48} />,
      title: 'Fast Claims Processing',
      description: 'Submit claims digitally and get reimbursed quickly so you can focus on your pet\'s recovery.',
    },
    {
      icon: <Time size={48} />,
      title: '24/7 Pet Health Support',
      description: 'Access our vet helpline any time of day or night for advice and peace of mind.',
    },
    {
      icon: <Favorite size={48} />,
      title: 'Flexible Plans',
      description: 'Choose coverage levels that fit every pet and every budget — from basic to premium.',
    },
  ];

  const testimonials = [
    {
      quote: 'When my dog needed emergency surgery, InsureCo covered 90% of the bill. I don\'t know what I would have done without them.',
      author: 'Jessica Park',
      role: 'Dog owner since 2021',
    },
    {
      quote: 'The monthly premium is so affordable and the claims process was painless. My cats are fully covered and I have real peace of mind.',
      author: 'David Okafor',
      role: 'Cat owner since 2022',
    },
    {
      quote: 'I signed up in under 10 minutes. My vet is already in their network and my first claim was reimbursed within a week.',
      author: 'Maria Gonzalez',
      role: 'Pet owner since 2023',
    },
  ];

  return (
    <div className="pet-insurance-page">
      {/* Hero Section */}
      <section className="pet-hero-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className="pet-hero-content">
              <Heading className="pet-hero-heading">
                Because Your Pets Deserve the Best Care
              </Heading>
              <p className="pet-hero-tagline">
                Comprehensive pet insurance for dogs and cats — built to cover the
                unexpected and keep tails wagging. Get covered in minutes with InsureCo.
              </p>
              <div className="pet-hero-actions">
                <Button
                  kind="primary"
                  size="lg"
                  onClick={() => navigate('/signup')}
                  renderIcon={ArrowRight}
                >
                  Get a Free Quote
                </Button>
                <Button
                  kind="secondary"
                  size="lg"
                  onClick={() => setQuoteModalOpen(true)}
                >
                  Talk to an Expert
                </Button>
              </div>
            </div>
          </Column>
        </Grid>
      </section>

      {/* Features Section */}
      <section className="pet-features-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <Heading className="section-heading">
              Why Choose InsureCo Pet Insurance?
            </Heading>
          </Column>
          {features.map((feature, index) => (
            <Column lg={4} md={4} sm={4} key={index}>
              <Tile className="pet-feature-tile">
                <div className="pet-feature-icon">{feature.icon}</div>
                <h3 className="pet-feature-title">{feature.title}</h3>
                <p className="pet-feature-description">{feature.description}</p>
              </Tile>
            </Column>
          ))}
        </Grid>
      </section>

      {/* Dog Insurance Section */}
      <section id="dog-insurance" className="pet-product-section dog-insurance-section">
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <div className="pet-product-content">
              <div className="pet-product-icon">
                <Favorite size={64} />
              </div>
              <Heading className="pet-product-heading">Dog Insurance</Heading>
              <p className="pet-product-description">
                Dogs are family. Our dog insurance plans cover everything from
                accidents and illnesses to hereditary conditions — so unexpected
                vet bills never come between you and your best friend.
              </p>
              <ul className="pet-product-features">
                <li><CheckmarkFilled size={20} /> Accident &amp; illness coverage</li>
                <li><CheckmarkFilled size={20} /> Hereditary condition protection</li>
                <li><CheckmarkFilled size={20} /> Prescription medication coverage</li>
                <li><CheckmarkFilled size={20} /> Emergency vet visits</li>
              </ul>
              <Button
                kind="tertiary"
                onClick={() => navigate('/signup')}
                renderIcon={ArrowRight}
              >
                Get Dog Coverage
              </Button>
            </div>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <div className="pet-product-image">
              <img
                src="https://images.pexels.com/photos/6235648/pexels-photo-6235648.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Veterinarian examining a fluffy dog during a routine checkup"
                loading="lazy"
              />
            </div>
          </Column>
        </Grid>
      </section>

      {/* Cat Insurance Section */}
      <section id="cat-insurance" className="pet-product-section cat-insurance-section">
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <div className="pet-product-image">
              <img
                src="https://images.pexels.com/photos/36043111/pexels-photo-36043111.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Adorable tabby cat in a cozy home environment"
                loading="lazy"
              />
            </div>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <div className="pet-product-content">
              <div className="pet-product-icon">
                <Hospital size={64} />
              </div>
              <Heading className="pet-product-heading">Cat Insurance</Heading>
              <p className="pet-product-description">
                Cats may have nine lives, but vet bills are very real. Our cat
                insurance plans help you provide the best medical care without
                worrying about the cost — from routine wellness to unexpected emergencies.
              </p>
              <ul className="pet-product-features">
                <li><CheckmarkFilled size={20} /> Illness &amp; injury coverage</li>
                <li><CheckmarkFilled size={20} /> Dental illness treatment</li>
                <li><CheckmarkFilled size={20} /> Chronic condition management</li>
                <li><CheckmarkFilled size={20} /> Specialist &amp; imaging coverage</li>
              </ul>
              <Button
                kind="tertiary"
                onClick={() => navigate('/signup')}
                renderIcon={ArrowRight}
              >
                Get Cat Coverage
              </Button>
            </div>
          </Column>
        </Grid>
      </section>

      {/* Testimonials Section */}
      <section className="pet-testimonials-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <Heading className="section-heading">
              Loved by Pet Owners Everywhere
            </Heading>
          </Column>
          {testimonials.map((testimonial, index) => (
            <Column lg={5} md={4} sm={4} key={index}>
              <Tile className="pet-testimonial-tile">
                <p className="pet-testimonial-quote">"{testimonial.quote}"</p>
                <div className="pet-testimonial-author">
                  <p className="pet-author-name">{testimonial.author}</p>
                  <p className="pet-author-role">{testimonial.role}</p>
                </div>
              </Tile>
            </Column>
          ))}
        </Grid>
      </section>

      {/* Call to Action Section */}
      <section className="pet-cta-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className="pet-cta-content">
              <Heading className="pet-cta-heading">
                Ready to Protect Your Pet?
              </Heading>
              <p className="pet-cta-text">
                Join thousands of pet owners who trust InsureCo to keep their furry
                family members healthy and covered.
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
      <footer className="pet-landing-footer">
        <Grid>
          <Column lg={4} md={2} sm={4}>
            <div className="pet-footer-section">
              <h4 className="pet-footer-heading">InsureCo</h4>
              <p className="pet-footer-description">
                Protecting what matters most since 2020.
              </p>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="pet-footer-section">
              <h4 className="pet-footer-heading">Pet Products</h4>
              <ul className="pet-footer-links">
                <li><a href="#dog-insurance">Dog Insurance</a></li>
                <li><a href="#cat-insurance">Cat Insurance</a></li>
                <li><button onClick={() => navigate('/signup')} className="pet-footer-link-button">Bundle &amp; Save</button></li>
              </ul>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="pet-footer-section">
              <h4 className="pet-footer-heading">Other Products</h4>
              <ul className="pet-footer-links">
                <li><button onClick={() => navigate('/')} className="pet-footer-link-button">Car Insurance</button></li>
                <li><button onClick={() => navigate('/')} className="pet-footer-link-button">Home Insurance</button></li>
              </ul>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="pet-footer-section">
              <h4 className="pet-footer-heading">Company</h4>
              <ul className="pet-footer-links">
                <li><button onClick={() => navigate('/about')} className="pet-footer-link-button">About Us</button></li>
                <li><a href="#contact">Contact</a></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="pet-footer-section">
              <h4 className="pet-footer-heading">Support</h4>
              <ul className="pet-footer-links">
                <li><a href="#help">Help Center</a></li>
                <li><button onClick={() => navigate('/dashboard')} className="pet-footer-link-button">File a Claim</button></li>
                <li><a href="#privacy">Privacy Policy</a></li>
              </ul>
            </div>
          </Column>
        </Grid>
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className="pet-footer-bottom">
              <p>&copy; 2024 InsureCo. All rights reserved.</p>
            </div>
          </Column>
        </Grid>
      </footer>

      {/* Expert Contact Modal */}
      <Modal
        open={quoteModalOpen}
        onRequestClose={() => setQuoteModalOpen(false)}
        modalHeading="Talk to a Pet Insurance Expert"
        primaryButtonText="Submit Request"
        secondaryButtonText="Cancel"
        onRequestSubmit={(e) => {
          e.preventDefault();
          setQuoteModalOpen(false);
          alert('Thank you! A pet insurance expert will be in touch shortly.');
        }}
        size="sm"
      >
        <Stack gap={6}>
          <TextInput
            id="pet-expert-name"
            labelText="Full Name"
            placeholder="Enter your name"
          />
          <TextInput
            id="pet-expert-email"
            labelText="Email Address"
            placeholder="Enter your email"
            type="email"
          />
          <TextInput
            id="pet-expert-phone"
            labelText="Phone Number"
            placeholder="Enter your phone number"
            type="tel"
          />
          <TextArea
            id="pet-expert-message"
            labelText="Tell us about your pet (Optional)"
            placeholder="e.g. breed, age, any pre-existing conditions"
            rows={4}
          />
        </Stack>
      </Modal>
    </div>
  );
}
