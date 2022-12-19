import fs from 'fs/promises'

import type { MakeDirectoryOptions } from 'fs'

/**
 * Create a directory if it does not exist.
 *
 * @param path - The directory path
 * @param options - The options to customize the behavior, this is the same as the options object used for Node's own `fs.mkdir` function
 */
export async function mkdirIfNotExists(path: string, options?: MakeDirectoryOptions): Promise<void> {
  try {
    await fs.mkdir(path, options)
  } catch (err) {
    if (err.code === 'EEXIST') {
      return
    }

    throw err
  }
}
