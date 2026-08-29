import React, { useState } from 'react';
import ProgressBarStepper from '../components/ProgressBarStepper';
import { Button, Stack, Tile, Heading } from '@carbon/react';
import { ArrowLeft, ArrowRight } from '@carbon/icons-react';

export default {
  title: 'Components/ProgressBarStepper',
  component: ProgressBarStepper,
  tags: ['autodocs'],
  parameters: {
    docs: {
      description: {
        component: `
## Progress Bar with Step Counter (Option 2)

A comprehensive progress indicator that combines Carbon's ProgressBar component with a vertical step list. 
This pattern provides both visual progress feedback (percentage bar) and detailed step status (list with checkmarks).

### Key Features

- **Visual Progress Bar**: Shows overall completion percentage at a glance
- **Detailed Step List**: Vertical list showing all steps with status indicators
- **Clear Current Step**: Highlighted with brand color and background
- **Completed Steps**: Marked with checkmarks and subtle strikethrough
- **Mobile-Friendly**: Vertical layout prevents horizontal scrolling
- **Theme-Aware**: Works perfectly in both light and dark modes
- **Carbon Integration**: Uses standard Carbon ProgressBar component

### When to Use

- Multi-step forms with 4-7+ steps
- When users need to see all steps for context
- When visual progress percentage is important
- Mobile-first applications where horizontal scrolling is problematic
- Wizard-style flows where users move linearly through steps

### Pros

✅ Visual progress bar shows completion percentage  
✅ Compact bar at top, detailed list below  
✅ Clear current step highlighted  
✅ Easy to understand at a glance  
✅ Uses standard Carbon component  
✅ Good for forms with many steps  

### Cons

❌ Still shows all steps (vertical scrolling with many steps)  
❌ More complex layout structure than simple indicators  
❌ Takes up vertical space for step list  
❌ Some redundant information (bar + list)  

### Alternative Components

- **ProgressIndicator (Vertical)**: Carbon's standard vertical stepper
- **StepBreadcrumb**: Custom horizontal breadcrumb-style stepper
- **Circular Mini-Stepper**: Shows only 2-3 steps at a time (most compact)
        `,
      },
    },
  },
  argTypes: {
    currentIndex: {
      control: { type: 'number', min: 0, max: 6 },
      description: 'Current step index (0-based)',
    },
    label: {
      control: 'text',
      description: 'Label for the progress bar',
    },
    steps: {
      control: 'object',
      description: 'Array of step objects with label and key',
    },
  },
};

// Sample step data
const defaultSteps = [
  { key: 'personal', label: 'Personal Info' },
  { key: 'contact', label: 'Contact Details' },
  { key: 'address', label: 'Address' },
  { key: 'car', label: 'Car Details' },
  { key: 'home', label: 'Home Details' },
  { key: 'coverage', label: 'Coverage Options' },
  { key: 'review', label: 'Review & Submit' },
];

const shortSteps = [
  { key: 'account', label: 'Create Account' },
  { key: 'profile', label: 'Complete Profile' },
  { key: 'verify', label: 'Verify Email' },
  { key: 'done', label: 'All Done' },
];

// ============================================
// Stories
// ============================================

export const Default = {
  args: {
    steps: defaultSteps,
    currentIndex: 2,
    label: 'Sign-up Progress',
  },
};

export const FirstStep = {
  args: {
    steps: defaultSteps,
    currentIndex: 0,
    label: 'Sign-up Progress',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at the beginning - no completed steps yet.',
      },
    },
  },
};

export const MiddleStep = {
  args: {
    steps: defaultSteps,
    currentIndex: 3,
    label: 'Sign-up Progress',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar in the middle - shows completed steps with checkmarks.',
      },
    },
  },
};

export const LastStep = {
  args: {
    steps: defaultSteps,
    currentIndex: 6,
    label: 'Sign-up Progress',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar at the final step - marked as "finished" status.',
      },
    },
  },
};

