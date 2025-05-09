"use client"

import { useEffect } from "react"

import { setIsInteractive } from "~/atoms"
import { setIsPrintMode } from "~/atoms/css-media"
import { viewportAtom } from "~/atoms/viewport"
import { throttle } from "~/lib/lodash"
import { jotaiStore } from "~/lib/store"

export const EventProvider: Component = ({ children }) => {
  useEffect(() => {
    const readViewport = throttle(() => {
      const { innerWidth: w, innerHeight: h } = window
      const sm = w >= 640
      const md = w >= 768
      const lg = w >= 1024
      const xl = w >= 1280
      const _2xl = w >= 1536
      jotaiStore.set(viewportAtom, {
        sm,
        md,
        lg,
        xl,
        "2xl": _2xl,
        h,
        w,
      })
    }, 16)

    readViewport()

    window.addEventListener("resize", readViewport)
    return () => {
      window.removeEventListener("resize", readViewport)
    }
  }, [])

  useEffect(() => {
    setIsInteractive(true)
  }, [])

  useEffect(() => {
    const getMediaType = <T extends { matches: boolean }>(e: T) => {
      setIsPrintMode(!e.matches)
    }

    getMediaType(window.matchMedia("screen"))

    const callback = (e: MediaQueryListEvent): void => {
      getMediaType(e)
    }
    try {
      window.matchMedia("screen").addEventListener("change", callback)
    } catch {}

    return () => {
      window.matchMedia("screen").removeEventListener("change", callback)
    }
  }, [])

  return <>{children}</>
}
