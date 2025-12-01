import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  ProgressIndicator,
  ProgressStep,
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
} from '@carbon/react';
import { ArrowRight, ArrowLeft, Checkmark, Car, Home as HomeIcon } from '@carbon/icons-react';
import './SignUpPage.scss';

export default function SignUpPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Personal Info
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    dateOfBirth: '',
    
    // Step 2: Address
    streetAddress: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Step 3: Insurance Type
    insuranceType: '', // 'car', 'home', 'both'
    
    // Step 4: Car Details
    carMake: '',
    carModel: '',
    carYear: '',
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

  const updateFormData = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleCheckboxChange = (checked, value) => {
    setFormData(prev => ({
      ...prev,
      additionalCoverage: checked
        ? [...prev.additionalCoverage, value]
        : prev.additionalCoverage.filter(item => item !== value),
    }));
  };

  // Determine which steps to show based on insurance type
  const getSteps = () => {
    const baseSteps = [
      { index: 0, label: 'Personal Info', key: 'personal' },
      { index: 1, label: 'Address', key: 'address' },
      { index: 2, label: 'Insurance Type', key: 'type' },
    ];

    const conditionalSteps = [];
    
    if (formData.insuranceType === 'car' || formData.insuranceType === 'both') {
      conditionalSteps.push({ index: 3, label: 'Car Details', key: 'car' });
    }
    
    if (formData.insuranceType === 'home' || formData.insuranceType === 'both') {
      conditionalSteps.push({ index: 4, label: 'Home Details', key: 'home' });
    }

    const finalSteps = [
      { index: 5, label: 'Coverage', key: 'coverage' },
      { index: 6, label: 'Review', key: 'review' },
    ];

    return [...baseSteps, ...conditionalSteps, ...finalSteps];
  };

  const steps = getSteps();
  const currentStepData = steps[currentStep];

  const handleNext = () => {
    if (currentStep < steps.length - 1) {
      setCurrentStep(prev => prev + 1);
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    if (currentStep > 0) {
      setCurrentStep(prev => prev - 1);
      window.scrollTo(0, 0);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Mock submission - in real app would send to backend
    console.log('Form submitted:', formData);
    navigate('/dashboard');
  };

  const isStepValid = () => {
    switch (currentStepData?.key) {
      case 'personal':
        return formData.firstName && formData.lastName && formData.email && formData.phone;
      case 'address':
        return formData.streetAddress && formData.city && formData.state && formData.zipCode;
      case 'type':
        return formData.insuranceType;
      case 'car':
        return formData.carMake && formData.carModel && formData.carYear;
      case 'home':
        return formData.homeType && formData.homeYear && formData.homeSquareFeet;
      case 'coverage':
        return formData.coverageLevel && formData.deductible;
      case 'review':
        return true;
      default:
        return false;
    }
  };

  const renderStepContent = () => {
    switch (currentStepData?.key) {
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
              required
            />
            <TextInput
              id="lastName"
              labelText="Last Name"
              placeholder="Enter your last name"
              value={formData.lastName}
              onChange={(e) => updateFormData('lastName', e.target.value)}
              required
            />
            <TextInput
              id="email"
              labelText="Email Address"
              type="email"
              placeholder="your.email@example.com"
              value={formData.email}
              onChange={(e) => updateFormData('email', e.target.value)}
              required
            />
            <TextInput
              id="phone"
              labelText="Phone Number"
              type="tel"
              placeholder="(555) 123-4567"
              value={formData.phone}
              onChange={(e) => updateFormData('phone', e.target.value)}
              required
            />
            <TextInput
              id="dateOfBirth"
              labelText="Date of Birth"
              type="date"
              value={formData.dateOfBirth}
              onChange={(e) => updateFormData('dateOfBirth', e.target.value)}
            />
          </Stack>
        );

      case 'address':
        return (
          <Stack gap={6}>
            <Heading className="signup-step-heading">Your Address</Heading>
            <p className="signup-step-description">
              Where is your primary residence?
            </p>
            <TextInput
              id="streetAddress"
              labelText="Street Address"
              placeholder="123 Main Street"
              value={formData.streetAddress}
              onChange={(e) => updateFormData('streetAddress', e.target.value)}
              required
            />
            <TextInput
              id="city"
              labelText="City"
              placeholder="Your city"
              value={formData.city}
              onChange={(e) => updateFormData('city', e.target.value)}
              required
            />
            <Select
              id="state"
              labelText="State"
              value={formData.state}
              onChange={(e) => updateFormData('state', e.target.value)}
              required
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
              labelText="ZIP Code"
              placeholder="12345"
              value={formData.zipCode}
              onChange={(e) => updateFormData('zipCode', e.target.value)}
              required
            />
          </Stack>
        );

      case 'type':
        return (
          <Stack gap={6}>
            <Heading className="signup-step-heading">Insurance Type</Heading>
            <p className="signup-step-description">
              What type of insurance coverage do you need?
            </p>
            <RadioButtonGroup
              name="insuranceType"
              orientation="vertical"
              valueSelected={formData.insuranceType}
              onChange={(value) => updateFormData('insuranceType', value)}
            >
              <RadioButton
                labelText="Car Insurance Only"
                value="car"
                id="insurance-car"
              />
              <RadioButton
                labelText="Home Insurance Only"
                value="home"
                id="insurance-home"
              />
              <RadioButton
                labelText="Both Car and Home Insurance"
                value="both"
                id="insurance-both"
              />
            </RadioButtonGroup>
          </Stack>
        );

      case 'car':
        return (
          <Stack gap={6}>
            <Heading className="signup-step-heading">Car Details</Heading>
            <p className="signup-step-description">
              Tell us about the vehicle you want to insure.
            </p>
            <TextInput
              id="carMake"
              labelText="Make"
              placeholder="e.g., Toyota, Honda, Ford"
              value={formData.carMake}
              onChange={(e) => updateFormData('carMake', e.target.value)}
              required
            />
            <TextInput
              id="carModel"
              labelText="Model"
              placeholder="e.g., Camry, Civic, F-150"
              value={formData.carModel}
              onChange={(e) => updateFormData('carModel', e.target.value)}
              required
            />
            <NumberInput
              id="carYear"
              label="Year"
              min={1900}
              max={new Date().getFullYear() + 1}
              value={formData.carYear}
              onChange={(e) => updateFormData('carYear', e.target.value)}
              required
            />
            <TextInput
              id="carVin"
              labelText="VIN (Optional)"
              placeholder="Vehicle Identification Number"
              value={formData.carVin}
              onChange={(e) => updateFormData('carVin', e.target.value)}
            />
          </Stack>
        );

      case 'home':
        return (
          <Stack gap={6}>
            <Heading className="signup-step-heading">Home Details</Heading>
            <p className="signup-step-description">
              Tell us about the home you want to insure.
            </p>
            <Select
              id="homeType"
              labelText="Home Type"
              value={formData.homeType}
              onChange={(e) => updateFormData('homeType', e.target.value)}
              required
            >
              <SelectItem value="" text="Select home type" />
              <SelectItem value="single-family" text="Single Family Home" />
              <SelectItem value="condo" text="Condominium" />
              <SelectItem value="townhouse" text="Townhouse" />
              <SelectItem value="apartment" text="Apartment" />
              <SelectItem value="mobile" text="Mobile Home" />
            </Select>
            <NumberInput
              id="homeYear"
              label="Year Built"
              min={1800}
              max={new Date().getFullYear()}
              value={formData.homeYear}
              onChange={(e) => updateFormData('homeYear', e.target.value)}
              required
            />
            <NumberInput
              id="homeSquareFeet"
              label="Square Feet"
              min={100}
              max={50000}
              value={formData.homeSquareFeet}
              onChange={(e) => updateFormData('homeSquareFeet', e.target.value)}
              required
            />
            <NumberInput
              id="homeValue"
              label="Estimated Home Value ($)"
              min={10000}
              max={10000000}
              step={1000}
              value={formData.homeValue}
              onChange={(e) => updateFormData('homeValue', e.target.value)}
            />
          </Stack>
        );

      case 'coverage':
        return (
          <Stack gap={6}>
            <Heading className="signup-step-heading">Coverage Preferences</Heading>
            <p className="signup-step-description">
              Choose your coverage level and deductible.
            </p>
            <RadioButtonGroup
              name="coverageLevel"
              legendText="Coverage Level"
              orientation="vertical"
              valueSelected={formData.coverageLevel}
              onChange={(value) => updateFormData('coverageLevel', value)}
            >
              <RadioButton
                labelText="Basic - Essential coverage at lower cost"
                value="basic"
                id="coverage-basic"
              />
              <RadioButton
                labelText="Standard - Recommended coverage for most"
                value="standard"
                id="coverage-standard"
              />
              <RadioButton
                labelText="Premium - Comprehensive protection"
                value="premium"
                id="coverage-premium"
              />
            </RadioButtonGroup>

            <Select
              id="deductible"
              labelText="Deductible"
              value={formData.deductible}
              onChange={(e) => updateFormData('deductible', e.target.value)}
              required
            >
              <SelectItem value="" text="Select deductible" />
              <SelectItem value="250" text="$250" />
              <SelectItem value="500" text="$500" />
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
                <div>
                  <strong>Name:</strong> {formData.firstName} {formData.lastName}
                </div>
                <div>
                  <strong>Email:</strong> {formData.email}
                </div>
                <div>
                  <strong>Phone:</strong> {formData.phone}
                </div>
              </div>
            </Tile>

            <Tile className="signup-review-section">
              <h4 className="signup-review-title">Address</h4>
              <div className="signup-review-grid">
                <div>
                  {formData.streetAddress}, {formData.city}, {formData.state} {formData.zipCode}
                </div>
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
                  <div>
                    <strong>Vehicle:</strong> {formData.carYear} {formData.carMake} {formData.carModel}
                  </div>
                </div>
              </Tile>
            )}

            {(formData.insuranceType === 'home' || formData.insuranceType === 'both') && (
              <Tile className="signup-review-section">
                <h4 className="signup-review-title">Home Details</h4>
                <div className="signup-review-grid">
                  <div>
                    <strong>Type:</strong> {formData.homeType}
                  </div>
                  <div>
                    <strong>Size:</strong> {formData.homeSquareFeet} sq ft
                  </div>
                  <div>
                    <strong>Year Built:</strong> {formData.homeYear}
                  </div>
                </div>
              </Tile>
            )}

            <Tile className="signup-review-section">
              <h4 className="signup-review-title">Coverage</h4>
              <div className="signup-review-grid">
                <div>
                  <strong>Level:</strong> {formData.coverageLevel}
                </div>
                <div>
                  <strong>Deductible:</strong> ${formData.deductible}
                </div>
                {formData.additionalCoverage.length > 0 && (
                  <div>
                    <strong>Additional:</strong> {formData.additionalCoverage.join(', ')}
                  </div>
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
    <div className="signup-page">
      <Grid className="signup-container">
        <Column sm={4} md={8} lg={{ span: 12, offset: 2 }} xlg={{ span: 10, offset: 3 }}>
          <div className="signup-header">
            <Heading className="signup-title">Sign Up for InsureCo</Heading>
            <p className="signup-subtitle">
              Get started with your insurance coverage in just a few steps
            </p>
          </div>

          <div className="signup-progress">
            <ProgressIndicator currentIndex={currentStep} spaceEqually>
              {steps.map((step, index) => (
                <ProgressStep
                  key={step.key}
                  label={step.label}
                  description={index === currentStep ? 'Current' : ''}
                  complete={index < currentStep}
                />
              ))}
            </ProgressIndicator>
          </div>

          <Form className="signup-form" onSubmit={handleSubmit}>
            <div className="signup-step-content">
              {renderStepContent()}
            </div>

            <div className="signup-actions">
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

              <div className="signup-actions-spacer" />

              {currentStep < steps.length - 1 ? (
                <Button
                  onClick={handleNext}
                  disabled={!isStepValid()}
                  renderIcon={ArrowRight}
                  iconDescription="Continue"
                >
                  Next
                </Button>
              ) : (
                <Button
                  type="submit"
                  disabled={!isStepValid()}
                  renderIcon={Checkmark}
                  iconDescription="Submit"
                >
                  Complete Sign Up
                </Button>
              )}
            </div>
          </Form>
        </Column>
      </Grid>
    </div>
  );
}
