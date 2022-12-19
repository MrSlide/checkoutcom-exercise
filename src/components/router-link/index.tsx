import React from 'react'
import Link from 'next/link'

import buttonStyles from '../../styles/buttons.module.css'

interface Props {
  href: string,
  onClick?: (event: React.MouseEvent<HTMLAnchorElement>)=> void,
}

export default function RouterLink(props: React.PropsWithChildren<Props>): React.ReactElement {
  const { children, href } = props

  return <Link className={buttonStyles['primary-button']} href={href}>{children}</Link>
}
