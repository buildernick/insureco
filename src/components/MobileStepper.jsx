import React from 'react';
import { Checkmark } from '@carbon/icons-react';
import './MobileStepper.scss';

/**
 * MobileStepper - Custom mobile-first step indicator
 * 
 * Displays only the previous, current, and next steps to avoid
 * horizontal scrolling on mobile devices. Shows overall progress
 * with a progress bar.
 * 
 * @param {Object} props
 * @param {Array} props.steps - Array of step objects: [{ label, key }]
 * @param {number} props.currentIndex - Index of current step (0-based)
 */
export default function MobileStepper({ steps, currentIndex = 0 }) {
  const totalSteps = steps.length;
  const progressPercentage = ((currentIndex + 1) / totalSteps) * 100;

  const previousStep = currentIndex > 0 ? steps[currentIndex - 1] : null;
  const currentStep = steps[currentIndex];
  const nextStep = currentIndex < totalSteps - 1 ? steps[currentIndex + 1] : null;

  return (
    <div className="mobile-stepper">
      <div className="mobile-stepper__dots">
        {/* Previous step (if exists) */}
        {previousStep && (
          <div className="mobile-stepper__step mobile-stepper__step--previous">
            <div className="mobile-stepper__circle mobile-stepper__circle--complete">
              <Checkmark size={12} />
            </div>
            <span className="mobile-stepper__label">{previousStep.label}</span>
          </div>
        )}

        {/* Current step */}
        <div className="mobile-stepper__step mobile-stepper__step--current">
          <div className="mobile-stepper__circle mobile-stepper__circle--current">
            <span className="mobile-stepper__number">{currentIndex + 1}</span>
          </div>
          <span className="mobile-stepper__label mobile-stepper__label--current">
            {currentStep.label}
          </span>
        </div>

        {/* Next step (if exists) */}
        {nextStep && (
          <div className="mobile-stepper__step mobile-stepper__step--next">
            <div className="mobile-stepper__circle mobile-stepper__circle--incomplete">
              <span className="mobile-stepper__number">{currentIndex + 2}</span>
            </div>
            <span className="mobile-stepper__label">{nextStep.label}</span>
          </div>
        )}
      </div>

      <div className="mobile-stepper__progress-bar">
        <div 
          className="mobile-stepper__progress-fill"
          style={{ width: `${progressPercentage}%` }}
        />
      </div>

      <div className="mobile-stepper__counter">
        Step {currentIndex + 1} of {totalSteps}
      </div>
    </div>
  );
}
