import React from 'react';
import { Checkmark } from '@carbon/icons-react';
import './StepBreadcrumb.scss';

/**
 * StepBreadcrumb - Custom breadcrumb/stepper component
 *
 * Responsive behaviour:
 *  < 480px  — circles + connector lines only; current step name shown below
 *  480–671px — circles + connector lines; labels shown only for current step
 *  ≥ 672px  — full layout: circles + labels for every step
 *
 * @param {Array}  props.steps        - [{ label, description?, key }]
 * @param {number} props.currentIndex - 0-based index of the active step
 * @param {boolean} props.spaceEqually
 */
export default function StepBreadcrumb({ steps, currentIndex = 0, spaceEqually = true }) {
  const currentStep = steps[currentIndex];

  return (
    <div className="step-breadcrumb-wrapper">
      {/* Dot + line row — visible on all sizes */}
      <div className={`step-breadcrumb ${spaceEqually ? 'step-breadcrumb--equal' : ''}`}>
        {steps.map((step, index) => {
          const isComplete = index < currentIndex;
          const isCurrent = index === currentIndex;
          const isIncomplete = index > currentIndex;

          return (
            <React.Fragment key={step.key || index}>
              <div
                className={[
                  'step-breadcrumb__item',
                  isComplete ? 'step-breadcrumb__item--complete' : '',
                  isCurrent ? 'step-breadcrumb__item--current' : '',
                  isIncomplete ? 'step-breadcrumb__item--incomplete' : '',
                ].join(' ')}
              >
                {/* Circle marker */}
                <div className="step-breadcrumb__marker" aria-hidden="true">
                  {isComplete ? (
                    <Checkmark size={14} className="step-breadcrumb__check" />
                  ) : (
                    <span className="step-breadcrumb__number">{index + 1}</span>
                  )}
                </div>

                {/* Label — hidden on xs, only current on sm, all on md+ */}
                <div className="step-breadcrumb__content">
                  <span className="step-breadcrumb__label">{step.label}</span>
                  {step.description && (
                    <span className="step-breadcrumb__description">{step.description}</span>
                  )}
                </div>
              </div>

              {/* Connector line */}
              {index < steps.length - 1 && (
                <div
                  className={`step-breadcrumb__line ${isComplete ? 'step-breadcrumb__line--complete' : ''}`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>

      {/* Mobile summary — shown only on xs screens below the dot row */}
      {currentStep && (
        <div className="step-breadcrumb__mobile-summary" aria-live="polite">
          <span className="step-breadcrumb__mobile-count">
            Step {currentIndex + 1} of {steps.length}
          </span>
          <span className="step-breadcrumb__mobile-label">{currentStep.label}</span>
        </div>
      )}
    </div>
  );
}
