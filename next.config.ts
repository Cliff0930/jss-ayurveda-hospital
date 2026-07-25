import type { NextConfig } from 'next';

/**
 * The WordPress install that acts as our headless CMS. Kept in one place so a
 * domain change (e.g. moving off the Cloudways staging URL) is a single edit
 * here plus the matching value in `.env.local`.
 */
const WP_HOST =
  process.env.NEXT_PUBLIC_WP_HOSTNAME ?? 'wordpress-1420178-6266636.cloudwaysapps.com';

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      { protocol: 'https', hostname: WP_HOST, pathname: '/wp-content/uploads/**' },
      { protocol: 'https', hostname: 'jssamch.org', pathname: '/wp-content/uploads/**' },
    ],
    formats: ['image/avif', 'image/webp'],
    minimumCacheTTL: 60 * 60 * 24 * 30,
  },
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-Frame-Options', value: 'SAMEORIGIN' },
        ],
      },
    ];
  },
};

export default nextConfig;
