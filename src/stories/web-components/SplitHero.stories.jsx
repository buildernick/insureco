import React from 'react';
import { Car, Home } from '@carbon/icons-react';
import SplitHero from '../../components/SplitHero';

export default {
  title: 'Web Components/SplitHero',
  component: SplitHero,
  argTypes: {
    imagePosition: {
      options: ['left', 'right'],
      control: { type: 'radio' },
    },
    background: {
      options: ['primary', 'secondary', 'tertiary'],
      control: { type: 'select' },
    },
    icon: { control: false },
    button: { control: false },
    features: { control: false },
  },
};

const carImage = 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?w=800&q=80';
const homeImage = 'https://images.unsplash.com/photo-1570129477492-45c003edd2be?w=800&q=80';

export const CarInsurance = {
  args: {
    headline: 'Car Insurance Built for You',
    description:
      'Get comprehensive coverage that fits your lifestyle and budget. From liability to full collision, InsureCo has you covered on every road.',
    image: carImage,
    imageAlt: 'A car on a road',
    imagePosition: 'right',
    background: 'primary',
    icon: <Car size={32} />,
    features: ['Liability coverage', 'Collision & comprehensive', '24/7 roadside assistance'],
    button: { label: 'Get a Car Quote', onClick: () => {} },
  },
};

export const HomeInsurance = {
  args: {
    headline: 'Home Insurance You Can Trust',
    description:
      'Protect your home and everything inside it. InsureCo offers flexible plans for homeowners and renters alike.',
    image: homeImage,
    imageAlt: 'A family home',
    imagePosition: 'left',
    background: 'secondary',
    icon: <Home size={32} />,
    features: ['Dwelling & structure', 'Personal property', 'Liability protection'],
    button: { label: 'Get a Home Quote', onClick: () => {} },
  },
};

export const ImageLeft = {
  args: {
    headline: 'Bundle & Save Up to 25%',
    description: 'Combine your car and home insurance with InsureCo and unlock exclusive multi-policy discounts.',
    image: carImage,
    imageAlt: 'Car and home bundle',
    imagePosition: 'left',
    background: 'tertiary',
    features: ['Multi-policy discount', 'Single renewal date', 'One point of contact'],
    button: { label: 'Explore Bundles', onClick: () => {} },
  },
};

export const NoFeatures = {
  args: {
    headline: 'Simple, Transparent Pricing',
    description: 'No hidden fees, no surprises. Pay only for what you need with InsureCo.',
    image: homeImage,
    imageAlt: 'A modern home',
    imagePosition: 'right',
    background: 'primary',
    button: { label: 'View Pricing', onClick: () => {} },
  },
};
