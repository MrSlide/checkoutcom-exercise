import useSwr from 'swr'

import useRatingsCount from '../../src/hooks/use-ratings-count'

jest.mock('swr')

describe('useRatingsCount hook', function () {
  const mockUseSwr = jest.mocked(useSwr)
  const mockRatings = {
    1: 2,
    2: 34,
    3: 56,
    4: 734,
    5: 323,
  }

  test('correctly sets up data fetching', async function () {
    mockUseSwr.mockReturnValueOnce({
      data: mockRatings,
      error: undefined,
      isLoading: false,
      isValidating: false,
    } as any)

    global.fetch = jest.fn().mockResolvedValueOnce({
      json: async function () {
        return mockRatings
      }
    })

    useRatingsCount(mockRatings)

    expect(mockUseSwr).toHaveBeenCalledWith(
      '/api/v1/feedback/ratings',
      expect.any(Function),
      {
        fallbackData: mockRatings,
        keepPreviousData: true,
        refreshInterval: 60000,
        revalidateOnFocus: false,
        revalidateOnMount: false,
      }
    )

    const fetcher = mockUseSwr.mock.calls[0][1]

    const fetchResult = await fetcher('test')

    expect(global.fetch).toHaveBeenCalledWith('test')
    expect(fetchResult).toBe(mockRatings)
  })

  test('returns the available data', function () {
    mockUseSwr.mockReturnValueOnce({
      data: mockRatings,
      error: undefined,
      isLoading: false,
      isValidating: false,
    } as any)

    const result = useRatingsCount(mockRatings)

    expect(result.busy).toBe(false)
    expect(result.data).toBe(mockRatings)
    expect(result.error).toBeUndefined()
  })

  test('returns a busy state if validating', function () {
    mockUseSwr.mockReturnValueOnce({
      data: mockRatings,
      error: undefined,
      isLoading: false,
      isValidating: true,
    } as any)

    const result = useRatingsCount(mockRatings)

    expect(result.busy).toBe(true)
  })

  test('returns a busy state if loading', function () {
    mockUseSwr.mockReturnValueOnce({
      data: mockRatings,
      error: undefined,
      isLoading: true,
      isValidating: false,
    } as any)

    const result = useRatingsCount(mockRatings)

    expect(result.busy).toBe(true)
  })

  test('returns an error if failed to load data', function () {
    const mockError = new Error('Test')

    mockUseSwr.mockReturnValueOnce({
      data: mockRatings,
      error: mockError,
      isLoading: false,
      isValidating: false,
    } as any)

    const result = useRatingsCount(mockRatings)

    expect(result.error).toBe(mockError)
  })
})
