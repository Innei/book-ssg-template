import * as React from 'react'
import { Fragment } from 'react'
import { clsx } from 'clsx'
import MarkdownJSX, { sanitizeUrl } from 'markdown-to-jsx'
import Script from 'next/script'
import type { MarkdownToJSX } from 'markdown-to-jsx'
import type { FC } from 'react'

import { FloatPopover } from '~/components/float-popover'
import { MAIN_MARKDOWN_ID } from '~/constants/dom-id'
import { isDev } from '~/lib/env'
import { noopObj } from '~/lib/noop'
import { springScrollToElement } from '~/lib/scroller'
import { markdownComponents } from '~/markdown-components'

import { LinkCard, LinkCardSource } from '../link-card'
import { MLink } from '../link/MLink'
import { CodeBlockRender } from '../shared/CodeBlock'
import { Tab, Tabs } from '../tabs'
import styles from './markdown.module.css'
import { AlertsRule } from './parsers/alert'
import { ContainerRule } from './parsers/container'
import { InsertRule } from './parsers/ins'
import { KateXBlockRule, KateXRule } from './parsers/katex'
import { MarkRule } from './parsers/mark'
import { MentionRule } from './parsers/mention'
import { SpoilerRule } from './parsers/spoiler'
import {
  MParagraph,
  MTable,
  MTableBody,
  MTableHead,
  MTableRow,
} from './renderers'
import { MDetails } from './renderers/collapse'
import { MFootNote } from './renderers/footnotes'
import { MHeader } from './renderers/heading'
import { MarkdownImage } from './renderers/image'
import { getFootNoteDomId, getFootNoteRefDomId } from './utils/get-id'
import { redHighlight } from './utils/redHighlight'

export interface MdProps {
  value?: string

  style?: React.CSSProperties
  readonly renderers?: Record<string, Partial<MarkdownToJSX.Rule>>
  wrapperProps?: React.DetailedHTMLProps<
    React.HTMLAttributes<HTMLDivElement>,
    HTMLDivElement
  >
  codeBlockFully?: boolean
  className?: string
  as?: React.ElementType

  allowsScript?: boolean

  removeWrapper?: boolean
}

