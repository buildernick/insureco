import React, { useState } from 'react';
import { ProgressBar, Tag, Breadcrumb, BreadcrumbItem, Button } from '@carbon/react';
import { Checkmark, ArrowRight, ArrowLeft } from '@carbon/icons-react';
import './ProgressMockupsPage.scss';

const DEMO_STEPS = [
  { label: 'Personal Info', key: 'personal' },
  { label: 'Address', key: 'address' },
  { label: 'Insurance Type', key: 'type' },
  { label: 'Car Details', key: 'car' },
  { label: 'Coverage', key: 'coverage' },
  { label: 'Review', key: 'review' },
];

function DemoControls({ step, total, onNext, onBack }) {
  return (
    <div className="demo-controls">
      <Button
        kind="ghost"
        size="sm"
        onClick={onBack}
        disabled={step === 0}
        renderIcon={ArrowLeft}
        iconDescription="Previous step"
      >
        Prev
      </Button>
      <span className="demo-controls__hint">click to preview</span>
      <Button
        kind="ghost"
        size="sm"
        onClick={onNext}
        disabled={step === total - 1}
        renderIcon={ArrowRight}
        iconDescription="Next step"
      >
        Next
      </Button>
    </div>
  );
}

// ─── Option 1: Carbon ProgressBar ────────────────────────────────────────────
function ProgressBarOption() {
  const [step, setStep] = useState(1);
  const progress = Math.round((step / (DEMO_STEPS.length - 1)) * 100);

  return (
    <div className="option-demo">
      <div className="option-preview-area">
        <ProgressBar
          label={DEMO_STEPS[step].label}
          helperText={`Step ${step + 1} of ${DEMO_STEPS.length}`}
          value={progress}
          max={100}
        />
      </div>
      <DemoControls
        step={step}
        total={DEMO_STEPS.length}
        onNext={() => setStep(s => Math.min(s + 1, DEMO_STEPS.length - 1))}
        onBack={() => setStep(s => Math.max(s - 1, 0))}
      />
    </div>
  );
}

// ─── Option 2: Carbon Tag Numbered Row ───────────────────────────────────────
function TagStepperOption() {
  const [step, setStep] = useState(1);

  return (
    <div className="option-demo">
      <div className="option-preview-area">
        <div className="tag-stepper">
          <div className="tag-stepper__row">
            {DEMO_STEPS.map((s, i) => (
              <React.Fragment key={s.key}>
                <Tag
                  type={i < step ? 'high-contrast' : i === step ? 'red' : 'cool-gray'}
                  size="sm"
                  className={`tag-stepper__tag ${i === step ? 'tag-stepper__tag--current' : ''}`}
                >
                  {i < step ? <Checkmark size={10} /> : `${i + 1}`}
                </Tag>
                {i < DEMO_STEPS.length - 1 && (
                  <div className={`tag-stepper__connector ${i < step ? 'tag-stepper__connector--done' : ''}`} />
                )}
              </React.Fragment>
            ))}
          </div>
          <div className="tag-stepper__footer">
            <span className="tag-stepper__step-name">{DEMO_STEPS[step].label}</span>
            <span className="tag-stepper__step-count">{step + 1} of {DEMO_STEPS.length}</span>
          </div>
        </div>
      </div>
      <DemoControls
        step={step}
        total={DEMO_STEPS.length}
        onNext={() => setStep(s => Math.min(s + 1, DEMO_STEPS.length - 1))}
        onBack={() => setStep(s => Math.max(s - 1, 0))}
      />
    </div>
  );
}

// ─── Option 3: Breadcrumb trail + slim ProgressBar ───────────────────────────
function BreadcrumbProgressOption() {
  const [step, setStep] = useState(1);
  const progress = Math.round((step / (DEMO_STEPS.length - 1)) * 100);

  const prevStep = step > 0 ? DEMO_STEPS[step - 1] : null;
  const hasFarHistory = step > 1;

  return (
    <div className="option-demo">
      <div className="option-preview-area">
        <div className="breadcrumb-progress">
          <Breadcrumb noTrailingSlash className="breadcrumb-progress__trail">
            {hasFarHistory && <BreadcrumbItem>···</BreadcrumbItem>}
            {prevStep && <BreadcrumbItem>{prevStep.label}</BreadcrumbItem>}
            <BreadcrumbItem isCurrentPage>{DEMO_STEPS[step].label}</BreadcrumbItem>
          </Breadcrumb>
          <ProgressBar
            label=""
            hideLabel
            helperText={`${step + 1} of ${DEMO_STEPS.length} steps complete`}
            value={progress}
            size="sm"
          />
        </div>
      </div>
      <DemoControls
        step={step}
        total={DEMO_STEPS.length}
        onNext={() => setStep(s => Math.min(s + 1, DEMO_STEPS.length - 1))}
        onBack={() => setStep(s => Math.max(s - 1, 0))}
      />
    </div>
  );
}

