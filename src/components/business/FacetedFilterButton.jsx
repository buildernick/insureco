import React, { useState, useRef, useEffect } from 'react';
import { Checkbox } from '@carbon/react';
import { Filter, ChevronDown, ChevronRight } from '@carbon/icons-react';
import './FacetedFilterButton.scss';

/**
 * FacetedFilterButton - Cascading filter matching Figma design
 * 
 * Features:
 * - Collapsed button shows "Filter [Type]" with filter icon
 * - Expanded view has two panels:
 *   - Left: filter categories (Status, Vehicle Type, Department)
 *   - Right: checkboxes for selected category
 * - Click outside to close
 */
export default function FacetedFilterButton({
  label = 'Filter Vehicles',
  facets = [],
  selectedFilters = {},
  onFiltersChange,
  disabled = false
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFacet, setActiveFacet] = useState(null);
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

  // Toggle dropdown
  const handleToggle = () => {
    if (!disabled) {
      setIsOpen(!isOpen);
      if (!isOpen && facets.length > 0) {
        // Auto-select first facet when opening
        setActiveFacet(facets[0].key);
      } else if (isOpen) {
        setActiveFacet(null);
      }
    }
  };

  // Select a facet to show options
  const handleFacetClick = (facetKey) => {
    setActiveFacet(facetKey);
  };

  // Toggle checkbox for a specific option
  const handleOptionToggle = (facetKey, optionValue) => {
    const currentValues = selectedFilters[facetKey] || [];
    const updatedValues = currentValues.includes(optionValue)
      ? currentValues.filter(v => v !== optionValue)
      : [...currentValues, optionValue];
    
    const updatedFilters = {
      ...selectedFilters,
      [facetKey]: updatedValues
    };
    
    onFiltersChange(updatedFilters);
  };

  // Clear all filters for the active facet
  const handleClearAll = () => {
    if (!activeFacet) return;
    
    const updatedFilters = {
      ...selectedFilters,
      [activeFacet]: []
    };
    
    onFiltersChange(updatedFilters);
  };

  // Get active facet data
  const activeFacetData = facets.find(f => f.key === activeFacet);

  return (
    <div className="faceted-filter-button" ref={containerRef}>
      {/* Collapsed Button */}
      <button
        className={`filter-toggle-button ${isOpen ? 'active' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Filter size={16} className="filter-icon" />
        <span className="filter-label">{label}</span>
        <ChevronDown size={16} className="chevron-icon" />
      </button>

      {/* Cascading Filter Panel */}
      {isOpen && (
        <div className="filter-panel">
          {/* Left: Filter Categories */}
          <div className="filter-categories">
            <div className="categories-header">
              <span className="header-label">FILTER BY</span>
            </div>
            
            {facets.map((facet) => {
              const isActive = activeFacet === facet.key;
              const hasSelections = (selectedFilters[facet.key] || []).length > 0;
              
              return (
                <button
                  key={facet.key}
                  className={`category-item ${isActive ? 'active' : ''}`}
                  onClick={() => handleFacetClick(facet.key)}
                >
                  <span className="category-label">{facet.label}</span>
                  {isActive ? (
                    <ChevronRight size={16} className="category-icon" />
                  ) : (
                    <ChevronDown size={16} className="category-icon" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Right: Options for Active Category */}
          {activeFacetData && (
            <div className="filter-options">
              <div className="options-header">
                <span className="header-label">{activeFacetData.label}</span>
              </div>

              <div className="options-list">
                {activeFacetData.options.map((option) => {
                  const isChecked = (selectedFilters[activeFacet] || []).includes(option.value);
                  
                  return (
                    <div key={option.value} className="option-row">
                      <Checkbox
                        id={`filter-${activeFacet}-${option.value}`}
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

              <div className="options-footer">
                <button
                  className="clear-all-button"
                  onClick={handleClearAll}
                  disabled={(selectedFilters[activeFacet] || []).length === 0}
                >
                  Clear All
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
