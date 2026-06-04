import React, { useState } from 'react';
import {
  Grid,
  Column,
  Tile,
  Button,
  Heading,
  ProgressBar,
  Tag,
} from '@carbon/react';
import { ArrowLeft, ArrowRight, Checkmark, ChevronRight } from '@carbon/icons-react';
import './ProgressIndicatorPreview.scss';

// ─── Option 1: Slim Progress Bar (Carbon ProgressBar) ──────────────────────
function SlimProgressBar({ steps, currentIndex }) {
  const percentage = Math.round(((currentIndex + 1) / steps.length) * 100);
  return (
    <div className="slim-bar">
      <div className="slim-bar__header">
        <span className="slim-bar__step-name">{steps[currentIndex].label}</span>
        <span className="slim-bar__counter">
          {currentIndex + 1} / {steps.length}
        </span>
      </div>
      <ProgressBar
        label={steps[currentIndex].label}
        hideLabel
        value={percentage}
        max={100}
        className="slim-bar__track"
      />
    </div>
  );
}

// ─── Option 2: Numbered Chip Strip ─────────────────────────────────────────
function ChipStrip({ steps, currentIndex }) {
  return (
    <div className="chip-strip" role="list" aria-label="Progress steps">
      {steps.map((step, index) => {
        const isDone = index < currentIndex;
        const isCurrent = index === currentIndex;
        return (
          <React.Fragment key={step.key}>
            <div
              role="listitem"
              className={[
                'chip-strip__step',
                isDone && 'chip-strip__step--done',
                isCurrent && 'chip-strip__step--current',
              ]
                .filter(Boolean)
                .join(' ')}
              aria-current={isCurrent ? 'step' : undefined}
            >
              <div className="chip-strip__bubble">
                {isDone ? <Checkmark size={14} /> : <span>{index + 1}</span>}
              </div>
              {isCurrent && (
                <span className="chip-strip__label">{step.label}</span>
              )}
            </div>
            {index < steps.length - 1 && (
              <div
                className={`chip-strip__connector ${isDone ? 'chip-strip__connector--filled' : ''}`}
              />
            )}
          </React.Fragment>
        );
      })}
    </div>
  );
}

// ─── Option 3: Context Breadcrumb (prev → current → next) ──────────────────
function ContextStepper({ steps, currentIndex }) {
  const prev = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const current = steps[currentIndex];
  const next = currentIndex < steps.length - 1 ? steps[currentIndex + 1] : null;

  return (
    <div className="ctx-stepper">
      <div className="ctx-stepper__track">
        {prev && (
          <>
            <div className="ctx-stepper__node ctx-stepper__node--done">
              <div className="ctx-stepper__dot">
                <Checkmark size={12} />
              </div>
              <span className="ctx-stepper__node-label">{prev.label}</span>
            </div>
            <ChevronRight className="ctx-stepper__chevron" size={16} />
          </>
        )}

        <div className="ctx-stepper__node ctx-stepper__node--current">
          <div className="ctx-stepper__dot">
            <span>{currentIndex + 1}</span>
          </div>
          <span className="ctx-stepper__node-label">{current.label}</span>
        </div>

        {next && (
          <>
            <ChevronRight className="ctx-stepper__chevron" size={16} />
            <div className="ctx-stepper__node ctx-stepper__node--future">
              <div className="ctx-stepper__dot">
                <span>{currentIndex + 2}</span>
              </div>
              <span className="ctx-stepper__node-label">{next.label}</span>
            </div>
          </>
        )}
      </div>

      <Tag type="gray" size="sm" className="ctx-stepper__count">
        Step {currentIndex + 1} of {steps.length}
      </Tag>
    </div>
  );
}

