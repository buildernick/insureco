import React from 'react';
import { ThemeProvider } from '../src/contexts/ThemeContext';
import '../src/index.scss';

/** @type { import('@storybook/react').Preview } */
const preview = {
  parameters: {
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },
    backgrounds: {
      disable: true, // Disable default backgrounds since we use Carbon themes
    },
    options: {
      storySort: {
        order: ['Web Components', 'Components', '*'],
      },
    },
  },
  decorators: [
    (Story) => (
      <ThemeProvider>
        <div style={{ padding: '2rem' }}>
          <Story />
        </div>
      </ThemeProvider>
    ),
  ],
  globalTypes: {
    theme: {
      description: 'Carbon theme',
      defaultValue: 'white',
      toolbar: {
        title: 'Theme',
        icon: 'circlehollow',
        items: [
          { value: 'white', title: 'White (Light)', icon: 'sun' },
          { value: 'g10', title: 'Gray 10 (Light)', icon: 'sun' },
          { value: 'g90', title: 'Gray 90 (Dark)', icon: 'moon' },
          { value: 'g100', title: 'Gray 100 (Dark)', icon: 'moon' },
        ],
        dynamicTitle: true,
      },
    },
  },
};

// Add theme switcher
preview.decorators.push((Story, context) => {
  const theme = context.globals.theme || 'white';
  
  React.useEffect(() => {
    document.documentElement.setAttribute('data-carbon-theme', theme);
  }, [theme]);

  return <Story />;
});

export default preview;
