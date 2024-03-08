'use client'

import { type PropsWithChildren } from 'react'
import { domAnimation, LazyMotion } from 'framer-motion'
import { Provider } from 'jotai'
import { ThemeProvider } from 'next-themes'

import { BackToTopFAB, FABContainer } from '~/components/fab'
import { ModalStackProvider } from '~/components/modal'
import { HydrationEndDetector } from '~/components/shared/HydrationEndDetector'
import { OnlyDesktop } from '~/components/viewport'
import { jotaiStore } from '~/lib/store'
import { EventProvider } from '~/providers/event-provider'
import { PageScrollInfoProvider } from '~/providers/page-scroll-info-provider'

export const Providers = (props: PropsWithChildren) => {
  return (
    <ThemeProvider>
      <Provider store={jotaiStore}>
        <EventProvider>
          <PageScrollInfoProvider>
            <LazyMotion features={domAnimation}>
              <ModalStackProvider>
                <FABContainer>
                  <OnlyDesktop>
                    <BackToTopFAB />
                  </OnlyDesktop>
                </FABContainer>

                {props.children}
              </ModalStackProvider>
              <HydrationEndDetector />
            </LazyMotion>
          </PageScrollInfoProvider>
        </EventProvider>
      </Provider>
    </ThemeProvider>
  )
}
