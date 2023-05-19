/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "export",
  basePath: "/jinbeistudio",
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig
