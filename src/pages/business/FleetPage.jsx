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
import { Add, CarFront } from '@carbon/icons-react';
import FleetTable from '../../components/business/FleetTable';
import { mockVehicles } from '../../data/businessMockData';
import { formatCurrency } from '../../utils/businessHelpers';
import './FleetPage.scss';

/**
 * FleetPage - Full fleet list with search and filter
 * Displays all fleet vehicles with filtering capabilities
 */
export default function FleetPage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [statusFilter, setStatusFilter] = useState('all');
  const [vehicleTypeFilter, setVehicleTypeFilter] = useState('all');
  const [departmentFilter, setDepartmentFilter] = useState('all');

  // Extract unique values for filters
  const uniqueVehicleTypes = useMemo(() => {
    const types = [...new Set(mockVehicles.map(v => v.vehicleType))];
    return types.sort();
  }, []);

  const uniqueDepartments = useMemo(() => {
    const departments = [...new Set(mockVehicles.map(v => v.department))];
    return departments.sort();
  }, []);

  const uniqueStatuses = useMemo(() => {
    const statuses = [...new Set(mockVehicles.map(v => v.status))];
    return statuses.sort();
  }, []);

  // Filter vehicles based on search and filters
  const filteredVehicles = useMemo(() => {
    return mockVehicles.filter(vehicle => {
      // Search filter
      const searchMatch = searchTerm === '' || 
        vehicle.make.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.model.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.vin.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.licensePlate.toLowerCase().includes(searchTerm.toLowerCase()) ||
        vehicle.assignedDriver.toLowerCase().includes(searchTerm.toLowerCase());

      // Status filter
      const statusMatch = statusFilter === 'all' || vehicle.status === statusFilter;

      // Vehicle type filter
      const vehicleTypeMatch = vehicleTypeFilter === 'all' || vehicle.vehicleType === vehicleTypeFilter;

      // Department filter
      const departmentMatch = departmentFilter === 'all' || vehicle.department === departmentFilter;

      return searchMatch && statusMatch && vehicleTypeMatch && departmentMatch;
    });
  }, [searchTerm, statusFilter, vehicleTypeFilter, departmentFilter]);

  // Calculate summary stats for filtered results
  const totalVehicles = filteredVehicles.length;
  const totalMonthlyPremium = filteredVehicles.reduce((sum, v) => sum + v.monthlyPremium, 0);
  const totalYearlyPremium = filteredVehicles.reduce((sum, v) => sum + v.yearlyPremium, 0);
  const activeCount = filteredVehicles.filter(v => v.status === 'Active').length;
  const totalClaims = filteredVehicles.reduce((sum, v) => sum + v.claimsCount, 0);
  const openClaims = filteredVehicles.reduce((sum, v) => sum + v.openClaims, 0);

  // Prepare dropdown items
  const statusItems = [
    { id: 'all', text: 'All Statuses' },
    ...uniqueStatuses.map(status => ({ id: status, text: status }))
  ];

  const vehicleTypeItems = [
    { id: 'all', text: 'All Vehicle Types' },
    ...uniqueVehicleTypes.map(type => ({ id: type, text: type }))
  ];

  const departmentItems = [
    { id: 'all', text: 'All Departments' },
    ...uniqueDepartments.map(dept => ({ id: dept, text: dept }))
  ];

  const handleClearFilters = () => {
    setSearchTerm('');
    setStatusFilter('all');
    setVehicleTypeFilter('all');
    setDepartmentFilter('all');
  };

  const activeFiltersCount = [statusFilter, vehicleTypeFilter, departmentFilter].filter(f => f !== 'all').length + (searchTerm ? 1 : 0);

  return (
    <Grid fullWidth className="fleet-page">
      {/* Header Section */}
      <Column lg={16} md={8} sm={4} className="page-header">
        <div className="header-content">
          <div className="header-text">
            <CarFront size={32} className="page-icon" />
            <div>
              <Heading className="page-title">Fleet Management</Heading>
              <p className="page-subtitle">
                Manage and monitor all commercial fleet vehicle insurance policies
              </p>
            </div>
          </div>
          <Button
            kind="primary"
            renderIcon={Add}
            onClick={() => navigate('/business/fleet/add')}
          >
            Add Vehicle
          </Button>
        </div>
      </Column>

      {/* Summary Stats */}
      <Column lg={4} md={2} sm={2}>
        <Tile className="summary-stat">
          <p className="summary-label">Total Vehicles</p>
          <h3 className="summary-value">{totalVehicles}</h3>
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
            {formatCurrency(filteredVehicles.reduce((sum, v) => sum + v.coverageLimit, 0), false)}
          </h3>
          <p className="summary-detail">Total coverage limit</p>
        </Tile>
      </Column>

      {/* Search and Filters */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="filters-tile">
          <div className="filters-header">
            <Heading className="filters-title">Filter Vehicles</Heading>
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
              placeholder="Search by make, model, VIN, plate, or driver..."
              labelText="Search vehicles"
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
              id="vehicle-type-filter"
              titleText="Vehicle Type"
              label="Select vehicle type"
              items={vehicleTypeItems}
              itemToString={(item) => item ? item.text : ''}
              selectedItem={vehicleTypeItems.find(item => item.id === vehicleTypeFilter)}
              onChange={({ selectedItem }) => setVehicleTypeFilter(selectedItem.id)}
            />

            <Dropdown
              id="department-filter"
              titleText="Department"
              label="Select department"
              items={departmentItems}
              itemToString={(item) => item ? item.text : ''}
              selectedItem={departmentItems.find(item => item.id === departmentFilter)}
              onChange={({ selectedItem }) => setDepartmentFilter(selectedItem.id)}
            />
          </div>
        </Tile>
      </Column>

      {/* Fleet Table */}
      <Column lg={16} md={8} sm={4}>
        <Tile className="data-tile">
          <div className="tile-header">
            <Heading className="tile-title">
              Fleet Vehicles ({filteredVehicles.length})
            </Heading>
          </div>
          {filteredVehicles.length > 0 ? (
            <FleetTable vehicles={filteredVehicles} />
          ) : (
            <div className="empty-state">
              <CarFront size={48} />
              <h4>No vehicles found</h4>
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
