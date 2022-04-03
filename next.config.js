/** @type {import('next').NextConfig} */
const nextConfig = {
  env: {
    API_URL: "http:localhost:3000/api/",
    // ENV: "production"
  },
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"]
    })
    return config
  },
  reactStrictMode: true,
}

module.exports = nextConfig
