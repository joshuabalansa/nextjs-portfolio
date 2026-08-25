/** @type {import('next').NextConfig} */
const nextConfig = {
  experimental: {
    optimizePackageImports: ["react-icons"],
  },
  images: {
    formats: ["image/avif", "image/webp"],
  },
};

export default nextConfig;
