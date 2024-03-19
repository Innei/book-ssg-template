import type { PropsWithChildren } from 'react'

import { PageFooter } from '~/components/footer'
import { MobileHeader } from '~/components/header'
import { HeaderDrawerContentProvider } from '~/components/header/provider'
import { ActionAsideContainer } from '~/components/shared/ActionAsideContainer'
import { AsideDonateButton } from '~/components/shared/AsideDonateButton'
import { BanCopyWrapper } from '~/components/shared/BanCopyWrapper'
import { TocFAB } from '~/components/toc/TocFAB'
import { OnlyDesktop } from '~/components/viewport'
import { OnlyMobile } from '~/components/viewport/OnlyMobile'
import { WrappedElementProvider } from '~/providers/wrapped-element-provider'

import { ArticleRightAside } from './components/ArticleRightAside'
import { FontSettingFab } from './components/FontSettingPanel'
import { LayoutContainer } from './components/LayoutContainer'
import { LeftAside } from './components/LeftAside'

export const ReadingLayout = async ({ children }: PropsWithChildren) => {
  return (
    <HeaderDrawerContentProvider element={<LeftAside asWeight />}>
      <MobileHeader />
      <LayoutContainer>
        <div className="relative mr-4 hidden min-w-0 xl:block" data-hide-print>
          <LeftAside />
        </div>

        <main className="min-w-0 px-4 py-14 lg:px-8 xl:px-2">
          <WrappedElementProvider>
            <BanCopyWrapper>{children}</BanCopyWrapper>

            <div className="relative hidden xl:block print:!hidden">
              <OnlyDesktop>
                <ArticleRightAside>
                  <ActionAsideContainer>
                    <AsideDonateButton />
                  </ActionAsideContainer>
                </ArticleRightAside>
              </OnlyDesktop>

              <OnlyMobile>
                <TocFAB />
              </OnlyMobile>
            </div>
          </WrappedElementProvider>
        </main>
      </LayoutContainer>

      <PageFooter />

      <FontSettingFab />
    </HeaderDrawerContentProvider>
  )
}
