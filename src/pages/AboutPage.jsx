import React from "react";
import { Grid, Column, Tile } from "@carbon/react";

export default function AboutPage() {
  return (
    <Grid fullWidth>
      <Column lg={12} md={8} sm={4}>
        <Tile>
          <h2>About This App</h2>
          <img
            src="https://static.wikia.nocookie.net/meme/images/7/71/BusinessCat2.jpg/revision/latest/scale-to-width-down/800?cb=20110826211824"
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
