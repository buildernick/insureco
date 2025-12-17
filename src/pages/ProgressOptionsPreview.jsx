import React, { useState } from 'react';
import {
  Grid,
  Column,
  Heading,
  Tile,
  Button,
  Stack,
} from '@carbon/react';
import MobileStepper from '../components/MobileStepper';
import './ProgressOptionsPreview.scss';

export default function ProgressOptionsPreview() {
  const [currentStep, setCurrentStep] = useState(2);

  // Sample steps - more than a few to demonstrate mobile scrolling solution
  const steps = [
    { label: 'Personal Info', key: 'personal' },
    { label: 'Address', key: 'address' },
    { label: 'Insurance Type', key: 'type' },
    { label: 'Car Details', key: 'car' },
    { label: 'Home Details', key: 'home' },
    { label: 'Coverage', key: 'coverage' },
    { label: 'Review', key: 'review' },
  ];

  return (
    <Grid className="progress-preview">
      <Column sm={4} md={8} lg={16}>
        <header className="preview-header">
          <Heading className="preview-title">Mobile Dots Stepper</Heading>
          <p className="preview-subtitle">
            Custom mobile-first progress indicator for multi-step forms
          </p>
        </header>

        {/* Controls */}
        <Tile className="preview-controls">
          <Stack gap={4} orientation="horizontal">
            <Button
              kind="secondary"
              size="sm"
              onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
              disabled={currentStep === 0}
            >
              Previous Step
            </Button>
            <div className="step-indicator">
              Step {currentStep + 1} of {steps.length}
            </div>
            <Button
              kind="primary"
              size="sm"
              onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
              disabled={currentStep === steps.length - 1}
            >
              Next Step
            </Button>
          </Stack>
        </Tile>

        {/* Mobile Dots Stepper Demo */}
        <section className="option-section">
          <Heading className="option-heading">Interactive Demo</Heading>
          <p className="option-type">Custom Component</p>
          
          <Tile className="option-preview">
            <div className="custom-stepper-wrapper">
              <MobileStepper steps={steps} currentIndex={currentStep} />
            </div>
          </Tile>

          <Tile className="pros-cons">
            <div className="pros">
              <h4>Pros</h4>
              <ul>
                <li>Perfect for mobile - no scrolling needed</li>
                <li>Shows only relevant context (prev, current, next)</li>
                <li>Clean, minimal design</li>
                <li>Progress bar provides overall completion context</li>
                <li>Large touch targets for mobile</li>
                <li>Works great with any number of steps</li>
                <li>Smooth animations and transitions</li>
              </ul>
            </div>
            <div className="cons">
              <h4>Cons</h4>
              <ul>
                <li>Custom component - not part of Carbon Design System</li>
                <li>Requires custom maintenance and testing</li>
                <li>Users can't see all steps at once</li>
                <li>Less context about total journey</li>
                <li>Doesn't match existing design system patterns</li>
              </ul>
            </div>
          </Tile>
        </section>

        {/* Implementation Details */}
        <section className="implementation-section">
          <Tile className="implementation-details">
            <Heading className="implementation-heading">Implementation</Heading>
            
            <div className="implementation-content">
              <div className="implementation-item">
                <h4>Component Location</h4>
                <code>src/components/MobileStepper.jsx</code>
              </div>

              <div className="implementation-item">
                <h4>Usage</h4>
                <pre><code>{`import MobileStepper from '../components/MobileStepper';

<MobileStepper 
  steps={steps} 
  currentIndex={currentStep} 
/>`}</code></pre>
              </div>

              <div className="implementation-item">
                <h4>Props</h4>
                <ul>
                  <li><strong>steps</strong> (array, required): Array of step objects with <code>label</code> and <code>key</code> properties</li>
                  <li><strong>currentIndex</strong> (number, optional): Index of current step (0-based), defaults to 0</li>
                </ul>
              </div>

              <div className="implementation-item">
                <h4>Features</h4>
                <ul>
                  <li>Displays previous, current, and next steps only</li>
                  <li>Progress bar shows overall completion percentage</li>
                  <li>Step counter shows "Step X of Y"</li>
                  <li>Checkmark icon for completed steps</li>
                  <li>Pulsing animation on current step</li>
                  <li>Fully theme-aware (works in light and dark modes)</li>
                  <li>Responsive design for mobile and desktop</li>
                </ul>
              </div>
            </div>
          </Tile>
        </section>

        {/* Why This Solution */}
        <Tile className="recommendation-section">
          <Heading className="recommendation-heading">Why This Solution?</Heading>
          <p className="recommendation-text">
            Traditional progress indicators require horizontal scrolling on mobile when there are 5+ steps. 
            This creates a poor user experience and makes it difficult to see where you are in the journey.
          </p>
          <p className="recommendation-text">
            The <strong>Mobile Dots Stepper</strong> solves this by showing only the most relevant context: 
            the previous step (to see where you came from), the current step (where you are now), and the 
            next step (where you're going). The progress bar provides overall context without requiring 
            horizontal scrolling.
          </p>
          <p className="recommendation-text">
            This approach is especially effective for forms with 5-10 steps, where traditional progress 
            indicators become unwieldy on mobile devices.
          </p>
        </Tile>
      </Column>
    </Grid>
  );
}
