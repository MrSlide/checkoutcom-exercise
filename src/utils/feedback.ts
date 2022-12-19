import { find } from '../store/feedback'

import type { FeedbackComment, FeedbackRatingsCount } from '../types/feedback'

/**
 * Get the count for each rating.
 *
 * @returns The number of ratings for each value from 1 to 5
 */
export async function getRatingsCount(): Promise<FeedbackRatingsCount> {
  const feedback = await find()
  const result = {
    1: 0,
    2: 0,
    3: 0,
    4: 0,
    5: 0,
  }

  feedback.forEach(function (item) {
    result[item.rating] += 1
  })

  return result
}

/**
 * Get the most recent comments sorted by creation data.
 *
 * @returns The most recent comments
 */
export async function getMostRecentComments(): Promise<FeedbackComment[]> {
  const results = await find({
    limit: 3,
    sortBy: 'createdAt',
    sortDirection: 'desc',
  })

  return results.map(function (item) {
    const { comment, createdAt, createdBy, id } = item

    return {
      comment,
      createdAt,
      createdBy,
      id,
    }
  })
}
