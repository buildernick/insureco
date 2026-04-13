import React, { useState } from 'react';
import { Grid, Column, Button, Tag } from '@carbon/react';
import {
  CheckmarkFilled,
  ArrowRight,
  FavoriteFilled,
  Warning,
  Receipt,
  Launch,
  Code,
} from '@carbon/icons-react';
import StepBreadcrumb from '../components/StepBreadcrumb';
import { useTheme } from '../contexts/ThemeContext';
import './ComponentGallery.scss';

// ─── Demo data ──────────────────────────────────────────────────────────────

const SIGNUP_STEPS = [
  { label: 'Account', description: 'Email & password' },
  { label: 'Personal', description: 'Name & address' },
  { label: 'Coverage', description: 'Choose a plan' },
  { label: 'Vehicle', description: 'Car details' },
  { label: 'Review', description: 'Confirm & submit' },
];

const SHORT_STEPS = [
  { label: 'Details' },
  { label: 'Payment' },
  { label: 'Confirm' },
];

const PLAN_CARDS = [
  {
    name: 'Basic',
    price: '$19',
    tagline: 'Essential protection',
    featured: false,
    features: ['Accident coverage', 'Emergency vet visits', 'Up to $5,000/year'],
    cta: 'Get Basic',
  },
  {
    name: 'Plus',
    price: '$39',
    tagline: 'Most popular choice',
    featured: true,
    features: ['Everything in Basic', 'Illness coverage', 'Prescription medications', 'Up to $15,000/year'],
    cta: 'Get Plus',
  },
  {
    name: 'Premium',
    price: '$69',
    tagline: 'Complete peace of mind',
    featured: false,
    features: ['Everything in Plus', 'Routine wellness visits', 'Unlimited annual coverage'],
    cta: 'Get Premium',
  },
];

const BENEFIT_CARDS = [
  { icon: <Warning size={32} />, title: 'Accident Coverage', description: 'Covers unexpected injuries and emergencies at any licensed vet.' },
  { icon: <FavoriteFilled size={32} />, title: 'Illness Coverage', description: 'Chronic conditions and serious diagnoses — covered on eligible plans.' },
  { icon: <Receipt size={32} />, title: 'Fast Reimbursement', description: 'Submit claims online in minutes. Reimbursed in as little as 48 hours.' },
];

const FAQ_ITEMS = [
  { question: 'What pets are covered?', answer: 'We cover dogs and cats of all breeds and ages, starting at 8 weeks old.' },
  { question: 'Are pre-existing conditions covered?', answer: 'Curable pre-existing conditions may be covered after a 12-month symptom-free period.' },
  { question: 'Can I use any vet?', answer: 'Yes — any licensed veterinarian or specialist in the US or Canada.' },
];

const STATS = [
  { value: '50,000+', label: 'Pets Protected' },
  { value: '$19/mo', label: 'Starting Price' },
  { value: '48hrs', label: 'Avg. Reimbursement' },
  { value: '100%', label: 'Vet of Your Choice' },
];

// ─── Sub-components used as "inline custom patterns" ──────────────────────

