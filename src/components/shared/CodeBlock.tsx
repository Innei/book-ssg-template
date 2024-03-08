import { HighLighter } from '../code-highlighter'
import { ExcalidrawLazy } from '../excalidraw/ExcalidrawClient'

export const CodeBlockRender = (props: {
  lang: string | undefined
  content: string
  raw: string

  attrs?: string
}) => {
  switch (props.lang) {
    case 'excalidraw': {
      return <ExcalidrawLazy data={props.content} />
    }

    default: {
      return <HighLighter {...props} />
    }
  }
}
