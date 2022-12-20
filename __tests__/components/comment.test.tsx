import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import Comment from '../../src/components/comment'

describe('Comment component', function () {
  const testProps = {
    author: 'John Doe',
    comment: 'Lorem ipsum dolore sit amet.',
  }

  test('renders correctly', function () {
    const renderer = new ShallowRenderer()

    const result = renderer.render(
      <Comment {...testProps}/>
    )

    expect(result).toMatchSnapshot()
  })
})
