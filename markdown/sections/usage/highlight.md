# 代码高亮

代码高亮我们使用 [Shiki](https://github.com/shikijs/shiki)，由于使用了 Server Component，所以在 SSG 阶段就会把代码高亮插入到渲染后的 HTML 中，即使是引入了全量的代码高亮，对编译之后的包体积也不会变大。

另外，一下是一些代码块需要注意的地方。

## 文件标头

````
```json filename="index.json"
[
  {
    "paths": [
      "./sections/guide/what-this.md"
    ],
    "title": "开始"
  },
  {
    "paths": [
      "./sections/usage/markdown.md"
    ],
    "title": "使用"
  }
]
```
````

我们可以使用 `filename=""` 的语法增加代码块标头。

```json filename="index.json"
[
  {
    "paths": ["./sections/guide/what-this.md"],
    "title": "开始"
  },
  {
    "paths": ["./sections/usage/markdown.md"],
    "title": "使用"
  }
]
```

## 高亮

```tsx {1}
const Hi = 'Hi'
```

```tsx
const Hi = 'Hi' // [!code highlight]
```

上面的两种用法为：

````md
```tsx {1}
const Hi = 'Hi'
```

```tsx
const Hi = 'Hi' // [!code highlight]
```
````

## Diff

```tsx
const Hi = 'Hi' // [!code ++]

const Foo = 'bar' // [!code --]
```

上面的用法为：

````md
```tsx
const Hi = 'Hi' // [!code ++]

const Foo = 'bar' // [!code --]
```
````

更多信息，请参阅 [Shiki transformers](https://shiki.style/packages/transformers)