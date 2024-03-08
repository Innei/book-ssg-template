'use client'

import { useEffect } from 'react'
import { useSetAtom } from 'jotai'
import { usePathname } from 'next/navigation'

import { SEO } from '~/app.config'
import { currentPostMetaAtom } from '~/atoms/current'
import { useSetHeaderMetaInfo } from '~/components/header/internal/hooks'
import { DOMCustomEvents } from '~/constants/event'
import { isDev } from '~/lib/env'
import { springScrollToTop } from '~/lib/scroller'

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

  useEffect(() => {
    document.dispatchEvent(new CustomEvent(DOMCustomEvents.RefreshToc))
  }, [title])

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
