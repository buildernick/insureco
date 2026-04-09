import React, { useState, useEffect, useRef } from 'react';
import { Car, Home, CheckmarkFilled, CircleDash } from '@carbon/icons-react';
import './QuotePreview.scss';

// ─── High-risk states for regional pricing adjustment ───────────────────────
const HIGH_RISK_STATES = new Set([
  'Florida', 'Louisiana', 'Michigan', 'New York', 'New Jersey',
  'California', 'Texas', 'Oklahoma', 'Kansas',
]);

const LOW_RISK_STATES = new Set([
  'Vermont', 'Maine', 'Idaho', 'Iowa', 'North Dakota',
  'Wyoming', 'South Dakota', 'Montana',
]);

/**
 * calculateEstimate – pure function that derives a monthly premium range
 * from the current form state. Returns { low, high, confidence, factors }.
 */
function calculateEstimate({
  insuranceType,
  carYear,
  carMilesPerYear,
  homeValue,
  homeSquareFeet,
  state,
}) {
  if (!insuranceType) return null;

  let base = 0;
  if (insuranceType === 'car') base = 45;
  else if (insuranceType === 'home') base = 65;
  else if (insuranceType === 'both') base = 95; // ~12% bundle saving vs 45+65=110

  let adjustment = 0;
  const factors = [];

  // ── Car factors ────────────────────────────────────────────
  if (insuranceType === 'car' || insuranceType === 'both') {
    if (carYear) {
      const yr = parseInt(carYear, 10);
      if (yr < 2010) {
        adjustment += 8;
        factors.push({ label: 'Older vehicle', effect: '+$8', done: true });
      } else if (yr > 2020) {
        adjustment -= 5;
        factors.push({ label: 'Newer vehicle', effect: '-$5', done: true });
      } else {
        factors.push({ label: 'Vehicle year', effect: 'included', done: true });
      }
    } else {
      factors.push({ label: 'Vehicle year', effect: 'pending', done: false });
    }

    const miles = parseInt(carMilesPerYear, 10) || 0;
    if (miles > 0) {
      if (miles > 15000) {
        adjustment += 10;
        factors.push({ label: 'High mileage', effect: '+$10', done: true });
      } else {
        factors.push({ label: 'Annual mileage', effect: 'included', done: true });
      }
    } else {
      factors.push({ label: 'Annual mileage', effect: 'pending', done: false });
    }
  }

  // ── Home factors ──────────────────────────────────────────
  if (insuranceType === 'home' || insuranceType === 'both') {
    const val = parseInt(homeValue, 10) || 0;
    if (val > 0) {
      if (val > 400000) {
        adjustment += 15;
        factors.push({ label: 'Home value', effect: '+$15', done: true });
      } else if (val < 200000) {
        adjustment -= 10;
        factors.push({ label: 'Home value', effect: '-$10', done: true });
      } else {
        factors.push({ label: 'Home value', effect: 'included', done: true });
      }
    } else {
      factors.push({ label: 'Home value', effect: 'pending', done: false });
    }

    const sqft = parseInt(homeSquareFeet, 10) || 0;
    if (sqft > 0) {
      if (sqft > 2500) {
        adjustment += 8;
        factors.push({ label: 'Square footage', effect: '+$8', done: true });
      } else {
        factors.push({ label: 'Square footage', effect: 'included', done: true });
      }
    } else {
      factors.push({ label: 'Square footage', effect: 'pending', done: false });
    }
  }

  // ── Regional factor ───────────────────────────────────────
  if (state) {
    if (HIGH_RISK_STATES.has(state)) {
      adjustment += 12;
      factors.push({ label: `${state} (high-risk)`, effect: '+$12', done: true });
    } else if (LOW_RISK_STATES.has(state)) {
      adjustment -= 8;
      factors.push({ label: `${state} (low-risk)`, effect: '-$8', done: true });
    } else {
      factors.push({ label: 'Location', effect: 'included', done: true });
    }
  } else {
    factors.push({ label: 'Location', effect: 'pending', done: false });
  }

  const mid = base + adjustment;
  const spread = Math.max(8, Math.round(mid * 0.15));

  const doneCount = factors.filter((f) => f.done).length;
  const totalCount = factors.length;
  const pct = totalCount > 0 ? doneCount / totalCount : 0;

  let confidence;
  if (pct < 0.35) confidence = 'rough';
  else if (pct < 0.75) confidence = 'good';
  else confidence = 'personalized';

  return {
    low: Math.max(1, mid - Math.round(spread / 2)),
    high: mid + Math.round(spread / 2),
    confidence,
    factors,
    isBundle: insuranceType === 'both',
  };
}

const CONFIDENCE_LABELS = {
  rough: 'Rough Estimate',
  good: 'Good Estimate',
  personalized: 'Personalized Quote',
};

const CONFIDENCE_STEPS = { rough: 1, good: 2, personalized: 3 };

