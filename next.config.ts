import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
};

module.exports = {
  images: {
    domains: ['images.unsplash.com', 'placehold.co'],
    dangerouslyAllowSVG: true, // Erlaube das Laden von SVG-Bildern
  },
};

export default nextConfig;
