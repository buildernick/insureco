import React, { useState } from 'react';
import {
  Button,
  TextInput,
  Select,
  SelectItem,
  NumberInput,
  DatePicker,
  DatePickerInput,
} from '@carbon/react';
import { ArrowLeft, ArrowRight, ChevronDown } from '@carbon/icons-react';
import StepBreadcrumb from '../components/StepBreadcrumb';
import './SignUpPage.scss';

// Full list of US states for the address step dropdown.
// Stored as { code, name } pairs so we can display the full name in the UI
// while submitting the two-letter abbreviation to the backend.
const US_STATES = [
  { code: 'AL', name: 'Alabama' }, { code: 'AK', name: 'Alaska' },
  { code: 'AZ', name: 'Arizona' }, { code: 'AR', name: 'Arkansas' },
  { code: 'CA', name: 'California' }, { code: 'CO', name: 'Colorado' },
  { code: 'CT', name: 'Connecticut' }, { code: 'DE', name: 'Delaware' },
  { code: 'FL', name: 'Florida' }, { code: 'GA', name: 'Georgia' },
  { code: 'HI', name: 'Hawaii' }, { code: 'ID', name: 'Idaho' },
  { code: 'IL', name: 'Illinois' }, { code: 'IN', name: 'Indiana' },
  { code: 'IA', name: 'Iowa' }, { code: 'KS', name: 'Kansas' },
  { code: 'KY', name: 'Kentucky' }, { code: 'LA', name: 'Louisiana' },
  { code: 'ME', name: 'Maine' }, { code: 'MD', name: 'Maryland' },
  { code: 'MA', name: 'Massachusetts' }, { code: 'MI', name: 'Michigan' },
  { code: 'MN', name: 'Minnesota' }, { code: 'MS', name: 'Mississippi' },
  { code: 'MO', name: 'Missouri' }, { code: 'MT', name: 'Montana' },
  { code: 'NE', name: 'Nebraska' }, { code: 'NV', name: 'Nevada' },
  { code: 'NH', name: 'New Hampshire' }, { code: 'NJ', name: 'New Jersey' },
  { code: 'NM', name: 'New Mexico' }, { code: 'NY', name: 'New York' },
  { code: 'NC', name: 'North Carolina' }, { code: 'ND', name: 'North Dakota' },
  { code: 'OH', name: 'Ohio' }, { code: 'OK', name: 'Oklahoma' },
  { code: 'OR', name: 'Oregon' }, { code: 'PA', name: 'Pennsylvania' },
  { code: 'RI', name: 'Rhode Island' }, { code: 'SC', name: 'South Carolina' },
  { code: 'SD', name: 'South Dakota' }, { code: 'TN', name: 'Tennessee' },
  { code: 'TX', name: 'Texas' }, { code: 'UT', name: 'Utah' },
  { code: 'VT', name: 'Vermont' }, { code: 'VA', name: 'Virginia' },
  { code: 'WA', name: 'Washington' }, { code: 'WV', name: 'West Virginia' },
  { code: 'WI', name: 'Wisconsin' }, { code: 'WY', name: 'Wyoming' },
];

const currentYear = new Date().getFullYear();
// Last 30 model years (e.g. 2025 → 1996) — covers the vast majority of vehicles in use.
const CAR_YEARS = Array.from({ length: 30 }, (_, i) => currentYear - i);
// 1800 → present; wide enough to accommodate historic properties without dead ends.
const HOME_YEARS = Array.from({ length: 226 }, (_, i) => 2025 - i);
const HOME_TYPES = ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Mobile Home'];

const STEP_KEYS = {
  PERSONAL: 'personal',
  COVERAGE: 'coverage',
  CAR: 'car',
  HOME: 'home',
  ADDRESS: 'address',
};

// ─── Field-level validators ──────────────────────────────────────────────────────
// Lightweight regex helpers consumed by the per-step validate* functions below.
// Phone and email are intentionally permissive to avoid rejecting valid international formats.
const isValidEmail = (v) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v.trim());
const isValidPhone = (v) => /^\+?[\d\s\-().]{7,}$/.test(v.trim());
const isValidZip = (v) => /^\d{5}(-\d{4})?$/.test(v.trim());
// VIN is optional; when provided it must be exactly 17 alphanumeric characters.
const isValidVin = (v) => v.length === 0 || v.length === 17;

/**
 * Calculates age in complete years from a "m/d/yyyy" string (Carbon DatePicker output).
 * Correctly accounts for whether the birthday has occurred yet this calendar year.
 */
function getAge(dobString) {
  if (!dobString) return 0;
  const [m, d, y] = dobString.split('/').map(Number);
  const dob = new Date(y, m - 1, d);
  const today = new Date();
  let age = today.getFullYear() - dob.getFullYear();
  const mDiff = today.getMonth() - dob.getMonth();
  if (mDiff < 0 || (mDiff === 0 && today.getDate() < dob.getDate())) age--;
  return age;
}

/**
 * Validates the Personal Info step.
 * Returns a { fieldName: errorMessage } map for every failing field,
 * or an empty object when the step is valid and the user may advance.
 */
