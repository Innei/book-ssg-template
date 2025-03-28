"use client"

import type { FC, PropsWithChildren, ReactNode } from "react"
import { createContext, useMemo } from "react"

export const HeaderDrawerContentContext = createContext({
  element: null as ReactNode,
})

export const HeaderDrawerContentProvider: FC<
  {
    element: ReactNode
  } & PropsWithChildren
> = ({ children, element }) => {
  return (
    <HeaderDrawerContentContext value={useMemo(() => ({ element }), [element])}>
      {children}
    </HeaderDrawerContentContext>
  )
}
