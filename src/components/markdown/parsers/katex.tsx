import React from 'react'
import katex from 'katex'
import { blockRegex, Priority, simpleInlineRegex } from 'markdown-to-jsx'
import type { MarkdownToJSX } from 'markdown-to-jsx'
import type { FC } from 'react'

//  $ c = \pm\sqrt{a^2 + b^2} $
export const KateXRule: MarkdownToJSX.Rule = {
  match: simpleInlineRegex(
    /^\$\s{0,}((?:\[.*?\]|<.*?>(?:.*?<.*?>)?|`.*?`|.)*?)\s{0,}\$/,
  ),
  order: Priority.MED,
  parse(capture) {
    return {
      type: 'kateX',
      katex: capture[1],
    }
  },
  react(node, output, state) {
    return <LateX key={state?.key}>{node.katex}</LateX>
  },
}

type LateXProps = {
  children: string
  mode?: string // If `display` the math will be rendered in display mode. Otherwise the math will be rendered in inline mode.
}

const LateX: FC<LateXProps> = (props) => {
  const { children, mode } = props
  const displayMode = mode === 'display'
  const throwOnError = false // render unsupported commands as text instead of throwing a `ParseError`

  return (
    <span
      dangerouslySetInnerHTML={{
        __html: katex.renderToString(children, {
          displayMode,
          throwOnError,
        }),
      }}
    />
  )
}

export const KateXBlockRule: MarkdownToJSX.Rule = {
  match: blockRegex(
    new RegExp(`^\\s*\\$\\$ *(?<content>[\\s\\S]+?)\\s*\\$\\$ *(?:\n *)+\n?`),
  ),

  order: Priority.LOW,
  parse(capture) {
    return {
      type: 'kateXBlock',
      groups: capture.groups,
    }
  },
  react(node, _, state?) {
    return (
      <div key={state?.key}>
        <LateX mode="display">{node.groups.content}</LateX>
      </div>
    )
  },
}