export const ShortFlow = {
  args: {
    steps: shortSteps,
    currentIndex: 1,
    label: 'Account Setup',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with fewer steps (4 steps total).',
      },
    },
  },
};

export const LongFlow = {
  args: {
    steps: [
      { key: 'step1', label: 'Getting Started' },
      { key: 'step2', label: 'Basic Information' },
      { key: 'step3', label: 'Contact Details' },
      { key: 'step4', label: 'Address & Location' },
      { key: 'step5', label: 'Vehicle Information' },
      { key: 'step6', label: 'Property Information' },
      { key: 'step7', label: 'Coverage Selection' },
      { key: 'step8', label: 'Add-ons & Options' },
      { key: 'step9', label: 'Payment Method' },
      { key: 'step10', label: 'Review & Confirm' },
    ],
    currentIndex: 4,
    label: 'Application Progress',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with many steps (10 steps) - shows vertical scrolling behavior.',
      },
    },
  },
};

export const CustomLabel = {
  args: {
    steps: defaultSteps,
    currentIndex: 2,
    label: 'Insurance Application',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar with custom label text.',
      },
    },
  },
};

// ============================================
// Interactive Demo with Controls
// ============================================

const InteractiveTemplate = (args) => {
  const [currentStep, setCurrentStep] = useState(args.currentIndex);

  const handleNext = () => {
    if (currentStep < args.steps.length - 1) {
      setCurrentStep(currentStep + 1);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(currentStep - 1);
    }
  };

  const handleReset = () => {
    setCurrentStep(0);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <Heading style={{ marginBottom: '1.5rem' }}>Interactive Progress Bar Stepper</Heading>
      
      <Tile style={{ marginBottom: '1.5rem', background: 'var(--background-secondary)' }}>
        <Stack gap={4}>
          <p style={{ margin: 0, color: 'var(--text-primary)' }}>
            Current: <strong>Step {currentStep + 1} of {args.steps.length}</strong>
          </p>
          <Stack gap={3} orientation="horizontal">
            <Button
              kind="secondary"
              onClick={handleBack}
              disabled={currentStep === 0}
              renderIcon={ArrowLeft}
            >
              Back
            </Button>
            <Button
              kind="primary"
              onClick={handleNext}
              disabled={currentStep === args.steps.length - 1}
              renderIcon={ArrowRight}
            >
              Next
            </Button>
            <Button
              kind="tertiary"
              onClick={handleReset}
            >
              Reset
            </Button>
          </Stack>
        </Stack>
      </Tile>

      <ProgressBarStepper
        steps={args.steps}
        currentIndex={currentStep}
        label={args.label}
      />

      <Tile style={{ marginTop: '2rem', padding: '1rem' }}>
        <p style={{ margin: 0, fontSize: '14px', color: 'var(--text-secondary)' }}>
          💡 <strong>Tip:</strong> Use the Back/Next buttons to navigate through the steps and see 
          how the progress bar and step list update. Notice how completed steps show checkmarks 
          and the current step is highlighted with the brand color.
        </p>
      </Tile>
    </div>
  );
};

export const InteractiveDemo = {
  render: InteractiveTemplate,
  args: {
    steps: defaultSteps,
    currentIndex: 2,
    label: 'Sign-up Progress',
  },
  parameters: {
    docs: {
      description: {
        story: `
### Interactive Demo

Click "Back" and "Next" to navigate through the steps and see the progress bar in action.

**What to observe:**
- Progress bar percentage increases/decreases
- Completed steps show green checkmarks
- Current step has brand color highlight and background
- Future steps show just numbers
- Helper text updates to show current step name
        `,
      },
    },
  },
};

// ============================================
// Mobile Responsive Demo
// ============================================

export const MobileView = {
  args: {
    steps: defaultSteps,
    currentIndex: 3,
    label: 'Sign-up Progress',
  },
  parameters: {
    viewport: {
      defaultViewport: 'mobile1',
    },
    docs: {
      description: {
        story: 'Progress bar optimized for mobile view - vertical layout prevents horizontal scrolling.',
      },
    },
  },
};

