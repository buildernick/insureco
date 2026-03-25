import { formatCurrency } from '../../utils/businessHelpers';

describe('formatCurrency', () => {
  it('formats a positive number as USD currency', () => {
    expect(formatCurrency(1234.56)).toBe('$1,234.56');
  });

  it('formats without cents when showCents is false', () => {
    expect(formatCurrency(1234.56, false)).toBe('$1,235');
  });

  it('returns $0.00 for null', () => {
    expect(formatCurrency(null)).toBe('$0.00');
  });
});
