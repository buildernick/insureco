import React, { useState } from 'react';
import CompactStepIndicator from '../components/CompactStepIndicator';

const steps = [
  { label: 'Personal Info', key: 'personal' },
  { label: 'Address', key: 'address' },
  { label: 'Insurance Type', key: 'type' },
  { label: 'Coverage', key: 'coverage' },
  { label: 'Review', key: 'review' },
];

export default {
  title: 'Components/CompactStepIndicator',
  component: CompactStepIndicator,
  parameters: {
    layout: 'centered',
  },
  argTypes: {
    currentIndex: {
      control: { type: 'number', min: 0, max: steps.length - 1 },
      description: 'Current step index (0-based)',
    },
    displayCurrentLabel: {
      control: 'boolean',
      description: 'Show the current step label below dots',
    },
    displayCounter: {
      control: 'boolean',
      description: 'Show step counter text',
    },
  },
};

export const Default = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h3>Compact Step Indicator - Default</h3>
      <CompactStepIndicator
        steps={steps}
        currentIndex={currentStep}
        onStepChange={setCurrentStep}
      />
      <p style={{ marginTop: '2rem', color: '#666' }}>
        Click the dots to navigate. Current step: {currentStep + 1}
      </p>
    </div>
  );
};

export const PartiallyComplete = () => {
  const [currentStep, setCurrentStep] = useState(2);

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h3>Compact Step Indicator - In Progress</h3>
      <CompactStepIndicator
        steps={steps}
        currentIndex={currentStep}
        onStepChange={setCurrentStep}
      />
      <p style={{ marginTop: '2rem', color: '#666' }}>
        Showing completed steps (✓), current step (●), and upcoming steps (○).
      </p>
    </div>
  );
};

export const NearCompletion = () => {
  const [currentStep, setCurrentStep] = useState(4);

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h3>Compact Step Indicator - Final Step</h3>
      <CompactStepIndicator
        steps={steps}
        currentIndex={currentStep}
        onStepChange={setCurrentStep}
      />
      <p style={{ marginTop: '2rem', color: '#666' }}>
        Most steps are complete, on the final review step.
      </p>
    </div>
  );
};

export const WithoutLabel = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h3>Compact Step Indicator - Without Label</h3>
      <CompactStepIndicator
        steps={steps}
        currentIndex={currentStep}
        onStepChange={setCurrentStep}
        displayCurrentLabel={false}
      />
      <p style={{ marginTop: '2rem', color: '#666' }}>
        Only shows dots and counter, no step name.
      </p>
    </div>
  );
};

export const WithoutCounter = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h3>Compact Step Indicator - Without Counter</h3>
      <CompactStepIndicator
        steps={steps}
        currentIndex={currentStep}
        onStepChange={setCurrentStep}
        displayCounter={false}
      />
      <p style={{ marginTop: '2rem', color: '#666' }}>
        Only shows dots and step name, no counter.
      </p>
    </div>
  );
};

export const DotsOnly = () => {
  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h3>Compact Step Indicator - Dots Only</h3>
      <CompactStepIndicator
        steps={steps}
        currentIndex={currentStep}
        onStepChange={setCurrentStep}
        displayCurrentLabel={false}
        displayCounter={false}
      />
      <p style={{ marginTop: '2rem', color: '#666' }}>
        Ultra-minimal version with only dots.
      </p>
    </div>
  );
};

export const FewSteps = () => {
  const fewSteps = [
    { label: 'Shipping', key: 'shipping' },
    { label: 'Payment', key: 'payment' },
    { label: 'Confirm', key: 'confirm' },
  ];

  const [currentStep, setCurrentStep] = useState(1);

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h3>Compact Step Indicator - Few Steps</h3>
      <CompactStepIndicator
        steps={fewSteps}
        currentIndex={currentStep}
        onStepChange={setCurrentStep}
      />
      <p style={{ marginTop: '2rem', color: '#666' }}>
        Works great with shorter processes (3-4 steps).
      </p>
    </div>
  );
};

export const ManySteps = () => {
  const manySteps = [
    { label: 'Step 1', key: 's1' },
    { label: 'Step 2', key: 's2' },
    { label: 'Step 3', key: 's3' },
    { label: 'Step 4', key: 's4' },
    { label: 'Step 5', key: 's5' },
    { label: 'Step 6', key: 's6' },
    { label: 'Step 7', key: 's7' },
    { label: 'Step 8', key: 's8' },
  ];

  const [currentStep, setCurrentStep] = useState(3);

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h3>Compact Step Indicator - Many Steps</h3>
      <CompactStepIndicator
        steps={manySteps}
        currentIndex={currentStep}
        onStepChange={setCurrentStep}
      />
      <p style={{ marginTop: '2rem', color: '#666' }}>
        Dots wrap on smaller screens but remain readable.
      </p>
    </div>
  );
};

export const Controlled = () => {
  const [currentStep, setCurrentStep] = useState(0);

  return (
    <div style={{ padding: '2rem', maxWidth: '400px' }}>
      <h3>Compact Step Indicator - Controlled</h3>
      <CompactStepIndicator
        steps={steps}
        currentIndex={currentStep}
        onStepChange={setCurrentStep}
      />
      <div style={{ marginTop: '2rem', display: 'flex', gap: '1rem' }}>
        <button
          onClick={() => setCurrentStep(Math.max(0, currentStep - 1))}
          disabled={currentStep === 0}
          style={{
            padding: '0.5rem 1rem',
            cursor: currentStep === 0 ? 'not-allowed' : 'pointer',
            opacity: currentStep === 0 ? 0.5 : 1,
          }}
        >
          Back
        </button>
        <button
          onClick={() => setCurrentStep(Math.min(steps.length - 1, currentStep + 1))}
          disabled={currentStep === steps.length - 1}
          style={{
            padding: '0.5rem 1rem',
            cursor: currentStep === steps.length - 1 ? 'not-allowed' : 'pointer',
            opacity: currentStep === steps.length - 1 ? 0.5 : 1,
          }}
        >
          Next
        </button>
      </div>
    </div>
  );
};
