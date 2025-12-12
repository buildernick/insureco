import React from 'react';
import './CompactStepIndicator.scss';

/**
 * CompactStepIndicator - Ultra-compact mobile-first step indicator
 * 
 * A lightweight progress indicator using dots to show steps with a dynamic label
 * and counter. Perfect for mobile and compact layouts.
 * 
 * @param {Object} props
 * @param {Array} props.steps - Array of step objects: [{ label, key }]
 * @param {number} props.currentIndex - Index of current step (0-based)
 * @param {Function} props.onStepChange - Callback when step is clicked: (index) => void
 * @param {boolean} props.displayCurrentLabel - Show the current step label (default: true)
 * @param {boolean} props.displayCounter - Show step counter text (default: true)
 */
export default function CompactStepIndicator({
  steps = [],
  currentIndex = 0,
  onStepChange = () => {},
  displayCurrentLabel = true,
  displayCounter = true,
}) {
  return (
    <div className="compact-step-indicator">
      <div className="compact-step-indicator__dots">
        {steps.map((step, idx) => (
          <button
            key={step.key || idx}
            className={`compact-step-indicator__dot ${
              idx < currentIndex ? 'compact-step-indicator__dot--complete' : ''
            } ${idx === currentIndex ? 'compact-step-indicator__dot--current' : ''} ${
              idx > currentIndex ? 'compact-step-indicator__dot--incomplete' : ''
            }`}
            onClick={() => onStepChange(idx)}
            aria-label={`Step ${idx + 1}: ${step.label}`}
            type="button"
          />
        ))}
      </div>

      {displayCurrentLabel && (
        <div className="compact-step-indicator__label">
          {steps[currentIndex]?.label}
        </div>
      )}

      {displayCounter && (
        <div className="compact-step-indicator__counter">
          Step {currentIndex + 1} of {steps.length}
        </div>
      )}
    </div>
  );
}
