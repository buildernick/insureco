import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
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
  InlineNotification,
} from '@carbon/react';
import { ArrowRight, ArrowLeft, Checkmark, Car, Home as HomeIcon } from '@carbon/icons-react';
import './SignUpPage.scss';
import { formatDateForInput } from '../utils/businessHelpers';

// ─── Validators ────────────────────────────────────────────────────────────────
const validators = {
  firstName:      (v) => !v?.trim() ? 'First name is required' : '',
  lastName:       (v) => !v?.trim() ? 'Last name is required' : '',
  email: (v) => {
    if (!v?.trim()) return 'Email address is required';
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v)) return 'Please enter a valid email address';
    return '';
  },
  phone: (v) => {
    if (!v?.trim()) return 'Phone number is required';
    if (v.replace(/\D/g, '').length < 10) return 'Please enter a valid 10-digit phone number';
    return '';
  },
  dateOfBirth: (v) => {
    if (!v?.trim()) return 'Date of birth is required';
    // Parse mm/dd/yyyy string stored by formatDateForInput
    const [mm, dd, yyyy] = v.split('/');
    const dob = new Date(Number(yyyy), Number(mm) - 1, Number(dd));
    if (isNaN(dob.getTime())) return 'Please enter a valid date';
    const today = new Date();
    let age = today.getFullYear() - dob.getFullYear();
    const monthDiff = today.getMonth() - dob.getMonth();
    if (monthDiff < 0 || (monthDiff === 0 && today.getDate() < dob.getDate())) age--;
    if (age < 18) return 'You must be at least 18 years old to apply';
    return '';
  },
  streetAddress:  (v) => !v?.trim() ? 'Street address is required' : '',
  city:           (v) => !v?.trim() ? 'City is required' : '',
  state:          (v) => !v ? 'Please select a state' : '',
  zipCode: (v) => {
    if (!v?.trim()) return 'ZIP code is required';
    if (!/^\d{5}(-\d{4})?$/.test(v.trim())) return 'Please enter a valid ZIP code (e.g. 12345)';
    return '';
  },
  carMake:        (v) => !v?.trim() ? 'Vehicle make is required' : '',
  carModel:       (v) => !v?.trim() ? 'Vehicle model is required' : '',
  carYear:        (v) => !v ? 'Vehicle year is required' : '',
  carVin: (v) => {
    if (!v?.trim()) return ''; // optional
    if (v.trim().length !== 17) return 'VIN must be exactly 17 characters';
    return '';
  },
  homeType:       (v) => !v ? 'Home type is required' : '',
  homeYear:       (v) => !v ? 'Year built is required' : '',
  homeSquareFeet: (v) => {
    if (!v && v !== 0) return 'Square footage is required';
    if (Number(v) < 100) return 'Please enter a valid square footage (minimum 100)';
    return '';
  },
  coverageLevel:  (v) => !v ? 'Please select a coverage level' : '',
  deductible:     (v) => !v ? 'Please select a deductible' : '',
};

// Fields required for each step to pass validation
const stepFields = {
  personal: ['firstName', 'lastName', 'email', 'phone', 'dateOfBirth'],
  address:  ['streetAddress', 'city', 'state', 'zipCode'],
  type:     [],
  car:      ['carMake', 'carModel', 'carYear', 'carVin'],
  home:     ['homeType', 'homeYear', 'homeSquareFeet'],
  coverage: ['coverageLevel', 'deductible'],
  review:   [],
};

