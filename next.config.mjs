/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  images: {
    domains: ['firebasestorage.googleapis.com', 'example.com'],
  },
  reactStrictMode: true,
};

export default nextConfig;
