import React from 'react';
import './ProductGrid.scss';

export default function ProductGrid({ children }) {
  return (
    <section className="alo-product-grid">
      <div className="alo-product-grid__row">
        {children}
      </div>
    </section>
  );
}
