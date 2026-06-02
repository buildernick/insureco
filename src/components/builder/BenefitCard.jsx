import { Tile } from '@carbon/react';
import { Security, CheckmarkFilled, Car, Home as HomeIcon } from '@carbon/icons-react';
import './BenefitCard.scss';

const ICONS = {
  Security,
  CheckmarkFilled,
  Car,
  Home: HomeIcon,
};

export default function BenefitCard({
  title = 'Benefit Title',
  description = 'Describe the benefit here.',
  icon = 'Security',
}) {
  const IconComponent = ICONS[icon] || Security;

  return (
    <Tile className="builder-benefit-card">
      <div className="builder-benefit-card__icon">
        <IconComponent size={48} />
      </div>
      <h3 className="builder-benefit-card__title">{title}</h3>
      <p className="builder-benefit-card__description">{description}</p>
    </Tile>
  );
}
