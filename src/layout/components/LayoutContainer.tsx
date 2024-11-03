'use client'

import * as React from 'react'
import { createContext, useContext } from 'react'
import clsx from 'clsx'
import type { FC, PropsWithChildren } from 'react'

const LayoutContainerRefContext = createContext<
  React.RefObject<HTMLDivElement>
>(null!)
export const LayoutContainer: FC<PropsWithChildren> = (props) => {
  const layoutRef = React.useRef<HTMLDivElement>(null)

  return (
    <div
      className={clsx(
        'relative mx-auto grid min-h-[calc(100vh-3rem-10rem)] max-w-full',
        'gap-4 md:grid-cols-1 xl:max-w-[calc(60rem+400px)] xl:grid-cols-[1fr_minmax(auto,60rem)_1fr]',
        'mt-12',
        'md:mt-6 print:!block print:!max-w-full',
      )}
      ref={layoutRef}
    >
      <LayoutContainerRefContext.Provider value={layoutRef}>
        {props.children}
      </LayoutContainerRefContext.Provider>
    </div>
  )
}

export const useLayoutContainerRef = () => useContext(LayoutContainerRefContext)
