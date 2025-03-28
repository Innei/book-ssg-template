"use client"

import { useModalStack } from "rc-modal-sheet"

import { useIsMobile } from "~/atoms/hooks"

import { MotionButtonBase } from "../button"
import { DividerVertical } from "../divider"
import { MLink } from "../link"
import { DonateContent } from "../shared/AsideDonateButton"

export const PageFooter = () => {
  const { present } = useModalStack()
  return (
    <footer className="py-8">
      <div className="space-y-4 text-center opacity-50">
        <div>
          本内容采用{" "}
          <a
            href="https://creativecommons.org/licenses/by-nc-sa/4.0/"
            rel="noreferrer"
            target="_blank"
          >
            知识共享署名 - 非商业性使用 - 相同方式共享 4.0 国际许可协议 (CC BY-NC-SA 4.0)
          </a>{" "}
          进行许可。
        </div>
        <div>
          © 2024{" "}
          <a href="https://innei.in" target="_blank" rel="noreferrer">
            Innei
          </a>
          <DividerVertical />
          <MLink href="https://github.com/innei">GitHub</MLink> <DividerVertical />
          <MotionButtonBase
            onClick={() => {
              present({
                content: () => <DonateContent />,
                title: "赞助",
              })
            }}
          >
            Sponsor
          </MotionButtonBase>
        </div>
      </div>
    </footer>
  )
}

export const WipFooter = () => {
  const isMobile = useIsMobile()
  return (
    <footer className="prose mt-12 opacity-80">
      <p>后面的内容还在编写中...</p>

      <p>感谢您在百忙之中能够看到这里。</p>
      <p>
        如果对您有所帮助，请考虑支持我，点击
        {isMobile ? "顶部小茶杯" : "右侧小茶杯"}进行投喂。
      </p>
    </footer>
  )
}
