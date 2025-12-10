import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Heading,
  RadioButtonGroup,
  RadioButton,
} from '@carbon/react';
import { Building, CarFront, Close } from '@carbon/icons-react';
import MapView from '../../components/business/MapView';
import FacetedFilterButton from '../../components/business/FacetedFilterButton';
import { mockProperties, mockVehicles } from '../../data/businessMockData';
import { formatCurrency } from '../../utils/businessHelpers';
import './MapPage.scss';

/**
 * MapPage - Interactive map showing properties and fleet vehicles
 * Features: cascading filters, asset type switching, summary stats, clickable markers
 */
export default function MapPage() {
  const navigate = useNavigate();

  // State
  const [selectedAssetType, setSelectedAssetType] = useState('all');
  const [selectedFilters, setSelectedFilters] = useState({
    status: [],
    type: [],
    location: [],
    propertyType: [],
    vehicleType: [],
    city: []
  });

  // Prepare facets with counts based on selected asset type
  const facets = useMemo(() => {
    const data = selectedAssetType === 'properties' ? mockProperties :
                  selectedAssetType === 'vehicles' ? mockVehicles :
                  [...mockProperties, ...mockVehicles];

    if (selectedAssetType === 'properties') {
      // Property facets
      const statuses = {};
      const types = {};
      const cities = {};

      mockProperties.forEach(p => {
        statuses[p.status] = (statuses[p.status] || 0) + 1;
        types[p.propertyType] = (types[p.propertyType] || 0) + 1;
        cities[p.city] = (cities[p.city] || 0) + 1;
      });

      return [
        {
          key: 'status',
          label: 'Status',
          options: Object.entries(statuses).map(([value, count]) => ({
            value,
            label: value,
            count
          })).sort((a, b) => a.label.localeCompare(b.label))
        },
        {
          key: 'type',
          label: 'Property Type',
          options: Object.entries(types).map(([value, count]) => ({
            value,
            label: value,
            count
          })).sort((a, b) => a.label.localeCompare(b.label))
        },
        {
          key: 'location',
          label: 'City',
          options: Object.entries(cities).map(([value, count]) => ({
            value,
            label: value,
            count
          })).sort((a, b) => a.label.localeCompare(b.label))
        }
      ];
    } else if (selectedAssetType === 'vehicles') {
      // Vehicle facets
      const statuses = {};
      const types = {};
      const departments = {};

      mockVehicles.forEach(v => {
        statuses[v.status] = (statuses[v.status] || 0) + 1;
        types[v.vehicleType] = (types[v.vehicleType] || 0) + 1;
        departments[v.department] = (departments[v.department] || 0) + 1;
      });

      return [
        {
          key: 'status',
          label: 'Status',
          options: Object.entries(statuses).map(([value, count]) => ({
            value,
            label: value,
            count
          })).sort((a, b) => a.label.localeCompare(b.label))
        },
        {
          key: 'type',
          label: 'Vehicle Type',
          options: Object.entries(types).map(([value, count]) => ({
            value,
            label: value,
            count
          })).sort((a, b) => a.label.localeCompare(b.label))
        },
        {
          key: 'location',
          label: 'Department',
          options: Object.entries(departments).map(([value, count]) => ({
            value,
            label: value,
            count
          })).sort((a, b) => a.label.localeCompare(b.label))
        }
      ];
    } else {
      // Combined facets (all assets)
      const statuses = {};
      const propertyTypes = {};
      const vehicleTypes = {};
      const cities = {};
      const departments = {};

      // Collect all property data
      mockProperties.forEach(p => {
        statuses[p.status] = (statuses[p.status] || 0) + 1;
        propertyTypes[p.propertyType] = (propertyTypes[p.propertyType] || 0) + 1;
        cities[p.city] = (cities[p.city] || 0) + 1;
      });

      // Collect all vehicle data
      mockVehicles.forEach(v => {
        statuses[v.status] = (statuses[v.status] || 0) + 1;
        vehicleTypes[v.vehicleType] = (vehicleTypes[v.vehicleType] || 0) + 1;
        departments[v.department] = (departments[v.department] || 0) + 1;
      });

      return [
        {
          key: 'status',
          label: 'Status',
          options: Object.entries(statuses).map(([value, count]) => ({
            value,
            label: value,
            count
          })).sort((a, b) => a.label.localeCompare(b.label))
        },
        {
          key: 'propertyType',
          label: 'Property Type',
          options: Object.entries(propertyTypes).map(([value, count]) => ({
            value,
            label: value,
            count
          })).sort((a, b) => a.label.localeCompare(b.label))
        },
        {
          key: 'vehicleType',
          label: 'Vehicle Type',
          options: Object.entries(vehicleTypes).map(([value, count]) => ({
            value,
            label: value,
            count
          })).sort((a, b) => a.label.localeCompare(b.label))
        },
        {
          key: 'city',
          label: 'City',
          options: Object.entries(cities).map(([value, count]) => ({
            value,
            label: value,
            count
          })).sort((a, b) => a.label.localeCompare(b.label))
        },
        {
          key: 'location',
          label: 'Department',
          options: Object.entries(departments).map(([value, count]) => ({
            value,
            label: value,
            count
          })).sort((a, b) => a.label.localeCompare(b.label))
        }
      ];
    }
  }, [selectedAssetType]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      const statusMatch = selectedFilters.status.length === 0 ||
        selectedFilters.status.includes(property.status);
      const typeMatch = selectedFilters.type.length === 0 ||
        selectedFilters.type.includes(property.propertyType);
      const locationMatch = selectedFilters.location.length === 0 ||
        selectedFilters.location.includes(property.city);

      // Additional filters for "all assets" mode
      const propertyTypeMatch = selectedFilters.propertyType.length === 0 ||
        selectedFilters.propertyType.includes(property.propertyType);
      const cityMatch = selectedFilters.city.length === 0 ||
        selectedFilters.city.includes(property.city);

      return statusMatch && typeMatch && locationMatch && propertyTypeMatch && cityMatch;
    });
  }, [selectedFilters]);

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter(vehicle => {
      const statusMatch = selectedFilters.status.length === 0 ||
        selectedFilters.status.includes(vehicle.status);
      const typeMatch = selectedFilters.type.length === 0 ||
        selectedFilters.type.includes(vehicle.vehicleType);
      const locationMatch = selectedFilters.location.length === 0 ||
        selectedFilters.location.includes(vehicle.department);

      // Additional filters for "all assets" mode
      const vehicleTypeMatch = selectedFilters.vehicleType.length === 0 ||
        selectedFilters.vehicleType.includes(vehicle.vehicleType);

      return statusMatch && typeMatch && locationMatch && vehicleTypeMatch;
    });
  }, [selectedFilters]);

  // Calculate summary stats
  const stats = useMemo(() => {
    if (selectedAssetType === 'properties') {
      return {
        total: filteredProperties.length,
        active: filteredProperties.filter(p => p.status === 'Active').length,
        monthlyPremium: filteredProperties.reduce((sum, p) => sum + p.monthlyPremium, 0),
        openClaims: filteredProperties.reduce((sum, p) => sum + p.openClaims, 0),
      };
    } else if (selectedAssetType === 'vehicles') {
      return {
        total: filteredVehicles.length,
        active: filteredVehicles.filter(v => v.status === 'Active').length,
        monthlyPremium: filteredVehicles.reduce((sum, v) => sum + v.monthlyPremium, 0),
        openClaims: filteredVehicles.reduce((sum, v) => sum + v.openClaims, 0),
      };
    } else {
      return {
        total: filteredProperties.length + filteredVehicles.length,
        active: filteredProperties.filter(p => p.status === 'Active').length + 
                filteredVehicles.filter(v => v.status === 'Active').length,
        monthlyPremium: filteredProperties.reduce((sum, p) => sum + p.monthlyPremium, 0) +
                        filteredVehicles.reduce((sum, v) => sum + v.monthlyPremium, 0),
        openClaims: filteredProperties.reduce((sum, p) => sum + p.openClaims, 0) +
                    filteredVehicles.reduce((sum, v) => sum + v.openClaims, 0),
      };
    }
  }, [selectedAssetType, filteredProperties, filteredVehicles]);

  // Handle clear filters
  const handleClearFilters = () => {
    setSelectedFilters({
      status: [],
      type: [],
      location: [],
      propertyType: [],
      vehicleType: [],
      city: []
    });
  };


  // Count active filters
  const activeFiltersCount = Object.values(selectedFilters).reduce(
    (sum, values) => sum + values.length,
    0
  );

  // Get filter label based on asset type
  const filterLabel = selectedAssetType === 'properties' 
    ? 'Filter Properties' 
    : selectedAssetType === 'vehicles' 
    ? 'Filter Vehicles' 
    : 'Filter Assets';

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
            properties={selectedAssetType === 'vehicles' ? [] : filteredProperties}
            vehicles={selectedAssetType === 'properties' ? [] : filteredVehicles}
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
            onChange={(value) => {
              setSelectedAssetType(value);
              handleClearFilters();
            }}
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

        {/* Cascading Filter */}
        <Tile className="filters-tile">
          <div className="filters-header">
            <Heading className="tile-heading">Filters</Heading>
            {activeFiltersCount > 0 && (
              <Button
                kind="ghost"
                size="sm"
                renderIcon={Close}
                onClick={handleClearFilters}
                className="clear-filters-btn"
              >
                Clear ({activeFiltersCount})
              </Button>
            )}
          </div>

          <div className="filters-content">
            <FacetedFilterButton
              label={filterLabel}
              facets={facets}
              selectedFilters={selectedFilters}
              onFiltersChange={setSelectedFilters}
            />
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
