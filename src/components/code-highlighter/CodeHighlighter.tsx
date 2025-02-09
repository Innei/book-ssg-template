import {
  bundledLanguages,
  getSingletonHighlighter,
} from 'shiki/bundle-full.mjs'
import type { FC } from 'react'

import {
  SimpleIconsCss,
  SimpleIconsHtml5,
  SimpleIconsJavascript,
  SimpleIconsMarkdown,
  SimpleIconsReact,
  SimpleIconsSwift,
  SimpleIconsTypescript,
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

export const languageToIconMap = {
  jsx: <SimpleIconsReact />,
  tsx: <SimpleIconsReact />,
  js: <SimpleIconsJavascript />,
  ts: <SimpleIconsTypescript />,
  javascript: <SimpleIconsJavascript />,
  typescript: <SimpleIconsTypescript />,
  javascriptreact: <SimpleIconsReact />,
  typescriptreact: <SimpleIconsReact />,
  html: <SimpleIconsHtml5 />,
  css: <SimpleIconsCss />,
  markdown: <SimpleIconsMarkdown />,
  md: <SimpleIconsMarkdown />,
  bash: <FluentShieldError20Regular />,
  sh: <FluentShieldError20Regular />,
  shell: <FluentShieldError20Regular />,
  swift: <SimpleIconsSwift />,
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
