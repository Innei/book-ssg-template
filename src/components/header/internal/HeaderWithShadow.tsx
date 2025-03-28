"use client"

import clsx from "clsx"

import { usePageScrollLocationSelector } from "~/providers/page-scroll-info-provider"

import { useHeaderBgOpacity } from "./hooks"

export const HeaderWithShadow: Component = ({ children }) => {
  const headerOpacity = useHeaderBgOpacity()
  const showShadow = usePageScrollLocationSelector(
    (y) => y > 100 && headerOpacity > 0.8,
    [headerOpacity],
  )
  return (
    <header
      data-hide-print
      className={clsx(
        "fixed inset-x-0 top-0 z-[9] h-[4.5rem] overflow-hidden transition-shadow duration-200 lg:ml-[calc(100vw-100%)]",
        showShadow && "shadow-none shadow-neutral-100 dark:shadow-neutral-800/50 lg:shadow-sm",
      )}
    >
      {children}
    </header>
  )
}
