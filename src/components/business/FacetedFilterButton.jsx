import React, { useState, useRef, useEffect } from 'react';
import { Checkbox } from '@carbon/react';
import { Filter, ChevronDown, ChevronRight } from '@carbon/icons-react';
import './FacetedFilterButton.scss';

/**
 * FacetedFilterButton - Cascading filter matching Figma design
 *
 * Features:
 * - Collapsed button shows "Filter [Type]" with filter icon and chevron
 * - Expanded view has three panels:
 *   - Left: filter categories (with down/right chevrons)
 *   - Middle: checkboxes for selected category with item counts
 *   - Right: "Clear All" action column
 * - Click outside to close
 *
 * Props:
 * - label: string — trigger button label (default: 'Filter Vehicles')
 * - facets: Array<{ key, label, options: Array<{ value, label, count? }> }>
 * - selectedFilters: { [facetKey]: string[] }
 * - onFiltersChange: (updatedFilters) => void
 * - disabled: boolean
 */
export default function FacetedFilterButton({
  label = 'Filter Vehicles',
  facets = [],
  selectedFilters = {},
  onFiltersChange,
  disabled = false,
}) {
  const [isOpen, setIsOpen] = useState(false);
  const [activeFacet, setActiveFacet] = useState(null);
  const containerRef = useRef(null);

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

  const handleToggle = () => {
    if (!disabled) {
      const opening = !isOpen;
      setIsOpen(opening);
      if (opening && facets.length > 0) {
        setActiveFacet(facets[0].key);
      } else {
        setActiveFacet(null);
      }
    }
  };

  const handleFacetClick = (facetKey) => {
    setActiveFacet(facetKey);
  };

  const handleOptionToggle = (facetKey, optionValue) => {
    const currentValues = selectedFilters[facetKey] || [];
    const updatedValues = currentValues.includes(optionValue)
      ? currentValues.filter((v) => v !== optionValue)
      : [...currentValues, optionValue];

    onFiltersChange?.({ ...selectedFilters, [facetKey]: updatedValues });
  };

  const handleClearAll = () => {
    if (!activeFacet) return;
    onFiltersChange?.({ ...selectedFilters, [activeFacet]: [] });
  };

  const activeFacetData = facets.find((f) => f.key === activeFacet);
  const activeSelectionCount = activeFacet ? (selectedFilters[activeFacet] || []).length : 0;

  return (
    <div className="faceted-filter" ref={containerRef}>
      {/* Collapsed trigger button */}
      <button
        className={`faceted-filter__trigger ${isOpen ? 'faceted-filter__trigger--open' : ''}`}
        onClick={handleToggle}
        disabled={disabled}
        aria-expanded={isOpen}
        aria-haspopup="true"
      >
        <Filter size={16} className="faceted-filter__trigger-icon" />
        <span className="faceted-filter__trigger-label">{label}</span>
        <ChevronDown size={16} className="faceted-filter__trigger-chevron" />
      </button>

      {/* Expanded filter panel */}
      {isOpen && (
        <div className="faceted-filter__panel" role="dialog" aria-label="Filter options">
          {/* Left: category list */}
          <div className="faceted-filter__categories">
            <div className="faceted-filter__panel-header">
              <span className="faceted-filter__panel-header-label">FILTER BY</span>
            </div>

            {facets.map((facet) => {
              const isActive = activeFacet === facet.key;
              return (
                <button
                  key={facet.key}
                  className={`faceted-filter__category-btn ${isActive ? 'faceted-filter__category-btn--active' : ''}`}
                  onClick={() => handleFacetClick(facet.key)}
                  aria-pressed={isActive}
                >
                  <span className="faceted-filter__category-label">{facet.label}</span>
                  {isActive ? (
                    <ChevronRight size={16} className="faceted-filter__category-chevron" />
                  ) : (
                    <ChevronDown size={16} className="faceted-filter__category-chevron" />
                  )}
                </button>
              );
            })}
          </div>

          {/* Middle: options for active category */}
          {activeFacetData && (
            <div className="faceted-filter__options">
              <div className="faceted-filter__panel-header">
                <span className="faceted-filter__panel-header-label">{activeFacetData.label}</span>
              </div>

              <div className="faceted-filter__options-list">
                {activeFacetData.options.map((option) => {
                  const isChecked = (selectedFilters[activeFacet] || []).includes(option.value);
                  return (
                    <div key={option.value} className="faceted-filter__option-row">
                      <Checkbox
                        id={`filter-${activeFacet}-${option.value}`}
                        labelText={option.label}
                        checked={isChecked}
                        onChange={() => handleOptionToggle(activeFacet, option.value)}
                      />
                      {option.count !== undefined && (
                        <span className="faceted-filter__option-count">({option.count})</span>
                      )}
                    </div>
                  );
                })}
              </div>
            </div>
          )}

          {/* Right: Clear All column */}
          {activeFacetData && (
            <div className="faceted-filter__clear-col">
              <button
                className="faceted-filter__clear-btn"
                onClick={handleClearAll}
                disabled={activeSelectionCount === 0}
                aria-label={`Clear all ${activeFacetData.label} filters`}
              >
                Clear All
              </button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
