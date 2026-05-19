import React from 'react';
import { Checkmark } from '@carbon/icons-react';
import './CircularMiniStepper.scss';

export default function CircularMiniStepper({ steps, currentIndex, className = '' }) {
  const visibleSteps = [];

  if (currentIndex > 0) {
    visibleSteps.push({ ...steps[currentIndex - 1], index: currentIndex - 1, status: 'previous' });
  }
  visibleSteps.push({ ...steps[currentIndex], index: currentIndex, status: 'current' });
  if (currentIndex < steps.length - 1) {
    visibleSteps.push({ ...steps[currentIndex + 1], index: currentIndex + 1, status: 'next' });
  }

  return (
    <div className={`circular-mini-stepper ${className}`} role="navigation" aria-label="Form progress">
      <div className="circular-mini-stepper__progress-text" aria-live="polite">
        Step {currentIndex + 1} of {steps.length}
      </div>
      <div className="circular-mini-stepper__circles">
        {visibleSteps.map((step, idx) => (
          <React.Fragment key={step.index}>
            <div
              className={`circular-mini-stepper__circle circular-mini-stepper__circle--${step.status}`}
              aria-current={step.status === 'current' ? 'step' : undefined}
            >
              {step.status === 'previous' ? (
                <Checkmark size={20} />
              ) : (
                <span className="circular-mini-stepper__number">{step.index + 1}</span>
              )}
            </div>
            {idx < visibleSteps.length - 1 && (
              <div className="circular-mini-stepper__connector" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="circular-mini-stepper__label">
        {steps[currentIndex].label}
      </div>
    </div>
  );
}