// ─── Component ─────────────────────────────────────────────────────────────────
export default function SignUpPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [errors, setErrors]   = useState({});
  const [touched, setTouched] = useState({});

  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    phoneAlt: '',
    dateOfBirth: '',

    // Step 2: Address
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',

    // Step 3: Insurance Type
    insuranceType: '',

    // Step 4: Car Details
    carMake: '',
    carModel: '',
    carYear: '',
    carMileage: 1000,
    carMilesPerYear: 1000,
    carVin: '',

    // Step 5: Home Details
    homeType: '',
    homeYear: '',
    homeSquareFeet: '',
    homeValue: '',

    // Step 6: Coverage Preferences
    coverageLevel: '',
    deductible: '',
    additionalCoverage: [],
  });

  // ── Helpers ──────────────────────────────────────────────────────────────────

  const validateField = (field, value) => validators[field]?.(value) ?? '';

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Re-validate live if the field was already touched
    if (touched[field]) {
      setErrors(prev => ({ ...prev, [field]: validateField(field, value) }));
    }
  };

  const handleBlur = (field) => {
    setTouched(prev => ({ ...prev, [field]: true }));
    setErrors(prev => ({ ...prev, [field]: validateField(field, formData[field]) }));
  };

  const handleCheckboxChange = (checked, value) => {
    setFormData(prev => ({
      ...prev,
      additionalCoverage: checked
        ? [...prev.additionalCoverage, value]
        : prev.additionalCoverage.filter(item => item !== value),
    }));
  };

  // Show error only when the field has been touched
  const fieldError  = (field) => (touched[field] && errors[field]) ? errors[field] : '';
  const fieldInvalid = (field) => !!(touched[field] && errors[field]);

  // ── Step management ──────────────────────────────────────────────────────────

  const getSteps = () => {
    const baseSteps = [
      { index: 0, label: 'Personal Info', key: 'personal' },
      { index: 1, label: 'Address',       key: 'address'  },
      { index: 2, label: 'Insurance Type',key: 'type'     },
    ];

    const conditionalSteps = [];
    if (formData.insuranceType === 'car'  || formData.insuranceType === 'both')
      conditionalSteps.push({ index: 3, label: 'Car Details',  key: 'car'  });
    if (formData.insuranceType === 'home' || formData.insuranceType === 'both')
      conditionalSteps.push({ index: 4, label: 'Home Details', key: 'home' });

    const finalSteps = [
      { index: 5, label: 'Coverage', key: 'coverage' },
      { index: 6, label: 'Review',   key: 'review'   },
    ];

    return [...baseSteps, ...conditionalSteps, ...finalSteps];
  };

  const steps           = getSteps();
  const currentStepData = steps[currentStep];

  const validateCurrentStep = () => {
    const key    = currentStepData?.key;
    const fields = stepFields[key] || [];

    // Mark all step fields as touched
    const newTouched = { ...touched };
    fields.forEach(f => { newTouched[f] = true; });
    setTouched(newTouched);

    // Compute errors for all step fields
    const newErrors = { ...errors };
    let hasErrors = false;
    fields.forEach(f => {
      const err = validateField(f, formData[f]);
      newErrors[f] = err;
      if (err) hasErrors = true;
    });
    setErrors(newErrors);

    // Insurance type step needs a selection
    if (key === 'type' && !formData.insuranceType) hasErrors = true;

    return !hasErrors;
  };

  const handleNext = () => {
    if (!validateCurrentStep()) return;
    setCurrentStep(prev => prev + 1);
    window.scrollTo(0, 0);
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateCurrentStep()) return;

    const timestamp = Date.now();
    const random    = Math.floor(Math.random() * 10000);
    const confirmationNumber = `IC-${timestamp.toString().slice(-6)}-${random.toString().padStart(4, '0')}`;

    console.log('Form submitted:', formData);
    navigate('/signup/confirmation', { state: { confirmationNumber } });
  };

  // ── Step renderers ───────────────────────────────────────────────────────────

  const renderStepContent = () => {
    switch (currentStepData?.key) {

      // ── Personal Info ──────────────────────────────────────────────────────
      case 'personal':
        return (
          <Stack gap={6}>
            <Heading className="signup-step-heading">Personal Information</Heading>
            <p className="signup-step-description">
              Let's start with some basic information about you.
            </p>

            <TextInput
              id="firstName"
              labelText="First Name"
              placeholder="Enter your first name"
              value={formData.firstName}
              onChange={(e) => updateFormData('firstName', e.target.value)}
              onBlur={() => handleBlur('firstName')}
              invalid={fieldInvalid('firstName')}
              invalidText={fieldError('firstName')}
            />
            <TextInput
              id="lastName"
              labelText="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => updateFormData('lastName', e.target.value)}
              onBlur={() => handleBlur('lastName')}
              invalid={fieldInvalid('lastName')}
              invalidText={fieldError('lastName')}
            />
            <TextInput
              id="email"
              labelText="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              onBlur={() => handleBlur('email')}
              invalid={fieldInvalid('email')}
              invalidText={fieldError('email')}
            />
            <TextInput
              id="phone"
              labelText="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              onBlur={() => handleBlur('phone')}
              invalid={fieldInvalid('phone')}
              invalidText={fieldError('phone')}
            />
            <TextInput
              id="phoneAlt"
              labelText="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phoneAlt}
              onChange={(e) => updateFormData('phoneAlt', e.target.value)}
            />
            <DatePicker
              datePickerType="single"
              onChange={(dates) => {
                const formatted = formatDateForInput(dates?.[0] || '');
                updateFormData('dateOfBirth', formatted);
                if (touched.dateOfBirth) {
                  setErrors(prev => ({ ...prev, dateOfBirth: validateField('dateOfBirth', formatted) }));
                }
              }}
            >
              <DatePickerInput
                id="dateOfBirth"
                labelText="Date of Birth"
                placeholder="mm/dd/yyyy"
                value={formData.dateOfBirth}
                invalid={fieldInvalid('dateOfBirth')}
                invalidText={fieldError('dateOfBirth')}
              />
            </DatePicker>
          </Stack>
        );

      // ── Address ────────────────────────────────────────────────────────────
      case 'address':
        return (
          <Stack gap={6}>
            <Heading className="signup-step-heading">Your Address</Heading>
            <p className="signup-step-description">Let us know where you live</p>

            <TextInput
              id="streetAddress"
              labelText="Street Address"
              placeholder="123 Main Street"
              value={formData.streetAddress}
              onChange={(e) => updateFormData('streetAddress', e.target.value)}
              onBlur={() => handleBlur('streetAddress')}
              invalid={fieldInvalid('streetAddress')}
              invalidText={fieldError('streetAddress')}
            />
            <TextInput
              id="city"
              labelText="City"
              placeholder="Your city"
              value={formData.city}
              onChange={(e) => updateFormData('city', e.target.value)}
              onBlur={() => handleBlur('city')}
              invalid={fieldInvalid('city')}
              invalidText={fieldError('city')}
            />
            <Select
              id="state"
              labelText="State"
              value={formData.state}
              onChange={(e) => updateFormData('state', e.target.value)}
              onBlur={() => handleBlur('state')}
              invalid={fieldInvalid('state')}
              invalidText={fieldError('state')}
            >
              <SelectItem value="" text="Select a state" />
              <SelectItem value="AL" text="Alabama" />
              <SelectItem value="AK" text="Alaska" />
              <SelectItem value="AZ" text="Arizona" />
              <SelectItem value="CA" text="California" />
              <SelectItem value="CO" text="Colorado" />
              <SelectItem value="FL" text="Florida" />
              <SelectItem value="GA" text="Georgia" />
              <SelectItem value="IL" text="Illinois" />
              <SelectItem value="NY" text="New York" />
              <SelectItem value="TX" text="Texas" />
            </Select>
            <TextInput
              id="zipCode"
              labelText="Zip"
              placeholder="12345"
              value={formData.zipCode}
              onChange={(e) => updateFormData('zipCode', e.target.value)}
              onBlur={() => handleBlur('zipCode')}
              invalid={fieldInvalid('zipCode')}
              invalidText={fieldError('zipCode')}
            />
          </Stack>
        );

      // ── Insurance Type ─────────────────────────────────────────────────────
      case 'type':
        return (
          <Stack gap={6}>
            <Heading className="signup-step-heading">What Will You Insure</Heading>
            <p className="signup-step-description">
              Which insurance coverage are you looking for
            </p>
            {touched.insuranceType && !formData.insuranceType && (
              <p className="signup-field-error">Please select an insurance type to continue</p>
            )}
            <TileGroup
              className="signup-tile-group"
              legend="Select your insurance coverage type"
              name="insuranceType"
              valueSelected={formData.insuranceType}
              onChange={(value) => {
                updateFormData('insuranceType', value);
                setTouched(prev => ({ ...prev, insuranceType: true }));
              }}
            >
              <RadioTile id="insurance-car" value="car" className="signup-radio-tile">
                <div className="tile-content">
                  <Car size={32} className="tile-icon" />
                  <div className="tile-text">
                    <h4>Car Insurance</h4>
                    <p>Get comprehensive coverage for your vehicle</p>
                  </div>
                </div>
              </RadioTile>

              <RadioTile id="insurance-home" value="home" className="signup-radio-tile">
                <div className="tile-content">
                  <HomeIcon size={32} className="tile-icon" />
                  <div className="tile-text">
                    <h4>Home Insurance</h4>
                    <p>Protect your most important asset for your family</p>
                  </div>
                </div>
              </RadioTile>

              <RadioTile id="insurance-both" value="both" className="signup-radio-tile">
                <div className="tile-content">
                  <div className="tile-icon-group">
                    <Car size={24} />
                    <HomeIcon size={24} />
                  </div>
                  <div className="tile-text">
                    <h4>Both Home and Car</h4>
                    <p>Insure both and get bundle savings</p>
                  </div>
                </div>
              </RadioTile>
            </TileGroup>
          </Stack>
        );

      // ── Car Details ────────────────────────────────────────────────────────
      case 'car':
        return (
          <Stack gap={6}>
            <InlineNotification
              kind="warning"
              lowContrast
              title=""
              subtitle="This is a warning message"
              onClose={() => {}}
              hideCloseButton={false}
            />
            <Heading className="signup-step-heading">Car Details</Heading>
            <p className="signup-step-description">Tell us about your car</p>

            <TextInput
              id="carMake"
              labelText="Make"
              placeholder="e.g. Toyota, Ford"
              value={formData.carMake}
              onChange={(e) => updateFormData('carMake', e.target.value)}
              onBlur={() => handleBlur('carMake')}
              invalid={fieldInvalid('carMake')}
              invalidText={fieldError('carMake')}
            />
            <TextInput
              id="carModel"
              labelText="Model"
              placeholder="e.g. Corolla, Bronco"
              value={formData.carModel}
              onChange={(e) => updateFormData('carModel', e.target.value)}
              onBlur={() => handleBlur('carModel')}
              invalid={fieldInvalid('carModel')}
              invalidText={fieldError('carModel')}
            />
            <Select
              id="carYear"
              labelText="Year"
              value={formData.carYear}
              onChange={(e) => updateFormData('carYear', e.target.value)}
              onBlur={() => handleBlur('carYear')}
              invalid={fieldInvalid('carYear')}
              invalidText={fieldError('carYear')}
            >
              <SelectItem value="" text="" />
              {Array.from({ length: 2025 - 1960 + 1 }, (_, i) => 2025 - i).map(year => (
                <SelectItem key={year} value={year.toString()} text={year.toString()} />
              ))}
            </Select>
            <NumberInput
              id="carMileage"
              label="Mileage"
              min={0}
              max={999999}
              step={1000}
              value={formData.carMileage}
              onChange={(e, { value }) => updateFormData('carMileage', value ?? 0)}
            />
            <NumberInput
              id="carMilesPerYear"
              label="Miles driven per year"
              min={0}
              max={999999}
              step={1000}
              value={formData.carMilesPerYear}
              onChange={(e, { value }) => updateFormData('carMilesPerYear', value ?? 0)}
            />
            <TextInput
              id="carVin"
              labelText="VIN (optional)"
              placeholder=""
              helperText="17 digits"
              value={formData.carVin}
              onChange={(e) => updateFormData('carVin', e.target.value)}
              onBlur={() => handleBlur('carVin')}
              invalid={fieldInvalid('carVin')}
              invalidText={fieldError('carVin')}
            />
          </Stack>
        );

      // ── Home / Property Details ────────────────────────────────────────────
      case 'home':
        return (
          <Stack gap={6}>
            <Heading className="signup-step-heading">Property Details</Heading>
            <p className="signup-step-description">Tell us about your home</p>

            <Select
              id="homeType"
              labelText="Home Type"
              value={formData.homeType}
              onChange={(e) => updateFormData('homeType', e.target.value)}
              onBlur={() => handleBlur('homeType')}
              invalid={fieldInvalid('homeType')}
              invalidText={fieldError('homeType')}
            >
              <SelectItem value="" text="" />
              <SelectItem value="single-family" text="Single Family Home" />
              <SelectItem value="condo"         text="Condominium"        />
              <SelectItem value="townhouse"     text="Townhouse"          />
              <SelectItem value="apartment"     text="Apartment"          />
              <SelectItem value="mobile"        text="Mobile Home"        />
            </Select>
            <Select
              id="homeYear"
              labelText="Year Built"
              value={formData.homeYear}
              onChange={(e) => updateFormData('homeYear', e.target.value)}
              onBlur={() => handleBlur('homeYear')}
              invalid={fieldInvalid('homeYear')}
              invalidText={fieldError('homeYear')}
            >
              <SelectItem value="" text="" />
              {Array.from({ length: 2025 - 1800 + 1 }, (_, i) => 2025 - i).map(year => (
                <SelectItem key={year} value={year.toString()} text={year.toString()} />
              ))}
            </Select>
            <NumberInput
              id="homeSquareFeet"
              label="Square Feet"
              min={100}
              max={50000}
              value={formData.homeSquareFeet}
              onChange={(e, { value }) => updateFormData('homeSquareFeet', value ?? '')}
              onBlur={() => handleBlur('homeSquareFeet')}
              invalid={fieldInvalid('homeSquareFeet')}
              invalidText={fieldError('homeSquareFeet')}
              helperText="We'll confirm this more accurately later"
            />
            <NumberInput
              id="homeValue"
              label="Estimated Home Value"
              min={10000}
              max={10000000}
              step={1000}
              value={formData.homeValue}
              onChange={(e, { value }) => updateFormData('homeValue', value ?? '')}
              helperText="We'll confirm this more accurately later"
            />
          </Stack>
        );

      // ── Coverage ───────────────────────────────────────────────────────────
      case 'coverage':
        return (
          <Stack gap={6}>
            <Heading className="signup-step-heading">Coverage Preferences</Heading>
            <p className="signup-step-description">
              Choose your coverage level and deductible.
            </p>

            <div>
              {touched.coverageLevel && !formData.coverageLevel && (
                <p className="signup-field-error">Please select a coverage level</p>
              )}
              <RadioButtonGroup
                name="coverageLevel"
                legendText="Coverage Level"
                orientation="vertical"
                valueSelected={formData.coverageLevel}
                onChange={(value) => {
                  updateFormData('coverageLevel', value);
                  setTouched(prev => ({ ...prev, coverageLevel: true }));
                }}
              >
                <RadioButton labelText="Basic — Essential coverage at lower cost"       value="basic"    id="coverage-basic"    />
                <RadioButton labelText="Standard — Recommended coverage for most"       value="standard" id="coverage-standard" />
                <RadioButton labelText="Premium — Comprehensive protection"             value="premium"  id="coverage-premium"  />
              </RadioButtonGroup>
            </div>

            <Select
              id="deductible"
              labelText="Deductible"
              value={formData.deductible}
              onChange={(e) => updateFormData('deductible', e.target.value)}
              onBlur={() => handleBlur('deductible')}
              invalid={fieldInvalid('deductible')}
              invalidText={fieldError('deductible')}
            >
              <SelectItem value=""    text="Select deductible" />
              <SelectItem value="250"  text="$250"   />
              <SelectItem value="500"  text="$500"   />
              <SelectItem value="1000" text="$1,000" />
              <SelectItem value="2500" text="$2,500" />
            </Select>

            <fieldset className="signup-checkbox-group">
              <legend className="cds--label">Additional Coverage (Optional)</legend>
              <Stack gap={3}>
                <Checkbox
                  id="roadside"
                  labelText="Roadside Assistance"
                  checked={formData.additionalCoverage.includes('roadside')}
                  onChange={(e) => handleCheckboxChange(e.target.checked, 'roadside')}
                />
                <Checkbox
                  id="rental"
                  labelText="Rental Car Coverage"
                  checked={formData.additionalCoverage.includes('rental')}
                  onChange={(e) => handleCheckboxChange(e.target.checked, 'rental')}
                />
                <Checkbox
                  id="gap"
                  labelText="Gap Insurance"
                  checked={formData.additionalCoverage.includes('gap')}
                  onChange={(e) => handleCheckboxChange(e.target.checked, 'gap')}
                />
              </Stack>
            </fieldset>
          </Stack>
        );

      // ── Review ─────────────────────────────────────────────────────────────
      case 'review':
        return (
          <Stack gap={6}>
            <Heading className="signup-step-heading">Review & Confirm</Heading>
            <p className="signup-step-description">
              Please review your information before submitting.
            </p>

            <Tile className="signup-review-section">
              <h4 className="signup-review-title">Personal Information</h4>
              <div className="signup-review-grid">
                <div><strong>Name:</strong> {formData.firstName} {formData.lastName}</div>
                <div><strong>Email:</strong> {formData.email}</div>
                <div><strong>Phone:</strong> {formData.phone}</div>
                {formData.dateOfBirth && (
                  <div><strong>Date of Birth:</strong> {new Date(formData.dateOfBirth).toLocaleDateString()}</div>
                )}
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
                  {formData.insuranceType === 'car'  && 'Car Insurance Only'}
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
                  {formData.carMileage && <div><strong>Mileage:</strong> {formData.carMileage.toLocaleString()} mi</div>}
                  {formData.carMilesPerYear && <div><strong>Miles/year:</strong> {formData.carMilesPerYear.toLocaleString()} mi</div>}
                  {formData.carVin && <div><strong>VIN:</strong> {formData.carVin}</div>}
                </div>
              </Tile>
            )}

            {(formData.insuranceType === 'home' || formData.insuranceType === 'both') && (
              <Tile className="signup-review-section">
                <h4 className="signup-review-title">Property Details</h4>
                <div className="signup-review-grid">
                  <div><strong>Type:</strong> {formData.homeType}</div>
                  <div><strong>Size:</strong> {formData.homeSquareFeet} sq ft</div>
                  <div><strong>Year Built:</strong> {formData.homeYear}</div>
                  {formData.homeValue && <div><strong>Est. Value:</strong> ${Number(formData.homeValue).toLocaleString()}</div>}
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

  // ── Render ───────────────────────────────────────────────────────────────────

  return (
    <Grid className="signup-page signup-container">
      <Column sm={4} md={8} lg={{ span: 12, offset: 2 }} xlg={{ span: 10, offset: 3 }}>
        <header className="signup-header">
          <Heading className="signup-title">Sign Up for InsureCo</Heading>
          <p className="signup-subtitle">
            Get started with your insurance coverage in just a few steps
          </p>
        </header>

        {/* Percent-complete progress bar */}
        {(() => {
          const pct = Math.round((currentStep / (steps.length - 1)) * 100);
          return (
            <div className="signup-progress-bar-wrap">
              <div className="signup-progress-bar-header">
                <span className="signup-progress-bar-label">
                  Step {currentStep + 1} of {steps.length} — {currentStepData?.label}
                </span>
                <span className="signup-progress-bar-pct">{pct}%</span>
              </div>
              <div className="signup-progress-bar-track" role="progressbar" aria-valuenow={pct} aria-valuemin={0} aria-valuemax={100} aria-label="Sign-up progress">
                <div className="signup-progress-bar-fill" style={{ width: `${pct}%` }} />
              </div>
              <div className="signup-progress-bar-steps">
                {steps.map((step, index) => (
                  <div
                    key={step.key}
                    className={`signup-progress-bar-step ${index < currentStep ? 'is-complete' : ''} ${index === currentStep ? 'is-current' : ''}`}
                  >
                    <div className="signup-progress-bar-step-dot" />
                    <span className="signup-progress-bar-step-name">{step.label}</span>
                  </div>
                ))}
              </div>
            </div>
          );
        })()}

        <Form className="signup-form" onSubmit={handleSubmit}>
          <Stack gap={7} className="signup-step-content">
            {renderStepContent()}
          </Stack>

          <Stack gap={5} orientation="horizontal" className="signup-actions">
            {currentStepData?.key === 'car' && (
              <Button
                kind="tertiary"
                onClick={() => navigate('/')}
                renderIcon={ArrowLeft}
                iconDescription="Cancel"
              >
                Cancel
              </Button>
            )}

            {currentStep > 0 && (
              <Button
                kind="secondary"
                onClick={handleBack}
                renderIcon={ArrowLeft}
                iconDescription="Go back"
              >
                Back
              </Button>
            )}

            <span className="signup-actions-spacer" />

            {currentStep < steps.length - 1 ? (
              <Button
                onClick={handleNext}
                renderIcon={ArrowRight}
                iconDescription="Continue"
              >
                Next
              </Button>
            ) : (
              <Button
                type="submit"
                renderIcon={Checkmark}
                iconDescription="Submit"
              >
                Complete Sign Up
              </Button>
            )}
          </Stack>
        </Form>
      </Column>
    </Grid>
  );
}
