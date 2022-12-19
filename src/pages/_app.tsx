import React from 'react'

import defaultTheme from '../themes/default'
import '../styles/global.css'

interface Props {
  Component: React.ComponentType,
  pageProps: {[prop: string]: any},
}

function defaultGetLayout(page: React.ReactNode): React.ReactNode {
  return page
}

export default function App(props: Props): React.ReactElement {
  const { Component, pageProps } = props

  // @ts-expect-error The `getLayout` property is custom and optional
  const getLayout = Component.getLayout ?? defaultGetLayout

  return (
    <>
      <style jsx global>{`
        html {
          --default-text-color: ${defaultTheme.defaultTextColor};
          --default-text-font: ${defaultTheme.defaultTextFont};
          --default-text-line-height: ${defaultTheme.defaultTextLineHeight};
          --body-text-size: ${defaultTheme.bodyTextSize};
          --body-text-weight: ${defaultTheme.bodyTextWeight};
          --item-title-text-size: ${defaultTheme.itemTitleTextSize};
          --item-title-text-weight: ${defaultTheme.itemTitleTextWeight};
          --subtitle-text-size: ${defaultTheme.subtitleTextSize};
          --subtitle-text-weight: ${defaultTheme.subtitleTextWeight};
          --title-text-size: ${defaultTheme.titleTextSize};
          --title-text-weight: ${defaultTheme.titleTextWeight};
        }
      `}</style>
      {getLayout(<Component {...pageProps}/>)}
    </>
  )
}
