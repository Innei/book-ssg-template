# Book SSG Template

又一个文档 SSG 的模板。

使用 Next.js App Router + Server Component 更大程度的优化了 SSG 生成产物的包体积。

不管怎么说，还是以写作为重。本模板重心最终还是为了编写内容和最后的 UI 呈现。

此模板的在线预览：

## 使用此模板

```bash
git clone https://github.com/Innei/book-ssg-template
```

或者，你可以点击 Fork 此项目/使用此模板。

## 配置项

在 `src/app.config.ts` 中，你可以选择的更换一些配置。

| Variables | Types                                                                                   | Descriptions                                         |
| --------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `SEO`     | [`Metadata`](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) | Configuration for SEO, provided by Next.js           |
| `DONATE`  | `object`                                                                                | Sponsored Button content, links and images           |
| `CONFIG`  | `object`                                                                                | Related Configurations                               |
| `DONATE`  | `object`                                                                                | Sponsored Configuration, Links and Images for Button |

## 小节存放位置

你可以在 `markdown/sections` 中放置每小节的内容，内容格式为 `markdown`。

此项目，不会根据 File-system 去自动生成目录树，因此，你可以根据你的喜好去调整文件的层级关系。另一个好处是，你也可以更加灵活的调整每个小节出现的顺序。

例如，我们有这样一个目录树：

```text filename="/markdown"
.
├── index.json
└── sections
    ├── guide
    │   └── what-this.md
    └── usage
        └── markdown.md
```

小节存放在 `sections`，而在 `index.json` 控制其顺序。

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

你可以在 `paths` 中随意调整小节位置。

下一节，展开 Markdown 扩展语法。
