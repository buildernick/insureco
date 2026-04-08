import { Grid, Column } from '@carbon/react';

const quickActions = ['View Policies', 'File a Claim', 'Make a Payment'];

const summaryBlocks = [
  'Summary block 1',
  'Summary block 2',
  'Summary block 3',
];

const dashboardSections = [
  {
    title: 'Policies',
    description: 'Policy data is temporarily removed for the demo rebuild.',
  },
  {
    title: 'Claims',
    description: 'Claim activity is temporarily removed for the demo rebuild.',
  },
  {
    title: 'Digital insurance cards',
    description: 'Card details and downloads are temporarily removed for the demo rebuild.',
  },
];

export default function DashboardHome() {
  return (
    <Grid fullWidth>
      <Column lg={16} md={8} sm={4}>
        <h1>Dashboard</h1>
        <p>
          This page has been temporarily stripped back so it can be rebuilt live,
          one layer at a time, during the demo.
        </p>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <section>
          <h2>Quick actions</h2>
          <ul>
            {quickActions.map((action) => (
              <li key={action}>{action}</li>
            ))}
          </ul>
        </section>
      </Column>

      {summaryBlocks.map((label) => (
        <Column key={label} lg={5} md={4} sm={4}>
          <section>
            <h2>{label}</h2>
            <p>Content removed temporarily.</p>
          </section>
        </Column>
      ))}

      {dashboardSections.map((section) => (
        <Column key={section.title} lg={16} md={8} sm={4}>
          <section>
            <h2>{section.title}</h2>
            <p>{section.description}</p>
          </section>
        </Column>
      ))}
    </Grid>
  );
}
