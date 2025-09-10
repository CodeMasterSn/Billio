/** @type {import('next').NextConfig} */
const nextConfig = {
  output: 'export',
  trailingSlash: true,
  images: {
    unoptimized: true
  },
  eslint: {
    // Désactiver ESLint temporairement pour le déploiement
    ignoreDuringBuilds: true,
  },
  typescript: {
    // Désactiver TypeScript temporairement si nécessaire
    ignoreBuildErrors: true,
  },
}

module.exports = nextConfig