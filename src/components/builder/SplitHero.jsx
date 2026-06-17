import { useState, useEffect, useRef } from 'react';
import { Button } from '@carbon/react';
import { Add, Subtract, ArrowRight } from '@carbon/icons-react';
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

  // null = nothing expanded
  const [activeIndex, setActiveIndex] = useState(null);
  const [shownImage, setShownImage] = useState(() => image);
  const [shownAlt, setShownAlt] = useState(() => imageAlt);
  const [fading, setFading] = useState(false);
  const intervalRef = useRef(null);
  const timerIndexRef = useRef(0);

  const swapImage = (nextImage, nextAlt, nextIdx) => {
    setFading(true);
    setTimeout(() => {
      setShownImage(nextImage || image);
      setShownAlt(nextAlt || imageAlt);
      setActiveIndex(nextIdx);
      setFading(false);
    }, FADE_DURATION);
  };

  const startTimer = (fromIdx = 0) => {
    clearInterval(intervalRef.current);
    if (!hasCycle) return;
    timerIndexRef.current = fromIdx;
    intervalRef.current = setInterval(() => {
      const next = (timerIndexRef.current + 1) % bulletsWithImages.length;
      timerIndexRef.current = next;
      const target = bulletsWithImages[next];
      swapImage(target?.image, target?.imageAlt, next);
    }, Math.max(500, cycleInterval));
  };

  useEffect(() => {
    startTimer(0);
    return () => clearInterval(intervalRef.current);
  }, [hasCycle, bulletsWithImages.length, cycleInterval]);

  const handleBulletClick = (cycleIdx) => {
    // Toggle collapse if already active
    if (cycleIdx === activeIndex) {
      setActiveIndex(null);
      swapImage(image, imageAlt, null);
      startTimer(cycleIdx);
      return;
    }
    const target = bulletsWithImages[cycleIdx];
    swapImage(target?.image, target?.imageAlt, cycleIdx);
    startTimer(cycleIdx);
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
            const isClickable = cycleIdx !== -1;
            const isActive = isClickable && cycleIdx === activeIndex;
            const Icon = isActive ? Subtract : Add;

            return (
              <li
                key={i}
                className={[
                  'builder-split-hero__bullet-item',
                  isActive ? 'builder-split-hero__bullet-item--active' : '',
                  isClickable ? 'builder-split-hero__bullet-item--clickable' : '',
                ].filter(Boolean).join(' ')}
                onClick={isClickable ? () => handleBulletClick(cycleIdx) : undefined}
              >
                <div className="builder-split-hero__bullet-row">
                  <Icon size={20} className="builder-split-hero__bullet-icon" />
                  <span className="builder-split-hero__bullet-text">{bullet.text}</span>
                </div>
                {bullet.subtitle && (
                  <div
                    className={[
                      'builder-split-hero__bullet-subtitle',
                      isActive ? 'builder-split-hero__bullet-subtitle--open' : '',
                    ].filter(Boolean).join(' ')}
                  >
                    <p>{bullet.subtitle}</p>
                  </div>
                )}
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
