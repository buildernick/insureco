import React from 'react';
import { ProgressIndicator, ProgressStep } from '@carbon/react';
import './HorizontalProgressBar.scss';

/**
 * HorizontalProgressBar - Horizontal compact version showing prev/current/next
 * 
 * Solution 1 Horizontal: Carbon ProgressIndicator in horizontal layout
 * Shows only 3 steps with ellipsis indicators for hidden steps
 */
export default function HorizontalProgressBar({ steps, currentIndex = 0 }) {
  // Filter to show only prev, current, next steps
  const visibleSteps = steps.filter((step, index) => {
    return index >= currentIndex - 1 && index <= currentIndex + 1;
  });
  
  // Calculate the current index within the visible steps
  const visibleCurrentIndex = Math.min(currentIndex, 1);
  
  // Check if there are hidden steps
  const hasStepsBefore = currentIndex > 1;
  const hasStepsAfter = currentIndex < steps.length - 2;
  
  return (
    <div className="horizontal-progress-bar">
      <div className="horizontal-progress-bar__container">
        {hasStepsBefore && (
          <div className="horizontal-progress-bar__ellipsis">
            ⋯
          </div>
        )}
        
        <div className="horizontal-progress-bar__steps">
          <ProgressIndicator currentIndex={visibleCurrentIndex} spaceEqually>
            {visibleSteps.map((step, index) => {
              const actualIndex = currentIndex - 1 + index;
              return (
                <ProgressStep
                  key={step.key || actualIndex}
                  label={step.label}
                  description={
                    actualIndex < currentIndex
                      ? 'Complete'
                      : actualIndex === currentIndex
                      ? 'Current'
                      : ''
                  }
                  complete={actualIndex < currentIndex}
                  current={actualIndex === currentIndex}
                />
              );
            })}
          </ProgressIndicator>
        </div>
        
        {hasStepsAfter && (
          <div className="horizontal-progress-bar__ellipsis">
            ⋯
          </div>
        )}
      </div>
    </div>
  );
}
