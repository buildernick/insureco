import React, { useState, useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Form,
  Stack,
  TextInput,
  Button,
  Checkbox,
  RadioButtonGroup,
  RadioButton,
  Select,
  SelectItem,
  Heading,
  Tile,
  NumberInput,
  TileGroup,
  RadioTile,
  DatePicker,
  DatePickerInput,
} from '@carbon/react';
import { ArrowRight, ArrowLeft, Checkmark, Close, Car, Home as HomeIcon } from '@carbon/icons-react';
import StepBreadcrumb from './StepBreadcrumb';
import './SignUpDrawer.scss';

const INITIAL_FORM = {
  firstName: '', lastName: '', email: '', phone: '', dateOfBirth: '',
  streetAddress: '', city: '', state: '', zipCode: '',
  insuranceType: '',
  carMake: '', carModel: '', carYear: '', carVin: '',
  homeType: '', homeYear: '', homeSquareFeet: '', homeValue: '',
  coverageLevel: '', deductible: '', additionalCoverage: [],
};

export default function SignUpDrawer({ isOpen, onClose }) {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState(INITIAL_FORM);

  const updateFormData = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  const handleCheckboxChange = (checked, value) => {
    setFormData((prev) => ({
      ...prev,
      additionalCoverage: checked
        ? [...prev.additionalCoverage, value]
        : prev.additionalCoverage.filter((i) => i !== value),
    }));
  };

  const getSteps = useCallback(() => {
    const base = [
      { label: 'Personal Info', key: 'personal' },
      { label: 'Address', key: 'address' },
      { label: 'Insurance Type', key: 'type' },
    ];
    const conditional = [];
    if (formData.insuranceType === 'car' || formData.insuranceType === 'both')
      conditional.push({ label: 'Car Details', key: 'car' });
    if (formData.insuranceType === 'home' || formData.insuranceType === 'both')
      conditional.push({ label: 'Home Details', key: 'home' });
    return [...base, ...conditional,
      { label: 'Coverage', key: 'coverage' },
      { label: 'Review', key: 'review' },
    ];
  }, [formData.insuranceType]);

  const steps = getSteps();
  const currentStepKey = steps[currentStep]?.key;

  const isStepValid = () => {
    switch (currentStepKey) {
      case 'personal': return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 'address': return formData.streetAddress && formData.city && formData.state && formData.zipCode;
      case 'type': return formData.insuranceType;
      case 'car': return formData.carMake && formData.carModel && formData.carYear;
      case 'home': return formData.homeType && formData.homeYear && formData.homeSquareFeet;
      case 'coverage': return formData.coverageLevel && formData.deductible;
      case 'review': return true;
      default: return false;
    }
  };

  const handleNext = () => {
    if (currentStep < steps.length - 1) setCurrentStep((s) => s + 1);
  };

  const handleBack = () => {
    if (currentStep > 0) setCurrentStep((s) => s - 1);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const confirmationNumber = `IC-${Date.now().toString().slice(-6)}-${String(Math.floor(Math.random() * 10000)).padStart(4, '0')}`;
    onClose();
    navigate('/signup/confirmation', { state: { confirmationNumber } });
  };

  const handleClose = () => {
    onClose();
    setCurrentStep(0);
    setFormData(INITIAL_FORM);
  };

  // Close on Escape key
  useEffect(() => {
    if (!isOpen) return;
    const onKey = (e) => { if (e.key === 'Escape') handleClose(); };
    document.addEventListener('keydown', onKey);
    return () => document.removeEventListener('keydown', onKey);
  }, [isOpen]);

  // Lock body scroll when open
  useEffect(() => {
    document.body.style.overflow = isOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  const renderStepContent = () => {
    switch (currentStepKey) {
      case 'personal':
        return (
          <Stack gap={6}>
            <Heading className="drawer-step-heading">Personal Information</Heading>
            <p className="drawer-step-description">Your basic info</p>
            <TextInput id="d-firstName" labelText="First Name" placeholder="Enter your first name"
              value={formData.firstName} onChange={(e) => updateFormData('firstName', e.target.value)} required />
            <TextInput id="d-lastName" labelText="Last Name" placeholder="Enter your last name"
              value={formData.lastName} onChange={(e) => updateFormData('lastName', e.target.value)} required />
            <TextInput id="d-email" labelText="Email Address" type="email" placeholder="your.email@example.com"
              value={formData.email} onChange={(e) => updateFormData('email', e.target.value)} required />
            <TextInput id="d-phone" labelText="Phone Number" type="tel" placeholder="(555) 123-4567"
              value={formData.phone} onChange={(e) => updateFormData('phone', e.target.value)} required />
            <DatePicker datePickerType="single" onChange={(dates) => updateFormData('dateOfBirth', dates?.[0] || '')}>
              <DatePickerInput id="d-dob" labelText="Date of Birth" placeholder="mm/dd/yyyy" value={formData.dateOfBirth} />
            </DatePicker>
          </Stack>
        );

      case 'address':
        return (
          <Stack gap={6}>
            <Heading className="drawer-step-heading">Your Address</Heading>
            <p className="drawer-step-description">Let us know where you live</p>
            <TextInput id="d-street" labelText="Street Address" placeholder="123 Main Street"
              value={formData.streetAddress} onChange={(e) => updateFormData('streetAddress', e.target.value)} required />
            <TextInput id="d-city" labelText="City" placeholder="Your city"
              value={formData.city} onChange={(e) => updateFormData('city', e.target.value)} required />
            <Select id="d-state" labelText="State" value={formData.state}
              onChange={(e) => updateFormData('state', e.target.value)} required>
              <SelectItem value="" text="Select a state" />
              {['Alabama|AL','Alaska|AK','Arizona|AZ','California|CA','Colorado|CO','Florida|FL','Georgia|GA','Illinois|IL','New York|NY','Texas|TX'].map((s) => {
                const [text, value] = s.split('|');
                return <SelectItem key={value} value={value} text={text} />;
              })}
            </Select>
            <TextInput id="d-zip" labelText="Zip Code" placeholder="12345"
              value={formData.zipCode} onChange={(e) => updateFormData('zipCode', e.target.value)} required />
          </Stack>
        );

      case 'type':
        return (
          <Stack gap={6}>
            <Heading className="drawer-step-heading">What Will You Insure</Heading>
            <p className="drawer-step-description">Which insurance coverage are you looking for</p>
            <TileGroup legend="Select coverage type" name="d-insuranceType"
              valueSelected={formData.insuranceType} onChange={(v) => updateFormData('insuranceType', v)}>
              <RadioTile id="d-ins-car" value="car" className="signup-radio-tile">
                <div className="tile-content"><Car size={32} className="tile-icon" />
                  <div className="tile-text"><h4>Car Insurance</h4><p>Comprehensive coverage for your vehicle</p></div>
                </div>
              </RadioTile>
              <RadioTile id="d-ins-home" value="home" className="signup-radio-tile">
                <div className="tile-content"><HomeIcon size={32} className="tile-icon" />
                  <div className="tile-text"><h4>Home Insurance</h4><p>Protect your most important asset</p></div>
                </div>
              </RadioTile>
              <RadioTile id="d-ins-both" value="both" className="signup-radio-tile">
                <div className="tile-content">
                  <div className="tile-icon-group"><Car size={24} /><HomeIcon size={24} /></div>
                  <div className="tile-text"><h4>Both Home and Car</h4><p>Bundle and save</p></div>
                </div>
              </RadioTile>
            </TileGroup>
          </Stack>
        );

      case 'car':
        return (
          <Stack gap={6}>
            <Heading className="drawer-step-heading">Car Details</Heading>
            <p className="drawer-step-description">Tell us about your car</p>
            <TextInput id="d-carMake" labelText="Make" placeholder="e.g. Toyota, Ford"
              value={formData.carMake} onChange={(e) => updateFormData('carMake', e.target.value)} required />
            <TextInput id="d-carModel" labelText="Model" placeholder="e.g. Corolla, Bronco"
              value={formData.carModel} onChange={(e) => updateFormData('carModel', e.target.value)} required />
            <Select id="d-carYear" labelText="Year" value={formData.carYear}
              onChange={(e) => updateFormData('carYear', e.target.value)} required>
              <SelectItem value="" text="" />
              {Array.from({ length: 66 }, (_, i) => 2025 - i).map((y) => (
                <SelectItem key={y} value={String(y)} text={String(y)} />
              ))}
            </Select>
            <TextInput id="d-vin" labelText="VIN (optional)" placeholder="" helperText="17 digits"
              value={formData.carVin} onChange={(e) => updateFormData('carVin', e.target.value)} />
          </Stack>
        );

      case 'home':
        return (
          <Stack gap={6}>
            <Heading className="drawer-step-heading">Home Details</Heading>
            <p className="drawer-step-description">Tell us about your home</p>
            <Select id="d-homeType" labelText="Home Type" value={formData.homeType}
              onChange={(e) => updateFormData('homeType', e.target.value)} required>
              <SelectItem value="" text="" />
              <SelectItem value="single-family" text="Single Family Home" />
              <SelectItem value="condo" text="Condominium" />
              <SelectItem value="townhouse" text="Townhouse" />
              <SelectItem value="apartment" text="Apartment" />
              <SelectItem value="mobile" text="Mobile Home" />
            </Select>
            <Select id="d-homeYear" labelText="Year Built" value={formData.homeYear}
              onChange={(e) => updateFormData('homeYear', e.target.value)} required>
              <SelectItem value="" text="" />
              {Array.from({ length: 226 }, (_, i) => 2025 - i).map((y) => (
                <SelectItem key={y} value={String(y)} text={String(y)} />
              ))}
            </Select>
            <NumberInput id="d-sqft" label="Square Feet" min={100} max={50000}
              value={formData.homeSquareFeet} helperText="We'll confirm this more accurately later"
              onChange={(e, { value }) => updateFormData('homeSquareFeet', value ?? '')} required />
            <NumberInput id="d-homeValue" label="Estimated Home Value" min={10000} max={10000000} step={1000}
              value={formData.homeValue} helperText="We'll confirm this more accurately later"
              onChange={(e, { value }) => updateFormData('homeValue', value ?? '')} />
          </Stack>
        );

      case 'coverage':
        return (
          <Stack gap={6}>
            <Heading className="drawer-step-heading">Coverage Preferences</Heading>
            <p className="drawer-step-description">Choose your coverage level and deductible.</p>
            <RadioButtonGroup name="d-coverage" legendText="Coverage Level" orientation="vertical"
              valueSelected={formData.coverageLevel} onChange={(v) => updateFormData('coverageLevel', v)}>
              <RadioButton labelText="Basic — Essential coverage at lower cost" value="basic" id="d-cov-basic" />
              <RadioButton labelText="Standard — Recommended for most" value="standard" id="d-cov-standard" />
              <RadioButton labelText="Premium — Comprehensive protection" value="premium" id="d-cov-premium" />
            </RadioButtonGroup>
            <Select id="d-deductible" labelText="Deductible" value={formData.deductible}
              onChange={(e) => updateFormData('deductible', e.target.value)} required>
              <SelectItem value="" text="Select deductible" />
              <SelectItem value="250" text="$250" />
              <SelectItem value="500" text="$500" />
              <SelectItem value="1000" text="$1,000" />
              <SelectItem value="2500" text="$2,500" />
            </Select>
            <fieldset className="signup-checkbox-group">
              <legend className="cds--label">Additional Coverage (Optional)</legend>
              <Stack gap={3}>
                <Checkbox id="d-roadside" labelText="Roadside Assistance"
                  checked={formData.additionalCoverage.includes('roadside')}
                  onChange={(e) => handleCheckboxChange(e.target.checked, 'roadside')} />
                <Checkbox id="d-rental" labelText="Rental Car Coverage"
                  checked={formData.additionalCoverage.includes('rental')}
                  onChange={(e) => handleCheckboxChange(e.target.checked, 'rental')} />
                <Checkbox id="d-gap" labelText="Gap Insurance"
                  checked={formData.additionalCoverage.includes('gap')}
                  onChange={(e) => handleCheckboxChange(e.target.checked, 'gap')} />
              </Stack>
            </fieldset>
          </Stack>
        );

      case 'review':
        return (
          <Stack gap={6}>
            <Heading className="drawer-step-heading">Review & Confirm</Heading>
            <p className="drawer-step-description">Please review your information before submitting.</p>
            <Tile className="signup-review-section">
              <h4 className="signup-review-title">Personal Information</h4>
              <div className="signup-review-grid">
                <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Phone:</strong> {formData.phone}</div>
              </div>
            </Tile>
            <Tile className="signup-review-section">
              <h4 className="signup-review-title">Address</h4>
              <div className="signup-review-grid">
                <div>{formData.streetAddress}, {formData.city}, {formData.state} {formData.zipCode}</div>
              </div>
            </Tile>
            <Tile className="signup-review-section">
              <h4 className="signup-review-title">Insurance Type</h4>
              <div className="signup-review-grid">
                <div>
                  {formData.insuranceType === 'car' && 'Car Insurance Only'}
                  {formData.insuranceType === 'home' && 'Home Insurance Only'}
                  {formData.insuranceType === 'both' && 'Car and Home Insurance'}
                </div>
              </div>
            </Tile>
            {(formData.insuranceType === 'car' || formData.insuranceType === 'both') && (
              <Tile className="signup-review-section">
                <h4 className="signup-review-title">Car Details</h4>
                <div className="signup-review-grid">
                  <div><strong>Vehicle:</strong> {formData.carYear} {formData.carMake} {formData.carModel}</div>
                </div>
              </Tile>
            )}
            {(formData.insuranceType === 'home' || formData.insuranceType === 'both') && (
              <Tile className="signup-review-section">
                <h4 className="signup-review-title">Home Details</h4>
                <div className="signup-review-grid">
                  <div><strong>Type:</strong> {formData.homeType}</div>
                  <div><strong>Size:</strong> {formData.homeSquareFeet} sq ft</div>
                  <div><strong>Year Built:</strong> {formData.homeYear}</div>
                </div>
              </Tile>
            )}
            <Tile className="signup-review-section">
              <h4 className="signup-review-title">Coverage</h4>
              <div className="signup-review-grid">
                <div><strong>Level:</strong> {formData.coverageLevel}</div>
                <div><strong>Deductible:</strong> ${formData.deductible}</div>
                {formData.additionalCoverage.length > 0 && (
                  <div><strong>Additional:</strong> {formData.additionalCoverage.join(', ')}</div>
                )}
              </div>
            </Tile>
          </Stack>
        );

      default:
        return null;
    }
  };

  return (
    <>
      <div
        className={`drawer-backdrop ${isOpen ? 'drawer-backdrop--visible' : ''}`}
        onClick={handleClose}
        aria-hidden="true"
      />

      <div
        className={`signup-drawer ${isOpen ? 'signup-drawer--open' : ''}`}
        role="dialog"
        aria-modal="true"
        aria-label="Sign up for InsureCo"
      >
        <div className="signup-drawer__header">
          <div className="signup-drawer__title-group">
            <h2 className="signup-drawer__title">Sign Up for InsureCo</h2>
            <p className="signup-drawer__subtitle">Get covered in just a few steps</p>
          </div>
          <button className="signup-drawer__close" onClick={handleClose} aria-label="Close sign up drawer">
            <Close size={20} />
          </button>
        </div>

        <div className="signup-drawer__stepper">
          <StepBreadcrumb steps={steps} currentIndex={currentStep} spaceEqually />
        </div>

        <div className="signup-drawer__body">
          <Form onSubmit={handleSubmit}>
            <Stack gap={7}>
              {renderStepContent()}
            </Stack>

            <div className="signup-drawer__actions">
              {currentStep > 0 && (
                <Button kind="secondary" onClick={handleBack} renderIcon={ArrowLeft} iconDescription="Go back">
                  Back
                </Button>
              )}
              <span className="signup-drawer__actions-spacer" />
              {currentStep < steps.length - 1 ? (
                <Button onClick={handleNext} disabled={!isStepValid()} renderIcon={ArrowRight} iconDescription="Continue">
                  Next
                </Button>
              ) : (
                <Button type="submit" disabled={!isStepValid()} renderIcon={Checkmark} iconDescription="Submit">
                  Complete Sign Up
                </Button>
              )}
            </div>
          </Form>
        </div>
      </div>
    </>
  );
}
