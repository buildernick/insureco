import React, { useState, useRef, useEffect } from 'react';
import { Button, Checkbox, Tag } from '@carbon/react';
import { ChevronDown, Filter, Checkmark } from '@carbon/icons-react';
import './FacetedFilterButton.scss';

/**
 * FacetedFilterButton - Cascading filter with facets and multiselect
 * 
 * Two-level dropdown:
 * 1. Click button → shows facet menu (Status, Type, etc.)
 * 2. Click facet → shows multiselect panel with checkboxes
 * 3. Click Apply → applies filters
 */
export default function FacetedFilterButton({
  label,
  facets = [],
  selectedFilters = {},
  onFiltersChange,
  disabled = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFacet, setActiveFacet] = useState(null);
  const [pendingFilters, setPendingFilters] = useState(selectedFilters);
  const containerRef = useRef(null);

  // Close dropdown when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (containerRef.current && !containerRef.current.contains(event.target)) {
        setIsOpen(false);
        setActiveFacet(null);
      }
    }

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      return () => document.removeEventListener('mousedown', handleClickOutside);
    }
  }, [isOpen]);

  // Reset pending filters when dropdown closes
  useEffect(() => {
    if (!isOpen) {
      setPendingFilters(selectedFilters);
      setActiveFacet(null);
    }
  }, [isOpen, selectedFilters]);

  // Count total applied filters (shown on button badge)
  const appliedFilterCount = Object.values(selectedFilters).reduce(
    (sum, values) => sum + values.length,
    0
  );

  // Toggle dropdown
  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  // Select a facet to show options
  const handleFacetClick = (facetKey) => {
    setActiveFacet(activeFacet === facetKey ? null : facetKey);
  };

  // Toggle checkbox for a specific option
  const handleOptionToggle = (facetKey, optionValue) => {
    const updatedFilters = {
      ...pendingFilters,
      [facetKey]: pendingFilters[facetKey]?.includes(optionValue)
        ? pendingFilters[facetKey].filter(v => v !== optionValue)
        : [...(pendingFilters[facetKey] || []), optionValue]
    };
    setPendingFilters(updatedFilters);
    onFiltersChange(updatedFilters);
  };

  // Clear all filters
  const handleClear = () => {
    const clearedFilters = Object.keys(pendingFilters).reduce((acc, key) => {
      acc[key] = [];
      return acc;
    }, {});
    setPendingFilters(clearedFilters);
    onFiltersChange(clearedFilters);
  };

  // Count pending filters (for "Apply" button)
  const pendingFilterCount = Object.values(pendingFilters).reduce(
    (sum, values) => sum + values.length,
    0
  );

  return (
    <div className="faceted-filter-button" ref={containerRef}>
      <Button
        kind="tertiary"
        size="md"
        renderIcon={ChevronDown}
        iconDescription="Filter options"
        onClick={handleToggle}
        disabled={disabled}
        className={isOpen ? 'filter-button-active' : ''}
      >
        <Filter size={16} />
        <span className="filter-label">{label}</span>
        {appliedFilterCount > 0 && (
          <Tag type="blue" size="sm" className="filter-count">
            {appliedFilterCount}
          </Tag>
        )}
      </Button>

      {isOpen && (
        <div className="filter-dropdown">
          {/* Facet Menu */}
          <div className="facet-menu">
            <div className="facet-menu-header">
              <span>Filter by</span>
            </div>
            {facets.map((facet) => {
              const facetFilterCount = (pendingFilters[facet.key] || []).length;
              return (
                <button
                  key={facet.key}
                  className={`facet-item ${activeFacet === facet.key ? 'active' : ''}`}
                  onClick={() => handleFacetClick(facet.key)}
                >
                  <span>{facet.label}</span>
                  {facetFilterCount > 0 && (
                    <Tag type="blue" size="sm">
                      {facetFilterCount}
                    </Tag>
                  )}
                  <ChevronDown size={16} className="facet-arrow" />
                </button>
              );
            })}
          </div>

          {/* Options Panel (shown when facet is selected) */}
          {activeFacet && (
            <div className="options-panel">
              <div className="options-header">
                <span>{facets.find(f => f.key === activeFacet)?.label}</span>
                {(pendingFilters[activeFacet] || []).length > 0 && (
                  <Button
                    kind="ghost"
                    size="sm"
                    onClick={() => {
                      const updated = { ...pendingFilters, [activeFacet]: [] };
                      setPendingFilters(updated);
                      onFiltersChange(updated);
                    }}
                  >
                    Clear
                  </Button>
                )}
              </div>

              <div className="options-list">
                {facets
                  .find(f => f.key === activeFacet)
                  ?.options.map((option) => {
                    const isChecked = (pendingFilters[activeFacet] || []).includes(option.value);
                    return (
                      <div key={option.value} className="option-item">
                        <Checkbox
                          id={`${activeFacet}-${option.value}`}
                          labelText={option.label}
                          checked={isChecked}
                          onChange={() => handleOptionToggle(activeFacet, option.value)}
                        />
                        {option.count !== undefined && (
                          <span className="option-count">({option.count})</span>
                        )}
                      </div>
                    );
                  })}
              </div>
            </div>
          )}

          {/* Actions Footer */}
          <div className="filter-actions">
            <Button
              kind="ghost"
              size="sm"
              onClick={handleClear}
              disabled={pendingFilterCount === 0}
            >
              Clear all
            </Button>
          </div>
        </div>
      )}
    </div>
  );
}
