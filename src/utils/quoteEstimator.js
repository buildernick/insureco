/**
 * quoteEstimator.js
 *
 * Pure function that takes formData from the sign-up flow and returns an
 * estimated monthly insurance premium. All figures are display-only estimates.
 *
 * Returns null when there is not yet enough data to show anything.
 * Returns { low, high, base, breakdown: null } when a range is the best we can offer.
 * Returns { monthly, low, high, base, breakdown: [...] } when coverage + deductible are set.
 */

const BASE_RATES = {
  car:  85,
  home: 110,
  both: 175, // bundle discount already baked in
};

const COVERAGE_MULTIPLIERS = {
  basic:    0.80,
  standard: 1.00,
  premium:  1.35,
};

const DEDUCTIBLE_ADJUSTMENTS = {
  '250':  +10,
  '500':    0,
  '1000': -10,
  '2500': -18,
};

const ADDON_RATES = {
  roadside: 5,
  rental:   8,
  gap:      12,
};

/**
 * @param {object} formData - the full form state from SignUpPage
 * @returns {object|null}
 */
export function quoteEstimator(formData) {
  const { insuranceType } = formData;

  // Nothing to show until the user picks an insurance type
  if (!insuranceType) return null;

  const base = BASE_RATES[insuranceType] ?? 0;

  // --- Adjustments ---------------------------------------------------------

  const breakdown = [];

  // Base rate line item
  breakdown.push({
    label: insuranceType === 'car'  ? 'Car insurance base rate'
         : insuranceType === 'home' ? 'Home insurance base rate'
         : 'Car + Home bundle base rate',
    amount: base,
    type: 'base',
  });

  let adjustments = 0;

  // Car adjustments
  if (insuranceType === 'car' || insuranceType === 'both') {
    const year = parseInt(formData.carYear, 10);
    if (!isNaN(year)) {
      if (year < 2010) {
        adjustments += 15;
        breakdown.push({ label: 'Older vehicle surcharge', amount: +15, type: 'adjustment' });
      } else if (year >= 2020) {
        adjustments -= 10;
        breakdown.push({ label: 'Newer vehicle discount', amount: -10, type: 'adjustment' });
      }
    }

    const miles = parseInt(formData.carMilesPerYear, 10);
    if (!isNaN(miles) && miles > 15000) {
      adjustments += 12;
      breakdown.push({ label: 'High mileage surcharge (>15k/yr)', amount: +12, type: 'adjustment' });
    }
  }

  // Home adjustments
  if (insuranceType === 'home' || insuranceType === 'both') {
    const sqft = parseInt(formData.homeSquareFeet, 10);
    if (!isNaN(sqft) && sqft > 2500) {
      adjustments += 20;
      breakdown.push({ label: 'Large home surcharge (>2,500 sq ft)', amount: +20, type: 'adjustment' });
    }

    const value = parseInt(formData.homeValue, 10);
    if (!isNaN(value) && value > 400000) {
      adjustments += 25;
      breakdown.push({ label: 'High-value home surcharge (>$400k)', amount: +25, type: 'adjustment' });
    }
  }

  const subtotal = base + adjustments;

  // --- Coverage multiplier -------------------------------------------------

  const { coverageLevel, deductible, additionalCoverage = [] } = formData;
  const hasFullDetails = !!coverageLevel && !!deductible;

  if (!hasFullDetails) {
    // Return a range based on the best and worst multipliers
    const low  = Math.round(subtotal * COVERAGE_MULTIPLIERS.basic);
    const high = Math.round(subtotal * COVERAGE_MULTIPLIERS.premium);
    return { low, high, base, breakdown: null };
  }

  // Apply multiplier
  const multiplier      = COVERAGE_MULTIPLIERS[coverageLevel] ?? 1;
  const afterMultiplier = subtotal * multiplier;

  if (multiplier !== 1) {
    const label =
      coverageLevel === 'basic'   ? 'Basic coverage discount (−20%)'
      : coverageLevel === 'premium' ? 'Premium coverage uplift (+35%)'
      : null;
    if (label) breakdown.push({ label, amount: Math.round(afterMultiplier - subtotal), type: 'multiplier' });
  }

  // Deductible adjustment
  const deductibleAdj = DEDUCTIBLE_ADJUSTMENTS[deductible] ?? 0;
  if (deductibleAdj !== 0) {
    breakdown.push({
      label: `$${Number(deductible).toLocaleString()} deductible adjustment`,
      amount: deductibleAdj,
      type: 'deductible',
    });
  }

  // Add-ons
  let addonsTotal = 0;
  additionalCoverage.forEach((addon) => {
    const rate = ADDON_RATES[addon] ?? 0;
    addonsTotal += rate;
    breakdown.push({
      label: addon === 'roadside' ? 'Roadside Assistance'
           : addon === 'rental'   ? 'Rental Car Coverage'
           : addon === 'gap'      ? 'Gap Insurance'
           : addon,
      amount: rate,
      type: 'addon',
    });
  });

  const monthly = Math.round(afterMultiplier + deductibleAdj + addonsTotal);
  const low     = Math.round(subtotal * COVERAGE_MULTIPLIERS.basic);
  const high    = Math.round(subtotal * COVERAGE_MULTIPLIERS.premium);

  return { monthly, low, high, base, breakdown };
}
