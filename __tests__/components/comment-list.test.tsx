import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import Comment from '../../src/components/comment'
import CommentList from '../../src/components/comment-list'

describe('CommentList component', function () {
  const testCommentProps = [
    {
      author: 'John Doe',
      comment: 'Lorem ipsum dolore sit amet.',
    },
    {
      author: 'Jane Doe',
      comment: 'Duis finibus pretium mi, eu maximus quam mollis ac.',
    }
  ]

  test('renders correctly with comments', function () {
    const renderer = new ShallowRenderer()

    const result = renderer.render(
      <CommentList>
        <Comment {...testCommentProps[0]}/>
        <Comment {...testCommentProps[1]}/>
      </CommentList>
    )

    expect(result).toMatchSnapshot()
  })

  test('renders correctly without comments', function () {
    const renderer = new ShallowRenderer()

    const result = renderer.render(
      <CommentList/>
    )

    expect(result).toMatchSnapshot()
  })
})
