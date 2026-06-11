import React, { useState, useMemo } from 'react';
import './PlpFilterPanel.scss';

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="alo-filter__chevron-svg">
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
    </svg>
  );
}

function SearchIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="alo-filter-search__icon-svg">
      <path d="M15.5 14h-.79l-.28-.27A6.47 6.47 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14" />
    </svg>
  );
}

function FilterAccordion({ label, children, defaultOpen = false, forceOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);
  const isOpen = forceOpen || open;

  return (
    <div className={`alo-filter__section${isOpen ? ' alo-filter__section--open' : ''}`}>
      <button
        type="button"
        className="alo-filter__trigger"
        aria-expanded={isOpen}
        onClick={() => setOpen((v) => !v)}
      >
        <span className="alo-filter__trigger-label">{label}</span>
        <span className="alo-filter__chevron" aria-hidden="true">
          <ChevronIcon />
        </span>
      </button>

      <div className="alo-filter__panel">
        <div className="alo-filter__panel-inner">
          {children}
        </div>
      </div>
    </div>
  );
}

function FilterCheckbox({ id, value, label, swatch, checked, onChange }) {
  return (
    <label
      className={`alo-filter__option${checked ? ' alo-filter__option--checked' : ''}`}
      htmlFor={id}
    >
      <input
        type="checkbox"
        id={id}
        value={value}
        checked={checked}
        onChange={() => onChange(value)}
        className="alo-filter__checkbox"
      />
      <span className="alo-filter__check-mark" aria-hidden="true" />
      {swatch && (
        <span
          className="alo-filter__swatch"
          style={{ backgroundColor: swatch }}
          aria-hidden="true"
        />
      )}
      <span className="alo-filter__option-label">{label}</span>
    </label>
  );
}

export default function PlpFilterPanel({ groups = [], selectedColors = [], onColorToggle }) {
  const [query, setQuery] = useState('');
  const trimmed = query.trim().toLowerCase();

  const filteredGroups = useMemo(() => {
    if (!trimmed) return groups;
    return groups
      .map((group) => {
        const groupMatches = group.label.toLowerCase().includes(trimmed);
        const matchingOptions = group.options.filter((opt) =>
          opt.label.toLowerCase().includes(trimmed) ||
          opt.value.toLowerCase().includes(trimmed)
        );
        if (groupMatches) return group;
        if (matchingOptions.length > 0) return { ...group, options: matchingOptions };
        return null;
      })
      .filter(Boolean);
  }, [groups, trimmed]);

  return (
    <aside className="alo-filter-panel">
      <div className="alo-filter-panel__sticky">
        <div className="alo-filter-panel__header">
          <h6 className="alo-filter-panel__title">Filters</h6>
        </div>

        <div className="alo-filter-search">
          <span className="alo-filter-search__icon">
            <SearchIcon />
          </span>
          <input
            type="search"
            className="alo-filter-search__input"
            placeholder="Search filters"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            aria-label="Search filters"
          />
          {query && (
            <button
              type="button"
              className="alo-filter-search__clear"
              onClick={() => setQuery('')}
              aria-label="Clear search"
            >
              ×
            </button>
          )}
        </div>

        <div className="alo-filter-panel__groups">
          {filteredGroups.length === 0 ? (
            <p className="alo-filter-panel__no-results">No filters match &ldquo;{query}&rdquo;</p>
          ) : (
            filteredGroups.map((group) => (
              <FilterAccordion
                key={group.label}
                label={group.label}
                defaultOpen={group.defaultOpen}
                forceOpen={!!trimmed}
              >
                <div className="alo-filter__options">
                  {group.options.map((opt) => (
                    <FilterCheckbox
                      key={opt.value}
                      id={`filter-${group.label}-${opt.value}`}
                      value={opt.value}
                      label={opt.label}
                      swatch={opt.swatch}
                      checked={selectedColors.includes(opt.value)}
                      onChange={onColorToggle}
                    />
                  ))}
                </div>
              </FilterAccordion>
            ))
          )}
        </div>
      </div>
    </aside>
  );
}
