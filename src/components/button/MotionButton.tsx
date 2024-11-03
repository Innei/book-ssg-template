'use client'

import * as React from 'react'
import { forwardRef } from 'react'
import { m } from 'framer-motion'
import type { HTMLMotionProps } from 'framer-motion'

export const MotionButtonBase = forwardRef<any, HTMLMotionProps<'button'>>(
  ({ children, ...rest }, ref) => {
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
  },
)
