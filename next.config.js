const { createVanillaExtractPlugin } = require('@vanilla-extract/next-plugin');
const withBundleAnalyzer = require('@next/bundle-analyzer')({
  enabled: process.env.ANALYZE === 'true',
});
const withVanillaExtract = createVanillaExtractPlugin();

const nextConfig = {
  poweredByHeader: false,
  eslint: {
    ignoreDuringBuilds: true,
  },
  swcMinify: true,
  productionBrowserSourceMaps: true,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.ctfassets.net',
        port: '',
        // pathname: '/account123/**',
      },
    ],
  },
};

module.exports = withBundleAnalyzer(withVanillaExtract(nextConfig));
