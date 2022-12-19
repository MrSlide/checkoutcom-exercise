import useSWR from 'swr'

import type { FeedbackComment } from '../types/feedback'

async function fetcher(key): Promise<FeedbackComment[]> {
  const req = await fetch(key)

  return req.json()
}

export default function useMostRecentComments(initial?: FeedbackComment[]) {
  const { data, error, isLoading, isValidating } = useSWR(
    '/api/v1/feedback/comments',
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
