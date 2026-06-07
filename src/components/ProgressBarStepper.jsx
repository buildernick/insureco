import React from 'react';
import { ProgressBar } from '@carbon/react';
import { Checkmark } from '@carbon/icons-react';
import './ProgressBarStepper.scss';

/**
 * ProgressBarStepper - Progress Bar with Step Counter (Option 2)
 * 
 * Combines Carbon's ProgressBar component at the top with a vertical list
 * of all steps below. The bar shows percentage completion while the list
 * shows detailed step status with checkmarks for completed steps and
 * highlighting for the current step.
 * 
 * @param {Object} props
 * @param {Array} props.steps - Array of step objects: [{ label, key }]
 * @param {number} props.currentIndex - Index of current step (0-based)
 * @param {string} props.label - Label for the progress bar (default: "Progress")
 * @param {string} props.className - Optional additional CSS classes
 */
export default function ProgressBarStepper({ 
  steps, 
  currentIndex = 0, 
  label = "Progress",
  className = '' 
}) {
  const progressPercentage = ((currentIndex + 1) / steps.length) * 100;
  const currentStep = steps[currentIndex];

  return (
    <div className={`progress-bar-stepper ${className}`}>
      {/* Progress Bar showing overall completion */}
      <ProgressBar
        label={label}
        helperText={`Step ${currentIndex + 1} of ${steps.length}: ${currentStep.label}`}
        value={progressPercentage}
        max={100}
        status={currentIndex === steps.length - 1 ? 'finished' : 'active'}
      />
      
      {/* Vertical list of all steps with status indicators */}
      <div className="progress-bar-stepper__steps">
        {steps.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          
          return (
            <div
              key={step.key || index}
              className={`progress-bar-stepper__step ${
                isComplete ? 'progress-bar-stepper__step--complete' : ''
              } ${isCurrent ? 'progress-bar-stepper__step--current' : ''}`}
            >
              <div className="progress-bar-stepper__step-marker">
                {isComplete ? <Checkmark size={12} /> : index + 1}
              </div>
              <span className="progress-bar-stepper__step-label">{step.label}</span>
            </div>
          );
        })}
      </div>
    </div>
  );
}
