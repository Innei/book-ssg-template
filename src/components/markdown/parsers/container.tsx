import type { MarkdownToJSX } from "markdown-to-jsx"
import { Priority } from "markdown-to-jsx"
import * as React from "react"

import { Banner } from "../../banner/Banner"
import { Markdown } from "../Markdown"

const shouldCatchContainerName = [
  "banner",
  "carousel",

  "warn",
  "error",
  "danger",
  "info",
  "success",
  "warning",
  "note",

  "grid",
].join("|")

export const ContainerRule: MarkdownToJSX.Rule = {
  match: (source: string) => {
    const result =
      /^\s*::: *(?<type>.*?) *(?:\{(?<params>.*?)\} *)?\n(?<content>[\s\S]+?)\s*::: *(?:\n *)+/.exec(
        source,
      )

    if (!result) return null

    const { type } = result.groups!
    if (!type || !type.match(shouldCatchContainerName)) return null
    return result
  },
  order: Priority.MED,
  parse(capture) {
    const { groups } = capture
    return {
      node: { ...groups },
    }
  },

  react(node, _, state) {
    const { type, params, content } = node.node

    switch (type) {
      case "warn":
      case "error":
      case "danger":
      case "info":
      case "note":
      case "success":
      case "warning": {
        const transformMap = {
          warning: "warn",
          danger: "error",
          note: "info",
        }
        return (
          <Banner type={(transformMap as any)[type] || type} className="my-4" key={state?.key}>
            <Markdown value={content} allowsScript className="w-full [&>p:first-child]:mt-0" />
          </Banner>
        )
      }
      case "banner": {
        if (!params) {
          break
        }

        return (
          <Banner type={params} className="my-4" key={state?.key}>
            <Markdown value={content} allowsScript className="w-full [&>p:first-child]:mt-0" />
          </Banner>
        )
      }
    }

    return (
      <div key={state?.key}>
        <p>{content}</p>
      </div>
    )
  },
}

/**
 * gallery container
 *
 * ::: gallery
 * ![name](url)
 * ![name](url)
 * ![name](url)
 * :::
 */
