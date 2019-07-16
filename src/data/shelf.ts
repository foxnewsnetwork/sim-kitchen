import { DeliverablePlate } from './deliverable-plate'

export const enum ShelfName {
  HOT,
  COLD,
  FROZEN,
  OVERFLOW
}

export type Shelf = {
  name: ShelfName,
  items: Array<DeliverablePlate>
}