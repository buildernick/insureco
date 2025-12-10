import React from 'react';
import { ProgressIndicator, ProgressStep } from '@carbon/react';
import './VerticalProgressBar.scss';

/**
 * VerticalProgressBar - Vertical orientation of Carbon's ProgressIndicator
 * 
 * Solution 1: Takes the current ProgressIndicator and makes it vertical
 * for better mobile/tablet experience without horizontal scrolling
 */
export default function VerticalProgressBar({ steps, currentIndex = 0 }) {
  return (
    <div className="vertical-progress-bar">
      <ProgressIndicator vertical currentIndex={currentIndex}>
        {steps.map((step, index) => (
          <ProgressStep
            key={step.key || index}
            label={step.label}
            description={
              index < currentIndex
                ? 'Complete'
                : index === currentIndex
                ? 'Current'
                : ''
            }
            complete={index < currentIndex}
            current={index === currentIndex}
          />
        ))}
      </ProgressIndicator>
    </div>
  );
}
