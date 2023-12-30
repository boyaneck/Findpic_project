const { hostname } = require('os');

/** @type {import('next').NextConfig} */
// const nextConfig = {
//   reactStrictMode: true,
//   compiler: {
//     styledComponents: true
//   },
//   images: {
//     remotePatterns: [
//       {
//         protocol: 'https',
//         hostname: 'images.unsplash.com'
//       }
//     ]
//   }
// };

// module.exports = nextConfig;

const nextConfig = {
  // reactStrictMode: true,
  compiler: {
    styledComponents: true
  },
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com'
      },
      {
        protocol: 'https',
        hostname: 'pixabay.com'
      },
      {
        protocol: 'https',
        hostname: 'lh3.googleusercontent.com'
      }
    ]
  }
};

module.exports = nextConfig;
