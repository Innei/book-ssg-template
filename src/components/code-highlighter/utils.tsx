import type {
  BundledLanguage,
  BundledTheme,
  CodeToHastOptions,
  HighlighterCore,
} from 'shiki'

import {
  transformerMetaHighlight,
  transformerNotationDiff,
  transformerNotationHighlight,
  transformerNotationWordHighlight,
} from '@shikijs/transformers'

export function codeHighlighter(
  highlighter: HighlighterCore,
  {
    lang,
    attrs,
    code,
  }: {
    lang: string
    attrs: string
    code: string
  },
) {
  const codeOptions: CodeToHastOptions<BundledLanguage, BundledTheme> = {
    lang,
    meta: {
      __raw: attrs,
    },
    themes: {
      light: 'github-light',
      dark: 'github-dark',
    },
  }

  return highlighter.codeToHtml(code, {
    ...codeOptions,
    transformers: [
      ...(codeOptions.transformers || []),
      transformerNotationDiff({ matchAlgorithm: 'v3' }),
      transformerNotationHighlight({ matchAlgorithm: 'v3' }),
      transformerNotationWordHighlight({ matchAlgorithm: 'v3' }),
      transformerMetaHighlight(),
    ],
  })
}
