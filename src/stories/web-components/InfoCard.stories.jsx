import React from 'react';
import { Grid, Column } from '@carbon/react';
import { Car, Home, Security, Phone } from '@carbon/icons-react';
import InfoCard from '../../components/InfoCard';

export default {
  title: 'Web Components/InfoCard',
  component: InfoCard,
  argTypes: {
    icon: { control: false },
  },
};

export const Default = {
  args: {
    title: 'Car Insurance',
    description: 'Comprehensive coverage for your vehicle including collision, liability, and roadside assistance.',
    icon: <Car size={32} />,
  },
};

export const NoIcon = {
  args: {
    title: 'Flexible Payment Plans',
    description: 'Choose monthly, quarterly, or annual billing to suit your budget.',
  },
};

export const NoDescription = {
  args: {
    title: 'Home Insurance',
    icon: <Home size={32} />,
  },
};

export const CardGrid = () => (
  <Grid>
    {[
      { icon: <Car size={32} />, title: 'Car Insurance', description: 'Full coverage for your vehicle on every road.' },
      { icon: <Home size={32} />, title: 'Home Insurance', description: 'Protect your property and personal belongings.' },
      { icon: <Security size={32} />, title: 'Bundle & Save', description: 'Combine policies and save up to 25% on premiums.' },
      { icon: <Phone size={32} />, title: '24/7 Support', description: 'Our team is always available when you need us most.' },
    ].map((card) => (
      <Column lg={4} md={4} sm={4} key={card.title}>
        <InfoCard {...card} />
      </Column>
    ))}
  </Grid>
);
