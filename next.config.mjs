/** @type {import('next').NextConfig} */

const nextConfig = {
  async rewrites() {
    return [
      {
        source: '/api/:path*',
        destination: 'https://api.example.com/:path*',
      },
    ]
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'live.staticflickr.com',
        port: ''
      }
    ]
  }
}

export default nextConfig
