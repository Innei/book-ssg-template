import { clsxm } from "~/lib/helper"

import { MotionButtonBase } from "./MotionButton"

export const RoundedIconButton: typeof MotionButtonBase = ({
  ref,
  className,
  children,
  ...rest
}) => {
  return (
    <MotionButtonBase
      ref={ref}
      className={clsxm(
        "inline-flex rounded-full bg-accent p-2 text-center leading-none center hover:opacity-90",
        className,
      )}
      {...rest}
    >
      {children}
    </MotionButtonBase>
  )
}

RoundedIconButton.displayName = "RoundedIconButton"
