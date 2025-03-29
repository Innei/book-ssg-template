"use client"

import type { FC, ReactNode } from "react"
import { memo, useCallback } from "react"

import { FloatPopover } from "../float-popover"
import { Favicon } from "../rich-link/Favicon"

export const MLink: FC<{
  href: string
  title?: string
  children?: ReactNode
  text?: string
}> = memo(({ href, children, title, text }) => {
  return (
    <FloatPopover
      as="span"
      wrapperClassName="!inline"
      type="tooltip"
      TriggerComponent={useCallback(
        () => (
          <span className="inline items-center">
            <Favicon href={href} />
            <a
              className="shiro-link--underline"
              href={href}
              target="_blank"
              title={title}
              rel="noreferrer"
            >
              {children}
            </a>

            <i className="i-mingcute-arrow-right-up-line translate-y-[2px] opacity-70" />
          </span>
        ),
        [children, href, title],
      )}
    >
      <a href={href} target="_blank" rel="noreferrer">
        <span>{href}</span>
      </a>
    </FloatPopover>
  )
})
MLink.displayName = "MLink"
