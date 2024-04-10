import type { PropsWithChildren } from 'react'

import { ReadingLayout } from '~/layout/ReadingLayout'

export default async (props: PropsWithChildren) => {
  return <ReadingLayout>{props.children}</ReadingLayout>
}
