/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'pub-a7deba7d0b9642f8afcfd3aebbcb446f.r2.dev',
        pathname: '/**',
      },
    ],
  },
};

module.exports = nextConfig;
