import React from 'react';
import { Checkmark } from '@carbon/icons-react';
import './CircularMiniStepper.scss';

/**
 * CircularMiniStepper - Compact context-aware step progress indicator (Option 4)
 *
 * Shows the previous (completed), current, and next step as circles,
 * keeping the UI minimal and mobile-friendly without scrolling.
 *
 * @param {Object} props
 * @param {Array}  props.steps        - Array of step objects: [{ label, key }]
 * @param {number} props.currentIndex - Index of the active step (0-based)
 */
export default function CircularMiniStepper({ steps, currentIndex = 0 }) {
  // Build the 2–3 visible steps: previous → current → next
  const visibleSteps = [];

  if (currentIndex > 0) {
    visibleSteps.push({
      ...steps[currentIndex - 1],
      index: currentIndex - 1,
      status: 'previous',
    });
  }

  visibleSteps.push({
    ...steps[currentIndex],
    index: currentIndex,
    status: 'current',
  });

  if (currentIndex < steps.length - 1) {
    visibleSteps.push({
      ...steps[currentIndex + 1],
      index: currentIndex + 1,
      status: 'next',
    });
  }

  return (
    <div className="circular-stepper" aria-label={`Step ${currentIndex + 1} of ${steps.length}`}>
      <p className="circular-stepper__counter">
        Step {currentIndex + 1} of {steps.length}
      </p>

      <div className="circular-stepper__circles" role="list">
        {visibleSteps.map((step, idx) => (
          <React.Fragment key={step.key || step.index}>
            <div
              className={`circular-stepper__circle circular-stepper__circle--${step.status}`}
              role="listitem"
              aria-current={step.status === 'current' ? 'step' : undefined}
              aria-label={`${step.label}${step.status === 'previous' ? ' (complete)' : step.status === 'current' ? ' (current)' : ' (upcoming)'}`}
            >
              {step.status === 'previous' ? (
                <Checkmark size={20} className="circular-stepper__check" />
              ) : (
                <span className="circular-stepper__number">{step.index + 1}</span>
              )}
            </div>

            {idx < visibleSteps.length - 1 && (
              <div className="circular-stepper__connector" aria-hidden="true" />
            )}
          </React.Fragment>
        ))}
      </div>

      <p className="circular-stepper__label">{steps[currentIndex].label}</p>
    </div>
  );
}
