import { useState, useEffect, useRef } from 'react';
import { Button } from '@carbon/react';
import { CheckmarkFilled, ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import './SplitHero.scss';

const FADE_DURATION = 300;

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
  cycleInterval = 6000,
}) {
  const navigate = useNavigate();
  const bulletsWithImages = bullets.filter((b) => b.image);
  const hasCycle = bulletsWithImages.length > 1;

  const [activeIndex, setActiveIndex] = useState(0);
  const [shownImage, setShownImage] = useState(
    () => bulletsWithImages[0]?.image ?? image
  );
  const [shownAlt, setShownAlt] = useState(
    () => bulletsWithImages[0]?.imageAlt ?? imageAlt
  );
  const [fading, setFading] = useState(false);
  const intervalRef = useRef(null);

  const goToIndex = (idx) => {
    const target = bulletsWithImages[idx];
    const nextImage = target?.image ?? image;
    const nextAlt = target?.imageAlt ?? imageAlt;

    setFading(true);
    setTimeout(() => {
      setShownImage(nextImage);
      setShownAlt(nextAlt);
      setActiveIndex(idx);
      setFading(false);
    }, FADE_DURATION);
  };

  const startTimer = () => {
    clearInterval(intervalRef.current);
    if (!hasCycle) return;
    intervalRef.current = setInterval(() => {
      setActiveIndex((prev) => {
        const next = (prev + 1) % bulletsWithImages.length;
        const target = bulletsWithImages[next];
        setFading(true);
        setTimeout(() => {
          setShownImage(target?.image ?? image);
          setShownAlt(target?.imageAlt ?? imageAlt);
          setActiveIndex(next);
          setFading(false);
        }, FADE_DURATION);
        return prev;
      });
    }, Math.max(500, cycleInterval));
  };

  useEffect(() => {
    startTimer();
    return () => clearInterval(intervalRef.current);
  }, [hasCycle, bulletsWithImages.length, cycleInterval]);

  const handleBulletClick = (cycleIdx) => {
    if (cycleIdx === activeIndex) return;
    goToIndex(cycleIdx);
    startTimer();
  };

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
            const isClickable = cycleIdx !== -1;
            return (
              <li
                key={i}
                className={[
                  isActive ? 'builder-split-hero__bullet--active' : '',
                  isClickable ? 'builder-split-hero__bullet--clickable' : '',
                ].join(' ').trim()}
                onClick={isClickable ? () => handleBulletClick(cycleIdx) : undefined}
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
      {shownImage ? (
        <img
          src={shownImage}
          alt={shownAlt}
          loading="lazy"
          className={fading ? 'builder-split-hero__img--fading' : ''}
        />
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
