import React from 'react';
import { Grid, Column, Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import './Hero.scss';

export default function Hero({
  image,
  headline,
  subtitle,
  primaryButton,
  secondaryButton,
}) {
  return (
    <section
      className="hero-section"
      style={image ? { backgroundImage: `url(${image})` } : undefined}
    >
      <Grid>
        <Column lg={16} md={8} sm={4}>
          <div className="hero-content">
            <h1 className="hero-heading">{headline}</h1>
            {subtitle && <p className="hero-tagline">{subtitle}</p>}
            {(primaryButton || secondaryButton) && (
              <div className="hero-actions">
                {primaryButton && (
                  <Button
                    kind="primary"
                    size="lg"
                    onClick={primaryButton.onClick}
                    renderIcon={primaryButton.icon ?? ArrowRight}
                  >
                    {primaryButton.label}
                  </Button>
                )}
                {secondaryButton && (
                  <Button
                    kind="secondary"
                    size="lg"
                    onClick={secondaryButton.onClick}
                    renderIcon={secondaryButton.icon}
                  >
                    {secondaryButton.label}
                  </Button>
                )}
              </div>
            )}
          </div>
        </Column>
      </Grid>
    </section>
  );
}
