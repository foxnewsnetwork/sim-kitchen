let _uuidCount = 0;
/**
 * Generates an unique string id
 */
export function uuid(): string {
  return `${Math.random()}-${_uuidCount++}`
}