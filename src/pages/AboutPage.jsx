import React from "react";
import { Grid, Column, Tile } from "@carbon/react";

export default function AboutPage() {
  return (
    <Grid fullWidth>
      <Column lg={12} md={8} sm={4}>
        <Tile>
          <h2>About This App</h2>
          <img
            src="https://cdn.builder.io/api/v1/image/assets%2F4c828a6b97e546bc967a796675ca457e%2F987d6d106c264e85abe2338243829f32?format=webp&width=800&height=1200"
            alt="Business Cat"
            style={{ display: 'block', maxWidth: '100%', marginTop: '1rem', borderRadius: '4px' }}
          />
          <p>
            This dashboard is built with the Carbon Design System and Vite +
            React 19.
          </p>
        </Tile>
      </Column>
    </Grid>
  );
}
