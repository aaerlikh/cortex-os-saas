import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  // Image optimization
  images: {
    unoptimized: false,
    formats: ['image/avif', 'image/webp'],
  },

  // Security headers
  headers: async () => [
    {
      source: '/:path*',
      headers: [
        {
          key: 'X-Content-Type-Options',
          value: 'nosniff',
        },
        {
          key: 'X-Frame-Options',
          value: 'SAMEORIGIN',
        },
        {
          key: 'X-XSS-Protection',
          value: '1; mode=block',
        },
      ],
    },
  ],

  // React strict mode
  reactStrictMode: true,

  // Compression
  compress: true,

  // Disable Sourcemaps in production for security
  productionBrowserSourceMaps: false,

  // Skip TypeScript check during build
  typescript: {
    ignoreBuildErrors: true,
  },
};

export default nextConfig;
