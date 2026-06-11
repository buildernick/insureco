import React, { useState } from 'react';
import './PlpTile.scss';

export default function PlpTile({
  href,
  imageSrc,
  imageAlt,
  badge,
  name,
  colorway,
  price,
  swatches = [],
  extraColors = 0,
}) {
  const [wishlisted, setWishlisted] = useState(false);

  return (
    <div className="alo-plp-tile">
      <div className="alo-plp-tile__media-wrap">
        <button
          type="button"
          className={`alo-plp-tile__wishlist${wishlisted ? ' alo-plp-tile__wishlist--active' : ''}`}
          aria-label={wishlisted ? 'Remove from wishlist' : 'Add to wishlist'}
          onClick={() => setWishlisted((v) => !v)}
        >
          <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 14 13">
            <path
              fill={wishlisted ? '#000' : '#000'}
              fillRule="evenodd"
              d="M3.472.758C2.11.991.737 2.278.737 4.702c0 .875.374 1.784.975 2.674.6.887 1.405 1.728 2.221 2.458.815.729 1.632 1.34 2.245 1.768a24 24 0 0 0 .822.55l.082-.053a24.342 24.342 0 0 0 2.985-2.265c.816-.73 1.622-1.57 2.22-2.458.602-.89.976-1.799.976-2.674 0-2.425-1.373-3.71-2.735-3.944a2.589 2.589 0 0 0-1.962.438c-.569.409-1.031 1.1-1.202 2.12h-.728c-.17-1.019-.633-1.711-1.202-2.12A2.588 2.588 0 0 0 3.472.758"
              clipRule="evenodd"
              opacity={wishlisted ? 1 : 0.15}
            />
            <path
              stroke="#000"
              strokeWidth="0.6"
              d="M3.472.758C2.11.991.737 2.278.737 4.702c0 .875.374 1.784.975 2.674.6.887 1.405 1.728 2.221 2.458.815.729 1.632 1.34 2.245 1.768a24 24 0 0 0 .822.55l.082-.053a24.342 24.342 0 0 0 2.985-2.265c.816-.73 1.622-1.57 2.22-2.458.602-.89.976-1.799.976-2.674 0-2.425-1.373-3.71-2.735-3.944a2.589 2.589 0 0 0-1.962.438c-.569.409-1.031 1.1-1.202 2.12h-.728c-.17-1.019-.633-1.711-1.202-2.12A2.588 2.588 0 0 0 3.472.758"
            />
          </svg>
        </button>

        <a href={href} className="alo-plp-tile__image-link" tabIndex={-1}>
          <div className="alo-plp-tile__image-sizer">
            <div className="alo-plp-tile__image-inner">
              <img
                src={imageSrc}
                alt={imageAlt || name}
                className="alo-plp-tile__image"
                loading="lazy"
              />
            </div>
          </div>
        </a>

        <div className="alo-plp-tile__overlay">
          <a href={href} className="alo-plp-tile__add-to-bag">
            add to bag
          </a>
        </div>
      </div>

      <div className="alo-plp-tile__info">
        {swatches.length > 0 && (
          <div className="alo-plp-tile__swatches">
            {swatches.map((swatch) => (
              <button
                key={swatch.label}
                type="button"
                className="alo-plp-tile__swatch"
                style={{ backgroundColor: swatch.color }}
                title={swatch.label}
                aria-label={swatch.label}
              />
            ))}
            {extraColors > 0 && (
              <a href={href} className="alo-plp-tile__extra-colors" aria-label={`available in ${extraColors} more colors`}>
                <span className="alo-plp-tile__plus-icon" />
                {extraColors}
              </a>
            )}
          </div>
        )}

        {badge && (
          <div className="alo-plp-tile__badge">{badge}</div>
        )}

        <div className="alo-plp-tile__name-block">
          <a href={href} className="alo-plp-tile__name-link">
            <p className="alo-plp-tile__name">{name}</p>
          </a>
          {colorway && <p className="alo-plp-tile__colorway">{colorway}</p>}
        </div>

        <div className="alo-plp-tile__price">{price}</div>
      </div>
    </div>
  );
}
