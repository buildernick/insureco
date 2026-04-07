import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Button,
  TextInput,
  Select,
  SelectItem,
  NumberInput,
  DatePicker,
  DatePickerInput,
} from '@carbon/react';
import { ArrowLeft, ArrowRight, Information, Close } from '@carbon/icons-react';
import StepBreadcrumb from '../components/StepBreadcrumb';
import './SignUpPage.scss';

// ─── Icons from Figma ────────────────────────────────────────────────────────

const CarIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M27.5063 14.9437L20.2594 12.3375L17.2219 8.53125C16.9582 8.20912 16.6264 7.94952 16.2503 7.77118C15.8742 7.59285 15.4631 7.50023 15.0469 7.5H7.54688C7.08935 7.50236 6.63932 7.61631 6.2358 7.83196C5.83228 8.0476 5.48746 8.35844 5.23125 8.7375L2.69062 12.4875C2.16433 13.2587 1.88032 14.1695 1.875 15.1031V22.5C1.875 22.7486 1.97377 22.9871 2.14959 23.1629C2.3254 23.3387 2.56386 23.4375 2.8125 23.4375H4.81875C5.03464 24.2319 5.50594 24.9332 6.15993 25.4332C6.81393 25.9332 7.61428 26.2041 8.4375 26.2041C9.26072 26.2041 10.0611 25.9332 10.7151 25.4332C11.3691 24.9332 11.8404 24.2319 12.0562 23.4375H17.9437C18.1596 24.2319 18.6309 24.9332 19.2849 25.4332C19.9389 25.9332 20.7393 26.2041 21.5625 26.2041C22.3857 26.2041 23.1861 25.9332 23.8401 25.4332C24.4941 24.9332 24.9654 24.2319 25.1813 23.4375H27.1875C27.4361 23.4375 27.6746 23.3387 27.8504 23.1629C28.0262 22.9871 28.125 22.7486 28.125 22.5V15.825C28.1249 15.6323 28.0655 15.4444 27.9548 15.2867C27.844 15.129 27.6874 15.0093 27.5063 14.9437ZM8.4375 24.375C8.06666 24.375 7.70415 24.265 7.39581 24.059C7.08746 23.853 6.84714 23.5601 6.70523 23.2175C6.56331 22.8749 6.52618 22.4979 6.59853 22.1342C6.67087 21.7705 6.84945 21.4364 7.11167 21.1742C7.3739 20.912 7.70799 20.7334 8.07171 20.661C8.43542 20.5887 8.81242 20.6258 9.15503 20.7677C9.49764 20.9096 9.79048 21.15 9.99651 21.4583C10.2025 21.7666 10.3125 22.1292 10.3125 22.5C10.3125 22.9973 10.115 23.4742 9.76332 23.8258C9.41169 24.1775 8.93478 24.375 8.4375 24.375ZM21.5625 24.375C21.1917 24.375 20.8291 24.265 20.5208 24.059C20.2125 23.853 19.9721 23.5601 19.8302 23.2175C19.6883 22.8749 19.6512 22.4979 19.7235 22.1342C19.7959 21.7705 19.9745 21.4364 20.2367 21.1742C20.4989 20.912 20.833 20.7334 21.1967 20.661C21.5604 20.5887 21.9374 20.6258 22.28 20.7677C22.6226 20.9096 22.9155 21.15 23.1215 21.4583C23.3275 21.7666 23.4375 22.1292 23.4375 22.5C23.4375 22.9973 23.24 23.4742 22.8883 23.8258C22.5367 24.1775 22.0598 24.375 21.5625 24.375ZM26.25 21.5625H25.1813C24.9654 20.7681 24.4941 20.0668 23.8401 19.5668C23.1861 19.0668 22.3857 18.7959 21.5625 18.7959C20.7393 18.7959 19.9389 19.0668 19.2849 19.5668C18.6309 20.0668 18.1596 20.7681 17.9437 21.5625H12.0562C11.8404 20.7681 11.3691 20.0668 10.7151 19.5668C10.0611 19.0668 9.26072 18.7959 8.4375 18.7959C7.61428 18.7959 6.81393 19.0668 6.15993 19.5668C5.50594 20.0668 5.03464 20.7681 4.81875 21.5625H3.75V15.1031C3.74964 14.538 3.91952 13.9859 4.2375 13.5188L6.77812 9.76875C6.86622 9.64498 6.98307 9.54448 7.11862 9.47589C7.25417 9.4073 7.40435 9.37268 7.55625 9.375H15.0562C15.194 9.37478 15.3301 9.4049 15.4548 9.46323C15.5796 9.52157 15.69 9.60667 15.7781 9.7125L18.9656 13.7156C19.0756 13.8489 19.2175 13.9521 19.3781 14.0156L26.25 16.4813V21.5625Z" fill="currentColor"/>
  </svg>
);

