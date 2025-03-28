"use client"

import { useAtomValue } from "jotai"
import type { ElementType } from "react"
import { useDeferredValue } from "react"
import { useInView } from "react-intersection-observer"

import { currentPostMetaAtom } from "~/atoms/current"
import { useIsMobile } from "~/atoms/hooks"
import { useReadPercent } from "~/hooks/shared/use-read-percent"
import { clsxm } from "~/lib/helper"
import { useIsEoFWrappedElement } from "~/providers/wrapped-element-provider"

import { RootPortal } from "../portal"

const ProgressIcon = (
  <svg xmlns="http://www.w3.org/2000/svg" width="1em" height="1em" viewBox="0 0 24 24">
    <path
      fill="currentColor"
      d="M11.994 21q-1.852 0-3.491-.707q-1.64-.708-2.864-1.932t-1.932-2.864Q3 13.857 3 12.007q0-1.875.71-3.512q.711-1.637 1.93-2.856q1.218-1.218 2.864-1.928Q10.151 3 12 3q.213 0 .356.144q.144.144.144.357q0 .212-.144.356Q12.213 4 12 4Q8.675 4 6.337 6.338T4 12q0 3.325 2.338 5.663T12 20q3.325 0 5.663-2.337T20 12q0-.213.144-.357q.144-.143.357-.143q.212 0 .356.144q.143.144.143.356q0 1.85-.71 3.496q-.711 1.646-1.93 2.865q-1.218 1.218-2.855 1.928q-1.637.711-3.511.711"
    />
  </svg>
)

export const ReadIndicator: Component<{
  as?: ElementType
}> = ({ className, as }) => {
  const readPercent = useReadPercent()
  const As = as || "span"

  const currentPost = useAtomValue(currentPostMetaAtom)
  const { ref, inView } = useInView()

  return (
    <As
      className={clsxm(
        "flex flex-wrap items-center gap-2 text-gray-800 opacity-60 dark:text-neutral-300",
        className,
      )}
      ref={ref}
    >
      {currentPost && (
        <>
          <div className="flex shrink-0 items-center gap-1">
            <i className="icon-[mingcute--text-line]" /> {currentPost.count}
          </div>{" "}
          <div className="flex shrink-0 items-center gap-1">
            <i className="icon-[mingcute--alarm-2-line]" /> {currentPost.readingTime}Min
          </div>
        </>
      )}

      <div className="flex shrink-0 items-center gap-1">
        {ProgressIcon} {readPercent}%
      </div>
      {!inView && <ReadIndicatorVertical className="right-px" />}
    </As>
  )
}

const ReadIndicatorVertical: Component = ({ className }) => {
  const readPercent = useDeferredValue(useReadPercent())
  const isEOA = useIsEoFWrappedElement()
  return (
    <RootPortal>
      <div
        className={clsxm(
          "fixed inset-y-0 right-0 z-[99] w-px transition-opacity duration-200 ease-in-out",
          isEOA ? "opacity-0" : "opacity-100",
          className,
        )}
      >
        <div
          className="absolute top-0 w-full bg-accent/80 duration-75 ease-linear"
          style={{
            height: `${readPercent}%`,
          }}
        />
      </div>
    </RootPortal>
  )
}
export const ReadIndicatorForMobile: Component<{}> = () => {
  const isMobile = useIsMobile()
  if (!isMobile) return null

  return <ReadIndicatorVertical />
}
