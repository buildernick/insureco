import React, { useState } from 'react';
import {
  Grid,
  Column,
  Button,
  Tile,
  Tag,
  Heading,
  Stack,
} from '@carbon/react';
import {
  CheckmarkFilled,
  ArrowRight,
  Stethoscope,
  Money,
  Medication,
  Favorite,
  StarFilled,
  Shield,
} from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import './PetInsuranceLandingPage.scss';

const benefits = [
  {
    icon: <Stethoscope size={40} />,
    title: 'Vet Bill Coverage',
    description:
      'We cover up to 90% of eligible vet expenses, so unexpected bills never come between you and the care your pet deserves.',
  },
  {
    icon: <Shield size={40} />,
    title: 'Accident & Illness',
    description:
      'Comprehensive protection against accidents and illnesses — from broken bones to cancer treatment and everything in between.',
  },
  {
    icon: <Medication size={40} />,
    title: 'Prescription Drugs',
    description:
      'Prescription medications prescribed by a licensed vet are covered, helping keep ongoing treatments affordable.',
  },
  {
    icon: <Money size={40} />,
    title: 'Flexible Deductibles',
    description:
      'Choose a deductible that works for your budget. Annual or per-incident — the choice is always yours.',
  },
];

const plans = [
  {
    name: 'Essential',
    price: '$19',
    period: '/mo',
    tagKind: 'blue',
    description: 'Basic protection for accidents and emergencies.',
    features: [
      'Accident coverage',
      'Emergency vet visits',
      '$5,000 annual limit',
      '$500 deductible',
      '70% reimbursement',
    ],
    recommended: false,
  },
  {
    name: 'Plus',
    price: '$39',
    period: '/mo',
    tagKind: 'green',
    description: 'Our most popular plan — accidents, illness, and more.',
    features: [
      'Everything in Essential',
      'Illness coverage',
      'Prescription drugs',
      '$10,000 annual limit',
      '$250 deductible',
      '80% reimbursement',
    ],
    recommended: true,
  },
  {
    name: 'Premium',
    price: '$69',
    period: '/mo',
    tagKind: 'purple',
    description: 'Complete coverage including wellness and preventive care.',
    features: [
      'Everything in Plus',
      'Wellness & preventive care',
      'Dental illness coverage',
      'Behavioral therapy',
      'Unlimited annual limit',
      '90% reimbursement',
    ],
    recommended: false,
  },
];

const testimonials = [
  {
    quote:
      'When our dog Max needed emergency surgery, InsureCo covered 85% of the $4,200 bill. I don\'t know what we would have done without it.',
    author: 'Laura T.',
    pet: 'Golden Retriever owner',
    rating: 5,
  },
  {
    quote:
      'My cat was diagnosed with diabetes and needed daily insulin. The Plus plan has saved us hundreds of dollars every month on medication.',
    author: 'James P.',
    pet: 'Domestic cat owner',
    rating: 5,
  },
  {
    quote:
      'Signing up took less than 5 minutes and claims are so easy to file through the app. Best pet insurance we\'ve had.',
    author: 'Priya M.',
    pet: 'French Bulldog owner',
    rating: 5,
  },
];

const faqs = [
  {
    question: 'What pets are eligible for coverage?',
    answer:
      'We cover dogs and cats of all breeds and ages. Pets must be at least 8 weeks old to enroll. There is no upper age limit.',
  },
  {
    question: 'Is there a waiting period?',
    answer:
      'A 14-day waiting period applies to illnesses. Accidents are covered from day one after enrollment.',
  },
  {
    question: 'Can I use any veterinarian?',
    answer:
      'Yes! You can visit any licensed veterinarian, specialist, or emergency clinic in the United States. No referrals required.',
  },
  {
    question: 'How do I file a claim?',
    answer:
      'File claims online or through our mobile app in minutes. Simply submit your itemized vet invoice and we\'ll process your reimbursement quickly.',
  },
];