// ─── Option 4: Circular Progress Ring (custom SVG) ─────────────────────────
function CircularRing({ steps, currentIndex }) {
  const radius = 44;
  const circumference = 2 * Math.PI * radius;
  const percentage = (currentIndex + 1) / steps.length;
  const offset = circumference * (1 - percentage);

  return (
    <div className="ring-progress">
      <div className="ring-progress__ring-wrap">
        <svg
          className="ring-progress__svg"
          viewBox="0 0 120 120"
          width="120"
          height="120"
          aria-hidden="true"
        >
          <circle
            className="ring-progress__track"
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            strokeWidth="9"
          />
          <circle
            className="ring-progress__arc"
            cx="60"
            cy="60"
            r={radius}
            fill="none"
            strokeWidth="9"
            strokeDasharray={circumference}
            strokeDashoffset={offset}
            strokeLinecap="round"
            transform="rotate(-90 60 60)"
          />
          <text
            x="60"
            y="53"
            textAnchor="middle"
            className="ring-progress__num"
            dominantBaseline="middle"
          >
            {currentIndex + 1}
          </text>
          <text
            x="60"
            y="72"
            textAnchor="middle"
            className="ring-progress__of"
            dominantBaseline="middle"
          >
            of {steps.length}
          </text>
        </svg>
      </div>

      <p className="ring-progress__step-name">{steps[currentIndex].label}</p>

      <div className="ring-progress__dots" role="list" aria-label="All steps">
        {steps.map((step, i) => (
          <div
            key={step.key}
            role="listitem"
            aria-label={step.label}
            aria-current={i === currentIndex ? 'step' : undefined}
            className={[
              'ring-progress__dot',
              i < currentIndex && 'ring-progress__dot--done',
              i === currentIndex && 'ring-progress__dot--current',
            ]
              .filter(Boolean)
              .join(' ')}
          />
        ))}
      </div>
    </div>
  );
}

// ─── Main Page ──────────────────────────────────────────────────────────────
const STEPS = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'address', label: 'Address' },
  { key: 'type', label: 'Insurance Type' },
  { key: 'car', label: 'Car Details' },
  { key: 'coverage', label: 'Coverage' },
  { key: 'review', label: 'Review' },
];

const OPTIONS = [
  {
    title: 'Option 1: Slim Progress Bar',
    badge: { label: 'Carbon ProgressBar', type: 'blue' },
    Component: SlimProgressBar,
    pros: [
      'Extremely compact — just 2 lines tall',
      'Always fits any screen with zero scrolling',
      'Familiar progress-bar metaphor',
      'Uses native Carbon ProgressBar component',
      'Step name and counter are always visible',
    ],
    cons: [
      'No indication of upcoming steps',
      'Cannot see the full step list at a glance',
      'Percentage feel can be less meaningful for short flows',
    ],
  },
  {
    title: 'Option 2: Numbered Chip Strip',
    badge: { label: 'Carbon-Styled Chips', type: 'blue' },
    Component: ChipStrip,
    pros: [
      'All steps visible in one compact row',
      'Completed steps clearly marked with checkmarks',
      'Current step expands to show label; others stay tiny',
      'No horizontal scrolling — numbers keep future steps small',
      'Very fast to scan overall progress',
    ],
    cons: [
      'Past step labels are hidden (only numbers visible)',
      'On very narrow screens (< 320px) with 7+ steps it can get tight',
    ],
  },
  {
    title: 'Option 3: Context Breadcrumb',
    badge: { label: 'Carbon Tag + Custom', type: 'blue' },
    Component: ContextStepper,
    pros: [
      'Shows exactly where you came from and where you\'re going',
      'Never scrolls — always maximum 3 nodes visible',
      'Step X of Y counter provides full context',
      'Natural left-to-right reading flow',
      'Works with any number of steps',
    ],
    cons: [
      'Cannot see the full step list at once',
      'Requires custom layout around Carbon Tag atom',
    ],
  },
  {
    title: 'Option 4: Circular Progress Ring',
    badge: { label: 'Custom SVG', type: 'red' },
    Component: CircularRing,
    pros: [
      'Visually striking and immediately understandable',
      'Ultra-compact — ring + label + dots fit in minimal height',
      'Dot track shows every step without labels cluttering the UI',
      'Animated arc gives satisfying sense of progress',
      'Scales perfectly to any number of steps',
    ],
    cons: [
      'Fully custom — no Carbon components used',
      'Less conventional; some users may need a moment to parse it',
      'Step names only shown for the current step',
    ],
  },
];

