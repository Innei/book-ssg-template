'use client'

import { memo } from 'react'
import Link from 'next/link'
import { useParams } from 'next/navigation'

import { EllipsisHorizontalTextWithTooltip } from '~/components/typography'
import { clsxm } from '~/lib/helper'

export const LeftAsideLink = memo(
  ({
    title,
    path,
    depth,
    fullPath,
  }: {
    fullPath: string

    title: string
    path: string
    depth: number
  }) => {
    const params = useParams()

    const readingPath = `${params.cate}/${params.slug}`

    return (
      <li
        className={clsxm(
          'text-base font-medium opacity-60 duration-200 hover:opacity-90',

          fullPath.replace('/reading/', '') === readingPath &&
            'text-accent opacity-100',
        )}
        key={path}
        style={{
          marginLeft: `${depth * 12}px`,
        }}
      >
        <Link href={fullPath}>
          <EllipsisHorizontalTextWithTooltip placement="right">
            {title}
          </EllipsisHorizontalTextWithTooltip>
        </Link>
      </li>
    )
  },
)

LeftAsideLink.displayName = 'LeftAsideLink'
