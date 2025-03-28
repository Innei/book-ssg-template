'use client'

import * as React from 'react'
import { m } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

export const MotionButtonBase = ({
  ref,
  children,
  ...rest
}: HTMLMotionProps<'button'> & { ref?: React.RefObject<any | null> }) => {
  return (
    <m.button
      initial={true}
      whileFocus={{ scale: 1.02 }}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.95 }}
      {...rest}
      // @ts-ignore
      ref={ref}
    >
      {children}
    </m.button>
  )
}
