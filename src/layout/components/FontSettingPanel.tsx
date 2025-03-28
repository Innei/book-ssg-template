"use client"

import { produce } from "immer"
import { useAtomValue } from "jotai"
import { atomWithStorage, selectAtom } from "jotai/utils"
import { useEffect, useMemo } from "react"

import { MotionButtonBase } from "~/components/button"
import { FABPortable } from "~/components/fab"
import { FloatPanel } from "~/components/float-panel"
import { clsxm } from "~/lib/helper"
import { Noop } from "~/lib/noop"
import { jotaiStore } from "~/lib/store"

interface ReadingSetting {
  size: "small" | "medium" | "large"

  bg: "auto" | "light" | "dark" | "paper"
}
const readingSettingAtom = atomWithStorage("reading-setting", {
  size: "small",
  bg: "auto",
} as ReadingSetting)

export const FontSettingFab = () => {
  return (
    <>
      <FloatPanel
        triggerElement={
          <FABPortable onClick={Noop}>
            <i className="icon-[mingcute--font-line]" />
          </FABPortable>
        }
      >
        <main>
          <div className="mb-4 text-lg font-medium">字体大小</div>
          <div className="grid w-[200px] grid-cols-3 gap-4">
            <FontSizeItem size="small" />
            <FontSizeItem size="medium" />
            <FontSizeItem size="large" />
          </div>
        </main>
      </FloatPanel>
      <Adjustor />
    </>
  )
}

const Adjustor = () => {
  const setting = useAtomValue(readingSettingAtom)

  useEffect(() => {
    const size = {
      small: "14px",
      medium: "16px",
      large: "18px",
    }[setting.size]

    document.documentElement.style.setProperty("--article-font-size", size)
  }, [setting])
  return null
}

const FontSizeItem: Component<{
  size: "small" | "medium" | "large"
}> = ({ size }) => {
  const isSelected = useAtomValue(
    useMemo(
      () =>
        selectAtom(readingSettingAtom, (value) => {
          return value.size === size
        }),
      [size],
    ),
  )
  const classSize = {
    small: "text-[14px]",
    medium: "text-[16px]",
    large: "text-[18px]",
  }[size]

  return (
    <MotionButtonBase
      className={clsxm(
        "flex aspect-square select-none rounded-lg ring-1 ring-slate-100 center dark:ring-neutral-800",
        "duration-200",
        isSelected && "!ring-accent",

        classSize,
      )}
      data-event="字体大小"
      onClick={() => {
        jotaiStore.set(
          readingSettingAtom,
          produce((value) => {
            value.size = size
          }),
        )
      }}
    >
      文
    </MotionButtonBase>
  )
}
