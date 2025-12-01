import React from 'react';
import { Grid, Column, Heading, Tile } from '@carbon/react';

export default function SignUpPage() {
  return (
    <Grid>
      <Column lg={16} md={8} sm={4}>
        <Tile style={{ padding: 'var(--spacing-09)', textAlign: 'center', marginTop: 'var(--spacing-09)' }}>
          <Heading style={{ marginBottom: 'var(--spacing-05)' }}>
            Sign Up Flow Coming Soon
          </Heading>
          <p style={{ fontSize: 'var(--body-lg-size)', color: 'var(--text-secondary)' }}>
            The seven-step sign-up flow will be implemented next, as described in the PRD.
          </p>
        </Tile>
      </Column>
    </Grid>
  );
}
