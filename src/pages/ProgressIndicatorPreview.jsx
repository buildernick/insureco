import React, { useState } from 'react';
import {
  Grid,
  Column,
  Stack,
  Heading,
  Tile,
  Button,
  ProgressIndicator,
  ProgressStep,
  ProgressBar,
  Tabs,
  TabList,
  Tab,
  TabPanels,
  TabPanel,
  TextInput,
  Select,
  SelectItem,
} from '@carbon/react';
import { ArrowRight, ArrowLeft } from '@carbon/icons-react';
import './ProgressIndicatorPreview.scss';

// Sample form steps
const STEPS = [
  { label: 'Personal Info', key: 'personal' },
  { label: 'Address', key: 'address' },
  { label: 'Insurance Type', key: 'type' },
  { label: 'Coverage', key: 'coverage' },
  { label: 'Review', key: 'review' },
];

// Variant 1: Vertical ProgressIndicator
function VariantOne() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  return (
    <Tile className="variant-container">
      <Heading level={3}>Option 1: Vertical Steps</Heading>
      <p className="variant-description">Stack steps vertically instead of horizontally. Great for mobile, but takes vertical space.</p>

      <div className="variant-pros-cons">
        <div className="pros-cons-column">
          <h5 className="pros-cons-title">✅ Pros</h5>
          <ul className="pros-cons-list">
            <li>All steps always visible</li>
            <li>Clear visual hierarchy</li>
            <li>Native Carbon component</li>
            <li>Accessibility built-in</li>
            <li>Shows completed steps with checkmarks</li>
          </ul>
        </div>
        <div className="pros-cons-column">
          <h5 className="pros-cons-title">❌ Cons</h5>
          <ul className="pros-cons-list">
            <li>Takes significant vertical space</li>
            <li>Not ideal for mobile (5+ steps)</li>
            <li>Scrolling required on narrow screens</li>
            <li>Less modern appearance</li>
            <li>High implementation effort to customize</li>
          </ul>
        </div>
      </div>
      
      <div className="variant-layout variant-one-layout">
        <div className="variant-progress">
          <ProgressIndicator vertical currentIndex={currentStep}>
            {STEPS.map((step, idx) => (
              <ProgressStep key={step.key} label={step.label} description="" />
            ))}
          </ProgressIndicator>
        </div>

        <div className="variant-content">
          <Heading level={4}>{STEPS[currentStep].label}</Heading>
          <Stack gap={4}>
            <TextInput
              id="v1-input-1"
              labelText="Example Field 1"
              placeholder="Enter value"
            />
            <TextInput
              id="v1-input-2"
              labelText="Example Field 2"
              placeholder="Enter value"
            />
          </Stack>
        </div>
      </div>

      <div className="variant-actions">
        <Button kind="secondary" onClick={handleBack} disabled={currentStep === 0}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} />
          Back
        </Button>
        <div style={{ flex: 1 }} />
        <Button kind="primary" onClick={handleNext} disabled={currentStep === STEPS.length - 1}>
          Next
          <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </Button>
      </div>
    </Tile>
  );
}

// Variant 2: ProgressBar + Step Counter
function VariantTwo() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const progressPercent = ((currentStep + 1) / STEPS.length) * 100;

  return (
    <Tile className="variant-container">
      <Heading level={3}>Option 2: Progress Percentage</Heading>
      <p className="variant-description">Compact percentage indicator with step counter. Very mobile-friendly, but no labeled steps visible.</p>

      <div className="variant-pros-cons">
        <div className="pros-cons-column">
          <h5 className="pros-cons-title">✅ Pros</h5>
          <ul className="pros-cons-list">
            <li>Most mobile-friendly design</li>
            <li>Minimal space required</li>
            <li>Shows percentage completion</li>
            <li>Native Carbon component</li>
            <li>Works with any number of steps</li>
            <li>Easy to implement</li>
          </ul>
        </div>
        <div className="pros-cons-column">
          <h5 className="pros-cons-title">❌ Cons</h5>
          <ul className="pros-cons-list">
            <li>Step names not visible in indicator</li>
            <li>No visual "completed" state</li>
            <li>Less visual progress communication</li>
            <li>Users may not see step overview</li>
          </ul>
        </div>
      </div>
      
      <div className="variant-layout variant-two-layout">
        <div className="variant-progress">
          <ProgressBar
            label="Progress"
            value={currentStep + 1}
            max={STEPS.length}
            helperText={`Step ${currentStep + 1} of ${STEPS.length}`}
          />
        </div>

        <div className="variant-content">
          <Heading level={4}>{STEPS[currentStep].label}</Heading>
          <Stack gap={4}>
            <TextInput
              id="v2-input-1"
              labelText="Example Field 1"
              placeholder="Enter value"
            />
            <TextInput
              id="v2-input-2"
              labelText="Example Field 2"
              placeholder="Enter value"
            />
          </Stack>
        </div>
      </div>

      <div className="variant-actions">
        <Button kind="secondary" onClick={handleBack} disabled={currentStep === 0}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} />
          Back
        </Button>
        <div style={{ flex: 1 }} />
        <Button kind="primary" onClick={handleNext} disabled={currentStep === STEPS.length - 1}>
          Next
          <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </Button>
      </div>
    </Tile>
  );
}

