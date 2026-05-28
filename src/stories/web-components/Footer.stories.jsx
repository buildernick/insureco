import React from 'react';
import Footer from '../../components/Footer';

export default {
  title: 'Web Components/Footer',
  component: Footer,
  parameters: {
    layout: 'fullscreen',
  },
  argTypes: {
    copyright: { control: 'text' },
  },
};

export const Default = {
  args: {
    copyright: '© 2024 InsureCo. All rights reserved.',
  },
};

export const CustomCopyright = {
  args: {
    copyright: '© 2025 InsureCo Holdings LLC. All rights reserved. | Licensed in all 50 states.',
  },
};
