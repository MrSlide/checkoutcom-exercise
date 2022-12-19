import React from 'react'

import Paragraph from '../paragraph'
import styles from './styles.module.css'

export default function CommentList(props: React.PropsWithChildren<{}>): React.ReactElement {
  const { children } = props

  if (React.Children.count(children) === 0) {
    return <Paragraph>There are no comments yet.</Paragraph>
  }

  return (
    <ol className={styles['comments-list']}>
      {React.Children.map(children, function (child) {
        return <li className={styles['comments-list__item']}>{child}</li>
      })}
    </ol>
  )
}
