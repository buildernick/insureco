import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Heading,
} from '@carbon/react';
import { ArrowLeft, DocumentAdd } from '@carbon/icons-react';
import './SignUpComingSoon.scss';

/**
 * SignUpComingSoon - Placeholder page for sign-up flow
 * Shown while the sign-up feature is being built
 */
export default function SignUpComingSoon() {
  const navigate = useNavigate();

  return (
    <Grid fullWidth className="signup-coming-soon">
      <Column lg={16} md={8} sm={4}>
        <div className="coming-soon-container">
          <Tile className="coming-soon-tile">
            <div className="coming-soon-icon">
              <DocumentAdd size={64} />
            </div>
            
            <Heading className="coming-soon-title">
              Sign Up
            </Heading>
            
            <p className="coming-soon-subtitle">
              This feature is currently under development
            </p>
            
            <p className="coming-soon-description">
              We're building a seamless multi-step sign-up experience to help you get started with InsureCo. 
              Check back soon!
            </p>

            <div className="coming-soon-features">
              <h4>Coming Soon:</h4>
              <ul>
                <li>Simple multi-step registration process</li>
                <li>Car and home insurance options</li>
                <li>Mobile-optimized experience</li>
                <li>Instant quote generation</li>
                <li>Secure account creation</li>
              </ul>
            </div>

            <div className="coming-soon-actions">
              <Button
                kind="primary"
                renderIcon={ArrowLeft}
                onClick={() => navigate('/')}
              >
                Back to Home
              </Button>
            </div>
          </Tile>
        </div>
      </Column>
    </Grid>
  );
}
