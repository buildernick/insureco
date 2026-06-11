import React from 'react';
import AloCategoryGridCMS from '../alo/AloCategoryGridCMS';
import AloPlpGridCMS from '../alo/AloPlpGridCMS';
import AnnouncementBanner from '../alo/AnnouncementBanner';
import CollectionHeader from '../alo/CollectionHeader';
import SectionTabNav from '../alo/SectionTabNav';
import './AloCollectionPage.scss';

const TABS = [
  { label: 'Collection', active: true },
  { label: 'Editorial', href: 'https://www.aloyoga.com/pages/bag-collection' },
];

export default function AloCollectionPage() {
  return (
    <div className="alo-collection-page">
      <AnnouncementBanner message="ENJOY COMPLIMENTARY SHIPPING & RETURNS" />

      <CollectionHeader
        title="The Bag Collection"
        description="As the next evolution of our Atelier line, the Bag Collection was designed with intentional living in mind."
      />

      <AloCategoryGridCMS />

      <SectionTabNav tabs={TABS} />

      <AloPlpGridCMS title="Shop the Collection" showFilters />
    </div>
  );
}
