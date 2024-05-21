'use client'

import { AnimatePresence, m } from 'framer-motion'

import { SEO } from '~/app.config'
import { microReboundPreset } from '~/constants/spring'

import { useHeaderMetaInfo, useHeaderMetaShouldShow } from './hooks'

const animationProps = {
  initial: {
    opacity: 0,
    y: 20,
  },
  exit: {
    opacity: 0,
    y: 20,
  },
  animate: {
    opacity: 1,
    y: 0,

    transition: {
      ...microReboundPreset,
    },
  },
}

export const HeaderMeta = () => {
  const show = useHeaderMetaShouldShow()
  const { description, title, slug } = useHeaderMetaInfo()

  return (
    <AnimatePresence>
      {show && (
        <m.div
          className="absolute inset-0 flex min-w-0 items-center justify-between px-0 lg:px-16"
          data-testid="header-meta"
          {...animationProps}
        >
          <div className="align-center flex min-w-0 shrink grow flex-col">
            <small className="min-w-0 truncate">
              <span className="text-gray-600/60 dark:text-gray-300/60">
                {description}
              </span>
            </small>
            <h2 className="min-w-0 truncate text-[1.2rem] font-medium leading-normal">
              {title}
            </h2>
          </div>

          <div className="hidden min-w-0 shrink flex-col text-right leading-5 lg:flex">
            <small className="min-w-0 truncate whitespace-pre text-gray-600/60 dark:text-gray-300/60">
              {' '}
              {slug}
            </small>
            <span className="font-medium text-gray-600 dark:text-gray-300">
              {SEO.title.absolute}
            </span>
          </div>
        </m.div>
      )}
    </AnimatePresence>
  )
}
