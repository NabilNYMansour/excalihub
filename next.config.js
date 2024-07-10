module.exports = {
  reactStrictMode: true,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "admin.nabilmansour.com",
      },
      {
        protocol: "http",
        hostname: "localhost",
        port: "1337",
      },
    ]
  },
}