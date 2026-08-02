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
    /*
      Next re-encodes every remote image it serves. The default quality of 75 is
      right for a well-exposed original, but the doctor portraits arrive from
      WordPress already heavily compressed (~0.25 bits/pixel), so a second pass
      at 75 compounds the artefacts rather than merely preserving them.

      90 is allowed here so those images can opt out of the second generation of
      loss. Next 16 rejects any quality not listed in this array, so both values
      have to be declared.
    */
    qualities: [75, 90],
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
