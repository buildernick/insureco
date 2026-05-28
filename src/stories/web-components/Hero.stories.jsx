import React from 'react';
import Hero from '../../components/Hero';

export default {
  title: 'Web Components/Hero',
  component: Hero,
  argTypes: {
    headline: { control: 'text' },
    subtitle: { control: 'text' },
    backgroundImage: { control: 'text' },
    primaryButton: { control: false },
    secondaryButton: { control: false },
  },
};

export const Default = {
  args: {
    headline: 'Protect What Matters Most',
    subtitle: 'Simple, affordable insurance for your car and home — bundled to save you more.',
    primaryButton: { label: 'Get a Quote', onClick: () => {} },
    secondaryButton: { label: 'Learn More', onClick: () => {} },
  },
};

export const WithBackgroundImage = {
  args: {
    headline: 'Drive with Confidence',
    subtitle: 'Comprehensive coverage for every journey, backed by InsureCo.',
    backgroundImage: 'https://images.unsplash.com/photo-1503376780353-7e6692767b70?w=1400&q=80',
    primaryButton: { label: 'Get Started', onClick: () => {} },
    secondaryButton: { label: 'View Plans', onClick: () => {} },
  },
};

export const HeadlineOnly = {
  args: {
    headline: 'Insurance Made Simple',
  },
};

export const WithoutSecondaryButton = {
  args: {
    headline: 'Bundle & Save Today',
    subtitle: 'Combine your car and home insurance for up to 25% off.',
    primaryButton: { label: 'Get a Quote', onClick: () => {} },
  },
};
