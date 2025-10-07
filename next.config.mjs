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
    // Skip /studio route during static export
    exportPathMap: async function (
      defaultPathMap,
      { dev, dir, outDir, distDir, buildId }
    ) {
      // Remove studio routes from static export
      const pathMap = { ...defaultPathMap }
      Object.keys(pathMap).forEach((path) => {
        if (path.startsWith('/studio')) {
          delete pathMap[path]
        }
      })
      return pathMap
    },
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
