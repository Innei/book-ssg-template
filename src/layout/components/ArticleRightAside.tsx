'use client'

import React from 'react'
import clsx from 'clsx'
import type { FC } from 'react'

import { RootPortal } from '~/components/portal'
import { ReadIndicator } from '~/components/shared/ReadIndicator'
import { TocAside } from '~/components/toc'
import { useIsClient } from '~/hooks/common/use-is-client'

import { useLayoutContainerRef } from './LayoutContainer'

export const ArticleRightAside: FC<{
  children?: React.ReactNode
}> = ({ children }) => {
  const layoutRef = useLayoutContainerRef()
  const isClient = useIsClient()
  if (!isClient) return null
  return (
    <RootPortal to={layoutRef.current!}>
      <aside className="sticky top-[120px] mt-[120px] h-[calc(100vh-6rem-4.5rem-150px-120px)]">
        <div className="relative h-full">
          <TocAside
            as="div"
            className="static ml-4"
            treeClassName={clsx('absolute h-full min-h-[120px] flex flex-col')}
            accessory={ReadIndicator}
          />
        </div>
        {!!children &&
          React.cloneElement(children as any, {
            className: 'translate-y-[calc(100%+24px)]',
          })}
      </aside>
    </RootPortal>
  )
}
