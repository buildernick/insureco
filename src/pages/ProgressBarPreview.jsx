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
import HorizontalProgressBar from '../components/HorizontalProgressBar';
import HorizontalCarbonList from '../components/HorizontalCarbonList';
import HorizontalMinimalProgress from '../components/HorizontalMinimalProgress';
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
            Three different approaches in both vertical and horizontal layouts
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
          {/* Solution 1: Progress Bar */}
          <Column sm={4} md={8} lg={5} className="progress-preview-column">
            <Tile className="progress-preview-tile">
              <Stack gap={5}>
                <div className="progress-preview-solution-header">
                  <Heading className="progress-preview-solution-title">
                    Solution 1
                  </Heading>
                  <span className="progress-preview-badge progress-preview-badge--vertical">
                    Carbon Progress
                  </span>
                </div>

                <div className="progress-preview-description">
                  <h4>Carbon Progress Indicator</h4>
                  <p>
                    Uses Carbon's ProgressIndicator component in both vertical and horizontal layouts.
                    Shows ellipsis for hidden steps.
                  </p>
                  <ul className="progress-preview-pros-cons">
                    <li className="progress-preview-pro">✓ Uses Carbon component</li>
                    <li className="progress-preview-pro">✓ Familiar design pattern</li>
                    <li className="progress-preview-pro">✓ Accessible by default</li>
                    <li className="progress-preview-pro">✓ Both orientations</li>
                  </ul>
                </div>

                <div className="progress-preview-demo">
                  <h5 className="progress-preview-demo-title">Vertical</h5>
                  <VerticalProgressBar steps={steps} currentIndex={currentStep} />

                  <h5 className="progress-preview-demo-title">Horizontal</h5>
                  <HorizontalProgressBar steps={steps} currentIndex={currentStep} />
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
                    Built using Carbon's list components with custom layout.
                    Clean, semantic, and mobile-friendly in both orientations.
                  </p>
                  <ul className="progress-preview-pros-cons">
                    <li className="progress-preview-pro">✓ 100% Carbon components</li>
                    <li className="progress-preview-pro">✓ Semantic HTML (list)</li>
                    <li className="progress-preview-pro">✓ Compact design</li>
                    <li className="progress-preview-pro">✓ Both orientations</li>
                  </ul>
                </div>

                <div className="progress-preview-demo">
                  <h5 className="progress-preview-demo-title">Vertical</h5>
                  <CarbonListProgress steps={steps} currentIndex={currentStep} />

                  <h5 className="progress-preview-demo-title">Horizontal</h5>
                  <HorizontalCarbonList steps={steps} currentIndex={currentStep} />
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
                    Extremely compact and modern in both orientations.
                  </p>
                  <ul className="progress-preview-pros-cons">
                    <li className="progress-preview-pro">✓ Very compact</li>
                    <li className="progress-preview-pro">✓ Modern aesthetic</li>
                    <li className="progress-preview-pro">✓ Minimal code</li>
                    <li className="progress-preview-pro">✓ Both orientations</li>
                  </ul>
                </div>

                <div className="progress-preview-demo">
                  <h5 className="progress-preview-demo-title">Vertical</h5>
                  <CustomMinimalProgress steps={steps} currentIndex={currentStep} />

                  <h5 className="progress-preview-demo-title">Horizontal</h5>
                  <HorizontalMinimalProgress steps={steps} currentIndex={currentStep} />
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
              <strong>All solutions now available in both vertical and horizontal layouts.</strong> Each shows only
              the previous, current, and next steps with ellipsis indicators (⋯) for hidden steps.
            </p>
            <ul>
              <li>
                <strong>Solution 1 (Carbon Progress)</strong> - Uses Carbon's ProgressIndicator component.
                Most familiar to users, accessible by default. Choose vertical for sidebar or horizontal for top placement.
              </li>
              <li>
                <strong>Solution 2 (Carbon List)</strong> - Best balance of Carbon compliance and
                customization. Semantic HTML structure. Vertical works great for sidebars, horizontal for compact top bars.
              </li>
              <li>
                <strong>Solution 3 (Custom Minimal)</strong> - Lightest weight, modern dot-based design.
                Smallest footprint in both orientations. Perfect for minimal UIs.
              </li>
            </ul>
            <p className="progress-preview-final-note">
              💡 <strong>Suggested choice:</strong> Use <strong>horizontal layouts for mobile/tablet</strong> (most compact),
              and <strong>vertical layouts for desktop sidebars</strong>. Solution 2 (Carbon List) recommended for best
              balance of features and flexibility.
            </p>
          </div>
        </Tile>
      </Column>
    </Grid>
  );
}