function validatePersonal(data) {
  const errors = {};
  if (!data.firstName.trim()) errors.firstName = 'First name is required';
  if (!data.lastName.trim()) errors.lastName = 'Last name is required';
  if (!data.email.trim()) {
    errors.email = 'Email address is required';
  } else if (!isValidEmail(data.email)) {
    errors.email = 'Enter a valid email address';
  }
  if (!data.phone.trim()) {
    errors.phone = 'Phone number is required';
  } else if (!isValidPhone(data.phone)) {
    errors.phone = 'Enter a valid phone number';
  }
  if (data.altPhone.trim() && !isValidPhone(data.altPhone)) {
    errors.altPhone = 'Enter a valid phone number';
  }
  if (!data.dateOfBirth) {
    errors.dateOfBirth = 'Date of birth is required';
  } else if (getAge(data.dateOfBirth) < 18) {
    errors.dateOfBirth = 'You must be at least 18 years old';
  }
  return errors;
}

/**
 * Validates the Coverage step. The user must select at least one
 * coverage type (car, home, or both) before they can advance.
 */
function validateCoverage(insuranceType) {
  if (!insuranceType) return { insuranceType: 'Please select a coverage type to continue' };
  return {};
}

/**
 * Validates the Car Details step.
 * Make, model, and year are required. VIN is optional but, when provided,
 * must be exactly 17 characters (the standard for all modern VINs).
 */
function validateCar(data) {
  const errors = {};
  if (!data.make.trim()) errors.make = 'Vehicle make is required';
  if (!data.model.trim()) errors.model = 'Vehicle model is required';
  if (!data.year) errors.year = 'Vehicle year is required';
  if (data.vin.trim() && !isValidVin(data.vin)) {
    errors.vin = 'VIN must be exactly 17 characters';
  }
  return errors;
}

/**
 * Validates the Home Details step.
 * Home type and year built are required. Square footage and estimated value
 * use NumberInput with a non-zero default so they need no additional validation.
 */
function validateHome(data) {
  const errors = {};
  if (!data.homeType) errors.homeType = 'Home type is required';
  if (!data.yearBuilt) errors.yearBuilt = 'Year built is required';
  return errors;
}

/**
 * Validates the Address step. Accepts standard 5-digit and ZIP+4 (12345-6789) formats.
 */
function validateAddress(data) {
  const errors = {};
  if (!data.streetAddress.trim()) errors.streetAddress = 'Street address is required';
  if (!data.city.trim()) errors.city = 'City is required';
  if (!data.state) errors.state = 'State is required';
  if (!data.zip.trim()) {
    errors.zip = 'ZIP code is required';
  } else if (!isValidZip(data.zip)) {
    errors.zip = 'Enter a valid ZIP code (e.g. 12345)';
  }
  return errors;
}

// ─── Live premium estimator ──────────────────────────────────────────────────────
/**
 * Derives a realistic monthly premium range purely from front-end form data.
 * No backend call is made — this is an illustrative estimate that grows more
 * precise as the user completes each step.
 *
 * Pricing formula ($/month):
 *   Car base  $85  + $0.003/mile above 10k annual miles
 *                  − $1/year newer than 2010 (capped at −$15)
 *   Home base $110 + $0.015/sq ft above 1,000
 *                  + $0.50 per $1,000 of home value above $200,000
 *   Bundle       −15% off total when both coverages are selected
 *
 * The result is expressed as a ±10% range so users understand it is
 * an estimate, not a binding price.
 *
 * @returns {{ ready, min, max, breakdown, confidence, detailsCompleted, totalDetails }}
 */
function estimatePrice(insuranceType, formData, currentStepKey, steps) {
  // Don't show a number until the user has chosen a coverage type
  if (!insuranceType || currentStepKey === STEP_KEYS.PERSONAL) {
    return {
      ready: false,
      min: 0,
      max: 0,
      breakdown: [],
      confidence: 0,
      detailsCompleted: 0,
      totalDetails: steps.length,
    };
  }

  const hasCar = insuranceType === 'car' || insuranceType === 'both';
  const hasHome = insuranceType === 'home' || insuranceType === 'both';
  const isBundle = insuranceType === 'both';

  // Starting base rates before any risk adjustments are applied
  let carBase = 85;
  let homeBase = 110;

  // Car risk adjustments: high-mileage drivers pay more; newer cars get a discount
  if (hasCar) {
    const annualMiles = Number(formData.milesDrivenPerYear) || 0;
    if (annualMiles > 10000) {
      carBase += (annualMiles - 10000) * 0.003; // +$0.003 per mile above 10k
    }
    const carYear = Number(formData.year) || 0;
    if (carYear > 2010) {
      carBase -= Math.min(carYear - 2010, 15); // −$1/year newer than 2010, capped at −$15
    }
  }

  // Home risk adjustments: larger and higher-value homes cost more to insure
  if (hasHome) {
    const sqFt = Number(formData.squareFeet) || 0;
    if (sqFt > 1000) {
      homeBase += (sqFt - 1000) * 0.015; // +$0.015 per sq ft above 1,000
    }
    const homeValue = Number(formData.estimatedHomeValue) || 0;
    if (homeValue > 200000) {
      homeBase += ((homeValue - 200000) / 1000) * 0.5; // +$0.50 per $1,000 above $200k
    }
  }

  const carTotal = hasCar ? carBase : 0;
  const homeTotal = hasHome ? homeBase : 0;
  const subtotal = carTotal + homeTotal;
  const bundleDiscount = isBundle ? subtotal * 0.15 : 0;
  const total = subtotal - bundleDiscount;

  // Present as a ±10% band so users know this is not a binding quote
  const min = Math.round(total * 0.9);
  const max = Math.round(total * 1.1);

  const breakdown = [];
  if (hasCar) breakdown.push({ label: 'Car Insurance', amount: Math.round(carTotal) });
  if (hasHome) breakdown.push({ label: 'Home Insurance', amount: Math.round(homeTotal) });
  if (isBundle) breakdown.push({ label: 'Bundle Discount (15%)', amount: Math.round(bundleDiscount), isDiscount: true });

  // Confidence reflects how far through the flow the user is.
  // Shown as a progress bar to encourage them to keep filling in details.
  const stepIndex = steps.findIndex((s) => s.key === currentStepKey);
  const detailsCompleted = stepIndex + 1;
  const totalDetails = steps.length;
  const confidence = Math.round((detailsCompleted / totalDetails) * 100);

  return { ready: true, min, max, breakdown, confidence, detailsCompleted, totalDetails };
}

