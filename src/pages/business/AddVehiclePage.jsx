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
  Dropdown,
  NumberInput,
  Select,
  SelectItem,
  Form,
  InlineNotification,
} from '@carbon/react';
import { ArrowLeft, ArrowRight, Checkmark, CarFront } from '@carbon/icons-react';
import StepBreadcrumb from '../../components/StepBreadcrumb';
import './AddVehiclePage.scss';

/**
 * AddVehiclePage - Multi-step vehicle addition process
 * Step 1: Vehicle Information
 * Step 2: Assignment Details
 * Step 3: Coverage Selection
 * Step 4: Review & Submit
 */
export default function AddVehiclePage() {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    // Step 1: Vehicle Information
    make: '',
    model: '',
    year: '',
    vin: '',
    licensePlate: '',
    vehicleType: '',
    currentMileage: '',
    
    // Step 2: Assignment
    assignedDriver: '',
    department: '',
    
    // Step 3: Coverage
    coverageType: 'Commercial Auto',
    coverageLimit: '',
    deductible: '',
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { label: 'Vehicle Info', status: 'current' },
    { label: 'Assignment', status: 'incomplete' },
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

  const vehicleTypeOptions = [
    { id: 'cargo-van', text: 'Cargo Van' },
    { id: 'pickup-truck', text: 'Pickup Truck' },
    { id: 'heavy-duty-pickup', text: 'Heavy Duty Pickup' },
    { id: 'passenger-van', text: 'Passenger Van' },
    { id: 'compact-van', text: 'Compact Van' },
    { id: 'box-truck', text: 'Box Truck' },
    { id: 'semi-truck', text: 'Semi Truck' },
    { id: 'suv', text: 'SUV' },
    { id: 'cutaway-van', text: 'Cutaway Van' },
    { id: 'other', text: 'Other' },
  ];

  const departmentOptions = [
    { id: 'delivery', text: 'Delivery' },
    { id: 'sales', text: 'Sales' },
    { id: 'field-service', text: 'Field Service' },
    { id: 'maintenance', text: 'Maintenance' },
    { id: 'facilities', text: 'Facilities' },
    { id: 'construction', text: 'Construction' },
    { id: 'logistics', text: 'Logistics' },
    { id: 'executive', text: 'Executive' },
    { id: 'special-services', text: 'Special Services' },
  ];

  const deductibleOptions = [
    { id: '500', text: '$500' },
    { id: '750', text: '$750' },
    { id: '1000', text: '$1,000' },
    { id: '1500', text: '$1,500' },
    { id: '2000', text: '$2,000' },
    { id: '2500', text: '$2,500' },
    { id: '3000', text: '$3,000' },
  ];

  const coverageLimitOptions = [
    { id: '50000', text: '$50,000' },
    { id: '75000', text: '$75,000' },
    { id: '100000', text: '$100,000' },
    { id: '125000', text: '$125,000' },
    { id: '150000', text: '$150,000' },
    { id: '175000', text: '$175,000' },
    { id: '200000', text: '$200,000' },
    { id: '250000', text: '$250,000' },
    { id: '300000', text: '$300,000' },
    { id: '350000', text: '$350,000' },
  ];

  // Generate year options
  const currentYear = new Date().getFullYear();
  const yearOptions = [];
  for (let year = currentYear; year >= 1990; year--) {
    yearOptions.push(year.toString());
  }

  const handleInputChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validateStep = (step) => {
    const newErrors = {};

    if (step === 0) {
      if (!formData.make) newErrors.make = 'Required';
      if (!formData.model) newErrors.model = 'Required';
      if (!formData.year) newErrors.year = 'Required';
      if (!formData.vin) newErrors.vin = 'Required';
      else if (!/^[A-HJ-NPR-Z0-9]{17}$/i.test(formData.vin)) {
        newErrors.vin = 'VIN must be 17 characters (letters and numbers, no I, O, or Q)';
      }
      if (!formData.licensePlate) newErrors.licensePlate = 'Required';
      if (!formData.vehicleType) newErrors.vehicleType = 'Required';
    } else if (step === 1) {
      if (!formData.assignedDriver) newErrors.assignedDriver = 'Required';
      if (!formData.department) newErrors.department = 'Required';
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
    // Generate vehicle ID
    const vehicleId = `VEH-2024-${String(Math.floor(Math.random() * 900) + 100).padStart(3, '0')}`;
    
    console.log('Adding vehicle:', { ...formData, id: vehicleId });
    
    navigate('/business/fleet', {
      state: {
        notification: {
          kind: 'success',
          title: 'Vehicle added successfully',
          subtitle: `${formData.year} ${formData.make} ${formData.model} has been added to your fleet.`,
        },
      },
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <Heading className="step-title">Vehicle Information</Heading>
            <p className="step-description">Enter the basic details about the vehicle.</p>

            <Form>
              <TextInput
                id="make"
                labelText="Make"
                placeholder="e.g., Ford, Chevrolet, Toyota"
                value={formData.make}
                onChange={(e) => handleInputChange('make', e.target.value)}
                invalid={!!errors.make}
                invalidText={errors.make}
              />

              <TextInput
                id="model"
                labelText="Model"
                placeholder="e.g., Transit, Silverado, Tacoma"
                value={formData.model}
                onChange={(e) => handleInputChange('model', e.target.value)}
                invalid={!!errors.model}
                invalidText={errors.model}
              />

              <Select
                id="year"
                labelText="Year"
                value={formData.year}
                onChange={(e) => handleInputChange('year', e.target.value)}
                invalid={!!errors.year}
                invalidText={errors.year}
              >
                <SelectItem value="" text="Select year" />
                {yearOptions.map(year => (
                  <SelectItem key={year} value={year} text={year} />
                ))}
              </Select>

              <TextInput
                id="vin"
                labelText="VIN (Vehicle Identification Number)"
                placeholder="17-character VIN"
                value={formData.vin}
                onChange={(e) => handleInputChange('vin', e.target.value.toUpperCase())}
                invalid={!!errors.vin}
                invalidText={errors.vin}
                helperText="17 characters, no I, O, or Q"
              />

              <TextInput
                id="license-plate"
                labelText="License Plate"
                placeholder="e.g., CA-7ABC123"
                value={formData.licensePlate}
                onChange={(e) => handleInputChange('licensePlate', e.target.value)}
                invalid={!!errors.licensePlate}
                invalidText={errors.licensePlate}
              />

              <Dropdown
                id="vehicle-type"
                titleText="Vehicle Type"
                label="Select vehicle type"
                items={vehicleTypeOptions}
                itemToString={(item) => item ? item.text : ''}
                selectedItem={vehicleTypeOptions.find(v => v.id === formData.vehicleType)}
                onChange={({ selectedItem }) => handleInputChange('vehicleType', selectedItem?.id || '')}
                invalid={!!errors.vehicleType}
                invalidText={errors.vehicleType}
              />

              <NumberInput
                id="current-mileage"
                label="Current Mileage (Optional)"
                min={0}
                value={formData.currentMileage}
                onChange={(e, { value }) => handleInputChange('currentMileage', value)}
              />
            </Form>
          </div>
        );

      case 1:
        return (
          <div className="step-content">
            <Heading className="step-title">Assignment Details</Heading>
            <p className="step-description">Assign the vehicle to a driver and department.</p>

            <Form>
              <TextInput
                id="assigned-driver"
                labelText="Assigned Driver"
                placeholder="e.g., John Smith"
                value={formData.assignedDriver}
                onChange={(e) => handleInputChange('assignedDriver', e.target.value)}
                invalid={!!errors.assignedDriver}
                invalidText={errors.assignedDriver}
              />

              <Dropdown
                id="department"
                titleText="Department"
                label="Select department"
                items={departmentOptions}
                itemToString={(item) => item ? item.text : ''}
                selectedItem={departmentOptions.find(d => d.id === formData.department)}
                onChange={({ selectedItem }) => handleInputChange('department', selectedItem?.id || '')}
                invalid={!!errors.department}
                invalidText={errors.department}
              />
            </Form>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <Heading className="step-title">Coverage Selection</Heading>
            <p className="step-description">Choose your coverage options.</p>

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
            </Form>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <Heading className="step-title">Review & Submit</Heading>
            <p className="step-description">Please review the vehicle details before submitting.</p>

            <div className="review-section">
              <div className="review-group">
                <h5>Vehicle Information</h5>
                <div className="review-item">
                  <label>Vehicle</label>
                  <p>{formData.year} {formData.make} {formData.model}</p>
                </div>
                <div className="review-item">
                  <label>VIN</label>
                  <p>{formData.vin}</p>
                </div>
                <div className="review-item">
                  <label>License Plate</label>
                  <p>{formData.licensePlate}</p>
                </div>
                <div className="review-item">
                  <label>Vehicle Type</label>
                  <p>{vehicleTypeOptions.find(v => v.id === formData.vehicleType)?.text || 'N/A'}</p>
                </div>
                {formData.currentMileage && (
                  <div className="review-item">
                    <label>Current Mileage</label>
                    <p>{formData.currentMileage?.toLocaleString()} miles</p>
                  </div>
                )}
              </div>

              <div className="review-group">
                <h5>Assignment</h5>
                <div className="review-item">
                  <label>Assigned Driver</label>
                  <p>{formData.assignedDriver}</p>
                </div>
                <div className="review-item">
                  <label>Department</label>
                  <p>{departmentOptions.find(d => d.id === formData.department)?.text || 'N/A'}</p>
                </div>
              </div>

              <div className="review-group">
                <h5>Coverage</h5>
                <div className="review-item">
                  <label>Coverage Type</label>
                  <p>{formData.coverageType}</p>
                </div>
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
              subtitle="After submission, we'll review the vehicle information and finalize your policy within 2 business days."
              hideCloseButton
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Grid fullWidth className="add-vehicle-page">
      {/* Breadcrumb Navigation */}
      <Column lg={16} md={8} sm={4} className="breadcrumb-section">
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem href="/business/dashboard">Business Dashboard</BreadcrumbItem>
          <BreadcrumbItem href="/business/fleet">Fleet</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Add Vehicle</BreadcrumbItem>
        </Breadcrumb>
      </Column>

      {/* Header */}
      <Column lg={16} md={8} sm={4} className="page-header">
        <div className="header-content">
          <CarFront size={32} className="page-icon" />
          <div>
            <Heading className="page-title">Add New Vehicle</Heading>
            <p className="page-subtitle">Add a commercial vehicle to your fleet</p>
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
              onClick={() => navigate('/business/fleet')}
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
                Add Vehicle
              </Button>
            )}
          </div>
        </div>
      </Column>
    </Grid>
  );
}
