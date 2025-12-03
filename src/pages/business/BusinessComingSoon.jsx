import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Heading,
} from '@carbon/react';
import { ArrowLeft, Development } from '@carbon/icons-react';
import './BusinessComingSoon.scss';

/**
 * BusinessComingSoon - Placeholder page for business routes
 * Shown while business features are under development
 */
export default function BusinessComingSoon() {
  const navigate = useNavigate();
  const location = useLocation();

  // Get page title from route
  const getPageTitle = () => {
    const path = location.pathname;
    if (path.includes('/properties')) return 'Properties';
    if (path.includes('/fleet')) return 'Fleet';
    if (path.includes('/map')) return 'Map View';
    if (path.includes('/file-claim')) return 'File a Claim';
    if (path.includes('/make-payment')) return 'Make a Payment';
    if (path.includes('/claims')) return 'Claims';
    if (path.includes('/payments')) return 'Payments';
    return 'Business Insurance';
  };

  return (
    <Grid fullWidth className="business-coming-soon">
      <Column lg={16} md={8} sm={4}>
        <div className="coming-soon-container">
          <Tile className="coming-soon-tile">
            <div className="coming-soon-icon">
              <Development size={64} />
            </div>
            
            <Heading className="coming-soon-title">
              {getPageTitle()}
            </Heading>
            
            <p className="coming-soon-subtitle">
              This feature is currently under development
            </p>
            
            <p className="coming-soon-description">
              We're working hard to bring you comprehensive business insurance management tools. 
              Check back soon for updates!
            </p>

            <div className="coming-soon-features">
              <h4>Coming Soon:</h4>
              <ul>
                <li>Business Dashboard with portfolio overview</li>
                <li>Property and Fleet management</li>
                <li>Interactive Map View</li>
                <li>File claims and make payments</li>
                <li>Detailed asset reports</li>
              </ul>
            </div>

            <div className="coming-soon-actions">
              <Button
                kind="primary"
                renderIcon={ArrowLeft}
                onClick={() => navigate('/business/dashboard')}
              >
                Back to Business Dashboard
              </Button>
            </div>
          </Tile>
        </div>
      </Column>
    </Grid>
  );
}
