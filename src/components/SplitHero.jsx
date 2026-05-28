import React, { useEffect, useRef } from 'react';
import { Grid, Column, Button } from '@carbon/react';
import { CheckmarkFilled, ArrowRight } from '@carbon/icons-react';
import './SplitHero.scss';

export default function SplitHero({
  image,
  imageAlt = '',
  imagePosition = 'right',
  icon,
  headline,
  description,
  features = [],
  button,
  background = 'primary',
  id,
}) {
  const sectionRef = useRef(null);

  useEffect(() => {
    const section = sectionRef.current;
    if (!section) return;

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.querySelectorAll('.scroll-reveal').forEach((el) => {
              el.classList.add('is-visible');
            });
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(section);
    return () => observer.disconnect();
  }, []);

  const contentReveal = imagePosition === 'right' ? 'reveal-left' : 'reveal-right';
  const imageReveal = imagePosition === 'right' ? 'reveal-right' : 'reveal-left';

  const contentCol = (
    <Column lg={8} md={4} sm={4}>
      <div className={`split-hero__content scroll-reveal ${contentReveal}`}>
        {icon && <div className="split-hero__icon">{icon}</div>}
        <h2 className="split-hero__heading">{headline}</h2>
        {description && <p className="split-hero__description">{description}</p>}
        {features.length > 0 && (
          <ul className="split-hero__features">
            {features.map((feature, i) => (
              <li key={i}>
                <CheckmarkFilled size={20} />
                {feature}
              </li>
            ))}
          </ul>
        )}
        {button && (
          <Button
            kind="tertiary"
            onClick={button.onClick}
            renderIcon={button.icon ?? ArrowRight}
          >
            {button.label}
          </Button>
        )}
      </div>
    </Column>
  );

  const imageCol = (
    <Column lg={8} md={4} sm={4}>
      <div className={`split-hero__image scroll-reveal ${imageReveal}`} style={{ '--reveal-delay': '120ms' }}>
        <img src={image} alt={imageAlt} loading="lazy" />
      </div>
    </Column>
  );

  return (
    <section
      ref={sectionRef}
      id={id}
      className={`split-hero split-hero--bg-${background} split-hero--image-${imagePosition}`}
    >
      <Grid>
        {imagePosition === 'left' ? (
          <>
            {imageCol}
            {contentCol}
          </>
        ) : (
          <>
            {contentCol}
            {imageCol}
          </>
        )}
      </Grid>
    </section>
  );
}
