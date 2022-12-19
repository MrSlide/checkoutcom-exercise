import { getRatingsCount } from '../../../../utils/feedback'

import type { NextApiRequest, NextApiResponse } from 'next'

/**
 * Handle GET requests to the ratings endpoint.
 *
 * @param req - The request object
 * @param res - The response object
 */
async function getHandler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const result = await getRatingsCount()

  return res
    .status(200)
    .json(result)
}

/**
 * Handle requests to the ratings endpoint.
 *
 * @param req - The request object
 * @param res - The response object
 */
export default async function handler(req: NextApiRequest, res: NextApiResponse): Promise<void> {
  const { method } = req

  switch (method) {
    case 'GET':
      return getHandler(req, res)
    default:
      res.setHeader('Allow', ['GET'])
      res.status(405).end(`Method ${method} Not Allowed`)
  }
}
