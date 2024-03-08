import type { Metadata } from 'next'

export const DONATE = {
  link: 'https://github.com/sponsors/Innei',
  qrcode: [
    'https://cdn.jsdelivr.net/gh/Innei/img-bed@master/20191211132347.png',
    'https://cdn.innei.ren/bed/2023/0424213144.png',
  ],
}

export const CONFIG = {
  /**
   * mark this book is work in progress
   */
  wip: true,
  /**
   * public book hostname
   */
  urlBase: 'https://nextjs-book.innei.in',
}

export const SEO = {
  title: {
    absolute: 'Book SSG Template',
    template: `%s | ${'Book SSG Template'}`,
  },
  metadataBase: new URL(CONFIG.urlBase),
  twitter: {
    card: 'summary_large_image',
    creator: '@__oQuery',
    site: 'https://innei.in',
  },
  openGraph: {
    type: 'book',
    authors: ['innei'],
    tags: ['nextjs'],
    images: [],
  },
} satisfies Metadata
