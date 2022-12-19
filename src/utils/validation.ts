const emailRegExp = /^[A-Z0-9._%+-]{1,64}@[A-Z0-9.-]{1,252}.[A-Z]{2,4}$/i

/**
 * Check if a value is a valid email address.
 *
 * @param value - The value to be validated
 * @returns A boolean indicating whether or not the value provided is a valid email address
 */
export function isValidEmail(value: string): boolean {
  return emailRegExp.test(value)
}
