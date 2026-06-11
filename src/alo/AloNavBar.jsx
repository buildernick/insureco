import React, { useState, useRef, useCallback } from 'react';
import { NAV_ITEMS } from './alo-nav-data';
import './AloNavBar.scss';

// ─── ALO wordmark SVG ────────────────────────────────────────────────────────
function AloLogo({ className }) {
  return (
    <svg
      viewBox="0 0 71 48"
      width="71"
      height="48"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="ALO"
    >
      <path d="M22.826 19.591h5.771v27.43h-5.77v-1.928A13.973 13.973 0 0114.298 48C6.414 48 0 41.409 0 33.306c0-8.103 6.414-14.694 14.299-14.694 3.193 0 6.145 1.082 8.527 2.907zm-.145 13.715c0-4.861-3.76-8.816-8.382-8.816-4.623 0-8.382 3.955-8.382 8.816 0 4.862 3.76 8.816 8.382 8.816s8.382-3.954 8.382-8.816zM39.434 47.02h-5.906V0h5.906zm2.969-13.714c0-8.103 6.414-14.694 14.298-14.694C64.586 18.612 71 25.203 71 33.306 71 41.41 64.586 48 56.701 48s-14.298-6.591-14.298-14.694zm5.916 0c0 4.862 3.76 8.816 8.382 8.816 4.623 0 8.382-3.954 8.382-8.816 0-4.861-3.76-8.816-8.382-8.816s-8.382 3.955-8.382 8.816z" />
    </svg>
  );
}

// ─── Right-side icon SVGs ─────────────────────────────────────────────────────
function SearchIcon() {
  return (
    <svg width="20" height="20" viewBox="0 0 20 21" fill="none" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
      <path d="M.6 7.493C.6 3.417 3.84.113 7.835.113c3.996 0 7.236 3.304 7.236 7.38a7.434 7.434 0 0 1-2.002 5.097c.044.027.086.06.124.098l6.017 6.017a.66.66 0 1 1-.933.933L12.26 13.62a.659.659 0 0 1-.132-.187 7.11 7.11 0 0 1-4.293 1.44C3.84 14.873.6 11.568.6 7.493zm13.366 0c0-3.453-2.745-6.253-6.13-6.253-3.387 0-6.131 2.8-6.131 6.253 0 3.454 2.744 6.254 6.13 6.254 3.386 0 6.131-2.8 6.131-6.254z" fill="#000" />
    </svg>
  );
}

function UserIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="17" fill="none" aria-hidden="true">
      <path fillRule="evenodd" clipRule="evenodd" d="M9 7a3 3 0 1 0 0-6 3 3 0 0 0 0 6zm0 1a4 4 0 1 0 0-8 4 4 0 0 0 0 8z" fill="#000" />
      <path d="M7 11h4c2.761 0 6 2.239 6 5v1h1v-1c0-3.314-3.686-6-7-6H7c-3.314 0-7 2.686-7 6v1h1v-1c0-2.761 3.239-5 6-5z" fill="#000" />
    </svg>
  );
}

function WishlistIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" fill="none" viewBox="0 0 14 13" aria-hidden="true">
      <path fill="#000" fillRule="evenodd" d="M3.472.758C2.11.991.737 2.278.737 4.702c0 .875.374 1.784.975 2.674.6.887 1.405 1.728 2.221 2.458.815.729 1.632 1.34 2.245 1.768a24 24 0 0 0 .822.55l.082-.053a24.342 24.342 0 0 0 2.985-2.265c.816-.73 1.622-1.57 2.22-2.458.602-.89.976-1.799.976-2.674 0-2.425-1.373-3.71-2.735-3.944a2.589 2.589 0 0 0-1.962.438c-.569.409-1.031 1.1-1.202 2.12h-.728c-.17-1.019-.633-1.711-1.202-2.12A2.588 2.588 0 0 0 3.472.758" clipRule="evenodd" />
    </svg>
  );
}

function CartIcon() {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" width="18" height="24" aria-hidden="true">
      <path d="M17.54 5.424a.47.47 0 0 1 .46.474v17.627a.47.47 0 0 1-.46.475H.46a.47.47 0 0 1-.46-.475V5.898a.47.47 0 0 1 .46-.474h4.795v-1.56C5.255 1.733 6.935 0 9 0c2.065 0 3.745 1.733 3.745 3.864v1.56zm-11.365 0h5.64v-1.56c0-1.608-1.264-2.915-2.82-2.915-1.555 0-2.82 1.307-2.82 2.915zm10.905.949h-4.335V8.61a.47.47 0 0 1-.46.475.47.47 0 0 1-.46-.475V6.373h-5.65V8.61a.47.47 0 0 1-.46.475.47.47 0 0 1-.46-.475V6.373H.92V23.05h16.16z" />
    </svg>
  );
}

