/** @type {import('next-sitemap').IConfig} */

module.exports = {
  siteUrl: 'https://www.wgfun.club',
  generateRobotsTxt: true,
  sitemapSize: 7000,
  exclude: ['/sitemap-new.xml'],
  robotsTxtOptions: {
    policies: [
      {
        userAgent: '*',
        allow: '/',
      },
    ],
    additionalSitemaps: ['https://www.wgfun.club/sitemap-new.xml'],
  },
};
