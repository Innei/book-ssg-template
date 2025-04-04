import clsx from "clsx"
import type { MotionProps } from "framer-motion"

export const HeaderActionButton = ({
  ref,
  children,
  ...rest
}: MotionProps &
  React.JSX.IntrinsicElements["button"] & {
    ref?: React.RefObject<any | null>
  }) => {
  return (
    <button
      className={clsx(
        "group size-10 rounded-full bg-gradient-to-b",
        "px-3 text-sm ring-1 ring-zinc-900/5 backdrop-blur transition dark:ring-white/10 dark:hover:ring-white/20",

        "flex center",
      )}
      {...rest}
      ref={ref}
      aria-label="Header Action"
    >
      {children}
    </button>
  )
}

HeaderActionButton.displayName = "HeaderActionButton"
