import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
      },
      {
        protocol: 'https',
        hostname: 'www12.senado.leg.br',
      },
      {
        protocol: 'https',
        hostname: 'www.fresnogardening.org',
      },
      {
        protocol: 'https',
        hostname: 'images.squarespace-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'ars.els-cdn.com',
      },
      {
        protocol: 'https',
        hostname: 'levypreserve.org',
      },
      {
        protocol: 'https',
        hostname: 'greencodeapi-production.up.railway.app',
      },
    ],
  },
};

export default nextConfig;
