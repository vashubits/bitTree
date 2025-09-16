/** @type {import('next').NextConfig} */
const nextConfig = {
  // Ignore ESLint errors during build (so deployment won't fail)
  eslint: {
    ignoreDuringBuilds: true,
  },

  // Optional: allow external image domains for next/image
  images: {
    domains: ['firebasestorage.googleapis.com', 'example.com'], // add your image hosts
  },

  reactStrictMode: true,
};

export default nextConfig;
