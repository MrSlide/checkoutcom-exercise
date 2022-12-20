import React from 'react'
import ShallowRenderer from 'react-test-renderer/shallow'
import { useFormContext } from 'react-hook-form'

import SubmitButton from '../../src/components/submit-button'

jest.mock('react-hook-form')

describe('SubmitButton component', function () {
  const mockUseFormContext = jest.mocked(useFormContext)

  test('renders correctly in idle state', function () {
    mockUseFormContext.mockReturnValue({
      formState: {
        isSubmitting: false,
        isValidating: false,
      },
    } as any)

    const renderer = new ShallowRenderer()

    const result = renderer.render(
      <SubmitButton/>
    )

    expect(result).toMatchSnapshot()
  })

  test('renders correctly in form validating state', function () {
    mockUseFormContext.mockReturnValue({
      formState: {
        isSubmitting: false,
        isValidating: true,
      },
    } as any)

    const renderer = new ShallowRenderer()

    const result = renderer.render(
      <SubmitButton/>
    )

    expect(result).toMatchSnapshot()
  })

  test('renders correctly in form submitting state', function () {
    mockUseFormContext.mockReturnValue({
      formState: {
        isSubmitting: true,
        isValidating: false,
      },
    } as any)

    const renderer = new ShallowRenderer()

    const result = renderer.render(
      <SubmitButton/>
    )

    expect(result).toMatchSnapshot()
  })
})
