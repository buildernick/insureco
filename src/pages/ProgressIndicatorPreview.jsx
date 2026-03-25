import React, { useState } from 'react';
import {
  Grid,
  Column,
  Tile,
  Button,
  Stack,
  Heading,
  ProgressIndicator,
  ProgressStep,
  ProgressBar,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  Tag
} from '@carbon/react';
import { ArrowLeft, ArrowRight, Checkmark } from '@carbon/icons-react';
import './ProgressIndicatorPreview.scss';

// Custom Circular Mini-Stepper Component
function CircularMiniStepper({ steps, currentIndex, className = '' }) {
  const visibleSteps = [];
  
  // Show: previous (if exists), current, next (if exists)
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
      <div className="circular-mini-stepper__label">
        {steps[currentIndex].label}
      </div>
    </div>
  );
}

export default function ProgressIndicatorPreview() {
  const [currentStep, setCurrentStep] = useState(2);

  const steps = [
    { key: 'personal', label: 'Personal Info' },
    { key: 'contact', label: 'Contact' },
    { key: 'address', label: 'Address' },
    { key: 'car', label: 'Car Details' },
    { key: 'home', label: 'Home Details' },
    { key: 'coverage', label: 'Coverage' },
    { key: 'review', label: 'Review' }
  ];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const progressPercentage = ((currentStep + 1) / steps.length) * 100;

  return (
    <Grid className="progress-preview-page">
      <Column lg={16} md={8} sm={4}>
        <header className="progress-preview-header">
          <Heading className="progress-preview-title">
            Progress Indicator Options
          </Heading>
          <p className="progress-preview-subtitle">
            4 different approaches to displaying multi-step progress on mobile
          </p>
        </header>
      </Column>

      {/* Controls */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="preview-controls">
          <Stack gap={4}>
            <p className="preview-controls-label">
              Test the indicators: <strong>Step {currentStep + 1} of {steps.length}</strong>
            </p>
            <Stack gap={3} orientation="horizontal" className="preview-controls-buttons">
              <Button
                kind="secondary"
                onClick={handleBack}
                disabled={currentStep === 0}
                renderIcon={ArrowLeft}
                className="btn--icon-left"
              >
                Back
              </Button>
              <Button
                kind="primary"
                onClick={handleNext}
                disabled={currentStep === steps.length - 1}
                renderIcon={ArrowRight}
              >
                Next
              </Button>
            </Stack>
          </Stack>
        </Tile>
      </Column>

      {/* Option 1: Vertical ProgressIndicator */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="preview-option">
          <div className="preview-option-header">
            <Heading as="h3" className="preview-option-title">
              Option 1: Vertical Progress Indicator
            </Heading>
            <Tag type="blue">Carbon Component</Tag>
          </div>
          
          <div className="preview-demo preview-demo--vertical">
            <ProgressIndicator currentIndex={currentStep} vertical>
              {steps.map((step, index) => (
                <ProgressStep
                  key={step.key}
                  label={step.label}
                  complete={index < currentStep}
                  current={index === currentStep}
                />
              ))}
            </ProgressIndicator>
          </div>

          <div className="preview-pros-cons">
            <div className="preview-pros">
              <h4 className="preview-section-title">Pros</h4>
              <ul className="preview-list">
                <li>Uses standard Carbon component</li>
                <li>Shows all steps at once for context</li>
                <li>Clear visual progress with checkmarks</li>
                <li>No horizontal scrolling on mobile</li>
                <li>Built-in accessibility features</li>
              </ul>
            </div>
            <div className="preview-cons">
              <h4 className="preview-section-title">Cons</h4>
              <ul className="preview-list">
                <li>Takes up significant vertical space</li>
                <li>Still requires scrolling on mobile with many steps</li>
                <li>Can feel lengthy in multi-step flows (7+ steps)</li>
                <li>Less compact than horizontal alternatives</li>
              </ul>
            </div>
          </div>
        </Tile>
      </Column>

      {/* Option 2: ProgressBar with Step Counter */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="preview-option">
          <div className="preview-option-header">
            <Heading as="h3" className="preview-option-title">
              Option 2: Progress Bar with Step Counter
            </Heading>
            <Tag type="blue">Carbon Component</Tag>
          </div>
          
          <div className="preview-demo">
            <div className="progress-bar-wrapper">
              <ProgressBar
                label="Sign-up Progress"
                helperText={`Step ${currentStep + 1} of ${steps.length}: ${steps[currentStep].label}`}
                value={progressPercentage}
                max={100}
                status={currentStep === steps.length - 1 ? 'finished' : 'active'}
              />
              <div className="progress-bar-steps">
                {steps.map((step, index) => (
                  <div
                    key={step.key}
                    className={`progress-bar-step ${
                      index < currentStep ? 'progress-bar-step--complete' : ''
                    } ${index === currentStep ? 'progress-bar-step--current' : ''}`}
                  >
                    <div className="progress-bar-step-marker">
                      {index < currentStep ? <Checkmark size={12} /> : index + 1}
                    </div>
                    <span className="progress-bar-step-label">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="preview-pros-cons">
            <div className="preview-pros">
              <h4 className="preview-section-title">Pros</h4>
              <ul className="preview-list">
                <li>Visual progress bar shows completion percentage</li>
                <li>Compact at the top, detailed list below</li>
                <li>Clear current step highlighted</li>
                <li>Easy to understand at a glance</li>
                <li>Good for forms with many steps</li>
              </ul>
            </div>
            <div className="preview-cons">
              <h4 className="preview-section-title">Cons</h4>
              <ul className="preview-list">
                <li>Still shows all steps (vertical scrolling with many steps)</li>
                <li>More complex layout structure</li>
                <li>Takes up vertical space for step list</li>
                <li>Redundant information (bar + list)</li>
              </ul>
            </div>
          </div>
        </Tile>
      </Column>

      {/* Option 3: Tabs as Stepper */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="preview-option">
          <div className="preview-option-header">
            <Heading as="h3" className="preview-option-title">
              Option 3: Tabs as Stepper
            </Heading>
            <Tag type="blue">Carbon Component</Tag>
          </div>
          
          <div className="preview-demo">
            <Tabs selectedIndex={currentStep}>
              <TabList aria-label="Sign-up steps" className="tabs-stepper">
                {steps.map((step, index) => (
                  <Tab
                    key={step.key}
                    disabled={index !== currentStep}
                    className={`tabs-stepper-tab ${
                      index < currentStep ? 'tabs-stepper-tab--complete' : ''
                    }`}
                  >
                    <span className="tabs-stepper-tab-marker">
                      {index < currentStep ? <Checkmark size={16} /> : index + 1}
                    </span>
                    <span className="tabs-stepper-tab-label">{step.label}</span>
                  </Tab>
                ))}
              </TabList>
              <TabPanels>
                {steps.map((step) => (
                  <TabPanel key={step.key}>
                    <p className="tabs-content-placeholder">
                      {step.label} form content would go here
                    </p>
                  </TabPanel>
                ))}
              </TabPanels>
            </Tabs>
          </div>

          <div className="preview-pros-cons">
            <div className="preview-pros">
              <h4 className="preview-section-title">Pros</h4>
              <ul className="preview-list">
                <li>Familiar tab interface pattern</li>
                <li>Horizontal layout saves vertical space</li>
                <li>Built-in keyboard navigation</li>
                <li>Can show content inline with tabs</li>
                <li>Good for shorter step counts (3-5 steps)</li>
              </ul>
            </div>
            <div className="preview-cons">
              <h4 className="preview-section-title">Cons</h4>
              <ul className="preview-list">
                <li>Horizontal scrolling required on mobile with many steps</li>
                <li>Tab labels get truncated on small screens</li>
                <li>Not ideal for 6+ steps on mobile</li>
                <li>Tabs semantically meant for content switching, not forms</li>
              </ul>
            </div>
          </div>
        </Tile>
      </Column>

      {/* Option 4: Custom Circular Mini-Stepper */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="preview-option">
          <div className="preview-option-header">
            <Heading as="h3" className="preview-option-title">
              Option 4: Circular Mini-Stepper (Context-Only)
            </Heading>
            <Tag type="red">Custom Component</Tag>
          </div>
          
          <div className="preview-demo">
            <CircularMiniStepper steps={steps} currentIndex={currentStep} />
          </div>

          <div className="preview-pros-cons">
            <div className="preview-pros">
              <h4 className="preview-section-title">Pros</h4>
              <ul className="preview-list">
                <li><strong>Most compact</strong> – shows only 2-3 steps at a time</li>
                <li><strong>No scrolling</strong> – fits on any screen size</li>
                <li>Clear focus on current step</li>
                <li>Shows immediate context (where you've been, where you're going)</li>
                <li>Clean, minimalist design</li>
                <li>Perfect for mobile-first experiences</li>
                <li>Scales well with any number of steps</li>
              </ul>
            </div>
            <div className="preview-cons">
              <h4 className="preview-section-title">Cons</h4>
              <ul className="preview-list">
                <li><strong>Custom component</strong> – requires maintenance</li>
                <li>No overview of all steps at once</li>
                <li>User can't see total progress visually</li>
                <li>Need to implement accessibility from scratch</li>
                <li>Additional CSS and component code</li>
                <li>May feel less informative for users who want full context</li>
              </ul>
            </div>
          </div>
        </Tile>
      </Column>

      {/* Summary and Recommendation */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="preview-recommendation">
          <Heading as="h3" className="preview-recommendation-title">
            Recommendation
          </Heading>
          <Stack gap={5}>
            <p>
              For a <strong>mobile-first multi-step form with 6-7+ steps</strong>, we recommend:
            </p>
            <div className="recommendation-primary">
              <h4 className="recommendation-choice">
                <Checkmark size={20} className="recommendation-icon" />
                Option 4: Circular Mini-Stepper (Custom)
              </h4>
              <p>
                This option best solves the mobile scrolling problem by showing only relevant context. 
                While it requires custom code, the benefits for user experience outweigh the maintenance cost.
                Users stay focused on the current step without feeling overwhelmed by a long list.
              </p>
            </div>
            <div className="recommendation-secondary">
              <h4 className="recommendation-choice">
                Alternative: Option 2 (Progress Bar + Step List)
              </h4>
              <p>
                If you prefer a Carbon-only solution, the ProgressBar combination provides good visual feedback
                and uses standard components. However, it still requires vertical scrolling with many steps.
              </p>
            </div>
          </Stack>
        </Tile>
      </Column>
    </Grid>
  );
}
