import { useEffect, useState } from 'react'
import type { Placement } from '@floating-ui/react-dom'
import type { PropsWithChildren } from 'react'

import { clsxm } from '~/lib/helper'

import { FloatPopover } from '../float-popover'

const isTextOverflowed = (element: HTMLElement) => {
  return (
    element.offsetWidth < element.scrollWidth ||
    element.offsetHeight < element.scrollHeight
  )
}
type EllipsisProps = PropsWithChildren<{
  width?: string
  className?: string
  disabled?: boolean

  wrapperClassName?: string

  placement?: Placement
}>

export const EllipsisTextWithTooltip = (props: EllipsisProps) => {
  const { children, className, width, disabled, wrapperClassName } = props

  const [textElRef, setTextElRef] = useState<HTMLSpanElement | null>()
  const [isOverflowed, setIsOverflowed] = useState(false)

  const judgment = () => {
    if (!textElRef) return

    setIsOverflowed(isTextOverflowed(textElRef))
  }
  useEffect(() => {
    judgment()
  }, [textElRef, children])

  useEffect(() => {
    if (!textElRef) return
    const resizeObserver = new ResizeObserver(() => {
      judgment()
    })
    resizeObserver.observe(textElRef)

    return () => {
      resizeObserver.disconnect()
    }
  }, [textElRef])

  return (
    <FloatPopover
      type="tooltip"
      wrapperClassName={clsxm('w-full min-w-0 truncate', wrapperClassName)}
      placement={props.placement}
      isDisabled={!isOverflowed || disabled}
      triggerElement={
        <span
          className={className}
          ref={setTextElRef}
          style={
            width
              ? {
                  maxWidth: width,
                }
              : undefined
          }
        >
          {children}
        </span>
      }
    >
      <span
        className="max-w-[30vw] break-all hover:!bg-transparent"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </span>
    </FloatPopover>
  )
}

/**
 * 横向文本溢出时，显示省略号并且鼠标悬浮时显示完整文本
 */
export const EllipsisHorizontalTextWithTooltip = (props: EllipsisProps) => {
  const { className, ...rest } = props
  return (
    <EllipsisTextWithTooltip
      className={clsxm('block truncate', className)}
      {...rest}
    />
  )
}
