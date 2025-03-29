# 自定义组件

这虽然不是 MDX，但是我也想支持内嵌的 React 组件。

完全可以。

你可以在 `src/markdown-components/index.tsx` 添加任何你的组件，例如

```tsx filename="src/markdown-components/index.tsx"
import type { MarkdownToJSX } from 'markdown-to-jsx'

import { Divider } from '~/components/divider'

export const markdownComponents: MarkdownToJSX.Overrides = {
  Demo: () => (
    <div className="rounded-md bg-cyan-400 p-2">This is a demo component</div>
  ),
}

```

使用这个组件。

在 Markdown 插入：`<Demo />`

<Demo />

组件被正确加载了。

## 内置的组件

### Tab

<Tabs>
  <Tab label="layout.tsx">
    ```tsx filename="app/server-action/layout.tsx"
    import type { PropsWithChildren } from 'react'

    export default async ({ children }: PropsWithChildren) => {
      return (
        <div className="m-auto mt-12 max-w-[800px]">
          <div>Layout Render At: {Date.now()}</div>
          {children}
        </div>
      )
    }
    ```
  </Tab>
  <Tab label="action.tsx">
    ```tsx filename="app/server-action/action.tsx"
    'use server'

    import { revalidatePath } from 'next/cache'

    export const actionRevalidate = async () => {
      revalidatePath('/server-action')
    }
    ```
  </Tab>
</Tabs>

代码为：

````mdx
```md

<Tabs>
<Tab label="layout.tsx">
  ```tsx filename="app/server-action/layout.tsx"
  import type { PropsWithChildren } from 'react'

  export default async ({ children }: PropsWithChildren) => {
    return (
      <div className="m-auto mt-12 max-w-[800px]">
        <div>Layout Render At: {Date.now()}</div>
        {children}
      </div>
    )
  }
  ```
</Tab>
<Tab label="action.tsx">
  ```tsx filename="app/server-action/action.tsx"
  'use server'

  import { revalidatePath } from 'next/cache'

  export const actionRevalidate = async () => {
    revalidatePath('/server-action')
  }
  ```
</Tab>
</Tabs>

```
````

### Wip

编辑为未完成。一般用于小节末尾。

````
```mdx
<Wip />
```
````

<Wip />