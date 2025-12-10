import React, { useState } from 'react';
import {
  Grid,
  Column,
  Button,
  Heading,
  Tile,
  Stack,
  ButtonSet,
} from '@carbon/react';
import { ArrowLeft, ArrowRight } from '@carbon/icons-react';
import VerticalProgressBar from '../components/VerticalProgressBar';
import CarbonListProgress from '../components/CarbonListProgress';
import CustomMinimalProgress from '../components/CustomMinimalProgress';
import './ProgressBarPreview.scss';

export default function ProgressBarPreview() {
  const [currentStep, setCurrentStep] = useState(2);
  
  // Sample steps from sign-up flow
  const steps = [
    { label: 'Personal Info', key: 'personal' },
    { label: 'Address', key: 'address' },
    { label: 'Insurance Type', key: 'type' },
    { label: 'Car Details', key: 'car' },
    { label: 'Home Details', key: 'home' },
    { label: 'Coverage', key: 'coverage' },
    { label: 'Review', key: 'review' },
  ];
  
  const handlePrev = () => {
    if (currentStep > 0) setCurrentStep(currentStep - 1);
  };
  
  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep(currentStep + 1);
  };
  
  return (
    <Grid className="progress-preview-page">
      <Column sm={4} md={8} lg={16}>
        <header className="progress-preview-header">
          <Heading className="progress-preview-title">
            Progress Bar Design Comparison
          </Heading>
          <p className="progress-preview-subtitle">
            Three different approaches to solve mobile/tablet horizontal scroll issues
          </p>
        </header>
        
        <div className="progress-preview-controls">
          <ButtonSet>
            <Button
              kind="secondary"
              size="sm"
              onClick={handlePrev}
              disabled={currentStep === 0}
              renderIcon={ArrowLeft}
            >
              Previous Step
            </Button>
            <Button
              kind="secondary"
              size="sm"
              onClick={handleNext}
              disabled={currentStep === steps.length - 1}
              renderIcon={ArrowRight}
            >
              Next Step
            </Button>
          </ButtonSet>
          <p className="progress-preview-step-info">
            Current Step: <strong>{currentStep + 1} of {steps.length}</strong> - {steps[currentStep].label}
          </p>
        </div>
      </Column>
      
      <Column sm={4} md={8} lg={16}>
        <Grid className="progress-preview-grid">
          {/* Solution 1: Vertical Progress Bar */}
          <Column sm={4} md={8} lg={5} className="progress-preview-column">
            <Tile className="progress-preview-tile">
              <Stack gap={5}>
                <div className="progress-preview-solution-header">
                  <Heading className="progress-preview-solution-title">
                    Solution 1
                  </Heading>
                  <span className="progress-preview-badge progress-preview-badge--vertical">
                    Vertical Layout
                  </span>
                </div>
                
                <div className="progress-preview-description">
                  <h4>Vertical Progress Indicator</h4>
                  <p>
                    Takes Carbon's existing ProgressIndicator component and makes it vertical.
                    Familiar UI pattern, no horizontal scrolling.
                  </p>
                  <ul className="progress-preview-pros-cons">
                    <li className="progress-preview-pro">✓ Uses Carbon component</li>
                    <li className="progress-preview-pro">✓ Familiar design pattern</li>
                    <li className="progress-preview-pro">✓ Accessible by default</li>
                    <li className="progress-preview-con">✗ Takes more vertical space</li>
                  </ul>
                </div>
                
                <div className="progress-preview-demo">
                  <VerticalProgressBar steps={steps} currentIndex={currentStep} />
                </div>
              </Stack>
            </Tile>
          </Column>
          
          {/* Solution 2: Carbon List Progress */}
          <Column sm={4} md={8} lg={5} className="progress-preview-column">
            <Tile className="progress-preview-tile">
              <Stack gap={5}>
                <div className="progress-preview-solution-header">
                  <Heading className="progress-preview-solution-title">
                    Solution 2
                  </Heading>
                  <span className="progress-preview-badge progress-preview-badge--carbon">
                    Carbon Only
                  </span>
                </div>
                
                <div className="progress-preview-description">
                  <h4>Carbon List-Based Progress</h4>
                  <p>
                    Built using only Carbon's OrderedList and ListItem components.
                    Clean, semantic, and mobile-friendly.
                  </p>
                  <ul className="progress-preview-pros-cons">
                    <li className="progress-preview-pro">✓ 100% Carbon components</li>
                    <li className="progress-preview-pro">✓ Semantic HTML (list)</li>
                    <li className="progress-preview-pro">✓ Compact design</li>
                    <li className="progress-preview-con">✗ Custom styling needed</li>
                  </ul>
                </div>
                
                <div className="progress-preview-demo">
                  <CarbonListProgress steps={steps} currentIndex={currentStep} />
                </div>
              </Stack>
            </Tile>
          </Column>
          
          {/* Solution 3: Custom Minimal Progress */}
          <Column sm={4} md={8} lg={5} className="progress-preview-column">
            <Tile className="progress-preview-tile">
              <Stack gap={5}>
                <div className="progress-preview-solution-header">
                  <Heading className="progress-preview-solution-title">
                    Solution 3
                  </Heading>
                  <span className="progress-preview-badge progress-preview-badge--custom">
                    Custom
                  </span>
                </div>
                
                <div className="progress-preview-description">
                  <h4>Minimal Custom Progress</h4>
                  <p>
                    Lightweight custom component with dots and connecting lines.
                    Extremely compact and modern.
                  </p>
                  <ul className="progress-preview-pros-cons">
                    <li className="progress-preview-pro">✓ Very compact</li>
                    <li className="progress-preview-pro">✓ Modern aesthetic</li>
                    <li className="progress-preview-pro">✓ Minimal code</li>
                    <li className="progress-preview-con">✗ No Carbon components</li>
                  </ul>
                </div>
                
                <div className="progress-preview-demo">
                  <CustomMinimalProgress steps={steps} currentIndex={currentStep} />
                </div>
              </Stack>
            </Tile>
          </Column>
        </Grid>
      </Column>
      
      <Column sm={4} md={8} lg={16}>
        <Tile className="progress-preview-recommendation">
          <Heading className="progress-preview-recommendation-title">
            Recommendation
          </Heading>
          <div className="progress-preview-recommendation-content">
            <p>
              <strong>For mobile/tablet optimization:</strong> All three solutions eliminate horizontal scrolling.
            </p>
            <ul>
              <li>
                <strong>Solution 1 (Vertical)</strong> - Best if you want to keep Carbon's ProgressIndicator
                but need vertical layout. Most familiar to users who know stepper UIs.
              </li>
              <li>
                <strong>Solution 2 (Carbon List)</strong> - Best balance of Carbon compliance and
                customization. Semantic HTML structure, accessible, and flexible styling.
              </li>
              <li>
                <strong>Solution 3 (Custom Minimal)</strong> - Best for minimal, modern aesthetic.
                Smallest vertical footprint but requires custom maintenance.
              </li>
            </ul>
            <p className="progress-preview-final-note">
              💡 <strong>Suggested choice:</strong> Solution 2 (Carbon List) for best combination
              of Carbon design system compliance, accessibility, and mobile optimization.
            </p>
          </div>
        </Tile>
      </Column>
    </Grid>
  );
}
