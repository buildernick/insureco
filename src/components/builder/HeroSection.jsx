import { Button } from '@carbon/react';
import { ArrowRight } from '@carbon/icons-react';
import { useNavigate } from 'react-router-dom';
import './HeroSection.scss';

export default function HeroSection({
  backgroundImage,
  headline = 'Protect Your Future with Confidence',
  tagline = 'Comprehensive car and home insurance designed for the modern world.',
  primaryCtaText = 'Sign Up Now',
  primaryCtaUrl = '/signup',
  secondaryCtaText = 'Learn More',
  secondaryCtaUrl = '/',
}) {
  const navigate = useNavigate();

  const sectionStyle = backgroundImage
    ? { backgroundImage: `url(${backgroundImage})` }
    : {};

  return (
    <section className="builder-hero" style={sectionStyle}>
      <div className="builder-hero__overlay" />
      <div className="builder-hero__content">
        <h1 className="builder-hero__headline">{headline}</h1>
        {tagline && <p className="builder-hero__tagline">{tagline}</p>}
        <div className="builder-hero__actions">
          {primaryCtaText && (
            <Button
              kind="primary"
              size="lg"
              onClick={() => navigate(primaryCtaUrl)}
              renderIcon={ArrowRight}
            >
              {primaryCtaText}
            </Button>
          )}
          {secondaryCtaText && (
            <Button
              kind="secondary"
              size="lg"
              onClick={() => navigate(secondaryCtaUrl)}
            >
              {secondaryCtaText}
            </Button>
          )}
        </div>
      </div>
    </section>
  );
}
