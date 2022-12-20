import handler from '../../../../src/pages/api/v1/feedback/comments'
import { getMostRecentComments } from '../../../../src/utils/feedback'

import type { NextApiRequest, NextApiResponse } from 'next'

interface MockRequestOptions {
  method?: string,
}

jest.mock('../../../../src/utils/feedback')

function createMockRequestObject(options: MockRequestOptions = {}) {
  const { method = 'GET' } = options

  const mockReq = {
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

describe('API endpoint /v1/feedback/comments', function () {
  const mockGetMostRecentComments = jest.mocked(getMostRecentComments)
  const mockComments = [
    {
      comment: 'Lorem ipsum',
      createdBy: 'John Doe',
      id: '123',
    }
  ]

  describe('GET method', function () {
    test('returns the most recent comments', async function () {
      const mockReq = createMockRequestObject({
        method: 'GET',
      })
      const mockRes = createMockResponseObject()

      mockGetMostRecentComments.mockResolvedValueOnce(mockComments)

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith(mockComments)
    })
  })

  describe.each([
    ['POST'],
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
