import { register } from '@builder.io/sdk-react';

export function registerBuilderTokens() {
  register('editor.settings', {
    designTokens: {
      colors: [
        // Base palette
        { name: 'White', value: '#ffffff' },
        { name: 'Black', value: '#000000' },
        { name: 'Off Black', value: '#161616' },
        { name: 'Grey Light', value: '#f4f4f4' },
        { name: 'Grey Mid', value: '#6f6f6f' },
        { name: 'Burgundy', value: 'rgb(132, 23, 47)' },

        // Semantic roles
        { name: 'Page Background', value: '#ffffff' },
        { name: 'Announcement Background', value: 'rgb(132, 23, 47)' },
        { name: 'Text Primary', value: '#161616' },
        { name: 'Text Secondary', value: '#6f6f6f' },
        { name: 'Text On Dark', value: '#ffffff' },
        { name: 'Link Color', value: '#161616' },
        { name: 'Link Hover', value: '#6f6f6f' },

        // Navigation
        { name: 'Nav Background', value: '#ffffff' },
        { name: 'Nav Border', value: 'rgb(222, 222, 222)' },
        { name: 'Dropdown Background', value: '#ffffff' },
        { name: 'Dropdown Link Color', value: 'rgb(51, 51, 51)' },

        // PLP Tile
        { name: 'Badge Background', value: 'rgb(242, 242, 242)' },
        { name: 'Overlay Background', value: 'rgb(59, 59, 59)' },
        { name: 'Price Color', value: 'rgb(96, 94, 92)' },
        { name: 'Swatch Border', value: 'rgb(236, 236, 236)' },
      ],

      fontFamily: [
        { name: 'Proxima Nova', value: 'proxima-nova, Helvetica, sans-serif' },
      ],

      fontSize: [
        { name: 'XS (12px)', value: '0.75rem' },
        { name: 'SM (14px)', value: '0.875rem' },
        { name: 'MD (16px)', value: '1rem' },
        { name: 'LG (20px)', value: '1.25rem' },
        { name: 'XL (24px)', value: '1.5rem' },
        { name: '2XL (32px)', value: '2rem' },
      ],

      spacing: [
        { name: 'XS (8px)', value: '0.5rem' },
        { name: 'SM (12px)', value: '0.75rem' },
        { name: 'MD (16px)', value: '1rem' },
        { name: 'LG (24px)', value: '1.5rem' },
        { name: 'XL (32px)', value: '2rem' },
        { name: '2XL (48px)', value: '3rem' },
        { name: 'Card Gap (24px)', value: '1.5rem' },
        { name: 'Card Inner Gap (20px)', value: '1.25rem' },
        { name: 'Nav Padding X (45px)', value: '45px' },
        { name: 'Nav Padding Y (15px)', value: '15px' },
        { name: 'Nav Gap (35px)', value: '35px' },
        { name: 'Dropdown Padding Top (40px)', value: '40px' },
        { name: 'Dropdown Padding Bottom (47px)', value: '47px' },
      ],

      borderRadius: [
        { name: 'None (0)', value: '0' },
        { name: 'Video (1px)', value: '1px' },
      ],
    },
  });
}
