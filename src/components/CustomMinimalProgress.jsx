import React from 'react';
import './CustomMinimalProgress.scss';

/**
 * CustomMinimalProgress - Lightweight custom progress indicator
 * 
 * Solution 3: No Carbon components, minimal design optimized for mobile
 * Super compact and clean
 */
export default function CustomMinimalProgress({ steps, currentIndex = 0 }) {
  return (
    <div className="custom-minimal-progress">
      {steps.map((step, index) => {
        const isComplete = index < currentIndex;
        const isCurrent = index === currentIndex;
        const isIncomplete = index > currentIndex;
        
        return (
          <div
            key={step.key || index}
            className={`
              custom-minimal-progress__step
              ${isComplete ? 'custom-minimal-progress__step--complete' : ''}
              ${isCurrent ? 'custom-minimal-progress__step--current' : ''}
              ${isIncomplete ? 'custom-minimal-progress__step--incomplete' : ''}
            `}
          >
            <div className="custom-minimal-progress__indicator">
              <div className="custom-minimal-progress__dot" />
              {index < steps.length - 1 && (
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
    </div>
  );
}
