import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  TextInput,
  Select,
  SelectItem,
  NumberInput,
  Button,
} from '@carbon/react';
import { ArrowRight, ArrowLeft, Checkmark, Purchase, Security, Time } from '@carbon/icons-react';
import StepBreadcrumb from '../components/StepBreadcrumb';
import './SignUpPage.scss';

// ============================================
// Static data
// ============================================
const US_STATES = [
  'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado',
  'Connecticut', 'Delaware', 'Florida', 'Georgia', 'Hawaii', 'Idaho',
  'Illinois', 'Indiana', 'Iowa', 'Kansas', 'Kentucky', 'Louisiana',
  'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota', 'Mississippi',
  'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
  'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma',
  'Oregon', 'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota',
  'Tennessee', 'Texas', 'Utah', 'Vermont', 'Virginia', 'Washington',
  'West Virginia', 'Wisconsin', 'Wyoming',
];

const currentYear = new Date().getFullYear();
const CAR_YEARS = Array.from({ length: currentYear - 1979 }, (_, i) => currentYear - i);
const HOME_YEARS = Array.from({ length: currentYear - 1799 }, (_, i) => currentYear - i);
const HOME_TYPES = ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Mobile Home', 'Other'];

// ============================================
// Step keys & config
// ============================================
const STEP_PERSONAL = 'personal';
const STEP_INSURANCE = 'insurance';
const STEP_ADDRESS = 'address';
const STEP_CAR = 'car';
const STEP_PROPERTY = 'property';
const STEP_QUOTE = 'quote';

const STEP_CONFIG = {
  [STEP_PERSONAL]:  { label: 'Personal Info',     description: 'Your details' },
  [STEP_INSURANCE]: { label: 'Insurance Type',     description: 'What to cover' },
  [STEP_ADDRESS]:   { label: 'Your Address',       description: 'Where you live' },
  [STEP_CAR]:       { label: 'Car Details',        description: 'Vehicle info' },
  [STEP_PROPERTY]:  { label: 'Property Details',   description: 'Home info' },
  [STEP_QUOTE]:     { label: 'Your Quote',         description: 'Review & confirm' },
};

function getActiveStepKeys(insuranceType) {
  const base = [STEP_PERSONAL, STEP_INSURANCE, STEP_ADDRESS];
  if (insuranceType === 'car'  || insuranceType === 'both') base.push(STEP_CAR);
  if (insuranceType === 'home' || insuranceType === 'both') base.push(STEP_PROPERTY);
  if (!insuranceType) base.push(STEP_CAR); // placeholder shown before selection
  base.push(STEP_QUOTE);
  return base;
}

// ============================================
// Quote calculation
// ============================================
function calculateQuote(formData) {
  const type = formData.insuranceType;

  // Base monthly rates
  let carBase = 0;
  let homeBase = 0;

  if (type === 'car' || type === 'both') {
    carBase = 89;
    // Older cars get a slight discount
    const carAge = new Date().getFullYear() - Number(formData.carYear || new Date().getFullYear());
    if (carAge > 10) carBase -= 12;
    else if (carAge > 5) carBase -= 6;
    // High mileage slightly increases rate
    if (formData.carMilesPerYear > 15000) carBase += 8;
    else if (formData.carMilesPerYear > 10000) carBase += 4;
  }

  if (type === 'home' || type === 'both') {
    homeBase = 74;
    // Higher home value = higher rate
    const value = formData.estimatedValue || 0;
    if (value > 500000) homeBase += 22;
    else if (value > 300000) homeBase += 12;
    else if (value > 150000) homeBase += 5;
  }

  const subtotal = carBase + homeBase;

  // Bundle discount applied when insuring both
  const bundleDiscount = type === 'both' ? 24 : 0;

  const total = subtotal - bundleDiscount;

  return { carBase, homeBase, subtotal, bundleDiscount, total };
}

// ============================================
// Validation helpers
// ============================================
function isValidEmail(email) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email.trim());
}

function isValidPhone(phone) {
  const digits = phone.replace(/\D/g, '');
  return digits.length >= 10;
}

function isValidZip(zip) {
  return /^\d{5}(-\d{4})?$/.test(zip.trim());
}

