import type { MarkdownToJSX } from "markdown-to-jsx"

import { Divider } from "~/components/divider"

export const markdownComponents: MarkdownToJSX.Overrides = {
  Wip: () => (
    <>
      <Divider />
      <div className="mt-12 text-lg font-medium">此章节还在编写中....</div>
    </>
  ),

  Demo: () => <div className="rounded-md bg-cyan-400 p-2">This is a demo component</div>,
}
