/* next.config.js  */
module.exports = {
  i18n: {
    locales: ['en'],
    defaultLocale: 'en',
  },
  experimental: { esmExternals: true },
  images: {
    domains: ['/'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920, 2048, 3840],
  },
};
