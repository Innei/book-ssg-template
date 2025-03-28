"use client"

import { useAnimationControls } from "framer-motion"
import type { FC } from "react"
import * as React from "react"
import { useEffect, useState } from "react"

import { FadeInOutTransitionView } from "./FadeInOutTransitionView"

interface IconTransitionProps {
  solidIcon: React.JSX.Element
  regularIcon: React.JSX.Element
  currentState: "solid" | "regular"
}
export const IconTransition: FC<IconTransitionProps> = (props) => {
  const { currentState, regularIcon, solidIcon } = props

  const map = {
    solid: solidIcon,
    regular: regularIcon,
  }
  const [currentIcon, setCurrentIcon] = useState(map[currentState])
  const controls = useAnimationControls()

  useEffect(() => {
    controls.start({ opacity: 0.001 }).then(() => {
      setCurrentIcon(map[currentState])
      requestAnimationFrame(() => {
        controls.start({ opacity: 1 })
      })
    })
  }, [currentState])

  return (
    <FadeInOutTransitionView
      initial
      animate={controls}
      transition={{ duration: 0.2 }}
      key={currentState}
    >
      {currentIcon}
    </FadeInOutTransitionView>
  )
}
