import type { TrackerAction } from "~/constants/tracker"

declare global {
  interface Window {
    umami?: {
      track: (event: string, data?: any) => void
    }
  }
}

export const Analyze = () => {
  return (
    <script
      dangerouslySetInnerHTML={{
        __html: `(${function () {
          document.addEventListener(
            "click",
            async (e) => {
              const $ = e.target as HTMLElement

              let current: HTMLElement | null = $
              let { event } = $.dataset
              while (!event && current && current !== document.body) {
                event = current.dataset.event
                current = current.parentElement
              }

              if (event) {
                console.log("dom track click event", event)
                window.umami?.track(event, {
                  type: "click",
                })
              }
            },
            true,
          )

          document.addEventListener("impression", async (e: any) => {
            const detail = e.detail as {
              action: TrackerAction
              label: string
            }

            console.log(detail, "detail")
            window.umami?.track(detail.label, {
              type: "impression",
            })
          })
        }.toString()})();`,
      }}
    />
  )
}
