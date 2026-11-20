import React, { useState } from 'react';
import { Button, Stack } from '@carbon/react';
import { ArrowLeft, ArrowRight } from '@carbon/icons-react';
import TabsStepper from '../components/TabsStepper';

const signUpSteps = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'contact', label: 'Contact' },
  { key: 'address', label: 'Address' },
  { key: 'car', label: 'Car Details' },
  { key: 'home', label: 'Home Details' },
  { key: 'coverage', label: 'Coverage' },
  { key: 'review', label: 'Review' },
];

const shortSteps = signUpSteps.slice(0, 3);

const placeholderPanel = (step) => (
  <p style={{ padding: 'var(--spacing-05)', color: 'var(--text-secondary)' }}>
    {step.label} form content would go here
  </p>
);

export default {
  title: 'Components/TabsStepper',
  component: TabsStepper,
  decorators: [
    (Story) => (
      <div style={{ padding: 'var(--spacing-07)' }}>
        <Story />
      </div>
    ),
  ],
  argTypes: {
    currentIndex: {
      control: { type: 'number', min: 0, max: signUpSteps.length - 1 },
    },
    ariaLabel: { control: 'text' },
  },
};

export const Default = {
  args: {
    steps: signUpSteps,
    currentIndex: 2,
    ariaLabel: 'Sign-up steps',
    renderPanel: placeholderPanel,
  },
};

export const FirstStep = {
  args: { ...Default.args, currentIndex: 0 },
};

export const LastStep = {
  args: { ...Default.args, currentIndex: signUpSteps.length - 1 },
};

export const FewSteps = {
  args: { ...Default.args, steps: shortSteps, currentIndex: 1 },
};

export const WithoutPanelContent = {
  args: { ...Default.args, renderPanel: undefined },
};

export const Interactive = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  return (
    <Stack gap={6}>
      <TabsStepper
        steps={signUpSteps}
        currentIndex={currentIndex}
        ariaLabel="Sign-up steps"
        renderPanel={placeholderPanel}
      />
      <Stack gap={3} orientation="horizontal">
        <Button
          kind="secondary"
          renderIcon={ArrowLeft}
          disabled={currentIndex === 0}
          onClick={() => setCurrentIndex((i) => i - 1)}
        >
          Back
        </Button>
        <Button
          kind="primary"
          renderIcon={ArrowRight}
          disabled={currentIndex === signUpSteps.length - 1}
          onClick={() => setCurrentIndex((i) => i + 1)}
        >
          Next
        </Button>
      </Stack>
    </Stack>
  );
};

export const MobileViewport = {
  args: Default.args,
  parameters: {
    viewport: { defaultViewport: 'mobile1' },
  },
};
