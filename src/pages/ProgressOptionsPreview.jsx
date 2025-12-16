import React, { useState } from 'react';
import {
  Grid,
  Column,
  Heading,
  Tile,
  Button,
  Stack,
  ProgressIndicator,
  ProgressStep,
  Breadcrumb,
  BreadcrumbItem,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
} from '@carbon/react';
import { Checkmark, ChevronRight } from '@carbon/icons-react';
import './ProgressOptionsPreview.scss';

export default function ProgressOptionsPreview() {
  const [currentStep, setCurrentStep] = useState(2);

  // Sample steps - more than a few to demonstrate mobile scrolling issue
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
          <Heading className="preview-title">Progress Bar Options</Heading>
          <p className="preview-subtitle">
            Comparing 4 different approaches for step navigation on mobile
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

        {/* Option 1: Carbon ProgressIndicator - Vertical Compact */}
        <section className="option-section">
          <Heading className="option-heading">Option 1: Vertical Compact Progress</Heading>
          <p className="option-type">Carbon Component (ProgressIndicator)</p>
          
          <Tile className="option-preview">
            <div className="vertical-progress-wrapper">
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
          </Tile>

          <Tile className="pros-cons">
            <div className="pros">
              <h4>Pros</h4>
              <ul>
                <li>Uses Carbon component (consistent with design system)</li>
                <li>No horizontal scrolling on mobile</li>
                <li>Shows all steps at once</li>
                <li>Clear visual hierarchy</li>
                <li>Familiar pattern for users</li>
              </ul>
            </div>
            <div className="cons">
              <h4>Cons</h4>
              <ul>
                <li>Takes up more vertical space</li>
                <li>Can feel long with many steps (7+ steps)</li>
                <li>Less common pattern for mobile forms</li>
                <li>Pushes content further down the page</li>
              </ul>
            </div>
          </Tile>
        </section>

        {/* Option 2: Carbon Breadcrumb - Condensed Navigation */}
        <section className="option-section">
          <Heading className="option-heading">Option 2: Breadcrumb Navigation</Heading>
          <p className="option-type">Carbon Component (Breadcrumb)</p>
          
          <Tile className="option-preview">
            <div className="breadcrumb-progress-wrapper">
              <Breadcrumb noTrailingSlash className="step-breadcrumb">
                {steps.map((step, index) => (
                  <BreadcrumbItem
                    key={step.key}
                    className={`breadcrumb-step ${
                      index < currentStep ? 'breadcrumb-step--complete' : ''
                    } ${index === currentStep ? 'breadcrumb-step--current' : ''} ${
                      index > currentStep ? 'breadcrumb-step--incomplete' : ''
                    }`}
                  >
                    {index < currentStep && <Checkmark size={16} className="step-check" />}
                    {step.label}
                  </BreadcrumbItem>
                ))}
              </Breadcrumb>
            </div>
          </Tile>

          <Tile className="pros-cons">
            <div className="pros">
              <h4>Pros</h4>
              <ul>
                <li>Uses Carbon component (consistent with design system)</li>
                <li>Compact horizontal layout</li>
                <li>Shows completed steps with checkmarks</li>
                <li>Familiar breadcrumb pattern</li>
                <li>Minimal vertical space</li>
              </ul>
            </div>
            <div className="cons">
              <h4>Cons</h4>
              <ul>
                <li>Still requires horizontal scrolling on mobile with 5+ steps</li>
                <li>Small touch targets on mobile</li>
                <li>Text can be truncated on narrow screens</li>
                <li>Not typically used for multi-step forms</li>
                <li>Less emphasis on current step</li>
              </ul>
            </div>
          </Tile>
        </section>

        {/* Option 3: Carbon Tabs - Step Tabs */}
        <section className="option-section">
          <Heading className="option-heading">Option 3: Tab-Based Steps</Heading>
          <p className="option-type">Carbon Component (Tabs)</p>
          
          <Tile className="option-preview">
            <div className="tabs-progress-wrapper">
              <Tabs selectedIndex={currentStep}>
                <TabList aria-label="Step navigation" contained>
                  {steps.map((step, index) => (
                    <Tab
                      key={step.key}
                      className={`tab-step ${
                        index < currentStep ? 'tab-step--complete' : ''
                      }`}
                    >
                      {index < currentStep ? (
                        <>
                          <Checkmark size={16} className="tab-check" />
                          <span className="tab-label">{step.label}</span>
                        </>
                      ) : (
                        <>
                          <span className="tab-number">{index + 1}</span>
                          <span className="tab-label">{step.label}</span>
                        </>
                      )}
                    </Tab>
                  ))}
                </TabList>
                <TabPanels>
                  {steps.map((step) => (
                    <TabPanel key={step.key}>
                      <p className="tab-panel-content">Content for {step.label}</p>
                    </TabPanel>
                  ))}
                </TabPanels>
              </Tabs>
            </div>
          </Tile>

          <Tile className="pros-cons">
            <div className="pros">
              <h4>Pros</h4>
              <ul>
                <li>Uses Carbon component (consistent with design system)</li>
                <li>Interactive - users can see step labels clearly</li>
                <li>Shows completion status with checkmarks</li>
                <li>Good visual separation of steps</li>
                <li>Contained variant provides clear boundaries</li>
              </ul>
            </div>
            <div className="cons">
              <h4>Cons</h4>
              <ul>
                <li>Requires horizontal scrolling on mobile with 5+ steps</li>
                <li>Tabs are meant for switching content, not linear progression</li>
                <li>Takes up moderate vertical space</li>
                <li>May confuse users (tabs suggest non-linear navigation)</li>
                <li>Not the intended use case for Tab component</li>
              </ul>
            </div>
          </Tile>
        </section>

        {/* Option 4: Custom Mobile-First Stepper */}
        <section className="option-section">
          <Heading className="option-heading">Option 4: Mobile Dots Stepper</Heading>
          <p className="option-type">Custom Component (No Carbon)</p>
          
          <Tile className="option-preview">
            <div className="custom-stepper-wrapper">
              <div className="mobile-stepper">
                <div className="stepper-dots">
                  {/* Previous step (if exists) */}
                  {currentStep > 0 && (
                    <div className="step-dot step-dot--previous">
                      <div className="dot-circle dot-circle--complete">
                        <Checkmark size={12} />
                      </div>
                      <span className="dot-label">{steps[currentStep - 1].label}</span>
                    </div>
                  )}

                  {/* Current step */}
                  <div className="step-dot step-dot--current">
                    <div className="dot-circle dot-circle--current">
                      <span className="dot-number">{currentStep + 1}</span>
                    </div>
                    <span className="dot-label dot-label--current">{steps[currentStep].label}</span>
                  </div>

                  {/* Next step (if exists) */}
                  {currentStep < steps.length - 1 && (
                    <div className="step-dot step-dot--next">
                      <div className="dot-circle dot-circle--incomplete">
                        <span className="dot-number">{currentStep + 2}</span>
                      </div>
                      <span className="dot-label">{steps[currentStep + 1].label}</span>
                    </div>
                  )}
                </div>

                <div className="stepper-progress-bar">
                  <div 
                    className="stepper-progress-fill"
                    style={{ width: `${((currentStep + 1) / steps.length) * 100}%` }}
                  />
                </div>

                <div className="stepper-counter">
                  Step {currentStep + 1} of {steps.length}
                </div>
              </div>
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

        {/* Recommendation */}
        <Tile className="recommendation-section">
          <Heading className="recommendation-heading">Recommendation</Heading>
          <p className="recommendation-text">
            For a mobile-first multi-step form with 5+ steps, <strong>Option 4 (Custom Mobile Dots Stepper)</strong> provides 
            the best user experience despite being custom. It eliminates scrolling, shows relevant context, and works 
            seamlessly on all screen sizes.
          </p>
          <p className="recommendation-text">
            However, if staying within the Carbon Design System is a priority, <strong>Option 1 (Vertical Compact Progress)</strong> is 
            the best Carbon-based solution. It avoids horizontal scrolling and provides a clear, accessible navigation pattern.
          </p>
          <p className="recommendation-text">
            <strong>Options 2 and 3</strong> are not recommended as they still have mobile scrolling issues and use Carbon components 
            outside their intended purposes.
          </p>
        </Tile>
      </Column>
    </Grid>
  );
}