function isValidVin(vin) {
  return vin.trim().length === 0 || vin.trim().length === 17;
}

function isAtLeast18(dateString) {
  if (!dateString) return false;
  const dob = new Date(dateString);
  const cutoff = new Date();
  cutoff.setFullYear(cutoff.getFullYear() - 18);
  return dob <= cutoff;
}

/**
 * Returns an object of { fieldName: errorMessage } for a given step.
 * Empty object means the step is valid.
 */
function validateStep(stepKey, data) {
  const e = {};

  if (stepKey === STEP_PERSONAL) {
    if (!data.firstName.trim())
      e.firstName = 'First name is required';

    if (!data.lastName.trim())
      e.lastName = 'Last name is required';

    if (!data.email.trim())
      e.email = 'Email address is required';
    else if (!isValidEmail(data.email))
      e.email = 'Enter a valid email address';

    if (!data.phone.trim())
      e.phone = 'Phone number is required';
    else if (!isValidPhone(data.phone))
      e.phone = 'Enter a valid 10-digit phone number';

    if (!data.dateOfBirth)
      e.dateOfBirth = 'Date of birth is required';
    else if (!isAtLeast18(data.dateOfBirth))
      e.dateOfBirth = 'You must be at least 18 years old to sign up';
  }

  if (stepKey === STEP_INSURANCE) {
    if (!data.insuranceType)
      e.insuranceType = 'Please select an insurance type to continue';
  }

  if (stepKey === STEP_ADDRESS) {
    if (!data.streetAddress.trim())
      e.streetAddress = 'Street address is required';

    if (!data.city.trim())
      e.city = 'City is required';

    if (!data.state)
      e.state = 'State is required';

    if (!data.zipCode.trim())
      e.zipCode = 'ZIP code is required';
    else if (!isValidZip(data.zipCode))
      e.zipCode = 'Enter a valid 5-digit ZIP code';
  }

  if (stepKey === STEP_CAR) {
    if (!data.carMake.trim())
      e.carMake = 'Make is required';

    if (!data.carModel.trim())
      e.carModel = 'Model is required';

    if (!data.carYear)
      e.carYear = 'Year is required';

    if (!isValidVin(data.carVin))
      e.carVin = 'VIN must be exactly 17 characters';
  }

  if (stepKey === STEP_PROPERTY) {
    if (!data.homeType)
      e.homeType = 'Home type is required';

    if (!data.yearBuilt)
      e.yearBuilt = 'Year built is required';

    if (!data.squareFeet || data.squareFeet <= 0)
      e.squareFeet = 'Square footage must be greater than 0';

    if (!data.estimatedValue || data.estimatedValue <= 0)
      e.estimatedValue = 'Estimated home value must be greater than 0';
  }

  return e;
}

