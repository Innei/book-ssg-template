"use client"

import clsx from "clsx"
import { useState } from "react"

import PKG from "~/../package.json"
import { CollapseContent } from "~/components/collapse"
import { IonIosArrowDown } from "~/components/icons/arrow"
import type * as Git from "~/lib/git"

export const GitHistory = ({ history }: { history: Git.TGitHistory[] }) => {
  const [isOpened, setIsOpened] = useState(false)
  return (
    <section className="mt-12" data-hide-print>
      <div
        className="flex cursor-pointer items-center justify-between gap-2 rounded-md p-2 duration-200 hover:bg-accent/20"
        onClick={() => {
          setIsOpened(!isOpened)
        }}
        aria-label="更新历史"
      >
        <div className="flex items-center gap-2">
          <i className="i-mingcute-history-anticlockwise-line" />
          <span>更新历史</span>
        </div>

        <div className={clsx("shrink-0 text-gray-400", isOpened && "rotate-180")}>
          <IonIosArrowDown />
        </div>
      </div>
      <CollapseContent isOpened={isOpened} withBackground>
        <ul className="overflow-auto scrollbar-none">
          {history.map((item) => {
            return (
              <li key={item.hash} className="mt-2 flex-col gap-2 text-sm">
                <div className="grid grid-cols-[20px_80px_120px_80px_auto] items-center">
                  <i className="i-mingcute-git-commit-line text-accent" />
                  <span className="font-mono dark:bg-zinc-800">
                    <a
                      className="rounded bg-gray-200 p-1 dark:bg-zinc-800"
                      target="_blank"
                      rel="noreferrer"
                      href={`${PKG.repository.url}/commit/${item.hash}`}
                    >
                      {item.hash.slice(0, 8)}
                    </a>
                  </span>
                  <span>{item.time}</span>
                  <span>
                    <a
                      href={`https://github.com/${item.author_name}`}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {item.author_name}
                    </a>
                  </span>
                  <span>{item.commit_message}</span>
                </div>
              </li>
            )
          })}
        </ul>
      </CollapseContent>
    </section>
  )
}
