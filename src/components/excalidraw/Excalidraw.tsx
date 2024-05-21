'use client'

import React, { forwardRef, useEffect, useMemo, useRef, useState } from 'react'
import { useModalStack } from 'rc-modal-sheet'
import type { ExcalidrawElement } from '@excalidraw/excalidraw/types/element/types'
import type {
  AppState,
  BinaryFiles,
  ExcalidrawImperativeAPI,
} from '@excalidraw/excalidraw/types/types'

import { Excalidraw as Board, exportToBlob } from '@excalidraw/excalidraw'

import { currentIsMobile } from '~/atoms/hooks'
import { useIsDark } from '~/hooks/common/use-is-dark'
import { stopPropagation } from '~/lib/dom'
import { clsxm, safeJsonParse } from '~/lib/helper'

import { MotionButtonBase } from '../button'

export interface ExcalidrawProps {
  zenModeEnabled?: boolean
  viewModeEnabled?: boolean
  showExtendButton?: boolean
  onChange?: (
    elements: readonly ExcalidrawElement[],
    appState: AppState,
    files: BinaryFiles,
  ) => void
  className?: string
  onReady?: (api: ExcalidrawImperativeAPI) => void

  ////
  data?: object
  refUrl?: string
}

export const Excalidraw = forwardRef<
  {},
  Omit<ExcalidrawProps, 'refUrl' | 'patchDiffDelta' | 'data'> & {
    data: string
  }
>((props, ref) => {
  const { data, ...rest } = props
  const transformedProps: {
    data?: ExcalidrawElement
    refUrl?: string
  } = useMemo(() => {
    if (!data) return {}
    const tryParseJson = safeJsonParse(data)
    if (!tryParseJson) {
      // 1. data 是 string，取第一行判断
      const splittedLines = data.split('\n')
      const firstLine = splittedLines[0]

      const props = {} as any
      // 第一行是地址
      if (firstLine.startsWith('/')) {
        props.refUrl = firstLine
      }

      return props
    } else {
      return {
        data: tryParseJson as ExcalidrawElement,
      }
    }
  }, [data])

  const internalRef = useRef<InternelExcalidrawRefObject>(null)

  return <ExcalidrawImpl ref={internalRef} {...rest} {...transformedProps} />
})

Excalidraw.displayName = 'Excalidraw'

interface InternelExcalidrawRefObject {
  getRemoteData(): ExcalidrawElement | null | undefined
}

const ExcalidrawImpl = forwardRef<InternelExcalidrawRefObject, ExcalidrawProps>(
  ({
    data,

    viewModeEnabled = true,
    zenModeEnabled = true,
    onChange,
    className,

    onReady,
    showExtendButton,
    refUrl,
  }) => {
    const excalidrawAPIRef = React.useRef<ExcalidrawImperativeAPI>()

    const isDarkMode = useIsDark()

    const [finalData, setFinalData] = React.useState<ExcalidrawElement | null>(
      null,
    )

    const [loading, setLoading] = useState(false)

    useEffect(() => {
      let isMounted = true
      if (refUrl) {
        setLoading(true)
        fetch(refUrl)
          .then((res) => res.text())
          .then((text) => {
            if (!isMounted) return
            const tryParseJson = safeJsonParse(text)
            if (tryParseJson) {
              setFinalData(tryParseJson as ExcalidrawElement)
            }

            setLoading(false)
          })
      } else {
        setFinalData(data as ExcalidrawElement)
        setLoading(false)
      }

      return () => {
        setLoading(false)
        isMounted = false
      }
    }, [data, refUrl])
    const modal = useModalStack()
    return (
      <div
        onKeyDown={stopPropagation}
        onKeyUp={stopPropagation}
        className={clsxm('relative h-[500px] w-full', className)}
      >
        {loading && (
          <div className="absolute inset-0 z-10 flex center">
            <div className="loading loading-spinner" />
          </div>
        )}
        <Board
          key={JSON.stringify(finalData)}
          theme={isDarkMode ? 'dark' : 'light'}
          initialData={finalData}
          detectScroll={false}
          zenModeEnabled={zenModeEnabled}
          onChange={onChange}
          viewModeEnabled={viewModeEnabled}
          excalidrawAPI={(api) => {
            excalidrawAPIRef.current = api

            setTimeout(() => {
              api.scrollToContent(undefined, {
                fitToContent: true,
              })
            }, 300)

            onReady?.(api)
          }}
        />

        {viewModeEnabled && showExtendButton && (
          <MotionButtonBase
            onClick={() => {
              if (!excalidrawAPIRef.current) {
                return
              }

              const elements = excalidrawAPIRef.current.getSceneElements()
              if (currentIsMobile()) {
                const win = window.open()
                const blob = exportToBlob({
                  elements,
                  files: null,
                })
                blob.then((blob) => {
                  win?.location.replace(URL.createObjectURL(blob))
                })
              } else {
                modal.present({
                  title: 'Preview',
                  content: () => (
                    <ExcalidrawImpl
                      data={data}
                      className="h-full"
                      showExtendButton={false}
                      refUrl={refUrl}
                    />
                  ),

                  max: true,
                })
              }
            }}
            className={clsxm(
              'absolute bottom-2 right-2 z-10 box-content flex size-5 rounded-md border p-2 center',
              'border-zinc-200 bg-base-100 text-zinc-600',
              'dark:border-neutral-800 dark:text-zinc-500',
            )}
          >
            <i className="icon-[mingcute--external-link-line]" />
          </MotionButtonBase>
        )}
      </div>
    )
  },
)
ExcalidrawImpl.displayName = 'ExcalidrawImpl'
