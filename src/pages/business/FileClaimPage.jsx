import React, { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
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
  DatePicker,
  DatePickerInput,
  FileUploader,
  RadioButtonGroup,
  RadioButton,
  Form,
  InlineNotification,
} from '@carbon/react';
import { ArrowLeft, ArrowRight, Checkmark, DocumentAdd } from '@carbon/icons-react';
import StepBreadcrumb from '../../components/StepBreadcrumb';
import { mockProperties, mockVehicles } from '../../data/businessMockData';
import { formatVehicleName, formatDateForInput } from '../../utils/businessHelpers';
import './FileClaimPage.scss';

/**
 * FileClaimPage - Multi-step claim filing process
 * Step 1: Select Asset
 * Step 2: Claim Details
 * Step 3: Incident Information
 * Step 4: Review & Submit
 */
export default function FileClaimPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    assetType: location.state?.assetType || '',
    assetId: location.state?.assetId || '',
    claimType: '',
    incidentDate: '',
    incidentTime: '',
    incidentLocation: '',
    description: '',
    policeReportFiled: '',
    policeReportNumber: '',
    witnessName: '',
    witnessContact: '',
    estimatedDamage: '',
    files: [],
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { label: 'Select Asset', status: 'current' },
    { label: 'Claim Details', status: 'incomplete' },
    { label: 'Incident Info', status: 'incomplete' },
    { label: 'Review', status: 'incomplete' },
  ];

  // Update step status based on current step
  const getStepStatus = (index) => {
    if (index < currentStep) return 'complete';
    if (index === currentStep) return 'current';
    return 'incomplete';
  };

  const updatedSteps = steps.map((step, index) => ({
    ...step,
    status: getStepStatus(index),
  }));

  // Prepare asset options
  const propertyOptions = mockProperties.map(p => ({
    id: p.id,
    text: `${p.name} (${p.id})`,
  }));

  const vehicleOptions = mockVehicles.map(v => ({
    id: v.id,
    text: `${formatVehicleName(v)} - ${v.licensePlate} (${v.id})`,
  }));

  const claimTypeOptions = [
    { id: 'collision', text: 'Collision' },
    { id: 'theft', text: 'Theft' },
    { id: 'vandalism', text: 'Vandalism' },
    { id: 'fire', text: 'Fire' },
    { id: 'water-damage', text: 'Water Damage' },
    { id: 'weather-damage', text: 'Weather Damage' },
    { id: 'equipment-breakdown', text: 'Equipment Breakdown' },
    { id: 'windshield', text: 'Windshield' },
    { id: 'other', text: 'Other' },
  ];

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    // Clear error for this field
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.assetType) newErrors.assetType = 'Please select an asset type';
      if (!formData.assetId) newErrors.assetId = 'Please select an asset';
    } else if (step === 1) {
      if (!formData.claimType) newErrors.claimType = 'Please select a claim type';
      if (!formData.incidentDate) newErrors.incidentDate = 'Please provide incident date';
      if (!formData.incidentLocation) newErrors.incidentLocation = 'Please provide incident location';
    } else if (step === 2) {
      if (!formData.description || formData.description.length < 20) {
        newErrors.description = 'Please provide a detailed description (at least 20 characters)';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleNext = () => {
    if (validateStep(currentStep)) {
      setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
    }
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const handleSubmit = () => {
    // In real app, submit to API
    console.log('Submitting claim:', formData);
    
    // Navigate to success page or dashboard
    navigate('/business/dashboard', {
      state: {
        notification: {
          kind: 'success',
          title: 'Claim filed successfully',
          subtitle: 'Your claim has been submitted and is being reviewed.',
        },
      },
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <Heading className="step-title">Select Asset</Heading>
            <p className="step-description">Choose the property or vehicle for which you're filing a claim.</p>

            <Form>
              <RadioButtonGroup
                legendText="Asset Type"
                name="assetType"
                valueSelected={formData.assetType}
                onChange={(value) => {
                  handleInputChange('assetType', value);
                  handleInputChange('assetId', ''); // Reset asset selection
                }}
                invalid={!!errors.assetType}
                invalidText={errors.assetType}
              >
                <RadioButton labelText="Property" value="property" id="asset-property" />
                <RadioButton labelText="Vehicle" value="vehicle" id="asset-vehicle" />
              </RadioButtonGroup>

              {formData.assetType === 'property' && (
                <Dropdown
                  id="property-select"
                  titleText="Select Property"
                  label="Choose a property"
                  items={propertyOptions}
                  itemToString={(item) => item ? item.text : ''}
                  selectedItem={propertyOptions.find(p => p.id === formData.assetId)}
                  onChange={({ selectedItem }) => handleInputChange('assetId', selectedItem?.id || '')}
                  invalid={!!errors.assetId}
                  invalidText={errors.assetId}
                />
              )}

              {formData.assetType === 'vehicle' && (
                <Dropdown
                  id="vehicle-select"
                  titleText="Select Vehicle"
                  label="Choose a vehicle"
                  items={vehicleOptions}
                  itemToString={(item) => item ? item.text : ''}
                  selectedItem={vehicleOptions.find(v => v.id === formData.assetId)}
                  onChange={({ selectedItem }) => handleInputChange('assetId', selectedItem?.id || '')}
                  invalid={!!errors.assetId}
                  invalidText={errors.assetId}
                />
              )}
            </Form>
          </div>
        );

      case 1:
        return (
          <div className="step-content">
            <Heading className="step-title">Claim Details</Heading>
            <p className="step-description">Provide basic information about the claim.</p>

            <Form>
              <Dropdown
                id="claim-type"
                titleText="Claim Type"
                label="Select claim type"
                items={claimTypeOptions}
                itemToString={(item) => item ? item.text : ''}
                selectedItem={claimTypeOptions.find(c => c.id === formData.claimType)}
                onChange={({ selectedItem }) => handleInputChange('claimType', selectedItem?.id || '')}
                invalid={!!errors.claimType}
                invalidText={errors.claimType}
              />

              <DatePicker
                datePickerType="single"
                onChange={(dates) => handleInputChange('incidentDate', formatDateForInput(dates[0] || ''))}
              >
                <DatePickerInput
                  id="incident-date"
                  labelText="Incident Date"
                  placeholder="mm/dd/yyyy"
                  invalid={!!errors.incidentDate}
                  invalidText={errors.incidentDate}
                />
              </DatePicker>

              <TextInput
                id="incident-time"
                labelText="Incident Time (Optional)"
                placeholder="e.g., 3:30 PM"
                value={formData.incidentTime}
                onChange={(e) => handleInputChange('incidentTime', e.target.value)}
              />

              <TextInput
                id="incident-location"
                labelText="Incident Location"
                placeholder="e.g., 123 Main St, San Francisco, CA"
                value={formData.incidentLocation}
                onChange={(e) => handleInputChange('incidentLocation', e.target.value)}
                invalid={!!errors.incidentLocation}
                invalidText={errors.incidentLocation}
              />

              <TextInput
                id="estimated-damage"
                labelText="Estimated Damage Amount (Optional)"
                placeholder="e.g., 5000"
                value={formData.estimatedDamage}
                onChange={(e) => handleInputChange('estimatedDamage', e.target.value)}
              />
            </Form>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <Heading className="step-title">Incident Information</Heading>
            <p className="step-description">Provide detailed information about what happened.</p>

            <Form>
              <TextArea
                id="description"
                labelText="Description of Incident"
                placeholder="Describe what happened in detail..."
                rows={6}
                value={formData.description}
                onChange={(e) => handleInputChange('description', e.target.value)}
                invalid={!!errors.description}
                invalidText={errors.description}
                helperText="Please provide as much detail as possible (minimum 20 characters)"
              />

              <RadioButtonGroup
                legendText="Was a police report filed?"
                name="policeReportFiled"
                valueSelected={formData.policeReportFiled}
                onChange={(value) => handleInputChange('policeReportFiled', value)}
              >
                <RadioButton labelText="Yes" value="yes" id="police-yes" />
                <RadioButton labelText="No" value="no" id="police-no" />
              </RadioButtonGroup>

              {formData.policeReportFiled === 'yes' && (
                <TextInput
                  id="police-report-number"
                  labelText="Police Report Number"
                  placeholder="e.g., PR-2024-12345"
                  value={formData.policeReportNumber}
                  onChange={(e) => handleInputChange('policeReportNumber', e.target.value)}
                />
              )}

              <TextInput
                id="witness-name"
                labelText="Witness Name (Optional)"
                placeholder="e.g., John Smith"
                value={formData.witnessName}
                onChange={(e) => handleInputChange('witnessName', e.target.value)}
              />

              <TextInput
                id="witness-contact"
                labelText="Witness Contact (Optional)"
                placeholder="e.g., phone or email"
                value={formData.witnessContact}
                onChange={(e) => handleInputChange('witnessContact', e.target.value)}
              />

              <FileUploader
                labelTitle="Upload Supporting Documents"
                labelDescription="Upload photos, receipts, or other supporting documents (max 5MB each)"
                buttonLabel="Add files"
                accept={['.jpg', '.jpeg', '.png', '.pdf']}
                multiple
                filenameStatus="edit"
              />
            </Form>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <Heading className="step-title">Review & Submit</Heading>
            <p className="step-description">Please review your claim information before submitting.</p>

            <div className="review-section">
              <div className="review-group">
                <h5>Asset Information</h5>
                <div className="review-item">
                  <label>Asset Type</label>
                  <p>{formData.assetType === 'property' ? 'Property' : 'Vehicle'}</p>
                </div>
                <div className="review-item">
                  <label>Asset ID</label>
                  <p>{formData.assetId}</p>
                </div>
              </div>

              <div className="review-group">
                <h5>Claim Details</h5>
                <div className="review-item">
                  <label>Claim Type</label>
                  <p>{claimTypeOptions.find(c => c.id === formData.claimType)?.text || 'N/A'}</p>
                </div>
                <div className="review-item">
                  <label>Incident Date</label>
                  <p>{formData.incidentDate ? new Date(formData.incidentDate).toLocaleDateString() : 'N/A'}</p>
                </div>
                <div className="review-item">
                  <label>Incident Location</label>
                  <p>{formData.incidentLocation || 'N/A'}</p>
                </div>
                {formData.estimatedDamage && (
                  <div className="review-item">
                    <label>Estimated Damage</label>
                    <p>${formData.estimatedDamage}</p>
                  </div>
                )}
              </div>

              <div className="review-group">
                <h5>Incident Information</h5>
                <div className="review-item">
                  <label>Description</label>
                  <p>{formData.description || 'N/A'}</p>
                </div>
                <div className="review-item">
                  <label>Police Report Filed</label>
                  <p>{formData.policeReportFiled === 'yes' ? 'Yes' : 'No'}</p>
                </div>
                {formData.policeReportFiled === 'yes' && formData.policeReportNumber && (
                  <div className="review-item">
                    <label>Police Report Number</label>
                    <p>{formData.policeReportNumber}</p>
                  </div>
                )}
              </div>
            </div>

            <InlineNotification
              kind="info"
              title="Next Steps"
              subtitle="After submission, an adjuster will review your claim and contact you within 2 business days."
              hideCloseButton
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Grid fullWidth className="file-claim-page">
      {/* Breadcrumb Navigation */}
      <Column lg={16} md={8} sm={4} className="breadcrumb-section">
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem href="/business/dashboard">Business Dashboard</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>File a Claim</BreadcrumbItem>
        </Breadcrumb>
      </Column>

      {/* Header */}
      <Column lg={16} md={8} sm={4} className="page-header">
        <div className="header-content">
          <DocumentAdd size={32} className="page-icon" />
          <div>
            <Heading className="page-title">File a Claim</Heading>
            <p className="page-subtitle">Submit a new insurance claim for property or vehicle damage</p>
          </div>
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
              onClick={() => navigate('/business/dashboard')}
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
                Submit Claim
              </Button>
            )}
          </div>
        </div>
      </Column>
    </Grid>
  );
}
