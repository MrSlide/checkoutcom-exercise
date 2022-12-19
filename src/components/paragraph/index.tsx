import React from 'react'

import typographyStyles from '../../styles/typography.module.css'

export default function Paragraph(props: React.PropsWithChildren<{}>): React.ReactElement {
  const { children } = props

  return <p className={typographyStyles['body-text']}>{children}</p>
}
