/** @type {import('next').NextConfig} */
module.exports = {
  reactStrictMode: true,
  images: {
    domains: ["links.papareact.com", "unsplash.com", "pin.it", "i.pinimg.com"],
  },
  experimental: {
    appDir: true,
  }
}
