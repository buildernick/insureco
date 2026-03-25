import {
  formatCurrency,
  formatMileage,
  formatVehicleName,
  formatVIN,
  formatPercentage,
  isValidEmail,
  isValidPhone,
  isValidVIN,
  isValidZipCode,
  getStatusConfig,
  getAssetType,
  calculateCoveragePercentage,
  calculateInsurancePayout,
  searchByFields,
  filterByStatus,
} from '../../utils/businessHelpers';

// =============================================================================
// FORMATTING
// =============================================================================

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

  it('returns $0.00 for undefined', () => {
    expect(formatCurrency(undefined)).toBe('$0.00');
  });

  it('returns $0.00 for NaN', () => {
    expect(formatCurrency(NaN)).toBe('$0.00');
  });
});

describe('formatMileage', () => {
  it('formats mileage with unit by default', () => {
    expect(formatMileage(45230)).toBe('45,230 mi');
  });

  it('formats mileage without unit when showUnit is false', () => {
    expect(formatMileage(45230, false)).toBe('45,230');
  });

  it('returns "0 mi" for null', () => {
    expect(formatMileage(null)).toBe('0 mi');
  });
});

describe('formatVehicleName', () => {
  it('formats a full vehicle object', () => {
    expect(formatVehicleName({ year: 2022, make: 'Toyota', model: 'Corolla' })).toBe('2022 Toyota Corolla');
  });

  it('handles a partial vehicle object', () => {
    expect(formatVehicleName({ make: 'Ford' })).toBe('Ford');
  });

  it('returns "N/A" for null', () => {
    expect(formatVehicleName(null)).toBe('N/A');
  });
});

describe('formatVIN', () => {
  const fullVin = '1HGBH41JXMN109186';

  it('masks a full VIN by default (first 8 + last 4)', () => {
    expect(formatVIN(fullVin)).toBe('1HGBH41J...9186');
  });

  it('shows the full VIN when showFull is true', () => {
    expect(formatVIN(fullVin, true)).toBe(fullVin);
  });

  it('returns "N/A" for null', () => {
    expect(formatVIN(null)).toBe('N/A');
  });
});

describe('formatPercentage', () => {
  it('formats a whole number as a percentage', () => {
    expect(formatPercentage(75)).toBe('75%');
  });

  it('formats with the specified number of decimal places', () => {
    expect(formatPercentage(75.5, 1)).toBe('75.5%');
  });

  it('returns "0%" for null', () => {
    expect(formatPercentage(null)).toBe('0%');
  });

  it('returns "0%" for undefined', () => {
    expect(formatPercentage(undefined)).toBe('0%');
  });
});

// =============================================================================
// VALIDATION
// =============================================================================

describe('isValidEmail', () => {
  it('returns true for a valid email', () => {
    expect(isValidEmail('user@example.com')).toBe(true);
  });

  it('returns false when the @ symbol is missing', () => {
    expect(isValidEmail('userexample.com')).toBe(false);
  });

  it('returns false for an empty string', () => {
    expect(isValidEmail('')).toBe(false);
  });

  it('returns false for null', () => {
    expect(isValidEmail(null)).toBe(false);
  });
});

describe('isValidPhone', () => {
  it('returns true for a plain 10-digit number', () => {
    expect(isValidPhone('5551234567')).toBe(true);
  });

  it('returns true for a formatted US phone number', () => {
    expect(isValidPhone('(555) 123-4567')).toBe(true);
  });

  it('returns false for a number that is too short', () => {
    expect(isValidPhone('555123')).toBe(false);
  });

  it('returns false for null', () => {
    expect(isValidPhone(null)).toBe(false);
  });
});

describe('isValidVIN', () => {
  it('returns true for a valid 17-character VIN', () => {
    expect(isValidVIN('1HGBH41JXMN109186')).toBe(true);
  });

  it('returns false for a VIN that is too short', () => {
    expect(isValidVIN('1HGBH41')).toBe(false);
  });

  it('returns false for a VIN containing invalid characters (I, O, Q)', () => {
    expect(isValidVIN('1HGBH41JXMN10918I')).toBe(false);
  });

  it('returns false for null', () => {
    expect(isValidVIN(null)).toBe(false);
  });
});

