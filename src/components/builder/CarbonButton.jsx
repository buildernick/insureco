import { Button } from '@carbon/react';
import {
  ArrowRight,
  Add,
  Checkmark,
  Download,
  Upload,
  Send,
  Search,
  Login,
  Logout,
  Phone,
  Email,
  Document,
  Edit,
  TrashCan,
  ChevronRight,
  ChevronLeft,
  Star,
  Help,
  Information,
  Warning,
} from '@carbon/icons-react';

const ICON_MAP = {
  ArrowRight,
  Add,
  Checkmark,
  Download,
  Upload,
  Send,
  Search,
  Login,
  Logout,
  Phone,
  Email,
  Document,
  Edit,
  TrashCan,
  ChevronRight,
  ChevronLeft,
  Star,
  Help,
  Information,
  Warning,
};

export default function CarbonButton({
  label = 'Click Me',
  kind = 'primary',
  size = 'md',
  href = '',
  disabled = false,
  icon = 'None',
  iconPosition = 'right',
}) {
  const IconComponent = icon && icon !== 'None' ? ICON_MAP[icon] : null;

  const baseProps = {
    kind,
    size,
    disabled,
    ...(href ? { href, as: 'a' } : {}),
  };

  // Icon-only button
  if (IconComponent && !label) {
    return <Button {...baseProps} renderIcon={IconComponent} iconDescription={icon} hasIconOnly />;
  }

  // Icon on the right — use renderIcon (Carbon's native placement)
  if (IconComponent && iconPosition === 'right') {
    return (
      <Button {...baseProps} renderIcon={IconComponent} iconDescription={icon}>
        {label}
      </Button>
    );
  }

  // Icon on the left — render icon as a child before the label text so Carbon
  // doesn't force it to the right via its internal renderIcon slot
  if (IconComponent && iconPosition === 'left') {
    return (
      <Button {...baseProps} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.5rem' }}>
        <IconComponent aria-hidden="true" />
        {label}
      </Button>
    );
  }

  return <Button {...baseProps}>{label}</Button>;
}