// ============================================
// SVG icons for insurance tiles
// ============================================
function CarSvg() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M27.5063 14.9437L20.2594 12.3375L17.2219 8.53125C16.9582 8.20912 16.6264 7.94952 16.2503 7.77118C15.8742 7.59285 15.4631 7.50023 15.0469 7.5H7.54688C7.08935 7.50236 6.63932 7.61631 6.2358 7.83196C5.83228 8.0476 5.48746 8.35844 5.23125 8.7375L2.69062 12.4875C2.16433 13.2587 1.88032 14.1695 1.875 15.1031V22.5C1.875 22.7486 1.97377 22.9871 2.14959 23.1629C2.3254 23.3387 2.56386 23.4375 2.8125 23.4375H4.81875C5.03464 24.2319 5.50594 24.9332 6.15993 25.4332C6.81393 25.9332 7.61428 26.2041 8.4375 26.2041C9.26072 26.2041 10.0611 25.9332 10.7151 25.4332C11.3691 24.9332 11.8404 24.2319 12.0562 23.4375H17.9437C18.1596 24.2319 18.6309 24.9332 19.2849 25.4332C19.9389 25.9332 20.7393 26.2041 21.5625 26.2041C22.3857 26.2041 23.1861 25.9332 23.8401 25.4332C24.4941 24.9332 24.9654 24.2319 25.1813 23.4375H27.1875C27.4361 23.4375 27.6746 23.3387 27.8504 23.1629C28.0262 22.9871 28.125 22.7486 28.125 22.5V15.825C28.1249 15.6323 28.0655 15.4444 27.9548 15.2867C27.844 15.129 27.6874 15.0093 27.5063 14.9437ZM8.4375 24.375C8.06666 24.375 7.70415 24.265 7.39581 24.059C7.08746 23.853 6.84714 23.5601 6.70523 23.2175C6.56331 22.8749 6.52618 22.4979 6.59853 22.1342C6.67087 21.7705 6.84945 21.4364 7.11167 21.1742C7.3739 20.912 7.70799 20.7334 8.07171 20.661C8.43542 20.5887 8.81242 20.6258 9.15503 20.7677C9.49764 20.9096 9.79048 21.15 9.99651 21.4583C10.2025 21.7666 10.3125 22.1292 10.3125 22.5C10.3125 22.9973 10.115 23.4742 9.76332 23.8258C9.41169 24.1775 8.93478 24.375 8.4375 24.375ZM21.5625 24.375C21.1917 24.375 20.8291 24.265 20.5208 24.059C20.2125 23.853 19.9721 23.5601 19.8302 23.2175C19.6883 22.8749 19.6512 22.4979 19.7235 22.1342C19.7959 21.7705 19.9745 21.4364 20.2367 21.1742C20.4989 20.912 20.833 20.7334 21.1967 20.661C21.5604 20.5887 21.9374 20.6258 22.28 20.7677C22.6226 20.9096 22.9155 21.15 23.1215 21.4583C23.3275 21.7666 23.4375 22.1292 23.4375 22.5C23.4375 22.9973 23.24 23.4742 22.8883 23.8258C22.5367 24.1775 22.0598 24.375 21.5625 24.375ZM26.25 21.5625H25.1813C24.9654 20.7681 24.4941 20.0668 23.8401 19.5668C23.1861 19.0668 22.3857 18.7959 21.5625 18.7959C20.7393 18.7959 19.9389 19.0668 19.2849 19.5668C18.6309 20.0668 18.1596 20.7681 17.9437 21.5625H12.0562C11.8404 20.7681 11.3691 20.0668 10.7151 19.5668C10.0611 19.0668 9.26072 18.7959 8.4375 18.7959C7.61428 18.7959 6.81393 19.0668 6.15993 19.5668C5.50594 20.0668 5.03464 20.7681 4.81875 21.5625H3.75V15.1031C3.74964 14.538 3.91952 13.9859 4.2375 13.5188L6.77812 9.76875C6.86622 9.64498 6.98307 9.54448 7.11862 9.47589C7.25417 9.4073 7.40435 9.37268 7.55625 9.375H15.0562C15.194 9.37478 15.3301 9.4049 15.4548 9.46323C15.5796 9.52157 15.69 9.60667 15.7781 9.7125L18.9656 13.7156C19.0756 13.8489 19.2175 13.9521 19.3781 14.0156L26.25 16.4813V21.5625Z" fill="currentColor"/>
    </svg>
  );
}

function HomeSvg() {
  return (
    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M15.574 2.07551C15.4076 1.94565 15.2026 1.87512 14.9915 1.87512C14.7804 1.87512 14.5754 1.94565 14.409 2.07551L0.9375 12.5808L2.10253 14.0542L3.75 12.7697V24.3751C3.75102 24.872 3.94889 25.3484 4.3003 25.6998C4.65171 26.0512 5.12803 26.249 5.625 26.2501H24.375C24.872 26.2491 25.3484 26.0513 25.6998 25.6999C26.0512 25.3484 26.2491 24.8721 26.25 24.3751V12.7782L27.8975 14.0626L29.0625 12.589L15.574 2.07551ZM16.875 24.3751H13.125V16.8751H16.875V24.3751ZM18.75 24.3751V16.8751C18.7494 16.378 18.5517 15.9014 18.2002 15.5499C17.8487 15.1984 17.3721 15.0006 16.875 15.0001H13.125C12.6279 15.0006 12.1512 15.1983 11.7997 15.5498C11.4482 15.9013 11.2505 16.3779 11.25 16.8751V24.3751H5.625V11.3077L15 4.0046L24.375 11.3176V24.3751H18.75Z" fill="currentColor"/>
    </svg>
  );
}