describe('isValidZipCode', () => {
  it('returns true for a valid 5-digit zip code', () => {
    expect(isValidZipCode('12345')).toBe(true);
  });

  it('returns true for a valid 9-digit zip+4 code', () => {
    expect(isValidZipCode('12345-6789')).toBe(true);
  });

  it('returns false for a zip code that is too short', () => {
    expect(isValidZipCode('1234')).toBe(false);
  });

  it('returns false for null', () => {
    expect(isValidZipCode(null)).toBe(false);
  });
});

// =============================================================================
// BUSINESS LOGIC
// =============================================================================

describe('getStatusConfig', () => {
  it('returns the correct config for an active asset', () => {
    const config = getStatusConfig('Active', 'asset');
    expect(config.type).toBe('green');
    expect(config.label).toBe('Active');
  });

  it('returns the correct config for an approved claim', () => {
    const config = getStatusConfig('Approved', 'claim');
    expect(config.type).toBe('green');
  });

  it('returns the correct config for a completed payment', () => {
    const config = getStatusConfig('Completed', 'payment');
    expect(config.type).toBe('green');
  });

  it('returns a gray fallback for an unknown status', () => {
    const config = getStatusConfig('Unknown Status', 'asset');
    expect(config.type).toBe('gray');
    expect(config.label).toBe('Unknown Status');
  });
});

describe('getAssetType', () => {
  it('returns "property" for PROP- prefixed IDs', () => {
    expect(getAssetType('PROP-2024-001')).toBe('property');
  });

  it('returns "vehicle" for VEH- prefixed IDs', () => {
    expect(getAssetType('VEH-2024-001')).toBe('vehicle');
  });

  it('returns null for an unrecognized ID', () => {
    expect(getAssetType('UNKNOWN-001')).toBeNull();
  });

  it('returns null for null input', () => {
    expect(getAssetType(null)).toBeNull();
  });
});

describe('calculateCoveragePercentage', () => {
  it('calculates the correct percentage', () => {
    expect(calculateCoveragePercentage(5000, 10000)).toBe(50);
  });

  it('caps the result at 100 when the claim exceeds the coverage limit', () => {
    expect(calculateCoveragePercentage(15000, 10000)).toBe(100);
  });

  it('returns 0 when the coverage limit is 0', () => {
    expect(calculateCoveragePercentage(5000, 0)).toBe(0);
  });

  it('returns 0 when the claim amount is 0', () => {
    expect(calculateCoveragePercentage(0, 10000)).toBe(0);
  });
});

describe('calculateInsurancePayout', () => {
  it('subtracts the deductible from the approved amount', () => {
    expect(calculateInsurancePayout(10000, 500)).toBe(9500);
  });

  it('returns 0 when the payout would be less than the deductible', () => {
    expect(calculateInsurancePayout(300, 500)).toBe(0);
  });

  it('returns 0 for a zero approved amount', () => {
    expect(calculateInsurancePayout(0, 500)).toBe(0);
  });
});

// =============================================================================
// SEARCH & FILTER
// =============================================================================

describe('searchByFields', () => {
  const items = [
    { name: 'John Doe', city: 'Chicago' },
    { name: 'Jane Smith', city: 'New York' },
    { name: 'Bob Jones', city: 'Chicago' },
  ];

  it('returns matching items for a query', () => {
    expect(searchByFields(items, 'Jane', ['name'])).toHaveLength(1);
  });

  it('returns all items for an empty query', () => {
    expect(searchByFields(items, '', ['name'])).toHaveLength(3);
  });

  it('returns an empty array when there is no match', () => {
    expect(searchByFields(items, 'zzz', ['name'])).toHaveLength(0);
  });

  it('searches across multiple fields', () => {
    expect(searchByFields(items, 'Chicago', ['name', 'city'])).toHaveLength(2);
  });

  it('is case-insensitive', () => {
    expect(searchByFields(items, 'john', ['name'])).toHaveLength(1);
  });
});

describe('filterByStatus', () => {
  const items = [
    { status: 'Active' },
    { status: 'Active' },
    { status: 'Suspended' },
  ];

  it('filters items by a specific status', () => {
    expect(filterByStatus(items, 'Active')).toHaveLength(2);
  });

  it('returns all items when status is "all"', () => {
    expect(filterByStatus(items, 'all')).toHaveLength(3);
  });

  it('returns an empty array when no items match the status', () => {
    expect(filterByStatus(items, 'Pending')).toHaveLength(0);
  });
});
