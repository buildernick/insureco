import { Grid, Column } from '@carbon/react';

export default function DashboardHome() {
  return (
    <Grid fullWidth>
      <Column lg={16} md={8} sm={4}>
        <section>
          <h1>My Dashboard</h1>
          <p>
            This page has been temporarily stripped back for screen-sharing demos.
          </p>
        </section>
      </Column>

      <Column lg={5} md={4} sm={4}>
        <section>
          <h2>Quick actions</h2>
          <p>Action tiles are temporarily disconnected.</p>
          <ul>
            <li>View Policies</li>
            <li>File a Claim</li>
            <li>Make a Payment</li>
          </ul>
        </section>
      </Column>

      <Column lg={5} md={4} sm={4}>
        <section>
          <h2>Summary</h2>
          <p>Dashboard metrics are temporarily hidden.</p>
          <ul>
            <li>Active Policies</li>
            <li>Open Claims</li>
            <li>Total Monthly Premium</li>
          </ul>
        </section>
      </Column>

      <Column lg={6} md={8} sm={4}>
        <section>
          <h2>Data sections</h2>
          <p>Tables and cards are currently placeholder-only.</p>
          <ul>
            <li>My Policies</li>
            <li>Recent Claims</li>
            <li>Digital Insurance Cards</li>
          </ul>
        </section>
      </Column>

      <Column lg={16} md={8} sm={4}>
        <section>
          <h2>Temporary demo state</h2>
          <p>
            Styling, populated values, and interactive wiring have been removed so the dashboard can be rebuilt one layer at a time.
          </p>
        </section>
      </Column>
    </Grid>
  );
}
