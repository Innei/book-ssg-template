import { HighLighter } from '../code-highlighter'

export const CodeBlockRender = (props: {
  lang: string | undefined
  content: string
  raw: string

  attrs?: string
}) => {
  switch (props.lang) {
    default: {
      return <HighLighter {...props} />
    }
  }
}
