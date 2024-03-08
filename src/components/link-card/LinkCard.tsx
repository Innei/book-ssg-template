'use client'

import React, { useCallback, useMemo, useState } from 'react'
import { useInView } from 'react-intersection-observer'
import camelcaseKeys from 'camelcase-keys'
import clsx from 'clsx'
import { m, useMotionTemplate, useMotionValue } from 'framer-motion'
import Link from 'next/link'
import type { FC, ReactNode } from 'react'

import { useIsClientTransition } from '~/hooks/common/use-is-client'
import { fetchGitHubApi } from '~/lib/github'
import { clsxm } from '~/lib/helper'

import { LazyLoad } from '../shared/Lazyload'
import { LinkCardSource } from './enums'
import styles from './LinkCard.module.css'

export interface LinkCardProps {
  id: string
  source?: LinkCardSource
  className?: string

  fallbackUrl?: string
}

export const LinkCard = (props: LinkCardProps) => {
  const isClient = useIsClientTransition()

  if (!isClient) return null

  return (
    <LazyLoad placeholder={<LinkCardSkeleton />}>
      <LinkCardImpl {...props} />
    </LazyLoad>
  )
}

type CardState = {
  title?: ReactNode
  desc?: ReactNode
  image?: string
  color?: string

  classNames?: Partial<{
    image: string
    cardRoot: string
  }>
}

const LinkCardImpl: FC<LinkCardProps> = (props) => {
  const { id, source = LinkCardSource.Self, className, fallbackUrl } = props

  const [loading, setLoading] = useState(true)
  const [isError, setIsError] = useState(false)
  const [fullUrl, setFullUrl] = useState(fallbackUrl || 'javascript:;')

  const [cardInfo, setCardInfo] = useState<CardState>()

  const validTypeAndFetchFunction = useCallback(
    (source: LinkCardSource, id: string) => {
      const fetchDataFunctions = {
        [LinkCardSource.GHRepo]: fetchGitHubRepoData,
        [LinkCardSource.GHCommit]: fetchGitHubCommitData,
        [LinkCardSource.GHPr]: fetchGitHubPRData,
      } as Record<LinkCardSource, FetchObject>

      const fetchFunction = fetchDataFunctions[source]
      if (!fetchFunction) {
        return { isValid: false, fetchFn: null }
      }

      const isValid = fetchFunction.isValid(id)
      return { isValid, fetchFn: isValid ? fetchFunction.fetch : null }
    },
    [],
  )

  const { isValid, fetchFn } = useMemo(
    () => validTypeAndFetchFunction(source, id),
    [source, id],
  )

  const fetchInfo = useCallback(async () => {
    if (!fetchFn) {
      return
    }
    setLoading(true)

    await fetchFn(id, setCardInfo, setFullUrl).catch((err) => {
      console.log('fetch card info error: ', err)
      setIsError(true)
    })
    setLoading(false)
  }, [fetchFn, id])

  const { ref } = useInView({
    triggerOnce: true,
    onChange(inView) {
      if (!inView) {
        return
      }

      fetchInfo()
    },
  })

  const mouseX = useMotionValue(0)
  const mouseY = useMotionValue(0)
  const radius = useMotionValue(0)
  const handleMouseMove = useCallback(
    ({ clientX, clientY, currentTarget }: React.MouseEvent) => {
      const bounds = currentTarget.getBoundingClientRect()
      mouseX.set(clientX - bounds.left)
      mouseY.set(clientY - bounds.top)
      radius.set(Math.sqrt(bounds.width ** 2 + bounds.height ** 2) * 1.3)
    },
    [mouseX, mouseY, radius],
  )

  const background = useMotionTemplate`radial-gradient(${radius}px circle at ${mouseX}px ${mouseY}px, var(--spotlight-color) 0%, transparent 65%)`

  if (!isValid) {
    return null
  }

  const LinkComponent = source === 'self' ? Link : 'a'

  const classNames = cardInfo?.classNames || {}
  return (
    <LinkComponent
      href={fullUrl}
      target={source !== 'self' ? '_blank' : '_self'}
      ref={ref}
      className={clsxm(
        styles['card-grid'],
        (loading || isError) && styles['skeleton'],
        isError && styles['error'],
        'group',

        className,
        classNames.cardRoot,
      )}
      style={{
        borderColor: cardInfo?.color ? `${cardInfo.color}30` : '',
      }}
      onMouseMove={handleMouseMove}
    >
      {cardInfo?.color && (
        <>
          <div
            className="absolute inset-0 z-0"
            style={{
              backgroundColor: cardInfo?.color,
              opacity: 0.06,
            }}
          />
          <m.div
            layout
            className="absolute inset-0 z-0 opacity-0 duration-500 group-hover:opacity-100"
            style={
              {
                '--spotlight-color': `${cardInfo?.color}50`,
                background,
              } as any
            }
          />
        </>
      )}
      <span className={styles['contents']}>
        <span className={styles['title']}>{cardInfo?.title}</span>
        <span className={styles['desc']}>{cardInfo?.desc}</span>
      </span>
      {(loading || cardInfo?.image) && (
        <span
          className={clsxm(styles['image'], classNames.image)}
          data-image={cardInfo?.image || ''}
          style={{
            backgroundImage: cardInfo?.image
              ? `url(${cardInfo.image})`
              : undefined,
          }}
        />
      )}
    </LinkComponent>
  )
}

