import React from 'react';
import './ProductCard.scss';

export default function ProductCard({
  href,
  mediaType = 'image',
  mediaSrc,
  videoPoster,
  name,
  description,
  availability,
}) {
  return (
    <div className="alo-product-card">
      <a href={href} className="alo-product-card__media-link">
        <div className="alo-product-card__media-wrapper">
          {mediaType === 'video' ? (
            <video
              className="alo-product-card__video"
              poster={videoPoster}
              src={mediaSrc}
              autoPlay
              loop
              muted
              playsInline
              preload="metadata"
            />
          ) : (
            <img
              className="alo-product-card__image"
              src={mediaSrc}
              alt={name}
              role="presentation"
              loading="lazy"
            />
          )}
          <div className="alo-product-card__media-spacer" />
        </div>
      </a>

      <a href={href} className="alo-product-card__name-link">
        <span className="alo-product-card__name">{name}</span>
      </a>

      <p className="alo-product-card__description">{description}</p>
      <p className="alo-product-card__availability">{availability}</p>
    </div>
  );
}
