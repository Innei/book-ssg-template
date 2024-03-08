import { atom, useAtomValue } from 'jotai'

import { jotaiStore } from '~/lib/store'

const isPrintModeAtom = atom(false)

export const useIsPrintMode = () => useAtomValue(isPrintModeAtom)
export const setIsPrintMode = (value: boolean) =>
  jotaiStore.set(isPrintModeAtom, value)
