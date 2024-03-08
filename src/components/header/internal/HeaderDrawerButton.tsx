'use client'

import { useContext } from 'react'

import { PresentSheet } from '~/components/sheet'
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
  const headerDrawerCtx = useContext(HeaderDrawerContentContext)
  if (!headerDrawerCtx) return null
  if (!isClient) return ButtonElement

  return (
    <PresentSheet content={headerDrawerCtx.element}>
      {ButtonElement}
    </PresentSheet>
  )
}
