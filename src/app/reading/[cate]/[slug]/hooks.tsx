"use client"

import { useSetAtom } from "jotai"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

import { SEO } from "~/app.config"
import { currentPostMetaAtom } from "~/atoms/current"
import { useSetHeaderMetaInfo } from "~/components/header/internal/hooks"
import { isDev } from "~/lib/env"
import { springScrollToTop } from "~/lib/scroller"

export const Hooks = ({
  readingTime,
  count,
  title,
}: {
  readingTime: string
  count: string
  title: string
}) => {
  const pathname = usePathname()
  useEffect(() => {
    ;(window.umami as any)?.trackView?.(pathname)
  }, [pathname])

  const setCurrentPost = useSetAtom(currentPostMetaAtom)
  useEffect(() => {
    setCurrentPost({
      count,
      readingTime,
    })
  }, [count, readingTime, setCurrentPost])

  const setPageMeta = useSetHeaderMetaInfo()
  useEffect(() => {
    setPageMeta({
      title,
      description: SEO.title.absolute,
    })

    if (!isDev) springScrollToTop()
  }, [title])

  return null
}
