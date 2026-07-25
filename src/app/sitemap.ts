import type { MetadataRoute } from 'next';

import { site } from '@/lib/site';

const routes: { path: string; priority: number; changeFrequency: MetadataRoute.Sitemap[number]['changeFrequency'] }[] = [
  { path: '/', priority: 1, changeFrequency: 'weekly' },
  { path: '/about', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/about/jss-mahavidyapeetha', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/doctors', priority: 0.9, changeFrequency: 'weekly' },
  { path: '/opd', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/specialities', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/treatments', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/facilities', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/wellness-packages', priority: 0.9, changeFrequency: 'monthly' },
  { path: '/packages', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/pricing', priority: 0.8, changeFrequency: 'monthly' },
  { path: '/products', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/ayur-pharma', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/physiotherapy', priority: 0.6, changeFrequency: 'yearly' },
  { path: '/gallery', priority: 0.6, changeFrequency: 'monthly' },
  { path: '/staff', priority: 0.5, changeFrequency: 'monthly' },
  { path: '/attendance-analysis', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/waste-data', priority: 0.4, changeFrequency: 'monthly' },
  { path: '/faqs', priority: 0.7, changeFrequency: 'monthly' },
  { path: '/contact', priority: 0.9, changeFrequency: 'yearly' },
  { path: '/privacy-policy', priority: 0.2, changeFrequency: 'yearly' },
  { path: '/terms-of-use', priority: 0.2, changeFrequency: 'yearly' },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();

  return routes.map((route) => ({
    url: `${site.url}${route.path}`,
    lastModified,
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }));
}
