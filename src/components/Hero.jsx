import React from 'react';
import { ArrowRight } from '@carbon/icons-react';
import './Hero.scss';

export default function Hero({ headline, subtitle, primaryButton, secondaryButton, backgroundImage }) {
  const hasImage = Boolean(backgroundImage);
  const sectionClass = `hero-section${hasImage ? ' hero-section--with-image' : ''}`;
  const imageVar = hasImage ? { '--hero-bg-image': `url('${backgroundImage}')` } : {};

  return (
    <section className={sectionClass} style={imageVar}>
      <div className="hero-content">
        <h1 className="hero-heading">{headline}</h1>
        {subtitle && <p className="hero-tagline">{subtitle}</p>}
        {(primaryButton || secondaryButton) && (
          <div className="hero-actions">
            {primaryButton && (
              <button className="hero-btn-primary" onClick={primaryButton.onClick}>
                {primaryButton.label} <ArrowRight size={16} />
              </button>
            )}
            {secondaryButton && (
              <button className="hero-btn-secondary" onClick={secondaryButton.onClick}>
                {secondaryButton.label}
              </button>
            )}
          </div>
        )}
      </div>
    </section>
  );
}
