import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  images: {
    domains: [
      'res.cloudinary.com',
      'bairesdev.mo.cloudinary.net',
    ],
  }
};

export default nextConfig;
