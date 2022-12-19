import React from 'react'

import styles from './styles.module.css'

export default function ResponsiveDualColLayout(props: React.PropsWithChildren<{}>): React.ReactElement {
  const { children } = props

  return <div className={styles['responsive-dual-col-layout']}>{children}</div>
}

export function ResponsiveDualColLayoutColumn(props: React.PropsWithChildren<{}>): React.ReactElement {
  const { children } = props

  return <div className={styles['responsive-dual-col-layout__column']}>{children}</div>
}
