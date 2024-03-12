import { join } from 'path'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { TGitHistory } from '~/lib/git'
import type { Metadata, ResolvingMetadata } from 'next'

import { Divider } from '~/components/divider'
import { MainMarkdown } from '~/components/markdown'
import { buildSectionData as _buildSectionData } from '~/core'
import { getFileGitHistory } from '~/lib/git'
import { cloneDeep } from '~/lib/lodash'

import { GitHistory } from './components/git-history'
import { Hooks } from './hooks'

const buildSectionData = cache(_buildSectionData)
export function generateStaticParams() {
  const { flatPaths } = buildSectionData()

  return flatPaths.map(({ path }) => ({
    all: path.split('/'),
  }))
}

const getServerProps = cache(async (params: { all: string[] }) => {
  const path = params.all.join('/').trim()
  const { path2SectionMap, sections, flatPaths } = buildSectionData()

  const idx = flatPaths.findIndex(({ path: _path }) => _path === path)!

  const nextObject =
    idx < flatPaths.length - 1
      ? {
          title: flatPaths[idx + 1].item.title,
          path: flatPaths[idx + 1].path,
        }
      : null

  const prevObject =
    idx > 0
      ? { title: flatPaths[idx - 1].item.title, path: flatPaths[idx - 1].path }
      : null

  const omitSection = cloneDeep(sections).map((section) => {
    section.items = section.items.map(
      ({ text, tree, meta, parent, rawFilePath, ...item }) => {
        return item
      },
    ) as any
    return section
  })

  if (!path2SectionMap[path]) {
    notFound()
  }

  const histories = await getFileGitHistory(
    join('markdown/', path2SectionMap[path].rawFilePath),
  )

  const historyList = [] as TGitHistory[]
  if (histories) {
    histories.split('\n').forEach((line) => {
      const [hash, author_name, time, commit_message] = line.split(' ')
      historyList.push({
        time,
        commit_message,
        author_name,
        hash,
      })
    })
  }

  return {
    ...path2SectionMap[path],

    prev: prevObject,
    next: nextObject,

    sections: omitSection,

    history: historyList,
  }
})
export async function generateMetadata(
  props: {
    params: {
      all: string[]
    }
  },
  parent: ResolvingMetadata,
): Promise<Metadata> {
  const { title } = await getServerProps(props.params)
  return {
    title,
  }
}

export default async (props: {
  params: {
    all: string[]
  }
}) => {
  const { text, count, readingTime, title, history, updatedAt } =
    await getServerProps(props.params)

  return (
    <div className="prose min-h-[calc(100vh-25rem)]">
      <Hooks {...{ count, readingTime, title }} />
      <MainMarkdown>{text}</MainMarkdown>

      {updatedAt && (
        <>
          <Divider className="ml-auto mt-6 w-1/4" />

          <p className="text-right opacity-80">
            最后更新于{' '}
            {updatedAt
              ? new Date(updatedAt).toLocaleString('zh-CN', {
                  timeZone: 'Asia/Shanghai',
                })
              : 'N/A'}
          </p>
        </>
      )}

      <GitHistory history={history} />
    </div>
  )
}
