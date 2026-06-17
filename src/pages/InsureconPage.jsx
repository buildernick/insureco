import { useState, useEffect, useRef } from 'react';
import './InsureconPage.scss';

const SECTIONS = [
  {
    id: 'keynotes',
    eyebrow: 'Day 1 · Main Stage',
    heading: 'World-Class Keynotes',
    body: 'Hear from the brightest minds reshaping the insurance landscape. CEOs, innovators, and visionaries take the stage in front of 5,000 industry leaders.',
    stat1: { value: '40+', label: 'Keynote Speakers' },
    stat2: { value: '3', label: 'Stage Days' },
    accent: '#c9a96e',
    bgClass: 'insurecon-section--gold',
  },
  {
    id: 'sessions',
    eyebrow: 'Deep Dives',
    heading: '200+ Breakout Sessions',
    body: 'From actuarial AI to climate risk modeling — dive deep into the topics defining the next decade of insurance. Twelve curated tracks, zero fluff.',
    stat1: { value: '200+', label: 'Sessions' },
    stat2: { value: '12', label: 'Tracks' },
    accent: '#da1e28',
    bgClass: 'insurecon-section--red',
  },
  {
    id: 'networking',
    eyebrow: 'Evening Events',
    heading: 'Unmatched Networking',
    body: 'Rooftop receptions, hosted dinners, and curated meetups. The connections made at Insurecon define careers — and companies.',
    stat1: { value: '5,000+', label: 'Attendees' },
    stat2: { value: '60+', label: 'Countries' },
    accent: '#4fc3f7',
    bgClass: 'insurecon-section--blue',
  },
  {
    id: 'innovation',
    eyebrow: 'Insurtech Expo Floor',
    heading: 'Innovation Showcase',
    body: 'Walk 150+ live product demos from the startups and enterprises rewriting the rules of insurance technology. The future is already here.',
    stat1: { value: '150+', label: 'Exhibitors' },
    stat2: { value: '$2.4B', label: 'Combined Funding' },
    accent: '#69f0ae',
    bgClass: 'insurecon-section--green',
  },
];

const TICKET_TYPES = [
  { id: 'general', label: 'General Admission', price: '$599', description: 'Full conference access, all keynotes & sessions' },
  { id: 'vip', label: 'VIP Pass', price: '$1,299', description: 'Priority seating, VIP lounge & exclusive hosted dinners' },
  { id: 'speaker', label: 'Speaker Pass', price: 'Complimentary', description: 'For invited speakers and presenters only' },
];

const SPONSORSHIP_LEVELS = [
  { id: 'none', label: 'None', price: '' },
  { id: 'bronze', label: 'Bronze', price: '$5k' },
  { id: 'silver', label: 'Silver', price: '$10k' },
  { id: 'gold', label: 'Gold', price: '$25k' },
  { id: 'platinum', label: 'Platinum', price: '$50k' },
];

