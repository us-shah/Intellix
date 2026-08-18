/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  productionBrowserSourceMaps: false,
  images: { remotePatterns: [{ protocol: "https", hostname: "images.unsplash.com", pathname: "/**" }] },
  experimental: { webpackMemoryOptimizations: true, preloadEntriesOnStart: false, serverSourceMaps: false },
  webpack(config, { dev }) { if (dev) config.cache = false; return config; },
};
module.exports = nextConfig;
