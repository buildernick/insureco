import { register } from '@builder.io/sdk-react';

export function registerBuilderTokens() {
  register('editor.settings', {
    designTokens: {
      colors: [
        // Brand Red Scale
        { name: 'Brand Red 10', value: '#fff1f1' },
        { name: 'Brand Red 20', value: '#ffd7d9' },
        { name: 'Brand Red 30', value: '#ffb3b8' },
        { name: 'Brand Red 40', value: '#ff8389' },
        { name: 'Brand Red 50', value: '#fa4d56' },
        { name: 'Brand Red 60', value: '#da1e28' },
        { name: 'Brand Red 70', value: '#a2191f' },
        { name: 'Brand Red 80', value: '#750e13' },
        { name: 'Brand Red 90', value: '#520408' },
        { name: 'Brand Red 100', value: '#2d0709' },

        // Brand Blue Scale
        { name: 'Brand Blue 10', value: '#edf5ff' },
        { name: 'Brand Blue 20', value: '#d0e2ff' },
        { name: 'Brand Blue 30', value: '#a6c8ff' },
        { name: 'Brand Blue 40', value: '#78a9ff' },
        { name: 'Brand Blue 50', value: '#4589ff' },
        { name: 'Brand Blue 60', value: '#0f62fe' },
        { name: 'Brand Blue 70', value: '#0043ce' },
        { name: 'Brand Blue 80', value: '#002d9c' },
        { name: 'Brand Blue 90', value: '#001d6c' },
        { name: 'Brand Blue 100', value: '#001141' },

        // Semantic Status Colors
        { name: 'Success', value: '#198038' },
        { name: 'Warning', value: '#d6a000' },
        { name: 'Error', value: '#da1e28' },
        { name: 'Info', value: '#0f62fe' },

        // Semantic UI Tokens (light-theme resolved values)
        { name: 'Interactive Primary', value: '#da1e28' },
        { name: 'Interactive Hover', value: '#a2191f' },
        { name: 'Interactive Active', value: '#750e13' },
        { name: 'Text Primary', value: '#161616' },
        { name: 'Text Secondary', value: '#525252' },
        { name: 'Text Tertiary', value: '#6f6f6f' },
        { name: 'Text On Color', value: '#ffffff' },
        { name: 'Background Primary', value: '#ffffff' },
        { name: 'Background Secondary', value: '#f4f4f4' },
        { name: 'Background Tertiary', value: '#e0e0e0' },
        { name: 'Border Subtle', value: '#e0e0e0' },
        { name: 'Border Strong', value: '#8d8d8d' },
        { name: 'Border Interactive', value: '#da1e28' },
      ],

      fontFamily: [
        { name: 'IBM Plex Sans', value: "'IBM Plex Sans', 'Helvetica Neue', Arial, sans-serif" },
        { name: 'IBM Plex Serif', value: "'IBM Plex Serif', 'Georgia', serif" },
        { name: 'IBM Plex Mono', value: "'IBM Plex Mono', 'Menlo', 'Monaco', monospace" },
      ],

      fontSize: [
        // Heading Scale
        { name: 'H1 (3rem)', value: '3rem' },
        { name: 'H2 (2.25rem)', value: '2.25rem' },
        { name: 'H3 (1.75rem)', value: '1.75rem' },
        { name: 'H4 (1.5rem)', value: '1.5rem' },
        { name: 'H5 (1.25rem)', value: '1.25rem' },
        { name: 'H6 (1.125rem)', value: '1.125rem' },
        // Body Scale
        { name: 'Body LG (1.125rem)', value: '1.125rem' },
        { name: 'Body MD (1rem)', value: '1rem' },
        { name: 'Body SM (0.875rem)', value: '0.875rem' },
        { name: 'Body XS (0.75rem)', value: '0.75rem' },
      ],

      spacing: [
        { name: 'spacing-01 (2px)', value: '0.125rem' },
        { name: 'spacing-02 (4px)', value: '0.25rem' },
        { name: 'spacing-03 (8px)', value: '0.5rem' },
        { name: 'spacing-04 (12px)', value: '0.75rem' },
        { name: 'spacing-05 (16px)', value: '1rem' },
        { name: 'spacing-06 (24px)', value: '1.5rem' },
        { name: 'spacing-07 (32px)', value: '2rem' },
        { name: 'spacing-08 (40px)', value: '2.5rem' },
        { name: 'spacing-09 (48px)', value: '3rem' },
        { name: 'spacing-10 (64px)', value: '4rem' },
        { name: 'spacing-11 (80px)', value: '5rem' },
        { name: 'spacing-12 (96px)', value: '6rem' },
        { name: 'spacing-13 (160px)', value: '10rem' },
        // Semantic gaps
        { name: 'gap-xs (4px)', value: '0.25rem' },
        { name: 'gap-sm (8px)', value: '0.5rem' },
        { name: 'gap-md (16px)', value: '1rem' },
        { name: 'gap-lg (24px)', value: '1.5rem' },
        { name: 'gap-xl (32px)', value: '2rem' },
        { name: 'gap-2xl (48px)', value: '3rem' },
      ],

      borderRadius: [
        { name: 'None (0)', value: '0' },
        { name: 'SM (2px)', value: '0.125rem' },
        { name: 'MD (4px)', value: '0.25rem' },
        { name: 'LG (8px)', value: '0.5rem' },
        { name: 'XL (16px)', value: '1rem' },
        { name: '2XL (24px)', value: '1.5rem' },
        { name: 'Full (pill)', value: '9999px' },
      ],
    },
  });
}
