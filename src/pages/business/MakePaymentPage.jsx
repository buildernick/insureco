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
  Dropdown,
  RadioButtonGroup,
  RadioButton,
  Form,
  InlineNotification,
  Checkbox,
} from '@carbon/react';
import { ArrowLeft, ArrowRight, Checkmark, Wallet } from '@carbon/icons-react';
import StepBreadcrumb from '../../components/StepBreadcrumb';
import { mockProperties, mockVehicles } from '../../data/businessMockData';
import { formatCurrency, formatVehicleName } from '../../utils/businessHelpers';
import './MakePaymentPage.scss';

/**
 * MakePaymentPage - Multi-step payment process
 * Step 1: Payment Type & Asset
 * Step 2: Payment Amount
 * Step 3: Payment Method
 * Step 4: Review & Submit
 */
export default function MakePaymentPage() {
  const navigate = useNavigate();
  const location = useLocation();
  
  const [currentStep, setCurrentStep] = useState(0);
  const [formData, setFormData] = useState({
    paymentType: '',
    assetType: '',
    assetId: location.state?.assetId || '',
    amount: '',
    paymentMethod: '',
    // Credit Card fields
    cardNumber: '',
    cardName: '',
    expiryDate: '',
    cvv: '',
    // ACH fields
    accountType: '',
    routingNumber: '',
    accountNumber: '',
    accountName: '',
    // Save for future
    savePaymentMethod: false,
  });

  const [errors, setErrors] = useState({});

  const steps = [
    { label: 'Payment Type', status: 'current' },
    { label: 'Amount', status: 'incomplete' },
    { label: 'Payment Method', status: 'incomplete' },
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

  // Prepare asset options
  const propertyOptions = mockProperties.map(p => ({
    id: p.id,
    text: `${p.name} (${p.id})`,
    premium: p.monthlyPremium,
  }));

  const vehicleOptions = mockVehicles.map(v => ({
    id: v.id,
    text: `${formatVehicleName(v)} - ${v.licensePlate} (${v.id})`,
    premium: v.monthlyPremium,
  }));

  const paymentTypeOptions = [
    { id: 'monthly-premium', text: 'Monthly Premium' },
    { id: 'deductible', text: 'Deductible Payment' },
    { id: 'additional-premium', text: 'Additional Premium' },
    { id: 'other', text: 'Other Payment' },
  ];

  const paymentMethodOptions = [
    { id: 'credit-card', text: 'Credit Card' },
    { id: 'ach', text: 'ACH/Bank Transfer' },
    { id: 'check', text: 'Check' },
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
      if (!formData.paymentType) newErrors.paymentType = 'Please select a payment type';
      if (formData.paymentType !== 'other' && !formData.assetType) {
        newErrors.assetType = 'Please select an asset type';
      }
      if (formData.paymentType !== 'other' && !formData.assetId) {
        newErrors.assetId = 'Please select an asset';
      }
    } else if (step === 1) {
      if (!formData.amount || parseFloat(formData.amount) <= 0) {
        newErrors.amount = 'Please enter a valid payment amount';
      }
    } else if (step === 2) {
      if (!formData.paymentMethod) newErrors.paymentMethod = 'Please select a payment method';

      if (formData.paymentMethod === 'credit-card') {
        if (!formData.cardNumber || formData.cardNumber.replace(/\s/g, '').length !== 16) {
          newErrors.cardNumber = 'Please enter a valid 16-digit card number';
        }
        if (!formData.cardName) newErrors.cardName = 'Please enter cardholder name';
        if (!formData.expiryDate || !/^\d{2}\/\d{2}$/.test(formData.expiryDate)) {
          newErrors.expiryDate = 'Please enter expiry date (MM/YY)';
        }
        if (!formData.cvv || formData.cvv.length < 3) {
          newErrors.cvv = 'Please enter CVV';
        }
      } else if (formData.paymentMethod === 'ach') {
        if (!formData.accountType) newErrors.accountType = 'Please select account type';
        if (!formData.routingNumber || formData.routingNumber.length !== 9) {
          newErrors.routingNumber = 'Please enter 9-digit routing number';
        }
        if (!formData.accountNumber) newErrors.accountNumber = 'Please enter account number';
        if (!formData.accountName) newErrors.accountName = 'Please enter account holder name';
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
    console.log('Submitting payment:', formData);
    
    navigate('/business/dashboard', {
      state: {
        notification: {
          kind: 'success',
          title: 'Payment processed successfully',
          subtitle: `Your payment of ${formatCurrency(parseFloat(formData.amount))} has been processed.`,
        },
      },
    });
  };

  const renderStepContent = () => {
    switch (currentStep) {
      case 0:
        return (
          <div className="step-content">
            <Heading className="step-title">Payment Type</Heading>
            <p className="step-description">Select what you're paying for.</p>

            <Form>
              <Dropdown
                id="payment-type"
                titleText="Payment Type"
                label="Select payment type"
                items={paymentTypeOptions}
                itemToString={(item) => item ? item.text : ''}
                selectedItem={paymentTypeOptions.find(p => p.id === formData.paymentType)}
                onChange={({ selectedItem }) => {
                  handleInputChange('paymentType', selectedItem?.id || '');
                  handleInputChange('amount', ''); // Reset amount
                }}
                invalid={!!errors.paymentType}
                invalidText={errors.paymentType}
              />

              {formData.paymentType && formData.paymentType !== 'other' && (
                <>
                  <RadioButtonGroup
                    legendText="Asset Type"
                    name="assetType"
                    valueSelected={formData.assetType}
                    onChange={(value) => {
                      handleInputChange('assetType', value);
                      handleInputChange('assetId', '');
                      handleInputChange('amount', '');
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
                      onChange={({ selectedItem }) => {
                        handleInputChange('assetId', selectedItem?.id || '');
                        if (formData.paymentType === 'monthly-premium' && selectedItem) {
                          handleInputChange('amount', selectedItem.premium.toString());
                        }
                      }}
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
                      onChange={({ selectedItem }) => {
                        handleInputChange('assetId', selectedItem?.id || '');
                        if (formData.paymentType === 'monthly-premium' && selectedItem) {
                          handleInputChange('amount', selectedItem.premium.toString());
                        }
                      }}
                      invalid={!!errors.assetId}
                      invalidText={errors.assetId}
                    />
                  )}
                </>
              )}
            </Form>
          </div>
        );

      case 1:
        return (
          <div className="step-content">
            <Heading className="step-title">Payment Amount</Heading>
            <p className="step-description">Enter the amount you wish to pay.</p>

            <Form>
              <TextInput
                id="payment-amount"
                labelText="Payment Amount"
                placeholder="0.00"
                value={formData.amount}
                onChange={(e) => handleInputChange('amount', e.target.value)}
                invalid={!!errors.amount}
                invalidText={errors.amount}
                disabled={formData.paymentType === 'monthly-premium' && formData.assetId}
              />

              {formData.paymentType === 'monthly-premium' && formData.amount && (
                <InlineNotification
                  kind="info"
                  title="Monthly Premium Payment"
                  subtitle={`You're paying your monthly premium of ${formatCurrency(parseFloat(formData.amount))}.`}
                  hideCloseButton
                  lowContrast
                />
              )}
            </Form>
          </div>
        );

      case 2:
        return (
          <div className="step-content">
            <Heading className="step-title">Payment Method</Heading>
            <p className="step-description">Choose how you'd like to pay.</p>

            <Form>
              <RadioButtonGroup
                legendText="Payment Method"
                name="paymentMethod"
                valueSelected={formData.paymentMethod}
                onChange={(value) => handleInputChange('paymentMethod', value)}
                invalid={!!errors.paymentMethod}
                invalidText={errors.paymentMethod}
              >
                <RadioButton labelText="Credit Card" value="credit-card" id="method-cc" />
                <RadioButton labelText="ACH / Bank Transfer" value="ach" id="method-ach" />
                <RadioButton labelText="Check (Mail-in)" value="check" id="method-check" />
              </RadioButtonGroup>

              {formData.paymentMethod === 'credit-card' && (
                <div className="payment-method-fields">
                  <TextInput
                    id="card-number"
                    labelText="Card Number"
                    placeholder="1234 5678 9012 3456"
                    value={formData.cardNumber}
                    onChange={(e) => handleInputChange('cardNumber', e.target.value)}
                    invalid={!!errors.cardNumber}
                    invalidText={errors.cardNumber}
                  />

                  <TextInput
                    id="card-name"
                    labelText="Cardholder Name"
                    placeholder="Name on card"
                    value={formData.cardName}
                    onChange={(e) => handleInputChange('cardName', e.target.value)}
                    invalid={!!errors.cardName}
                    invalidText={errors.cardName}
                  />

                  <div className="card-details-grid">
                    <TextInput
                      id="expiry-date"
                      labelText="Expiry Date"
                      placeholder="MM/YY"
                      value={formData.expiryDate}
                      onChange={(e) => handleInputChange('expiryDate', e.target.value)}
                      invalid={!!errors.expiryDate}
                      invalidText={errors.expiryDate}
                    />

                    <TextInput
                      id="cvv"
                      labelText="CVV"
                      placeholder="123"
                      type="password"
                      value={formData.cvv}
                      onChange={(e) => handleInputChange('cvv', e.target.value)}
                      invalid={!!errors.cvv}
                      invalidText={errors.cvv}
                    />
                  </div>

                  <Checkbox
                    id="save-card"
                    labelText="Save this card for future payments"
                    checked={formData.savePaymentMethod}
                    onChange={(e) => handleInputChange('savePaymentMethod', e.target.checked)}
                  />
                </div>
              )}

              {formData.paymentMethod === 'ach' && (
                <div className="payment-method-fields">
                  <RadioButtonGroup
                    legendText="Account Type"
                    name="accountType"
                    valueSelected={formData.accountType}
                    onChange={(value) => handleInputChange('accountType', value)}
                    invalid={!!errors.accountType}
                    invalidText={errors.accountType}
                  >
                    <RadioButton labelText="Checking" value="checking" id="acct-checking" />
                    <RadioButton labelText="Savings" value="savings" id="acct-savings" />
                  </RadioButtonGroup>

                  <TextInput
                    id="routing-number"
                    labelText="Routing Number"
                    placeholder="9-digit routing number"
                    value={formData.routingNumber}
                    onChange={(e) => handleInputChange('routingNumber', e.target.value)}
                    invalid={!!errors.routingNumber}
                    invalidText={errors.routingNumber}
                  />

                  <TextInput
                    id="account-number"
                    labelText="Account Number"
                    placeholder="Account number"
                    value={formData.accountNumber}
                    onChange={(e) => handleInputChange('accountNumber', e.target.value)}
                    invalid={!!errors.accountNumber}
                    invalidText={errors.accountNumber}
                  />

                  <TextInput
                    id="account-name"
                    labelText="Account Holder Name"
                    placeholder="Name on account"
                    value={formData.accountName}
                    onChange={(e) => handleInputChange('accountName', e.target.value)}
                    invalid={!!errors.accountName}
                    invalidText={errors.accountName}
                  />

                  <Checkbox
                    id="save-account"
                    labelText="Save this account for future payments"
                    checked={formData.savePaymentMethod}
                    onChange={(e) => handleInputChange('savePaymentMethod', e.target.checked)}
                  />
                </div>
              )}

              {formData.paymentMethod === 'check' && (
                <InlineNotification
                  kind="info"
                  title="Mail-in Check Instructions"
                  subtitle="Please make checks payable to 'InsureCo Business Insurance' and mail to: PO Box 12345, San Francisco, CA 94102"
                  hideCloseButton
                  lowContrast
                />
              )}
            </Form>
          </div>
        );

      case 3:
        return (
          <div className="step-content">
            <Heading className="step-title">Review & Submit</Heading>
            <p className="step-description">Please review your payment details before submitting.</p>

            <div className="review-section">
              <div className="review-group">
                <h5>Payment Information</h5>
                <div className="review-item">
                  <label>Payment Type</label>
                  <p>{paymentTypeOptions.find(p => p.id === formData.paymentType)?.text || 'N/A'}</p>
                </div>
                {formData.assetId && (
                  <div className="review-item">
                    <label>Asset</label>
                    <p>{formData.assetId}</p>
                  </div>
                )}
                <div className="review-item">
                  <label>Amount</label>
                  <p className="amount-highlight">{formatCurrency(parseFloat(formData.amount) || 0)}</p>
                </div>
              </div>

              <div className="review-group">
                <h5>Payment Method</h5>
                <div className="review-item">
                  <label>Method</label>
                  <p>{paymentMethodOptions.find(p => p.id === formData.paymentMethod)?.text || 'N/A'}</p>
                </div>
                {formData.paymentMethod === 'credit-card' && (
                  <>
                    <div className="review-item">
                      <label>Card Number</label>
                      <p>**** **** **** {formData.cardNumber.slice(-4)}</p>
                    </div>
                    <div className="review-item">
                      <label>Cardholder</label>
                      <p>{formData.cardName}</p>
                    </div>
                  </>
                )}
                {formData.paymentMethod === 'ach' && (
                  <>
                    <div className="review-item">
                      <label>Account Type</label>
                      <p>{formData.accountType === 'checking' ? 'Checking' : 'Savings'}</p>
                    </div>
                    <div className="review-item">
                      <label>Account</label>
                      <p>****{formData.accountNumber.slice(-4)}</p>
                    </div>
                  </>
                )}
              </div>
            </div>

            <InlineNotification
              kind="info"
              title="Secure Payment"
              subtitle="Your payment information is encrypted and secure. You will receive a confirmation email once the payment is processed."
              hideCloseButton
            />
          </div>
        );

      default:
        return null;
    }
  };

  return (
    <Grid fullWidth className="make-payment-page">
      {/* Breadcrumb Navigation */}
      <Column lg={16} md={8} sm={4} className="breadcrumb-section">
        <Breadcrumb noTrailingSlash>
          <BreadcrumbItem href="/business/dashboard">Business Dashboard</BreadcrumbItem>
          <BreadcrumbItem isCurrentPage>Make a Payment</BreadcrumbItem>
        </Breadcrumb>
      </Column>

      {/* Header */}
      <Column lg={16} md={8} sm={4} className="page-header">
        <div className="header-content">
          <Wallet size={32} className="page-icon" />
          <div>
            <Heading className="page-title">Make a Payment</Heading>
            <p className="page-subtitle">Pay your premiums, deductibles, or other insurance-related charges</p>
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
                Submit Payment
              </Button>
            )}
          </div>
        </div>
      </Column>
    </Grid>
  );
}
