import { add } from '../../../../store/feedback'
import { isValidEmail } from '../../../../utils/validation'

import type { NextApiRequest, NextApiResponse } from 'next'
import type { Feedback } from '../../../../types/feedback'

const validRatings = [1, 2, 3, 4, 5]

/**
 * Validate and parse a POST request.
 *
 * @param req - The request object
 * @param res  - The response object
 */
function parsePostRequest(req: NextApiRequest, res: NextApiResponse): Omit<Feedback, 'createdAt' | 'id'> | undefined {
  if (req.body === null) {
    res.status(400).end('Bad Request')
    return
  }

  const {
    createdBy,
    comment,
    email,
    rating,
  } = req.body

  // Validate the createdBy value
  if (typeof createdBy !== 'string' || createdBy.trim().length === 0) {
    res.status(400).end('Invalid createdBy value')
    return
  }

  // Validate the comment value
  if (typeof comment !== 'string' || comment.trim().length === 0) {
    res.status(400).end('Invalid comment value')
    return
  }

  // Validate the email value
  if (typeof email !== 'string' || !isValidEmail(email)) {
    res.status(400).end('Invalid email value')
    return
  }

  // Validate the rating value
  if (typeof rating !== 'number' || !validRatings.includes(rating)) {
    res.status(400).end('Invalid rating value')
    return
  }

  return {
    createdBy,
    comment,
    email,
    rating,
  }
}

/**
 * Handle POST requests to the feedback endpoint.
 *
 * @param req - The request object
 * @param res - The response object
 */
async function postHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const data = parsePostRequest(req, res)

  if (typeof data === 'undefined') {
    return
  }

  await add(data)

  res.status(201).end()
}

/**
 * Handle requests to the feedback endpoint.
 *
 * @param req - The request object
 * @param res - The response object
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method } = req

  switch (method) {
    case 'POST':
      return postHandler(req, res)
    default:
      res.setHeader('Allow', ['POST'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
