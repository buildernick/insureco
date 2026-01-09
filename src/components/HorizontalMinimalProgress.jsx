import React from 'react';
import './HorizontalMinimalProgress.scss';

/**
 * HorizontalMinimalProgress - Horizontal minimal dots progress
 * 
 * Solution 3 Horizontal: Custom minimal design with dots
 * Shows only 3 steps with ellipsis indicators for hidden steps
 */
export default function HorizontalMinimalProgress({ steps, currentIndex = 0 }) {
  // Filter to show only prev, current, next steps
  const visibleSteps = steps.filter((step, index) => {
    return index >= currentIndex - 1 && index <= currentIndex + 1;
  });
  
  // Check if there are hidden steps
  const hasStepsBefore = currentIndex > 1;
  const hasStepsAfter = currentIndex < steps.length - 2;
  
  return (
    <div className="horizontal-minimal-progress">
      {hasStepsBefore && (
        <div className="horizontal-minimal-progress__ellipsis">
          ⋯
        </div>
      )}
      
      <div className="horizontal-minimal-progress__steps">
        {visibleSteps.map((step, index) => {
          const actualIndex = currentIndex - 1 + index;
          const isComplete = actualIndex < currentIndex;
          const isCurrent = actualIndex === currentIndex;
          const isIncomplete = actualIndex > currentIndex;
          
          return (
            <React.Fragment key={step.key || actualIndex}>
              <div
                className={`
                  horizontal-minimal-progress__step
                  ${isComplete ? 'horizontal-minimal-progress__step--complete' : ''}
                  ${isCurrent ? 'horizontal-minimal-progress__step--current' : ''}
                  ${isIncomplete ? 'horizontal-minimal-progress__step--incomplete' : ''}
                `}
              >
                <div className="horizontal-minimal-progress__dot" />
                <span className="horizontal-minimal-progress__label">{step.label}</span>
              </div>
              
              {index < visibleSteps.length - 1 && (
                <div className="horizontal-minimal-progress__line" />
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {hasStepsAfter && (
        <div className="horizontal-minimal-progress__ellipsis">
          ⋯
        </div>
      )}
    </div>
  );
}