const HomeIcon = () => (
  <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M15.574 2.07551C15.4076 1.94565 15.2026 1.87512 14.9915 1.87512C14.7804 1.87512 14.5754 1.94565 14.409 2.07551L0.9375 12.5808L2.10253 14.0542L3.75 12.7697V24.3751C3.75102 24.872 3.94889 25.3484 4.3003 25.6998C4.65171 26.0512 5.12803 26.249 5.625 26.2501H24.375C24.872 26.2491 25.3484 26.0513 25.6998 25.6999C26.0512 25.3484 26.2491 24.8721 26.25 24.3751V12.7782L27.8975 14.0626L29.0625 12.589L15.574 2.07551ZM16.875 24.3751H13.125V16.8751H16.875V24.3751ZM18.75 24.3751V16.8751C18.7494 16.378 18.5517 15.9014 18.2002 15.5499C17.8487 15.1984 17.3721 15.0006 16.875 15.0001H13.125C12.6279 15.0006 12.1512 15.1983 11.7997 15.5498C11.4482 15.9013 11.2505 16.3779 11.25 16.8751V24.3751H5.625V11.3077L15 4.0046L24.375 11.3176V24.3751H18.75Z" fill="currentColor"/>
  </svg>
);

// Combined icon — house on upper-left, car on lower-right, sharing the canvas
const BothIcon = () => (
  <svg width="36" height="36" viewBox="0 0 42 42" fill="none" xmlns="http://www.w3.org/2000/svg">
    {/* House — upper-left, scaled 0.65 */}
    <g transform="translate(0, 0) scale(0.65)">
      <path d="M15.574 2.07551C15.4076 1.94565 15.2026 1.87512 14.9915 1.87512C14.7804 1.87512 14.5754 1.94565 14.409 2.07551L0.9375 12.5808L2.10253 14.0542L3.75 12.7697V24.3751C3.75102 24.872 3.94889 25.3484 4.3003 25.6998C4.65171 26.0512 5.12803 26.249 5.625 26.2501H24.375C24.872 26.2491 25.3484 26.0513 25.6998 25.6999C26.0512 25.3484 26.2491 24.8721 26.25 24.3751V12.7782L27.8975 14.0626L29.0625 12.589L15.574 2.07551ZM16.875 24.3751H13.125V16.8751H16.875V24.3751ZM18.75 24.3751V16.8751C18.7494 16.378 18.5517 15.9014 18.2002 15.5499C17.8487 15.1984 17.3721 15.0006 16.875 15.0001H13.125C12.6279 15.0006 12.1512 15.1983 11.7997 15.5498C11.4482 15.9013 11.2505 16.3779 11.25 16.8751V24.3751H5.625V11.3077L15 4.0046L24.375 11.3176V24.3751H18.75Z" fill="currentColor"/>
    </g>
    {/* Car — lower-right, scaled 0.65, offset so they overlap cleanly */}
    <g transform="translate(12, 12) scale(0.65)">
      <path d="M27.5063 14.9437L20.2594 12.3375L17.2219 8.53125C16.9582 8.20912 16.6264 7.94952 16.2503 7.77118C15.8742 7.59285 15.4631 7.50023 15.0469 7.5H7.54688C7.08935 7.50236 6.63932 7.61631 6.2358 7.83196C5.83228 8.0476 5.48746 8.35844 5.23125 8.7375L2.69062 12.4875C2.16433 13.2587 1.88032 14.1695 1.875 15.1031V22.5C1.875 22.7486 1.97377 22.9871 2.14959 23.1629C2.3254 23.3387 2.56386 23.4375 2.8125 23.4375H4.81875C5.03464 24.2319 5.50594 24.9332 6.15993 25.4332C6.81393 25.9332 7.61428 26.2041 8.4375 26.2041C9.26072 26.2041 10.0611 25.9332 10.7151 25.4332C11.3691 24.9332 11.8404 24.2319 12.0562 23.4375H17.9437C18.1596 24.2319 18.6309 24.9332 19.2849 25.4332C19.9389 25.9332 20.7393 26.2041 21.5625 26.2041C22.3857 26.2041 23.1861 25.9332 23.8401 25.4332C24.4941 24.9332 24.9654 24.2319 25.1813 23.4375H27.1875C27.4361 23.4375 27.6746 23.3387 27.8504 23.1629C28.0262 22.9871 28.125 22.7486 28.125 22.5V15.825C28.1249 15.6323 28.0655 15.4444 27.9548 15.2867C27.844 15.129 27.6874 15.0093 27.5063 14.9437ZM8.4375 24.375C8.06666 24.375 7.70415 24.265 7.39581 24.059C7.08746 23.853 6.84714 23.5601 6.70523 23.2175C6.56331 22.8749 6.52618 22.4979 6.59853 22.1342C6.67087 21.7705 6.84945 21.4364 7.11167 21.1742C7.3739 20.912 7.70799 20.7334 8.07171 20.661C8.43542 20.5887 8.81242 20.6258 9.15503 20.7677C9.49764 20.9096 9.79048 21.15 9.99651 21.4583C10.2025 21.7666 10.3125 22.1292 10.3125 22.5C10.3125 22.9973 10.115 23.4742 9.76332 23.8258C9.41169 24.1775 8.93478 24.375 8.4375 24.375ZM21.5625 24.375C21.1917 24.375 20.8291 24.265 20.5208 24.059C20.2125 23.853 19.9721 23.5601 19.8302 23.2175C19.6883 22.8749 19.6512 22.4979 19.7235 22.1342C19.7959 21.7705 19.9745 21.4364 20.2367 21.1742C20.4989 20.912 20.833 20.7334 21.1967 20.661C21.5604 20.5887 21.9374 20.6258 22.28 20.7677C22.6226 20.9096 22.9155 21.15 23.1215 21.4583C23.3275 21.7666 23.4375 22.1292 23.4375 22.5C23.4375 22.9973 23.24 23.4742 22.8883 23.8258C22.5367 24.1775 22.0598 24.375 21.5625 24.375ZM26.25 21.5625H25.1813C24.9654 20.7681 24.4941 20.0668 23.8401 19.5668C23.1861 19.0668 22.3857 18.7959 21.5625 18.7959C20.7393 18.7959 19.9389 19.0668 19.2849 19.5668C18.6309 20.0668 18.1596 20.7681 17.9437 21.5625H12.0562C11.8404 20.7681 11.3691 20.0668 10.7151 19.5668C10.0611 19.0668 9.26072 18.7959 8.4375 18.7959C7.61428 18.7959 6.81393 19.0668 6.15993 19.5668C5.50594 20.0668 5.03464 20.7681 4.81875 21.5625H3.75V15.1031C3.74964 14.538 3.91952 13.9859 4.2375 13.5188L6.77812 9.76875C6.86622 9.64498 6.98307 9.54448 7.11862 9.47589C7.25417 9.4073 7.40435 9.37268 7.55625 9.375H15.0562C15.194 9.37478 15.3301 9.4049 15.4548 9.46323C15.5796 9.52157 15.69 9.60667 15.7781 9.7125L18.9656 13.7156C19.0756 13.8489 19.2175 13.9521 19.3781 14.0156L26.25 16.4813V21.5625Z" fill="currentColor"/>
    </g>
  </svg>
);

