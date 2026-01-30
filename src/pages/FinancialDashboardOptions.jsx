import { useNavigate } from 'react-router-dom';
import { Grid, Column, Tile } from '@carbon/react';
import { ChartLineData, Analytics, Dashboard } from '@carbon/icons-react';
import './FinancialDashboardOptions.scss';

export default function FinancialDashboardOptions() {
  const navigate = useNavigate();

  return (
    <div className="dashboard-options-page">
      <Grid fullWidth>
        <Column lg={16} md={8} sm={4}>
          <div className="options-header">
            <h1>Financial Dashboard Options</h1>
            <p className="options-subtitle">
              Choose from three distinct design approaches for the Insurance Financial Analytics Dashboard
            </p>
          </div>
        </Column>

        <Column lg={16} md={8} sm={4}>
          <div className="options-grid">
            {/* Option 1: Conservative */}
            <Tile 
              className="option-card option-card--conservative"
              onClick={() => navigate('/financial-dashboard-1')}
            >
              <div className="option-icon">
                <Dashboard size={48} />
              </div>
              <h2>Option 1: Conservative</h2>
              <p className="option-description">
                Traditional Carbon Design System implementation with familiar layouts and standard components.
              </p>
              <ul className="option-features">
                <li>Standard Carbon Tiles and DataTable</li>
                <li>Traditional financial color scheme</li>
                <li>Professional, corporate aesthetic</li>
                <li>Proven UI patterns for financial data</li>
              </ul>
              <div className="option-tags">
                <span className="tag">Traditional</span>
                <span className="tag">Professional</span>
                <span className="tag">Carbon DS</span>
              </div>
            </Tile>

            {/* Option 2: Modern Sleek */}
            <Tile 
              className="option-card option-card--modern"
              onClick={() => navigate('/financial-dashboard-2')}
            >
              <div className="option-icon">
                <ChartLineData size={48} />
              </div>
              <h2>Option 2: Modern Sleek</h2>
              <p className="option-description">
                Contemporary design using Carbon components with enhanced visuals and modern aesthetics.
              </p>
              <ul className="option-features">
                <li>Enhanced Carbon components</li>
                <li>Modern card designs with shadows</li>
                <li>Improved visual hierarchy</li>
                <li>Area charts with gradients</li>
              </ul>
              <div className="option-tags">
                <span className="tag">Modern</span>
                <span className="tag">Sleek</span>
                <span className="tag">Carbon DS</span>
              </div>
            </Tile>

            {/* Option 3: Wild Creative */}
            <Tile 
              className="option-card option-card--wild"
              onClick={() => navigate('/financial-dashboard-3')}
            >
              <div className="option-icon">
                <Analytics size={48} />
              </div>
              <h2>Option 3: Wild Creative</h2>
              <p className="option-description">
                Bold, creative design breaking from traditional patterns with custom components and InsureCo branding.
              </p>
              <ul className="option-features">
                <li>Custom components (no Carbon constraints)</li>
                <li>Dark theme with glassmorphism</li>
                <li>Bold InsureCo red branding</li>
                <li>Unique card grid layout</li>
              </ul>
              <div className="option-tags">
                <span className="tag">Creative</span>
                <span className="tag">Bold</span>
                <span className="tag">Custom</span>
              </div>
            </Tile>
          </div>
        </Column>

        <Column lg={16} md={8} sm={4}>
          <div className="options-footer">
            <h3>All Options Include:</h3>
            <div className="common-features">
              <div className="feature-item">
                <span>✅</span>
                <span>KPI summary cards with YTD metrics</span>
              </div>
              <div className="feature-item">
                <span>✅</span>
                <span>Interactive charts (line/bar toggle)</span>
              </div>
              <div className="feature-item">
                <span>✅</span>
                <span>Asset performance table with filtering</span>
              </div>
              <div className="feature-item">
                <span>✅</span>
                <span>Drill-down to property/vehicle details</span>
              </div>
              <div className="feature-item">
                <span>✅</span>
                <span>Traditional financial colors (green=premiums, red=claims)</span>
              </div>
              <div className="feature-item">
                <span>✅</span>
                <span>Fully responsive design</span>
              </div>
            </div>
          </div>
        </Column>
      </Grid>
    </div>
  );
}
