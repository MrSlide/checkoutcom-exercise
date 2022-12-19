import React from 'react'
import { useRouter } from 'next/router'

import FloatingBoxLayout from '../../../layouts/floating-box'
import ResponsiveDualColLayout, { ResponsiveDualColLayoutColumn } from '../../../layouts/responsive-dual-col'
import Section from '../../section'
import Title from '../../title'
import Form from '../../form'
import Input from '../../input'
import InputGroup from '../../input-group'
import ButtonGroup from '../../button-group'
import SubmitButton from '../../submit-button'
import { isValidEmail } from '../../../utils/validation'

interface FeedbackForm {
  comment: string,
  email: string,
  name: string,
  rating: string,
}

function validateName(fieldValue: string): string | undefined {
  if (fieldValue.length === 0) {
    return 'Please provide your name.'
  }

  if (fieldValue.length > 100) {
    return 'The name must not exceed 100 characters.'
  }
}

function validateEmail(fieldValue: string): string | undefined {
  if (fieldValue.length === 0) {
    return 'Please provide your email address.'
  }

  if (!isValidEmail(fieldValue)) {
    return 'The email address provided does not appear to be valid.'
  }
}

function validateRating(fieldValue: string): string | undefined {
  if (fieldValue.length === 0) {
    return 'Please provide a rating.'
  }

  const normalizedValue = Number(fieldValue)

  if (
    !Number.isInteger(normalizedValue)
    || normalizedValue < 1
    || normalizedValue > 5
  ) {
    return 'The rating must be an integer number from 1 to 5.'
  }
}

function validateComment(fieldValue: string): string | undefined {
  if (fieldValue.length === 0) {
    return 'Please provide a comment.'
  }

  if (fieldValue.length > 1000) {
    return 'The comment length must not exceed 1000 characters.'
  }
}

async function createFeedbackFromForm(values: FeedbackForm): Promise<void> {
  const { comment, email, name, rating } = values

  await fetch('/api/v1/feedback', {
    body: JSON.stringify({
      comment,
      createdBy: name,
      email,
      rating: parseInt(rating, 10),
    }),
    headers: {
      'Content-Type': 'application/json',
    },
    method: 'POST',
  })
}

export default function FeedbackFormPage(): React.ReactElement {
  const router = useRouter()

  const onSubmit = React.useCallback(async function (values: FeedbackForm): Promise<void> {
    await createFeedbackFromForm(values)

    router.push('/results')
  }, [router])

  return (
    <main>
      <Section>
        <Title>Feedback Form</Title>
        <Form onSubmit={onSubmit}>
          <ResponsiveDualColLayout>
            <ResponsiveDualColLayoutColumn>
              <InputGroup label='Name'>
                <Input
                  id='name-input'
                  maxLength={100}
                  name='name'
                  required
                  validate={validateName}
                />
              </InputGroup>
              <InputGroup label='Email'>
                <Input
                  id='email-input'
                  name='email'
                  required
                  validate={validateEmail}
                />
              </InputGroup>
              <InputGroup label='Rating'>
                <Input
                  id='rating-input'
                  max={5}
                  maxLength={1}
                  min={1}
                  minLength={1}
                  name='rating'
                  required
                  step={1}
                  type='number'
                  validate={validateRating}
                />
              </InputGroup>
            </ResponsiveDualColLayoutColumn>
            <ResponsiveDualColLayoutColumn>
              <InputGroup label='Comment'>
                <Input
                  id='comment-input'
                  maxLength={1000}
                  name='comment'
                  required
                  type='text-area'
                  validate={validateComment}
                />
              </InputGroup>
              <ButtonGroup>
                <SubmitButton>Submit</SubmitButton>
              </ButtonGroup>
            </ResponsiveDualColLayoutColumn>
          </ResponsiveDualColLayout>
        </Form>
      </Section>
    </main>
  )
}

FeedbackFormPage.getLayout = function getLayout(page: React.ReactNode): React.ReactNode {
  return (
    <FloatingBoxLayout>
      {page}
    </FloatingBoxLayout>
  )
}
