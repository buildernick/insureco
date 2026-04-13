import React, { useState, useEffect, useRef } from 'react';
import {
  Grid,
  Column,
  Button,
  Modal,
  TextInput,
  TextArea,
  Heading,
  Stack,
} from '@carbon/react';
import {
  FavoriteFilled,
  CheckmarkFilled,
  ArrowRight,
  Warning,
  Stethoscope,
  Medication,
  Receipt,
} from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import './PetInsurancePage.scss';

const stats = [
  { value: '50,000+', label: 'Pets Protected' },
  { value: '$19/mo', label: 'Starting Price' },
  { value: '48hrs', label: 'Avg. Reimbursement' },
  { value: '100%', label: 'Vet of Your Choice' },
];

const benefits = [
  {
    icon: <Warning size={36} />,
    title: 'Accident Coverage',
    description: 'From broken bones to unexpected injuries, we cover the costs so you can focus on your pet\'s recovery.',
  },
  {
    icon: <Stethoscope size={36} />,
    title: 'Illness Coverage',
    description: 'Chronic conditions, infections, and serious diagnoses — covered with no lifetime limits on eligible plans.',
  },
  {
    icon: <Medication size={36} />,
    title: 'Prescription Meds',
    description: 'Ongoing prescriptions add up fast. We cover eligible medications so your pet stays healthy year-round.',
  },
  {
    icon: <Receipt size={36} />,
    title: 'Fast Reimbursement',
    description: 'Submit a claim online in minutes and receive reimbursement in as little as 2 business days.',
  },
];

