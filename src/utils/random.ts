export function arrayMember<T>(array: Array<T>): T {
  const index = integer(0, array.length)
  return array[index]
}

/**
 * Select a member of an iterable randomly;
 * obviously, don't use this with an infinite
 * iterable
 */
export function iterableMember<T>(it: Iterable<T>): T {
  return arrayMember([...it])
}

/**
 * Returns randomly a number between `min` (inclusive) and `max` (exclusive)
 * @param min 
 * @param max 
 */
export function integer(min: number, max: number): number {
  return Math.floor(min + (max - min) * Math.random())
}