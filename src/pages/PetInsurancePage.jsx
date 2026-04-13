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
  Tag,
} from '@carbon/react';
import {
  FavoriteFilled,
  CheckmarkFilled,
  ArrowRight,
  Stethoscope,
  Medication,
  Receipt,
  Warning,
} from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import './PetInsurancePage.scss';

const plans = [
  {
    name: 'Basic',
    price: '$19',
    tagline: 'Essential protection',
    tag: null,
    features: [
      'Accident coverage',
      'Emergency vet visits',
      'Poison control hotline',
      'Up to $5,000/year',
    ],
    cta: 'Get Basic',
  },
  {
    name: 'Plus',
    price: '$39',
    tagline: 'Most popular choice',
    tag: 'Most Popular',
    features: [
      'Everything in Basic',
      'Illness coverage',
      'Prescription medications',
      'Specialist visits',
      'Up to $15,000/year',
    ],
    cta: 'Get Plus',
  },
  {
    name: 'Premium',
    price: '$69',
    tagline: 'Complete peace of mind',
    tag: null,
    features: [
      'Everything in Plus',
      'Routine wellness visits',
      'Dental cleanings',
      'Behavioral therapy',
      'Unlimited annual coverage',
    ],
    cta: 'Get Premium',
  },
];

const benefits = [
  {
    icon: <Warning size={40} />,
    title: 'Accident Coverage',
    description: 'From broken bones to unexpected injuries, we cover the costs so you can focus on your pet\'s recovery.',
  },
  {
    icon: <Stethoscope size={40} />,
    title: 'Illness Coverage',
    description: 'Chronic conditions, infections, and serious diagnoses — covered with no lifetime limits on eligible plans.',
  },
  {
    icon: <Medication size={40} />,
    title: 'Prescription Meds',
    description: 'Ongoing prescriptions add up fast. We cover eligible medications so your pet stays healthy year-round.',
  },
  {
    icon: <Receipt size={40} />,
    title: 'Fast Reimbursement',
    description: 'Submit a claim online in minutes and receive reimbursement in as little as 2 business days.',
  },
];

const faqs = [
  {
    question: 'What pets are covered?',
    answer: 'We cover dogs and cats of all breeds and ages. Coverage is available for pets as young as 8 weeks old.',
  },
  {
    question: 'Are pre-existing conditions covered?',
    answer: 'Curable pre-existing conditions may be covered after a 12-month symptom-free period. Chronic pre-existing conditions are excluded.',
  },
  {
    question: 'How do I file a claim?',
    answer: 'Simply pay your vet, then submit your itemized receipt through our app or online portal. Most claims are processed within 2 business days.',
  },
  {
    question: 'Can I use any vet?',
    answer: 'Yes! Visit any licensed veterinarian, specialist, or emergency clinic in the US or Canada.',
  },
];

