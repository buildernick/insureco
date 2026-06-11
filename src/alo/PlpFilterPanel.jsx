import React, { useState } from 'react';
import './PlpFilterPanel.scss';

function ChevronIcon() {
  return (
    <svg viewBox="0 0 24 24" aria-hidden="true" className="alo-filter__chevron-svg">
      <path d="M16.59 8.59L12 13.17 7.41 8.59 6 10l6 6 6-6z" />
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
  return (
    <aside className="alo-filter-panel">
      <div className="alo-filter-panel__sticky">
        <div className="alo-filter-panel__header">
          <h6 className="alo-filter-panel__title">Filters</h6>
        </div>

        <div className="alo-filter-panel__groups">
          {groups.map((group) => (
            <FilterAccordion
              key={group.label}
              label={group.label}
              defaultOpen={group.defaultOpen}
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
          ))}
        </div>
      </div>
    </aside>
  );
}
