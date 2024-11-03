import '../styles/index.css'

import type { Metadata } from 'next'
import type { PropsWithChildren } from 'react'

import { SEO } from '~/app.config'
import { AccentColorStyleInjector } from '~/components/shared/AccentColorStyleInjector'
import { Analyze } from '~/components/shared/Tracker'

import { Providers } from './providers'

export const metadata: Metadata = SEO

export default async (props: PropsWithChildren) => {
  return (
    <html>
      <head>
        <meta charSet="UTF-8" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link
          rel="preconnect"
          href="https://fonts.gstatic.com"
          crossOrigin=""
        />
        <link
          href="https://fonts.googleapis.com/css2?family=Manrope:wght@200..800&display=swap"
          rel="stylesheet"
        />
        <AccentColorStyleInjector />
      </head>

      <body className="m-0 flex h-full grow flex-col p-0 font-sans">
        <Providers>
          {props.children}
          <Analyze />
        </Providers>
      </body>
    </html>
  )
}
