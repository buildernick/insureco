import { describe, it, expect } from 'vitest';
import {
  mockProperties,
  mockVehicles,
  mockBusinessClaims,
  mockBusinessPayments,
  getClaimsForAsset,
  getPaymentsForAsset,
  getPropertyById,
  getVehicleById,
  getAssetById,
  getTotalPropertyPremium,
  getTotalFleetPremium,
  getTotalBusinessPremium,
  getOpenClaimsCount,
  getActiveProperties,
  getActiveVehicles,
} from '../../data/businessMockData';

describe('businessMockData collections', () => {
  it('exports non-empty collections', () => {
    expect(mockProperties.length).toBeGreaterThan(0);
    expect(mockVehicles.length).toBeGreaterThan(0);
    expect(mockBusinessClaims.length).toBeGreaterThan(0);
    expect(mockBusinessPayments.length).toBeGreaterThan(0);
  });

  it('gives every asset a unique id', () => {
    const ids = [...mockProperties, ...mockVehicles].map((a) => a.id);
    expect(new Set(ids).size).toBe(ids.length);
  });

  it('gives every asset a numeric monthly premium', () => {
    [...mockProperties, ...mockVehicles].forEach((a) => {
      expect(typeof a.monthlyPremium).toBe('number');
    });
  });
});

describe('businessMockData helpers', () => {
  it('getPropertyById finds a property and returns undefined otherwise', () => {
    const first = mockProperties[0];
    expect(getPropertyById(first.id)).toBe(first);
    expect(getPropertyById('does-not-exist')).toBeUndefined();
  });

  it('getVehicleById finds a vehicle and returns undefined otherwise', () => {
    const first = mockVehicles[0];
    expect(getVehicleById(first.id)).toBe(first);
    expect(getVehicleById('does-not-exist')).toBeUndefined();
  });

  it('getAssetById resolves both properties and vehicles', () => {
    expect(getAssetById(mockProperties[0].id)).toBe(mockProperties[0]);
    expect(getAssetById(mockVehicles[0].id)).toBe(mockVehicles[0]);
    expect(getAssetById('nope')).toBeUndefined();
  });

  it('getClaimsForAsset only returns claims for that asset', () => {
    const claim = mockBusinessClaims[0];
    const result = getClaimsForAsset(claim.assetId);
    expect(result).toContain(claim);
    result.forEach((c) => expect(c.assetId).toBe(claim.assetId));
    expect(getClaimsForAsset('nope')).toEqual([]);
  });

  it('getPaymentsForAsset only returns payments applied to that asset', () => {
    const payment = mockBusinessPayments[0];
    const result = getPaymentsForAsset(payment.appliedTo);
    expect(result).toContain(payment);
    result.forEach((p) => expect(p.appliedTo).toBe(payment.appliedTo));
    expect(getPaymentsForAsset('nope')).toEqual([]);
  });

  it('premium totals add up', () => {
    const props = mockProperties.reduce((s, p) => s + p.monthlyPremium, 0);
    const fleet = mockVehicles.reduce((s, v) => s + v.monthlyPremium, 0);
    expect(getTotalPropertyPremium()).toBe(props);
    expect(getTotalFleetPremium()).toBe(fleet);
    expect(getTotalBusinessPremium()).toBe(props + fleet);
  });

  it('getOpenClaimsCount counts In Review and Approved claims', () => {
    const expected = mockBusinessClaims.filter(
      (c) => c.status === 'In Review' || c.status === 'Approved'
    ).length;
    expect(getOpenClaimsCount()).toBe(expected);
  });

  it('active filters only return Active assets', () => {
    getActiveProperties().forEach((p) => expect(p.status).toBe('Active'));
    getActiveVehicles().forEach((v) => expect(v.status).toBe('Active'));
  });
});