// ─── Static data ──────────────────────────────────────────────────────────────

const US_STATES = [
  'Alabama','Alaska','Arizona','Arkansas','California','Colorado','Connecticut',
  'Delaware','Florida','Georgia','Hawaii','Idaho','Illinois','Indiana','Iowa',
  'Kansas','Kentucky','Louisiana','Maine','Maryland','Massachusetts','Michigan',
  'Minnesota','Mississippi','Missouri','Montana','Nebraska','Nevada','New Hampshire',
  'New Jersey','New Mexico','New York','North Carolina','North Dakota','Ohio',
  'Oklahoma','Oregon','Pennsylvania','Rhode Island','South Carolina','South Dakota',
  'Tennessee','Texas','Utah','Vermont','Virginia','Washington','West Virginia',
  'Wisconsin','Wyoming',
];

const CAR_YEARS = Array.from({ length: 35 }, (_, i) => String(2024 - i));
const BUILT_YEARS = Array.from({ length: 226 }, (_, i) => String(2025 - i));
const HOME_TYPES = ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Mobile Home'];

// ─── Step definitions (dynamic based on insurance type) ───────────────────────

function buildSteps(insuranceType) {
  const steps = [
    { label: 'Insurance', key: 'insurance' },
    { label: 'Personal Info', key: 'personal' },
    { label: 'Address', key: 'address' },
  ];
  if (insuranceType === 'car' || insuranceType === 'both') {
    steps.push({ label: 'Car Details', key: 'car' });
  }
  if (insuranceType === 'home' || insuranceType === 'both') {
    steps.push({ label: 'Home Details', key: 'home' });
  }
  return steps;
}