export default function PetInsuranceLandingPage() {
  const navigate = useNavigate();
  const [openFaqIndex, setOpenFaqIndex] = useState(null);

  const toggleFaq = (index) => {
    setOpenFaqIndex(openFaqIndex === index ? null : index);
  };

  return (
    <div className="pet-landing-page">
      {/* Hero Section */}
      <section className="pet-hero-section">
        <div className="pet-hero-overlay" />
        <Grid className="pet-hero-grid">
          <Column lg={8} md={6} sm={4}>
            <div className="pet-hero-content">
              <span className="pet-hero-eyebrow">Pet Insurance by InsureCo</span>
              <Heading className="pet-hero-heading">
                Give Your Pet the Protection They Deserve
              </Heading>
              <p className="pet-hero-tagline">
                Affordable, comprehensive pet insurance that covers accidents,
                illnesses, and more — so you can focus on what matters: your
                furry family member.
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
                  kind="tertiary"
                  size="lg"
                  href="#plans"
                  as="a"
                >
                  View Plans
                </Button>
              </div>
              <div className="pet-hero-trust">
                <CheckmarkFilled size={16} />
                <span>No breed restrictions</span>
                <CheckmarkFilled size={16} />
                <span>Cancel anytime</span>
                <CheckmarkFilled size={16} />
                <span>Claims paid fast</span>
              </div>
            </div>
          </Column>
        </Grid>
      </section>

      {/* Benefits Section */}
      <section className="pet-benefits-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <Heading className="pet-section-heading">Why Pet Owners Choose InsureCo</Heading>
            <p className="pet-section-subheading">
              We built our pet insurance around one simple idea: your pet's health shouldn't
              be limited by your wallet.
            </p>
          </Column>
          {benefits.map((benefit, index) => (
            <Column lg={4} md={4} sm={4} key={index}>
              <Tile className="pet-benefit-tile">
                <div className="pet-benefit-icon">{benefit.icon}</div>
                <h3 className="pet-benefit-title">{benefit.title}</h3>
                <p className="pet-benefit-description">{benefit.description}</p>
              </Tile>
            </Column>
          ))}
        </Grid>
      </section>

      {/* Coverage Detail - Dog */}
      <section className="pet-coverage-section pet-coverage-section--light">
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <div className="pet-coverage-image">
              <img
                src="https://images.pexels.com/photos/6816858/pexels-photo-6816858.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Yorkshire Terrier receiving a checkup at the vet"
                loading="lazy"
              />
            </div>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <div className="pet-coverage-content">
              <div className="pet-coverage-icon">
                <Stethoscope size={56} />
              </div>
              <Heading className="pet-coverage-heading">Dog Insurance</Heading>
              <p className="pet-coverage-description">
                From routine checkups to complex surgeries, our dog insurance plans
                give your pup the full care they need. Coverage extends to hereditary
                conditions, chronic illnesses, and breed-specific conditions.
              </p>
              <ul className="pet-coverage-list">
                <li><CheckmarkFilled size={18} /><span>Accidents &amp; emergency care</span></li>
                <li><CheckmarkFilled size={18} /><span>Cancer treatment</span></li>
                <li><CheckmarkFilled size={18} /><span>Orthopedic conditions</span></li>
                <li><CheckmarkFilled size={18} /><span>Hereditary conditions</span></li>
                <li><CheckmarkFilled size={18} /><span>Specialist &amp; surgery</span></li>
              </ul>
              <Button kind="tertiary" onClick={() => navigate('/signup')} renderIcon={ArrowRight}>
                Get Dog Insurance
              </Button>
            </div>
          </Column>
        </Grid>
      </section>

      {/* Coverage Detail - Cat */}
      <section className="pet-coverage-section pet-coverage-section--alt">
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <div className="pet-coverage-content">
              <div className="pet-coverage-icon">
                <Favorite size={56} />
              </div>
              <Heading className="pet-coverage-heading">Cat Insurance</Heading>
              <p className="pet-coverage-description">
                Cats are wonderfully independent — but they still need care. Our cat
                insurance plans cover everything from unexpected injuries to chronic
                conditions like kidney disease, diabetes, and hyperthyroidism.
              </p>
              <ul className="pet-coverage-list">
                <li><CheckmarkFilled size={18} /><span>Accidents &amp; injuries</span></li>
                <li><CheckmarkFilled size={18} /><span>Chronic illness management</span></li>
                <li><CheckmarkFilled size={18} /><span>Prescription medications</span></li>
                <li><CheckmarkFilled size={18} /><span>Diagnostic tests &amp; imaging</span></li>
                <li><CheckmarkFilled size={18} /><span>Dental illness</span></li>
              </ul>
              <Button kind="tertiary" onClick={() => navigate('/signup')} renderIcon={ArrowRight}>
                Get Cat Insurance
              </Button>
            </div>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <div className="pet-coverage-image">
              <img
                src="https://images.pexels.com/photos/8408085/pexels-photo-8408085.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Black and white kitten playing indoors"
                loading="lazy"
              />
            </div>
          </Column>
        </Grid>
      </section>

      {/* Plans Section */}
      <section id="plans" className="pet-plans-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <Heading className="pet-section-heading">Simple, Transparent Pricing</Heading>
            <p className="pet-section-subheading">
              No hidden fees. No surprises. Pick the plan that fits your pet and your budget.
            </p>
          </Column>
          {plans.map((plan, index) => (
            <Column lg={5} md={4} sm={4} key={index} className={plan.recommended ? 'pet-plan-col--featured' : ''}>
              <Tile className={`pet-plan-tile${plan.recommended ? ' pet-plan-tile--recommended' : ''}`}>
                {plan.recommended && (
                  <div className="pet-plan-badge">Most Popular</div>
                )}
                <div className="pet-plan-header">
                  <h3 className="pet-plan-name">{plan.name}</h3>
                  <div className="pet-plan-price">
                    <span className="pet-plan-amount">{plan.price}</span>
                    <span className="pet-plan-period">{plan.period}</span>
                  </div>
                  <p className="pet-plan-description">{plan.description}</p>
                </div>
                <ul className="pet-plan-features">
                  {plan.features.map((feature, fi) => (
                    <li key={fi}>
                      <CheckmarkFilled size={16} />
                      <span>{feature}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  kind={plan.recommended ? 'primary' : 'tertiary'}
                  className="pet-plan-cta"
                  onClick={() => navigate('/signup')}
                  renderIcon={ArrowRight}
                >
                  Choose {plan.name}
                </Button>
              </Tile>
            </Column>
          ))}
        </Grid>
      </section>

      {/* Testimonials Section */}
      <section className="pet-testimonials-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <Heading className="pet-section-heading">Loved by Pet Parents</Heading>
          </Column>
          {testimonials.map((t, index) => (
            <Column lg={5} md={4} sm={4} key={index}>
              <Tile className="pet-testimonial-tile">
                <div className="pet-testimonial-stars">
                  {Array.from({ length: t.rating }).map((_, i) => (
                    <StarFilled key={i} size={16} />
                  ))}
                </div>
                <p className="pet-testimonial-quote">"{t.quote}"</p>
                <div className="pet-testimonial-author">
                  <p className="pet-author-name">{t.author}</p>
                  <p className="pet-author-pet">{t.pet}</p>
                </div>
              </Tile>
            </Column>
          ))}
        </Grid>
      </section>

      {/* FAQ Section */}
      <section className="pet-faq-section">
        <Grid>
          <Column lg={10} md={8} sm={4} className="pet-faq-col">
            <Heading className="pet-section-heading pet-section-heading--left">
              Frequently Asked Questions
            </Heading>
            <div className="pet-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`pet-faq-item${openFaqIndex === index ? ' pet-faq-item--open' : ''}`}
                >
                  <button
                    className="pet-faq-question"
                    onClick={() => toggleFaq(index)}
                    aria-expanded={openFaqIndex === index}
                  >
                    <span>{faq.question}</span>
                    <span className="pet-faq-chevron">{openFaqIndex === index ? '−' : '+'}</span>
                  </button>
                  {openFaqIndex === index && (
                    <p className="pet-faq-answer">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </Column>
          <Column lg={6} md={8} sm={4}>
            <div className="pet-faq-cta-card">
              <img
                src="https://images.pexels.com/photos/16395150/pexels-photo-16395150.jpeg?auto=compress&cs=tinysrgb&w=600"
                alt="Bengal cat and Yorkshire Terrier sitting together"
                className="pet-faq-image"
                loading="lazy"
              />
              <div className="pet-faq-cta-body">
                <h3 className="pet-faq-cta-heading">Still have questions?</h3>
                <p className="pet-faq-cta-text">
                  Our team is available 7 days a week to help you find the right plan for your pet.
                </p>
                <Button kind="primary" onClick={() => navigate('/signup')} renderIcon={ArrowRight}>
                  Talk to an Expert
                </Button>
              </div>
            </div>
          </Column>
        </Grid>
      </section>

      {/* CTA Banner */}
      <section className="pet-cta-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className="pet-cta-content">
              <Heading className="pet-cta-heading">
                Your Pet's Health. Our Priority.
              </Heading>
              <p className="pet-cta-text">
                Join over 50,000 pet owners who trust InsureCo to protect their
                furry family members. Get covered in minutes.
              </p>
              <div className="pet-cta-actions">
                <Button
                  kind="primary"
                  size="lg"
                  onClick={() => navigate('/signup')}
                  renderIcon={ArrowRight}
                >
                  Get Your Free Quote
                </Button>
              </div>
            </div>
          </Column>
        </Grid>
      </section>

      {/* Footer */}
      <footer className="pet-footer">
        <Grid>
          <Column lg={4} md={2} sm={4}>
            <div className="pet-footer-brand">
              <h4 className="pet-footer-heading">InsureCo Pet</h4>
              <p className="pet-footer-tagline">
                Protecting pets and the people who love them since 2020.
              </p>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="pet-footer-links-group">
              <h4 className="pet-footer-heading">Coverage</h4>
              <ul className="pet-footer-links">
                <li><a href="#plans">Dog Insurance</a></li>
                <li><a href="#plans">Cat Insurance</a></li>
                <li><a href="#plans">View All Plans</a></li>
              </ul>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="pet-footer-links-group">
              <h4 className="pet-footer-heading">Company</h4>
              <ul className="pet-footer-links">
                <li><button onClick={() => navigate('/about')} className="pet-footer-btn">About Us</button></li>
                <li><a href="#careers">Careers</a></li>
                <li><a href="#contact">Contact</a></li>
              </ul>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="pet-footer-links-group">
              <h4 className="pet-footer-heading">Support</h4>
              <ul className="pet-footer-links">
                <li><a href="#help">Help Center</a></li>
                <li><button onClick={() => navigate('/dashboard')} className="pet-footer-btn">File a Claim</button></li>
                <li><a href="#faq">FAQ</a></li>
              </ul>
            </div>
          </Column>
          <Column lg={3} md={2} sm={4}>
            <div className="pet-footer-links-group">
              <h4 className="pet-footer-heading">Legal</h4>
              <ul className="pet-footer-links">
                <li><a href="#privacy">Privacy Policy</a></li>
                <li><a href="#terms">Terms of Service</a></li>
                <li><a href="#cookies">Cookie Policy</a></li>
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
    </div>
  );
}
