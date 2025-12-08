import React, { useState, useMemo, lazy, Suspense } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Heading,
  Search,
  Tag,
  DataTableSkeleton,
} from '@carbon/react';
import { Map as MapIcon, Add } from '@carbon/icons-react';
import FacetedFilterButton from '../../components/business/FacetedFilterButton';
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

  // Faceted filter state
  const [vehicleFilters, setVehicleFilters] = useState({
    status: [],
    vehicleType: [],
    department: [],
    city: []
  });

  const [propertyFilters, setPropertyFilters] = useState({
    status: [],
    propertyType: [],
    city: []
  });

  // Extract unique values for filter options
  const vehicleFacets = useMemo(() => {
    const statuses = [...new Set(mockVehicles.map(v => v.status))].sort();
    const types = [...new Set(mockVehicles.map(v => v.vehicleType))].sort();
    const departments = [...new Set(mockVehicles.map(v => v.department))].sort();
    const cities = [...new Set(mockVehicles.map(v => {
      const match = v.lastKnownLocation;
      // Extract city from coordinates (for demo, use simple mapping)
      if (match.lat > 38.5) return 'Sacramento';
      if (match.lat > 37.8) return 'Oakland';
      if (match.lat > 37.5) return 'San Francisco';
      if (match.lat > 37.3) return 'San Jose';
      return 'Other';
    }))].sort();

    return [
      {
        key: 'status',
        label: 'Status',
        options: statuses.map(s => ({
          value: s,
          label: s,
          count: mockVehicles.filter(v => v.status === s).length
        }))
      },
      {
        key: 'vehicleType',
        label: 'Vehicle Type',
        options: types.map(t => ({
          value: t,
          label: t,
          count: mockVehicles.filter(v => v.vehicleType === t).length
        }))
      },
      {
        key: 'department',
        label: 'Department',
        options: departments.map(d => ({
          value: d,
          label: d,
          count: mockVehicles.filter(v => v.department === d).length
        }))
      },
      {
        key: 'city',
        label: 'Location',
        options: cities.map(c => ({
          value: c,
          label: c,
          count: mockVehicles.filter(v => {
            const match = v.lastKnownLocation;
            if (match.lat > 38.5) return c === 'Sacramento';
            if (match.lat > 37.8) return c === 'Oakland';
            if (match.lat > 37.5) return c === 'San Francisco';
            if (match.lat > 37.3) return c === 'San Jose';
            return c === 'Other';
          }).length
        }))
      }
    ];
  }, []);

  const propertyFacets = useMemo(() => {
    const statuses = [...new Set(mockProperties.map(p => p.status))].sort();
    const types = [...new Set(mockProperties.map(p => p.propertyType))].sort();
    const cities = [...new Set(mockProperties.map(p => p.city))].sort();

    return [
      {
        key: 'status',
        label: 'Status',
        options: statuses.map(s => ({
          value: s,
          label: s,
          count: mockProperties.filter(p => p.status === s).length
        }))
      },
      {
        key: 'propertyType',
        label: 'Property Type',
        options: types.map(t => ({
          value: t,
          label: t,
          count: mockProperties.filter(p => p.propertyType === t).length
        }))
      },
      {
        key: 'city',
        label: 'Location',
        options: cities.map(c => ({
          value: c,
          label: c,
          count: mockProperties.filter(p => p.city === c).length
        }))
      }
    ];
  }, []);

  // Transform properties into marker format with filtering
  const propertyMarkers = useMemo(() => {
    let filtered = mockProperties;

    // Apply faceted filters
    if (propertyFilters.status.length > 0) {
      filtered = filtered.filter(p => propertyFilters.status.includes(p.status));
    }
    if (propertyFilters.propertyType.length > 0) {
      filtered = filtered.filter(p => propertyFilters.propertyType.includes(p.propertyType));
    }
    if (propertyFilters.city.length > 0) {
      filtered = filtered.filter(p => propertyFilters.city.includes(p.city));
    }

    return filtered.map(property => ({
      id: property.id,
      type: 'property',
      name: property.name,
      lat: property.lat,
      lng: property.lng,
      address: property.address,
      premium: property.monthlyPremium,
      status: property.status,
    }));
  }, [propertyFilters]);

  // Transform vehicles into marker format with filtering
  const vehicleMarkers = useMemo(() => {
    let filtered = mockVehicles;

    // Apply faceted filters
    if (vehicleFilters.status.length > 0) {
      filtered = filtered.filter(v => vehicleFilters.status.includes(v.status));
    }
    if (vehicleFilters.vehicleType.length > 0) {
      filtered = filtered.filter(v => vehicleFilters.vehicleType.includes(v.vehicleType));
    }
    if (vehicleFilters.department.length > 0) {
      filtered = filtered.filter(v => vehicleFilters.department.includes(v.department));
    }
    if (vehicleFilters.city.length > 0) {
      filtered = filtered.filter(v => {
        const match = v.lastKnownLocation;
        let city = 'Other';
        if (match.lat > 38.5) city = 'Sacramento';
        else if (match.lat > 37.8) city = 'Oakland';
        else if (match.lat > 37.5) city = 'San Francisco';
        else if (match.lat > 37.3) city = 'San Jose';
        return vehicleFilters.city.includes(city);
      });
    }

    return filtered.map(vehicle => ({
      id: vehicle.id,
      type: 'vehicle',
      name: `${vehicle.year} ${vehicle.make} ${vehicle.model}`,
      lat: vehicle.lastKnownLocation.lat,
      lng: vehicle.lastKnownLocation.lng,
      licensePlate: vehicle.licensePlate,
      driver: vehicle.assignedDriver,
      status: vehicle.status,
    }));
  }, [vehicleFilters]);

  // Combine and filter markers based on search
  const filteredMarkers = useMemo(() => {
    let allMarkers = [...propertyMarkers, ...vehicleMarkers];

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
  }, [propertyMarkers, vehicleMarkers, searchTerm]);

  // Calculate summary statistics
  const totalProperties = propertyMarkers.length;
  const totalVehicles = vehicleMarkers.length;
  const totalAssets = filteredMarkers.length;

  const totalMonthlyPremium = useMemo(() => {
    const propertySum = propertyMarkers.reduce((sum, m) => sum + (m.premium || 0), 0);
    const vehicleSum = mockVehicles
      .filter(v => vehicleMarkers.some(vm => vm.id === v.id))
      .reduce((sum, v) => sum + v.monthlyPremium, 0);
    return propertySum + vehicleSum;
  }, [propertyMarkers, vehicleMarkers]);

  const handleClearFilters = () => {
    setSearchTerm('');
    setVehicleFilters({ status: [], vehicleType: [], department: [], city: [] });
    setPropertyFilters({ status: [], propertyType: [], city: [] });
  };

  // Count active filters
  const vehicleFilterCount = Object.values(vehicleFilters).reduce((sum, arr) => sum + arr.length, 0);
  const propertyFilterCount = Object.values(propertyFilters).reduce((sum, arr) => sum + arr.length, 0);
  const activeFilterCount = vehicleFilterCount + propertyFilterCount + (searchTerm ? 1 : 0);

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
          <p className="summary-detail">
            {propertyFilterCount > 0 ? `${propertyFilterCount} filters applied` : 'All properties'}
          </p>
        </Tile>
      </Column>

      <Column lg={4} md={4} sm={2}>
        <Tile className="summary-stat">
          <p className="summary-label">Total Vehicles</p>
          <p className="summary-value">{totalVehicles}</p>
          <p className="summary-detail">
            {vehicleFilterCount > 0 ? `${vehicleFilterCount} filters applied` : 'All vehicles'}
          </p>
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

            <div className="filter-buttons">
              <FacetedFilterButton
                label="Filter Vehicles"
                facets={vehicleFacets}
                selectedFilters={vehicleFilters}
                onApplyFilters={setVehicleFilters}
              />
              <FacetedFilterButton
                label="Filter Properties"
                facets={propertyFacets}
                selectedFilters={propertyFilters}
                onApplyFilters={setPropertyFilters}
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
                {searchTerm || activeFilterCount > 0
                  ? 'No assets match your search criteria'
                  : 'No assets found'}
              </p>
              {activeFilterCount > 0 && (
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
