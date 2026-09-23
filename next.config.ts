import type { NextConfig } from 'next';

const cspHeader = `
  default-src 'self';
  script-src 'self' 'unsafe-inline' 'unsafe-eval' https://analytics.ahrefs.com https://platform.docplanner.com https://*.doctoralia.com.br https://*.docplanner.com;
  style-src 'self' 'unsafe-inline' https://fonts.googleapis.com https://platform.docplanner.com https://*.doctoralia.com.br;
  img-src 'self' data: https: blob:;
  font-src 'self' data: https://fonts.gstatic.com;
  media-src 'self' data: blob:;
  connect-src 'self' https://*.supabase.co https://analytics.ahrefs.com https://platform.docplanner.com https://*.doctoralia.com.br https://*.docplanner.com;
  worker-src 'self' blob:;
  frame-src 'self' https://www.doctoralia.com.br https://*.doctoralia.com.br https://platform.docplanner.com https://*.docplanner.com;
  frame-ancestors 'self';
`.replace(/\s{2,}/g, ' ').trim();

const nextConfig: NextConfig = {
  poweredByHeader: false,
  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          {
            key: 'Referrer-Policy',
            value: 'strict-origin-when-cross-origin',
          },
          {
            key: 'X-Content-Type-Options',
            value: 'nosniff',
          },
          {
            key: 'X-Frame-Options',
            value: 'SAMEORIGIN',
          },
          {
            key: 'Content-Security-Policy',
            value: cspHeader,
          },
        ],
      },
    ];
  },
};

export default nextConfig;
