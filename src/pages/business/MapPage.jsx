import React, { useState, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  Grid,
  Column,
  Tile,
  Button,
  Heading,
  Search,
  Dropdown,
  Tag,
  ContentSwitcher,
  Switch,
} from '@carbon/react';
import { Building, CarFront, Filter, Close } from '@carbon/icons-react';
import MapView from '../../components/business/MapView';
import { mockProperties, mockVehicles } from '../../data/businessMockData';
import { formatCurrency, getStatusTagType } from '../../utils/businessHelpers';
import './MapPage.scss';

/**
 * MapPage - Interactive map showing properties and fleet vehicles
 * Features: filtering, asset type switching, summary stats, clickable markers
 */
export default function MapPage() {
  const navigate = useNavigate();

  // State
  const [selectedAssetType, setSelectedAssetType] = useState('all');
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [typeFilter, setTypeFilter] = useState('all');
  const [locationFilter, setLocationFilter] = useState('all');

  // Get unique filter values based on selected asset type
  const filterOptions = useMemo(() => {
    if (selectedAssetType === 'properties') {
      const cities = [...new Set(mockProperties.map(p => p.city))].sort();
      const types = [...new Set(mockProperties.map(p => p.propertyType))].sort();
      const statuses = [...new Set(mockProperties.map(p => p.status))].sort();
      return { locations: cities, types, statuses };
    } else if (selectedAssetType === 'vehicles') {
      const departments = [...new Set(mockVehicles.map(v => v.department))].sort();
      const types = [...new Set(mockVehicles.map(v => v.vehicleType))].sort();
      const statuses = [...new Set(mockVehicles.map(v => v.status))].sort();
      return { locations: departments, types, statuses };
    } else {
      // Combined filters for "all"
      const propStatuses = mockProperties.map(p => p.status);
      const vehStatuses = mockVehicles.map(v => v.status);
      const statuses = [...new Set([...propStatuses, ...vehStatuses])].sort();
      return { locations: [], types: [], statuses };
    }
  }, [selectedAssetType]);

  // Filter properties
  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      const searchMatch = searchTerm === '' || 
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch = statusFilter === 'all' || property.status === statusFilter;
      const typeMatch = typeFilter === 'all' || property.propertyType === typeFilter;
      const locationMatch = locationFilter === 'all' || property.city === locationFilter;

      return searchMatch && statusMatch && typeMatch && locationMatch;
    });
  }, [searchTerm, statusFilter, typeFilter, locationFilter]);

  // Filter vehicles
  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter(vehicle => {
      const searchMatch = searchTerm === '' || 
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.assignedDriver.toLowerCase().includes(searchTerm.toLowerCase());

      const statusMatch = statusFilter === 'all' || vehicle.status === statusFilter;
      const typeMatch = typeFilter === 'all' || vehicle.vehicleType === typeFilter;
      const locationMatch = locationFilter === 'all' || vehicle.department === locationFilter;

      return searchMatch && statusMatch && typeMatch && locationMatch;
    });
  }, [searchTerm, statusFilter, typeFilter, locationFilter]);

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
    setSearchTerm('');
    setStatusFilter('all');
    setTypeFilter('all');
    setLocationFilter('all');
  };

  const activeFiltersCount = [statusFilter, typeFilter, locationFilter].filter(f => f !== 'all').length + (searchTerm ? 1 : 0);

  // Prepare dropdown items
  const statusItems = [
    { id: 'all', text: 'All Statuses' },
    ...filterOptions.statuses.map(status => ({ id: status, text: status }))
  ];

  const typeItems = [
    { id: 'all', text: selectedAssetType === 'properties' ? 'All Property Types' : 'All Vehicle Types' },
    ...filterOptions.types.map(type => ({ id: type, text: type }))
  ];

  const locationItems = [
    { id: 'all', text: selectedAssetType === 'properties' ? 'All Cities' : 'All Departments' },
    ...filterOptions.locations.map(loc => ({ id: loc, text: loc }))
  ];

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
        {/* Asset Type Switcher */}
        <Tile className="switcher-tile">
          <ContentSwitcher
            selectedIndex={selectedAssetType === 'all' ? 0 : selectedAssetType === 'properties' ? 1 : 2}
            onChange={(e) => {
              const index = e.index;
              setSelectedAssetType(index === 0 ? 'all' : index === 1 ? 'properties' : 'vehicles');
              handleClearFilters();
            }}
            className="asset-switcher"
          >
            <Switch name="all" text="All Assets" />
            <Switch name="properties" text="Properties" />
            <Switch name="vehicles" text="Vehicles" />
          </ContentSwitcher>
        </Tile>

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

        {/* Filters */}
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
            {/* Search */}
            <Search
              size="lg"
              placeholder={selectedAssetType === 'properties' ? 'Search properties...' : 
                          selectedAssetType === 'vehicles' ? 'Search vehicles...' : 
                          'Search all assets...'}
              labelText="Search"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
            />

            {/* Status Filter */}
            <Dropdown
              id="status-filter"
              titleText="Status"
              label="Select status"
              items={statusItems}
              selectedItem={statusItems.find(item => item.id === statusFilter)}
              onChange={(e) => setStatusFilter(e.selectedItem.id)}
            />

            {/* Type Filter (only if not "all") */}
            {selectedAssetType !== 'all' && (
              <Dropdown
                id="type-filter"
                titleText={selectedAssetType === 'properties' ? 'Property Type' : 'Vehicle Type'}
                label={selectedAssetType === 'properties' ? 'Select property type' : 'Select vehicle type'}
                items={typeItems}
                selectedItem={typeItems.find(item => item.id === typeFilter)}
                onChange={(e) => setTypeFilter(e.selectedItem.id)}
              />
            )}

            {/* Location Filter (only if not "all") */}
            {selectedAssetType !== 'all' && (
              <Dropdown
                id="location-filter"
                titleText={selectedAssetType === 'properties' ? 'City' : 'Department'}
                label={selectedAssetType === 'properties' ? 'Select city' : 'Select department'}
                items={locationItems}
                selectedItem={locationItems.find(item => item.id === locationFilter)}
                onChange={(e) => setLocationFilter(e.selectedItem.id)}
              />
            )}
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