// ============================================
// Main component
// ============================================
export default function SignUpPage() {
  const navigate = useNavigate();

  const [wizardStep, setWizardStep]       = useState(0);
  const [errors, setErrors]               = useState({});
  // Tracks which steps the user has tried to advance from (triggers error display)
  const [attemptedSteps, setAttemptedSteps] = useState(new Set());
  const [showWarning, setShowWarning]     = useState(true);

  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    insuranceType: '',
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    carMake: '',
    carModel: '',
    carYear: '',
    carMileage: 1000,
    carMilesPerYear: 1000,
    carVin: '',
    homeType: '',
    yearBuilt: '',
    squareFeet: 1000,
    estimatedValue: 1000,
  });

  const activeStepKeys  = getActiveStepKeys(formData.insuranceType);
  const currentStepKey  = activeStepKeys[wizardStep];
  const isFirstStep     = wizardStep === 0;
  const isLastStep      = wizardStep === activeStepKeys.length - 1;
  const stepWasAttempted = attemptedSteps.has(currentStepKey);

  // Breadcrumb steps
  const displayBreadcrumbSteps = activeStepKeys.map((key) => {
    const config = STEP_CONFIG[key] ?? { label: 'Step', description: '' };
    // Placeholder label before insurance type is chosen
    if (key === STEP_CAR && !formData.insuranceType) {
      return { key, label: 'Details', description: 'Coverage info' };
    }
    return { key, label: config.label, description: config.description };
  });

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [wizardStep]);

  // ============================================
  // Field change handler — re-validates in real
  // time once a step has been attempted
  // ============================================
  function handleField(field, value) {
    const updated = { ...formData, [field]: value };
    setFormData(updated);

    if (attemptedSteps.has(currentStepKey)) {
      setErrors(validateStep(currentStepKey, updated));
    }
  }

  // ============================================
  // Navigation handlers
  // ============================================
  function handleNext() {
    const stepErrors = validateStep(currentStepKey, formData);

    if (Object.keys(stepErrors).length > 0) {
      setErrors(stepErrors);
      setAttemptedSteps((prev) => new Set([...prev, currentStepKey]));
      // Scroll to first error
      setTimeout(() => {
        const firstError = document.querySelector('.cds--text-input--invalid, .cds--select--invalid, .cds--number--invalid, .signup-page__insurance-error');
        firstError?.scrollIntoView({ behavior: 'smooth', block: 'center' });
      }, 50);
      return;
    }

    setErrors({});

    if (!isLastStep) {
      setWizardStep((s) => s + 1);
    } else {
      console.log('Sign-up submitted:', formData);
      navigate('/dashboard');
    }
  }

  function handleBack() {
    if (wizardStep > 0) {
      setErrors({});
      setWizardStep((s) => s - 1);
    }
  }

  function handleCancel() {
    const insuranceIdx = activeStepKeys.indexOf(STEP_INSURANCE);
    setErrors({});
    setWizardStep(insuranceIdx >= 0 ? insuranceIdx : 0);
  }

  function handleInsuranceSelect(type) {
    handleField('insuranceType', type);
  }

  // Re-adjust step index when insurance type changes and step list shifts
  const prevInsuranceType = React.useRef(formData.insuranceType);
  useEffect(() => {
    if (prevInsuranceType.current !== formData.insuranceType) {
      prevInsuranceType.current = formData.insuranceType;
      const newStepKeys = getActiveStepKeys(formData.insuranceType);
      if (!newStepKeys.includes(currentStepKey)) {
        setWizardStep(Math.min(wizardStep, newStepKeys.length - 1));
      }
    }
  }, [formData.insuranceType, currentStepKey, wizardStep]);

  // ============================================
  // Render
  // ============================================
  return (
    <div className="signup-page">
      <div className="signup-page__wrapper">

        {/* Header Banner */}
        <div className="signup-page__header">
          <h1 className="signup-page__title">Sign Up for InsureCo</h1>
          <p className="signup-page__subtitle">
            Get started with your insurance coverage in just a few steps
          </p>
        </div>

        {/* Progress Indicator */}
        <div className="signup-page__progress">
          <StepBreadcrumb
            steps={displayBreadcrumbSteps}
            currentIndex={wizardStep}
            spaceEqually
          />
        </div>

        {/* Warning Banner — Car Details step only */}
        {currentStepKey === STEP_CAR && showWarning && (
          <div className="signup-page__warning-banner">
            <div className="signup-page__warning-content">
              <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                <g clipPath="url(#clip0_warning)">
                  <path d="M8.125 5.647V8.784M8.125 10.667H8.131M14.4 8C14.4 11.465 11.59 14.275 8.125 14.275C4.66 14.275 1.85 11.465 1.85 8C1.85 4.535 4.66 1.725 8.125 1.725C11.59 1.725 14.4 4.535 14.4 8Z" stroke="#946C00" strokeWidth="1.882" strokeLinecap="round" strokeLinejoin="round"/>
                </g>
                <defs>
                  <clipPath id="clip0_warning">
                    <rect width="16" height="16" fill="white"/>
                  </clipPath>
                </defs>
              </svg>
              <span className="signup-page__warning-text">This is a warning message</span>
            </div>
            <button className="signup-page__warning-dismiss" onClick={() => setShowWarning(false)}>
              Dismiss
            </button>
          </div>
        )}

        {/* Form Card */}
        <div className="signup-page__form-card">

          {/* ── Step 1: Personal Information ── */}
          {currentStepKey === STEP_PERSONAL && (
            <div className="signup-page__step">
              <div className="signup-page__step-header">
                <h2 className="signup-page__step-title">Personal Information</h2>
              </div>
              <p className="signup-page__step-desc">
                Let&apos;s start with some basic information about you.
              </p>
              <div className="signup-page__fields">
                <TextInput
                  id="firstName"
                  labelText="First Name"
                  placeholder="Enter your first name"
                  value={formData.firstName}
                  onChange={(e) => handleField('firstName', e.target.value)}
                  invalid={stepWasAttempted && !!errors.firstName}
                  invalidText={errors.firstName}
                  size="lg"
                />
                <TextInput
                  id="lastName"
                  labelText="Last Name"
                  placeholder="Enter your last name"
                  value={formData.lastName}
                  onChange={(e) => handleField('lastName', e.target.value)}
                  invalid={stepWasAttempted && !!errors.lastName}
                  invalidText={errors.lastName}
                  size="lg"
                />
                <TextInput
                  id="email"
                  labelText="Email Address"
                  placeholder="your.email@example.com"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleField('email', e.target.value)}
                  invalid={stepWasAttempted && !!errors.email}
                  invalidText={errors.email}
                  size="lg"
                />
                <TextInput
                  id="phone"
                  labelText="Phone Number"
                  placeholder="(555) 123-4567"
                  type="tel"
                  value={formData.phone}
                  onChange={(e) => handleField('phone', e.target.value)}
                  invalid={stepWasAttempted && !!errors.phone}
                  invalidText={errors.phone}
                  size="lg"
                />
                <TextInput
                  id="dateOfBirth"
                  labelText="Date of Birth"
                  placeholder="mm/dd/yyyy"
                  type="date"
                  value={formData.dateOfBirth}
                  onChange={(e) => handleField('dateOfBirth', e.target.value)}
                  invalid={stepWasAttempted && !!errors.dateOfBirth}
                  invalidText={errors.dateOfBirth}
                  size="lg"
                />
              </div>
            </div>
          )}

          {/* ── Step 2: Insurance Type ── */}
          {currentStepKey === STEP_INSURANCE && (
            <div className="signup-page__step">
              <div className="signup-page__step-header">
                <h2 className="signup-page__step-title">What Will You Insure</h2>
              </div>
              <p className="signup-page__step-desc">
                Which insurance coverage are you looking for
              </p>
              <div className={`signup-page__insurance-tiles ${stepWasAttempted && errors.insuranceType ? 'signup-page__insurance-tiles--error' : ''}`}>
                {[
                  { value: 'car',  label: 'Car Insurance',     desc: 'Get comprehensive coverage for your vehicle',      icons: <CarSvg /> },
                  { value: 'home', label: 'Home Insurance',    desc: 'Protect your most important asset for your family', icons: <HomeSvg /> },
                  { value: 'both', label: 'Both Home and Car', desc: 'Insure both and get bundle savings',                icons: <><CarSvg /><HomeSvg /></> },
                ].map(({ value, label, desc, icons }) => (
                  <button
                    key={value}
                    className={`signup-page__insurance-tile ${formData.insuranceType === value ? 'signup-page__insurance-tile--selected' : ''}`}
                    onClick={() => handleInsuranceSelect(value)}
                    type="button"
                  >
                    <div className="signup-page__tile-icons">{icons}</div>
                    <div className="signup-page__tile-text">
                      <span className="signup-page__tile-title">{label}</span>
                      <span className="signup-page__tile-desc">{desc}</span>
                    </div>
                  </button>
                ))}
              </div>
              {stepWasAttempted && errors.insuranceType && (
                <p className="signup-page__insurance-error">{errors.insuranceType}</p>
              )}
            </div>
          )}

          {/* ── Step 3: Your Address ── */}
          {currentStepKey === STEP_ADDRESS && (
            <div className="signup-page__step">
              <div className="signup-page__step-header">
                <h2 className="signup-page__step-title">Your Address</h2>
              </div>
              <p className="signup-page__step-desc">Let us know where you live</p>
              <div className="signup-page__fields">
                <TextInput
                  id="streetAddress"
                  labelText="Street Address"
                  placeholder="123 Main Street"
                  value={formData.streetAddress}
                  onChange={(e) => handleField('streetAddress', e.target.value)}
                  invalid={stepWasAttempted && !!errors.streetAddress}
                  invalidText={errors.streetAddress}
                  size="lg"
                />
                <TextInput
                  id="city"
                  labelText="City"
                  placeholder="Your city"
                  value={formData.city}
                  onChange={(e) => handleField('city', e.target.value)}
                  invalid={stepWasAttempted && !!errors.city}
                  invalidText={errors.city}
                  size="lg"
                />
                <Select
                  id="state"
                  labelText="State"
                  value={formData.state}
                  onChange={(e) => handleField('state', e.target.value)}
                  invalid={stepWasAttempted && !!errors.state}
                  invalidText={errors.state}
                  size="lg"
                >
                  <SelectItem value="" text="" />
                  {US_STATES.map((s) => (
                    <SelectItem key={s} value={s} text={s} />
                  ))}
                </Select>
                <TextInput
                  id="zipCode"
                  labelText="Zip Code"
                  placeholder="12345"
                  value={formData.zipCode}
                  onChange={(e) => handleField('zipCode', e.target.value)}
                  invalid={stepWasAttempted && !!errors.zipCode}
                  invalidText={errors.zipCode}
                  size="lg"
                />
              </div>
            </div>
          )}

          {/* ── Step 4: Car Details ── */}
          {currentStepKey === STEP_CAR && (
            <div className="signup-page__step">
              <div className="signup-page__step-header">
                <h2 className="signup-page__step-title">Car Details</h2>
              </div>
              <p className="signup-page__step-desc">Tell us about your car</p>
              <div className="signup-page__fields">
                <TextInput
                  id="carMake"
                  labelText="Make"
                  placeholder="e.g. Toyota, Ford"
                  value={formData.carMake}
                  onChange={(e) => handleField('carMake', e.target.value)}
                  invalid={stepWasAttempted && !!errors.carMake}
                  invalidText={errors.carMake}
                  size="lg"
                />
                <TextInput
                  id="carModel"
                  labelText="Model"
                  placeholder="e.g. Corolla, Bronco"
                  value={formData.carModel}
                  onChange={(e) => handleField('carModel', e.target.value)}
                  invalid={stepWasAttempted && !!errors.carModel}
                  invalidText={errors.carModel}
                  size="lg"
                />
                <Select
                  id="carYear"
                  labelText="Year"
                  value={formData.carYear}
                  onChange={(e) => handleField('carYear', e.target.value)}
                  invalid={stepWasAttempted && !!errors.carYear}
                  invalidText={errors.carYear}
                  size="lg"
                >
                  <SelectItem value="" text="" />
                  {CAR_YEARS.map((y) => (
                    <SelectItem key={y} value={String(y)} text={String(y)} />
                  ))}
                </Select>
                <NumberInput
                  id="carMileage"
                  label="Mileage"
                  value={formData.carMileage}
                  min={0}
                  onChange={(e, { value }) => handleField('carMileage', value)}
                  size="lg"
                />
                <NumberInput
                  id="carMilesPerYear"
                  label="Miles driven per year"
                  value={formData.carMilesPerYear}
                  min={0}
                  onChange={(e, { value }) => handleField('carMilesPerYear', value)}
                  size="lg"
                />
                <TextInput
                  id="carVin"
                  labelText="VIN (optional)"
                  placeholder=""
                  helperText="17 digits"
                  value={formData.carVin}
                  onChange={(e) => handleField('carVin', e.target.value)}
                  invalid={stepWasAttempted && !!errors.carVin}
                  invalidText={errors.carVin}
                  size="lg"
                />
              </div>
            </div>
          )}

          {/* ── Step 5: Property Details ── */}
          {currentStepKey === STEP_PROPERTY && ( // eslint-disable-line no-unused-expressions
            <div className="signup-page__step">
              <div className="signup-page__step-header">
                <h2 className="signup-page__step-title">Property Details</h2>
              </div>
              <p className="signup-page__step-desc">Tell us about your home</p>
              <div className="signup-page__fields">
                <Select
                  id="homeType"
                  labelText="Home Type"
                  value={formData.homeType}
                  onChange={(e) => handleField('homeType', e.target.value)}
                  invalid={stepWasAttempted && !!errors.homeType}
                  invalidText={errors.homeType}
                  size="lg"
                >
                  <SelectItem value="" text="" />
                  {HOME_TYPES.map((t) => (
                    <SelectItem key={t} value={t} text={t} />
                  ))}
                </Select>
                <Select
                  id="yearBuilt"
                  labelText="Year Built"
                  value={formData.yearBuilt}
                  onChange={(e) => handleField('yearBuilt', e.target.value)}
                  invalid={stepWasAttempted && !!errors.yearBuilt}
                  invalidText={errors.yearBuilt}
                  size="lg"
                >
                  <SelectItem value="" text="" />
                  {HOME_YEARS.map((y) => (
                    <SelectItem key={y} value={String(y)} text={String(y)} />
                  ))}
                </Select>
                <NumberInput
                  id="squareFeet"
                  label="Square Feet"
                  helperText="We'll confirm this more accurately later"
                  value={formData.squareFeet}
                  min={1}
                  invalid={stepWasAttempted && !!errors.squareFeet}
                  invalidText={errors.squareFeet}
                  onChange={(e, { value }) => handleField('squareFeet', value)}
                  size="lg"
                />
                <NumberInput
                  id="estimatedValue"
                  label="Estimated Home Value"
                  helperText="We'll confirm this more accurately later"
                  value={formData.estimatedValue}
                  min={1}
                  invalid={stepWasAttempted && !!errors.estimatedValue}
                  invalidText={errors.estimatedValue}
                  onChange={(e, { value }) => handleField('estimatedValue', value)}
                  size="lg"
                />
              </div>
            </div>
          )}

          {/* ── Step 6: Your Quote ── */}
          {currentStepKey === STEP_QUOTE && (() => {
            const quote = calculateQuote(formData);
            const type = formData.insuranceType;
            const isBoth = type === 'both';

            const coverageItems = [];
            if (type === 'car' || isBoth) {
              coverageItems.push(
                'Liability coverage',
                'Collision coverage',
                'Comprehensive coverage',
                'Uninsured motorist protection',
              );
            }
            if (type === 'home' || isBoth) {
              coverageItems.push(
                'Dwelling coverage',
                'Personal property protection',
                'Liability protection',
                'Additional living expenses',
              );
            }

            return (
              <div className="signup-page__step">
                <div className="signup-page__step-header">
                  <h2 className="signup-page__step-title">Your Quote</h2>
                </div>
                <p className="signup-page__step-desc">
                  Here&rsquo;s your personalized estimate based on what you&rsquo;ve told us.
                </p>

                {/* Price Hero */}
                <div className="quote-hero">
                  <span className="quote-hero__label">Estimated monthly cost</span>
                  <div className="quote-hero__price-row">
                    <span className="quote-hero__dollar">$</span>
                    <span className="quote-hero__amount">{quote.total}</span>
                    <span className="quote-hero__period">/mo</span>
                  </div>
                  <span className="quote-hero__disclaimer">Estimate only — final price confirmed after verification</span>
                </div>

                {/* Bundle Savings Badge */}
                {isBoth && (
                  <div className="quote-bundle-badge">
                    <Checkmark size={16} />
                    <span>Bundle discount applied &mdash; you&rsquo;re saving <strong>${quote.bundleDiscount}/mo</strong> by insuring both</span>
                  </div>
                )}

                {/* Price Breakdown */}
                <div className="quote-breakdown">
                  <h3 className="quote-breakdown__title">Price breakdown</h3>
                  {(type === 'car' || isBoth) && (
                    <div className="quote-breakdown__row">
                      <span>Car insurance</span>
                      <span>${quote.carBase}/mo</span>
                    </div>
                  )}
                  {(type === 'home' || isBoth) && (
                    <div className="quote-breakdown__row">
                      <span>Home insurance</span>
                      <span>${quote.homeBase}/mo</span>
                    </div>
                  )}
                  {isBoth && (
                    <div className="quote-breakdown__row quote-breakdown__row--discount">
                      <span>Bundle discount</span>
                      <span>&minus;${quote.bundleDiscount}/mo</span>
                    </div>
                  )}
                  <div className="quote-breakdown__row quote-breakdown__row--total">
                    <span>Total</span>
                    <span>${quote.total}/mo</span>
                  </div>
                </div>

                {/* What&rsquo;s Included */}
                <div className="quote-coverage">
                  <h3 className="quote-coverage__title">What&rsquo;s included</h3>
                  <ul className="quote-coverage__list">
                    {coverageItems.map((item) => (
                      <li key={item} className="quote-coverage__item">
                        <Checkmark size={16} className="quote-coverage__check" />
                        {item}
                      </li>
                    ))}
                  </ul>
                </div>

                {/* Details Summary */}
                <div className="quote-summary">
                  <h3 className="quote-summary__title">Your details</h3>
                  <dl className="quote-summary__list">
                    <div className="quote-summary__row">
                      <dt>Name</dt>
                      <dd>{formData.firstName} {formData.lastName}</dd>
                    </div>
                    <div className="quote-summary__row">
                      <dt>Address</dt>
                      <dd>{formData.streetAddress}, {formData.city}, {formData.state} {formData.zipCode}</dd>
                    </div>
                    {(type === 'car' || isBoth) && (
                      <div className="quote-summary__row">
                        <dt>Vehicle</dt>
                        <dd>{formData.carYear} {formData.carMake} {formData.carModel}</dd>
                      </div>
                    )}
                    {(type === 'home' || isBoth) && (
                      <div className="quote-summary__row">
                        <dt>Home type</dt>
                        <dd>{formData.homeType}</dd>
                      </div>
                    )}
                  </dl>
                </div>

                {/* Trust Signals */}
                <div className="quote-trust">
                  <div className="quote-trust__item">
                    <Time size={20} />
                    <span>Cancel anytime</span>
                  </div>
                  <div className="quote-trust__item">
                    <Security size={20} />
                    <span>Instant coverage</span>
                  </div>
                  <div className="quote-trust__item">
                    <Purchase size={20} />
                    <span>No hidden fees</span>
                  </div>
                </div>
              </div>
            );
          })()}

          {/* Navigation Buttons */}
          <div className="signup-page__nav">
            {currentStepKey === STEP_CAR && (
              <Button
                kind="tertiary"
                renderIcon={ArrowLeft}
                iconDescription="Cancel"
                onClick={handleCancel}
                size="lg"
                className="signup-page__btn-cancel"
              >
                Cancel
              </Button>
            )}
            {!isFirstStep && (
              <Button
                kind="secondary"
                renderIcon={ArrowLeft}
                iconDescription="Back"
                onClick={handleBack}
                size="lg"
                className="signup-page__btn-back"
              >
                Back
              </Button>
            )}
            <Button
              kind="primary"
              renderIcon={ArrowRight}
              iconDescription={isLastStep ? 'Submit' : 'Next'}
              onClick={handleNext}
              size="lg"
              className="signup-page__btn-next"
            >
              {isLastStep
                ? `Complete Sign Up — $${calculateQuote(formData).total}/mo`
                : 'Next'}
            </Button>
          </div>

        </div>
      </div>
    </div>
  );
}
