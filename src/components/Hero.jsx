import React, { useEffect, useRef } from 'react';
import { ArrowRight } from '@carbon/icons-react';
import './Hero.scss';

export default function Hero({ headline, subtitle, primaryButton, secondaryButton, backgroundImage }) {
  const sectionRef = useRef(null);
  const hasImage = Boolean(backgroundImage);
  const sectionClass = `hero-section${hasImage ? ' hero-section--with-image' : ''}`;
  const imageVar = hasImage ? { '--hero-bg-image': `url('${backgroundImage}')` } : {};

  // Parallax: shift background-position-y as user scrolls
  useEffect(() => {
    if (!hasImage) return;
    const section = sectionRef.current;
    if (!section) return;

    let ticking = false;

    const onScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          const scrollY = window.scrollY;
          const sectionBottom = section.offsetTop + section.offsetHeight;
          if (scrollY <= sectionBottom) {
            section.style.setProperty('--parallax-offset', `${scrollY * 0.55}px`);
          }
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, [hasImage]);

  return (
    <section ref={sectionRef} className={sectionClass} style={imageVar}>
      <div className="hero-content">
        <h1 className="hero-heading hero-animate">{headline}</h1>
        {subtitle && <p className="hero-tagline hero-animate hero-animate--delay-1">{subtitle}</p>}
        {(primaryButton || secondaryButton) && (
          <div className="hero-actions hero-animate hero-animate--delay-2">
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
