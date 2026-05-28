import { createClient } from 'contentful';

const spaceId = import.meta.env.VITE_CONTENTFUL_SPACE_ID;
const accessToken = import.meta.env.VITE_CONTENTFUL_ACCESS_TOKEN;

const client = spaceId && accessToken
  ? createClient({ space: spaceId, accessToken })
  : null;

export async function fetchLandingPage(slug = '/') {
  if (!client) return null;

  const response = await client.getEntries({
    content_type: 'landingPageZoominfo',
    'fields.slug': slug,
    limit: 1,
  });

  if (!response.items.length) return null;

  const f = response.items[0].fields;
  return {
    heroHeadline: f.heroHeadline ?? '',
    heroSubtitle: f.heroSubtitle ?? '',
    heroPrimaryButtonLabel: f.heroPrimaryButtonLabel ?? 'Sign Up Now',
    heroSecondaryButtonLabel: f.heroSecondaryButtonLabel ?? 'Get a Demo',
    featuresTitle: f.featuresTitle ?? 'Why Choose InsureCo?',
    carInsuranceHeadline: f.carInsuranceHeadline ?? 'Car Insurance',
    carInsuranceDescription: f.carInsuranceDescription ?? '',
    carInsuranceFeatures: f.carInsuranceFeatures ?? [],
    homeInsuranceHeadline: f.homeInsuranceHeadline ?? 'Home Insurance',
    homeInsuranceDescription: f.homeInsuranceDescription ?? '',
    homeInsuranceFeatures: f.homeInsuranceFeatures ?? [],
    ctaHeading: f.ctaHeading ?? 'Ready to Get Started?',
    ctaSubtext: f.ctaSubtext ?? '',
    ctaButtonLabel: f.ctaButtonLabel ?? 'Get Your Free Quote',
  };
}

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
