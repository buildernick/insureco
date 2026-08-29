import React, { useState } from 'react';
import FacetedFilterButton from '../components/business/FacetedFilterButton';

export default {
  title: 'Components/CascadingFilter',
  component: FacetedFilterButton,
};

// ─── Shared data ────────────────────────────────────────────────────────────

const vehicleFacets = [
  {
    key: 'status',
    label: 'Status',
    options: [
      { value: 'active', label: 'Alive', count: 42 },
      { value: 'inactive', label: 'Inactive', count: 8 },
      { value: 'pending', label: 'Pending', count: 5 },
    ],
  },
  {
    key: 'vehicleType',
    label: 'Vehicle Type',
    options: [
      { value: 'box-truck', label: 'Box Truck', count: 13 },
      { value: 'cargo-van', label: 'Cargo Van', count: 13 },
      { value: 'compact-van', label: 'Compact Van', count: 13 },
      { value: 'cutaway-van', label: 'Cutaway Van', count: 13 },
      { value: 'heavy-duty-van', label: 'Heavy Duty Van', count: 13 },
      { value: 'passenger-van', label: 'Passenger Van', count: 13 },
      { value: 'pickup-truck', label: 'Pickup Truck', count: 13 },
      { value: 'suv', label: 'SUV', count: 13 },
      { value: 'semi-truck', label: 'Semi Truck', count: 13 },
    ],
  },
  {
    key: 'department',
    label: 'Department',
    options: [
      { value: 'logistics', label: 'Logistics', count: 24 },
      { value: 'sales', label: 'Sales', count: 18 },
      { value: 'ops', label: 'Operations', count: 13 },
    ],
  },
];

// ─── Wrapper that manages state ──────────────────────────────────────────────

function FilterDemo({ label, facets, initialFilters = {} }) {
  const [selectedFilters, setSelectedFilters] = useState(initialFilters);

  const activeCount = Object.values(selectedFilters).flat().length;

  return (
    <div style={{ padding: '2rem', display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
      <FacetedFilterButton
        label={label}
        facets={facets}
        selectedFilters={selectedFilters}
        onFiltersChange={setSelectedFilters}
      />

      {activeCount > 0 && (
        <div style={{ fontSize: '13px', color: '#525252' }}>
          <strong>{activeCount}</strong> filter{activeCount !== 1 ? 's' : ''} selected:{' '}
          {Object.entries(selectedFilters)
            .filter(([, vals]) => vals.length > 0)
            .map(([key, vals]) => `${key}: ${vals.join(', ')}`)
            .join(' | ')}
        </div>
      )}
    </div>
  );
}

// ─── Stories ─────────────────────────────────────────────────────────────────

/** Default: vehicle filter matching the Figma design */
export const Default = () => (
  <FilterDemo label="Filter Vehicles" facets={vehicleFacets} />
);

/** Pre-selected filters — shows the Clear All button as active */
export const WithSelections = () => (
  <FilterDemo
    label="Filter Vehicles"
    facets={vehicleFacets}
    initialFilters={{
      vehicleType: ['box-truck', 'cargo-van'],
      status: ['active'],
    }}
  />
);

/** Single facet — only one category available */
export const SingleFacet = () => (
  <FilterDemo
    label="Filter by Type"
    facets={[vehicleFacets[1]]}
  />
);

/** Disabled state — trigger button is not interactive */
export const Disabled = () => (
  <div style={{ padding: '2rem' }}>
    <FacetedFilterButton
      label="Filter Vehicles"
      facets={vehicleFacets}
      selectedFilters={{}}
      onFiltersChange={() => {}}
      disabled
    />
  </div>
);

/** Custom label — shows the component with a different domain */
export const CustomLabel = () => (
  <FilterDemo
    label="Filter Policies"
    facets={[
      {
        key: 'policyType',
        label: 'Policy Type',
        options: [
          { value: 'auto', label: 'Auto', count: 34 },
          { value: 'home', label: 'Home', count: 22 },
          { value: 'life', label: 'Life', count: 11 },
          { value: 'umbrella', label: 'Umbrella', count: 5 },
        ],
      },
      {
        key: 'coverage',
        label: 'Coverage Level',
        options: [
          { value: 'basic', label: 'Basic', count: 27 },
          { value: 'standard', label: 'Standard', count: 30 },
          { value: 'premium', label: 'Premium', count: 15 },
        ],
      },
    ]}
  />
);
