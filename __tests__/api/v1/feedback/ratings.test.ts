import handler from '../../../../src/pages/api/v1/feedback/ratings'
import { getRatingsCount } from '../../../../src/utils/feedback'

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

describe('API endpoint /v1/feedback/ratings', function () {
  const mockGetRatingsCount = jest.mocked(getRatingsCount)
  const mockRatings = {
    1: 2,
    2: 34,
    3: 56,
    4: 734,
    5: 323,
  }

  describe('GET method', function () {
    test('returns the most recent comments', async function () {
      const mockReq = createMockRequestObject({
        method: 'GET',
      })
      const mockRes = createMockResponseObject()

      mockGetRatingsCount.mockResolvedValueOnce(mockRatings)

      await handler(mockReq, mockRes)

      expect(mockRes.status).toHaveBeenCalledWith(200)
      expect(mockRes.json).toHaveBeenCalledWith(mockRatings)
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
