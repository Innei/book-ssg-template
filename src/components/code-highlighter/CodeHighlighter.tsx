import {
  bundledLanguages,
  getSingletonHighlighter,
} from 'shiki/bundle-full.mjs'
import type { FC } from 'react'

import {
  MdiLanguageCss3,
  MdiLanguageHtml5,
  MdiLanguageJavascript,
  MdiLanguageTypescript,
  RiMarkdownFill,
  UilReact,
} from '../icons/platform/Language'
import { FluentShieldError20Regular } from '../icons/status'
import { CodeBlockWrapper } from './CodeBlockWrapper'
import { codeHighlighter } from './utils'

declare global {
  interface Window {
    Prism: any
  }
}

interface Props {
  lang: string | undefined
  content: string
  raw?: string
  attrs?: string
}

const languageToIconMap = {
  jsx: <UilReact />,
  tsx: <UilReact />,
  js: <MdiLanguageJavascript />,
  ts: <MdiLanguageTypescript />,
  javascript: <MdiLanguageJavascript />,
  typescript: <MdiLanguageTypescript />,
  javascriptreact: <UilReact />,
  typescriptreact: <UilReact />,
  html: <MdiLanguageHtml5 />,
  css: <MdiLanguageCss3 />,
  markdown: <RiMarkdownFill />,
  md: <RiMarkdownFill />,
  bash: <FluentShieldError20Regular />,
  sh: <FluentShieldError20Regular />,
  shell: <FluentShieldError20Regular />,
  zsh: <FluentShieldError20Regular />,
}

export const HighLighter: FC<Props> = async (props) => {
  const { lang: language, content: value, attrs } = props

  const highlighter = await getSingletonHighlighter({
    themes: [
      import('shiki/themes/github-light.mjs'),
      import('shiki/themes/github-dark.mjs'),
    ],
    langs: Object.keys(bundledLanguages),
  })
  return (
    <CodeBlockWrapper
      {...props}
      renderedHtml={codeHighlighter(highlighter, {
        attrs: attrs || '',
        code: value,
        lang: language || '',
      })}
      langIcon={
        languageToIconMap[
          language?.toLowerCase() as keyof typeof languageToIconMap
        ]
      }
    />
  )
}
