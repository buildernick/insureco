import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import './BoldBanner.scss';

export default function BoldBanner({
  heading = "Ready to Get Started?",
  subtext = 'Join thousands of satisfied customers who trust InsureCo for their insurance needs.',
  ctaText = 'Get Your Free Quote',
  ctaUrl = '/signup',
}) {
  const navigate = useNavigate();

  return (
    <section className="builder-bold-banner">
      <div className="builder-bold-banner__content">
        <h2 className="builder-bold-banner__heading">{heading}</h2>
        {subtext && <p className="builder-bold-banner__subtext">{subtext}</p>}
        {ctaText && (
          <Button
            kind="primary"
            size="lg"
            onClick={() => navigate(ctaUrl)}
            renderIcon={ArrowRight}
          >
            {ctaText}
          </Button>
        )}
      </div>
    </section>
  );
}
