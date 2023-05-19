/** @type {import('next').NextConfig} */

const isProd = process.env.NODE_ENV === "production";

const nextConfig = {
  output: "export",
  basePath: "/jinbeistudio",
  assetPrefix: isProd ? "/jinbeistudio/" : "",
  experimental: {
    appDir: true,
  },
  images: {
    unoptimized: true,
  },
};

module.exports = nextConfig
