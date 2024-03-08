'use client'

import React, { useEffect, useRef, useState } from 'react'
import mediumZoom from 'medium-zoom'
import type { Zoom } from 'medium-zoom'

import { isServerSide } from '~/lib/env'
import { isVideoExt } from '~/lib/mine-type'

import { Divider } from '../../divider/Divider'

let zoomer: Zoom
export const MarkdownImage = (props: {
  src: string
  alt?: string
  width?: number
  height?: number
}) => {
  const { src, alt } = props
  const nextProps = {
    ...props,
  }
  nextProps.alt = alt?.replace(/^[¡!]/, '')
  const [zoom] = useState(() => {
    if (isServerSide) return null
    if (zoomer) {
      return zoomer
    }
    zoomer = mediumZoom('img')
    return zoomer
  })

  const imageRef = useRef<HTMLImageElement>(null)
  useEffect(() => {
    const $image = imageRef.current
    if (!$image) return
    if (!zoom) return
    if (imageRef) {
      zoom.attach($image)
    }
    return () => {
      zoom.detach($image)
    }
  }, [src, zoom])

  const ext = src.split('.').pop()
  if (ext && isVideoExt(ext)) {
    const figcaption = alt?.replace(/^[¡!]/, '')
    return (
      <div className="flex flex-col items-center">
        <video
          className="w-full"
          src={src}
          controls
          playsInline
          muted
          autoPlay={false}
        />
        {figcaption && (
          <p className="mt-1 flex flex-col items-center justify-center text-sm">
            <Divider className="w-[80px] opacity-80" />
            <span className="opacity-90">{figcaption}</span>
          </p>
        )}
      </div>
    )
  } else {
    return <img ref={imageRef} {...nextProps} />
  }
}
