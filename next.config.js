/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    appDir: true,
  },
  images: {
    domains: ["api.themoviedb.org", "image.tmdb.org"],
  },
};

module.exports = nextConfig;
