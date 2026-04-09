import React, { useState } from 'react';
import {
  TextInput,
  Select,
  SelectItem,
  NumberInput,
  DatePicker,
  DatePickerInput,
  Button,
} from '@carbon/react';
import {
  ArrowLeft,
  ArrowRight,
  Car,
  Home,
  WarningAlt,
} from '@carbon/icons-react';
import StepBreadcrumb from '../components/StepBreadcrumb';
import './SignUpPage.scss';

const STEP_COVERAGE = 0;
const STEP_PERSONAL = 1;
const STEP_ADDRESS = 2;
const STEP_CAR = 3;
const STEP_HOME = 4;

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

const CAR_YEARS = Array.from({ length: 2026 - 1990 + 1 }, (_, i) => 2026 - i);
const HOME_YEARS = Array.from({ length: 2025 - 1800 + 1 }, (_, i) => 2025 - i);

const HOME_TYPES = ['Single Family', 'Condo', 'Townhouse', 'Multi-Family', 'Mobile Home', 'Other'];

function getBreadcrumbSteps(insuranceType) {
  const base = [
    { label: 'Coverage', key: 'coverage' },
    { label: 'Personal Info', key: 'personal' },
    { label: 'Address', key: 'address' },
  ];
  if (insuranceType === 'car') return [...base, { label: 'Car Details', key: 'car' }];
  if (insuranceType === 'home') return [...base, { label: 'Home Details', key: 'home' }];
  if (insuranceType === 'both') return [...base, { label: 'Car Details', key: 'car' }, { label: 'Home Details', key: 'home' }];
  return [...base, { label: 'Details', key: 'details' }];
}

function getBreadcrumbIndex(step, insuranceType) {
  if (step === STEP_COVERAGE) return 0;
  if (step === STEP_PERSONAL) return 1;
  if (step === STEP_ADDRESS) return 2;
  if (step === STEP_CAR) return 3;
  if (step === STEP_HOME) return insuranceType === 'both' ? 4 : 3;
  return 0;
}

