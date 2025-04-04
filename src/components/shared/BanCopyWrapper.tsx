"use client"

import { DialogContent, DialogPortal, Root } from "@radix-ui/react-dialog"
import { AnimatePresence, m } from "framer-motion"
import type { FC, PropsWithChildren } from "react"
import { createContext, use, useEffect, useRef, useState } from "react"

import { DialogOverlay } from "../dialog"

const BanCopyContext = createContext(false)

export const useIsInBanCopyContext = () => use(BanCopyContext)

export const BanCopyWrapper: FC<PropsWithChildren> = (props) => {
  const [showCopyWarn, setShowCopyWarn] = useState(false)
  const ref = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!ref.current) {
      return
    }
    const $el = ref.current
    $el.oncopy = (e) => {
      e.preventDefault()
      setShowCopyWarn(true)
    }

    return () => {
      $el.oncopy = null
    }
  }, [])

  useEffect(() => {
    if (showCopyWarn) {
      const id = setTimeout(() => {
        setShowCopyWarn(false)
      }, 2000)
      return () => {
        clearTimeout(id)
      }
    }
  }, [showCopyWarn])
  return (
    <BanCopyContext value={true}>
      <div ref={ref}>{props.children}</div>
      <Root open>
        <AnimatePresence>
          {showCopyWarn && (
            <DialogPortal>
              <DialogOverlay />
              <DialogContent asChild>
                <m.div
                  className="fixed inset-0 z-[11] flex flex-col gap-4 center"
                  exit={{
                    opacity: 0,
                  }}
                  onClick={() => {
                    setShowCopyWarn(false)
                  }}
                >
                  <div className="pointer-events-none mt-0 text-3xl font-medium text-red-400 dark:text-orange-500">
                    注意：
                  </div>
                  <div className="pointer-events-none my-3 text-lg text-neutral-900 text-opacity-80 dark:text-zinc-100">
                    <p>本文章为站长原创，保留版权所有，禁止复制。</p>
                  </div>
                </m.div>
              </DialogContent>
            </DialogPortal>
          )}
        </AnimatePresence>
      </Root>
    </BanCopyContext>
  )
}