export default function ProgressIndicatorPreview() {
  const [currentStep, setCurrentStep] = useState(2);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(s => s + 1);
  };
  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(s => s - 1);
  };

  return (
    <Grid className="pp-page">
      {/* Header */}
      <Column lg={16} md={8} sm={4}>
        <header className="pp-header">
          <Heading className="pp-title">Progress Indicator Options</Heading>
          <p className="pp-subtitle">
            4 mobile-friendly alternatives to the current horizontal progress indicator — use the
            controls below to simulate stepping through the form.
          </p>
        </header>
      </Column>

      {/* Shared step controls */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="pp-controls">
          <div className="pp-controls__inner">
            <div className="pp-controls__info">
              <span className="pp-controls__eyebrow">Interactive demo</span>
              <span className="pp-controls__step-label">
                Step {currentStep + 1} of {STEPS.length}:{' '}
                <strong>{STEPS[currentStep].label}</strong>
              </span>
            </div>
            <div className="pp-controls__nav">
              <Button
                kind="ghost"
                size="sm"
                renderIcon={ArrowLeft}
                iconDescription="Previous step"
                hasIconOnly
                onClick={handleBack}
                disabled={currentStep === 0}
              />
              <div className="pp-controls__pips">
                {STEPS.map((_, i) => (
                  <button
                    key={i}
                    className={[
                      'pp-pip',
                      i < currentStep && 'pp-pip--done',
                      i === currentStep && 'pp-pip--active',
                    ]
                      .filter(Boolean)
                      .join(' ')}
                    onClick={() => setCurrentStep(i)}
                    aria-label={`Jump to step ${i + 1}: ${STEPS[i].label}`}
                  />
                ))}
              </div>
              <Button
                kind="ghost"
                size="sm"
                renderIcon={ArrowRight}
                iconDescription="Next step"
                hasIconOnly
                onClick={handleNext}
                disabled={currentStep === STEPS.length - 1}
              />
            </div>
          </div>
        </Tile>
      </Column>

      {/* Option cards */}
      {OPTIONS.map(({ title, badge, Component, pros, cons }, idx) => (
        <Column key={idx} lg={16} md={8} sm={4}>
          <Tile className="pp-card">
            <div className="pp-card__header">
              <Heading as="h3" className="pp-card__title">
                {title}
              </Heading>
              <Tag type={badge.type}>{badge.label}</Tag>
            </div>

            {/* Phone mockup */}
            <div className="pp-mockup-wrap">
              <div className="pp-mockup">
                <div className="pp-mockup__notch" />
                <div className="pp-mockup__screen">
                  <div className="pp-mockup__chrome">
                    <span className="pp-mockup__chrome-url">insureco.com/signup</span>
                  </div>
                  <div className="pp-mockup__form-header">
                    <p className="pp-mockup__form-title">Get a Quote</p>
                  </div>
                  <div className="pp-mockup__progress-area">
                    <Component steps={STEPS} currentIndex={currentStep} />
                  </div>
                  <div className="pp-mockup__form-body">
                    <div className="pp-mockup__field" />
                    <div className="pp-mockup__field pp-mockup__field--short" />
                    <div className="pp-mockup__field" />
                  </div>
                </div>
              </div>
            </div>

            {/* Pros / Cons */}
            <div className="pp-verdict">
              <div className="pp-verdict__pros">
                <h4 className="pp-verdict__heading pp-verdict__heading--pros">Pros</h4>
                <ul className="pp-verdict__list">
                  {pros.map((p, i) => (
                    <li key={i}>{p}</li>
                  ))}
                </ul>
              </div>
              <div className="pp-verdict__cons">
                <h4 className="pp-verdict__heading pp-verdict__heading--cons">Cons</h4>
                <ul className="pp-verdict__list">
                  {cons.map((c, i) => (
                    <li key={i}>{c}</li>
                  ))}
                </ul>
              </div>
            </div>
          </Tile>
        </Column>
      ))}
    </Grid>
  );
}
