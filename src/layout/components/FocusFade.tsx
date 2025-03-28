'use client'

import { useAtomValue } from 'jotai'
import type { FC, PropsWithChildren } from 'react'

import { focusAtom } from '~/atoms/focus'
import { clsxm } from '~/lib/helper'

export const FocusFade: FC<
  PropsWithChildren & {
    as?: keyof React.JSX.IntrinsicElements
    className?: string
  }
> = ({ children, as: As = 'div', className }) => {
  const isFocus = useAtomValue(focusAtom)
  return (
    <As
      className={clsxm(
        `transition-opacity duration-500 ${isFocus ? 'opacity-20' : 'opacity-100'}`,
        className,
      )}
    >
      {children}
    </As>
  )
}