// ─── Main Component ───────────────────────────────────────────────────────────

export default function SignUpPage() {
  const navigate = useNavigate();

  const [stepIndex, setStepIndex] = useState(0);
  const [showBanner, setShowBanner] = useState(true);

  // Form state
  const [insuranceType, setInsuranceType] = useState(null);

  const [personalInfo, setPersonalInfo] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', altPhone: '', dateOfBirth: '',
  });

  const [personalErrors, setPersonalErrors] = useState({
    firstName: '', lastName: '', email: '',
    phone: '', altPhone: '', dateOfBirth: '',
  });

  const [address, setAddress] = useState({
    street: '', city: '', state: '', zip: '',
  });

  const [addressErrors, setAddressErrors] = useState({
    street: '', city: '', state: '', zip: '',
  });

  const [carDetails, setCarDetails] = useState({
    make: '', model: '', year: '', mileage: 1000, milesPerYear: 1000, vin: '',
  });

  const [carErrors, setCarErrors] = useState({
    make: '', model: '', year: '', vin: '',
  });

  const [homeDetails, setHomeDetails] = useState({
    homeType: '', yearBuilt: '', squareFeet: 1000, homeValue: 1000,
  });

  const [homeErrors, setHomeErrors] = useState({
    homeType: '', yearBuilt: '',
  });

  const steps = buildSteps(insuranceType);
  const currentStepKey = steps[stepIndex]?.key;
  const isFirstStep = stepIndex === 0;
  const isLastStep = stepIndex === steps.length - 1;

  const validatePersonalInfo = () => {
    const errors = {
      firstName: personalInfo.firstName.trim() ? '' : 'First name is required.',
      lastName: personalInfo.lastName.trim() ? '' : 'Last name is required.',
      email: !personalInfo.email.trim()
        ? 'Email address is required.'
        : !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(personalInfo.email)
        ? 'Please enter a valid email address.'
        : '',
      phone: personalInfo.phone.trim() ? '' : 'Phone number is required.',
      altPhone: personalInfo.altPhone.trim() ? '' : 'Alternate phone number is required.',
      dateOfBirth: personalInfo.dateOfBirth.trim() ? '' : 'Date of birth is required.',
    };
    setPersonalErrors(errors);
    return Object.values(errors).every(e => e === '');
  };

  const validateAddress = () => {
    const zipPattern = /^\d{5}(-\d{4})?$/;
    const errors = {
      street: address.street.trim() ? '' : 'Street address is required.',
      city:   address.city.trim()   ? '' : 'City is required.',
      state:  address.state         ? '' : 'Please select a state.',
      zip:    !address.zip.trim()
        ? 'ZIP code is required.'
        : !zipPattern.test(address.zip.trim())
        ? 'Please enter a valid 5-digit ZIP code.'
        : '',
    };
    setAddressErrors(errors);
    return Object.values(errors).every(e => e === '');
  };

  const validateCarDetails = () => {
    const vinVal = carDetails.vin.trim();
    const errors = {
      make:  carDetails.make.trim()  ? '' : 'Make is required.',
      model: carDetails.model.trim() ? '' : 'Model is required.',
      year:  carDetails.year         ? '' : 'Year is required.',
      vin:   vinVal && vinVal.length !== 17
        ? 'VIN must be exactly 17 characters.'
        : '',
    };
    setCarErrors(errors);
    return Object.values(errors).every(e => e === '');
  };

  const validateHomeDetails = () => {
    const errors = {
      homeType:  homeDetails.homeType  ? '' : 'Home type is required.',
      yearBuilt: homeDetails.yearBuilt ? '' : 'Year built is required.',
    };
    setHomeErrors(errors);
    return Object.values(errors).every(e => e === '');
  };

  const handleNext = () => {
    if (currentStepKey === 'personal' && !validatePersonalInfo()) return;
    if (currentStepKey === 'address'  && !validateAddress())      return;
    if (currentStepKey === 'car'      && !validateCarDetails())   return;
    if (currentStepKey === 'home'     && !validateHomeDetails())  return;
    if (isLastStep) {
      navigate('/dashboard');
    } else {
      setStepIndex(i => i + 1);
    }
  };

  const handleBack = () => setStepIndex(i => i - 1);

  // When insurance type changes on first step we rebuild steps; keep stepIndex at 0
  const handleInsuranceSelect = (type) => setInsuranceType(type);

  // ─── Step renderers ────────────────────────────────────────────────────────

  const renderInsuranceType = () => (
    <div className="signup-form__section">
      <div className="signup-form__title-row">
        <h2 className="signup-form__title">What Will You Insure</h2>
      </div>
      <p className="signup-form__subtitle">Which insurance coverage are you looking for</p>

      <div className="signup-insurance-options">
        <button
          type="button"
          className={`signup-insurance-tile ${insuranceType === 'car' ? 'signup-insurance-tile--selected' : ''}`}
          onClick={() => handleInsuranceSelect('car')}
        >
          <span className="signup-insurance-tile__icon"><CarIcon /></span>
          <div className="signup-insurance-tile__text">
            <strong>Car Insurance</strong>
            <span>Get comprehensive coverage for your vehicle</span>
          </div>
        </button>

        <button
          type="button"
          className={`signup-insurance-tile ${insuranceType === 'home' ? 'signup-insurance-tile--selected' : ''}`}
          onClick={() => handleInsuranceSelect('home')}
        >
          <span className="signup-insurance-tile__icon"><HomeIcon /></span>
          <div className="signup-insurance-tile__text">
            <strong>Home Insurance</strong>
            <span>Protect your most important asset for your family</span>
          </div>
        </button>

        <button
          type="button"
          className={`signup-insurance-tile ${insuranceType === 'both' ? 'signup-insurance-tile--selected' : ''}`}
          onClick={() => handleInsuranceSelect('both')}
        >
          <span className="signup-insurance-tile__icon">
            <BothIcon />
          </span>
          <div className="signup-insurance-tile__text">
            <strong>Both Home and Car</strong>
            <span>Insure both and get bundle savings</span>
          </div>
        </button>
      </div>
    </div>
  );

  const clearPersonalError = (field) =>
    setPersonalErrors(e => ({ ...e, [field]: '' }));

  const renderPersonalInfo = () => (
    <div className="signup-form__section">
      <div className="signup-form__title-row">
        <h2 className="signup-form__title">Personal Information</h2>
      </div>
      <p className="signup-form__subtitle">Let's start with some basic information about you.</p>

      <div className="signup-form__fields">
        <TextInput
          id="firstName"
          labelText="First Name"
          placeholder="Enter your first name"
          size="lg"
          value={personalInfo.firstName}
          invalid={!!personalErrors.firstName}
          invalidText={personalErrors.firstName}
          onChange={e => {
            setPersonalInfo(p => ({ ...p, firstName: e.target.value }));
            clearPersonalError('firstName');
          }}
        />
        <TextInput
          id="lastName"
          labelText="Last Name"
          placeholder="Enter your last name"
          size="lg"
          value={personalInfo.lastName}
          invalid={!!personalErrors.lastName}
          invalidText={personalErrors.lastName}
          onChange={e => {
            setPersonalInfo(p => ({ ...p, lastName: e.target.value }));
            clearPersonalError('lastName');
          }}
        />
        <TextInput
          id="email"
          labelText="Email Address"
          placeholder="your.email@example.com"
          type="email"
          size="lg"
          value={personalInfo.email}
          invalid={!!personalErrors.email}
          invalidText={personalErrors.email}
          onChange={e => {
            setPersonalInfo(p => ({ ...p, email: e.target.value }));
            clearPersonalError('email');
          }}
        />
        <TextInput
          id="phone"
          labelText="Phone Number"
          placeholder="(555) 123-4567"
          type="tel"
          size="lg"
          value={personalInfo.phone}
          invalid={!!personalErrors.phone}
          invalidText={personalErrors.phone}
          onChange={e => {
            setPersonalInfo(p => ({ ...p, phone: e.target.value }));
            clearPersonalError('phone');
          }}
        />
        <TextInput
          id="altPhone"
          labelText="Alternate Phone Number"
          placeholder="(555) 123-4567"
          type="tel"
          size="lg"
          value={personalInfo.altPhone}
          invalid={!!personalErrors.altPhone}
          invalidText={personalErrors.altPhone}
          onChange={e => {
            setPersonalInfo(p => ({ ...p, altPhone: e.target.value }));
            clearPersonalError('altPhone');
          }}
        />
        <DatePicker
          datePickerType="single"
          id="dob"
          onChange={(dates) => {
            const val = dates[0] ? dates[0].toLocaleDateString('en-US') : '';
            setPersonalInfo(p => ({ ...p, dateOfBirth: val }));
            if (val) clearPersonalError('dateOfBirth');
          }}
        >
          <DatePickerInput
            id="dateOfBirth"
            labelText="Date of Birth"
            placeholder="mm/dd/yyyy"
            size="lg"
            invalid={!!personalErrors.dateOfBirth}
            invalidText={personalErrors.dateOfBirth}
          />
        </DatePicker>
      </div>
    </div>
  );

  const clearAddressError = (field) =>
    setAddressErrors(e => ({ ...e, [field]: '' }));

  const renderAddress = () => (
    <div className="signup-form__section">
      <div className="signup-form__title-row">
        <h2 className="signup-form__title">Your Address</h2>
      </div>
      <p className="signup-form__subtitle">Let us know where you live</p>

      <div className="signup-form__fields">
        <TextInput
          id="street"
          labelText="Street Address"
          placeholder="123 Main Street"
          size="lg"
          value={address.street}
          invalid={!!addressErrors.street}
          invalidText={addressErrors.street}
          onChange={e => {
            setAddress(a => ({ ...a, street: e.target.value }));
            clearAddressError('street');
          }}
        />
        <TextInput
          id="city"
          labelText="City"
          placeholder="Your city"
          size="lg"
          value={address.city}
          invalid={!!addressErrors.city}
          invalidText={addressErrors.city}
          onChange={e => {
            setAddress(a => ({ ...a, city: e.target.value }));
            clearAddressError('city');
          }}
        />
        <Select
          id="state"
          labelText="State"
          size="lg"
          value={address.state}
          invalid={!!addressErrors.state}
          invalidText={addressErrors.state}
          onChange={e => {
            setAddress(a => ({ ...a, state: e.target.value }));
            clearAddressError('state');
          }}
        >
          <SelectItem value="" text="" />
          {US_STATES.map(s => (
            <SelectItem key={s} value={s} text={s} />
          ))}
        </Select>
        <TextInput
          id="zip"
          labelText="Zip Code"
          placeholder="12345"
          size="lg"
          value={address.zip}
          invalid={!!addressErrors.zip}
          invalidText={addressErrors.zip}
          onChange={e => {
            setAddress(a => ({ ...a, zip: e.target.value }));
            clearAddressError('zip');
          }}
        />
      </div>
    </div>
  );

  const clearCarError = (field) =>
    setCarErrors(e => ({ ...e, [field]: '' }));

  const renderCarDetails = () => (
    <div className="signup-form__section">
      <div className="signup-form__title-row">
        <h2 className="signup-form__title">Car Details</h2>
      </div>
      <p className="signup-form__subtitle">Tell us about your car</p>

      <div className="signup-form__fields">
        <TextInput
          id="make"
          labelText="Make"
          placeholder="e.g. Toyota, Ford"
          size="lg"
          value={carDetails.make}
          invalid={!!carErrors.make}
          invalidText={carErrors.make}
          onChange={e => {
            setCarDetails(c => ({ ...c, make: e.target.value }));
            clearCarError('make');
          }}
        />
        <TextInput
          id="model"
          labelText="Model"
          placeholder="e.g. Corolla, Bronco"
          size="lg"
          value={carDetails.model}
          invalid={!!carErrors.model}
          invalidText={carErrors.model}
          onChange={e => {
            setCarDetails(c => ({ ...c, model: e.target.value }));
            clearCarError('model');
          }}
        />
        <Select
          id="year"
          labelText="Year"
          size="lg"
          value={carDetails.year}
          invalid={!!carErrors.year}
          invalidText={carErrors.year}
          onChange={e => {
            setCarDetails(c => ({ ...c, year: e.target.value }));
            clearCarError('year');
          }}
        >
          <SelectItem value="" text="" />
          {CAR_YEARS.map(y => (
            <SelectItem key={y} value={y} text={y} />
          ))}
        </Select>
        <NumberInput
          id="mileage"
          label="Mileage"
          size="lg"
          value={carDetails.mileage}
          min={0}
          onChange={(e, { value }) => setCarDetails(c => ({ ...c, mileage: value }))}
        />
        <NumberInput
          id="milesPerYear"
          label="Miles driven per year"
          size="lg"
          value={carDetails.milesPerYear}
          min={0}
          onChange={(e, { value }) => setCarDetails(c => ({ ...c, milesPerYear: value }))}
        />
        <TextInput
          id="vin"
          labelText="VIN (optional)"
          placeholder=""
          helperText={carErrors.vin ? undefined : '17 digits'}
          size="lg"
          value={carDetails.vin}
          invalid={!!carErrors.vin}
          invalidText={carErrors.vin}
          onChange={e => {
            setCarDetails(c => ({ ...c, vin: e.target.value }));
            clearCarError('vin');
          }}
        />
      </div>
    </div>
  );

  const clearHomeError = (field) =>
    setHomeErrors(e => ({ ...e, [field]: '' }));

  const renderHomeDetails = () => (
    <div className="signup-form__section">
      <div className="signup-form__title-row">
        <h2 className="signup-form__title">Property Details</h2>
      </div>
      <p className="signup-form__subtitle">Tell us about your home</p>

      <div className="signup-form__fields">
        <Select
          id="homeType"
          labelText="Home Type"
          size="lg"
          value={homeDetails.homeType}
          invalid={!!homeErrors.homeType}
          invalidText={homeErrors.homeType}
          onChange={e => {
            setHomeDetails(h => ({ ...h, homeType: e.target.value }));
            clearHomeError('homeType');
          }}
        >
          <SelectItem value="" text="" />
          {HOME_TYPES.map(t => (
            <SelectItem key={t} value={t} text={t} />
          ))}
        </Select>
        <Select
          id="yearBuilt"
          labelText="Year Built"
          size="lg"
          value={homeDetails.yearBuilt}
          invalid={!!homeErrors.yearBuilt}
          invalidText={homeErrors.yearBuilt}
          onChange={e => {
            setHomeDetails(h => ({ ...h, yearBuilt: e.target.value }));
            clearHomeError('yearBuilt');
          }}
        >
          <SelectItem value="" text="" />
          {BUILT_YEARS.map(y => (
            <SelectItem key={y} value={y} text={y} />
          ))}
        </Select>
        <NumberInput
          id="squareFeet"
          label="Square Feet"
          helperText="We'll confirm this more accurately later"
          size="lg"
          value={homeDetails.squareFeet}
          min={0}
          onChange={(e, { value }) => setHomeDetails(h => ({ ...h, squareFeet: value }))}
        />
        <NumberInput
          id="homeValue"
          label="Estimated Home Value"
          helperText="We'll confirm this more accurately later"
          size="lg"
          value={homeDetails.homeValue}
          min={0}
          onChange={(e, { value }) => setHomeDetails(h => ({ ...h, homeValue: value }))}
        />
      </div>
    </div>
  );

  // ─── Layout ────────────────────────────────────────────────────────────────

  return (
    <div className="signup-page">
      <div className="signup-page__wrapper">

        {/* Red gradient header */}
        <div className="signup-page__hero">
          <h1 className="signup-page__hero-title">Sign Up for InsureCo</h1>
          <p className="signup-page__hero-subtitle">
            Get started with your insurance coverage in just a few steps
          </p>
        </div>

        {/* Step progress */}
        <div className="signup-page__progress">
          <StepBreadcrumb steps={steps} currentIndex={stepIndex} />
        </div>

        {/* Warning banner (shown on Car Details step) */}
        {showBanner && currentStepKey === 'car' && (
          <div className="signup-page__banner" role="alert">
            <div className="signup-page__banner-content">
              <Information size={16} className="signup-page__banner-icon" />
              <span>This is a warning message</span>
            </div>
            <button
              type="button"
              className="signup-page__banner-dismiss"
              onClick={() => setShowBanner(false)}
              aria-label="Dismiss warning"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Form card */}
        <div className="signup-page__card">
          {/* Render active step */}
          {renderStep()}

          {/* Navigation buttons */}
          <div className="signup-page__nav">
            {currentStepKey === 'car' && (
              <Button
                kind="tertiary"
                onClick={() => navigate('/')}
                className="signup-page__nav-cancel"
              >
                Cancel
              </Button>
            )}
            <div className="signup-page__nav-right">
              {!isFirstStep && (
                <Button
                  kind="secondary"
                  renderIcon={ArrowLeft}
                  onClick={handleBack}
                >
                  Back
                </Button>
              )}
              <Button
                kind="primary"
                renderIcon={ArrowRight}
                onClick={handleNext}
                disabled={currentStepKey === 'insurance' && !insuranceType}
              >
                {isLastStep ? 'Submit' : 'Next'}
              </Button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );

  function renderStep() {
    switch (currentStepKey) {
      case 'insurance': return renderInsuranceType();
      case 'personal':  return renderPersonalInfo();
      case 'address':   return renderAddress();
      case 'car':       return renderCarDetails();
      case 'home':      return renderHomeDetails();
      default:          return null;
    }
  }
}
