import React, { useState } from 'react';
import { ChevronDown, ChevronUp } from '@carbon/icons-react';
import './EstimatedQuote.scss';

/**
 * EstimatedQuote
 *
 * Renders a live estimated monthly quote card beneath the progress bar.
 *
 * Props:
 *   estimate  – return value from quoteEstimator(), or null
 */
export default function EstimatedQuote({ estimate }) {
  const [expanded, setExpanded] = useState(false);

  if (!estimate) return null;

  const { monthly, low, high, breakdown } = estimate;
  const hasPrecisePrice = typeof monthly === 'number';

  return (
    <div className="estimated-quote" aria-live="polite" aria-atomic="true">
      <div className="estimated-quote__header">
        <span className="estimated-quote__label">Your Estimated Quote</span>
        {hasPrecisePrice && breakdown?.length > 0 && (
          <button
            type="button"
            className="estimated-quote__toggle"
            onClick={() => setExpanded(prev => !prev)}
            aria-expanded={expanded}
            aria-controls="eq-breakdown"
          >
            {expanded ? 'Hide breakdown' : 'See breakdown'}
            {expanded ? <ChevronUp size={16} /> : <ChevronDown size={16} />}
          </button>
        )}
      </div>

      {hasPrecisePrice ? (
        <p className="estimated-quote__price" key={monthly}>
          <span className="estimated-quote__currency">$</span>
          {monthly.toLocaleString()}
          <span className="estimated-quote__period">/mo</span>
        </p>
      ) : (
        <p className="estimated-quote__range" key={`${low}-${high}`}>
          <span className="estimated-quote__currency">$</span>
          {low}–{high}
          <span className="estimated-quote__period">/mo</span>
        </p>
      )}

      {!hasPrecisePrice && (
        <p className="estimated-quote__hint">
          Preliminary estimate · finalizes when you choose coverage &amp; deductible
        </p>
      )}

      {hasPrecisePrice && expanded && breakdown?.length > 0 && (
        <ul id="eq-breakdown" className="estimated-quote__breakdown">
          {breakdown.map((item, i) => (
            <li key={i} className={`estimated-quote__breakdown-item estimated-quote__breakdown-item--${item.type}`}>
              <span className="estimated-quote__breakdown-label">{item.label}</span>
              <span className="estimated-quote__breakdown-amount">
                {item.amount >= 0 ? '+' : ''}${Math.abs(item.amount)}/mo
              </span>
            </li>
          ))}
          <li className="estimated-quote__breakdown-item estimated-quote__breakdown-item--total">
            <span className="estimated-quote__breakdown-label">Estimated total</span>
            <span className="estimated-quote__breakdown-amount">${monthly}/mo</span>
          </li>
        </ul>
      )}

      <p className="estimated-quote__disclaimer">
        Final price confirmed after underwriting review. No obligation.
      </p>
    </div>
  );
}