export const TabletView = {
  args: {
    steps: defaultSteps,
    currentIndex: 3,
    label: 'Sign-up Progress',
  },
  parameters: {
    viewport: {
      defaultViewport: 'tablet',
    },
    docs: {
      description: {
        story: 'Progress bar on tablet view.',
      },
    },
  },
};

// ============================================
// Theme Comparison
// ============================================

const ThemeComparisonTemplate = (args) => (
  <div style={{ padding: '2rem' }}>
    <Heading style={{ marginBottom: '1.5rem' }}>Light Theme</Heading>
    <div data-carbon-theme="white" style={{ padding: '1rem', background: '#ffffff' }}>
      <ProgressBarStepper {...args} />
    </div>

    <Heading style={{ marginTop: '3rem', marginBottom: '1.5rem' }}>Dark Theme</Heading>
    <div data-carbon-theme="g100" style={{ padding: '1rem', background: '#161616' }}>
      <ProgressBarStepper {...args} />
    </div>
  </div>
);

export const ThemeComparison = {
  render: ThemeComparisonTemplate,
  args: {
    steps: defaultSteps,
    currentIndex: 3,
    label: 'Sign-up Progress',
  },
  parameters: {
    docs: {
      description: {
        story: 'Progress bar component in both light and dark themes side by side.',
      },
    },
  },
};

// ============================================
// Real-World Example: Insurance Sign-Up
// ============================================

const RealWorldTemplate = () => {
  const [currentStep, setCurrentStep] = useState(0);

  const steps = [
    { key: 'personal', label: 'Personal Information' },
    { key: 'contact', label: 'Contact & Address' },
    { key: 'vehicle', label: 'Vehicle Details' },
    { key: 'property', label: 'Property Details' },
    { key: 'coverage', label: 'Coverage Selection' },
    { key: 'payment', label: 'Payment Setup' },
    { key: 'review', label: 'Review & Submit' },
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

  return (
    <div style={{ padding: '2rem', maxWidth: '800px', margin: '0 auto' }}>
      <Heading style={{ marginBottom: '1rem' }}>Insurance Application</Heading>
      <p style={{ marginBottom: '2rem', color: 'var(--text-secondary)' }}>
        Complete all steps to submit your insurance application. You can go back 
        and edit previous sections at any time.
      </p>

      <ProgressBarStepper
        steps={steps}
        currentIndex={currentStep}
        label="Application Progress"
      />

      <Tile style={{ marginTop: '2rem', padding: '2rem', minHeight: '200px' }}>
        <Heading as="h3" style={{ marginBottom: '1rem' }}>
          {steps[currentStep].label}
        </Heading>
        <p style={{ color: 'var(--text-secondary)', marginBottom: '2rem' }}>
          Form content for "{steps[currentStep].label}" would appear here. This is where 
          the user would fill out information specific to this step.
        </p>

        <Stack gap={3} orientation="horizontal">
          <Button
            kind="secondary"
            onClick={handleBack}
            disabled={currentStep === 0}
            renderIcon={ArrowLeft}
          >
            Back
          </Button>
          <Button
            kind="primary"
            onClick={handleNext}
            disabled={currentStep === steps.length - 1}
            renderIcon={ArrowRight}
          >
            {currentStep === steps.length - 1 ? 'Submit Application' : 'Continue'}
          </Button>
        </Stack>
      </Tile>
    </div>
  );
};

export const RealWorldExample = {
  render: RealWorldTemplate,
  parameters: {
    docs: {
      description: {
        story: `
### Real-World Example: Insurance Application

A complete example showing how the ProgressBarStepper integrates into a multi-step insurance application form.

**Features demonstrated:**
- Progress bar shows overall completion
- Step list provides context of all steps
- Form content area changes based on current step
- Back/Continue buttons for navigation
- Submit button appears on final step
        `,
      },
    },
  },
};
