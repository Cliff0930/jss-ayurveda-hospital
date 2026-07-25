import type { MetadataRoute } from 'next';

import { site } from '@/lib/site';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: '*',
        allow: '/',
        // The image brief is an internal production tool, not public content.
        disallow: ['/api/', '/image-brief'],
      },
    ],
    sitemap: `${site.url}/sitemap.xml`,
  };
}
