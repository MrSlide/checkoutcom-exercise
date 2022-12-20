import handler from '../../../../src/pages/api/v1/feedback'
import { add } from '../../../../src/store/feedback'

import type { NextApiRequest, NextApiResponse } from 'next'

interface MockRequestOptions {
  body?: any,
  method?: string,
}

jest.mock('../../../../src/store/feedback')

function createMockRequestObject(options: MockRequestOptions = {}) {
  const { body = {}, method = 'GET' } = options

  const mockReq = {
    body,
    method,
  }

  return mockReq as NextApiRequest
}

function createMockResponseObject() {
  const mockRes = {
    end: jest.fn(function () {
      return mockRes
    }),
    json: jest.fn(function () {
      return mockRes
    }),
    setHeader: jest.fn(function () {
      return mockRes
    }),
    status: jest.fn(function () {
      return mockRes
    }),
  }

  return mockRes as NextApiResponse
}

describe('API endpoint /v1/feedback', function () {
  const mockAddFeedback = jest.mocked(add)
  const mockBody = {
    createdBy: 'John Doe',
    comment: 'Lorem ipsum',
    email: 'user@world.net',
    rating: 4,
    unknown: 'test'
  }

  describe('POST method', function () {
    test('adds a feedback item', async function () {
      const mockReq = createMockRequestObject({
        body: mockBody,
        method: 'POST',
      })
      const mockRes = createMockResponseObject()

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(201)
      expect(mockRes.end).toHaveBeenCalledWith()

      expect(mockAddFeedback).toHaveBeenCalledWith({
        createdBy: 'John Doe',
        comment: 'Lorem ipsum',
        email: 'user@world.net',
        rating: 4,
      })
    })

    test('returns an error if a request body was not provided', async function () {
      const mockReq = createMockRequestObject({
        body: null,
        method: 'POST',
      })
      const mockRes = createMockResponseObject()

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.end).toHaveBeenCalledWith('Bad Request')

      expect(mockAddFeedback).not.toHaveBeenCalled()
    })

    test('returns an error if the `createdBy` value is not a string', async function () {
      const mockReq = createMockRequestObject({
        body: {
          ...mockBody,
          createdBy: false,
        },
        method: 'POST',
      })
      const mockRes = createMockResponseObject()

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.end).toHaveBeenCalledWith('Invalid createdBy value')

      expect(mockAddFeedback).not.toHaveBeenCalled()
    })

    test('returns an error if the `createdBy` value is empty', async function () {
      const mockReq = createMockRequestObject({
        body: {
          ...mockBody,
          createdBy: ' ',
        },
        method: 'POST',
      })
      const mockRes = createMockResponseObject()

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.end).toHaveBeenCalledWith('Invalid createdBy value')

      expect(mockAddFeedback).not.toHaveBeenCalled()
    })

    test('returns an error if the `comment` value is not a string', async function () {
      const mockReq = createMockRequestObject({
        body: {
          ...mockBody,
          comment: false,
        },
        method: 'POST',
      })
      const mockRes = createMockResponseObject()

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.end).toHaveBeenCalledWith('Invalid comment value')

      expect(mockAddFeedback).not.toHaveBeenCalled()
    })

    test('returns an error if the `comment` value is empty', async function () {
      const mockReq = createMockRequestObject({
        body: {
          ...mockBody,
          comment: ' ',
        },
        method: 'POST',
      })
      const mockRes = createMockResponseObject()

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.end).toHaveBeenCalledWith('Invalid comment value')

      expect(mockAddFeedback).not.toHaveBeenCalled()
    })


    test('returns an error if the `email` value is not a string', async function () {
      const mockReq = createMockRequestObject({
        body: {
          ...mockBody,
          email: false,
        },
        method: 'POST',
      })
      const mockRes = createMockResponseObject()

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.end).toHaveBeenCalledWith('Invalid email value')

      expect(mockAddFeedback).not.toHaveBeenCalled()
    })

    test('returns an error if the `email` value is not valid', async function () {
      const mockReq = createMockRequestObject({
        body: {
          ...mockBody,
          email: 'test',
        },
        method: 'POST',
      })
      const mockRes = createMockResponseObject()

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.end).toHaveBeenCalledWith('Invalid email value')

      expect(mockAddFeedback).not.toHaveBeenCalled()
    })

    test('returns an error if the `rating` value is not a number', async function () {
      const mockReq = createMockRequestObject({
        body: {
          ...mockBody,
          rating: '1',
        },
        method: 'POST',
      })
      const mockRes = createMockResponseObject()

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.end).toHaveBeenCalledWith('Invalid rating value')

      expect(mockAddFeedback).not.toHaveBeenCalled()
    })

    test('returns an error if the `rating` value is not valid', async function () {
      const mockReq = createMockRequestObject({
        body: {
          ...mockBody,
          rating: 0,
        },
        method: 'POST',
      })
      const mockRes = createMockResponseObject()

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(400)
      expect(mockRes.end).toHaveBeenCalledWith('Invalid rating value')

      expect(mockAddFeedback).not.toHaveBeenCalled()
    })
  })

  describe.each([
    ['GET'],
    ['PUT'],
    ['PATCH'],
    ['DELETE']
  ])('%s method', function (method) {
    test('returns a not allowed response', async function () {
      const mockReq = createMockRequestObject({
        method,
      })
      const mockRes = createMockResponseObject()

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(405)
      expect(mockRes.end).toHaveBeenCalledWith(`Method ${method} Not Allowed`)
    })
  })
})
