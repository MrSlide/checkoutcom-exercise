import fs from 'fs/promises'
import path from 'path'
import { v4 as uuidv4 } from 'uuid'

import { mkdirIfNotExists } from '../utils/fs'

import type { Feedback } from '../types/feedback'

interface FeedbackFilterOptions {
  limit?: number,
  offset?: number,
  sortBy?: keyof Feedback,
  sortDirection?: 'asc' | 'desc',
}

const fileStorePath = path.join(process.cwd(), '.file-store')
const storeFilename = 'feedback.json'

async function readStore(): Promise<Feedback[]> {
  try {
    const data = await fs.readFile(path.join(fileStorePath, storeFilename), {
      encoding: 'utf-8',
    })

    return JSON.parse(data)
  } catch (err) {
    return []
  }
}

async function writeStore(data: Feedback[]): Promise<void> {
  mkdirIfNotExists(fileStorePath)

  await fs.writeFile(path.join(fileStorePath, storeFilename), JSON.stringify(data), {
    encoding: 'utf-8',
  })
}

/**
 * Add a new feedback item to the store.
 *
 * @param data - The feedback data to add
 */
export async function add(data: Omit<Feedback, 'createdAt' | 'id'>): Promise<void> {
  const store = await readStore()

  store.push({
    ...data,
    createdAt: Date.now(),
    id: uuidv4(),
  })

  writeStore(store)
}

/**
 * Find existing feedback items matching the given options.
 *
 * @param options - The query parameters
 * @returns The matching results
 */
export async function find(options: FeedbackFilterOptions = {}): Promise<Feedback[]> {
  const store = await readStore()

  const { limit, offset, sortBy, sortDirection = 'asc' } = options
  let results = [...store]

  // Sort the results
  if (typeof sortBy === 'string') {
    results.sort(function (a, b) {
      const valueA = a[sortBy]
      const valueB = b[sortBy]

      if (valueA < valueB) {
        return sortDirection === 'asc' ? -1 : 1
      } else if (valueA > valueB) {
        return sortDirection === 'asc' ? 1 : -1
      }

      return 0
    })
  }

  // Paginate the results
  if (typeof limit === 'number' || typeof offset === 'number') {
    results = results.slice(offset, limit)
  }
console.log(Date.now(), 'find', store, results)
  return results
}