// ─── Option 4: Custom Glowing LED Segments ───────────────────────────────────
function GlowingSegmentsOption() {
  const [step, setStep] = useState(1);

  return (
    <div className="option-demo">
      <div className="option-preview-area">
        <div className="glow-stepper">
          <div className="glow-stepper__header">
            <span className="glow-stepper__step-name">{DEMO_STEPS[step].label}</span>
            <span className="glow-stepper__badge">{step + 1} / {DEMO_STEPS.length}</span>
          </div>
          <div className="glow-stepper__track">
            {DEMO_STEPS.map((s, i) => (
              <div
                key={s.key}
                className={`glow-stepper__segment ${
                  i < step ? 'glow-stepper__segment--complete' :
                  i === step ? 'glow-stepper__segment--current' :
                  'glow-stepper__segment--upcoming'
                }`}
              />
            ))}
          </div>
        </div>
      </div>
      <DemoControls
        step={step}
        total={DEMO_STEPS.length}
        onNext={() => setStep(s => Math.min(s + 1, DEMO_STEPS.length - 1))}
        onBack={() => setStep(s => Math.max(s - 1, 0))}
      />
    </div>
  );
}

// ─── Page ─────────────────────────────────────────────────────────────────────
export default function ProgressMockupsPage() {
  return (
    <div className="progress-mockups-page">
      <div className="mockups-page-header">
        <h1 className="mockups-page-title">Progress Indicator Mockups</h1>
        <p className="mockups-page-subtitle">
          Four mobile-optimized alternatives to the current horizontal step list.
          Use <strong>Prev / Next</strong> in each option to preview the interaction.
        </p>
      </div>

      {/* Option 1 */}
      <div className="option-card">
        <div className="option-card__header">
          <span className="option-badge option-badge--design-system">Design System</span>
          <h2 className="option-card__title">Option 1 — Progress Bar</h2>
          <p className="option-card__description">
            The simplest approach. A single horizontal bar fills as the user advances.
            The current step name acts as the label, with a "Step X of Y" counter below.
            Takes the least vertical space of all options.
          </p>
          <p className="option-card__components">Carbon: &lt;ProgressBar&gt;</p>
        </div>
        <hr className="option-card__divider" />
        <ProgressBarOption />
      </div>

      {/* Option 2 */}
      <div className="option-card">
        <div className="option-card__header">
          <span className="option-badge option-badge--design-system">Design System</span>
          <h2 className="option-card__title">Option 2 — Numbered Tag Row</h2>
          <p className="option-card__description">
            A compact row of numbered step tags connected by lines. Completed steps
            show a checkmark, the active step is highlighted in brand red, and upcoming
            steps are muted gray. Current step name appears below.
          </p>
          <p className="option-card__components">Carbon: &lt;Tag&gt;</p>
        </div>
        <hr className="option-card__divider" />
        <TagStepperOption />
      </div>

      {/* Option 3 */}
      <div className="option-card">
        <div className="option-card__header">
          <span className="option-badge option-badge--design-system">Design System</span>
          <h2 className="option-card__title">Option 3 — Breadcrumb Trail + Bar</h2>
          <p className="option-card__description">
            A breadcrumb showing where you've been (truncated for mobile) paired with
            a slim progress bar below. Great for users who want to see their journey
            context at a glance.
          </p>
          <p className="option-card__components">Carbon: &lt;Breadcrumb&gt; + &lt;ProgressBar&gt;</p>
        </div>
        <hr className="option-card__divider" />
        <BreadcrumbProgressOption />
      </div>

      {/* Option 4 */}
      <div className="option-card">
        <div className="option-card__header">
          <span className="option-badge option-badge--custom">Custom Design</span>
          <h2 className="option-card__title">Option 4 — Glowing LED Segments</h2>
          <p className="option-card__description">
            A fresh take inspired by LED progress meters. Completed segments glow red,
            the active segment pulses with a soft halo, and upcoming segments are dim.
            Feels modern, premium, and instantly readable on any screen size.
          </p>
          <p className="option-card__components">Custom CSS + design tokens only</p>
        </div>
        <hr className="option-card__divider" />
        <GlowingSegmentsOption />
      </div>
    </div>
  );
}
