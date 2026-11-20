import React from 'react';
import { Tabs, TabList, Tab, TabPanels, TabPanel } from '@carbon/react';
import { Checkmark } from '@carbon/icons-react';
import './TabsStepper.scss';

/**
 * TabsStepper - Carbon Tabs used as a horizontal stepper.
 *
 * @param {Array} props.steps - [{ key, label }]
 * @param {number} props.currentIndex - Current step (0-based). Only the current tab is enabled.
 * @param {string} props.ariaLabel - Accessible label for the tab list
 * @param {Function} props.renderPanel - Optional (step, index) => node for each step's panel
 */
export default function TabsStepper({
  steps,
  currentIndex = 0,
  ariaLabel = 'Steps',
  renderPanel,
}) {
  return (
    <Tabs selectedIndex={currentIndex}>
      <TabList aria-label={ariaLabel} className="tabs-stepper">
        {steps.map((step, index) => (
          <Tab
            key={step.key || index}
            disabled={index !== currentIndex}
            className={`tabs-stepper-tab ${
              index < currentIndex ? 'tabs-stepper-tab--complete' : ''
            }`}
          >
            <span className="tabs-stepper-tab-marker">
              {index < currentIndex ? <Checkmark size={16} /> : index + 1}
            </span>
            <span className="tabs-stepper-tab-label">{step.label}</span>
          </Tab>
        ))}
      </TabList>
      <TabPanels>
        {steps.map((step, index) => (
          <TabPanel key={step.key || index}>
            {renderPanel ? renderPanel(step, index) : null}
          </TabPanel>
        ))}
      </TabPanels>
    </Tabs>
  );
}
