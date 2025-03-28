'use client'

import * as React from 'react'

export const ProviderComposer: Component<{
  contexts: React.JSX.Element[]
}> = ({ contexts, children }) => {
  return contexts.reduceRight((kids: any, parent: any) => {
    return React.cloneElement(parent, { children: kids })
  }, children)
}
