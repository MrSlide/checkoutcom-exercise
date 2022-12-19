import React from 'react'

import styles from './styles.module.css'

export default function FloatingBoxLayout(props: React.PropsWithChildren<{}>): React.ReactElement {
  const { children } = props

  return (
    <div className={styles['floating-box-layout']}>
      <div className={styles['floating-box-layout__inner']}>
        {children}
      </div>
    </div>
  )
}