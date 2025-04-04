"use client"

import * as RadixTabs from "@radix-ui/react-tabs"
import { m } from "framer-motion"
import type { FC, PropsWithChildren } from "react"
import * as React from "react"
import { useId, useMemo, useState } from "react"

import { clsxm } from "~/lib/helper"

export const Tabs: FC<PropsWithChildren> = ({ children }) => {
  const id = useId()

  const tabs = useMemo(() => {
    const labels = [] as string[]
    for (const child of React.Children.toArray(children)) {
      if (!child) {
        continue
      }
      if (typeof child !== "object") continue
      if (!("props" in child)) continue
      if (!("type" in child)) continue

      // if (child.type !== Tab) continue
      const { label } = child.props as any
      labels.push(label)
    }
    return labels
  }, [children])

  const [activeTab, setActiveTab] = useState<string | null>(tabs[0])
  return (
    <RadixTabs.Root value={activeTab || ""} onValueChange={setActiveTab}>
      <RadixTabs.List className="flex gap-2">
        {tabs.map((tab) => {
          return (
            <RadixTabs.Trigger
              className={clsxm(
                "relative flex px-2 py-1 text-sm font-bold focus:outline-none",
                "text-gray-600 transition-colors duration-300 dark:text-gray-300",
              )}
              key={tab}
              value={tab}
            >
              {tab}

              {activeTab === tab && (
                <m.div
                  layoutId={`tab${id}`}
                  layout
                  className="absolute inset-x-2 -bottom-1 h-[2px] rounded-md bg-accent"
                />
              )}
            </RadixTabs.Trigger>
          )
        })}
      </RadixTabs.List>

      {children}
    </RadixTabs.Root>
  )
}

export const Tab: FC<{
  label: string
  children: React.ReactNode
}> = ({ label, children }) => {
  return <RadixTabs.Content value={label}>{children}</RadixTabs.Content>
}
