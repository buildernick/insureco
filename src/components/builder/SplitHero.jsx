import { useState, useEffect, useRef } from 'react';
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
  cycleInterval = 3000,
}) {
  const navigate = useNavigate();
  const bulletsWithImages = bullets.filter((b) => b.image);
  const hasCycle = bulletsWithImages.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const intervalRef = useRef(null);

  useEffect(() => {
    if (!hasCycle) return;

    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => (prev + 1) % bulletsWithImages.length);
    }, Math.max(500, cycleInterval));

    return () => clearInterval(intervalRef.current);
  }, [hasCycle, bulletsWithImages.length, cycleInterval]);

  const activeBullet = hasCycle ? bulletsWithImages[activeIndex] : bulletsWithImages[0];
  const displayedImage = activeBullet?.image ?? image;
  const displayedAlt = activeBullet?.imageAlt ?? imageAlt;

  const contentCol = (
    <div className="builder-split-hero__content">
      <h2 className="builder-split-hero__heading">{heading}</h2>
      {description && (
        <p className="builder-split-hero__description">{description}</p>
      )}
      {bullets && bullets.length > 0 && (
        <ul className="builder-split-hero__bullets">
          {bullets.map((bullet, i) => {
            const cycleIdx = bulletsWithImages.indexOf(bullet);
            const isActive = hasCycle && cycleIdx === activeIndex;
            return (
              <li
                key={i}
                className={isActive ? 'builder-split-hero__bullet--active' : ''}
              >
                <CheckmarkFilled size={20} />
                {bullet.text}
              </li>
            );
          })}
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
      {displayedImage ? (
        <img key={displayedImage} src={displayedImage} alt={displayedAlt} loading="lazy" />
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
