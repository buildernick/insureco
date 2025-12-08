import React, { useState, useMemo, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Heading,
  Search,
  Toggle,
  Tag,
  DataTableSkeleton,
} from '@carbon/react';
import { Map as MapIcon, Add } from '@carbon/icons-react';
import {
  mockProperties,
  mockVehicles,
} from '../../data/businessMockData';
import { formatCurrency } from '../../utils/businessHelpers';
import './MapViewPage.scss';

// Lazy load the MapView component to reduce initial bundle size
const MapView = lazy(() => import('../../components/business/MapView'));

/**
 * MapViewPage - Interactive map view of business properties and fleet vehicles
 * Shows all assets on a map with clustering, filtering, and click-to-navigate
 */
export default function MapViewPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [showProperties, setShowProperties] = useState(true);
  const [showVehicles, setShowVehicles] = useState(true);

  // Transform properties into marker format
  const propertyMarkers = useMemo(() => {
    return mockProperties.map(property => ({
      id: property.id,
      type: 'property',
      name: property.name,
      lat: property.lat,
      lng: property.lng,
      address: property.address,
      premium: property.monthlyPremium,
      status: property.status,
    }));
  }, []);

  // Transform vehicles into marker format
  const vehicleMarkers = useMemo(() => {
    return mockVehicles.map(vehicle => ({
      id: vehicle.id,
      type: 'vehicle',
      name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      lat: vehicle.lastKnownLocation.lat,
      lng: vehicle.lastKnownLocation.lng,
      licensePlate: vehicle.licensePlate,
      driver: vehicle.assignedDriver,
      status: vehicle.status,
    }));
  }, []);

  // Combine and filter markers based on toggles and search
  const filteredMarkers = useMemo(() => {
    let allMarkers = [];

    if (showProperties) {
      allMarkers = [...allMarkers, ...propertyMarkers];
    }

    if (showVehicles) {
      allMarkers = [...allMarkers, ...vehicleMarkers];
    }

    // Apply search filter
    if (searchTerm) {
      const lowerSearch = searchTerm.toLowerCase();
      allMarkers = allMarkers.filter(marker => 
        marker.name.toLowerCase().includes(lowerSearch) ||
        (marker.address && marker.address.toLowerCase().includes(lowerSearch)) ||
        (marker.licensePlate && marker.licensePlate.toLowerCase().includes(lowerSearch)) ||
        (marker.driver && marker.driver.toLowerCase().includes(lowerSearch))
      );
    }

    return allMarkers;
  }, [propertyMarkers, vehicleMarkers, showProperties, showVehicles, searchTerm]);

  // Calculate summary statistics
  const totalProperties = showProperties ? propertyMarkers.length : 0;
  const totalVehicles = showVehicles ? vehicleMarkers.length : 0;
  const totalAssets = filteredMarkers.length;

  const totalMonthlyPremium = useMemo(() => {
    let sum = 0;
    if (showProperties) {
      sum += mockProperties.reduce((acc, p) => acc + p.monthlyPremium, 0);
    }
    if (showVehicles) {
      sum += mockVehicles.reduce((acc, v) => acc + v.monthlyPremium, 0);
    }
    return sum;
  }, [showProperties, showVehicles]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setShowProperties(true);
    setShowVehicles(true);
  };

  const activeFilterCount = [
    !showProperties,
    !showVehicles,
    searchTerm !== ''
  ].filter(Boolean).length;

  return (
    <Grid fullWidth className="map-view-page">
      {/* Page Header */}
      <Column lg={16} md={8} sm={4} className="page-header">
        <div className="header-content">
          <div className="header-text">
            <div className="page-icon">
              <MapIcon size={32} />
            </div>
            <div>
              <Heading className="page-title">Map View</Heading>
              <p className="page-subtitle">
                View all properties and vehicles on an interactive map
              </p>
            </div>
          </div>
          <Button
            kind="primary"
            renderIcon={Add}
            onClick={() => navigate('/business/properties/add')}
          >
            Add Asset
          </Button>
        </div>
      </Column>

      {/* Summary Statistics */}
      <Column lg={4} md={4} sm={2}>
        <Tile className="summary-stat">
          <p className="summary-label">Total Properties</p>
          <p className="summary-value">{totalProperties}</p>
          <p className="summary-detail">{showProperties ? 'Showing on map' : 'Hidden'}</p>
        </Tile>
      </Column>

      <Column lg={4} md={4} sm={2}>
        <Tile className="summary-stat">
          <p className="summary-label">Total Vehicles</p>
          <p className="summary-value">{totalVehicles}</p>
          <p className="summary-detail">{showVehicles ? 'Showing on map' : 'Hidden'}</p>
        </Tile>
      </Column>

      <Column lg={4} md={4} sm={2}>
        <Tile className="summary-stat">
          <p className="summary-label">Total Assets</p>
          <p className="summary-value">{totalAssets}</p>
          <p className="summary-detail">
            {searchTerm ? 'Matching filters' : 'On map'}
          </p>
        </Tile>
      </Column>

      <Column lg={4} md={4} sm={2}>
        <Tile className="summary-stat">
          <p className="summary-label">Monthly Premium</p>
          <p className="summary-value">{formatCurrency(totalMonthlyPremium)}</p>
          <p className="summary-detail">Combined total</p>
        </Tile>
      </Column>

      {/* Filters Section */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="filters-tile">
          <div className="filters-header">
            <h4 className="filters-title">Filters</h4>
            <div className="filter-actions">
              {activeFilterCount > 0 && (
                <>
                  <Tag type="blue" size="sm">
                    {activeFilterCount} active
                  </Tag>
                  <Button
                    kind="ghost"
                    size="sm"
                    onClick={handleClearFilters}
                  >
                    Clear filters
                  </Button>
                </>
              )}
            </div>
          </div>

          <div className="filters-grid">
            <Search
              labelText="Search assets"
              placeholder="Search by name, address, license plate..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
            />

            <div className="filter-toggles">
              <Toggle
                id="toggle-properties"
                labelText="Show Properties"
                toggled={showProperties}
                onToggle={(checked) => setShowProperties(checked)}
                size="sm"
              />
              <Toggle
                id="toggle-vehicles"
                labelText="Show Vehicles"
                toggled={showVehicles}
                onToggle={(checked) => setShowVehicles(checked)}
                size="sm"
              />
            </div>
          </div>
        </Tile>
      </Column>

      {/* Map Section */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="data-tile map-tile">
          <div className="tile-header">
            <h4 className="tile-title">
              Asset Locations
              {filteredMarkers.length > 0 && (
                <span className="marker-count"> ({filteredMarkers.length})</span>
              )}
            </h4>
            <p className="tile-subtitle">
              Click markers to view details or clusters to zoom in
            </p>
          </div>

          <div className="map-container">
            <Suspense fallback={<DataTableSkeleton headers={[]} />}>
              <MapView markers={filteredMarkers} />
            </Suspense>
          </div>

          {filteredMarkers.length === 0 && (
            <div className="empty-state">
              <MapIcon size={48} />
              <h4>No assets to display</h4>
              <p>
                {!showProperties && !showVehicles
                  ? 'Enable at least one asset type in the filters above'
                  : searchTerm
                  ? 'No assets match your search criteria'
                  : 'No assets found'}
              </p>
              {(searchTerm || !showProperties || !showVehicles) && (
                <Button kind="tertiary" onClick={handleClearFilters}>
                  Clear filters
                </Button>
              )}
            </div>
          )}
        </Tile>
      </Column>

      {/* Legend */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="legend-tile">
          <h4 className="legend-title">Legend</h4>
          <div className="legend-items">
            <div className="legend-item">
              <div className="legend-marker property-marker-legend"></div>
              <span>Commercial Property</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker vehicle-marker-legend"></div>
              <span>Fleet Vehicle</span>
            </div>
            <div className="legend-item">
              <div className="legend-marker cluster-marker-legend">5</div>
              <span>Cluster (multiple assets)</span>
            </div>
          </div>
        </Tile>
      </Column>
    </Grid>
  );
}
