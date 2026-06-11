import React, { useEffect, useState, useMemo } from 'react';
import PlpGrid from './PlpGrid';
import PlpTile from './PlpTile';
import PlpFilterPanel from './PlpFilterPanel';

const BUILDER_API_KEY = import.meta.env.VITE_PUBLIC_BUILDER_KEY;
const BUILDER_CDN = 'https://cdn.builder.io/api/v3/content';

function mapEntryToTile(entry) {
  const d = entry.data || {};
  return {
    href: d.href || '#',
    imageSrc: d.image || '',
    imageAlt: d.imageAlt || d.productName || '',
    badge: d.tag || '',
    name: d.productName || '',
    colorway: d.colorway || '',
    price: d.price || '',
    swatches: Array.isArray(d.swatches) ? d.swatches : [],
    extraColors: d.extraColors || 0,
    category: (d.category || '').toLowerCase().trim(),
  };
}

async function fetchAllProducts() {
  if (!BUILDER_API_KEY) return [];
  const params = new URLSearchParams({ apiKey: BUILDER_API_KEY, limit: '100' });
  const res = await fetch(`${BUILDER_CDN}/alo-product?${params}`);
  if (!res.ok) return [];
  const json = await res.json();
  return (json.results || []).map(mapEntryToTile);
}

export default function AloPlpGridCMS({
  title = 'Shop the Collection',
  category = 'all',
  showFilters = true,
}) {
  const [allTiles, setAllTiles] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedColors, setSelectedColors] = useState([]);

  useEffect(() => {
    let cancelled = false;
    async function load() {
      setLoading(true);
      try {
        const results = await fetchAllProducts();
        if (!cancelled) setAllTiles(results);
      } finally {
        if (!cancelled) setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, []);

  // Reset color selection whenever the category prop changes
  useEffect(() => {
    setSelectedColors([]);
  }, [category]);

  // Client-side category filter
  const categoryTiles = useMemo(() => {
    const cat = (category || 'all').toLowerCase().trim();
    if (cat === 'all') return allTiles;
    return allTiles.filter(t => t.category === cat);
  }, [allTiles, category]);

  // Derive unique color options from the products currently in view
  const colorOptions = useMemo(() => {
    const seen = new Map();
    categoryTiles.forEach(tile => {
      tile.swatches.forEach(sw => {
        if (sw.label && !seen.has(sw.label)) {
          seen.set(sw.label, sw.color || '');
        }
      });
    });
    return Array.from(seen.entries()).map(([label, color]) => ({
      value: label,
      label,
      swatch: color,
    }));
  }, [categoryTiles]);

  // Apply color filter
  const displayedTiles = useMemo(() => {
    if (selectedColors.length === 0) return categoryTiles;
    return categoryTiles.filter(tile =>
      tile.swatches.some(sw => selectedColors.includes(sw.label))
    );
  }, [categoryTiles, selectedColors]);

  const handleColorToggle = (colorValue) => {
    setSelectedColors(prev =>
      prev.includes(colorValue)
        ? prev.filter(c => c !== colorValue)
        : [...prev, colorValue]
    );
  };

  if (loading) return null;

  const filterGroups = colorOptions.length > 0
    ? [{ label: 'Color', defaultOpen: true, options: colorOptions }]
    : [];

  return (
    <PlpGrid
      title={title}
      sidebar={showFilters ? (
        <PlpFilterPanel
          groups={filterGroups}
          selectedColors={selectedColors}
          onColorToggle={handleColorToggle}
        />
      ) : null}
    >
      {displayedTiles.map((tile, i) => (
        <PlpTile key={`${tile.name}-${i}`} {...tile} />
      ))}
    </PlpGrid>
  );
}
