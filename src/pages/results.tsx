import { getMostRecentComments, getRatingsCount } from '../utils/feedback'

import type { Props } from '../components/pages/feedback-results'

export { default } from '../components/pages/feedback-results'

/**
 * Get the necessary data to render the page.
 *
 * @returns The fallback (initial) data for the page
 */
export async function getServerSideProps(): Promise<{ props: Props }> {
  return {
    props: {
      mostRecentComments: await getMostRecentComments(),
      ratingsCount: await getRatingsCount(),
    },
  }
}