// Variant 4: Tabs Component
function VariantFour() {
  const [selectedIndex, setSelectedIndex] = useState(0);

  return (
    <Tile className="variant-container">
      <Heading level={3}>Option 3: Tabbed Steps</Heading>
      <p className="variant-description">Use tabs for each step. Clean keyboard navigation, but loses "progress" visualization.</p>

      <div className="variant-pros-cons">
        <div className="pros-cons-column">
          <h5 className="pros-cons-title">✅ Pros</h5>
          <ul className="pros-cons-list">
            <li>Excellent keyboard navigation</li>
            <li>Familiar UX pattern</li>
            <li>Mobile-responsive tabs</li>
            <li>Native Carbon component</li>
            <li>Users can jump between steps</li>
            <li>Built-in accessibility</li>
          </ul>
        </div>
        <div className="pros-cons-column">
          <h5 className="pros-cons-title">❌ Cons</h5>
          <ul className="pros-cons-list">
            <li>Looks like content tabs, not a stepper</li>
            <li>No visual progress state</li>
            <li>No "completed" checkmarks</li>
            <li>Users can navigate anywhere</li>
            <li>May confuse with tabbed content</li>
            <li>Requires form restructuring</li>
          </ul>
        </div>
      </div>
      
      <div className="variant-layout variant-four-layout">
        <Tabs selectedIndex={selectedIndex} onChange={({ selectedIndex }) => setSelectedIndex(selectedIndex)}>
          <TabList>
            {STEPS.map((step) => (
              <Tab key={step.key}>{step.label}</Tab>
            ))}
          </TabList>

          <TabPanels>
            {STEPS.map((step) => (
              <TabPanel key={step.key}>
                <div className="variant-content">
                  <Heading level={4}>{step.label}</Heading>
                  <Stack gap={4}>
                    <TextInput
                      id={`v4-${step.key}-1`}
                      labelText="Example Field 1"
                      placeholder="Enter value"
                    />
                    <TextInput
                      id={`v4-${step.key}-2`}
                      labelText="Example Field 2"
                      placeholder="Enter value"
                    />
                  </Stack>
                </div>
              </TabPanel>
            ))}
          </TabPanels>
        </Tabs>
      </div>

      <div className="variant-actions">
        <Button kind="secondary" onClick={() => setSelectedIndex(Math.max(0, selectedIndex - 1))} disabled={selectedIndex === 0}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} />
          Back
        </Button>
        <div style={{ flex: 1 }} />
        <Button kind="primary" onClick={() => setSelectedIndex(Math.min(STEPS.length - 1, selectedIndex + 1))} disabled={selectedIndex === STEPS.length - 1}>
          Next
          <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </Button>
      </div>
    </Tile>
  );
}

