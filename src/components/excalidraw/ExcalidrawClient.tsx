'use client'

import { lazy, Suspense, useState } from 'react'
import { useIsomorphicLayoutEffect } from 'foxact/use-isomorphic-layout-effect'
import type { ReactNode } from 'react'

import { ExcalidrawLoading } from './ExcalidrawLoading'

export const ExcalidrawLazy = ({ data }: any) => {
  const [Excalidraw, setComponent] = useState(null as ReactNode)

  useIsomorphicLayoutEffect(() => {
    const Component = lazy(() =>
      import('~/components/excalidraw').then((mod) => ({
        default: mod.Excalidraw,
      })),
    )

    setComponent(<Component showExtendButton key={data} data={data} />)
  }, [data])

  return (
    <Suspense fallback={<ExcalidrawLoading />}>
      {Excalidraw ?? <ExcalidrawLoading />}
    </Suspense>
  )
}
