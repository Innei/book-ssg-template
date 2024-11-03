import { ImageResponse } from 'next/og'
import type { NextRequest } from 'next/server'

import { SEO } from '~/app.config'

import { cache_buildSectionData, getServerProps } from '../getServerProps'

export function generateStaticParams() {
  const { flatPaths } = cache_buildSectionData()

  return flatPaths.map(({ path }) => {
    const [cate, slug] = path.split('/')
    return {
      cate,
      slug,
    }
  })
}

export const GET = async (
  req: NextRequest,
  props: {
    params: Promise<{ cate: string; slug: string }>
  },
) => {
  const params = await props.params
  const bgAccent = '#95cb9d'
  const bgAccentLight = '#d9ecdc'
  const bgAccentUltraLight = '#eef7ef'

  let canShownTitle = ''

  let leftContainerWidth = 1200 - 128 * 2

  const { title } = await getServerProps(params)
  for (const char of title) {
    if (leftContainerWidth < 0) break
    //  cjk 字符算 64 px
    // char 不能是 emoji
    if ((char >= '\u4e00' && char <= '\u9fa5') || char === ' ') {
      leftContainerWidth -= 64
      canShownTitle += char
    } else if (char >= '\u0000' && char <= '\u00ff') {
      // latin 字符算 40px
      leftContainerWidth -= 40
      canShownTitle += char
    } else {
      leftContainerWidth -= 64
      canShownTitle += char
    }
  }

  return new ImageResponse(
    (
      <div
        style={{
          display: 'flex',
          height: '100%',
          width: '100%',
          background: `linear-gradient(37deg, ${bgAccent} 27.82%, ${bgAccentLight} 79.68%, ${bgAccentUltraLight} 100%)`,
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <div
          tw="absolute left-8 right-8 top-1/2 flex text-center"
          style={{
            transform: 'translateY(-50%)',
            justifyContent: 'center',
          }}
        >
          <h1
            style={{
              fontSize: `${(canShownTitle.length / title.length) * 64}px`,
              whiteSpace: 'nowrap',
              textOverflow: 'ellipsis',
              WebkitLineClamp: 1,
              lineClamp: 1,
              textAlign: 'center',
            }}
          >
            {title}
          </h1>
        </div>
        <div tw="flex items-center absolute bottom-8 left-8">
          <div tw="text-2xl">{SEO.title.absolute}</div>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
    },
  )
}
