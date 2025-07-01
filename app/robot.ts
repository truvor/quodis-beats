import type { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: ['/api/', '_next/']
    },
    sitemap: 'https://quodis-beats.risky4real.com/sitemap.xml',
  }
}