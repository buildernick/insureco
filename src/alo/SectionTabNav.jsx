import React from 'react';
import './SectionTabNav.scss';

export default function SectionTabNav({ tabs = [] }) {
  return (
    <nav className="alo-section-tab-nav">
      {tabs.map((tab) =>
        tab.active ? (
          <div key={tab.label} className="alo-section-tab-nav__tab alo-section-tab-nav__tab--active">
            <span>{tab.label}</span>
          </div>
        ) : (
          <a key={tab.label} href={tab.href} className="alo-section-tab-nav__tab alo-section-tab-nav__tab--inactive">
            <span>{tab.label}</span>
          </a>
        )
      )}
    </nav>
  );
}
