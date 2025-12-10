import React from 'react';
import './CustomMinimalProgress.scss';

/**
 * CustomMinimalProgress - Lightweight custom progress indicator
 *
 * Solution 3: No Carbon components, minimal design optimized for mobile
 * Super compact and clean
 *
 * Shows only: previous step, current step, and next step
 */
export default function CustomMinimalProgress({ steps, currentIndex = 0 }) {
  // Filter to show only prev, current, next steps
  const visibleSteps = steps.filter((step, index) => {
    return index >= currentIndex - 1 && index <= currentIndex + 1;
  });

  // Check if there are hidden steps
  const hasStepsBefore = currentIndex > 1;
  const hasStepsAfter = currentIndex < steps.length - 2;

  return (
    <div className="custom-minimal-progress">
      {hasStepsBefore && (
        <div className="custom-minimal-progress__ellipsis">
          ⋯ {currentIndex - 1} previous
        </div>
      )}

      {visibleSteps.map((step, index) => {
        const actualIndex = currentIndex - 1 + index;
        const isComplete = actualIndex < currentIndex;
        const isCurrent = actualIndex === currentIndex;
        const isIncomplete = actualIndex > currentIndex;

        return (
          <div
            key={step.key || actualIndex}
            className={`
              custom-minimal-progress__step
              ${isComplete ? 'custom-minimal-progress__step--complete' : ''}
              ${isCurrent ? 'custom-minimal-progress__step--current' : ''}
              ${isIncomplete ? 'custom-minimal-progress__step--incomplete' : ''}
            `}
          >
            <div className="custom-minimal-progress__indicator">
              <div className="custom-minimal-progress__dot" />
              {index < visibleSteps.length - 1 && (
                <div className="custom-minimal-progress__line" />
              )}
            </div>
            <div className="custom-minimal-progress__info">
              <span className="custom-minimal-progress__label">{step.label}</span>
              {isCurrent && (
                <span className="custom-minimal-progress__status">In Progress</span>
              )}
            </div>
          </div>
        );
      })}

      {hasStepsAfter && (
        <div className="custom-minimal-progress__ellipsis">
          ⋯ {steps.length - currentIndex - 2} more
        </div>
      )}
    </div>
  );
}
