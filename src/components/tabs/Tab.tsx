'use client'

import * as RadixTabs from '@radix-ui/react-tabs'
import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useId,
  useState,
} from 'react'
import { m } from 'framer-motion'
import type { FC, PropsWithChildren } from 'react'

import { clsxm } from '~/lib/helper'

const TabActionContext = createContext<{
  addTab: (label: string) => void
}>(null!)
export const Tabs: FC<PropsWithChildren> = ({ children }) => {
  const [tabs, setTabs] = useState<string[]>([])
  const [activeTab, setActiveTab] = useState<string | null>(null)
  const id = useId()
  return (
    <TabActionContext.Provider
      value={{
        addTab: useCallback(
          (label) => {
            setTabs((tabs) => [...tabs, label])

            if (!activeTab) setActiveTab(label)
            return () => {
              setTabs((tabs) => tabs.filter((tab) => tab !== label))
            }
          },
          [activeTab],
        ),
      }}
    >
      <RadixTabs.Root value={activeTab || ''} onValueChange={setActiveTab}>
        <RadixTabs.List>
          {tabs.map((tab) => {
            return (
              <RadixTabs.Trigger
                className={clsxm('mr-4 p-2', 'relative')}
                key={tab}
                value={tab}
              >
                {tab}

                {activeTab === tab && (
                  <m.div
                    layoutId={`tab${id}`}
                    layout
                    className="absolute bottom-0 left-0 right-0 h-[2px] rounded-md bg-accent"
                  />
                )}
              </RadixTabs.Trigger>
            )
          })}
        </RadixTabs.List>

        {children}
      </RadixTabs.Root>
    </TabActionContext.Provider>
  )
}

export const Tab: FC<{
  label: string
  children: React.ReactNode
}> = ({ label, children }) => {
  const { addTab } = useContext(TabActionContext)
  useEffect(() => {
    return addTab(label)
  }, [])

  return <RadixTabs.Content value={label}>{children}</RadixTabs.Content>
}
