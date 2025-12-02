import React, { useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Heading,
  Stack,
} from '@carbon/react';
import { Checkmark, ArrowRight } from '@carbon/icons-react';
import './SignUpConfirmationPage.scss';

export default function SignUpConfirmationPage() {
  const navigate = useNavigate();
  const location = useLocation();
  const confirmationNumber = location.state?.confirmationNumber;

  useEffect(() => {
    if (!confirmationNumber) {
      navigate('/signup');
    }
  }, [confirmationNumber, navigate]);

  const handleGoToDashboard = () => {
    navigate('/dashboard');
  };

  if (!confirmationNumber) {
    return null;
  }

  return (
    <Grid className="confirmation-page">
      <Column sm={4} md={8} lg={{ span: 8, offset: 4 }} xlg={{ span: 6, offset: 5 }}>
        <div className="confirmation-container">
          <Tile className="confirmation-card">
            <div className="confirmation-icon">
              <div className="confirmation-icon-circle">
                <Checkmark size={48} />
              </div>
            </div>

            <Stack gap={6} className="confirmation-content">
              <div className="confirmation-header">
                <Heading className="confirmation-title">
                  Application Submitted Successfully!
                </Heading>
                <p className="confirmation-subtitle">
                  Thank you for choosing InsureCo
                </p>
              </div>

              <Tile className="confirmation-number-card">
                <p className="confirmation-number-label">Your Confirmation Number</p>
                <div className="confirmation-number">
                  {confirmationNumber}
                </div>
                <p className="confirmation-number-note">
                  Please save this number for your records
                </p>
              </Tile>

              <div className="confirmation-message">
                <p className="confirmation-text">
                  We've sent a confirmation email to the address you provided with detailed 
                  information about your application and next steps.
                </p>
                <p className="confirmation-text">
                  <strong>What happens next?</strong>
                </p>
                <ul className="confirmation-list">
                  <li>Check your email for confirmation and additional details</li>
                  <li>Our team will review your application within 1-2 business days</li>
                  <li>You'll receive your quote and policy options via email</li>
                  <li>Track your application status in your dashboard</li>
                </ul>
              </div>

              <div className="confirmation-actions">
                <Button
                  kind="primary"
                  onClick={handleGoToDashboard}
                  renderIcon={ArrowRight}
                  iconDescription="Go to dashboard"
                >
                  Go to Dashboard
                </Button>
              </div>
            </Stack>
          </Tile>
        </div>
      </Column>
    </Grid>
  );
}
