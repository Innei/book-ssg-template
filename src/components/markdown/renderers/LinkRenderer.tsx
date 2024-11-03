import * as React from 'react'
import type { FC, PropsWithChildren, ReactNode } from 'react'

import { GitHubBrandIcon } from '~/components/icons/platform/GitHubBrandIcon'
import { EmbedGithubFile } from '~/components/shared/EmbedGithubFile'
import {
  isCodesandboxDevBoxUrl,
  isCodesandboxUrl,
  isGistUrl,
  isGithubCommitUrl,
  isGithubFilePreviewUrl,
  isGithubPrUrl,
  isGithubRepoUrl,
  isGithubUrl,
  isYoutubeUrl,
  parseGithubGistUrl,
  parseGithubPrUrl,
  parseGithubTypedUrl,
} from '~/lib/link-parser'

import { LinkCard, LinkCardSource } from '../../link-card'
import { MLink } from '../../link/MLink'

/**
 * 单行链接的渲染
 */
export const BlockLinkRenderer = async ({
  href,
  children,
}: PropsWithChildren<{ href: string }>) => {
  const url = (() => {
    try {
      return new URL(href)
    } catch {
      return null
    }
  })()

  const fallbackElement = (
    <p>
      <MLink href={href}>{children ?? <span>{href}</span>}</MLink>
    </p>
  )

  if (!url) {
    return fallbackElement
  }

  switch (true) {
    case isGithubUrl(url): {
      return (
        <GithubUrlRenderL
          url={url}
          href={href}
          fallbackElement={fallbackElement}
        />
      )
    }

    case isYoutubeUrl(url): {
      const id = url.searchParams.get('v')!
      return (
        <FixedRatioContainer>
          <iframe
            src={`https://www.youtube.com/embed/${id}`}
            className="absolute inset-0 size-full border-0"
            allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
            allowFullScreen
            title="YouTube video player"
          />
        </FixedRatioContainer>
      )
    }

    case isCodesandboxUrl(url): {
      // https://codesandbox.io/s/framer-motion-layoutroot-prop-forked-p39g96
      // to
      // https://codesandbox.io/embed/framer-motion-layoutroot-prop-forked-p39g96?fontsize=14&hidenavigation=1&theme=dark
      return (
        <FixedRatioContainer>
          <iframe
            className="absolute inset-0 size-full rounded-md border-0"
            src={`https://codesandbox.io/embed/${url.pathname.slice(
              2,
            )}?fontsize=14&hidenavigation=1&theme=dark${url.search}`}
          />
        </FixedRatioContainer>
      )
    }
    case isCodesandboxDevBoxUrl(url): {
      // https://codesandbox.io/p/devbox/next-js-page-router-vrxrzy

      return (
        <FixedRatioContainer>
          <iframe
            className="absolute inset-0 size-full rounded-md border-0"
            src={`${url.href}?embed=1`}
            title="next.js-page-router"
            allow="accelerometer; ambient-light-sensor; camera; encrypted-media; geolocation; gyroscope; hid; microphone; midi; payment; usb; vr; xr-spatial-tracking"
            sandbox="allow-forms allow-modals allow-popups allow-presentation allow-same-origin allow-scripts"
          />
        </FixedRatioContainer>
      )
    }
  }
  return fallbackElement
}

const FixedRatioContainer = ({
  children,
  ratio = 58,
}: {
  ratio?: number
  children: React.ReactNode
}) => {
  return (
    <div className="mockup-window my-16 bg-base-300">
      <div className="flex justify-center px-4">
        <div
          className="relative my-8 h-0 w-full"
          style={{
            paddingBottom: `${ratio}%`,
          }}
        >
          {children}
        </div>
      </div>
    </div>
  )
}

const GithubUrlRenderL: FC<{
  url: URL
  href?: string
  fallbackElement: ReactNode
}> = (props) => {
  const { url, href = url.href, fallbackElement } = props

  switch (true) {
    case isGithubRepoUrl(url): {
      const { owner, repo } = parseGithubTypedUrl(url)
      return <LinkCard id={`${owner}/${repo}`} source={LinkCardSource.GHRepo} />
    }
    case isGistUrl(url): {
      const { owner, id } = parseGithubGistUrl(url)
      return (
        <>
          <iframe
            src={`https://gist.github.com/${owner}/${id}.pibb`}
            className="h-[300px] w-full overflow-auto border-0"
          />

          <a
            className="mt-2 flex space-x-2 center"
            href={href}
            target="_blank"
            rel="noreferrer"
          >
            <GitHubBrandIcon />
            <span>{href}</span>
          </a>
        </>
      )
    }
    case isGithubPrUrl(url): {
      const { owner, repo, pr } = parseGithubPrUrl(url)
      return (
        <LinkCard
          fallbackUrl={url.toString()}
          id={`${owner}/${repo}/${pr}`}
          source={LinkCardSource.GHPr}
        />
      )
    }

    case isGithubCommitUrl(url): {
      const { owner, repo, id } = parseGithubTypedUrl(url)
      return (
        <>
          <p>
            <MLink href={href}>{href}</MLink>
          </p>
          <LinkCard
            fallbackUrl={url.toString()}
            id={`${owner}/${repo}/commit/${id}`}
            source={LinkCardSource.GHCommit}
          />
        </>
      )
    }
    case isGithubFilePreviewUrl(url): {
      const { owner, repo, afterTypeString } = parseGithubTypedUrl(url)
      const splitString = afterTypeString.split('/')
      const ref = splitString[0]
      const path = ref ? splitString.slice(1).join('/') : afterTypeString
      return (
        <div className="flex w-full flex-col items-center">
          <EmbedGithubFile
            owner={owner}
            repo={repo}
            path={path}
            refType={ref}
          />
          <div className="mt-4">
            <MLink href={href}>{href}</MLink>
          </div>
        </div>
      )
    }
  }

  return fallbackElement
}