// Variant 6: Custom Compact Step Indicator (Dots)
function VariantSix() {
  const [currentStep, setCurrentStep] = useState(0);

  const handleNext = () => {
    if (currentStep < STEPS.length - 1) setCurrentStep(currentStep + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };

  const handleDotClick = (index) => {
    setCurrentStep(index);
  };

  return (
    <Tile className="variant-container">
      <Heading level={3}>Option 4: Compact Dot Indicator</Heading>
      <p className="variant-description">Dots with labels. Super compact and mobile-optimized. Shows step name below dots.</p>

      <div className="variant-pros-cons">
        <div className="pros-cons-column">
          <h5 className="pros-cons-title">✅ Pros</h5>
          <ul className="pros-cons-list">
            <li>Best mobile experience</li>
            <li>Ultra-compact design</li>
            <li>Shows step count at a glance</li>
            <li>Full control over styling</li>
            <li>Shows completed checkmarks</li>
            <li>Displays current step label</li>
            <li>Modern appearance</li>
          </ul>
        </div>
        <div className="pros-cons-column">
          <h5 className="pros-cons-title">❌ Cons</h5>
          <ul className="pros-cons-list">
            <li>Requires custom build</li>
            <li>More code to maintain</li>
            <li>Less context for each step</li>
            <li>Requires custom testing</li>
            <li>Dots harder to read on very small screens</li>
          </ul>
        </div>
      </div>
      
      <div className="variant-layout variant-six-layout">
        <div className="variant-progress">
          <div className="compact-stepper">
            <div className="compact-stepper__dots">
              {STEPS.map((step, idx) => (
                <button
                  key={step.key}
                  className={`compact-stepper__dot ${
                    idx < currentStep ? 'compact-stepper__dot--complete' : ''
                  } ${idx === currentStep ? 'compact-stepper__dot--current' : ''} ${
                    idx > currentStep ? 'compact-stepper__dot--incomplete' : ''
                  }`}
                  onClick={() => handleDotClick(idx)}
                  aria-label={`Step ${idx + 1}: ${step.label}`}
                  type="button"
                />
              ))}
            </div>
            <div className="compact-stepper__label">{STEPS[currentStep].label}</div>
            <div className="compact-stepper__counter">
              Step {currentStep + 1} of {STEPS.length}
            </div>
          </div>
        </div>

        <div className="variant-content">
          <Heading level={4}>{STEPS[currentStep].label}</Heading>
          <Stack gap={4}>
            <TextInput
              id="v6-input-1"
              labelText="Example Field 1"
              placeholder="Enter value"
            />
            <TextInput
              id="v6-input-2"
              labelText="Example Field 2"
              placeholder="Enter value"
            />
          </Stack>
        </div>
      </div>

      <div className="variant-actions">
        <Button kind="secondary" onClick={handleBack} disabled={currentStep === 0}>
          <ArrowLeft size={16} style={{ marginRight: '8px' }} />
          Back
        </Button>
        <div style={{ flex: 1 }} />
        <Button kind="primary" onClick={handleNext} disabled={currentStep === STEPS.length - 1}>
          Next
          <ArrowRight size={16} style={{ marginLeft: '8px' }} />
        </Button>
      </div>
    </Tile>
  );
}

// Main Preview Page
export default function ProgressIndicatorPreview() {
  return (
    <div className="progress-preview-page">
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div className="preview-header">
            <Heading level={1}>Progress Indicator Variants</Heading>
            <p className="preview-subtitle">
              Compare 4 different approaches to multi-step forms. Test each variant in light/dark modes using the theme toggle.
            </p>
          </div>
        </Column>
      </Grid>

      <Grid className="preview-grid">
        <Column lg={8} md={8} sm={4}>
          <VariantOne />
        </Column>
        <Column lg={8} md={8} sm={4}>
          <VariantTwo />
        </Column>
      </Grid>

      <Grid className="preview-grid">
        <Column lg={8} md={8} sm={4}>
          <VariantFour />
        </Column>
        <Column lg={8} md={8} sm={4}>
          <VariantSix />
        </Column>
      </Grid>

      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div className="preview-footer">
            <Heading level={3}>Notes</Heading>
            <Stack gap={4}>
              <div>
                <strong>Option 1 (Vertical Steps):</strong> Best for desktop, takes vertical space on mobile but steps always visible.
              </div>
              <div>
                <strong>Option 2 (Progress Percentage):</strong> Most mobile-friendly, compact, but users don't see step labels until they load.
              </div>
              <div>
                <strong>Option 3 (Tabbed Steps):</strong> Great keyboard nav, familiar UX, but looks like content tabs not a stepper.
              </div>
              <div>
                <strong>Option 4 (Compact Dot Indicator):</strong> Custom built for mobile, very compact, shows step name dynamically.
              </div>
            </Stack>
          </div>
        </Column>
      </Grid>
    </div>
  );
}
