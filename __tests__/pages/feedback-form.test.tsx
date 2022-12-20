import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { fireEvent, render } from '@testing-library/react'
import { useRouter } from 'next/router'

import FeedbackFormPage from '../../src/pages'

jest.mock('next/router', function () {
  return {
    __esModule: true,
    useRouter: jest.fn(),
  }
})

describe('FeedbackFormPage component', function () {
  const mockRouterPush = jest.fn()
  const mockUseRouter = jest.mocked(useRouter)

  beforeEach(function () {
    mockUseRouter.mockReturnValue({
      push: mockRouterPush,
    } as any)
  })

  test('renders correctly', function () {
    const renderer = new ShallowRenderer()

    const result = renderer.render(
      <FeedbackFormPage/>
    )

    expect(result).toMatchSnapshot()
  })
})
