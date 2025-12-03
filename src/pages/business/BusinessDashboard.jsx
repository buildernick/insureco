import React from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  ClickableTile,
  Button,
  Heading,
} from '@carbon/react';
import {
  Building,
  CarFront,
  Map,
  DocumentAdd,
  Wallet,
  ArrowRight,
} from '@carbon/icons-react';
import PropertyTable from '../../components/business/PropertyTable';
import FleetTable from '../../components/business/FleetTable';
import {
  mockProperties,
  mockVehicles,
  getTotalBusinessPremium,
  getActiveProperties,
  getActiveVehicles,
} from '../../data/businessMockData';
import { formatCurrency } from '../../utils/businessHelpers';
import './BusinessDashboard.scss';

/**
 * BusinessDashboard - Main business insurance dashboard
 * Shows portfolio overview with statistics, quick actions, and data tables
 */
export default function BusinessDashboard() {
  const navigate = useNavigate();

  // Calculate statistics from mock data
  const totalProperties = mockProperties.length;
  const activePropertiesCount = getActiveProperties().length;
  const totalVehicles = mockVehicles.length;
  const activeVehiclesCount = getActiveVehicles().length;
  const totalMonthlyPremium = getTotalBusinessPremium();

  return (
    <Grid fullWidth className="business-dashboard">
      {/* Header Section */}
      <Column lg={16} md={8} sm={4} className="dashboard-header">
        <Heading className="dashboard-title">Business Insurance Dashboard</Heading>
        <p className="dashboard-subtitle">
          Manage your business insurance portfolio and view your coverage at a glance
        </p>
      </Column>

      {/* Quick Actions */}
      <Column lg={16} md={8} sm={4}>
        <div className="quick-actions">
          <ClickableTile
            className="action-tile"
            onClick={() => navigate('/business/properties')}
          >
            <div className="action-icon">
              <Building size={24} />
            </div>
            <div className="action-content">
              <h4>View All Properties</h4>
              <p>Manage commercial properties</p>
            </div>
            <ArrowRight size={20} className="action-arrow" />
          </ClickableTile>

          <ClickableTile
            className="action-tile"
            onClick={() => navigate('/business/fleet')}
          >
            <div className="action-icon">
              <CarFront size={24} />
            </div>
            <div className="action-content">
              <h4>View Fleet</h4>
              <p>Monitor business vehicles</p>
            </div>
            <ArrowRight size={20} className="action-arrow" />
          </ClickableTile>

          <ClickableTile
            className="action-tile"
            onClick={() => navigate('/business/map')}
          >
            <div className="action-icon">
              <Map size={24} />
            </div>
            <div className="action-content">
              <h4>Map View</h4>
              <p>See assets on map</p>
            </div>
            <ArrowRight size={20} className="action-arrow" />
          </ClickableTile>

          <ClickableTile
            className="action-tile"
            onClick={() => navigate('/business/file-claim')}
          >
            <div className="action-icon">
              <DocumentAdd size={24} />
            </div>
            <div className="action-content">
              <h4>File a Claim</h4>
              <p>Submit insurance claim</p>
            </div>
            <ArrowRight size={20} className="action-arrow" />
          </ClickableTile>

          <ClickableTile
            className="action-tile"
            onClick={() => navigate('/business/make-payment')}
          >
            <div className="action-icon">
              <Wallet size={24} />
            </div>
            <div className="action-content">
              <h4>Make a Payment</h4>
              <p>Pay premiums or deductibles</p>
            </div>
            <ArrowRight size={20} className="action-arrow" />
          </ClickableTile>
        </div>
      </Column>

      {/* Summary Stats */}
      <Column lg={5} md={4} sm={4}>
        <Tile className="stat-tile">
          <div className="stat-content">
            <div className="stat-icon-wrapper stat-icon-primary">
              <Building size={20} />
            </div>
            <div className="stat-details">
              <p className="stat-label">Total Properties</p>
              <h3 className="stat-value">{totalProperties}</h3>
              <p className="stat-change stat-change-positive">
                {activePropertiesCount} active
              </p>
            </div>
          </div>
        </Tile>
      </Column>

      <Column lg={5} md={4} sm={4}>
        <Tile className="stat-tile">
          <div className="stat-content">
            <div className="stat-icon-wrapper stat-icon-secondary">
              <CarFront size={20} />
            </div>
            <div className="stat-details">
              <p className="stat-label">Fleet Vehicles</p>
              <h3 className="stat-value">{totalVehicles}</h3>
              <p className="stat-change stat-change-positive">
                {activeVehiclesCount} active
              </p>
            </div>
          </div>
        </Tile>
      </Column>

      <Column lg={6} md={8} sm={4}>
        <Tile className="stat-tile">
          <div className="stat-content">
            <div className="stat-icon-wrapper stat-icon-success">
              <Wallet size={20} />
            </div>
            <div className="stat-details">
              <p className="stat-label">Monthly Premium</p>
              <h3 className="stat-value">{formatCurrency(totalMonthlyPremium, false)}</h3>
              <p className="stat-change">
                {totalProperties + totalVehicles} assets
              </p>
            </div>
          </div>
        </Tile>
      </Column>

      {/* Properties Table Section */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="data-tile">
          <div className="tile-header">
            <Heading className="tile-title">Properties</Heading>
            <Button 
              kind="ghost" 
              size="sm" 
              renderIcon={ArrowRight}
              onClick={() => navigate('/business/properties')}
            >
              View All
            </Button>
          </div>
          <PropertyTable properties={mockProperties} compact maxRows={5} />
        </Tile>
      </Column>

      {/* Fleet Vehicles Table Section */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="data-tile">
          <div className="tile-header">
            <Heading className="tile-title">Fleet Vehicles</Heading>
            <Button 
              kind="ghost" 
              size="sm" 
              renderIcon={ArrowRight}
              onClick={() => navigate('/business/fleet')}
            >
              View All
            </Button>
          </div>
          <FleetTable vehicles={mockVehicles} compact maxRows={5} />
        </Tile>
      </Column>
    </Grid>
  );
}
