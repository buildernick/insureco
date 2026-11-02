import React, { useState } from 'react';
import {
  ContentSwitcher,
  Switch,
  ProgressIndicator,
  ProgressStep,
  ProgressBar,
  Tabs,
  TabList,
  Tab,
} from '@carbon/react';
import { Checkmark } from '@carbon/icons-react';
import '../pages/ProgressIndicatorPreview.scss';

export function CircularMiniStepper({ steps, currentIndex, className = '' }) {
  const visibleSteps = [];

  if (currentIndex > 0) {
    visibleSteps.push({ ...steps[currentIndex - 1], index: currentIndex - 1, status: 'previous' });
  }
  visibleSteps.push({ ...steps[currentIndex], index: currentIndex, status: 'current' });
  if (currentIndex < steps.length - 1) {
    visibleSteps.push({ ...steps[currentIndex + 1], index: currentIndex + 1, status: 'next' });
  }

  return (
    <div className={`circular-mini-stepper ${className}`}>
      <div className="circular-mini-stepper__progress-text">
        Step {currentIndex + 1} of {steps.length}
      </div>
      <div className="circular-mini-stepper__circles">
        {visibleSteps.map((step, idx) => (
          <React.Fragment key={step.index}>
            <div
              className={`circular-mini-stepper__circle circular-mini-stepper__circle--${step.status}`}
            >
              {step.status === 'previous' ? (
                <Checkmark size={20} />
              ) : (
                <span className="circular-mini-stepper__number">{step.index + 1}</span>
              )}
            </div>
            {idx < visibleSteps.length - 1 && (
              <div className="circular-mini-stepper__connector" />
            )}
          </React.Fragment>
        ))}
      </div>
      <div className="circular-mini-stepper__label">{steps[currentIndex].label}</div>
    </div>
  );
}

const OPTIONS = [
  'Vertical',
  'Progress Bar',
  'Tabs',
  'Mini-Stepper',
];

export default function ProgressVariants({ steps, currentIndex }) {
  const [variant, setVariant] = useState(0);
  const progressPercentage = ((currentIndex + 1) / steps.length) * 100;

  return (
    <div className="progress-variants">
      <ContentSwitcher
        size="sm"
        selectedIndex={variant}
        onChange={({ index }) => setVariant(index)}
        style={{ marginBottom: 'var(--spacing-05)' }}
      >
        {OPTIONS.map((name, i) => (
          <Switch key={name} name={name} text={`${i + 1}. ${name}`} />
        ))}
      </ContentSwitcher>

      {variant === 0 && (
        <ProgressIndicator currentIndex={currentIndex} vertical>
          {steps.map((step, index) => (
            <ProgressStep
              key={step.key}
              label={step.label}
              complete={index < currentIndex}
              current={index === currentIndex}
            />
          ))}
        </ProgressIndicator>
      )}

      {variant === 1 && (
        <div className="progress-bar-wrapper">
          <ProgressBar
            label="Sign-up Progress"
            helperText={`Step ${currentIndex + 1} of ${steps.length}: ${steps[currentIndex].label}`}
            value={progressPercentage}
            max={100}
            status={currentIndex === steps.length - 1 ? 'finished' : 'active'}
          />
          <div className="progress-bar-steps">
            {steps.map((step, index) => (
              <div
                key={step.key}
                className={`progress-bar-step ${
                  index < currentIndex ? 'progress-bar-step--complete' : ''
                } ${index === currentIndex ? 'progress-bar-step--current' : ''}`}
              >
                <div className="progress-bar-step-marker">
                  {index < currentIndex ? <Checkmark size={12} /> : index + 1}
                </div>
                <span className="progress-bar-step-label">{step.label}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {variant === 2 && (
        <Tabs selectedIndex={currentIndex}>
          <TabList aria-label="Sign-up steps" className="tabs-stepper">
            {steps.map((step, index) => (
              <Tab
                key={step.key}
                disabled={index !== currentIndex}
                className={`tabs-stepper-tab ${
                  index < currentIndex ? 'tabs-stepper-tab--complete' : ''
                }`}
              >
                <span className="tabs-stepper-tab-marker">
                  {index < currentIndex ? <Checkmark size={16} /> : index + 1}
                </span>
                <span className="tabs-stepper-tab-label">{step.label}</span>
              </Tab>
            ))}
          </TabList>
        </Tabs>
      )}

      {variant === 3 && (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <CircularMiniStepper steps={steps} currentIndex={currentIndex} />
        </div>
      )}
    </div>
  );
}
