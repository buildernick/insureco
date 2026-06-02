import { Button } from '@carbon/react';
import { CheckmarkFilled, ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import './SplitHero.scss';

export default function SplitHero({
  heading = 'Insurance Heading',
  description = 'Describe the product here.',
  bullets = [],
  ctaText = 'Learn More',
  ctaUrl = '/signup',
  image = '',
  imageAlt = '',
  imagePosition = 'right',
  background = 'primary',
}) {
  const navigate = useNavigate();

  const contentCol = (
    <div className="builder-split-hero__content">
      <h2 className="builder-split-hero__heading">{heading}</h2>
      {description && (
        <p className="builder-split-hero__description">{description}</p>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="builder-split-hero__bullets">
          {bullets.map((bullet, i) => (
            <li key={i}>
              <CheckmarkFilled size={20} />
              {bullet.text}
            </li>
          ))}
        </ul>
      )}
      {ctaText && (
        <Button
          kind="tertiary"
          onClick={() => navigate(ctaUrl)}
          renderIcon={ArrowRight}
        >
          {ctaText}
        </Button>
      )}
    </div>
  );

  const imageCol = (
    <div className="builder-split-hero__image">
      {image ? (
        <img src={image} alt={imageAlt} loading="lazy" />
      ) : (
        <div className="builder-split-hero__image-placeholder" />
      )}
    </div>
  );

  return (
    <section
      className={`builder-split-hero builder-split-hero--bg-${background} builder-split-hero--img-${imagePosition}`}
    >
      <div className="builder-split-hero__grid">
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
      </div>
    </section>
  );
}