// ─── Inline SVG icons ────────────────────────────────────────────────────────────
// Inlined so they inherit `currentColor` and respond to theme switches without
// needing an extra icon file or a separate @carbon/icons-react import.
function CarIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M27.5063 14.9437L20.2594 12.3375L17.2219 8.53125C16.9582 8.20912 16.6264 7.94952 16.2503 7.77118C15.8742 7.59285 15.4631 7.50023 15.0469 7.5H7.54688C7.08935 7.50236 6.63932 7.61631 6.2358 7.83196C5.83228 8.0476 5.48746 8.35844 5.23125 8.7375L2.69062 12.4875C2.16433 13.2587 1.88032 14.1695 1.875 15.1031V22.5C1.875 22.7486 1.97377 22.9871 2.14959 23.1629C2.3254 23.3387 2.56386 23.4375 2.8125 23.4375H4.81875C5.03464 24.2319 5.50594 24.9332 6.15993 25.4332C6.81393 25.9332 7.61428 26.2041 8.4375 26.2041C9.26072 26.2041 10.0611 25.9332 10.7151 25.4332C11.3691 24.9332 11.8404 24.2319 12.0562 23.4375H17.9437C18.1596 24.2319 18.6309 24.9332 19.2849 25.4332C19.9389 25.9332 20.7393 26.2041 21.5625 26.2041C22.3857 26.2041 23.1861 25.9332 23.8401 25.4332C24.4941 24.9332 24.9654 24.2319 25.1813 23.4375H27.1875C27.4361 23.4375 27.6746 23.3387 27.8504 23.1629C28.0262 22.9871 28.125 22.7486 28.125 22.5V15.825C28.1249 15.6323 28.0655 15.4444 27.9548 15.2867C27.844 15.129 27.6874 15.0093 27.5063 14.9437ZM8.4375 24.375C8.06666 24.375 7.70415 24.265 7.39581 24.059C7.08746 23.853 6.84714 23.5601 6.70523 23.2175C6.56331 22.8749 6.52618 22.4979 6.59853 22.1342C6.67087 21.7705 6.84945 21.4364 7.11167 21.1742C7.3739 20.912 7.70799 20.7334 8.07171 20.661C8.43542 20.5887 8.81242 20.6258 9.15503 20.7677C9.49764 20.9096 9.79048 21.15 9.99651 21.4583C10.2025 21.7666 10.3125 22.1292 10.3125 22.5C10.3125 22.9973 10.115 23.4742 9.76332 23.8258C9.41169 24.1775 8.93478 24.375 8.4375 24.375ZM21.5625 24.375C21.1917 24.375 20.8291 24.265 20.5208 24.059C20.2125 23.853 19.9721 23.5601 19.8302 23.2175C19.6883 22.8749 19.6512 22.4979 19.7235 22.1342C19.7959 21.7705 19.9745 21.4364 20.2367 21.1742C20.4989 20.912 20.833 20.7334 21.1967 20.661C21.5604 20.5887 21.9374 20.6258 22.28 20.7677C22.6226 20.9096 22.9155 21.15 23.1215 21.4583C23.3275 21.7666 23.4375 22.1292 23.4375 22.5C23.4375 22.9973 23.24 23.4742 22.8883 23.8258C22.5367 24.1775 22.0598 24.375 21.5625 24.375ZM26.25 21.5625H25.1813C24.9654 20.7681 24.4941 20.0668 23.8401 19.5668C23.1861 19.0668 22.3857 18.7959 21.5625 18.7959C20.7393 18.7959 19.9389 19.0668 19.2849 19.5668C18.6309 20.0668 18.1596 20.7681 17.9437 21.5625H12.0562C11.8404 20.7681 11.3691 20.0668 10.7151 19.5668C10.0611 19.0668 9.26072 18.7959 8.4375 18.7959C7.61428 18.7959 6.81393 19.0668 6.15993 19.5668C5.50594 20.0668 5.03464 20.7681 4.81875 21.5625H3.75V15.1031C3.75373 14.4556 3.94827 13.8234 4.30875 13.2844L6.85875 9.525C7.02201 9.27876 7.24556 9.07752 7.50886 8.93963C7.77216 8.80175 8.06671 8.7313 8.36531 8.73469H15.0469C15.2554 8.73487 15.461 8.78147 15.6489 8.87118C15.8368 8.96089 16.0022 9.09147 16.1328 9.25312L19.3125 13.2375L26.25 15.7219V21.5625Z" fill="currentColor" />
    </svg>
  );
}

