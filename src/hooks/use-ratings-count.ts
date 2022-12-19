import useSWR from 'swr'

import type { FeedbackRatingsCount } from '../types/feedback'

async function fetcher(key): Promise<FeedbackRatingsCount> {
  const req = await fetch(key)

  return req.json()
}

export default function useRatingsCount(initial?: FeedbackRatingsCount) {
  const { data, error, isLoading, isValidating } = useSWR(
    '/api/v1/feedback/ratings',
    fetcher,
    {
      fallbackData: initial,
      keepPreviousData: true,
      refreshInterval: 60000,
      revalidateOnFocus: false,
      revalidateOnMount: false,
    },
  )

  return {
    busy: isLoading || isValidating,
    data,
    error,
  }
}
