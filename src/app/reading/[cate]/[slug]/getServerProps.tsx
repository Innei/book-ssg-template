import { join } from 'path'
import { cache } from 'react'
import { notFound } from 'next/navigation'
import type { TGitHistory } from '~/lib/git'

import { buildSectionData as _buildSectionData } from '~/core'
import { getFileGitHistory } from '~/lib/git'
import { cloneDeep } from '~/lib/lodash'

const buildSectionData = cache(_buildSectionData)
export { buildSectionData as cache_buildSectionData }

export const getServerProps = cache(
  async (params: { cate: string; slug: string }) => {
    const path = `${params.cate}/${params.slug}`
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
        ? {
            title: flatPaths[idx - 1].item.title,
            path: flatPaths[idx - 1].path,
          }
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

    const fileOriginPath = join('markdown/', path2SectionMap[path].rawFilePath)
    const histories = await getFileGitHistory(fileOriginPath)

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
  },
)
