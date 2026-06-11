import React, { useEffect, useState } from 'react';
import ProductGrid from './ProductGrid';
import ProductCard from './ProductCard';

const BUILDER_API_KEY = import.meta.env.VITE_PUBLIC_BUILDER_KEY;
const BUILDER_CDN = 'https://cdn.builder.io/api/v3/content';

function mapEntryToCard(entry) {
  const d = entry.data || {};
  return {
    href: d.href || '#',
    mediaType: d.mediaType || 'image',
    mediaSrc: d.image || d.mediaSrc || '',
    videoPoster: d.videoPoster || '',
    name: d.title || '',
    description: d.description || '',
    availability: d.availability || '',
    productType: (d.productType || '').toLowerCase(),
  };
}

async function fetchAllCategories() {
  if (!BUILDER_API_KEY) return [];
  const params = new URLSearchParams({ apiKey: BUILDER_API_KEY, limit: '100' });
  const res = await fetch(`${BUILDER_CDN}/alo-category?${params}`);
  if (!res.ok) return [];
  const json = await res.json();
  return (json.results || []).map(mapEntryToCard);
}

async function resolveCategoryRefs(refs) {
  if (!BUILDER_API_KEY || !refs.length) return [];
  if (refs[0]?.data?.title !== undefined) return refs.map(mapEntryToCard);

  const ids = refs.map((r) => r?.id).filter(Boolean);
  if (!ids.length) return [];

  const params = new URLSearchParams({ apiKey: BUILDER_API_KEY, limit: String(ids.length) });
  ids.forEach((id) => params.append('query.id.$in[]', id));

  const res = await fetch(`${BUILDER_CDN}/alo-category?${params}`);
  if (!res.ok) return [];
  const json = await res.json();
  const byId = new Map((json.results || []).map((e) => [e.id, e]));
  return ids.map((id) => byId.get(id)).filter(Boolean).map(mapEntryToCard);
}

export default function AloCategoryGridCMS({ categories, populateBy = 'all', productType = 'bag' }) {
  const [cards, setCards] = useState([]);
  const [loading, setLoading] = useState(true);

  const hasCurated = Array.isArray(categories) && categories.length > 0;

  useEffect(() => {
    let cancelled = false;

    async function load() {
      setLoading(true);
      try {
        if (populateBy === 'product' && hasCurated) {
          const refs = categories.map((item) => item?.category).filter(Boolean);
          const resolved = await resolveCategoryRefs(refs);
          if (!cancelled) setCards(resolved);
        } else if (populateBy === 'type') {
          const all = await fetchAllCategories();
          const filtered = all.filter((c) => c.productType === productType);
          if (!cancelled) setCards(filtered);
        } else {
          const all = await fetchAllCategories();
          if (!cancelled) setCards(all);
        }
      } finally {
        if (!cancelled) setLoading(false);
      }
    }

    load();
    return () => { cancelled = true; };
  }, [populateBy, productType, hasCurated, categories]);

  if (loading) return null;

  return (
    <ProductGrid>
      {cards.map((card) => (
        <ProductCard key={card.name} {...card} />
      ))}
    </ProductGrid>
  );
}
