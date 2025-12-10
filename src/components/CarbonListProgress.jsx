import React from 'react';
import { OrderedList, ListItem } from '@carbon/react';
import { Checkmark } from '@carbon/icons-react';
import './CarbonListProgress.scss';

/**
 * CarbonListProgress - Progress indicator built with Carbon components only
 *
 * Solution 2: Uses OrderedList + ListItem from Carbon to create a
 * mobile-friendly progress indicator without custom code
 *
 * Shows only: previous step, current step, and next step
 */
export default function CarbonListProgress({ steps, currentIndex = 0 }) {
  // Filter to show only prev, current, next steps
  const visibleSteps = steps.filter((step, index) => {
    return index >= currentIndex - 1 && index <= currentIndex + 1;
  });

  return (
    <OrderedList className="carbon-list-progress" nested={false}>
      {visibleSteps.map((step, index) => {
        const actualIndex = currentIndex - 1 + index;
        const isComplete = actualIndex < currentIndex;
        const isCurrent = actualIndex === currentIndex;
        const isIncomplete = actualIndex > currentIndex;

        return (
          <ListItem
            key={step.key || actualIndex}
            className={`
              carbon-list-progress__item
              ${isComplete ? 'carbon-list-progress__item--complete' : ''}
              ${isCurrent ? 'carbon-list-progress__item--current' : ''}
              ${isIncomplete ? 'carbon-list-progress__item--incomplete' : ''}
            `}
          >
            <div className="carbon-list-progress__content">
              <div className="carbon-list-progress__marker">
                {isComplete ? (
                  <Checkmark size={16} className="carbon-list-progress__check" />
                ) : (
                  <span className="carbon-list-progress__number">{actualIndex + 1}</span>
                )}
              </div>
              <div className="carbon-list-progress__text">
                <span className="carbon-list-progress__label">{step.label}</span>
                {step.description && isCurrent && (
                  <span className="carbon-list-progress__description">
                    {step.description}
                  </span>
                )}
              </div>
            </div>
          </ListItem>
        );
      })}
    </OrderedList>
  );
}
