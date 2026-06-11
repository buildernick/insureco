import React, { useState, useId } from 'react';
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
    <svg viewBox="0 0 24 24" aria-hidden="true" className="alo-filter-search__icon">
      <path d="M15.5 14h-.79l-.28-.27A6.471 6.471 0 0 0 16 9.5 6.5 6.5 0 1 0 9.5 16c1.61 0 3.09-.59 4.23-1.57l.27.28v.79l5 4.99L20.49 19l-4.99-5zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z" />
    </svg>
  );
}

function ClearIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="alo-filter-search__clear-icon">
      <path d="M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z" />
    </svg>
  );
}

function FilterAccordion({ label, children, defaultOpen = false }) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className={`alo-filter__section${open ? ' alo-filter__section--open' : ''}`}>
      <button
        type="button"
        className="alo-filter__trigger"
        aria-expanded={open}
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
  const searchId = useId();
  const trimmed = query.trim().toLowerCase();

  const filteredGroups = trimmed
    ? groups
        .map((group) => ({
          ...group,
          options: group.options.filter((opt) =>
            opt.label.toLowerCase().includes(trimmed)
          ),
        }))
        .filter((group) => group.options.length > 0)
    : groups;

  const totalMatches = filteredGroups.reduce((sum, g) => sum + g.options.length, 0);

  return (
    <aside className="alo-filter-panel">
      <div className="alo-filter-panel__sticky">
        <div className="alo-filter-panel__header">
          <h6 className="alo-filter-panel__title">Filters</h6>
        </div>

        <div className="alo-filter-search">
          <label htmlFor={searchId} className="alo-filter-search__label">Search filters</label>
          <div className="alo-filter-search__field">
            <SearchIcon />
            <input
              id={searchId}
              type="search"
              className="alo-filter-search__input"
              placeholder="Search filters…"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              autoComplete="off"
            />
            {query && (
              <button
                type="button"
                className="alo-filter-search__clear"
                onClick={() => setQuery('')}
                aria-label="Clear filter search"
              >
                <ClearIcon />
              </button>
            )}
          </div>
        </div>

        <div className="alo-filter-panel__groups">
          {filteredGroups.length > 0 ? (
            filteredGroups.map((group) => (
              <FilterAccordion
                key={group.label}
                label={group.label}
                defaultOpen={group.defaultOpen || !!trimmed}
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
          ) : (
            <p className="alo-filter-search__no-results">
              No filters match &ldquo;{query}&rdquo;
            </p>
          )}
        </div>
      </div>
    </aside>
  );
}
