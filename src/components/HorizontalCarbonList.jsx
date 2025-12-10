import React from 'react';
import { Checkmark } from '@carbon/icons-react';
import './HorizontalCarbonList.scss';

/**
 * HorizontalCarbonList - Horizontal compact progress using custom list
 * 
 * Solution 2 Horizontal: Carbon-inspired horizontal layout
 * Shows only 3 steps with ellipsis indicators for hidden steps
 */
export default function HorizontalCarbonList({ steps, currentIndex = 0 }) {
  // Filter to show only prev, current, next steps
  const visibleSteps = steps.filter((step, index) => {
    return index >= currentIndex - 1 && index <= currentIndex + 1;
  });
  
  // Check if there are hidden steps
  const hasStepsBefore = currentIndex > 1;
  const hasStepsAfter = currentIndex < steps.length - 2;
  
  return (
    <div className="horizontal-carbon-list">
      {hasStepsBefore && (
        <div className="horizontal-carbon-list__ellipsis">
          ⋯
        </div>
      )}
      
      <div className="horizontal-carbon-list__steps">
        {visibleSteps.map((step, index) => {
          const actualIndex = currentIndex - 1 + index;
          const isComplete = actualIndex < currentIndex;
          const isCurrent = actualIndex === currentIndex;
          const isIncomplete = actualIndex > currentIndex;
          
          return (
            <React.Fragment key={step.key || actualIndex}>
              <div
                className={`
                  horizontal-carbon-list__item
                  ${isComplete ? 'horizontal-carbon-list__item--complete' : ''}
                  ${isCurrent ? 'horizontal-carbon-list__item--current' : ''}
                  ${isIncomplete ? 'horizontal-carbon-list__item--incomplete' : ''}
                `}
              >
                <div className="horizontal-carbon-list__marker">
                  {isComplete ? (
                    <Checkmark size={16} className="horizontal-carbon-list__check" />
                  ) : (
                    <span className="horizontal-carbon-list__number">{actualIndex + 1}</span>
                  )}
                </div>
                <span className="horizontal-carbon-list__label">{step.label}</span>
              </div>
              
              {index < visibleSteps.length - 1 && (
                <div className="horizontal-carbon-list__connector" />
              )}
            </React.Fragment>
          );
        })}
      </div>
      
      {hasStepsAfter && (
        <div className="horizontal-carbon-list__ellipsis">
          ⋯
        </div>
      )}
    </div>
  );
}
