"use client"

import type { HTMLMotionProps, Spring, Target, TargetAndTransition } from "framer-motion"
import { m } from "framer-motion"
import type { ForwardRefExoticComponent, PropsWithChildren, RefAttributes } from "react"
import { memo, useMemo } from "react"

import { microReboundPreset } from "~/constants/spring"

import { isHydrationEnded } from "../shared/HydrationEndDetector"
import type { BaseTransitionProps } from "./typings"

interface TransitionViewParams {
  from: Target
  to: Target
  initial?: Target
  preset?: Spring
}

export const createTransitionView = (params: TransitionViewParams) => {
  const { from, to, initial, preset } = params

  const TransitionView = ({
    ref,
    ...props
  }: PropsWithChildren<BaseTransitionProps> & {
    ref?: React.RefObject<HTMLElement | null>
  }) => {
    const {
      timeout = {},
      duration = 0.5,

      animation = {},
      as = "div",
      delay = 0,
      lcpOptimization = false,
      ...rest
    } = props

    const { enter = delay, exit = delay } = timeout

    const MotionComponent = m[as] as ForwardRefExoticComponent<
      HTMLMotionProps<any> & RefAttributes<HTMLElement>
    >

    return (
      <MotionComponent
        initial={useMemo(
          () => (lcpOptimization ? (isHydrationEnded() ? initial || from : true) : initial || from),
          [],
        )}
        ref={ref}
        animate={{
          ...to,
          transition: {
            duration,
            ...(preset || microReboundPreset),
            ...animation.enter,
            delay: enter / 1000,
          },
        }}
        exit={{
          ...from,
          transition: {
            duration,
            ...animation.exit,
            delay: exit / 1000,
          } as TargetAndTransition["transition"],
        }}
        transition={{
          duration,
        }}
        {...rest}
      >
        {props.children}
      </MotionComponent>
    )
  }
  TransitionView.displayName = `forwardRef(TransitionView)`
  const MemoedTransitionView = memo(TransitionView)
  MemoedTransitionView.displayName = `MemoedTransitionView`
  return MemoedTransitionView
}
