import React from 'react';
import { Checkmark } from '@carbon/icons-react';
import './StepBreadcrumb.scss';

/**
 * StepBreadcrumb - Custom breadcrumb/stepper component
 *
 * Replacement for Carbon's ProgressIndicator (which had dark-mode theming issues).
 * Fully theme-aware. Responsive:
 *   - Mobile  (<640px): compact progress bar + "Step X of Y — Label"
 *   - Desktop (≥640px): horizontal top-border step list matching Figma design
 *
 * @param {Array}  props.steps        - [{ key, label, description? }]
 * @param {number} props.currentIndex - 0-based active step index
 * @param {boolean} props.spaceEqually - space steps equally (default true)
 */
export default function StepBreadcrumb({ steps, currentIndex = 0, spaceEqually = true }) {
  const total       = steps.length;
  const currentStep = steps[currentIndex] ?? {};
  const pct         = Math.round(((currentIndex + 1) / total) * 100);

  return (
    <div className={`step-breadcrumb ${spaceEqually ? 'step-breadcrumb--equal' : ''}`}>

      {/* ── Mobile compact view ── */}
      <div className="step-breadcrumb__mobile" aria-hidden="true">
        <div className="step-breadcrumb__mobile-meta">
          <span className="step-breadcrumb__mobile-counter">
            Step {currentIndex + 1} of {total}
          </span>
          <span className="step-breadcrumb__mobile-name">{currentStep.label}</span>
        </div>
        <div className="step-breadcrumb__mobile-bar" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100}>
          <div className="step-breadcrumb__mobile-fill" style={{ width: `${pct}%` }} />
        </div>
      </div>

      {/* ── Desktop full step list ── */}
      <div className="step-breadcrumb__desktop">
        {steps.map((step, index) => {
          const isComplete  = index < currentIndex;
          const isCurrent   = index === currentIndex;
          const isIncomplete = index > currentIndex;

          return (
            <div
              key={step.key ?? index}
              className={[
                'step-breadcrumb__item',
                isComplete  ? 'step-breadcrumb__item--complete'   : '',
                isCurrent   ? 'step-breadcrumb__item--current'    : '',
                isIncomplete ? 'step-breadcrumb__item--incomplete' : '',
              ].join(' ')}
            >
              {/* Top accent border */}
              <div className="step-breadcrumb__accent" />

              <div className="step-breadcrumb__body">
                {/* Number / checkmark marker */}
                <div className="step-breadcrumb__marker">
                  {isComplete ? (
                    <Checkmark size={14} className="step-breadcrumb__check" />
                  ) : (
                    <span className="step-breadcrumb__number">{index + 1}</span>
                  )}
                </div>

                {/* Label */}
                <span className="step-breadcrumb__label">{step.label}</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
}