function PropsTable({ rows }) {
  return (
    <table className="gallery-props-table">
      <thead>
        <tr>
          <th>Prop</th>
          <th>Type</th>
          <th>Default</th>
          <th>Description</th>
        </tr>
      </thead>
      <tbody>
        {rows.map((r, i) => (
          <tr key={i}>
            <td><code>{r.prop}</code></td>
            <td><code className="gallery-props-table__type">{r.type}</code></td>
            <td><code>{r.default}</code></td>
            <td>{r.desc}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}

function SectionHeader({ label, title, description, source }) {
  return (
    <div className="gallery-section-header">
      <div className="gallery-section-header__meta">
        <Tag type="blue" size="sm">{label}</Tag>
        {source && (
          <code className="gallery-section-header__source">{source}</code>
        )}
      </div>
      <h2 className="gallery-section-header__title">{title}</h2>
      {description && <p className="gallery-section-header__desc">{description}</p>}
    </div>
  );
}

function DemoFrame({ label, children, dark }) {
  return (
    <div className={`gallery-demo-frame ${dark ? 'gallery-demo-frame--dark' : ''}`}>
      {label && <span className="gallery-demo-frame__label">{label}</span>}
      <div className="gallery-demo-frame__body">{children}</div>
    </div>
  );
}

// ─── Main Page ───────────────────────────────────────────────────────────────

export default function ComponentGallery() {
  const { isDark } = useTheme();

  // StepBreadcrumb interactive state
  const [signupStep, setSignupStep] = useState(2);
  const [shortStep, setShortStep] = useState(1);

  // FAQ accordion state
  const [openFaq, setOpenFaq] = useState(null);

  // Announcement banner visibility
  const [bannerVisible, setBannerVisible] = useState(true);

  return (
    <div className="gallery-page">

      {/* ── Page Header ── */}
      <div className="gallery-page-header">
        <Grid>
          <Column lg={12} md={8} sm={4}>
            <div className="gallery-page-header__eyebrow">
              <Code size={18} />
              <span>InsureCo Design System</span>
            </div>
            <h1 className="gallery-page-header__title">Custom Component Gallery</h1>
            <p className="gallery-page-header__desc">
              Custom-built UI components and patterns used across the InsureCo app. These 
              complement the Carbon Design System where standard components don't cover 
              the need, or had theming limitations.
            </p>
            <div className="gallery-page-header__stats">
              <div className="gallery-stat">
                <span className="gallery-stat__num">2</span>
                <span className="gallery-stat__label">Reusable components</span>
              </div>
              <div className="gallery-stat">
                <span className="gallery-stat__num">6</span>
                <span className="gallery-stat__label">Inline patterns</span>
              </div>
              <div className="gallery-stat">
                <span className="gallery-stat__num">2</span>
                <span className="gallery-stat__label">Pages using custom UI</span>
              </div>
            </div>
          </Column>
        </Grid>
      </div>

      {/* ── TOC ── */}
      <div className="gallery-toc">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <p className="gallery-toc__label">Jump to</p>
            <div className="gallery-toc__links">
              {[
                ['#step-breadcrumb', 'StepBreadcrumb'],
                ['#theme-toggle', 'ThemeToggle'],
                ['#announcement-banner', 'Announcement Banner'],
                ['#benefit-cards', 'Benefit Cards'],
                ['#stats-bar', 'Stats Bar'],
                ['#plan-cards', 'Plan Cards'],
                ['#faq-accordion', 'FAQ Accordion'],
                ['#parallax-banner', 'Parallax Banner'],
              ].map(([href, label]) => (
                <a key={href} href={href} className="gallery-toc__link">{label}</a>
              ))}
            </div>
          </Column>
        </Grid>
      </div>

      <div className="gallery-divider gallery-divider--section">
        <span>Reusable Components</span>
      </div>

      {/* ══════════════════════════════════════════════
          1. StepBreadcrumb
      ══════════════════════════════════════════════ */}
      <section id="step-breadcrumb" className="gallery-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <SectionHeader
              label="Reusable Component"
              title="StepBreadcrumb"
              source="src/components/StepBreadcrumb.jsx"
              description="A multi-step progress indicator used in the sign-up flow. Built as a custom replacement for Carbon's ProgressIndicator, which had persistent dark-mode contrast failures due to CSS specificity conflicts."
            />
          </Column>

          {/* Interactive 5-step demo */}
          <Column lg={16} md={8} sm={4}>
            <DemoFrame label="5-step sign-up flow (interactive)">
              <StepBreadcrumb steps={SIGNUP_STEPS} currentIndex={signupStep} />
              <div className="gallery-step-controls">
                <Button
                  kind="ghost"
                  size="sm"
                  onClick={() => setSignupStep(Math.max(0, signupStep - 1))}
                  disabled={signupStep === 0}
                >
                  ← Previous
                </Button>
                <span className="gallery-step-controls__label">
                  Step {signupStep + 1} of {SIGNUP_STEPS.length}
                </span>
                <Button
                  kind="ghost"
                  size="sm"
                  onClick={() => setSignupStep(Math.min(SIGNUP_STEPS.length - 1, signupStep + 1))}
                  disabled={signupStep === SIGNUP_STEPS.length - 1}
                >
                  Next →
                </Button>
              </div>
            </DemoFrame>
          </Column>

          {/* Static state demos */}
          <Column lg={8} md={4} sm={4}>
            <DemoFrame label="3-step — step 1 current">
              <StepBreadcrumb steps={SHORT_STEPS} currentIndex={0} />
            </DemoFrame>
          </Column>
          <Column lg={8} md={4} sm={4}>
            <DemoFrame label="3-step — all complete">
              <StepBreadcrumb steps={SHORT_STEPS} currentIndex={3} />
            </DemoFrame>
          </Column>

          {/* Props */}
          <Column lg={16} md={8} sm={4}>
            <h3 className="gallery-subsection-title">Props</h3>
            <PropsTable rows={[
              { prop: 'steps', type: 'Array<{ label, description?, key? }>', default: '—', desc: 'Ordered list of step objects. Only label is required.' },
              { prop: 'currentIndex', type: 'number', default: '0', desc: 'Zero-based index of the active step. Steps before this index are shown as complete.' },
              { prop: 'spaceEqually', type: 'boolean', default: 'true', desc: 'When true, each step item takes equal flex width.' },
            ]} />
          </Column>

          {/* Notes */}
          <Column lg={16} md={8} sm={4}>
            <div className="gallery-callout gallery-callout--warning">
              <strong>Why not Carbon ProgressIndicator?</strong> Carbon's default styles use
              deeply nested selectors with hardcoded colors that override custom theme tokens even
              with <code>!important</code>. After exhausting CSS specificity fixes, the component
              was banned and this replacement was built. See <code>.builder/rules/progress-indicator-fix.mdc</code>.
            </div>
          </Column>
        </Grid>
      </section>

      {/* ══════════════════════════════════════════════
          2. ThemeToggle
      ══════════════════════════════════════════════ */}
      <section id="theme-toggle" className="gallery-section gallery-section--alt">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <SectionHeader
              label="Reusable Component"
              title="ThemeToggle"
              source="src/components/ThemeToggle.jsx"
              description="A header action button that switches between light (white) and dark (g100) Carbon themes. Persists the user's preference in localStorage. Currently lives in the top-right of the global header."
            />
          </Column>

          <Column lg={8} md={4} sm={4}>
            <DemoFrame label="Live instance — already rendered in the header above ↑">
              <div className="gallery-theme-toggle-demo">
                <p className="gallery-theme-toggle-demo__note">
                  Current theme: <strong>{isDark ? 'Dark (g100)' : 'Light (white)'}</strong>
                </p>
                <p className="gallery-theme-toggle-demo__hint">
                  Use the <strong>moon / sun icon</strong> in the top-right header to toggle.
                  The preference is saved to <code>localStorage</code> under the key{' '}
                  <code>insureco-theme</code>.
                </p>
              </div>
            </DemoFrame>
          </Column>

          <Column lg={8} md={4} sm={4}>
            <h3 className="gallery-subsection-title">Implementation</h3>
            <div className="gallery-code-block">
              <pre>{`import { useTheme } from '../contexts/ThemeContext';

const { isDark, toggleTheme } = useTheme();

// isDark    → boolean (true = g100 theme)
// toggleTheme → () => void

// Wraps Carbon's HeaderGlobalAction with
// Asleep icon (light mode) / Light icon (dark mode)`}</pre>
            </div>
            <div className="gallery-callout">
              Provided by <code>ThemeContext.jsx</code>. The context also exposes{' '}
              <code>theme</code>, <code>setTheme</code>, <code>setLightTheme</code>,{' '}
              and <code>setDarkTheme</code>.
            </div>
          </Column>
        </Grid>
      </section>

      <div className="gallery-divider gallery-divider--section">
        <span>Inline Patterns</span>
      </div>

      {/* ══════════════════════════════════════════════
          3. Announcement Banner
      ══════════════════════════════════════════════ */}
      <section id="announcement-banner" className="gallery-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <SectionHeader
              label="Inline Pattern"
              title="Announcement Banner"
              source="src/pages/LandingPage.jsx"
              description="A slim, full-width strip that promotes a new product or feature at the very top of the landing page. Currently announces the Pet Insurance product launch."
            />
          </Column>
          <Column lg={16} md={8} sm={4}>
            <DemoFrame label="Live preview">
              {bannerVisible ? (
                <div className="gallery-banner-demo">
                  <FavoriteFilled size={16} />
                  <span>New: <strong>Pet Insurance</strong> is here — protect your furry family members.</span>
                  <button className="gallery-banner-demo__cta">
                    Explore Plans <Launch size={14} />
                  </button>
                  <button className="gallery-banner-demo__close" onClick={() => setBannerVisible(false)} aria-label="Dismiss">×</button>
                </div>
              ) : (
                <div className="gallery-banner-demo__empty">
                  <span>Banner dismissed.</span>
                  <Button kind="ghost" size="sm" onClick={() => setBannerVisible(true)}>Reset</Button>
                </div>
              )}
            </DemoFrame>
          </Column>
          <Column lg={16} md={8} sm={4}>
            <div className="gallery-callout">
              Uses <code>var(--interactive-primary)</code> background with <code>var(--text-on-color)</code> text — works in both themes. The pill CTA uses a semi-transparent white background with <code>backdrop-filter: blur</code>.
            </div>
          </Column>
        </Grid>
      </section>

      {/* ══════════════════════════════════════════════
          4. Benefit Cards
      ══════════════════════════════════════════════ */}
      <section id="benefit-cards" className="gallery-section gallery-section--alt">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <SectionHeader
              label="Inline Pattern"
              title="Benefit Cards"
              source="src/pages/PetInsurancePage.jsx"
              description={'Used in the "What\'s Covered" section of the Pet Insurance landing page. Cards lift on hover and highlight with a brand-red border. Built as plain divs rather than Carbon Tiles for full border control on hover.'}
            />
          </Column>
          {BENEFIT_CARDS.map((card, i) => (
            <Column lg={5} md={4} sm={4} key={i}>
              <div className="gallery-benefit-card">
                <div className="gallery-benefit-card__icon">{card.icon}</div>
                <h3 className="gallery-benefit-card__title">{card.title}</h3>
                <p className="gallery-benefit-card__desc">{card.description}</p>
              </div>
            </Column>
          ))}
          <Column lg={16} md={8} sm={4}>
            <div className="gallery-callout">
              Hover over a card to see the lift + border effect. Uses <code>transform: translateY(-6px)</code>, <code>box-shadow</code>, and <code>border-color: var(--interactive-primary)</code> on <code>:hover</code>.
            </div>
          </Column>
        </Grid>
      </section>

      {/* ══════════════════════════════════════════════
          5. Stats Bar
      ══════════════════════════════════════════════ */}
      <section id="stats-bar" className="gallery-section">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <SectionHeader
              label="Inline Pattern"
              title="Stats Bar"
              source="src/pages/PetInsurancePage.jsx"
              description="A full-width horizontal strip of 4 key numbers rendered directly below the hero. Used for trust-building at first scroll. Also supports scroll-reveal animation via the .reveal / .revealed class system."
            />
          </Column>
          <Column lg={16} md={8} sm={4}>
            <DemoFrame label="Live preview">
              <div className="gallery-stats-bar">
                {STATS.map((s, i) => (
                  <div className="gallery-stats-bar__item" key={i}>
                    <span className="gallery-stats-bar__value">{s.value}</span>
                    <span className="gallery-stats-bar__label">{s.label}</span>
                  </div>
                ))}
              </div>
            </DemoFrame>
          </Column>
          <Column lg={16} md={8} sm={4}>
            <div className="gallery-callout">
              Values use <code>color: var(--interactive-primary)</code>. Labels use <code>var(--text-secondary)</code> with uppercase letter-spacing. Wraps to 2×2 on mobile.
            </div>
          </Column>
        </Grid>
      </section>

      {/* ══════════════════════════════════════════════
          6. Plan Cards
      ══════════════════════════════════════════════ */}
      <section id="plan-cards" className="gallery-section gallery-section--alt">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <SectionHeader
              label="Inline Pattern"
              title="Plan / Pricing Cards"
              source="src/pages/PetInsurancePage.jsx"
              description='Three-tier pricing cards used in the Pet Insurance plans section. The "featured" card gets a brand-red 2px border, elevated box-shadow, and a "Most Popular" badge. Lifts on hover across all variants.'
            />
          </Column>
          {PLAN_CARDS.map((plan, i) => (
            <Column lg={5} md={4} sm={4} key={i}>
              <div className={`gallery-plan-card ${plan.featured ? 'gallery-plan-card--featured' : ''}`}>
                {plan.featured && <div className="gallery-plan-card__badge">Most Popular</div>}
                <div className="gallery-plan-card__top">
                  <h3 className="gallery-plan-card__name">{plan.name}</h3>
                  <div className="gallery-plan-card__price">
                    <span className="gallery-plan-card__amount">{plan.price}</span>
                    <span className="gallery-plan-card__per">/mo per pet</span>
                  </div>
                  <p className="gallery-plan-card__tagline">{plan.tagline}</p>
                </div>
                <ul className="gallery-plan-card__features">
                  {plan.features.map((f, fi) => (
                    <li key={fi}><CheckmarkFilled size={15} /><span>{f}</span></li>
                  ))}
                </ul>
                <Button
                  kind={plan.featured ? 'primary' : 'tertiary'}
                  className="gallery-plan-card__cta"
                  renderIcon={ArrowRight}
                >
                  {plan.cta}
                </Button>
              </div>
            </Column>
          ))}
        </Grid>
      </section>

      {/* ══════════════════════════════════════════════
          7. FAQ Accordion
      ══════════════════════════════════════════════ */}
      <section id="faq-accordion" className="gallery-section">
        <Grid>
          <Column lg={10} md={6} sm={4}>
            <SectionHeader
              label="Inline Pattern"
              title="FAQ Accordion"
              source="src/pages/PetInsurancePage.jsx"
              description="Custom expand/collapse FAQ list. Uses CSS max-height transition for smooth animation — no JavaScript animation frame needed. The +/− indicator is built entirely with CSS pseudo-elements."
            />
            <div className="gallery-faq">
              {FAQ_ITEMS.map((item, i) => (
                <div
                  key={i}
                  className={`gallery-faq__item ${openFaq === i ? 'gallery-faq__item--open' : ''}`}
                >
                  <button
                    className="gallery-faq__q"
                    onClick={() => setOpenFaq(openFaq === i ? null : i)}
                    aria-expanded={openFaq === i}
                  >
                    <span>{item.question}</span>
                    <span className="gallery-faq__toggle" aria-hidden="true" />
                  </button>
                  <div className="gallery-faq__a-wrap">
                    <p className="gallery-faq__a">{item.answer}</p>
                  </div>
                </div>
              ))}
            </div>
          </Column>
          <Column lg={6} md={2} sm={4}>
            <div className="gallery-callout" style={{ marginTop: '6.5rem' }}>
              <strong>How it works:</strong> The answer panel uses <code>max-height: 0</code> (collapsed) and <code>max-height: 200px</code> (open) with a CSS <code>cubic-bezier</code> transition. State is tracked with a single <code>openFaq</code> index in React — only one item open at a time.
            </div>
          </Column>
        </Grid>
      </section>

      {/* ══════════════════════════════════════════════
          8. Parallax Banner
      ══════════════════════════════════════════════ */}
      <section id="parallax-banner" className="gallery-section gallery-section--alt">
        <Grid>
          <Column lg={16} md={8} sm={4}>
            <SectionHeader
              label="Inline Pattern"
              title="Parallax Quote Banner"
              source="src/pages/PetInsurancePage.jsx"
              description='A full-bleed section that uses CSS background-attachment: fixed to create a parallax effect as the page scrolls over the background image. Used mid-page as a dramatic visual break with a supporting statistic or quote. Falls back to background-attachment: scroll on iOS.'
            />
          </Column>
          <Column lg={16} md={8} sm={4}>
            <DemoFrame label="Static preview (parallax effect visible on the /pet-insurance page)">
              <div className="gallery-parallax-preview">
                <div className="gallery-parallax-preview__overlay" />
                <div className="gallery-parallax-preview__content">
                  <span className="gallery-parallax-preview__eyebrow">Why it matters</span>
                  <blockquote className="gallery-parallax-preview__quote">
                    "1 in 3 pets needs emergency veterinary care each year. Are you prepared?"
                  </blockquote>
                  <p className="gallery-parallax-preview__note">
                    Average emergency vet bill: <strong>$1,500–$4,000</strong>
                  </p>
                </div>
              </div>
            </DemoFrame>
          </Column>
          <Column lg={16} md={8} sm={4}>
            <div className="gallery-callout gallery-callout--warning">
              <strong>Mobile note:</strong> <code>background-attachment: fixed</code> is not supported on iOS Safari. The page's responsive stylesheet overrides this to <code>background-attachment: scroll</code> below <code>$breakpoint-md</code>.
            </div>
          </Column>
        </Grid>
      </section>

    </div>
  );
}
