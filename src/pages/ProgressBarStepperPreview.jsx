import React, { useState } from 'react';
import { Button, ProgressBar } from '@carbon/react';
import { Checkmark } from '@carbon/icons-react';
import './ProgressBarStepperPreview.scss';

export default function ProgressBarStepperPreview() {
  const [currentIndex, setCurrentIndex] = useState(0);

  const steps = [
    { label: 'Personal Information', key: 'personal' },
    { label: 'Contact Details', key: 'contact' },
    { label: 'Address', key: 'address' },
    { label: 'Car Details', key: 'car' },
    { label: 'Home Details', key: 'home' },
    { label: 'Coverage Selection', key: 'coverage' },
    { label: 'Review & Confirm', key: 'review' }
  ];

  const progress = ((currentIndex + 1) / steps.length) * 100;

  const handleNext = () => {
    if (currentIndex < steps.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handleBack = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div className="progress-bar-stepper-preview">
      <div className="preview-header">
        <h1>Progress Bar Stepper Demo</h1>
        <p>Option 2: Progress Bar with Step List</p>
      </div>

      <div className="demo-section">
        <h2>How it works</h2>
        <p>
          Combines Carbon's ProgressBar component with a vertical list of steps. 
          The bar shows overall completion percentage while the list provides detailed step status.
        </p>

        <div className="stepper-container">
          {/* Progress Bar at the top */}
          <div className="progress-section">
            <div className="progress-header">
              <span className="step-counter">Step {currentIndex + 1} of {steps.length}</span>
              <span className="progress-percentage">{Math.round(progress)}%</span>
            </div>
            <ProgressBar
              value={progress}
              label="Overall Progress"
              hideLabel
            />
          </div>

          {/* Vertical step list */}
          <div className="step-list">
            {steps.map((step, index) => {
              const isComplete = index < currentIndex;
              const isCurrent = index === currentIndex;
              const isUpcoming = index > currentIndex;

              return (
                <div
                  key={step.key}
                  className={`step-item ${
                    isComplete ? 'step-complete' : ''
                  } ${
                    isCurrent ? 'step-current' : ''
                  } ${
                    isUpcoming ? 'step-upcoming' : ''
                  }`}
                >
                  <div className="step-indicator">
                    {isComplete ? (
                      <div className="step-checkmark">
                        <Checkmark size={16} />
                      </div>
                    ) : (
                      <div className="step-number">{index + 1}</div>
                    )}
                  </div>
                  <div className="step-content">
                    <div className="step-label">{step.label}</div>
                    {isCurrent && <div className="step-status">In Progress</div>}
                    {isComplete && <div className="step-status">Complete</div>}
                  </div>
                </div>
              );
            })}
          </div>

          {/* Navigation buttons */}
          <div className="demo-controls">
            <Button
              kind="secondary"
              onClick={handleBack}
              disabled={currentIndex === 0}
            >
              Back
            </Button>
            <Button
              kind="primary"
              onClick={handleNext}
              disabled={currentIndex === steps.length - 1}
            >
              Next
            </Button>
          </div>
        </div>
      </div>

      <div className="info-section">
        <h2>Pros</h2>
        <ul>
          <li>Visual progress bar shows completion percentage</li>
          <li>Compact bar at top, detailed list below</li>
          <li>Current step clearly highlighted</li>
          <li>Easy to understand at a glance</li>
          <li>Uses standard Carbon ProgressBar component</li>
        </ul>

        <h2>Cons</h2>
        <ul>
          <li>Shows all steps (vertical scrolling with many steps)</li>
          <li>More complex layout structure</li>
          <li>Takes vertical space for step list</li>
          <li>Some redundant information (bar + list)</li>
        </ul>

        <h2>Best for</h2>
        <ul>
          <li>Multi-step forms with 5-10 steps</li>
          <li>When users need to see all steps upfront</li>
          <li>Desktop and tablet experiences</li>
          <li>Wizards where context matters</li>
        </ul>
      </div>
    </div>
  );
}
