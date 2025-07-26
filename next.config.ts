import type { NextConfig } from 'next'

const isProd = process.env.NODE_ENV === 'production'

const nextConfig: NextConfig = {
  reactStrictMode: true,
  images: {
    unoptimized: true,
    remotePatterns: [
      {
        protocol: 'https',
        hostname: '**',
      },
      {
        protocol: 'http',
        hostname: '**',
      },
    ],
  },
  assetPrefix: isProd ? '/next_news_aggregator/' : '', // замените на имя вашего репозитория
  basePath: isProd ? '/next_news_aggregator' : '',    // замените на имя вашего репозитория
  output: 'export',
}

export default nextConfig
