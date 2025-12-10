import React from 'react';
import { ProgressIndicator, ProgressStep } from '@carbon/react';
import './VerticalProgressBar.scss';

/**
 * VerticalProgressBar - Vertical orientation of Carbon's ProgressIndicator
 *
 * Solution 1: Takes the current ProgressIndicator and makes it vertical
 * for better mobile/tablet experience without horizontal scrolling
 *
 * Shows only: previous step, current step, and next step
 */
export default function VerticalProgressBar({ steps, currentIndex = 0 }) {
  // Filter to show only prev, current, next steps
  const visibleSteps = steps.filter((step, index) => {
    return index >= currentIndex - 1 && index <= currentIndex + 1;
  });

  // Calculate the current index within the visible steps
  const visibleCurrentIndex = Math.min(currentIndex, 1);

  return (
    <div className="vertical-progress-bar">
      <ProgressIndicator vertical currentIndex={visibleCurrentIndex}>
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
  );
}
