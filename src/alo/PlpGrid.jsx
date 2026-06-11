import React from 'react';
import './PlpGrid.scss';

export default function PlpGrid({ children, title, sidebar }) {
  return (
    <section className="alo-plp-grid-section">
      <div className="alo-plp-grid-section__inner">
        {sidebar && (
          <div className="alo-plp-grid-section__sidebar">
            {sidebar}
          </div>
        )}
        <div className="alo-plp-grid-section__content">
          {title && <h2 className="alo-plp-grid-section__title">{title}</h2>}
          <div className="alo-plp-grid">
            {children}
          </div>
        </div>
      </div>
    </section>
  );
}
