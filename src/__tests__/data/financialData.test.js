import { describe, it, expect } from 'vitest';
import {
  monthlyData,
  assetData,
  calculateSummaryStats,
  formatCurrency,
  formatDate,
} from '../../data/financialData';

describe('financialData collections', () => {
  it('exports monthly and asset data', () => {
    expect(monthlyData.length).toBeGreaterThan(0);
    expect(assetData.length).toBeGreaterThan(0);
  });
});

describe('calculateSummaryStats', () => {
  it('sums monthly data by category', () => {
    const stats = calculateSummaryStats();
    const sum = (key) => monthlyData.reduce((s, m) => s + m[key], 0);
    expect(stats.propertyPremiums).toBe(sum('propertyPremiums'));
    expect(stats.propertyClaims).toBe(sum('propertyClaims'));
    expect(stats.autoPremiums).toBe(sum('autoPremiums'));
    expect(stats.autoClaims).toBe(sum('autoClaims'));
    expect(stats.totalOwed).toBe(stats.propertyPremiums + stats.autoPremiums);
    expect(stats.totalClaimed).toBe(stats.propertyClaims + stats.autoClaims);
  });

  it('computes loss ratio as a one-decimal percentage string', () => {
    const stats = calculateSummaryStats([], [
      { propertyPremiums: 100, propertyClaims: 10, autoPremiums: 100, autoClaims: 15 },
    ]);
    expect(stats.lossRatio).toBe('12.5');
  });
});

describe('formatCurrency', () => {
  it('formats whole-dollar USD', () => {
    expect(formatCurrency(1234)).toBe('$1,234');
    expect(formatCurrency(0)).toBe('$0');
    expect(formatCurrency(1234.56)).toBe('$1,235');
  });
});

describe('formatDate', () => {
  it('formats as short month, day, year', () => {
    expect(formatDate('2024-03-15T12:00:00')).toBe('Mar 15, 2024');
  });
});
