// next.config.js
module.exports = {
    async rewrites() {
      return [
        // Define custom routing rules here
        {
          source: '/home/:path*',
          destination: '/home',
        },
        {
          source: '/',
          destination: '/',
        },
        {
          source: '/login/:path*',
          destination: '/login',
        },
        // Add more routing rules as needed
      ];
    },
  };
  