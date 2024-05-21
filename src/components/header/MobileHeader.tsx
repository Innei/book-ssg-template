'use client'

import { useViewport } from '~/atoms/hooks'
import { clsxm } from '~/lib/helper'

import { AsideDonateButton } from '../shared/AsideDonateButton'
import { BluredBackground } from './internal/BluredBackground'
import styles from './internal/grid.module.css'
import { HeaderLeftButtonArea, HeaderLogoArea } from './internal/HeaderArea'
import { HeaderDrawerButton } from './internal/HeaderDrawerButton'
import { HeaderMeta } from './internal/HeaderMeta'
import { HeaderWithShadow } from './internal/HeaderWithShadow'

export const MobileHeader = () => {
  const show = useViewport((v) => v.w <= 1280)
  if (!show) return null
  return (
    <HeaderWithShadow>
      <BluredBackground />

      <div
        className={clsxm(
          'relative mx-auto grid h-full min-h-0 max-w-7xl grid-cols-[4.5rem_auto_4.5rem] xl:px-8',
          styles['header--grid'],
        )}
      >
        <HeaderLeftButtonArea>
          <HeaderDrawerButton />
        </HeaderLeftButtonArea>

        <HeaderLogoArea>
          <HeaderMeta />
        </HeaderLogoArea>

        <div className="flex size-full items-center justify-center">
          <AsideDonateButton />
        </div>
      </div>
    </HeaderWithShadow>
  )
}