export default function PetInsurancePage() {
  const navigate = useNavigate();
  const [quoteModalOpen, setQuoteModalOpen] = useState(false);
  const [openFaq, setOpenFaq] = useState(null);

  return (
    <div className="pet-landing-page">

      {/* Hero Section */}
      <section className="pet-hero-section">
        <Grid>
          <Column lg={8} md={5} sm={4}>
            <div className="pet-hero-content">
              <div className="pet-hero-eyebrow">
                <FavoriteFilled size={20} />
                <span>New from InsureCo</span>
              </div>
              <Heading className="pet-hero-heading">
                Every Paw Deserves Protection
              </Heading>
              <p className="pet-hero-tagline">
                Comprehensive pet insurance for dogs and cats. Cover accidents, 
                illnesses, and routine care — starting at just $19/month.
              </p>
              <div className="pet-hero-actions">
                <Button
                  kind="primary"
                  size="lg"
                  onClick={() => setQuoteModalOpen(true)}
                  renderIcon={ArrowRight}
                >
                  Get a Free Quote
                </Button>
                <Button
                  kind="secondary"
                  size="lg"
                  onClick={() => navigate('/signup')}
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
                <span>Any licensed vet</span>
              </div>
            </div>
          </Column>
          <Column lg={8} md={3} sm={4}>
            <div className="pet-hero-image">
              <img
                src="https://images.pexels.com/photos/32742546/pexels-photo-32742546.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Happy golden retriever outdoors on a sunny day"
              />
            </div>
          </Column>
        </Grid>
      </section>

      {/* Benefits Section */}
      <section className="pet-benefits-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <Heading className="pet-section-heading">What's Covered</Heading>
            <p className="pet-section-subheading">
              Comprehensive protection at every stage of your pet's life.
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

      {/* Vet Visit Section */}
      <section className="pet-vet-section">
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <div className="pet-vet-image">
              <img
                src="https://images.pexels.com/photos/7468978/pexels-photo-7468978.jpeg?auto=compress&cs=tinysrgb&w=800"
                alt="Veterinarian examining a dog during a checkup"
                loading="lazy"
              />
            </div>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <div className="pet-vet-content">
              <Heading className="pet-section-heading pet-section-heading--left">
                Use Any Vet, Anywhere
              </Heading>
              <p className="pet-vet-description">
                Unlike some plans that restrict you to a network, InsureCo Pet 
                Insurance works with any licensed veterinarian or specialist in 
                the US and Canada.
              </p>
              <ul className="pet-vet-list">
                <li><CheckmarkFilled size={20} /> Family veterinarians</li>
                <li><CheckmarkFilled size={20} /> Emergency animal hospitals</li>
                <li><CheckmarkFilled size={20} /> Specialty &amp; specialist clinics</li>
                <li><CheckmarkFilled size={20} /> Telehealth vet consultations</li>
                <li><CheckmarkFilled size={20} /> University veterinary clinics</li>
              </ul>
            </div>
          </Column>
        </Grid>
      </section>

      {/* Plans Section */}
      <section className="pet-plans-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <Heading className="pet-section-heading">Simple, Transparent Plans</Heading>
            <p className="pet-section-subheading">
              Pick the plan that fits your pet and your budget. Upgrade or downgrade anytime.
            </p>
          </Column>
          {plans.map((plan, index) => (
            <Column lg={5} md={4} sm={4} key={index}>
              <div className={`pet-plan-card ${plan.tag ? 'pet-plan-card--featured' : ''}`}>
                {plan.tag && (
                  <div className="pet-plan-badge">{plan.tag}</div>
                )}
                <div className="pet-plan-header">
                  <h3 className="pet-plan-name">{plan.name}</h3>
                  <div className="pet-plan-price">
                    <span className="pet-plan-amount">{plan.price}</span>
                    <span className="pet-plan-period">/mo per pet</span>
                  </div>
                  <p className="pet-plan-tagline">{plan.tagline}</p>
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
                  kind={plan.tag ? 'primary' : 'tertiary'}
                  className="pet-plan-cta"
                  onClick={() => navigate('/signup')}
                  renderIcon={ArrowRight}
                >
                  {plan.cta}
                </Button>
              </div>
            </Column>
          ))}
        </Grid>
      </section>

      {/* FAQ Section */}
      <section className="pet-faq-section">
        <Grid>
          <Column lg={10} md={8} sm={4}>
            <Heading className="pet-section-heading pet-section-heading--left">
              Frequently Asked Questions
            </Heading>
            <div className="pet-faq-list">
              {faqs.map((faq, index) => (
                <div
                  key={index}
                  className={`pet-faq-item ${openFaq === index ? 'pet-faq-item--open' : ''}`}
                >
                  <button
                    className="pet-faq-question"
                    onClick={() => setOpenFaq(openFaq === index ? null : index)}
                    aria-expanded={openFaq === index}
                  >
                    <span>{faq.question}</span>
                    <span className="pet-faq-toggle">{openFaq === index ? '−' : '+'}</span>
                  </button>
                  {openFaq === index && (
                    <p className="pet-faq-answer">{faq.answer}</p>
                  )}
                </div>
              ))}
            </div>
          </Column>
          <Column lg={6} md={8} sm={4}>
            <div className="pet-faq-image">
              <img
                src="https://images.pexels.com/photos/16395151/pexels-photo-16395151.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Yorkshire terrier and Bengal cat playing together"
                loading="lazy"
              />
            </div>
          </Column>
        </Grid>
      </section>

      {/* CTA Section */}
      <section className="pet-cta-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <div className="pet-cta-content">
              <FavoriteFilled size={48} className="pet-cta-icon" />
              <Heading className="pet-cta-heading">
                Protect Your Pet Today
              </Heading>
              <p className="pet-cta-text">
                Join thousands of pet owners who trust InsureCo to keep their 
                furry family members covered.
              </p>
              <Button
                kind="primary"
                size="lg"
                onClick={() => setQuoteModalOpen(true)}
                renderIcon={ArrowRight}
              >
                Get a Free Quote
              </Button>
            </div>
          </Column>
        </Grid>
      </section>

      {/* Footer */}
      <footer className="pet-footer">
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <p className="pet-footer-brand">InsureCo Pet Insurance</p>
            <p className="pet-footer-copy">
              &copy; 2024 InsureCo. All rights reserved.
            </p>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <div className="pet-footer-links">
              <button onClick={() => navigate('/')} className="pet-footer-link">Home</button>
              <button onClick={() => navigate('/signup')} className="pet-footer-link">Sign Up</button>
              <button onClick={() => navigate('/about')} className="pet-footer-link">About</button>
              <a href="#" className="pet-footer-link">Privacy Policy</a>
              <a href="#" className="pet-footer-link">Terms of Service</a>
            </div>
          </Column>
        </Grid>
      </footer>

      {/* Quote Modal */}
      <Modal
        open={quoteModalOpen}
        onRequestClose={() => setQuoteModalOpen(false)}
        modalHeading="Get a Free Pet Insurance Quote"
        primaryButtonText="Get My Quote"
        secondaryButtonText="Cancel"
        onRequestSubmit={() => {
          setQuoteModalOpen(false);
          navigate('/signup');
        }}
        size="sm"
      >
        <Stack gap={6}>
          <TextInput
            id="pet-owner-name"
            labelText="Your Name"
            placeholder="Enter your name"
          />
          <TextInput
            id="pet-owner-email"
            labelText="Email Address"
            placeholder="Enter your email"
            type="email"
          />
          <TextInput
            id="pet-name"
            labelText="Pet's Name"
            placeholder="Enter your pet's name"
          />
          <TextArea
            id="pet-details"
            labelText="Tell us about your pet (breed, age)"
            placeholder="e.g. 3-year-old Labrador Retriever"
            rows={3}
          />
        </Stack>
      </Modal>
    </div>
  );
}