export default function SignUpPage() {
  const [currentStep, setCurrentStep] = useState(STEP_COVERAGE);
  const [warningVisible, setWarningVisible] = useState(true);

  // Coverage
  const [insuranceType, setInsuranceType] = useState(null);

  // Personal Info
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [phoneAlt, setPhoneAlt] = useState('');
  const [dob, setDob] = useState('');

  // Address
  const [streetAddress, setStreetAddress] = useState('');
  const [city, setCity] = useState('');
  const [state, setState] = useState('');
  const [zip, setZip] = useState('');

  // Car Details
  const [carMake, setCarMake] = useState('');
  const [carModel, setCarModel] = useState('');
  const [carYear, setCarYear] = useState('');
  const [carMileage, setCarMileage] = useState(1000);
  const [carMilesPerYear, setCarMilesPerYear] = useState(1000);
  const [carVin, setCarVin] = useState('');

  // Home Details
  const [homeType, setHomeType] = useState('');
  const [homeYearBuilt, setHomeYearBuilt] = useState('');
  const [homeSquareFeet, setHomeSquareFeet] = useState(1000);
  const [homeValue, setHomeValue] = useState(1000);

  const breadcrumbSteps = getBreadcrumbSteps(insuranceType);
  const breadcrumbIndex = getBreadcrumbIndex(currentStep, insuranceType);

  function handleNext() {
    if (currentStep === STEP_COVERAGE) {
      setCurrentStep(STEP_PERSONAL);
    } else if (currentStep === STEP_PERSONAL) {
      setCurrentStep(STEP_ADDRESS);
    } else if (currentStep === STEP_ADDRESS) {
      if (insuranceType === 'car' || insuranceType === 'both') {
        setCurrentStep(STEP_CAR);
      } else {
        setCurrentStep(STEP_HOME);
      }
    } else if (currentStep === STEP_CAR) {
      if (insuranceType === 'both') {
        setCurrentStep(STEP_HOME);
      } else {
        // Completed
        alert('Sign up complete! (Demo)');
      }
    } else if (currentStep === STEP_HOME) {
      alert('Sign up complete! (Demo)');
    }
  }

  function handleBack() {
    if (currentStep === STEP_PERSONAL) {
      setCurrentStep(STEP_COVERAGE);
    } else if (currentStep === STEP_ADDRESS) {
      setCurrentStep(STEP_PERSONAL);
    } else if (currentStep === STEP_CAR) {
      setCurrentStep(STEP_ADDRESS);
    } else if (currentStep === STEP_HOME) {
      if (insuranceType === 'both') {
        setCurrentStep(STEP_CAR);
      } else {
        setCurrentStep(STEP_ADDRESS);
      }
    }
  }

  return (
    <div className="signup-page">
      <div className="signup-page__wrapper">

        {/* Header */}
        <div className="signup-page__header-area">
          <div className="signup-page__hero">
            <h1 className="signup-page__hero-title">Sign Up for InsureCo</h1>
            <p className="signup-page__hero-subtitle">
              Get started with your insurance coverage in just a few steps
            </p>
          </div>

          {/* Progress Indicator */}
          <div className="signup-page__progress">
            <StepBreadcrumb
              steps={breadcrumbSteps}
              currentIndex={breadcrumbIndex}
            />
          </div>
        </div>

        {/* Warning Banner (Car Details step only) */}
        {currentStep === STEP_CAR && warningVisible && (
          <div className="signup-page__warning-banner">
            <div className="signup-page__warning-content">
              <WarningAlt size={16} className="signup-page__warning-icon" />
              <span className="signup-page__warning-text">This is a warning message</span>
            </div>
            <button
              className="signup-page__warning-dismiss"
              onClick={() => setWarningVisible(false)}
              type="button"
            >
              Dismiss
            </button>
          </div>
        )}

        {/* Form Content */}
        <div className="signup-page__form-card">

          {/* Step: Insurance Type */}
          {currentStep === STEP_COVERAGE && (
            <div className="signup-page__step">
              <div className="signup-page__section-header">
                <h2 className="signup-page__section-title">What Will You Insure</h2>
              </div>
              <p className="signup-page__section-description">
                Which insurance coverage are you looking for
              </p>

              <div className="signup-page__coverage-options">
                <button
                  type="button"
                  className={`signup-page__coverage-tile ${insuranceType === 'car' ? 'signup-page__coverage-tile--selected' : ''}`}
                  onClick={() => setInsuranceType('car')}
                >
                  <div className="signup-page__coverage-icons">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M27.5063 14.9437L20.2594 12.3375L17.2219 8.53125C16.9582 8.20912 16.6264 7.94952 16.2503 7.77118C15.8742 7.59285 15.4631 7.50023 15.0469 7.5H7.54688C7.08935 7.50236 6.63932 7.61631 6.2358 7.83196C5.83228 8.0476 5.48746 8.35844 5.23125 8.7375L2.69062 12.4875C2.16433 13.2587 1.88032 14.1695 1.875 15.1031V22.5C1.875 22.7486 1.97377 22.9871 2.14959 23.1629C2.3254 23.3387 2.56386 23.4375 2.8125 23.4375H4.81875C5.03464 24.2319 5.50594 24.9332 6.15993 25.4332C6.81393 25.9332 7.61428 26.2041 8.4375 26.2041C9.26072 26.2041 10.0611 25.9332 10.7151 25.4332C11.3691 24.9332 11.8404 24.2319 12.0562 23.4375H17.9437C18.1596 24.2319 18.6309 24.9332 19.2849 25.4332C19.9389 25.9332 20.7393 26.2041 21.5625 26.2041C22.3857 26.2041 23.1861 25.9332 23.8401 25.4332C24.4941 24.9332 24.9654 24.2319 25.1813 23.4375H27.1875C27.4361 23.4375 27.6746 23.3387 27.8504 23.1629C28.0262 22.9871 28.125 22.7486 28.125 22.5V15.825C28.1249 15.6323 28.0655 15.4444 27.9548 15.2867C27.844 15.129 27.6874 15.0093 27.5063 14.9437ZM8.4375 24.375C8.06666 24.375 7.70415 24.265 7.39581 24.059C7.08746 23.853 6.84714 23.5601 6.70523 23.2175C6.56331 22.8749 6.52618 22.4979 6.59853 22.1342C6.67087 21.7705 6.84945 21.4364 7.11167 21.1742C7.3739 20.912 7.70799 20.7334 8.07171 20.661C8.43542 20.5887 8.81242 20.6258 9.15503 20.7677C9.49764 20.9096 9.79048 21.15 9.99651 21.4583C10.2025 21.7666 10.3125 22.1292 10.3125 22.5C10.3125 22.9973 10.115 23.4742 9.76332 23.8258C9.41169 24.1775 8.93478 24.375 8.4375 24.375ZM21.5625 24.375C21.1917 24.375 20.8291 24.265 20.5208 24.059C20.2125 23.853 19.9721 23.5601 19.8302 23.2175C19.6883 22.8749 19.6512 22.4979 19.7235 22.1342C19.7959 21.7705 19.9745 21.4364 20.2367 21.1742C20.4989 20.912 20.833 20.7334 21.1967 20.661C21.5604 20.5887 21.9374 20.6258 22.28 20.7677C22.6226 20.9096 22.9155 21.15 23.1215 21.4583C23.3275 21.7666 23.4375 22.1292 23.4375 22.5C23.4375 22.9973 23.24 23.4742 22.8883 23.8258C22.5367 24.1775 22.0598 24.375 21.5625 24.375ZM26.25 21.5625H25.1813C24.9654 20.7681 24.4941 20.0668 23.8401 19.5668C23.1861 19.0668 22.3857 18.7959 21.5625 18.7959C20.7393 18.7959 19.9389 19.0668 19.2849 19.5668C18.6309 20.0668 18.1596 20.7681 17.9437 21.5625H12.0562C11.8404 20.7681 11.3691 20.0668 10.7151 19.5668C10.0611 19.0668 9.26072 18.7959 8.4375 18.7959C7.61428 18.7959 6.81393 19.0668 6.15993 19.5668C5.50594 20.0668 5.03464 20.7681 4.81875 21.5625H3.75V15.1031C3.74964 14.538 3.91952 13.9859 4.2375 13.5188L6.77812 9.76875C6.86622 9.64498 6.98307 9.54448 7.11862 9.47589C7.25417 9.4073 7.40435 9.37268 7.55625 9.375H15.0562C15.194 9.37478 15.3301 9.4049 15.4548 9.46323C15.5796 9.52157 15.69 9.60667 15.7781 9.7125L18.9656 13.7156C19.0756 13.8489 19.2175 13.9521 19.3781 14.0156L26.25 16.4813V21.5625Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="signup-page__coverage-info">
                    <span className="signup-page__coverage-name">Car Insurance</span>
                    <span className="signup-page__coverage-desc">Get comprehensive coverage for your vehicle</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`signup-page__coverage-tile ${insuranceType === 'home' ? 'signup-page__coverage-tile--selected' : ''}`}
                  onClick={() => setInsuranceType('home')}
                >
                  <div className="signup-page__coverage-icons">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.574 2.07551C15.4076 1.94565 15.2026 1.87512 14.9915 1.87512C14.7804 1.87512 14.5754 1.94565 14.409 2.07551L0.9375 12.5808L2.10253 14.0542L3.75 12.7697V24.3751C3.75102 24.872 3.94889 25.3484 4.3003 25.6998C4.65171 26.0512 5.12803 26.249 5.625 26.2501H24.375C24.872 26.2491 25.3484 26.0513 25.6998 25.6999C26.0512 25.3484 26.2491 24.8721 26.25 24.3751V12.7782L27.8975 14.0626L29.0625 12.589L15.574 2.07551ZM16.875 24.3751H13.125V16.8751H16.875V24.3751ZM18.75 24.3751V16.8751C18.7494 16.378 18.5517 15.9014 18.2002 15.5499C17.8487 15.1984 17.3721 15.0006 16.875 15.0001H13.125C12.6279 15.0006 12.1512 15.1983 11.7997 15.5498C11.4482 15.9013 11.2505 16.3779 11.25 16.8751V24.3751H5.625V11.3077L15 4.0046L24.375 11.3176V24.3751H18.75Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="signup-page__coverage-info">
                    <span className="signup-page__coverage-name">Home Insurance</span>
                    <span className="signup-page__coverage-desc">Protect your most important asset for your family</span>
                  </div>
                </button>

                <button
                  type="button"
                  className={`signup-page__coverage-tile ${insuranceType === 'both' ? 'signup-page__coverage-tile--selected' : ''}`}
                  onClick={() => setInsuranceType('both')}
                >
                  <div className="signup-page__coverage-icons signup-page__coverage-icons--dual">
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M27.5063 14.9437L20.2594 12.3375L17.2219 8.53125C16.9582 8.20912 16.6264 7.94952 16.2503 7.77118C15.8742 7.59285 15.4631 7.50023 15.0469 7.5H7.54688C7.08935 7.50236 6.63932 7.61631 6.2358 7.83196C5.83228 8.0476 5.48746 8.35844 5.23125 8.7375L2.69062 12.4875C2.16433 13.2587 1.88032 14.1695 1.875 15.1031V22.5C1.875 22.7486 1.97377 22.9871 2.14959 23.1629C2.3254 23.3387 2.56386 23.4375 2.8125 23.4375H4.81875C5.03464 24.2319 5.50594 24.9332 6.15993 25.4332C6.81393 25.9332 7.61428 26.2041 8.4375 26.2041C9.26072 26.2041 10.0611 25.9332 10.7151 25.4332C11.3691 24.9332 11.8404 24.2319 12.0562 23.4375H17.9437C18.1596 24.2319 18.6309 24.9332 19.2849 25.4332C19.9389 25.9332 20.7393 26.2041 21.5625 26.2041C22.3857 26.2041 23.1861 25.9332 23.8401 25.4332C24.4941 24.9332 24.9654 24.2319 25.1813 23.4375H27.1875C27.4361 23.4375 27.6746 23.3387 27.8504 23.1629C28.0262 22.9871 28.125 22.7486 28.125 22.5V15.825C28.1249 15.6323 28.0655 15.4444 27.9548 15.2867C27.844 15.129 27.6874 15.0093 27.5063 14.9437ZM8.4375 24.375C8.06666 24.375 7.70415 24.265 7.39581 24.059C7.08746 23.853 6.84714 23.5601 6.70523 23.2175C6.56331 22.8749 6.52618 22.4979 6.59853 22.1342C6.67087 21.7705 6.84945 21.4364 7.11167 21.1742C7.3739 20.912 7.70799 20.7334 8.07171 20.661C8.43542 20.5887 8.81242 20.6258 9.15503 20.7677C9.49764 20.9096 9.79048 21.15 9.99651 21.4583C10.2025 21.7666 10.3125 22.1292 10.3125 22.5C10.3125 22.9973 10.115 23.4742 9.76332 23.8258C9.41169 24.1775 8.93478 24.375 8.4375 24.375ZM21.5625 24.375C21.1917 24.375 20.8291 24.265 20.5208 24.059C20.2125 23.853 19.9721 23.5601 19.8302 23.2175C19.6883 22.8749 19.6512 22.4979 19.7235 22.1342C19.7959 21.7705 19.9745 21.4364 20.2367 21.1742C20.4989 20.912 20.833 20.7334 21.1967 20.661C21.5604 20.5887 21.9374 20.6258 22.28 20.7677C22.6226 20.9096 22.9155 21.15 23.1215 21.4583C23.3275 21.7666 23.4375 22.1292 23.4375 22.5C23.4375 22.9973 23.24 23.4742 22.8883 23.8258C22.5367 24.1775 22.0598 24.375 21.5625 24.375ZM26.25 21.5625H25.1813C24.9654 20.7681 24.4941 20.0668 23.8401 19.5668C23.1861 19.0668 22.3857 18.7959 21.5625 18.7959C20.7393 18.7959 19.9389 19.0668 19.2849 19.5668C18.6309 20.0668 18.1596 20.7681 17.9437 21.5625H12.0562C11.8404 20.7681 11.3691 20.0668 10.7151 19.5668C10.0611 19.0668 9.26072 18.7959 8.4375 18.7959C7.61428 18.7959 6.81393 19.0668 6.15993 19.5668C5.50594 20.0668 5.03464 20.7681 4.81875 21.5625H3.75V15.1031C3.74964 14.538 3.91952 13.9859 4.2375 13.5188L6.77812 9.76875C6.86622 9.64498 6.98307 9.54448 7.11862 9.47589C7.25417 9.4073 7.40435 9.37268 7.55625 9.375H15.0562C15.194 9.37478 15.3301 9.4049 15.4548 9.46323C15.5796 9.52157 15.69 9.60667 15.7781 9.7125L18.9656 13.7156C19.0756 13.8489 19.2175 13.9521 19.3781 14.0156L26.25 16.4813V21.5625Z" fill="currentColor"/>
                    </svg>
                    <svg width="30" height="30" viewBox="0 0 30 30" fill="none" xmlns="http://www.w3.org/2000/svg">
                      <path d="M15.574 2.07551C15.4076 1.94565 15.2026 1.87512 14.9915 1.87512C14.7804 1.87512 14.5754 1.94565 14.409 2.07551L0.9375 12.5808L2.10253 14.0542L3.75 12.7697V24.3751C3.75102 24.872 3.94889 25.3484 4.3003 25.6998C4.65171 26.0512 5.12803 26.249 5.625 26.2501H24.375C24.872 26.2491 25.3484 26.0513 25.6998 25.6999C26.0512 25.3484 26.2491 24.8721 26.25 24.3751V12.7782L27.8975 14.0626L29.0625 12.589L15.574 2.07551ZM16.875 24.3751H13.125V16.8751H16.875V24.3751ZM18.75 24.3751V16.8751C18.7494 16.378 18.5517 15.9014 18.2002 15.5499C17.8487 15.1984 17.3721 15.0006 16.875 15.0001H13.125C12.6279 15.0006 12.1512 15.1983 11.7997 15.5498C11.4482 15.9013 11.2505 16.3779 11.25 16.8751V24.3751H5.625V11.3077L15 4.0046L24.375 11.3176V24.3751H18.75Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <div className="signup-page__coverage-info">
                    <span className="signup-page__coverage-name">Both Home and Car</span>
                    <span className="signup-page__coverage-desc">Insure both and get bundle savings</span>
                  </div>
                </button>
              </div>

              <div className="signup-page__form-footer">
                <div className="signup-page__footer-actions signup-page__footer-actions--right">
                  <Button
                    kind="primary"
                    renderIcon={ArrowRight}
                    onClick={handleNext}
                    disabled={!insuranceType}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step: Personal Information */}
          {currentStep === STEP_PERSONAL && (
            <div className="signup-page__step">
              <div className="signup-page__section-header">
                <h2 className="signup-page__section-title">Personal Information</h2>
              </div>
              <p className="signup-page__section-description">
                Let's start with some basic information about you.
              </p>

              <div className="signup-page__fields">
                <TextInput
                  id="firstName"
                  labelText="First Name"
                  placeholder="Enter your first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  size="lg"
                />
                <TextInput
                  id="lastName"
                  labelText="Last Name"
                  placeholder="Enter your last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  size="lg"
                />
                <TextInput
                  id="email"
                  labelText="Email Address"
                  placeholder="your.email@example.com"
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  size="lg"
                />
                <TextInput
                  id="phone"
                  labelText="Phone Number"
                  placeholder="(555) 123-4567"
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  size="lg"
                />
                <TextInput
                  id="phoneAlt"
                  labelText="Phone Number"
                  placeholder="(555) 123-4567"
                  type="tel"
                  value={phoneAlt}
                  onChange={(e) => setPhoneAlt(e.target.value)}
                  size="lg"
                />
                <DatePicker
                  datePickerType="single"
                  dateFormat="m/d/Y"
                  value={dob}
                  onChange={(dates) => {
                    if (dates && dates[0]) {
                      const d = dates[0];
                      setDob(`${d.getMonth() + 1}/${d.getDate()}/${d.getFullYear()}`);
                    }
                  }}
                >
                  <DatePickerInput
                    id="dob"
                    labelText="Date of Birth"
                    placeholder="mm/dd/yyyy"
                    size="lg"
                  />
                </DatePicker>
              </div>

              <div className="signup-page__form-footer">
                <div className="signup-page__footer-actions signup-page__footer-actions--right">
                  <Button
                    kind="primary"
                    renderIcon={ArrowRight}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step: Address */}
          {currentStep === STEP_ADDRESS && (
            <div className="signup-page__step">
              <div className="signup-page__section-header">
                <h2 className="signup-page__section-title">Your Address</h2>
              </div>
              <p className="signup-page__section-description">
                Let us know where you live
              </p>

              <div className="signup-page__fields">
                <TextInput
                  id="streetAddress"
                  labelText="Street Address"
                  placeholder="123 Main Street"
                  value={streetAddress}
                  onChange={(e) => setStreetAddress(e.target.value)}
                  size="lg"
                />
                <TextInput
                  id="city"
                  labelText="City"
                  placeholder="Your city"
                  value={city}
                  onChange={(e) => setCity(e.target.value)}
                  size="lg"
                />
                <Select
                  id="state"
                  labelText="State"
                  value={state}
                  onChange={(e) => setState(e.target.value)}
                  size="lg"
                >
                  <SelectItem value="" text="" />
                  {US_STATES.map((s) => (
                    <SelectItem key={s} value={s} text={s} />
                  ))}
                </Select>
                <TextInput
                  id="zip"
                  labelText="Zip"
                  placeholder="(555) 123-4567"
                  value={zip}
                  onChange={(e) => setZip(e.target.value)}
                  size="lg"
                />
              </div>

              <div className="signup-page__form-footer">
                <div className="signup-page__footer-actions">
                  <Button
                    kind="secondary"
                    renderIcon={ArrowLeft}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    kind="primary"
                    renderIcon={ArrowRight}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step: Car Details */}
          {currentStep === STEP_CAR && (
            <div className="signup-page__step">
              <div className="signup-page__section-header">
                <h2 className="signup-page__section-title">Car Details</h2>
              </div>
              <p className="signup-page__section-description">
                Tell us about your car
              </p>

              <div className="signup-page__fields">
                <TextInput
                  id="carMake"
                  labelText="Make"
                  placeholder="e.g. Toyota, Ford"
                  value={carMake}
                  onChange={(e) => setCarMake(e.target.value)}
                  size="lg"
                />
                <TextInput
                  id="carModel"
                  labelText="Model"
                  placeholder="e.g. Corolla, Bronco"
                  value={carModel}
                  onChange={(e) => setCarModel(e.target.value)}
                  size="lg"
                />
                <Select
                  id="carYear"
                  labelText="Year"
                  value={carYear}
                  onChange={(e) => setCarYear(e.target.value)}
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
                  value={carMileage}
                  min={0}
                  step={1000}
                  onChange={(e, { value } = {}) => setCarMileage(Number(value) || 0)}
                  size="lg"
                />
                <NumberInput
                  id="carMilesPerYear"
                  label="Miles driven per year"
                  value={carMilesPerYear}
                  min={0}
                  step={1000}
                  onChange={(e, { value } = {}) => setCarMilesPerYear(Number(value) || 0)}
                  size="lg"
                />
                <TextInput
                  id="carVin"
                  labelText="VIN (optional)"
                  placeholder=""
                  helperText="17 digits"
                  value={carVin}
                  onChange={(e) => setCarVin(e.target.value)}
                  size="lg"
                />
              </div>

              <div className="signup-page__form-footer">
                <div className="signup-page__footer-actions">
                  <Button
                    kind="tertiary"
                    renderIcon={ArrowLeft}
                    onClick={() => setCurrentStep(STEP_COVERAGE)}
                  >
                    Cancel
                  </Button>
                  <Button
                    kind="secondary"
                    renderIcon={ArrowLeft}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    kind="primary"
                    renderIcon={ArrowRight}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}

          {/* Step: Home Details */}
          {currentStep === STEP_HOME && (
            <div className="signup-page__step">
              <div className="signup-page__section-header">
                <h2 className="signup-page__section-title">Property Details</h2>
              </div>
              <p className="signup-page__section-description">
                Tell us about your home
              </p>

              <div className="signup-page__fields">
                <Select
                  id="homeType"
                  labelText="Home Type"
                  value={homeType}
                  onChange={(e) => setHomeType(e.target.value)}
                  size="lg"
                >
                  <SelectItem value="" text="" />
                  {HOME_TYPES.map((t) => (
                    <SelectItem key={t} value={t} text={t} />
                  ))}
                </Select>
                <Select
                  id="homeYearBuilt"
                  labelText="Year Built"
                  value={homeYearBuilt}
                  onChange={(e) => setHomeYearBuilt(e.target.value)}
                  size="lg"
                >
                  <SelectItem value="" text="" />
                  {HOME_YEARS.map((y) => (
                    <SelectItem key={y} value={String(y)} text={String(y)} />
                  ))}
                </Select>
                <NumberInput
                  id="homeSquareFeet"
                  label="Square Feet"
                  value={homeSquareFeet}
                  min={0}
                  step={100}
                  helperText="We'll confirm this more accurately later"
                  onChange={(e, { value } = {}) => setHomeSquareFeet(Number(value) || 0)}
                  size="lg"
                />
                <NumberInput
                  id="homeValue"
                  label="Estimated Home Value"
                  value={homeValue}
                  min={0}
                  step={10000}
                  helperText="We'll confirm this more accurately later"
                  onChange={(e, { value } = {}) => setHomeValue(Number(value) || 0)}
                  size="lg"
                />
              </div>

              <div className="signup-page__form-footer">
                <div className="signup-page__footer-actions">
                  <Button
                    kind="secondary"
                    renderIcon={ArrowLeft}
                    onClick={handleBack}
                  >
                    Back
                  </Button>
                  <Button
                    kind="primary"
                    renderIcon={ArrowRight}
                    onClick={handleNext}
                  >
                    Next
                  </Button>
                </div>
              </div>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
