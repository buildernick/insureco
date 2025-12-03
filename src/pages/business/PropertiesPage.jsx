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
} from '@carbon/react';
import { Add, Building } from '@carbon/icons-react';
import PropertyTable from '../../components/business/PropertyTable';
import { mockProperties } from '../../data/businessMockData';
import { formatCurrency } from '../../utils/businessHelpers';
import './PropertiesPage.scss';

/**
 * PropertiesPage - Full properties list with search and filter
 * Displays all commercial properties with filtering capabilities
 */
export default function PropertiesPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [cityFilter, setCityFilter] = useState('all');
  const [propertyTypeFilter, setPropertyTypeFilter] = useState('all');

  // Extract unique values for filters
  const uniqueCities = useMemo(() => {
    const cities = [...new Set(mockProperties.map(p => p.city))];
    return cities.sort();
  }, []);

  const uniquePropertyTypes = useMemo(() => {
    const types = [...new Set(mockProperties.map(p => p.propertyType))];
    return types.sort();
  }, []);

  const uniqueStatuses = useMemo(() => {
    const statuses = [...new Set(mockProperties.map(p => p.status))];
    return statuses.sort();
  }, []);

  // Filter properties based on search and filters
  const filteredProperties = useMemo(() => {
    return mockProperties.filter(property => {
      // Search filter
      const searchMatch = searchTerm === '' || 
        property.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.address.toLowerCase().includes(searchTerm.toLowerCase()) ||
        property.city.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const statusMatch = statusFilter === 'all' || property.status === statusFilter;

      // City filter
      const cityMatch = cityFilter === 'all' || property.city === cityFilter;

      // Property type filter
      const propertyTypeMatch = propertyTypeFilter === 'all' || property.propertyType === propertyTypeFilter;

      return searchMatch && statusMatch && cityMatch && propertyTypeMatch;
    });
  }, [searchTerm, statusFilter, cityFilter, propertyTypeFilter]);

  // Calculate summary stats for filtered results
  const totalProperties = filteredProperties.length;
  const totalMonthlyPremium = filteredProperties.reduce((sum, p) => sum + p.monthlyPremium, 0);
  const totalYearlyPremium = filteredProperties.reduce((sum, p) => sum + p.yearlyPremium, 0);
  const activeCount = filteredProperties.filter(p => p.status === 'Active').length;
  const totalClaims = filteredProperties.reduce((sum, p) => sum + p.claimsCount, 0);
  const openClaims = filteredProperties.reduce((sum, p) => sum + p.openClaims, 0);

  // Prepare dropdown items
  const statusItems = [
    { id: 'all', text: 'All Statuses' },
    ...uniqueStatuses.map(status => ({ id: status, text: status }))
  ];

  const cityItems = [
    { id: 'all', text: 'All Cities' },
    ...uniqueCities.map(city => ({ id: city, text: city }))
  ];

  const propertyTypeItems = [
    { id: 'all', text: 'All Property Types' },
    ...uniquePropertyTypes.map(type => ({ id: type, text: type }))
  ];

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setCityFilter('all');
    setPropertyTypeFilter('all');
  };

  const activeFiltersCount = [statusFilter, cityFilter, propertyTypeFilter].filter(f => f !== 'all').length + (searchTerm ? 1 : 0);

  return (
    <Grid fullWidth className="properties-page">
      {/* Header Section */}
      <Column lg={16} md={8} sm={4} className="page-header">
        <div className="header-content">
          <div className="header-text">
            <Building size={32} className="page-icon" />
            <div>
              <Heading className="page-title">Commercial Properties</Heading>
              <p className="page-subtitle">
                Manage and monitor all commercial property insurance policies
              </p>
            </div>
          </div>
          <Button
            kind="primary"
            renderIcon={Add}
            onClick={() => navigate('/business/properties/add')}
          >
            Add Property
          </Button>
        </div>
      </Column>

      {/* Summary Stats */}
      <Column lg={4} md={2} sm={2}>
        <Tile className="summary-stat">
          <p className="summary-label">Total Properties</p>
          <h3 className="summary-value">{totalProperties}</h3>
          <p className="summary-detail">{activeCount} active</p>
        </Tile>
      </Column>

      <Column lg={4} md={2} sm={2}>
        <Tile className="summary-stat">
          <p className="summary-label">Monthly Premium</p>
          <h3 className="summary-value">{formatCurrency(totalMonthlyPremium, false)}</h3>
          <p className="summary-detail">{formatCurrency(totalYearlyPremium, false)}/year</p>
        </Tile>
      </Column>

      <Column lg={4} md={2} sm={2}>
        <Tile className="summary-stat">
          <p className="summary-label">Total Claims</p>
          <h3 className="summary-value">{totalClaims}</h3>
          <p className="summary-detail">{openClaims} currently open</p>
        </Tile>
      </Column>

      <Column lg={4} md={2} sm={2}>
        <Tile className="summary-stat">
          <p className="summary-label">Coverage</p>
          <h3 className="summary-value">
            {formatCurrency(filteredProperties.reduce((sum, p) => sum + p.coverageLimit, 0), false)}
          </h3>
          <p className="summary-detail">Total coverage limit</p>
        </Tile>
      </Column>

      {/* Search and Filters */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="filters-tile">
          <div className="filters-header">
            <Heading className="filters-title">Filter Properties</Heading>
            {activeFiltersCount > 0 && (
              <div className="filter-actions">
                <Tag type="blue" size="sm">{activeFiltersCount} active filter{activeFiltersCount > 1 ? 's' : ''}</Tag>
                <Button kind="ghost" size="sm" onClick={handleClearFilters}>
                  Clear all
                </Button>
              </div>
            )}
          </div>

          <div className="filters-grid">
            <Search
              size="lg"
              placeholder="Search by name, address, or city..."
              labelText="Search properties"
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              onClear={() => setSearchTerm('')}
            />

            <Dropdown
              id="status-filter"
              titleText="Status"
              label="Select status"
              items={statusItems}
              itemToString={(item) => item ? item.text : ''}
              selectedItem={statusItems.find(item => item.id === statusFilter)}
              onChange={({ selectedItem }) => setStatusFilter(selectedItem.id)}
            />

            <Dropdown
              id="city-filter"
              titleText="City"
              label="Select city"
              items={cityItems}
              itemToString={(item) => item ? item.text : ''}
              selectedItem={cityItems.find(item => item.id === cityFilter)}
              onChange={({ selectedItem }) => setCityFilter(selectedItem.id)}
            />

            <Dropdown
              id="property-type-filter"
              titleText="Property Type"
              label="Select property type"
              items={propertyTypeItems}
              itemToString={(item) => item ? item.text : ''}
              selectedItem={propertyTypeItems.find(item => item.id === propertyTypeFilter)}
              onChange={({ selectedItem }) => setPropertyTypeFilter(selectedItem.id)}
            />
          </div>
        </Tile>
      </Column>

      {/* Properties Table */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="data-tile">
          <div className="tile-header">
            <Heading className="tile-title">
              Properties ({filteredProperties.length})
            </Heading>
          </div>
          {filteredProperties.length > 0 ? (
            <PropertyTable properties={filteredProperties} />
          ) : (
            <div className="empty-state">
              <Building size={48} />
              <h4>No properties found</h4>
              <p>Try adjusting your filters or search term</p>
              <Button kind="tertiary" onClick={handleClearFilters}>
                Clear filters
              </Button>
            </div>
          )}
        </Tile>
      </Column>
    </Grid>
  );
}
