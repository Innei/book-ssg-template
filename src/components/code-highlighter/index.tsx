import type { FC } from "react"
import { bundledLanguages, getSingletonHighlighter } from "shiki"

import { ShikiHighLighterWrapper } from "./CodeBlockWrapper"
import { codeHighlighter } from "./utils"

interface Props {
  lang: string | undefined
  content: string
  raw?: string
  attrs?: string
}

export const HighLighter: FC<Props> = async (props) => {
  const { lang: language, content: value, attrs } = props

  const highlighter = await getSingletonHighlighter({
    themes: [import("shiki/themes/github-light.mjs"), import("shiki/themes/github-dark.mjs")],
    langs: Object.keys(bundledLanguages),
  })

  return (
    <ShikiHighLighterWrapper
      shouldCollapsed
      {...props}
      renderedHTML={codeHighlighter(highlighter, {
        attrs: attrs || "",
        code: value,
        lang: language || "",
      })}

      // ref={setCodeBlockRef}
    />
  )
}