const LinkCardSkeleton = () => {
  return (
    <span className={clsx(styles['card-grid'], styles['skeleton'])}>
      <span className={styles['contents']}>
        <span className={styles['title']} />
        <span className={styles['desc']} />
      </span>
      <span className={styles['image']} />
    </span>
  )
}

type FetchFunction = (
  id: string,
  setCardInfo: React.Dispatch<React.SetStateAction<CardState | undefined>>,
  setFullUrl: (url: string) => void,
) => Promise<void>

type FetchObject = {
  isValid: (id: string) => boolean
  fetch: FetchFunction
}

const fetchGitHubRepoData: FetchObject = {
  isValid: (id) => {
    // owner/repo
    const parts = id.split('/')
    return parts.length === 2 && parts[0].length > 0 && parts[1].length > 0
  },
  fetch: async (id, setCardInfo, setFullUrl) => {
    const [owner, repo] = id.split('/')
    try {
      const response = await fetchGitHubApi(
        `https://api.github.com/repos/${owner}/${repo}`,
      )
      const data = camelcaseKeys(response as any, { deep: true })

      setCardInfo({
        title: (
          <span className="flex items-center gap-2">
            <span className="flex-1">{data.name}</span>
            <span className="flex-shrink-0 self-end justify-self-end">
              {data.stargazersCount > 0 && (
                <span className="inline-flex flex-shrink-0 items-center gap-1 self-center text-sm text-orange-400 dark:text-yellow-500">
                  <i className="icon-[mingcute--star-line]" />
                  <span className="font-sans font-medium">
                    {data.stargazersCount}
                  </span>
                </span>
              )}
            </span>
          </span>
        ),
        desc: data.description,
        image: data.owner.avatarUrl,
      })

      setFullUrl(data.htmlUrl)
    } catch (err) {
      console.error('Error fetching GitHub data:', err)
      throw err
    }
  },
}

const fetchGitHubCommitData: FetchObject = {
  isValid: (id) => {
    // 假设 'gh-commit' 类型的 id 应该是 'username/repo/commit/commitId' 的形式
    const parts = id.split('/')
    return (
      parts.length === 4 &&
      parts.every((part) => part.length > 0) &&
      parts[2] === 'commit'
    )
  },
  fetch: async (id, setCardInfo, setFullUrl) => {
    const [owner, repo, , commitId] = id.split('/')
    try {
      const response = await fetchGitHubApi(
        `https://api.github.com/repos/${owner}/${repo}/commits/${commitId}`,
      )
      const data = camelcaseKeys(response as any, { deep: true })

      setCardInfo({
        title: (
          <span className="font-normal">
            {data.commit.message.replace(/Signed-off-by:.+/, '')}
          </span>
        ),
        desc: (
          <span className="flex items-center space-x-5 font-mono">
            <span className="text-uk-green-light">+{data.stats.additions}</span>
            <span className="text-uk-red-light">-{data.stats.deletions}</span>

            <span className="text-sm">{data.sha.slice(0, 7)}</span>

            <span className="text-sm opacity-80">
              {owner}/{repo}
            </span>
          </span>
        ),
        image: data.author?.avatarUrl,
      })

      setFullUrl(`https://github.com/${owner}/${repo}/commit/${commitId}`)
    } catch (err) {
      console.error('Error fetching GitHub commit data:', err)
      throw err
    }
  },
}

const fetchGitHubPRData: FetchObject = {
  isValid: (id) => {
    // ${owner}/${repo}/${pr}
    const parts = id.split('/')
    return parts.length === 3 && parts.every((part) => part.length > 0)
  },
  fetch: async (id, setCardInfo, setFullUrl) => {
    const [owner, repo, , prNumber] = id.split('/')
    try {
      const response = await fetchGitHubApi(
        `https://api.github.com/repos/${owner}/${repo}/pulls/${prNumber}`,
      )
      const data = camelcaseKeys(response as any, { deep: true })

      setCardInfo({
        title: `PR: ${data.title}`,
        desc: (
          <span className="flex items-center space-x-5 font-mono">
            <span className="text-uk-green-light">+{data.additions}</span>
            <span className="text-uk-red-light">-{data.deletions}</span>
            <span className="text-sm opacity-80">
              {owner}/{repo}
            </span>
          </span>
        ),
        image: data.user.avatarUrl,
      })

      setFullUrl(data.htmlUrl)
    } catch (err) {
      console.error('Error fetching GitHub PR data:', err)
      throw err
    }
  },
}
