import React from 'react';
import './CollectionHeader.scss';

export default function CollectionHeader({ title, description }) {
  return (
    <section className="alo-collection-header">
      <div className="alo-collection-header__inner">
        <div className="alo-collection-header__text-block">
          <h1 className="alo-collection-header__title">{title}</h1>
          <p className="alo-collection-header__description">{description}</p>
        </div>
      </div>
    </section>
  );
}
