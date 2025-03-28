'use client'

import { use } from 'react'
import { PresentSheet } from 'rc-modal-sheet'

import { useIsClient } from '~/hooks/common/use-is-client'

import { HeaderDrawerContentContext } from '../provider'
import { HeaderActionButton } from './HeaderActionButton'

export const HeaderDrawerButton = () => {
  const isClient = useIsClient()
  const ButtonElement = (
    <HeaderActionButton>
      <i className="icon-[mingcute--menu-line]" />
    </HeaderActionButton>
  )
  const headerDrawerCtx = use(HeaderDrawerContentContext)
  if (!headerDrawerCtx) return null
  if (!isClient) return ButtonElement

  return (
    <PresentSheet content={headerDrawerCtx.element}>
      {ButtonElement}
    </PresentSheet>
  )
}
