import type { Metadata } from "next"

import { CONFIG } from "~/app.config"
import { Divider } from "~/components/divider"
import { MainMarkdown } from "~/components/markdown"
import { FocusFade } from "~/layout/components/FocusFade"

import { FocusWrapper } from "./components/focus-wrapper"
import { GitHistory } from "./components/git-history"
import { cache_buildSectionData, getServerProps } from "./getServerProps"
import { Hooks } from "./hooks"

export function generateStaticParams() {
  const { flatPaths } = cache_buildSectionData()

  return flatPaths.map(({ path }) => {
    const [cate, slug] = path.split("/")
    return {
      cate,
      slug,
    }
  })
}

export async function generateMetadata(props: {
  params: Promise<{
    cate: string
    slug: string
  }>
}): Promise<Metadata> {
  const { title } = await getServerProps(await props.params)
  const { cate, slug } = await props.params
  return {
    title,
    openGraph: {
      images: `/reading/${cate}/${slug}/og.png`,
    },
  }
}

export default async (props: {
  params: Promise<{
    cate: string
    slug: string
  }>
}) => {
  const { text, count, readingTime, title, updatedAt, history } = await getServerProps(
    await props.params,
  )

  return (
    <div className="prose min-h-[calc(100vh-25rem)]">
      <Hooks {...{ count, readingTime, title }} />
      <FocusWrapper>
        <MainMarkdown>{text}</MainMarkdown>
      </FocusWrapper>

      {updatedAt && (
        <FocusFade>
          <Divider className="ml-auto mt-6 w-1/4" />

          <p className="text-right opacity-80">
            最后更新于{" "}
            <span>
              {updatedAt
                ? new Date(updatedAt).toLocaleString("zh-CN", {
                    timeZone: "Asia/Shanghai",
                  })
                : "N/A"}
            </span>
          </p>
        </FocusFade>
      )}

      <GitHistory history={history} />

      {CONFIG.wip && (
        <>
          <Divider className="mt-12" />
          <p>本书还在编写中..</p>
          <p>
            前往{" "}
            <a
              href="https://innei.in/posts/technology/my-first-nextjs-book-here#comment"
              target="_blank"
              rel="noreferrer"
            >
              https://innei.in/posts/tech/my-first-nextjs-book-here#comment
            </a>{" "}
            发表你的观点吧。
          </p>
        </>
      )}
    </div>
  )
}
