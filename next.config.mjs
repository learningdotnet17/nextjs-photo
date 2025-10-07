/** @type {import('next').NextConfig} */

const isGitHubActions = process.env.GITHUB_ACTIONS === 'true'

const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  images: {
    unoptimized: isGitHubActions,
    remotePatterns: [
      {
        protocol: "https",
        hostname: "cdn.sanity.io",
      },
    ],
  },
}

// Only add static export config for GitHub Pages
if (isGitHubActions) {
  nextConfig.output = "export"
  nextConfig.exportPathMap = async function (defaultPathMap) {
    // Remove studio routes from static export
    const pathMap = {}
    for (const [key, value] of Object.entries(defaultPathMap)) {
      if (!key.startsWith('/studio')) {
        pathMap[key] = value
      }
    }
    return pathMap
  }
}

export default nextConfig
