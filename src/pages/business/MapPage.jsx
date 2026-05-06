import React, { useState, useMemo } from 'react';
import {
  Grid,
  Column,
  Tile,
  Heading,
  RadioButtonGroup,
  RadioButton,
} from '@carbon/react';
import MapView from '../../components/business/MapView';
import { mockProperties, mockVehicles } from '../../data/businessMockData';
import { formatCurrency } from '../../utils/businessHelpers';
import './MapPage.scss';

/**
 * MapPage - Interactive map showing properties and fleet vehicles
 * Features: cascading filters, asset type switching, summary stats, clickable markers
 */
export default function MapPage() {
  // State
  const [selectedAssetType, setSelectedAssetType] = useState('all');

  // Calculate summary stats
  const stats = useMemo(() => {
    const properties = selectedAssetType === 'vehicles' ? [] : mockProperties;
    const vehicles = selectedAssetType === 'properties' ? [] : mockVehicles;
    return {
      total: properties.length + vehicles.length,
      active: properties.filter(p => p.status === 'Active').length +
              vehicles.filter(v => v.status === 'Active').length,
      monthlyPremium: properties.reduce((sum, p) => sum + p.monthlyPremium, 0) +
                      vehicles.reduce((sum, v) => sum + v.monthlyPremium, 0),
      openClaims: properties.reduce((sum, p) => sum + p.openClaims, 0) +
                  vehicles.reduce((sum, v) => sum + v.openClaims, 0),
    };
  }, [selectedAssetType]);

  return (
    <Grid fullWidth className="map-page">
      {/* Page Header */}
      <Column lg={16} md={8} sm={4}>
        <div className="page-header">
          <div className="header-content">
            <Heading className="page-title">Map View</Heading>
            <p className="page-description">
              Interactive map showing your properties and fleet vehicles
            </p>
          </div>
        </div>
      </Column>

      {/* Map and Sidebar */}
      <Column lg={11} md={8} sm={4} className="map-column">
        <Tile className="map-tile">
          <MapView
            properties={selectedAssetType === 'vehicles' ? [] : mockProperties}
            vehicles={selectedAssetType === 'properties' ? [] : mockVehicles}
            selectedAssetType={selectedAssetType}
          />
        </Tile>
      </Column>

      <Column lg={5} md={8} sm={4} className="sidebar-column">
        {/* Asset Type Selection */}
        <div className="asset-type-selection">
          <RadioButtonGroup
            name="asset-type"
            valueSelected={selectedAssetType}
            onChange={(value) => setSelectedAssetType(value)}
            orientation="vertical"
            legendText="Asset Type"
          >
            <RadioButton id="asset-all" labelText="All Assets" value="all" />
            <RadioButton id="asset-properties" labelText="Properties" value="properties" />
            <RadioButton id="asset-vehicles" labelText="Vehicles" value="vehicles" />
          </RadioButtonGroup>
        </div>

        {/* Summary Stats */}
        <Tile className="stats-tile">
          <Heading className="tile-heading">Summary</Heading>
          <div className="stats-grid">
            <div className="stat-item">
              <span className="stat-label">Total Assets</span>
              <span className="stat-value">{stats.total}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Active</span>
              <span className="stat-value stat-active">{stats.active}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Monthly Premium</span>
              <span className="stat-value stat-premium">{formatCurrency(stats.monthlyPremium)}</span>
            </div>
            <div className="stat-item">
              <span className="stat-label">Open Claims</span>
              <span className="stat-value stat-claims">{stats.openClaims}</span>
            </div>
          </div>
        </Tile>

        {/* Legend */}
        <Tile className="legend-tile">
          <Heading className="tile-heading">Legend</Heading>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-marker property-legend"></div>
              <span className="legend-label">Properties</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker vehicle-legend"></div>
              <span className="legend-label">Vehicles</span>
            </div>
          </div>
        </Tile>
      </Column>
    </Grid>
  );
}
