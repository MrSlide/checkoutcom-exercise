import React from 'react'
import classnames from 'classnames'

import styles from './styles.module.css'

interface Props {
  off?: boolean,
}

export default function Section(props: React.PropsWithChildren<Props>): React.ReactElement {
  const { children, off } = props

  return (
    <section
      className={classnames(styles.section, {
        [styles['section--off']]: off,
      })}
    >
      {children}
    </section>
  )
}
