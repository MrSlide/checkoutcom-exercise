import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'

import FeedbackResultsPage from '../../src/pages/results'
import useMostRecentComments from '../../src/hooks/use-most-recent-comments'
import useRatingsCount from '../../src/hooks/use-ratings-count'

jest.mock('../../src/hooks/use-most-recent-comments')
jest.mock('../../src/hooks/use-ratings-count')

describe('FeedbackResultsPage component', function () {
  const mockProps = {
    mostRecentComments: [
      {
        comment: 'Lorem ipsum dolore sit amet',
        createdBy: 'John Doe',
        id: '123',
      }
    ],
    ratingsCount: {
      1: 42,
      2: 234,
      3: 454,
      4: 3454,
      5: 674,
    },
  }

  const mockUseMostRecentComments = jest.mocked(useMostRecentComments)
  const mockUseRatingsCount = jest.mocked(useRatingsCount)

  test('renders correctly', function () {
    mockUseMostRecentComments.mockImplementation(function (initial) {
      return {
        busy: false,
        data: initial,
        error: undefined,
      }
    })
    mockUseRatingsCount.mockImplementation(function (initial) {
      return {
        busy: false,
        data: initial,
        error: undefined,
      }
    })

    const renderer = new ShallowRenderer()

    const result = renderer.render(
      <FeedbackResultsPage {...mockProps}/>
    )

    expect(result).toMatchSnapshot()
  })

  test('renders correctly with data loading errors', function () {
    mockUseMostRecentComments.mockImplementation(function (initial) {
      return {
        busy: false,
        data: initial,
        error: new Error('Test'),
      }
    })
    mockUseRatingsCount.mockImplementation(function (initial) {
      return {
        busy: false,
        data: initial,
        error: new Error('Test'),
      }
    })

    const renderer = new ShallowRenderer()

    const result = renderer.render(
      <FeedbackResultsPage {...mockProps}/>
    )

    expect(result).toMatchSnapshot()
  })
})
