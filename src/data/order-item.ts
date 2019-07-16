export const enum Temperature {
  HOT,
  COLD,
  FROZEN
}

export type OrderItem = {
  id: string,
  name: string,
  temp: Temperature,
  shelfLife: number,
  decayRate: number
}