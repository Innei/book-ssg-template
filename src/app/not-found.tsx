import { redirect } from 'next/navigation'

import { buildSectionData } from '~/core'

export default async () => {
  const { sections } = buildSectionData()

  const path = sections.at(0)?.items.at(0)?.path
  if (path) redirect(`/reading/${path}`)
  return 'Not Found'
}
