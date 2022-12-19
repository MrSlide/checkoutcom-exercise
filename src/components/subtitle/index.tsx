import React from 'react'

import typographyStyles from '../../styles/typography.module.css'

export default function SubTitle(props: React.PropsWithChildren<{}>): React.ReactElement {
  const { children } = props

  return <h2 className={typographyStyles['subtitle-text']}>{children}</h2>
}