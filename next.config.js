/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  images: {
    domains: ["fakestoreapi.com"]
  },
  env: {
    stripe_public_key: process.env.STRIPE_PUBLIC_KEY,
    firebase_config: process.env.FIREBASE_CONFIG
  }
}

module.exports = nextConfig
