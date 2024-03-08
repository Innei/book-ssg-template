'use client'

import { clsxm } from '~/lib/helper'

import { AsideDonateButton } from '../shared/AsideDonateButton'
import { OnlyMobile } from '../viewport/OnlyMobile'
import { BluredBackground } from './internal/BluredBackground'
import styles from './internal/grid.module.css'
import { HeaderLeftButtonArea, HeaderLogoArea } from './internal/HeaderArea'
import { HeaderDrawerButton } from './internal/HeaderDrawerButton'
import { HeaderMeta } from './internal/HeaderMeta'
import { HeaderWithShadow } from './internal/HeaderWithShadow'

export const MobileHeader = () => {
  return (
    <OnlyMobile>
      <HeaderWithShadow>
        <BluredBackground />

        <div
          className={clsxm(
            'relative mx-auto grid h-full min-h-0 max-w-7xl grid-cols-[4.5rem_auto_4.5rem] lg:px-8',
            styles['header--grid'],
          )}
        >
          <HeaderLeftButtonArea>
            <HeaderDrawerButton />
          </HeaderLeftButtonArea>

          <HeaderLogoArea>
            <HeaderMeta />
          </HeaderLogoArea>

          <div className="flex h-full w-full items-center justify-center">
            <AsideDonateButton />
          </div>
        </div>
      </HeaderWithShadow>
    </OnlyMobile>
  )
}
