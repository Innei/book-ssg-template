"use client"

import clsx from "clsx"
import type { FC } from "react"
import { useCallback, useEffect, useMemo, useRef, useState } from "react"

import { getViewport } from "~/atoms/hooks"
import { useMaskScrollArea } from "~/hooks/shared/use-mask-scrollarea"
import { clsxm } from "~/lib/helper"

import { MotionButtonBase } from "../button"
import { AutoResizeHeight } from "../shared/AutoResizeHeight"
import styles from "./CodeHighlighter.module.css"

const parseFilenameFromAttrs = (attrs: string) => {
  // filename=""

  const match = attrs.match(/filename="([^"]+)"/)
  if (match) {
    return match[1]
  }
  return null
}

export interface CodeBlockProps {
  lang: string | undefined
  content: string
  raw?: string
  attrs?: string

  langIcon?: React.ReactNode

  renderedHtml: string
}
export const CodeBlockWrapper: FC<CodeBlockProps> = (props) => {
  const { lang: language, content: value, attrs, renderedHtml, langIcon } = props

  const handleCopy = useCallback(() => {
    navigator.clipboard.writeText(value)
  }, [value])

  const codeBlockRef = useRef<HTMLDivElement>(null)

  const [isCollapsed, setIsCollapsed] = useState(true)
  const [isOverflow, setIsOverflow] = useState(false)
  useEffect(() => {
    const $el = codeBlockRef.current
    if (!$el) return

    const windowHeight = getViewport().h
    const halfWindowHeight = windowHeight / 2
    const $elScrollHeight = $el.scrollHeight
    if ($elScrollHeight >= halfWindowHeight) {
      setIsOverflow(true)

      const $hightlighted = $el.querySelector(".highlighted, .diff")
      if ($hightlighted) {
        const lineHeight = Number.parseInt(getComputedStyle($hightlighted).height || "0", 10)
        const $code = $el.querySelector("pre > code")!
        const childIndexInParent = Array.from($code.children).indexOf($hightlighted)

        $el.scrollTop = lineHeight * childIndexInParent - 30
      }
    } else {
      setIsOverflow(false)
    }
  }, [value])

  const filename = useMemo(() => {
    return parseFilenameFromAttrs(attrs || "")
  }, [attrs])
  const [, maskClassName] = useMaskScrollArea({
    ref: codeBlockRef,
    size: "lg",
  })

  return (
    <div className={clsx(styles["code-card"], "group")}>
      {!!filename && (
        <div className="flex w-full items-center justify-between rounded-t-xl bg-accent/20 px-4 py-2 text-sm">
          <span className="shrink-0 grow truncate">{filename}</span>
          <span className="pointer-events-none shrink-0 grow-0 text-[20px]" aria-hidden>
            {langIcon}
          </span>
        </div>
      )}

      {!filename && !!language && (
        <div
          aria-hidden
          className="pointer-events-none absolute bottom-3 right-3 text-sm opacity-60"
        >
          {langIcon}
        </div>
      )}
      <div className="bg-accent/10 py-2">
        <MotionButtonBase
          onClick={handleCopy}
          className={clsxm(
            "absolute right-2 top-2 z-[1] flex text-xs center",
            "rounded-md border border-black/5 bg-accent/80 p-1.5 text-white backdrop-blur duration-200 dark:border-white/10",
            "opacity-0 group-hover:opacity-100",
            filename && "top-12",
          )}
        >
          <i className="icon-[mingcute--copy-2-fill] size-4" />
        </MotionButtonBase>
        <AutoResizeHeight spring className="relative">
          <div
            ref={codeBlockRef}
            className={clsxm(
              "relative max-h-[50vh] w-full grow overflow-auto scrollbar-none",
              !isCollapsed ? "!max-h-full" : isOverflow ? maskClassName : "",
            )}
            dangerouslySetInnerHTML={{
              __html: renderedHtml,
            }}
          />

          {isOverflow && isCollapsed && (
            <div
              className={`absolute inset-x-0 bottom-0 flex justify-center py-2 duration-200 ${
                ["mask-both-lg", "mask-b-lg"].includes(maskClassName)
                  ? ""
                  : "pointer-events-none opacity-0"
              }`}
            >
              <button
                onClick={() => setIsCollapsed(false)}
                aria-hidden
                className="flex items-center justify-center text-xs"
              >
                <i className="icon-[mingcute--arrow-to-down-line]" />
                <span className="ml-2">展开</span>
              </button>
            </div>
          )}
        </AutoResizeHeight>
      </div>
    </div>
  )
}
