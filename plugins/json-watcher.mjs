import { existsSync, writeFileSync } from 'fs'
import { readFile } from 'fs/promises'
import path from 'path'
import { fileURLToPath } from 'url'
import { watch } from 'chokidar'
import { globbySync } from 'globby'

const __dirname = path.resolve(fileURLToPath(import.meta.url), '..')
const dataJsonPath = path.resolve(__dirname, '../markdown/index.json')
const workdirPath = path.resolve(__dirname, '../markdown/sections')
const pathGlob = workdirPath + '/**/*.md'

const readFsDataJsonData = async () => {
  const hasFile = existsSync(dataJsonPath)

  if (!hasFile) {
    createDefaultDataJson()
    return readFsDataJsonData()
  }
  const data = await readFile(dataJsonPath, 'utf8')

  try {
    return JSON.parse(data)
  } catch {
    console.error('JSON parser error.')
    return []
  }
}

/**
 *
 * @param {import('./interface').DocumentGraph} data
 * @returns {Record<string, import('./interface').SingleDocumentTree & {pathSet: Set<string>}}
 */
const parseFsData = (data) => {
  if (!Array.isArray(data)) throw new TypeError('exist data json is broken.')

  const parsedMap = {}

  data.forEach((item) => {
    parsedMap[item.slug] = { ...item }

    const pathSet = new Set()
    parsedMap[item.slug].pathSet = pathSet

    item.paths.forEach((path) => {
      pathSet.add(Array.isArray(path) ? path[0] : path)
    })
  })

  return parsedMap
}

export async function bootstarp() {
  const patch = debounce(async () => {
    const fsJsonData = await readFsDataJsonData()

    const diffData = compareFsTreeWithExistJsonData(parseFsData(fsJsonData))
    console.log('diff', diffData)
    writeFileSync(
      dataJsonPath,
      JSON.stringify(patchDataJson(diffData, fsJsonData), null, 2),
      'utf8',
    )
  }, 800)
  await patch()
  const watcher = watch(pathGlob)

  watcher.on('add', (path) => {
    patch()
  })
  watcher.on('unlink', (path) => {
    patch()
  })
}

/**
 *
 * @param {{add: Record<string,string[]>,remove:Record<string,string[]>}} diffData
 * @param {import('./interface').DocumentGraph} fsJsonData
 */
function patchDataJson(diffData, fsJsonData) {
  const { add, remove } = diffData

  const clonedJsonData = [...fsJsonData]
  const slugifyJsonMap = clonedJsonData.reduce((acc, cur) => {
    acc[cur.slug] = cur
    return acc
  }, {})

  for (const [slug, paths] of Object.entries(add)) {
    if (!slugifyJsonMap[slug]) {
      clonedJsonData.push({
        paths,
        slug,
        title: slug,
      })

      continue
    }

    paths.forEach((path) => {
      slugifyJsonMap[slug].paths.push(path)
    })
  }

  for (const [slug, paths] of Object.entries(remove)) {
    if (!slugifyJsonMap[slug]) continue

    paths.forEach((path) => {
      const index = slugifyJsonMap[slug].paths.findIndex(
        (_path) => path === _path,
      )
      if (index > -1) {
        slugifyJsonMap[slug].paths.splice(index, 1)
      }
    })
  }

  return clonedJsonData
}

/**
 *
 * @param {Record<string, import('./interface').SingleDocumentTree & {pathSet: Set<string>}} data
 */
function compareFsTreeWithExistJsonData(data) {
  const diffAddPathMap = {}
  const diffRemovePathMap = {}
  const paths = globbySync(pathGlob, { onlyFiles: true })

  const slugSetMap = {}
  paths.forEach((fullPath) => {
    const pathArr = fullPath.replace(workdirPath, '').split('/').filter(Boolean)

    if (pathArr.length < 2) return
    const slug = pathArr.shift()
    if (!slug) return
    slugSetMap[slug] ||= new Set()

    slugSetMap[slug].add(`${pathArr.join('/')}`)
  })

  Object.keys(slugSetMap).map((slug) => {
    if (!data[slug]) {
      diffAddPathMap[slug] = Array.from(slugSetMap[slug])
      return
    }

    slugSetMap[slug].forEach((path) => {
      if (data[slug]?.pathSet.has(path)) {
        return
      }

      diffAddPathMap[slug] ||= []
      diffAddPathMap[slug].push(path)
    })

    data[slug]?.pathSet.forEach((path) => {
      if (!slugSetMap[slug]) {
        diffRemovePathMap[slug] = Array.from(data[slug].pathSet)
        return
      }

      if (!slugSetMap[slug].has(path)) {
        diffRemovePathMap[slug] ||= []
        diffRemovePathMap[slug].push(path)
      }
    })
  })

  return {
    add: diffAddPathMap,
    remove: diffRemovePathMap,
  }
}

function createDefaultDataJson() {
  /**
   * @type {import('./interface').DocumentGraph}
   */
  const jsonData = []
  /**
   * @type {Record<string, import('./interface').SingleDocumentTree>}
   */
  const slugToListMap = {}

  globbySync(pathGlob, { onlyFiles: true }).map((fullPath) => {
    const pathArr = fullPath.replace(workdirPath, '').split('/').filter(Boolean)

    if (pathArr.length < 2) return
    const slug = pathArr.shift()
    if (!slug) return

    let documentTree = slugToListMap[slug]

    if (!documentTree) {
      slugToListMap[slug] = {
        slug,
        paths: [],
        title: slug,
      }
      documentTree = slugToListMap[slug]
    }

    documentTree.paths.push(`${pathArr.join('/')}`)

    return pathArr
  })

  Object.values(slugToListMap).forEach((value) => {
    jsonData.push(value)
  })

  writeFileSync(dataJsonPath, JSON.stringify(jsonData, null, 2), 'utf8')
}

function debounce(fn, wait) {
  let callback = fn
  let timerId = null

  function debounced() {
    let context = this

    let args = arguments

    clearTimeout(timerId)
    timerId = setTimeout(function () {
      callback.apply(context, args)
    }, wait)
  }

  return debounced
}