const options: MarkdownToJSX.Options = {
  wrapper: Fragment,
  // @ts-ignore
  overrides: {
    // FIXME https://github.com/hashicorp/next-mdx-remote/issues/405#issuecomment-1755491272
    p: (props) => <MParagraph {...props} />,

    thead: (props) => <MTableHead {...props} />,
    tr: (props) => <MTableRow {...props} />,
    tbody: (props) => <MTableBody {...props} />,
    // Ide,
    table: (props) => <MTable {...props} />,

    footer: (props) => <MFootNote {...props} />,
    details: (props) => <MDetails {...props} />,
    img: (props) => <MarkdownImage {...props} />,

    script: (props) => <Script {...props} />,

    Tabs: (props) => <Tabs {...props} />,
    Tab: (props) => <Tab {...props} />,

    // p: MParagraph,
    // thead: MTableHead,
    // tr: MTableRow,
    // tbody: MTableBody,
    // table: MTable,
    // footer: MFootNote,
    // details: MDetails,
    // img: MarkdownImage,
    // script: Script,
    // Tabs,
    // Tab,

    ...markdownComponents,
  },

  extendsRules: {
    heading: {
      react(node, output, state) {
        return (
          <MHeader id={node.id} level={node.level} key={state?.key}>
            {output(node.content, state!)}
          </MHeader>
        )
      },
    },
    gfmTask: {
      react(node, _, state) {
        return (
          <input
            type="checkbox"
            key={state?.key}
            checked={node.completed}
            readOnly
          />
        )
      },
    },

    link: {
      react(node, output, state) {
        const { target, title } = node

        let realText = ''

        for (const child of node.content) {
          if (child.type === 'text') {
            realText += child.content
          }
        }

        return (
          <MLink
            href={sanitizeUrl(target)!}
            title={title}
            key={state?.key}
            text={realText}
          >
            {output(node.content, state!)}
          </MLink>
        )
      },
    },

    footnoteReference: {
      react(node, output, state) {
        const { footnoteMap, content } = node
        const footnote = footnoteMap.get(content)
        const linkCardId = (() => {
          try {
            const thisUrl = new URL(footnote?.footnote?.replace(': ', ''))
            const isCurrentHost = thisUrl.hostname === window.location.hostname
            if (!isCurrentHost && !isDev) {
              return
            }
            const { pathname } = thisUrl
            return pathname.slice(1)
          } catch {
            return
          }
        })()

        return (
          <Fragment key={state?.key}>
            <FloatPopover
              wrapperClassName="inline"
              as="span"
              TriggerComponent={() => (
                <a
                  href={`${getFootNoteDomId(content)}`}
                  onClick={(e) => {
                    e.preventDefault()
                    const id = getFootNoteDomId(content)
                    springScrollToElement(
                      document.getElementById(id)!,
                      -window.innerHeight / 2,
                    )
                    redHighlight(id)
                  }}
                >
                  <sup
                    id={`${getFootNoteRefDomId(content)}`}
                  >{`[^${content}]`}</sup>
                </a>
              )}
              type="tooltip"
            >
              {footnote?.footnote?.slice(1)}
            </FloatPopover>
            {linkCardId && (
              <LinkCard id={linkCardId} source={LinkCardSource.MixSpace} />
            )}
          </Fragment>
        )
      },
    },
    codeFenced: {
      parse(capture /* , parse, state */) {
        return {
          content: capture[4],
          lang: capture[2] || undefined,
          type: 'codeBlock',

          attrs: capture[3],

          raw: capture[0],
        }
      },
    },
    codeBlock: {
      react(node, output, state) {
        return (
          <CodeBlockRender
            key={state?.key}
            content={node.content}
            lang={node.lang}
            raw={node.raw}
            attrs={node.attrs}
          />
        )
      },
    },
    codeInline: {
      react(node, output, state) {
        return (
          <code
            key={state?.key}
            className="rounded-md bg-zinc-200 px-2 font-mono dark:bg-neutral-800"
          >
            {node.content}
          </code>
        )
      },
    },

    list: {
      react(node, output, state) {
        const Tag = node.ordered ? 'ol' : 'ul'

        return (
          <Tag key={state?.key} start={node.start}>
            {node.items.map((item: any, i: number) => {
              let className = ''
              if (item[0]?.type == 'gfmTask') {
                className = 'list-none flex items-center'
              }

              return (
                <li className={className} key={i}>
                  {output(item, state!)}
                </li>
              )
            })}
          </Tag>
        )
      },
    },
  },
  additionalParserRules: {
    spoilder: SpoilerRule,
    mention: MentionRule,

    mark: MarkRule,
    ins: InsertRule,
    kateX: KateXRule,
    kateXBlock: KateXBlockRule,
    container: ContainerRule,
    alerts: AlertsRule,
  },
}
export const Markdown: FC<
  MdProps &
    MarkdownToJSX.Options & {
      children?: string
    }
> = (props) => {
  const {
    value,
    style,
    wrapperProps = {},
    codeBlockFully = false,
    className,

    as: As = 'div',

    removeWrapper = false,
    children,
  } = props

  const node = (
    <MarkdownJSX options={options}>{value || children || ''}</MarkdownJSX>
  )

  if (removeWrapper) return node

  return (
    <As
      style={style}
      {...wrapperProps}
      className={clsx(
        styles['md'],
        codeBlockFully ? styles['code-fully'] : undefined,
        className,
      )}
    >
      {node}
    </As>
  )
}
Markdown.displayName = 'Markdown'

export const MainMarkdown: FC<
  MdProps &
    MarkdownToJSX.Options & {
      children?: string
    }
> = (props) => {
  const { wrapperProps = noopObj } = props
  return (
    <Markdown
      as="main"
      {...props}
      wrapperProps={{
        ...wrapperProps,
        id: MAIN_MARKDOWN_ID,
      }}
    />
  )
}
