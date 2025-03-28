import { atom } from "jotai"

export const currentPostMetaAtom = atom(
  null as {
    count: string
    readingTime: string
  } | null,
)
