import React from 'react'

import typographyStyles from '../../styles/typography.module.css'

interface Props {
  as?: keyof JSX.IntrinsicElements,
}

export default function ItemTitle(props: React.PropsWithChildren<Props>): React.ReactElement {
  const { children, as = 'h3' } = props
  const Tag = as

  return <Tag className={typographyStyles['item-title-text']}>{children}</Tag>
}