export default function InsureconPage() {
  const [drawerOpen, setDrawerOpen] = useState(false);
  const [ticketType, setTicketType] = useState('general');
  const [sponsorship, setSponsorship] = useState('none');
  const [form, setForm] = useState({ name: '', email: '', company: '' });
  const [submitted, setSubmitted] = useState(false);
  const sectionRefs = useRef([]);
  const heroRef = useRef(null);

  // Intersection observer for section fade-in animations
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('insurecon-section--visible');
          }
        });
      },
      { threshold: 0.12 }
    );
    sectionRefs.current.forEach((el) => el && observer.observe(el));
    return () => observer.disconnect();
  }, []);

  // JS parallax on section background elements
  useEffect(() => {
    const handleScroll = () => {
      sectionRefs.current.forEach((el) => {
        if (!el) return;
        const rect = el.getBoundingClientRect();
        const progress = -rect.top / window.innerHeight;
        const bg = el.querySelector('.insurecon-section__bg');
        if (bg) bg.style.transform = `translateY(${progress * 60}px)`;
      });
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Lock body scroll when drawer open
  useEffect(() => {
    document.body.style.overflow = drawerOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [drawerOpen]);

  const handleSubmit = (e) => {
    e.preventDefault();
    setSubmitted(true);
  };

  const handleClose = () => {
    setDrawerOpen(false);
    setTimeout(() => setSubmitted(false), 400);
  };

  return (
    <div className="insurecon">

      {/* ── HERO ───────────────────────────────────────────────── */}
      <section className="insurecon__hero" ref={heroRef}>
        <div className="insurecon__hero-grid-overlay" />
        <div className="insurecon__hero-glow insurecon__hero-glow--top" />
        <div className="insurecon__hero-glow insurecon__hero-glow--bottom" />

        <div className="insurecon__hero-content">
          <p className="insurecon__location-tag">
            <span className="insurecon__location-dot" />
            September 24 · Las Vegas, Nevada
          </p>
          <h1 className="insurecon__wordmark">INSURE<span className="insurecon__wordmark-accent">CON</span></h1>
          <p className="insurecon__tagline">The Premier Insurance Industry Conference</p>
          <div className="insurecon__hero-actions">
            <button className="insurecon-btn insurecon-btn--primary" onClick={() => setDrawerOpen(true)}>
              Register Now <span aria-hidden="true">→</span>
            </button>
            <button className="insurecon-btn insurecon-btn--ghost">
              View Agenda
            </button>
          </div>
        </div>

        <div className="insurecon__hero-meta">
          <div className="insurecon__meta-item">
            <span className="insurecon__meta-value">5,000+</span>
            <span className="insurecon__meta-label">Attendees</span>
          </div>
          <div className="insurecon__meta-divider" />
          <div className="insurecon__meta-item">
            <span className="insurecon__meta-value">200+</span>
            <span className="insurecon__meta-label">Sessions</span>
          </div>
          <div className="insurecon__meta-divider" />
          <div className="insurecon__meta-item">
            <span className="insurecon__meta-value">3</span>
            <span className="insurecon__meta-label">Days</span>
          </div>
          <div className="insurecon__meta-divider" />
          <div className="insurecon__meta-item">
            <span className="insurecon__meta-value">60+</span>
            <span className="insurecon__meta-label">Countries</span>
          </div>
        </div>

        <div className="insurecon__scroll-cue">
          <div className="insurecon__scroll-bar" />
        </div>
      </section>

      {/* ── CONTENT SECTIONS ───────────────────────────────────── */}
      {SECTIONS.map((section, i) => (
        <section
          key={section.id}
          className={`insurecon-section ${section.bgClass}`}
          ref={(el) => (sectionRefs.current[i] = el)}
        >
          <div className="insurecon-section__bg" />
          <div className="insurecon-section__noise" />

          <div className="insurecon-section__layout">
            <div className="insurecon-section__content">
              <p className="insurecon-section__eyebrow" style={{ color: section.accent }}>
                {section.eyebrow}
              </p>
              <h2 className="insurecon-section__heading">{section.heading}</h2>
              <p className="insurecon-section__body">{section.body}</p>
              <div className="insurecon-section__stats">
                <div className="insurecon-section__stat">
                  <span className="insurecon-section__stat-value" style={{ color: section.accent }}>
                    {section.stat1.value}
                  </span>
                  <span className="insurecon-section__stat-label">{section.stat1.label}</span>
                </div>
                <div className="insurecon-section__stat-rule" />
                <div className="insurecon-section__stat">
                  <span className="insurecon-section__stat-value" style={{ color: section.accent }}>
                    {section.stat2.value}
                  </span>
                  <span className="insurecon-section__stat-label">{section.stat2.label}</span>
                </div>
              </div>
              <button
                className="insurecon-btn insurecon-btn--outline"
                style={{ '--btn-accent': section.accent }}
                onClick={() => setDrawerOpen(true)}
              >
                Secure Your Spot <span aria-hidden="true">→</span>
              </button>
            </div>
          </div>

          <span className="insurecon-section__watermark" aria-hidden="true">
            0{i + 1}
          </span>
        </section>
      ))}

      {/* ── DRAWER OVERLAY ─────────────────────────────────────── */}
      <div
        className={`insurecon-overlay ${drawerOpen ? 'insurecon-overlay--visible' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      {/* ── REGISTRATION DRAWER ────────────────────────────────── */}
      <aside
        className={`insurecon-drawer ${drawerOpen ? 'insurecon-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Conference Registration"
      >
        <div className="insurecon-drawer__header">
          <div>
            <p className="insurecon-drawer__header-eyebrow">INSURECON · Sep 24 · Las Vegas</p>
            <h2 className="insurecon-drawer__header-title">Register</h2>
          </div>
          <button className="insurecon-drawer__close-btn" onClick={handleClose} aria-label="Close registration">
            ✕
          </button>
        </div>

        {submitted ? (
          <div className="insurecon-drawer__success">
            <div className="insurecon-drawer__success-badge">✓</div>
            <h3 className="insurecon-drawer__success-heading">You're in.</h3>
            <p className="insurecon-drawer__success-body">
              Confirmation details are on their way to <strong>{form.email}</strong>. See you in Las Vegas.
            </p>
            <button className="insurecon-btn insurecon-btn--primary" onClick={handleClose}>
              Close
            </button>
          </div>
        ) : (
          <form className="insurecon-drawer__form" onSubmit={handleSubmit} noValidate>

            <fieldset className="insurecon-drawer__fieldset">
              <legend className="insurecon-drawer__legend">Your Details</legend>
              <div className="insurecon-drawer__field">
                <label htmlFor="ic-name">Full Name</label>
                <input id="ic-name" type="text" required placeholder="Jane Smith"
                  value={form.name} onChange={(e) => setForm({ ...form, name: e.target.value })} />
              </div>
              <div className="insurecon-drawer__field">
                <label htmlFor="ic-email">Work Email</label>
                <input id="ic-email" type="email" required placeholder="jane@acmeinsurance.com"
                  value={form.email} onChange={(e) => setForm({ ...form, email: e.target.value })} />
              </div>
              <div className="insurecon-drawer__field">
                <label htmlFor="ic-company">Company</label>
                <input id="ic-company" type="text" placeholder="Acme Insurance Co."
                  value={form.company} onChange={(e) => setForm({ ...form, company: e.target.value })} />
              </div>
            </fieldset>

            <fieldset className="insurecon-drawer__fieldset">
              <legend className="insurecon-drawer__legend">Ticket Type</legend>
              <div className="insurecon-drawer__ticket-list">
                {TICKET_TYPES.map((t) => (
                  <label
                    key={t.id}
                    className={`insurecon-drawer__ticket ${ticketType === t.id ? 'insurecon-drawer__ticket--active' : ''}`}
                  >
                    <input type="radio" name="ticket" value={t.id}
                      checked={ticketType === t.id} onChange={() => setTicketType(t.id)} />
                    <div className="insurecon-drawer__ticket-body">
                      <div className="insurecon-drawer__ticket-top">
                        <span className="insurecon-drawer__ticket-name">{t.label}</span>
                        <span className="insurecon-drawer__ticket-price">{t.price}</span>
                      </div>
                      <p className="insurecon-drawer__ticket-desc">{t.description}</p>
                    </div>
                    <span className="insurecon-drawer__ticket-radio-indicator" />
                  </label>
                ))}
              </div>
            </fieldset>

            <fieldset className="insurecon-drawer__fieldset">
              <legend className="insurecon-drawer__legend">Sponsorship Level</legend>
              <div className="insurecon-drawer__chip-row">
                {SPONSORSHIP_LEVELS.map((s) => (
                  <label
                    key={s.id}
                    className={`insurecon-drawer__chip ${sponsorship === s.id ? 'insurecon-drawer__chip--active' : ''}`}
                  >
                    <input type="radio" name="sponsorship" value={s.id}
                      checked={sponsorship === s.id} onChange={() => setSponsorship(s.id)} />
                    <span className="insurecon-drawer__chip-label">{s.label}</span>
                    {s.price && <span className="insurecon-drawer__chip-price">{s.price}</span>}
                  </label>
                ))}
              </div>
            </fieldset>

            <div className="insurecon-drawer__footer">
              <button type="submit" className="insurecon-btn insurecon-btn--primary insurecon-btn--full">
                Complete Registration <span aria-hidden="true">→</span>
              </button>
            </div>
          </form>
        )}
      </aside>
    </div>
  );
}
