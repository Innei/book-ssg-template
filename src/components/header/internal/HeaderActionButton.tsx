import { forwardRef } from 'react'
import clsx from 'clsx'
import type { ForwardRefComponent } from 'framer-motion'

export const HeaderActionButton: ForwardRefComponent<
  HTMLButtonElement,
  JSX.IntrinsicElements['button']
> = forwardRef(({ children, ...rest }, ref) => {
  return (
    <button
      className={clsx(
        'group h-10 w-10 rounded-full bg-gradient-to-b',
        'px-3 text-sm ring-1 ring-zinc-900/5 backdrop-blur transition dark:ring-white/10 dark:hover:ring-white/20',

        'flex center',
      )}
      {...rest}
      ref={ref}
      aria-label="Header Action"
    >
      {children}
    </button>
  )
})

HeaderActionButton.displayName = 'HeaderActionButton'
