/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  async rewrites() {
    return [
      {
        source: "/api/signin",
        destination: "http://141.98.19.26:6020/auth/login",
      },
      {
        source: "/api/csrf",
        destination:"http://141.98.19.26:5000/setCSRFToken"
      }
    ];
  },
}

module.exports = nextConfig
