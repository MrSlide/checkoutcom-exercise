import React from 'react'

import styles from './styles.module.css'

export default function ButtonGroup(props: React.PropsWithChildren<{}>): React.ReactElement {
  const { children } = props

  return <div className={styles['button-group']}>{children}</div>
}
