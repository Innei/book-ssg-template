# Book SSG Template

Yet another template for document SSG.

## Motivation

I kind of want to write a booklet, but don't want to use an off-the-shelf SSG tool like vite , nextra or others. For one, it's too heavy to write and probably not for me, and secondly, using these tools would require me to make a lot of tweaks to the default styles. So I wrote an SSG tool from scratch. The good thing is that Next.js is really great at SSG.

Uses Next.js App Router + Server Component to optimize the package size of the SSG generated product to a greater extent.

In any case, it's still all about the writing. The focus of this template is ultimately on writing the content and the final UI rendering.

Online preview of this template:

[Demo](https://book-template.innei.in)

## Features

- Markdown support with [Shiro Flavored Markdown](https://shiro.innei.in/#/markdown)
- Page Open Graph and SEO support
- Nice UI
- Mobile responsive

## Using this template

```bash
git clone https://github.com/Innei/book-ssg-template
```

Alternatively, you can click Fork this project/use this template.

## Configuration items

In `src/app.config.ts`, you can optionally change some of the configuration.

| Variables | Types                                                                                   | Descriptions                                         |
| --------- | --------------------------------------------------------------------------------------- | ---------------------------------------------------- |
| `SEO`     | [`Metadata`](https://nextjs.org/docs/app/building-your-application/optimizing/metadata) | Configuration for SEO, provided by Next.js           |
| `DONATE`  | `object`                                                                                | Sponsored Button content, links and images           |
| `CONFIG`  | `object`                                                                                | Related Configurations                               |
| `DONATE`  | `object`                                                                                | Sponsored Configuration, Links and Images for Button |

## More..

For more details and usage, plz go to [Documentation](https://book-template.innei.in).

## License

2024 © Innei, Released under the MIT License.

> [Personal Website](https://innei.in/) · GitHub [@Innei](https://github.com/innei/)
