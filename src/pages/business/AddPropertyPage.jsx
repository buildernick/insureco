import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Heading,
  Breadcrumb,
  BreadcrumbItem,
  TextInput,
  TextArea,
  Dropdown,
  NumberInput,
  Select,
  SelectItem,
  Form,
  InlineNotification,
  DatePicker,
  DatePickerInput,
} from '@carbon/react';
import { ArrowLeft, ArrowRight, Checkmark, Building } from '@carbon/icons-react';
import { formatDateForInput } from '../../utils/businessHelpers';
import StepBreadcrumb from '../../components/StepBreadcrumb';
import './AddPropertyPage.scss';

/**
 * AddPropertyPage - Multi-step property addition process
 * Step 1: Property Information
 * Step 2: Building Details
 * Step 3: Coverage Selection
 * Step 4: Review & Submit
 */
export default function AddPropertyPage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Property Information
    propertyName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    
    // Step 2: Building Details
    propertyType: '',
    buildingClass: '',
    squareFeet: '',
    yearBuilt: '',
    stories: '',
    parking: '',
    occupancy: '',
    
    // Step 3: Coverage
    coverageType: 'Commercial Property',
    coverageLimit: '',
    deductible: '',
    inspectionDate: '',
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { label: 'Property Info', status: 'current' },
    { label: 'Building Details', status: 'incomplete' },
    { label: 'Coverage', status: 'incomplete' },
    { label: 'Review', status: 'incomplete' },
  ];

  const getStepStatus = (index) => {
    if (index < currentStep) return 'complete';
    if (index === currentStep) return 'current';
    return 'incomplete';
  };

  const updatedSteps = steps.map((step, index) => ({
    ...step,
    status: getStepStatus(index),
  }));

  const propertyTypeOptions = [
    { id: 'office', text: 'Office Building' },
    { id: 'warehouse', text: 'Warehouse' },
    { id: 'retail', text: 'Retail' },
    { id: 'manufacturing', text: 'Manufacturing' },
    { id: 'medical', text: 'Medical Office' },
    { id: 'restaurant', text: 'Restaurant' },
    { id: 'hotel', text: 'Hotel' },
    { id: 'fitness', text: 'Fitness Center' },
    { id: 'data-center', text: 'Data Center' },
    { id: 'storage', text: 'Self-Storage' },
    { id: 'other', text: 'Other' },
  ];

  const buildingClassOptions = [
    { id: 'class-a-plus', text: 'Class A+' },
    { id: 'class-a', text: 'Class A' },
    { id: 'class-b', text: 'Class B' },
    { id: 'class-c', text: 'Class C' },
    { id: 'industrial', text: 'Industrial' },
    { id: 'special', text: 'Special Purpose' },
  ];

  const usStates = [
    'AL', 'AK', 'AZ', 'AR', 'CA', 'CO', 'CT', 'DE', 'FL', 'GA',
    'HI', 'ID', 'IL', 'IN', 'IA', 'KS', 'KY', 'LA', 'ME', 'MD',
    'MA', 'MI', 'MN', 'MS', 'MO', 'MT', 'NE', 'NV', 'NH', 'NJ',
    'NM', 'NY', 'NC', 'ND', 'OH', 'OK', 'OR', 'PA', 'RI', 'SC',
    'SD', 'TN', 'TX', 'UT', 'VT', 'VA', 'WA', 'WV', 'WI', 'WY'
  ];

  const deductibleOptions = [
    { id: '2500', text: '$2,500' },
    { id: '5000', text: '$5,000' },
    { id: '7500', text: '$7,500' },
    { id: '10000', text: '$10,000' },
    { id: '15000', text: '$15,000' },
    { id: '20000', text: '$20,000' },
    { id: '25000', text: '$25,000' },
  ];

  const coverageLimitOptions = [
    { id: '500000', text: '$500,000' },
    { id: '750000', text: '$750,000' },
    { id: '1000000', text: '$1,000,000' },
    { id: '1500000', text: '$1,500,000' },
    { id: '2000000', text: '$2,000,000' },
    { id: '2500000', text: '$2,500,000' },
    { id: '3000000', text: '$3,000,000' },
    { id: '5000000', text: '$5,000,000' },
    { id: '10000000', text: '$10,000,000' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.propertyName) newErrors.propertyName = 'Required';
      if (!formData.address) newErrors.address = 'Required';
      if (!formData.city) newErrors.city = 'Required';
      if (!formData.state) newErrors.state = 'Required';
      if (!formData.zipCode) newErrors.zipCode = 'Required';
    } else if (step === 1) {
      if (!formData.propertyType) newErrors.propertyType = 'Required';
      if (!formData.buildingClass) newErrors.buildingClass = 'Required';
      if (!formData.squareFeet) newErrors.squareFeet = 'Required';
      if (!formData.yearBuilt) newErrors.yearBuilt = 'Required';
      if (!formData.stories) newErrors.stories = 'Required';
    } else if (step === 2) {
      if (!formData.coverageLimit) newErrors.coverageLimit = 'Required';
      if (!formData.deductible) newErrors.deductible = 'Required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
      window.scrollTo(0, 0);
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
    window.scrollTo(0, 0);
  };

  const handleSubmit = () => {
    // Generate property ID
    const propertyId = `PROP-2024-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;
    
    console.log('Adding property:', { ...formData, id: propertyId });
    
    navigate('/business/properties', {
      state: {
        notification: {
          kind: 'success',
          title: 'Property added successfully',
          subtitle: `${formData.propertyName} has been added to your portfolio.`,
        },
      },
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <div className="section-header">
              <Heading className="section-title">Property Information</Heading>
            </div>
            <p className="section-description">Enter the basic details about the property</p>

            <Form>
              <TextInput
                id="property-name"
                labelText="Property Name"
                placeholder="e.g., Downtown Office Building"
                value={formData.propertyName}
                onChange={(e) => handleInputChange('propertyName', e.target.value)}
                invalid={!!errors.propertyName}
                invalidText={errors.propertyName}
              />

              <TextInput
                id="address"
                labelText="Street Address"
                placeholder="e.g., 123 Main St"
                value={formData.address}
                onChange={(e) => handleInputChange('address', e.target.value)}
                invalid={!!errors.address}
                invalidText={errors.address}
              />

              <TextInput
                id="city"
                labelText="City"
                placeholder="e.g., San Francisco"
                value={formData.city}
                onChange={(e) => handleInputChange('city', e.target.value)}
                invalid={!!errors.city}
                invalidText={errors.city}
              />

              <Select
                id="state"
                labelText="State"
                value={formData.state}
                onChange={(e) => handleInputChange('state', e.target.value)}
                invalid={!!errors.state}
                invalidText={errors.state}
              >
                <SelectItem value="" text="Select state" />
                {usStates.map(state => (
                  <SelectItem key={state} value={state} text={state} />
                ))}
              </Select>

              <TextInput
                id="zip-code"
                labelText="Zip Code"
                placeholder="e.g., 94102"
                value={formData.zipCode}
                onChange={(e) => handleInputChange('zipCode', e.target.value)}
                invalid={!!errors.zipCode}
                invalidText={errors.zipCode}
              />
            </Form>
          </div>
        );

      case 1:
        return (
          <div className="step-content">
            <div className="section-header">
              <Heading className="section-title">Building Details</Heading>
            </div>
            <p className="section-description">Provide information about the building structure</p>

            <Form>
              <Dropdown
                id="property-type"
                titleText="Property Type"
                label="Select property type"
                items={propertyTypeOptions}
                itemToString={(item) => item ? item.text : ''}
                selectedItem={propertyTypeOptions.find(p => p.id === formData.propertyType)}
                onChange={({ selectedItem }) => handleInputChange('propertyType', selectedItem?.id || '')}
                invalid={!!errors.propertyType}
                invalidText={errors.propertyType}
              />

              <Dropdown
                id="building-class"
                titleText="Building Class"
                label="Select building class"
                items={buildingClassOptions}
                itemToString={(item) => item ? item.text : ''}
                selectedItem={buildingClassOptions.find(b => b.id === formData.buildingClass)}
                onChange={({ selectedItem }) => handleInputChange('buildingClass', selectedItem?.id || '')}
                invalid={!!errors.buildingClass}
                invalidText={errors.buildingClass}
              />

              <NumberInput
                id="square-feet"
                label="Square Feet"
                min={0}
                value={formData.squareFeet}
                onChange={(e, { value }) => handleInputChange('squareFeet', value)}
                invalid={!!errors.squareFeet}
                invalidText={errors.squareFeet}
              />

              <NumberInput
                id="year-built"
                label="Year Built"
                min={1800}
                max={new Date().getFullYear()}
                value={formData.yearBuilt}
                onChange={(e, { value }) => handleInputChange('yearBuilt', value)}
                invalid={!!errors.yearBuilt}
                invalidText={errors.yearBuilt}
              />

              <NumberInput
                id="stories"
                label="Number of Stories"
                min={1}
                value={formData.stories}
                onChange={(e, { value }) => handleInputChange('stories', value)}
                invalid={!!errors.stories}
                invalidText={errors.stories}
              />

              <TextInput
                id="parking"
                labelText="Parking (Optional)"
                placeholder="e.g., On-site garage (30 spaces)"
                value={formData.parking}
                onChange={(e) => handleInputChange('parking', e.target.value)}
              />

              <TextInput
                id="occupancy"
                labelText="Occupancy Rate (Optional)"
                placeholder="e.g., 85%"
                value={formData.occupancy}
                onChange={(e) => handleInputChange('occupancy', e.target.value)}
              />
            </Form>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <div className="section-header">
              <Heading className="section-title">Coverage Selection</Heading>
            </div>
            <p className="section-description">Choose your coverage options</p>

            <Form>
              <Dropdown
                id="coverage-limit"
                titleText="Coverage Limit"
                label="Select coverage limit"
                items={coverageLimitOptions}
                itemToString={(item) => item ? item.text : ''}
                selectedItem={coverageLimitOptions.find(c => c.id === formData.coverageLimit)}
                onChange={({ selectedItem }) => handleInputChange('coverageLimit', selectedItem?.id || '')}
                invalid={!!errors.coverageLimit}
                invalidText={errors.coverageLimit}
              />

              <Dropdown
                id="deductible"
                titleText="Deductible"
                label="Select deductible"
                items={deductibleOptions}
                itemToString={(item) => item ? item.text : ''}
                selectedItem={deductibleOptions.find(d => d.id === formData.deductible)}
                onChange={({ selectedItem }) => handleInputChange('deductible', selectedItem?.id || '')}
                invalid={!!errors.deductible}
                invalidText={errors.deductible}
              />

              <DatePicker
                datePickerType="single"
                onChange={(dates) => handleInputChange('inspectionDate', formatDateForInput(dates[0] || ''))}
              >
                <DatePickerInput
                  id="inspection-date"
                  labelText="Initial Inspection Date"
                  placeholder="mm/dd/yyyy"
                />
              </DatePicker>
            </Form>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <div className="section-header">
              <Heading className="section-title">Review & Submit</Heading>
            </div>
            <p className="section-description">Please review the property details before submitting</p>

            <div className="review-section">
              <div className="review-group">
                <h5>Property Information</h5>
                <div className="review-item">
                  <label>Property Name</label>
                  <p>{formData.propertyName}</p>
                </div>
                <div className="review-item">
                  <label>Address</label>
                  <p>{formData.address}, {formData.city}, {formData.state} {formData.zipCode}</p>
                </div>
              </div>

              <div className="review-group">
                <h5>Building Details</h5>
                <div className="review-item">
                  <label>Property Type</label>
                  <p>{propertyTypeOptions.find(p => p.id === formData.propertyType)?.text || 'N/A'}</p>
                </div>
                <div className="review-item">
                  <label>Building Class</label>
                  <p>{buildingClassOptions.find(b => b.id === formData.buildingClass)?.text || 'N/A'}</p>
                </div>
                <div className="review-item">
                  <label>Square Feet</label>
                  <p>{formData.squareFeet?.toLocaleString()} sq ft</p>
                </div>
                <div className="review-item">
                  <label>Year Built</label>
                  <p>{formData.yearBuilt}</p>
                </div>
                <div className="review-item">
                  <label>Stories</label>
                  <p>{formData.stories}</p>
                </div>
              </div>

              <div className="review-group">
                <h5>Coverage</h5>
                <div className="review-item">
                  <label>Coverage Limit</label>
                  <p>{coverageLimitOptions.find(c => c.id === formData.coverageLimit)?.text || 'N/A'}</p>
                </div>
                <div className="review-item">
                  <label>Deductible</label>
                  <p>{deductibleOptions.find(d => d.id === formData.deductible)?.text || 'N/A'}</p>
                </div>
              </div>
            </div>

            <InlineNotification
              kind="info"
              title="Next Steps"
              subtitle="After submission, we'll schedule an inspection and finalize your policy within 5 business days."
              hideCloseButton
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Grid fullWidth className="add-property-page">
      {/* Header Banner */}
      <Column lg={16} md={8} sm={4} className="header-banner-section">
        <div className="header-banner">
          <Heading className="banner-title">Add New Property</Heading>
          <p className="banner-subtitle">Add a commercial property to your insurance portfolio in just a few steps</p>
        </div>
      </Column>

      {/* Progress Indicator */}
      <Column lg={16} md={8} sm={4} className="progress-section">
        <StepBreadcrumb steps={updatedSteps} />
      </Column>

      {/* Step Content */}
      <Column lg={12} lgOffset={2} md={8} sm={4}>
        <Tile className="form-tile">
          {renderStepContent()}
        </Tile>
      </Column>

      {/* Navigation Buttons */}
      <Column lg={12} lgOffset={2} md={8} sm={4}>
        <div className="navigation-buttons">
          <Button
            kind="secondary"
            renderIcon={ArrowLeft}
            onClick={handleBack}
            disabled={currentStep === 0}
          >
            Back
          </Button>

          <div className="right-buttons">
            <Button
              kind="ghost"
              onClick={() => navigate('/business/properties')}
            >
              Cancel
            </Button>

            {currentStep < steps.length - 1 ? (
              <Button
                kind="primary"
                renderIcon={ArrowRight}
                onClick={handleNext}
              >
                Next
              </Button>
            ) : (
              <Button
                kind="primary"
                renderIcon={Checkmark}
                onClick={handleSubmit}
              >
                Add Property
              </Button>
            )}
          </div>
        </div>
      </Column>
    </Grid>
  );
}