const plans = [
  {
    name: 'Basic',
    price: '$19',
    tagline: 'Essential protection',
    featured: false,
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
    featured: true,
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
    featured: false,
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

  const heroImgRef = useRef(null);
  const heroTextRef = useRef(null);

  // Hero parallax — image moves slower than scroll, text moves slightly up
  useEffect(() => {
    let rafId;
    const onScroll = () => {
      rafId = requestAnimationFrame(() => {
        const scrolled = window.scrollY;
        if (heroImgRef.current) {
          heroImgRef.current.style.transform = `translateY(${scrolled * 0.42}px)`;
        }
        if (heroTextRef.current) {
          heroTextRef.current.style.transform = `translateY(${scrolled * 0.18}px)`;
          heroTextRef.current.style.opacity = `${1 - scrolled / 600}`;
        }
      });
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => {
      window.removeEventListener('scroll', onScroll);
      cancelAnimationFrame(rafId);
    };
  }, []);

  // Scroll-reveal for elements with .reveal class
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('revealed');
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );
    document.querySelectorAll('.reveal').forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, []);

  return (
    <div className="pet-page">

      {/* ── Hero ── */}
      <section className="pet-hero">
        <div className="pet-hero__parallax-img" ref={heroImgRef}>
          <img
            src="https://images.pexels.com/photos/32742546/pexels-photo-32742546.jpeg?auto=compress&cs=tinysrgb&w=1400"
            alt="Happy golden retriever in sunshine"
          />
        </div>
        <div className="pet-hero__overlay" />

        <div className="pet-hero__body" ref={heroTextRef}>
          <div className="pet-hero__eyebrow">
            <FavoriteFilled size={16} />
            <span>New from InsureCo</span>
          </div>
          <h1 className="pet-hero__heading">
            Every Paw<br />Deserves<br />Protection
          </h1>
          <p className="pet-hero__sub">
            Comprehensive insurance for dogs &amp; cats — accidents, illness,
            and routine care. Starting at just&nbsp;<strong>$19/month</strong>.
          </p>
          <div className="pet-hero__actions">
            <Button
              kind="primary"
              size="lg"
              onClick={() => setQuoteModalOpen(true)}
              renderIcon={ArrowRight}
            >
              Get a Free Quote
            </Button>
            <button
              className="pet-hero__ghost-btn"
              onClick={() => navigate('/signup')}
            >
              View Plans
            </button>
          </div>
          <div className="pet-hero__trust">
            <CheckmarkFilled size={14} /><span>No breed restrictions</span>
            <CheckmarkFilled size={14} /><span>Cancel anytime</span>
            <CheckmarkFilled size={14} /><span>Any licensed vet</span>
          </div>
        </div>

        <div className="pet-hero__scroll-hint">
          <span />
        </div>
      </section>

      {/* ── Stats Bar ── */}
      <div className="pet-stats">
        {stats.map((s, i) => (
          <div className="pet-stats__item reveal" key={i} style={{ transitionDelay: `${i * 0.08}s` }}>
            <span className="pet-stats__value">{s.value}</span>
            <span className="pet-stats__label">{s.label}</span>
          </div>
        ))}
      </div>

      {/* ── Benefits ── */}
      <section className="pet-benefits">
        <div className="pet-benefits__header reveal">
          <h2 className="pet-section-title">What's Covered</h2>
          <p className="pet-section-sub">Comprehensive protection at every stage of your pet's life.</p>
        </div>
        <Grid>
          {benefits.map((b, i) => (
            <Column lg={4} md={4} sm={4} key={i}>
              <div
                className="pet-benefit-card reveal"
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                <div className="pet-benefit-card__icon">{b.icon}</div>
                <h3 className="pet-benefit-card__title">{b.title}</h3>
                <p className="pet-benefit-card__desc">{b.description}</p>
              </div>
            </Column>
          ))}
        </Grid>
      </section>

      {/* ── Parallax Banner ── */}
      <div className="pet-parallax-banner">
        <div className="pet-parallax-banner__overlay" />
        <div className="pet-parallax-banner__content reveal">
          <span className="pet-parallax-banner__eyebrow">Why it matters</span>
          <blockquote className="pet-parallax-banner__quote">
            "1 in 3 pets needs emergency veterinary care each year. 
            Are you prepared?"
          </blockquote>
          <p className="pet-parallax-banner__note">
            Average emergency vet bill: <strong>$1,500–$4,000</strong>
          </p>
        </div>
      </div>

      {/* ── Use Any Vet ── */}
      <section className="pet-vet-section">
        <Grid>
          <Column lg={7} md={4} sm={4}>
            <div className="pet-vet-img reveal">
              <img
                src="https://images.pexels.com/photos/7468978/pexels-photo-7468978.jpeg?auto=compress&cs=tinysrgb&w=900"
                alt="Veterinarian examining a dog"
                loading="lazy"
              />
            </div>
          </Column>
          <Column lg={9} md={4} sm={4}>
            <div className="pet-vet-content reveal">
              <span className="pet-section-eyebrow">Freedom to choose</span>
              <h2 className="pet-section-title pet-section-title--left">
                Use Any Vet, Anywhere
              </h2>
              <p className="pet-vet-content__desc">
                Unlike plans that lock you into a network, InsureCo Pet Insurance
                works with any licensed veterinarian or specialist in the US and Canada.
              </p>
              <ul className="pet-vet-content__list">
                {[
                  'Family veterinarians',
                  'Emergency animal hospitals',
                  'Specialty & specialist clinics',
                  'Telehealth vet consultations',
                  'University veterinary clinics',
                ].map((item, i) => (
                  <li key={i}>
                    <CheckmarkFilled size={18} />
                    <span>{item}</span>
                  </li>
                ))}
              </ul>
            </div>
          </Column>
        </Grid>
      </section>

      {/* ── Plans ── */}
      <section className="pet-plans">
        <div className="pet-plans__header reveal">
          <h2 className="pet-section-title">Simple, Transparent Plans</h2>
          <p className="pet-section-sub">
            Pick the plan that fits your pet and budget. Upgrade or downgrade anytime.
          </p>
        </div>
        <Grid>
          {plans.map((plan, i) => (
            <Column lg={5} md={4} sm={4} key={i}>
              <div
                className={`pet-plan reveal ${plan.featured ? 'pet-plan--featured' : ''}`}
                style={{ transitionDelay: `${i * 0.1}s` }}
              >
                {plan.featured && (
                  <div className="pet-plan__badge">Most Popular</div>
                )}
                <div className="pet-plan__top">
                  <h3 className="pet-plan__name">{plan.name}</h3>
                  <div className="pet-plan__price">
                    <span className="pet-plan__amount">{plan.price}</span>
                    <span className="pet-plan__per">/mo per pet</span>
                  </div>
                  <p className="pet-plan__tagline">{plan.tagline}</p>
                </div>
                <ul className="pet-plan__features">
                  {plan.features.map((f, fi) => (
                    <li key={fi}>
                      <CheckmarkFilled size={15} />
                      <span>{f}</span>
                    </li>
                  ))}
                </ul>
                <Button
                  kind={plan.featured ? 'primary' : 'tertiary'}
                  className="pet-plan__cta"
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

      {/* ── FAQ ── */}
      <section className="pet-faq">
        <Grid>
          <Column lg={9} md={5} sm={4}>
            <div className="reveal">
              <span className="pet-section-eyebrow">Got questions?</span>
              <h2 className="pet-section-title pet-section-title--left">
                Frequently Asked
              </h2>
            </div>
            <div className="pet-faq__list">
              {faqs.map((faq, i) => (
                <div
                  key={i}
                  className={`pet-faq__item reveal ${openFaq === i ? 'pet-faq__item--open' : ''}`}
                  style={{ transitionDelay: `${i * 0.07}s` }}
                >
                  <button
                    className="pet-faq__q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{faq.question}</span>
                    <span className="pet-faq__toggle" aria-hidden="true" />
                  </button>
                  <div className="pet-faq__a-wrap">
                    <p className="pet-faq__a">{faq.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </Column>
          <Column lg={7} md={3} sm={4}>
            <div className="pet-faq__img reveal">
              <img
                src="https://images.pexels.com/photos/16395151/pexels-photo-16395151.jpeg?auto=compress&cs=tinysrgb&w=700"
                alt="Yorkshire terrier and Bengal cat playing together"
                loading="lazy"
              />
            </div>
          </Column>
        </Grid>
      </section>

      {/* ── CTA ── */}
      <section className="pet-cta">
        <div className="pet-cta__content reveal">
          <FavoriteFilled size={52} className="pet-cta__icon" />
          <h2 className="pet-cta__heading">Protect Your Pet Today</h2>
          <p className="pet-cta__text">
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
      </section>

      {/* ── Footer ── */}
      <footer className="pet-footer">
        <Grid>
          <Column lg={8} md={4} sm={4}>
            <p className="pet-footer__brand">InsureCo Pet Insurance</p>
            <p className="pet-footer__copy">&copy; 2024 InsureCo. All rights reserved.</p>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <nav className="pet-footer__links">
              <button onClick={() => navigate('/')} className="pet-footer__link">Home</button>
              <button onClick={() => navigate('/signup')} className="pet-footer__link">Sign Up</button>
              <button onClick={() => navigate('/about')} className="pet-footer__link">About</button>
              <a href="#" className="pet-footer__link">Privacy</a>
              <a href="#" className="pet-footer__link">Terms</a>
            </nav>
          </Column>
        </Grid>
      </footer>

      {/* ── Quote Modal ── */}
      <Modal
        open={quoteModalOpen}
        onRequestClose={() => setQuoteModalOpen(false)}
        modalHeading="Get a Free Pet Insurance Quote"
        primaryButtonText="Get My Quote"
        secondaryButtonText="Cancel"
        onRequestSubmit={() => { setQuoteModalOpen(false); navigate('/signup'); }}
        size="sm"
      >
        <Stack gap={6}>
          <TextInput id="pet-owner-name" labelText="Your Name" placeholder="Enter your name" />
          <TextInput id="pet-owner-email" labelText="Email Address" placeholder="Enter your email" type="email" />
          <TextInput id="pet-name" labelText="Pet's Name" placeholder="Enter your pet's name" />
          <TextArea id="pet-details" labelText="Tell us about your pet (breed, age)" placeholder="e.g. 3-year-old Labrador Retriever" rows={3} />
        </Stack>
      </Modal>
    </div>
  );
}