function HomeIcon() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M15.574 2.07551C15.4076 1.94565 15.2026 1.87512 14.9915 1.87512C14.7804 1.87512 14.5754 1.94565 14.409 2.07551L0.9375 12.5808L2.10253 14.0542L3.75 12.7697V24.3751C3.75102 24.872 3.94889 25.3484 4.3003 25.6998C4.65171 26.0512 5.12803 26.249 5.625 26.2501H24.375C24.872 26.2491 25.3484 26.0513 25.6998 25.6999C26.0512 25.3484 26.2491 24.8721 26.25 24.3751V12.7782L27.8975 14.0626L29.0625 12.589L15.574 2.07551ZM16.875 24.3751H13.125V16.8751H16.875V24.3751ZM18.75 24.3751V16.8751C18.7494 16.378 18.5517 15.9014 18.2002 15.5499C17.8487 15.1984 17.3721 15.0006 16.875 15.0001H13.125C12.6279 15.0006 12.1512 15.1983 11.7997 15.5498C11.4482 15.9013 11.2505 16.3779 11.25 16.8751V24.3751H5.625V11.3077L15 4.0046L24.375 11.3176V24.3751H18.75Z" fill="currentColor" />
    </svg>
  );
}

function WarningIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <g clipPath="url(#clip_warning)">
        <path d="M8.125 5.647V8.784M8.125 10.667H8.131M14.4 8C14.4 11.465 11.59 14.275 8.125 14.275C4.66 14.275 1.851 11.465 1.851 8C1.851 4.535 4.66 1.725 8.125 1.725C11.59 1.725 14.4 4.535 14.4 8Z" stroke="#946C00" strokeWidth="1.882" strokeLinecap="round" strokeLinejoin="round" />
      </g>
      <defs>
        <clipPath id="clip_warning">
          <rect width="16" height="16" fill="white" />
        </clipPath>
      </defs>
    </svg>
  );
}

// ─── EstimatePanel ───────────────────────────────────────────────────────────────
// Sticky right-column sidebar shown on screens ≥ 960px.
// Displays the live price range, a per-coverage breakdown, and a confidence
// progress bar that fills as the user completes more steps.
function EstimatePanel({ insuranceType, formData, currentStepKey, steps }) {
  const estimate = estimatePrice(insuranceType, formData, currentStepKey, steps);

  return (
    <aside className="estimate-panel" aria-label="Estimated monthly premium">
      <div className="estimate-panel__header">
        <h3 className="estimate-panel__title">Your Estimate</h3>
      </div>
      <div className="estimate-panel__body">
        {!estimate.ready ? (
          <div className="estimate-panel__placeholder">
            <p className="estimate-panel__placeholder-text">Calculating…</p>
            <p className="estimate-panel__placeholder-hint">
              Select a coverage type to see your estimated premium
            </p>
          </div>
        ) : (
          <>
            <div className="estimate-panel__price-block">
              <span className="estimate-panel__price-range">
                ${estimate.min}–${estimate.max}
              </span>
              <span className="estimate-panel__price-period">/mo</span>
            </div>

            <div className="estimate-panel__breakdown">
              {estimate.breakdown.map((item, i) => (
                <div
                  key={i}
                  className={`estimate-panel__breakdown-row${item.isDiscount ? ' estimate-panel__breakdown-row--discount' : ''}`}
                >
                  <span className="estimate-panel__breakdown-label">{item.label}</span>
                  <span className="estimate-panel__breakdown-amount">
                    {item.isDiscount ? `−$${item.amount}` : `$${item.amount}`}/mo
                  </span>
                </div>
              ))}
            </div>

            <div className="estimate-panel__confidence">
              <p className="estimate-panel__confidence-label">
                Based on {estimate.detailsCompleted} of {estimate.totalDetails} details
              </p>
              <div
                className="estimate-panel__confidence-track"
                role="progressbar"
                aria-valuenow={estimate.confidence}
                aria-valuemin={0}
                aria-valuemax={100}
                aria-label={`Estimate confidence: ${estimate.confidence}%`}
              >
                <div
                  className="estimate-panel__confidence-fill"
                  style={{ width: `${estimate.confidence}%` }}
                />
              </div>
            </div>
          </>
        )}

        <p className="estimate-panel__disclaimer">
          Estimate based on your answers so far. Final quote confirmed at submission.
        </p>
      </div>
    </aside>
  );
}

