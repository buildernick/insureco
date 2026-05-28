import { createClient } from 'contentful';

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const client = spaceId && accessToken
  ? createClient({ space: spaceId, accessToken })
  : null;

export async function fetchTestimonials() {
  if (!client) return [];

  const response = await client.getEntries({
    content_type: 'testimonial',
    order: 'sys.createdAt',
  });

  return response.items.map((item) => ({
    id: item.sys.id,
    name: item.fields.name ?? '',
    quote: item.fields.quotation ?? '',
    since: item.fields.role ?? '',
  }));
}