/** Animated number that smoothly transitions when value changes */
function AnimatedNumber({ value }) {
  const [displayed, setDisplayed] = useState(value);
  const rafRef = useRef(null);
  const startRef = useRef(null);
  const fromRef = useRef(value);

  useEffect(() => {
    const from = fromRef.current;
    const to = value;
    if (from === to) return;

    const duration = 400;
    const start = performance.now();
    startRef.current = start;

    const animate = (now) => {
      const elapsed = now - start;
      const progress = Math.min(elapsed / duration, 1);
      // Ease-out cubic
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = Math.round(from + (to - from) * eased);
      setDisplayed(current);
      if (progress < 1) {
        rafRef.current = requestAnimationFrame(animate);
      } else {
        fromRef.current = to;
      }
    };

    if (rafRef.current) cancelAnimationFrame(rafRef.current);
    rafRef.current = requestAnimationFrame(animate);

    return () => {
      if (rafRef.current) cancelAnimationFrame(rafRef.current);
    };
  }, [value]);

  return <>{displayed}</>;
}

export default function QuotePreview({
  insuranceType,
  carYear,
  carMilesPerYear,
  homeValue,
  homeSquareFeet,
  state,
  // mobile expand state
  mobileExpanded,
  onMobileToggle,
}) {
  const estimate = calculateEstimate({
    insuranceType,
    carYear,
    carMilesPerYear,
    homeValue,
    homeSquareFeet,
    state,
  });

  if (!estimate) return null;

  const { low, high, confidence, factors, isBundle } = estimate;
  const confidenceStep = CONFIDENCE_STEPS[confidence];

  const coverageIcon = insuranceType === 'car'
    ? <Car size={16} />
    : insuranceType === 'home'
      ? <Home size={16} />
      : <><Car size={16} /><Home size={16} /></>;

  const coverageLabel = insuranceType === 'car'
    ? 'Car Insurance'
    : insuranceType === 'home'
      ? 'Home Insurance'
      : 'Home & Car Bundle';

  return (
    <div className="quote-preview">
      {/* Mobile toggle bar */}
      <button
        className="quote-preview__mobile-toggle"
        onClick={onMobileToggle}
        type="button"
        aria-expanded={mobileExpanded}
      >
        <span className="quote-preview__mobile-summary">
          <span className="quote-preview__mobile-label">Est. Monthly Premium</span>
          <span className="quote-preview__mobile-range">
            ${low} – ${high}<span className="quote-preview__mobile-period">/mo</span>
          </span>
        </span>
        <span className="quote-preview__mobile-chevron" aria-hidden="true">
          {mobileExpanded ? '▲' : '▼'}
        </span>
      </button>

      {/* Card body – always visible on desktop, toggleable on mobile */}
      <div className={`quote-preview__body ${mobileExpanded ? 'quote-preview__body--open' : ''}`}>

        {/* Header */}
        <div className="quote-preview__header">
          <div className="quote-preview__coverage-badge">
            <span className="quote-preview__coverage-icons">{coverageIcon}</span>
            <span className="quote-preview__coverage-label">{coverageLabel}</span>
          </div>
          {isBundle && (
            <div className="quote-preview__bundle-badge">
              Save up to 12% with bundle
            </div>
          )}
        </div>

        {/* Price display */}
        <div className="quote-preview__price-section">
          <div className="quote-preview__price-label">Estimated Monthly Premium</div>
          <div className="quote-preview__price-range">
            <span className="quote-preview__price-dollar">$</span>
            <span className="quote-preview__price-low">
              <AnimatedNumber value={low} />
            </span>
            <span className="quote-preview__price-separator"> – $</span>
            <span className="quote-preview__price-high">
              <AnimatedNumber value={high} />
            </span>
            <span className="quote-preview__price-period">/mo</span>
          </div>
        </div>

        {/* Confidence indicator */}
        <div className="quote-preview__confidence">
          <div className="quote-preview__confidence-track">
            {[1, 2, 3].map((step) => (
              <div
                key={step}
                className={`quote-preview__confidence-pip ${step <= confidenceStep ? 'quote-preview__confidence-pip--active' : ''}`}
              />
            ))}
          </div>
          <span className="quote-preview__confidence-label">
            {CONFIDENCE_LABELS[confidence]}
          </span>
        </div>

        {/* Pricing factors */}
        <div className="quote-preview__factors">
          <div className="quote-preview__factors-title">Pricing Factors</div>
          <ul className="quote-preview__factors-list">
            {factors.map((factor, idx) => (
              <li key={idx} className={`quote-preview__factor ${factor.done ? 'quote-preview__factor--done' : 'quote-preview__factor--pending'}`}>
                <span className="quote-preview__factor-icon">
                  {factor.done
                    ? <CheckmarkFilled size={14} />
                    : <CircleDash size={14} />}
                </span>
                <span className="quote-preview__factor-name">{factor.label}</span>
                <span className="quote-preview__factor-effect">{factor.effect}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="quote-preview__disclaimer">
          This is an estimate based on the information provided. Final pricing is subject to underwriting review.
        </p>
      </div>
    </div>
  );
}
