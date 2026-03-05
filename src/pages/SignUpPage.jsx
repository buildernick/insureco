import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Button, TextInput, Grid, Column } from '@carbon/react';
import { ArrowRight, ArrowLeft } from '@carbon/icons-react';
import StepBreadcrumb from '../components/StepBreadcrumb';
import './SignUpPage.scss';

const STEPS = [
  { label: 'Personal Info', key: 'personal' },
  { label: 'Address', key: 'address' },
  { label: 'Insurance', key: 'insurance' },
  { label: 'Coverage', key: 'coverage' },
];

export default function SignUpPage() {
  const navigate = useNavigate();

  return (
    <div className="signup-page">
      <Grid fullWidth>
        <Column lg={8} md={6} sm={4} lgOffset={4} mdOffset={1}>
          <div className="signup-page__card">
            {/* Hero banner */}
            <div className="signup-page__banner">
              <h1 className="signup-page__banner-title">Sign Up for InsureCo</h1>
              <p className="signup-page__banner-subtitle">
                Get started with your insurance coverage in just a few steps
              </p>
            </div>

            {/* Progress */}
            <div className="signup-page__progress">
              <StepBreadcrumb steps={STEPS} currentIndex={0} />
            </div>

            {/* Form */}
            <div className="signup-page__form-body">
              <div className="signup-page__section-header">
                <h2 className="signup-page__section-title">Personal Information</h2>
                <div className="signup-page__divider" />
              </div>
              <p className="signup-page__section-desc">
                Let's start with some basic information about you.
              </p>

              <div className="signup-page__fields">
                <TextInput
                  id="page-first-name"
                  labelText="First Name"
                  placeholder="Enter your first name"
                  size="lg"
                />
                <TextInput
                  id="page-last-name"
                  labelText="Last Name"
                  placeholder="Enter your last name"
                  size="lg"
                />
                <TextInput
                  id="page-email"
                  labelText="Email Address"
                  placeholder="your.email@example.com"
                  type="email"
                  size="lg"
                />
                <TextInput
                  id="page-phone"
                  labelText="Phone Number"
                  placeholder="(555) 123-4567"
                  type="tel"
                  size="lg"
                />
                <TextInput
                  id="page-dob"
                  labelText="Date of Birth"
                  placeholder="mm/dd/yyyy"
                  type="date"
                  size="lg"
                />
              </div>

              {/* Actions */}
              <div className="signup-page__actions">
                <Button
                  kind="ghost"
                  size="lg"
                  renderIcon={ArrowLeft}
                  onClick={() => navigate('/')}
                  className="signup-page__back-btn"
                >
                  Back
                </Button>
                <Button
                  kind="primary"
                  size="lg"
                  renderIcon={ArrowRight}
                  className="signup-page__next-btn"
                >
                  Next
                </Button>
              </div>
            </div>
          </div>
        </Column>
      </Grid>
    </div>
  );
}
