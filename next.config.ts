import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  output: 'export',
  images: {
    domains: ['wordpress-pzjqn.wasmer.app'],
    unoptimized: true,
  },
  trailingSlash: false,
  skipTrailingSlashRedirect: true,
  skipMiddlewareUrlNormalize: true,
};

export default nextConfig;
