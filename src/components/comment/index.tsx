import React from 'react'

import ItemTitle from '../item-title'
import Paragraph from '../paragraph'

interface Props {
  author: string,
  comment: string,
}

export default function Comment(props: Props): React.ReactElement {
  const { author, comment } = props

  return (
    <div role='comment'>
      <ItemTitle>{author}</ItemTitle>
      <Paragraph>{comment}</Paragraph>
    </div>
  )
}
