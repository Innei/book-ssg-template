export type DocumentGraph = SingleDocumentTree[]

export interface SingleDocumentTree {
  title: string
  paths: (string | PathWithMeta)[]
  slug: string
}
interface PathMeta {}
export type PathWithMeta = [string, PathMeta?]
