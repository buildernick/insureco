import { Tile } from '@carbon/react';
import './TestimonialsSection.scss';

const DEFAULT_TESTIMONIALS = [
  {
    quote: 'InsureCo made switching my insurance so easy. The process was smooth and the savings were immediate.',
    author: 'Sarah Johnson',
    role: 'Customer since 2022',
  },
];

export default function TestimonialsSection({
  sectionHeading = 'What Our Customers Say',
  testimonials = DEFAULT_TESTIMONIALS,
}) {
  return (
    <section className="builder-testimonials">
      <div className="builder-testimonials__inner">
        {sectionHeading && (
          <h2 className="builder-testimonials__heading">{sectionHeading}</h2>
        )}
        <div className="builder-testimonials__grid">
          {testimonials.map((t, i) => (
            <Tile key={i} className="builder-testimonials__card">
              <p className="builder-testimonials__quote">"{t.quote}"</p>
              <div className="builder-testimonials__author">
                <p className="builder-testimonials__author-name">{t.author}</p>
                <p className="builder-testimonials__author-role">{t.role}</p>
              </div>
            </Tile>
          ))}
        </div>
      </div>
    </section>
  );
}
