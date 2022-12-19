import React from 'react'

import typographyStyles from '../../styles/typography.module.css'

export default function Title(props: React.PropsWithChildren<{}>): React.ReactElement {
  const { children } = props

  return <h1 className={typographyStyles['title-text']}>{children}</h1>
}