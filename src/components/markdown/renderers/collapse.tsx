"use client"

import clsx from "clsx"
import type { FC, ReactNode } from "react"
import * as React from "react"
import { useCallback, useLayoutEffect, useState } from "react"

import { useIsPrintMode } from "~/atoms"
import { IcRoundKeyboardDoubleArrowRight } from "~/components/icons/arrow"

import { CollapseContent } from "../../collapse"

export const MDetails: FC<{ children: ReactNode[] }> = (props) => {
  const [open, setOpen] = useState(false)

  const $head = props.children[0]

  const isInPrint = useIsPrintMode()
  useLayoutEffect(() => {
    isInPrint && setOpen(true)
  }, [isInPrint])

  const handleOpen = useCallback(() => {
    setOpen((o) => !o)
  }, [])
  return (
    <div className="my-2">
      <button className="mb-2 flex cursor-pointer items-center pl-2" onClick={handleOpen}>
        <i
          className={clsx(
            "i-mingcute-align-arrow-down-line mr-2 transition-transform duration-500",
            !open && "-rotate-90",
          )}
        >
          <IcRoundKeyboardDoubleArrowRight />
        </i>
        {$head}
      </button>
      <CollapseContent withBackground isOpened={open} className="my-2">
        <div
          className={clsx(open ? "opacity-100" : "opacity-0", "transition-opacity duration-500")}
        >
          {props.children.slice(1)}
        </div>
      </CollapseContent>
    </div>
  )
}