// ─── Mega menu content renderers ──────────────────────────────────────────────
function MultiColumnMenu({ columns }) {
  return (
    <div className="alo-dropdown__columns">
      {columns.map((col, i) => (
        <div
          key={col.heading}
          className={`alo-dropdown__col${i === 0 ? ' alo-dropdown__col--first' : ''}`}
        >
          {col.headingHref ? (
            <a href={col.headingHref} className="alo-dropdown__col-heading alo-dropdown__col-heading--link">
              {col.heading}
            </a>
          ) : (
            <span className="alo-dropdown__col-heading">{col.heading}</span>
          )}
          <ul className="alo-dropdown__col-list">
            {col.links.map((link) => (
              <li key={link.label} className="alo-dropdown__col-item">
                <a href={link.href} className="alo-dropdown__col-link">{link.label}</a>
              </li>
            ))}
          </ul>
        </div>
      ))}
    </div>
  );
}

function FeaturedMenu({ linkColumn, featured }) {
  return (
    <div className="alo-dropdown__featured-layout">
      <div className="alo-dropdown__col alo-dropdown__col--first">
        <a href={linkColumn.headingHref} className="alo-dropdown__col-heading alo-dropdown__col-heading--link">
          {linkColumn.heading}
        </a>
        <ul className="alo-dropdown__col-list">
          {linkColumn.links.map((link) => (
            <li key={link.label} className="alo-dropdown__col-item">
              <a href={link.href} className="alo-dropdown__col-link">{link.label}</a>
            </li>
          ))}
        </ul>
      </div>
      <div className="alo-dropdown__featured-images">
        {featured.map((item) => (
          <div key={item.name} className="alo-dropdown__featured-item">
            <a href={item.href} className="alo-dropdown__featured-img-link">
              <img
                src={item.img}
                alt={item.alt}
                className="alo-dropdown__featured-img"
                loading="lazy"
              />
            </a>
            <a href={item.href} className="alo-dropdown__featured-name">{item.name}</a>
          </div>
        ))}
      </div>
    </div>
  );
}

// ─── Main component ───────────────────────────────────────────────────────────
export default function AloNavBar() {
  const [activeItem, setActiveItem] = useState(null);
  const hideTimer = useRef(null);

  const showMenu = useCallback((label) => {
    if (hideTimer.current) clearTimeout(hideTimer.current);
    setActiveItem(label);
  }, []);

  const hideMenu = useCallback(() => {
    hideTimer.current = setTimeout(() => setActiveItem(null), 80);
  }, []);

  return (
    <nav className="alo-nav" aria-label="ALO main navigation">
      <div className="alo-nav__bar">
        {/* ── Left: logo + nav links ── */}
        <div className="alo-nav__left">
          <a href="https://www.aloyoga.com/" className="alo-nav__logo-link">
            <AloLogo className="alo-nav__logo" />
          </a>

          <ul className="alo-nav__links" role="navigation">
            {NAV_ITEMS.map((item) => (
              <li
                key={item.label}
                className="alo-nav__item"
                onMouseEnter={() => showMenu(item.label)}
                onMouseLeave={hideMenu}
              >
                <a href={item.href} className="alo-nav__link">
                  {item.label}
                  {item.badge && (
                    <span className="alo-nav__badge">{item.badge}</span>
                  )}
                </a>
              </li>
            ))}
          </ul>
        </div>

        {/* ── Right: icon actions ── */}
        <div className="alo-nav__right">
          <ul className="alo-nav__actions">
            <li className="alo-nav__action-item">
              <button className="alo-nav__action-btn" aria-label="Search">
                <SearchIcon />
              </button>
            </li>
            <li className="alo-nav__action-item alo-nav__action-item--loyalty">
              <button className="alo-nav__action-btn" aria-label="Account">
                <UserIcon />
              </button>
              <div className="alo-nav__loyalty-label">SIGN IN TO GET REWARDS</div>
            </li>
            <li className="alo-nav__action-item">
              <button className="alo-nav__action-btn" aria-label="Wishlist">
                <WishlistIcon />
              </button>
            </li>
            <li className="alo-nav__action-item">
              <a href="https://www.aloyoga.com/cart" className="alo-nav__action-btn" aria-label="Cart">
                <CartIcon />
              </a>
            </li>
          </ul>
        </div>
      </div>

      {/* ── Mega dropdowns (all rendered, visibility controlled by CSS class) ── */}
      {NAV_ITEMS.map((item) => (
        <div
          key={item.label}
          className={`alo-dropdown${activeItem === item.label ? ' alo-dropdown--active' : ''}`}
          onMouseEnter={() => showMenu(item.label)}
          onMouseLeave={hideMenu}
          aria-hidden={activeItem !== item.label}
        >
          <div className="alo-dropdown__inner">
            {item.type === 'multi-column' ? (
              <MultiColumnMenu columns={item.columns} />
            ) : (
              <FeaturedMenu linkColumn={item.linkColumn} featured={item.featured} />
            )}
          </div>
        </div>
      ))}
    </nav>
  );
}
