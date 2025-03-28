import { SEO } from "~/app.config"
import { Divider } from "~/components/divider"
import { buildSectionData } from "~/core"

import { FocusFade } from "./FocusFade"
import { LeftAsideLink } from "./LeftAsideLink"

export const LeftAside = async ({ asWeight }: { asWeight?: boolean }) => {
  const { sections } = buildSectionData()

  return (
    <FocusFade as="aside" className={asWeight ? "" : "sticky top-16 mt-16 min-h-[300px]"}>
      <h1 className="text-center text-lg font-bold lg:text-left">{SEO.title.absolute}</h1>
      <Divider className="scale-x-50" />
      <ul className={asWeight ? "max-h-[calc(100dvh-13rem)] overflow-auto" : ""}>
        {sections.map((section) => {
          return (
            <li key={section.title} className="mt-8 font-semibold">
              {section.title}

              <ul className="mt-4 flex flex-col gap-1">
                {section.items.map((item) => {
                  const fullPath = `/reading/${item.path}`

                  return (
                    <LeftAsideLink
                      fullPath={fullPath}
                      isNew={item.meta.new as boolean}
                      depth={item.depth}
                      path={item.path}
                      title={item.title}
                      key={item.title}
                    />
                  )
                })}
              </ul>
            </li>
          )
        })}
      </ul>
    </FocusFade>
  )
}
