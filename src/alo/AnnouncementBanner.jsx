import React from 'react';
import './AnnouncementBanner.scss';

export default function AnnouncementBanner({ message }) {
  return (
    <div className="alo-announcement-banner">
      <p className="alo-announcement-banner__text">{message}</p>
    </div>
  );
}
