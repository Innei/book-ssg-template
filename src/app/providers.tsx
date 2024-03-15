'use client'

import { type PropsWithChildren } from 'react'
import { domAnimation, LazyMotion, m } from 'framer-motion'
import { Provider } from 'jotai'
import { ThemeProvider } from 'next-themes'
import { ModalStackContainer } from 'rc-modal-sheet'
import { MobileDetector } from 'rc-modal-sheet/mobile-detector'

import { BackToTopFAB, FABContainer } from '~/components/fab'
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
              <ModalStackContainer m={m} clickOutsideToDismiss>
                <MobileDetector />
                <FABContainer>
                  <OnlyDesktop>
                    <BackToTopFAB />
                  </OnlyDesktop>
                </FABContainer>

                {props.children}
              </ModalStackContainer>
              <HydrationEndDetector />
            </LazyMotion>
          </PageScrollInfoProvider>
        </EventProvider>
      </Provider>
    </ThemeProvider>
  )
}
