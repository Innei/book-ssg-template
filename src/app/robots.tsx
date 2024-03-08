import type { MetadataRoute } from 'next'

import { CONFIG } from '~/app.config'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
    },
    sitemap: `${CONFIG.urlBase}/sitemap.xml`,
  }
}
