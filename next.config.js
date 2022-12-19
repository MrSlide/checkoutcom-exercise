/**
 * @type {import('next').NextConfig}
 */
const nextConfig = {
  distDir: 'dist',
  images: {
    domains: ['i.scdn.co'], // Necessary to load images from the Spotify CDN
  },
  poweredByHeader: false,
  reactStrictMode: true,
}

module.exports = nextConfig
