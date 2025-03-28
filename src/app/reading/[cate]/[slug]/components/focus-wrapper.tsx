'use client'

import { useSetAtom } from 'jotai'
import type { PropsWithChildren } from 'react'

import { focusAtom } from '~/atoms/focus'

export const FocusWrapper = ({ children }: PropsWithChildren) => {
  const setAtom = useSetAtom(focusAtom)
  return (
    <div onMouseEnter={() => setAtom(true)} onMouseLeave={() => setAtom(false)}>
      {children}
    </div>
  )
}
