'use client'

import { createContext } from 'react'
import type { FC, PropsWithChildren, ReactNode } from 'react'

export const HeaderDrawerContentContext = createContext({
  element: null as ReactNode,
})

export const HeaderDrawerContentProvider: FC<
  {
    element: ReactNode
  } & PropsWithChildren
> = ({ children, element }) => {
  return (
    <HeaderDrawerContentContext.Provider value={{ element }}>
      {children}
    </HeaderDrawerContentContext.Provider>
  )
}
