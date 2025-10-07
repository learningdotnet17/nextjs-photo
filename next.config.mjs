/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Only use static export for GitHub Pages, not Vercel
  ...(process.env.GITHUB_ACTIONS && {
    output: "export",
  }),
  images: {
    // Unoptimized images only for GitHub Pages
    unoptimized: process.env.GITHUB_ACTIONS ? true : false,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
}

export default nextConfig
