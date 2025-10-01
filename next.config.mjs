/** @type {import('next').NextConfig} */
const nextConfig = {
  // Static export requires all content to exist at build time
  // You can add it back once you have photos in Sanity
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
}

export default nextConfig