// ─── MobileEstimateBar ───────────────────────────────────────────────────────────
// Compact, collapsible bar placed between the form body and the action buttons
// on screens < 960px (where the sidebar panel is hidden via CSS).
// Tapping the toggle row expands an inline breakdown of the estimate.
function MobileEstimateBar({ estimate, isExpanded, onToggle }) {
  // Nothing to render until a coverage type has been selected
  if (!estimate.ready) return null;

  return (
    <div className="estimate-mobile-bar">
      <button
        className="estimate-mobile-bar__toggle"
        onClick={onToggle}
        type="button"
        aria-expanded={isExpanded}
        aria-controls="estimate-mobile-expanded"
      >
        <div className="estimate-mobile-bar__summary">
          <span className="estimate-mobile-bar__label">Estimated Monthly</span>
          <span className="estimate-mobile-bar__price">
            ${estimate.min}–${estimate.max}
            <span className="estimate-mobile-bar__period">/mo</span>
          </span>
        </div>
        <ChevronDown
          size={16}
          aria-hidden="true"
          className={`estimate-mobile-bar__chevron${isExpanded ? ' estimate-mobile-bar__chevron--flipped' : ''}`}
        />
      </button>

      {isExpanded && (
        <div className="estimate-mobile-bar__expanded" id="estimate-mobile-expanded">
          <div className="estimate-panel__breakdown">
            {estimate.breakdown.map((item, i) => (
              <div
                key={i}
                className={`estimate-panel__breakdown-row${item.isDiscount ? ' estimate-panel__breakdown-row--discount' : ''}`}
              >
                <span className="estimate-panel__breakdown-label">{item.label}</span>
                <span className="estimate-panel__breakdown-amount">
                  {item.isDiscount ? `−$${item.amount}` : `$${item.amount}`}/mo
                </span>
              </div>
            ))}
          </div>
          <p className="estimate-panel__disclaimer">
            Estimate based on your answers so far. Final quote confirmed at submission.
          </p>
        </div>
      )}
    </div>
  );
}

