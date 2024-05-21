import { join } from 'path'

import _jsonData from '~/../markdown/index.json'
import { symbolsCount, symbolsTime } from '~/lib/count'
import { getLastGitUpdateTime } from '~/lib/git'
import {
  extractFirstHeadingText,
  parseYamlFrontMatterSync,
  removeYamlFrontMatter,
} from '~/lib/remark'

interface PageMeta {
  hide?: boolean
}
export type PathWithMeta = [string, PageMeta?]

interface Tree {
  title: string
  slug: string
  paths: (string | PathWithMeta)[]
  children?: Tree[]
}
type JSONData = Tree[]

const jsonData = _jsonData as JSONData

export type PostItem = {
  path: string
  text: string
  parent: string | null
  tree: Tree
  depth: number
  count: string
  readingTime: string
  title: string
  rawFilePath: string
  meta: Record<string, unknown>

  updatedAt: Date | null
}

export type Section = {
  items: PostItem[]

  title: string
}

function importMarkdownFile(path: string) {
  // 使用 require.context 定义一个上下文，其中包括所有 markdown 文件
  const markdownContext = (require as any).context(
    '../../markdown/',
    true,
    /\.md$/,
  )

  // 使用动态路径来 require 文件
  return markdownContext(path)
}

export const buildSectionData = () => {
  const sections = [] as Section[]

  const path2SectionMap = {} as Record<string, Section['items'][number]>

  const dfs = (tree: Tree, depth = 1, parentPath?: string) => {
    const paths = tree.paths
    const slug = tree.slug
    const section: Section = {
      items: [],
      title: tree.title,
    }
    for (const path of paths) {
      const nextPath = `./sections/${slug}/${Array.isArray(path) ? path[0] : path}`

      const pageMeta = Array.isArray(path) ? path[1] ?? {} : ({} as PageMeta)

      if (pageMeta.hide) continue
      const file = importMarkdownFile(nextPath)

      const appPath = nextPath.replace('.md', '').replace('./sections/', '')

      const meta = Object.assign({}, parseYamlFrontMatterSync(file), pageMeta)
      const fileOriginPath = join('markdown/', nextPath)
      const gitUpdateTime = getLastGitUpdateTime(fileOriginPath)

      const item: PostItem = {
        path: appPath,
        text: removeYamlFrontMatter(file),

        count: symbolsCount(file),
        readingTime: symbolsTime(file, 0, 200),

        tree,
        depth,
        parent: parentPath || null,

        title: meta?.title || extractFirstHeadingText(file) || '',
        rawFilePath: nextPath,

        meta,

        updatedAt: gitUpdateTime,
      }

      section.items.push(item)

      if (tree.children) {
        for (const child of tree.children) {
          dfs(child, depth + 1, appPath)
        }
      }

      path2SectionMap[appPath] = item
    }
    sections.push(section)
  }

  for (const tree of jsonData) {
    dfs(tree)
  }

  const flatPaths = [] as FlattenPathObject[]
  sections.forEach((section) => {
    section.items.forEach((item) => {
      flatPaths.push({ path: item.path, item, section })
    })
  })

  return { sections, path2SectionMap, flatPaths }
}

export type FlattenPathObject = {
  path: string
  item: Section['items'][0]
  section: Section
}
