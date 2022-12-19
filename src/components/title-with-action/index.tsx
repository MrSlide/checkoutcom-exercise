import React from 'react'

import styles from './styles.module.css'

interface Props {
  action: React.ReactNode,
}

export default function TitleWithAction(props: React.PropsWithChildren<Props>): React.ReactElement {
  const { action, children } = props

  return (
    <div className={styles['title-with-action']}>
      <div className={styles['title-with-action__title-wrapper']}>{children}</div>
      <div className={styles['title-with-action__action-wrapper']}>{action}</div>
    </div>
  )
}