// ─── SignUpPage ───────────────────────────────────────────────────────────────────
// Orchestrates the full multi-step insurance sign-up flow.
// Step order is dynamic: the coverage selection determines which detail steps
// (Car / Home / both) appear. All form state lives here and is passed down to
// the individual step sub-components at the bottom of this file.
export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(0);
  const [insuranceType, setInsuranceType] = useState(null);
  const [warningDismissed, setWarningDismissed] = useState(false);
  const [errors, setErrors] = useState({});
  const [mobileEstimateExpanded, setMobileEstimateExpanded] = useState(false);
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    altPhone: '',
    dateOfBirth: '',
    make: '',
    model: '',
    year: '',
    mileage: 1000,
    milesDrivenPerYear: 1000,
    vin: '',
    homeType: '',
    yearBuilt: '',
    squareFeet: 1000,
    estimatedHomeValue: 1000,
    streetAddress: '',
    city: '',
    state: '',
    zip: '',
  });

  /**
   * Builds the ordered step list based on which coverage type the user selected.
   * Both Car and Home Details are included when no type is chosen yet so the
   * breadcrumb renders a full placeholder trail immediately. Once a type is
   * confirmed only the relevant detail step(s) remain.
   */
  const buildSteps = (type) => {
    const steps = [
      { key: STEP_KEYS.PERSONAL, label: 'Personal Info' },
      { key: STEP_KEYS.COVERAGE, label: 'Coverage' },
    ];
    if (!type || type === 'car' || type === 'both') {
      steps.push({ key: STEP_KEYS.CAR, label: 'Car Details' });
    }
    if (!type || type === 'home' || type === 'both') {
      steps.push({ key: STEP_KEYS.HOME, label: 'Home Details' });
    }
    steps.push({ key: STEP_KEYS.ADDRESS, label: 'Address' });
    return steps;
  };

  const steps = buildSteps(insuranceType);
  const totalSteps = steps.length;
  const currentStepKey = steps[currentStep]?.key;

  /**
   * Updates a single form field and immediately clears its validation error.
   * Clearing on change gives instant positive feedback once the user corrects a field,
   * rather than making them click Next again to see the error disappear.
   */
  const updateField = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next[field];
        return next;
      });
    }
  };

  const runValidation = () => {
    switch (currentStepKey) {
      case STEP_KEYS.PERSONAL:
        return validatePersonal(formData);
      case STEP_KEYS.COVERAGE:
        return validateCoverage(insuranceType);
      case STEP_KEYS.CAR:
        return validateCar(formData);
      case STEP_KEYS.HOME:
        return validateHome(formData);
      case STEP_KEYS.ADDRESS:
        return validateAddress(formData);
      default:
        return {};
    }
  };

  const handleNext = () => {
    const stepErrors = runValidation();
    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      // Defer one tick so React re-renders the error states before we query the DOM,
      // then scroll the first invalid field into view so users can't miss it.
      setTimeout(() => {
        const firstInvalid = document.querySelector(
          '.cds--text-input--invalid, .cds--select--invalid, .cds--number--invalid, .signup-coverage-error, .signup-date-error'
        );
        firstInvalid?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }
    setErrors({});
    if (currentStep < totalSteps - 1) {
      setCurrentStep((prev) => prev + 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleBack = () => {
    setErrors({});
    if (currentStep > 0) {
      setCurrentStep((prev) => prev - 1);
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  const handleCancelToInsurance = () => {
    setErrors({});
    const coverageIndex = steps.findIndex((s) => s.key === STEP_KEYS.COVERAGE);
    if (coverageIndex >= 0) setCurrentStep(coverageIndex);
  };

  const handleSelectInsurance = (type) => {
    // Tapping the already-selected tile toggles it off (deselect behaviour)
    const newType = insuranceType === type ? null : type;
    setInsuranceType(newType);
    if (errors.insuranceType) {
      setErrors((prev) => {
        const next = { ...prev };
        delete next.insuranceType;
        return next;
      });
    }
    // Rebuilding steps may remove Car or Home Details; clamp currentStep so it
    // never points past the end of the new step array.
    const newSteps = buildSteps(newType);
    if (currentStep >= newSteps.length) {
      setCurrentStep(newSteps.length - 1);
    }
  };

  const isLastStep = currentStep === totalSteps - 1;
  const showWarning = currentStepKey === STEP_KEYS.CAR && !warningDismissed;
  const showCancelButton = currentStepKey === STEP_KEYS.CAR;

  // Compute once per render so both the desktop sidebar and mobile bar display identical numbers.
  const computedEstimate = estimatePrice(insuranceType, formData, currentStepKey, steps);

  const renderStepContent = () => {
    switch (currentStepKey) {
      case STEP_KEYS.PERSONAL:
        return (
          <PersonalInfoStep
            formData={formData}
            updateField={updateField}
            errors={errors}
          />
        );
      case STEP_KEYS.COVERAGE:
        return (
          <InsuranceTypeStep
            insuranceType={insuranceType}
            onSelect={handleSelectInsurance}
            error={errors.insuranceType}
          />
        );
      case STEP_KEYS.CAR:
        return (
          <CarDetailsStep
            formData={formData}
            updateField={updateField}
            errors={errors}
          />
        );
      case STEP_KEYS.HOME:
        return (
          <PropertyDetailsStep
            formData={formData}
            updateField={updateField}
            errors={errors}
          />
        );
      case STEP_KEYS.ADDRESS:
        return (
          <AddressStep
            formData={formData}
            updateField={updateField}
            errors={errors}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="signup-page">
      <div className="signup-outer">
        <div className="signup-hero">
          <h1 className="signup-hero__title">Sign Up for InsureCo</h1>
          <p className="signup-hero__subtitle">
            Get started with your insurance coverage in just a few steps
          </p>
        </div>

        <div className="signup-progress">
          <StepBreadcrumb steps={steps} currentIndex={currentStep} />
        </div>

        {showWarning && (
          <div className="signup-warning" role="alert">
            <div className="signup-warning__content">
              <WarningIcon />
              <span className="signup-warning__text">This is a warning message</span>
            </div>
            <button
              className="signup-warning__dismiss"
              onClick={() => setWarningDismissed(true)}
              aria-label="Dismiss warning"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Two-column layout on desktop: form card fills remaining width, estimate panel is a sticky sidebar */}
        <div className="signup-content-area">
          <div className="signup-form-card">
            <div className="signup-form-card__body">
              {renderStepContent()}
            </div>

            {/* Mobile-only estimate bar — CSS hides this on screens ≥ 960px where the sidebar takes over */}
            <MobileEstimateBar
              estimate={computedEstimate}
              isExpanded={mobileEstimateExpanded}
              onToggle={() => setMobileEstimateExpanded((prev) => !prev)}
            />

            <div className="signup-form-card__actions">
              {showCancelButton && (
                <Button
                  kind="tertiary"
                  size="lg"
                  renderIcon={ArrowLeft}
                  onClick={handleCancelToInsurance}
                  className="signup-btn-cancel"
                >
                  Cancel
                </Button>
              )}
              <div className="signup-form-card__actions-right">
                {currentStep > 0 && (
                  <Button
                    kind="secondary"
                    size="lg"
                    renderIcon={ArrowLeft}
                    iconDescription="Back"
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                )}
                <Button
                  kind="primary"
                  size="lg"
                  renderIcon={ArrowRight}
                  iconDescription={isLastStep ? 'Submit' : 'Next'}
                  onClick={handleNext}
                >
                  {isLastStep ? 'Submit' : 'Next'}
                </Button>
              </div>
            </div>
          </div>

          {/* Desktop sidebar — hidden on mobile via CSS (MobileEstimateBar is shown instead) */}
          <EstimatePanel
            insuranceType={insuranceType}
            formData={formData}
            currentStepKey={currentStepKey}
            steps={steps}
          />
        </div>
      </div>
    </div>
  );
}

// ─── Step: Personal Information ────────────────────────────────────────────────
function PersonalInfoStep({ formData, updateField, errors }) {
  return (
    <div className="signup-step">
      <div className="signup-step__header">
        <h2 className="signup-step__title">Personal Information</h2>
      </div>
      <p className="signup-step__description">
        Let&apos;s start with some basic information about you.
      </p>

      <div className="signup-fields">
        <TextInput
          id="firstName"
          labelText="First Name"
          placeholder="Enter your first name"
          value={formData.firstName}
          onChange={(e) => updateField('firstName', e.target.value)}
          size="lg"
          invalid={!!errors.firstName}
          invalidText={errors.firstName}
        />
        <TextInput
          id="lastName"
          labelText="Last Name"
          placeholder="Enter your last name"
          value={formData.lastName}
          onChange={(e) => updateField('lastName', e.target.value)}
          size="lg"
          invalid={!!errors.lastName}
          invalidText={errors.lastName}
        />
        <TextInput
          id="email"
          labelText="Email Address"
          placeholder="your.email@example.com"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          size="lg"
          invalid={!!errors.email}
          invalidText={errors.email}
        />
        <TextInput
          id="phone"
          labelText="Phone Number"
          placeholder="(555) 123-4567"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          size="lg"
          invalid={!!errors.phone}
          invalidText={errors.phone}
        />
        <TextInput
          id="altPhone"
          labelText="Alternate Phone Number"
          placeholder="(555) 123-4567"
          type="tel"
          value={formData.altPhone}
          onChange={(e) => updateField('altPhone', e.target.value)}
          size="lg"
          invalid={!!errors.altPhone}
          invalidText={errors.altPhone}
        />

        <div className={`signup-date-wrapper ${errors.dateOfBirth ? 'signup-date-wrapper--invalid' : ''}`}>
          <DatePicker
            datePickerType="single"
            dateFormat="m/d/Y"
            onChange={(dates) => {
              if (dates[0]) {
                const d = dates[0];
                updateField(
                  'dateOfBirth',
                  `${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`
                );
              } else {
                updateField('dateOfBirth', '');
              }
            }}
          >
            <DatePickerInput
              id="dateOfBirth"
              labelText="Date of Birth"
              placeholder="mm/dd/yyyy"
              size="lg"
              invalid={!!errors.dateOfBirth}
              invalidText={errors.dateOfBirth}
            />
          </DatePicker>
        </div>
      </div>
    </div>
  );
}

// ─── Step: Insurance Type ───────────────────────────────────────────────────────
function InsuranceTypeStep({ insuranceType, onSelect, error }) {
  const options = [
    {
      key: 'car',
      title: 'Car Insurance',
      description: 'Get comprehensive coverage for your vehicle',
      icons: [<CarIcon key="car" />],
    },
    {
      key: 'home',
      title: 'Home Insurance',
      description: 'Protect your most important asset for your family',
      icons: [<HomeIcon key="home" />],
    },
    {
      key: 'both',
      title: 'Both Home and Car',
      description: 'Insure both and get bundle savings',
      icons: [<CarIcon key="car" />, <HomeIcon key="home" />],
    },
  ];

  return (
    <div className="signup-step">
      <div className="signup-step__header">
        <h2 className="signup-step__title">What Will You Insure</h2>
      </div>
      <p className="signup-step__description">
        Which insurance coverage are you looking for
      </p>

      <div
        className={`signup-insurance-tiles ${error ? 'signup-insurance-tiles--invalid' : ''}`}
        role="group"
        aria-label="Select insurance coverage type"
      >
        {options.map((opt) => (
          <button
            key={opt.key}
            className={`signup-insurance-tile ${insuranceType === opt.key ? 'signup-insurance-tile--selected' : ''}`}
            onClick={() => onSelect(opt.key)}
            aria-pressed={insuranceType === opt.key}
            type="button"
          >
            <div className="signup-insurance-tile__icons">
              {opt.icons}
            </div>
            <div className="signup-insurance-tile__content">
              <span className="signup-insurance-tile__title">{opt.title}</span>
              <span className="signup-insurance-tile__desc">{opt.description}</span>
            </div>
          </button>
        ))}
      </div>

      {error && (
        <p className="signup-coverage-error" role="alert">
          <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true" className="signup-coverage-error__icon">
            <path d="M8 1C4.1 1 1 4.1 1 8s3.1 7 7 7 7-3.1 7-7-3.1-7-7-7zm-.5 3h1v5h-1V4zm.5 8c-.6 0-1-.4-1-1s.4-1 1-1 1 .4 1 1-.4 1-1 1z" fill="currentColor" />
          </svg>
          {error}
        </p>
      )}
    </div>
  );
}

// ─── Step: Car Details ──────────────────────────────────────────────────────────
function CarDetailsStep({ formData, updateField, errors }) {
  return (
    <div className="signup-step">
      <div className="signup-step__header">
        <h2 className="signup-step__title">Car Details</h2>
      </div>
      <p className="signup-step__description">Tell us about your car</p>

      <div className="signup-fields">
        <TextInput
          id="carMake"
          labelText="Make"
          placeholder="e.g. Toyota, Ford"
          value={formData.make}
          onChange={(e) => updateField('make', e.target.value)}
          size="lg"
          invalid={!!errors.make}
          invalidText={errors.make}
        />
        <TextInput
          id="carModel"
          labelText="Model"
          placeholder="e.g. Corolla, Bronco"
          value={formData.model}
          onChange={(e) => updateField('model', e.target.value)}
          size="lg"
          invalid={!!errors.model}
          invalidText={errors.model}
        />
        <Select
          id="carYear"
          labelText="Year"
          value={formData.year}
          onChange={(e) => updateField('year', e.target.value)}
          size="lg"
          invalid={!!errors.year}
          invalidText={errors.year}
        >
          <SelectItem value="" text="" />
          {CAR_YEARS.map((yr) => (
            <SelectItem key={yr} value={String(yr)} text={String(yr)} />
          ))}
        </Select>
        <NumberInput
          id="mileage"
          label="Mileage"
          value={formData.mileage}
          min={0}
          step={1000}
          onChange={(e, { value }) => updateField('mileage', value)}
          size="lg"
        />
        <NumberInput
          id="milesDrivenPerYear"
          label="Miles driven per year"
          value={formData.milesDrivenPerYear}
          min={0}
          step={1000}
          onChange={(e, { value }) => updateField('milesDrivenPerYear', value)}
          size="lg"
        />
        <TextInput
          id="vin"
          labelText="VIN (optional)"
          placeholder=""
          helperText="17 digits"
          value={formData.vin}
          onChange={(e) => updateField('vin', e.target.value)}
          size="lg"
          maxLength={17}
          invalid={!!errors.vin}
          invalidText={errors.vin}
        />
      </div>
    </div>
  );
}

// ─── Step: Property Details ─────────────────────────────────────────────────────
function PropertyDetailsStep({ formData, updateField, errors }) {
  return (
    <div className="signup-step">
      <div className="signup-step__header">
        <h2 className="signup-step__title">Property Details</h2>
      </div>
      <p className="signup-step__description">Tell us about your home</p>

      <div className="signup-fields">
        <Select
          id="homeType"
          labelText="Home Type"
          value={formData.homeType}
          onChange={(e) => updateField('homeType', e.target.value)}
          size="lg"
          invalid={!!errors.homeType}
          invalidText={errors.homeType}
        >
          <SelectItem value="" text="" />
          {HOME_TYPES.map((type) => (
            <SelectItem key={type} value={type} text={type} />
          ))}
        </Select>
        <Select
          id="yearBuilt"
          labelText="Year Built"
          value={formData.yearBuilt}
          onChange={(e) => updateField('yearBuilt', e.target.value)}
          size="lg"
          invalid={!!errors.yearBuilt}
          invalidText={errors.yearBuilt}
        >
          <SelectItem value="" text="" />
          {HOME_YEARS.map((yr) => (
            <SelectItem key={yr} value={String(yr)} text={String(yr)} />
          ))}
        </Select>
        <NumberInput
          id="squareFeet"
          label="Square Feet"
          helperText="We'll confirm this more accurately later"
          value={formData.squareFeet}
          min={0}
          step={100}
          onChange={(e, { value }) => updateField('squareFeet', value)}
          size="lg"
        />
        <NumberInput
          id="estimatedHomeValue"
          label="Estimated Home Value"
          helperText="We'll confirm this more accurately later"
          value={formData.estimatedHomeValue}
          min={0}
          step={10000}
          onChange={(e, { value }) => updateField('estimatedHomeValue', value)}
          size="lg"
        />
      </div>
    </div>
  );
}

// ─── Step: Address ──────────────────────────────────────────────────────────────
function AddressStep({ formData, updateField, errors }) {
  return (
    <div className="signup-step">
      <div className="signup-step__header">
        <h2 className="signup-step__title">Your Address</h2>
      </div>
      <p className="signup-step__description">Let us know where you live</p>

      <div className="signup-fields">
        <TextInput
          id="streetAddress"
          labelText="Street Address"
          placeholder="123 Main Street"
          value={formData.streetAddress}
          onChange={(e) => updateField('streetAddress', e.target.value)}
          size="lg"
          invalid={!!errors.streetAddress}
          invalidText={errors.streetAddress}
        />
        <TextInput
          id="city"
          labelText="City"
          placeholder="Your city"
          value={formData.city}
          onChange={(e) => updateField('city', e.target.value)}
          size="lg"
          invalid={!!errors.city}
          invalidText={errors.city}
        />
        <Select
          id="state"
          labelText="State"
          value={formData.state}
          onChange={(e) => updateField('state', e.target.value)}
          size="lg"
          invalid={!!errors.state}
          invalidText={errors.state}
        >
          <SelectItem value="" text="" />
          {US_STATES.map((s) => (
            <SelectItem key={s.code} value={s.code} text={s.name} />
          ))}
        </Select>
        <TextInput
          id="zip"
          labelText="Zip"
          placeholder="12345"
          value={formData.zip}
          onChange={(e) => updateField('zip', e.target.value)}
          size="lg"
          maxLength={10}
          invalid={!!errors.zip}
          invalidText={errors.zip}
        />
      </div>
    </div>
  );
}
